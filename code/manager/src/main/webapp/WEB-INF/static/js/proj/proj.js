/**
 * Proj设置
 * 
 * @author zlh
 * @since 2018.2.27
 */
require(['ajax', 'util','datetimepicker','component-table','component-select'], function (ajax, util,datetimepicker,componentTable,componentSelect) {
	// 主页面Vue组件
	$('.dialog-table').html(addOrEditHtml)
	$('.search-table').html(searchtable)
	$('.proj-table').html(Projtable)
	
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
					projId:null,
					projName:null,
					projIp:null,
					projKey:null,
					contName:null,
					contPhone:null
				},
				// 页码
				pageNum: 0,	
				// 分页大小
				pageSize: 20,
				// 排序
				orderByClause: ''
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
			add(){
				this.currentRow = {
						projId:null,
						projName:null,
						projIp:null,
						projKey:null,
						contName:null,
						contPhone:null
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
				this.currentRow = $.extend(true, {}, row)
				vm.$confirm(`是否删除`, '请确认', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(() => {
		        	  		ajax.post('/proj/delete',this.currentRow).then(function (res) {
							vm.fetchData();
							vm.loading = false
						}, function () {
							vm.loading = false
						})
		          }, () => {
		            vm.loading = false
		          })
			},
			submit(val){
				let vm = this
				if(val == 'add'){
					ajax.post('/proj/add',this.currentRow).then(function (res) {
						vm.dialogVisible2 = false
						vm.fetchData();
						vm.loading = false
					}, function () {
						vm.loading = false
					})
				}
				if(val == 'edit'){
					ajax.post('/proj/edit',this.currentRow).then(function (res) {
						vm.dialogVisible = false
						vm.fetchData();
						vm.loading = false
					}, function () {
						vm.loading = false
					})
				}
			},
			/**
			 * 后台检索数据
			 */
			fetchData (pageConfig) {
				let vm = this
				if (pageConfig) {
					vm.searchParam.pageNum = pageConfig.pageNum
					vm.searchParam.pageSize = pageConfig.pageSize
					vm.searchParam.orderByClause = pageConfig.orderByClause
				}
				vm.loading = true
				ajax.findPage('/proj',vm.searchParam).then(function (res) {
					vm.tableData = res.data
					for(var item of vm.tableData.list){
						//vm.changeName(item)
					}
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

var searchtable=`
			<el-form :inline="true" label-width="90px" size="mini" class="demo-form-inline">
			    <el-form-item label="系统名称:">
			     <component-select v-model="searchParam.dto.projName" type="ProjName"></component-select>
			    </el-form-item>
      			<el-form-item label-width="170px" label="服务器地址(IP白名单):">
				  <component-select v-model="searchParam.dto.projIp" type="ProjIp"></component-select>
				</el-form-item>
				<el-form-item label="通信密钥:">
					<el-input style="width:170px" clearable v-model="searchParam.dto.projKey">
				</el-form-item>
				<el-form-item label="联系人:">
				    <component-select v-model="searchParam.dto.contName" type="ProjcontName"></component-select>
				</el-form-item>
				<el-form-item label="联系电话:">
				  	<component-select v-model="searchParam.dto.contPhone" type="ProjcontPhone"></component-select>
				</el-form-item>
				<el-form-item label="联系邮箱:">
					<component-select v-model="searchParam.dto.contEmail" type="ProjcontEmail"></component-select>
				</el-form-item>
			 <el-form>
			`
var Projtable=`
		<el-table-column
						show-overflow-tooltip
						prop="projId"
						sortable="custom"
						label="系统标识"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="projName"
						sortable="custom"
						label="系统名称"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="projIp"
						sortable="custom"
						label="服务器地址(IP白名单)"
						min-width="150">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="projKey"
						sortable="custom"
						label="通信密钥"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="contName"
						sortable="custom"
						label="联系人"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="contPhone"
						sortable="custom"
						label="联系电话"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="contEmail"
						sortable="custom"
						label="联系邮箱"
						min-width="120">
					</el-table-column>
`
	
	
var addOrEditHtml=`		
				<div class="ui-row" style="margin-left:0px !important">
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">系统名称</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.projName" name="">
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">通信密钥</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.projKey" name="">
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-100">
										<label class="ui-label-control ui-col-30 required-txt">服务器地址(IP白名单)</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.projIp" name="">
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">联系人</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.contName" name="">
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">联系电话</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.contPhone" name="">
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">联系邮箱</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.contEmail" name="">
										</div>
									</div>
								</div>
							 </div>
			`