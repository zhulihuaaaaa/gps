/**
 * 自定义表格列
 * 
 * @author Spark
 * @returns
 */
define(['vue-dragging'], function (vueDragging) {
	return {
		template: `
			<el-popover
				  ref="customTableColumn"
				  placement="left"
				  width="200"
				  trigger="click">
			  	<el-checkbox :indeterminate="isIndeterminate"
			  			v-model="checkAll"
			  			@change="handleCheckAll"
			  			style="margin-left: 5px;margin-bottom: 5px;">全选</el-checkbox>
				<ul class="custom-table-column-ul">
					<li v-for="column of columns" :key="column.prop" v-dragging="{item: column, list: columns, group: 'prop'}">
					    <el-checkbox v-model="column.show" @change="handleCheckChange">{{column.label}}</el-checkbox>
					    <span class="drag-handle">☰</span>
					</li>
				</ul>
				<el-button type="text"
						size="mini"
						icon="el-icon-more"
						slot="reference"
						:style="{padding: '6px', marginLeft: '-8px'}"></el-button>
			</el-popover>
		`,
		//				<div style="text-align: right; margin: 0">
		//					<el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
		//				</div>
		name: 'custom-table-column',
		props: {
			// 自定义配置
			gridConfig: {
				type: Array,
				required: true
			}
		},
		data () {
			return {
				columns: []
			}
		},
		computed: {
			isIndeterminate () {
				var columns = this.columns
				if (columns.length > 0) {
					// 更新checkAll,isIndeterminate状态
					var isIndeterminate = false
					for (var column of columns) {
						if (column.show) {
							isIndeterminate = true
							break
						}
					}
					return isIndeterminate && !this.checkAll
				}
			},
			checkAll: {
				get () {
					var columns = this.columns
					var checkAll = false
					if (columns.length > 0) {
						for (var column of columns) {
							if (column.show) {
								checkAll = true
							} else {
								checkAll = false
								break
							}
						}
					}
					return checkAll
				},
				set (val) {}
			}
		},
		watch: {
			gridConfig: {
				handler: function (val) {
					if (val.length > 0) {
						this.columns = JSON.parse(JSON.stringify(val))
					}
				},
				immediate: true
			}
		},
		methods: {
			handleCheckChange () {
				this.$nextTick(function () {
					this.handleSubmit()
				})
			},
			/**
			 * 全选事件
			 */
			handleCheckAll (val) {
				for (var column of this.columns) {
					column.show = val
				}
				this.handleSubmit()
			},
			/**
			 * 配置变更
			 */
			handleSubmit () {
				if (this.columns.length > 0) {
					this.$emit('change', this.columns)
				}
			}
		},
		mounted () {
			this.$dragging.$on('drop', () => {
				// 判断顺序与原顺序
				for (var i = 0; i < this.columns.length; i++) {
					if (this.columns[i].prop !== this.gridConfig[i].prop) {
						this.handleSubmit()
						break;
					}
				}
		    })
		},
		created () {
			Vue.use(vueDragging)
		}
	}
})