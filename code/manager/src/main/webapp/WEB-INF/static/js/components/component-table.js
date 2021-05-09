/**
 * 表格组件
 * 
 * @author Spark
 * @returns
 */
//<el-table-column v-if="columns.indexOf('index') != -1"
//		          	type="index"
//		          	width="50"
//		          	fixed='left'></el-table-column>
define(['ajax', 'mix-table', 'custom-table-column'], function (ajax, mixTable, customTableColumn) {
	return {
		name: 'component-table',
		template: `
		<div class="component-table">
			<el-table
				v-if="showTable"
				ref="componentTable"
				v-loading="loading"
				:data="tableData"
				:height="maxHeight == 0 ? heightTemp : null"
				:max-height="maxHeight > 0 ? maxHeight : null"
				:row-key="rowKey"
				highlight-current-row
				border
				@sort-change="handleSortChange"
				@select="handleSelect"
				@selection-change="handleSelectionChange"
				@select-all="handleSelectAll"
				@header-dragend="handleHeaderDragend"
				@row-click="handleRowClick"
				:header-row-style="{background: '#f4f6f9'}"
				:header-cell-style="{padding: '5px 0'}"
				style="width: 100%">
				<el-table-column v-if="columns.indexOf('selection') != -1"
		          	type="selection"
		          	:selectable="selectable"
		          	width="55"
		          	fixed="left"></el-table-column>
				<el-table-column v-if="(columns.indexOf('selection') === -1)"
					type="index"
					width="55"
					fixed='left'></el-table-column>
		        <mix-table :id="id" :grid-config="config.gridConfig">
		         	<slot>
					</slot>
				</mix-table>
				<el-table-column v-if="columns.indexOf('operation') != -1"
		          	width="100"
		          	label="操作"
		          	fixed='right'>
					<template slot-scope="scope">
						<slot name="operation" :flow="flows" :row="scope.row" :$index="scope.$index"></slot>
						<span v-if="operation.indexOf('edit') > -1
							&& showEditBtn(scope.row)
							&& (!needApproval || (needApproval && flows[scope.$index] != null && flows[scope.$index].canSubmit))"
							class="ui-btn ui-blue"
							@click="handleEdit(scope.row)"
							style="padding: 0px 3px;">编辑</span>
			        	<span v-if="operation.indexOf('delete') > -1
			        		&& showDeleteBtn(scope.row)
			        		&& (!needApproval || (needApproval && flows[scope.$index] != null && flows[scope.$index].canSubmit))"
			        		class="ui-btn ui-red"
			        		@click="handleDelete(scope.row)"
			        		style="padding: 0px 3px;">删除</span>
			      	</template>
	          	</el-table-column>
				<el-table-column v-if="columns.indexOf('custom') != -1"
		          	width="30"
		          	:resizable="false"
		          	:render-header="renderCustomHeader"
		          	fixed='right'></el-table-column>
			</el-table>
			<footer v-if="pagination" :class="isMainContent ? 'warp-footer' : ''"
				:style="{width: footerWidth}">
				<el-pagination
			      	@size-change="handleSize"
			      	@current-change="handlePage"
			      	:background="true"
				  	:current-page="data.pageNum"
				  	:page-sizes="[20, 50, 100]"
				  	:page-size="data.pageSize"
				  	prev-text="上页"
				  	next-text="下页"
				  	layout="sizes, total, prev, pager, next"
			      	:total="data.total"
			      	style="text-align:right; margin-top: 5px;">
			    </el-pagination>
		    </footer>
		 </div>
		`,
		props: {
			id: {
				type: String
			},
			data: {
				type: [Array, Object],
				require: true
			},
			height: Number,
			/**
			 * 最大高度
			 */
			maxHeight: {
				type: Number,
				default: 0
			},
			// 行ID
			rowKey: {
				type: String,
				default: 'id'
			},
			// 加载状态
		    loading: {
		      type: Boolean,
		      default: false
		    },
		    // 附加列 ['selection', 'index', 'operation', 'custom']
		    columns: {
		      type: Array,
		      default () {
		        return []
		      }
		    },
		    /**
		     * 仅对 columns包含selection 时有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
		     * Function(row, index)
		     */
		    selectable: {
		    	type: Function
		    },
		    // 操作按钮['edit', 'delete', 'approval']
		    operation: {
		    	type: Array,
		    	default () {
		    		return ['edit', 'delete']
		    	}
		    },
		    /**
		     * 是否显示编辑按钮
		     * 参数：row
		     */
		    showEditBtn: {
		    	type: Function,
		    	default () {
		    		return true
		    	}
		    },
		    /** 
		     * 是否显示删除按钮
		     * 参数：row
		     */
		    showDeleteBtn: {
		    	type: Function,
		    	default () {
		    		return true
		    	}
		    },
		    // 是否启用分页
		    pagination: {
		      type: Boolean,
		      default: false
		    },
		    /**
			 * 是否显示详情 显示时会改变第一列文本字体颜色
			 */
		    showDetail: {
		    	type: Boolean,
		    	default: true
		    },
		    // 模块名，approval为true时必须
		    module: {
		    	type: String
		    },
		    // 复选框选择的数据
		    selectData: {
		    	type: Array,
		    	sync: true
		    }
		},
		data () {
			return {
				showTable: true,
				heightTemp: 400,
				footerWidth: '100%',
				pageConfig: {
					pageNum: 1,
					pageSize: 20,
					orderByClause: null
				},
				// 表格配置
				config: {
					gridCode: null,
					gridConfig: []
				},
				// 表格所有列
				defaultColumns: [],
				flows: [],
				// 是否为主页面
				isMainContent: false
			}
		},
		computed: {
			// 表格数据
			tableData () {
				var data = []
				if (this.data != null) {
					if (this.pagination) {
						if (this.data['list']) {
							data = this.data.list
						}
					} else {
						data = this.data
					}
				}
				return data
			},
			persistConfig () {
				return this.id != null && this.columns != null && this.columns.indexOf('custom') > -1
			},
			// 是否需要审批
			needApproval () {
				return this.operation.indexOf('approval') > -1 && this.module != null
			},
			// 是否有创建日期列
			hasCreateDate () {
				if (this.defaultColumns != null && this.defaultColumns.length > 0) {
					for (var column of this.defaultColumns) {
						if (column.prop === 'createDate') {
							return true
						}
					}
				}
				return false
			}
		},
		watch: {
			'config.gridConfig': {
				handler: function (val) {
					var vm = this
					if (val != null && val.length > 0)
					vm.showTable = false
    				vm.$nextTick(() => {
    					vm.showTable = true
    				})
				},
				immediate: true
			},
			tableData: {
				handler: function (val) {
					var vm = this
					vm.$nextTick(function () {
						// 选择默认选中数据
						if (val && val.length > 0
								&& vm.columns.indexOf('selection') > -1
								&& vm.selectData != null && vm.selectData.length > 0) {
							for (var selected of vm.selectData) {
								for (var row of val) {
									if (selected[vm.rowKey] === row[vm.rowKey]) {
										vm.$refs.componentTable.toggleRowSelection(row, true)
									}
								}
							}
						}
					})
				},
				immediate: true
			}
		},
		methods: {
			/**
			 * 请求数据
			 */
			fetchData () {
				if (this.pagination) {
					// 默认以创建日期倒序排序
					if (this.pageConfig.orderByClause == null && this.hasCreateDate) {
						this.pageConfig.orderByClause = 'CREATE_DATE DESC'
					}
					this.$emit('fetch-data', this.pageConfig)
				} else {
					this.$emit('fetch-data')
				}
			},
			handleSelect (selection, row) {
				this.$emit('select', selection, row)
			},
			handleSelectAll (selection) {
				this.$emit('select-all', selection)
			},
			/**
			 * 复选框选择数据变化
			 */
			handleSelectionChange (val) {
				var vm = this
//				if ($(this.$el).parents('.main-content').length > 0) {
					$(vm.$el).find('.el-table__fixed').css({
						position: 'initial',
						opacity: 0
					})
					window.setTimeout(function () {
						$(vm.$el).find('.el-table__fixed').css({
							position: 'absolute',
							opacity: 1
						})
					}, 50)
//				}
		        this.$emit('selection-change', val)
//		        $('.el-table__fixed').css('position', 'absolute')
			},
			/**
			 * 行点击事件
			 */
			handleRowClick (row, event, column) {
				if (this.showDetail) {
//					var firstCol = this.getFirstShowColumn()
					if (column.fixed !== 'right') {
						this.$emit('detail', row)
					}
				}
				this.$emit('row-click', row)
			},
			/**
			 * 获取第一列对象
			 */
			getFirstShowColumn () {
				if (this.persistConfig && this.config.gridConfig.length > 0) {
					for (var column of this.config.gridConfig) {
						if (column.show) {
							return column
						}
					}
					return null
				} else {
					return this.defaultColumns[0]
				}
			},
			/**
			 * 编辑按钮事件
			 */
			handleEdit (row) {
				this.$emit('edit', row)
			},
			/**
			 * 删除按钮事件
			 */
			handleDelete (row) {
				this.$emit('delete', row)
			},
			/**
			 * 列表排序
			 */
			handleSortChange ({ column, prop, order }) {
				if (prop) {
					prop = prop.replace(/([A-Z])/g,"_$1").toUpperCase()
					order = order === 'ascending' ? 'ASC' : order === 'descending' ? 'DESC' : ''
					this.pageConfig.orderByClause = prop + ' ' + order
				} else {
					this.pageConfig.orderByClause = null
				}
				this.fetchData()
			},
			/**
			 * 列宽变化
			 */
			handleHeaderDragend (newWidth, oldWidth, column, event) {
				if (this.persistConfig) {
					for (var column of this.config.gridConfig) {
						if (column.prop === column.prop) {
							column.width = newWidth
							this.updateConfig()
							break
						}
					}
				}
			},
			/**
			 * 分页大小变化
			 */
			handleSize (size) {
				this.pageConfig.pageSize = size
				this.pageConfig.pageNum = 1
				this.fetchData()
		    },
		    /**
			 * 分页页码变化
			 */
		    handlePage (page) {
		    	if (this.pageConfig.pageNum !== page && page !== this.data.pageNum) {
		    		this.pageConfig.pageNum = page
		    		this.fetchData()
		    	}
		    },
		    /**
			 * 自定义列，表头
			 */
		    renderCustomHeader (h, { column, $index }) {
		    	var vm = this
		    	return h(customTableColumn, {
		    		props: {
		    			columns: vm.defaultColumns,
		    			gridConfig: vm.config.gridConfig
		    		},
		    		on: {
		    			change: function (val) {
		    				vm.config.gridConfig = val
		    				vm.updateConfig()
		    			}
		    		}
		    	})
		    },
		    /**
			 * 获取表格列配置
			 */
		    fetchGridConfig () {
		    	if (this.id) {
		    		let vm = this
		    		ajax.get('/base/findGridConfig', {
		    			code: vm.id
		    		}).then((result) => {
		    			if (result.data) {
		    				result.data.gridConfig = JSON.parse(result.data.gridConfig)
		    				vm.config = result.data
		    			} else {
		    				vm.saveConfig()
		    			}
		    			vm.$nextTick(() => {
	    					this.fetchData()
	    				})
		    		}, (err) => {
		    			vm.fetchData()
		    		})
		    	}
		    },
		    /**
			 * 获取表格所有列
			 */
		    getColumns () {
		    	var columnNodes = this.$slots.default
		    	if (columnNodes != null && columnNodes.length > 0) {
		    		var columns = []
		    		for (var columnNode of columnNodes) {
		    			if (columnNode.componentOptions != null
								&& columnNode.componentOptions.tag === 'el-table-column') {
		    				columns.push({
		    					label: columnNode.componentOptions.propsData.label,
								prop: columnNode.componentOptions.propsData.prop,
								width: columnNode.componentOptions.propsData.width,
								minWidth: columnNode.componentOptions.propsData.minWidth
							})
						}
		    		}
		    		this.defaultColumns = columns
		    	}
		    },
		    /**
			 * 保存配置
			 */
		    saveConfig () {
		    	let vm = this
		    	if (vm.config.gridConfig == null || vm.config.gridConfig.length === 0) {
		    		vm.config.gridConfig = vm.defaultColumns.map((column) => {
		    			return {
		    				label: column.label,
		    				prop: column.prop,
							width: column.width,
							minWidth: column.minWidth,
							show: true
		    			}
		    		})
		    	}
	    		ajax.post('/base/saveGridConfig', {
	    			gridCode: vm.id,
	    			gridConfig: JSON.stringify(vm.config.gridConfig)
	    		}).then((result) => {
	    			if (result.data) {
	    				vm.config.gridId = result.data.gridId
	    				vm.config.gridConfig = JSON.parse(result.data.gridConfig)
	    			}
	    		}, (err) => {
	    			console.log('Save Config Error: ', err)
	    		})
		    },
		    /**
			 * 更新配置
			 */
		    updateConfig () {
		    	let vm = this
	    		ajax.post('/base/updateGridConfig', {
	    			gridId: vm.config.gridId,
	    			gridConfig: JSON.stringify(vm.config.gridConfig)
	    		}).then((result) => {
	    			if (result.data) {
	    				console.log('Update Config Success: ', result.data)
	    			}
	    		}, (err) => {
	    			console.log('Update Config Error: ', err)
	    		})
		    }
		},
		mounted () {
			var vm = this
			this.getColumns()
//			if (this.persistConfig) {
//				this.fetchGridConfig()
//			} else {
//				this.fetchData()
//			}
			this.fetchData()
			vm.$nextTick(function () {
				if (this.height || this.maxHeight) {
					this.heightTemp = this.height
				} else if ($(this.$el).parents('.slide-overflow').length > 0) {
					vm.isMainContent = true
					vm.footerWidth = $('.warp-footer').parent().width() + 'px'
					vm.heightTemp = $('.slide-overflow').height() - 12;
					$(window).on('resize', function () {
						vm.heightTemp = $('.slide-overflow').height() - 12;
						vm.footerWidth = $('.warp-footer').parent().width() + 'px'
					})
					$(window).resize()
				} else {
					this.heightTemp = 400
				}
			})
		},
		components: {
			mixTable: mixTable
		}
	}
})