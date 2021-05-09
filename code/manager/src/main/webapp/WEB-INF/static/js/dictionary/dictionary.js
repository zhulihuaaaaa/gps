/**
 * 字典设置
 * 
 * @author zlh
 * @since 2018.2.27
 */
require(['ajax', 'util','datetimepicker','component-table','component-select'], function (ajax, util,datetimepicker,componentTable,componentSelect) {
	// 主页面Vue组件
	$('.dialog-table').html(addOrEditHtml)
	$('.mode-table').html(modetable)
	$('.type-table').html(typetable)
	$('.firm-table').html(firmtable)
	
	var page = new Vue({
		el: '.main',
		data: {
			isAdd:false,
			dialogVisible: false,
			dialogVisible2: false,
	        currentRow: null,
			// 搜索条件
			searchParam: {
				dto: {
				}
			},
			// 表格数据
			tableData:{},
			loading: true,
			tableConfig: {
				//loading: false,
				columns: ['operation']
			},
			util:util
		},
		computed: {
		},
		methods: {
			add(val){
				if(val == 'firm'){
					this.currentRow = {
						firmId:''
					}
				}
				if(val == 'type'){
					this.currentRow = {
						typeId:''
					}
				}
				if(val == 'mode'){
					this.currentRow = {
						modeId:''
					}
				}
				this.isAdd = true
		        this.dialogVisible2 = true
			},
			edit(row){
				this.currentRow = $.extend(true, {}, row)
				this.dialogVisible = true
		        //console.log(index, row);
			},
			del(row){
				let vm = this
				vm.currentRow = $.extend(true, {}, row)
				if(vm.currentRow.firmName != null){
					vm.deleteFunction('firm')
				}
				if(vm.currentRow.typeName != null){
					vm.deleteFunction('type')
				}
				if(vm.currentRow.modeName != null){
					vm.deleteFunction('mode')
				}
			},
			submit(val){
				let vm = this
				if(val == 'add'){
					if(vm.currentRow.firmName != null){vm.submitFunction_add('firm')}
					if(vm.currentRow.typeName != null){vm.submitFunction_add('type')}
					if(vm.currentRow.modeName != null){vm.submitFunction_add('mode')}
				}
				if(val == 'edit'){
					if(vm.currentRow.firmName != null){vm.submitFunction_edit('firm')}
					if(vm.currentRow.typeName != null){vm.submitFunction_edit('type')}
					if(vm.currentRow.modeName != null){vm.submitFunction_edit('mode')}
				}
			},
			submitFunction_add(val){
				let vm = this
				ajax.post('/'+val+'/add',this.currentRow).then(function (res) {
					vm.dialogVisible2 = false
					vm.fetchData();
					vm.loading = false
				}, function () {
					vm.loading = false
				})
			},
			submitFunction_edit(val){
				let vm = this
				ajax.post('/'+val+'/edit',this.currentRow).then(function (res) {
					vm.dialogVisible = false
					vm.fetchData();
					vm.loading = false
				}, function () {
					vm.loading = false
				})
			},
			deleteFunction(val){
				let vm = this
				vm.$confirm(`是否删除`, '请确认', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(() => {
		        	  		ajax.post('/'+val+'/delete',this.currentRow).then(function (res) {
							vm.fetchData();
							vm.loading = false
						}, function () {
							vm.loading = false
						})
		          }, () => {
		            vm.loading = false
		          })
			},
			/**
			 * 后台检索数据
			 */
			fetchData (pageConfig) {
				let vm = this
				vm.loading = true
				ajax.post('/dictionary/findList').then(function (res) {
					vm.tableData = res.data
					vm.loading = false
				}, function () {
					vm.loading = false
				})
			}
		},
		mounted(){
		},
		components: {
			componentTable: componentTable,
			componentSelect:componentSelect
		}
	})
	
//	外部js
//	nav计算屏幕高度
	$(".index-nav").height($(window).height() - 76);
	$(".index-ifram").height($(window).height() - 76);
	$(".index-ifram iframe").height($(window).height() - 76);
	
	$("#dropDown-mine").click(function(e){
		$(".dropDown-div").slideToggle();
		$("body").click(function(){
			$(".dropDown-div").slideUp();
		});
		e.stopPropagation();
	})
	$(".dropDown-div").click(function(e){
		e.stopPropagation();
	});
//	折叠
	$(".index-nav-div").click(function(){
		$(".index-nav-div").next(".nav-toggle").slideUp();
		$(this).next(".nav-toggle").slideToggle();
	})

		
	// ---------------
	// 验证
	// ---------------
	function loginValid () {
		util.formValid({
			selector: '#loginform',
			onkeyup: false,
			rules: {
				'username': {
					required: true
				},
				'userpass': {
					required: true,
				}
			},
			messages: {
				'username': {
					required: '请输入登录名'
				},
				'userpass': {
					required: '请输入密码'
				}
			}
		})
	  }
	
})
var firmtable	=`
					<el-table-column
						show-overflow-tooltip
						prop="firmName"
						sortable="custom"
						label="厂商"
						min-width="120">
					</el-table-column>
					
`
var typetable	=`
					<el-table-column
					show-overflow-tooltip
					prop="typeName"
					sortable="custom"
					label="类型"
					min-width="120">
					</el-table-column>
					
		`
var modetable	=`
					<el-table-column
					show-overflow-tooltip
					prop="modeName"
					sortable="custom"
					label="型号"
					min-width="120">
					</el-table-column>
			`
	
	
	
var addOrEditHtml=`		
					<div class="ui-row" style="margin-left:0px !important">
						<div class="ui-col">
							<div class="ui-form-group ui-col-50">
									<label class="ui-label-control ui-col-30 required-txt" v-if="currentRow.firmId != null">厂商</label>
									<label class="ui-label-control ui-col-30 required-txt" v-if="currentRow.typeId != null">类型</label>
									<label class="ui-label-control ui-col-30 required-txt" v-if="currentRow.modeId != null">型号</label>
								<div class="ui-col-60">
									<input v-if="currentRow.firmId != null" type="text" class="ui-input-control" v-model="currentRow.firmName" name="">
									<input v-if="currentRow.typeId != null" type="text" class="ui-input-control" v-model="currentRow.typeName" name="">
									<input v-if="currentRow.modeId != null" type="text" class="ui-input-control" v-model="currentRow.modeName" name="">
								</div>
							</div>
						</div>
					 </div>
`