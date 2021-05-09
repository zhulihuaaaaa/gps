/**
 * gps设置
 * 
 * @author zlh
 * @since 2018.2.27
 */
 
require(['ajax', 'util','datetimepicker','component-table','component-select','component-upload'], 
		function (ajax, util,datetimepicker,componentTable,componentSelect,componentUpload) {

	// 主页面Vue组件
	$('.dialog-table').html(addOrEditHtml)
	$('.gps-table').html(Gpstable)
	$('.importList-table').html(importlisttable)
	
	var page = new Vue({
		el: '.main',
		data: {
			isAdd:false,
			dialogVisible: false,
			dialogVisible2: false,
			dialogVisible_import:false,
	        currentRow: null,
	        importlistShow:false,
	        importErrorList:null,
	        importErrorList_header:null,
	        importSuccessbutton:false,
			// 搜索条件
			searchParam: {
				dto: {
					devId:null,
					devSno:null,
					projId:null,
					extFirmId:null,
					extModeId:null,
					extTypeId:null,
					prodNo:null,
					basAcc:null,
					basRideSta:null,
					batSn:null,
					devStatus:null,
				},
				// 页码
				pageNum: 0,
				// 分页大小
				pageSize: 20,
				// 排序
				orderByClause: ''
			},
			// 搜索条件
			importLists: {
					projId:null,
					extFirmId:null,
					extModeId:null,
					extTypeId:null,
					devStatus:null,
				attachVo:{}
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
						devId:null,
						devSno:null,
						projId:null,
						extFirmId:null,
						extModeId:null,
						extTypeId:null,
						prodNo:null,
						basAcc:null, 
						basRideSta:null,
						batSn:null,
						devStatus:null
				}
				this.isAdd = true
		        this.dialogVisible2 = true
			},
			edit(row){
				this.currentRow = $.extend(true, {}, row)
				this.changeId(this.currentRow)
		        this.dialogVisible = true
		        //console.log(index, row);
			},
			del(row){
				let vm = this
				vm.currentRow = $.extend(true, {}, row)
				vm.changeId(vm.currentRow)
				vm.$confirm(`是否删除`, '请确认', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		          }).then(() => {
		        	  		ajax.post('/gps/delete',vm.currentRow).then(function (res) {
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
					ajax.post('/gps/add',vm.currentRow).then(function (res) {
						vm.dialogVisible = false
						vm.dialogVisible2 = false
						vm.fetchData();
						vm.loading = false
					}, function () {
						vm.loading = false
					})
				}
				if(val == 'edit'){
					ajax.post('/gps/edit',vm.currentRow).then(function (res) {
						vm.dialogVisible = false
						vm.fetchData();
						vm.loading = false
					}, function () {
						vm.loading = false
					})
				}
				if(val == 'import'){
					if(vm.importLists.attachVo.map  != null && vm.importLists.attachVo.errorFlag  == "error"){
						vm.importlistShow = true
						vm.importErrorList_header = "文件包含重复的数据："
						vm.importErrorList = vm.importLists.attachVo.map
						vm.$refs.upload.clearFile();
					}
					else if(vm.importLists.attachVo.map  != null && vm.importLists.attachVo.errorFlag  == "ok"){
						ajax.post('/gps/importList',vm.importLists).then(function (res) {
							vm.fetchData();
							vm.loading = false
							vm.$notify({
						          title: '提示',
						          message: '导入文件成功',
						          type: 'success'
						        });
							vm.$refs.upload.clearFile();
						}, function () {
							vm.loading = false
						})
					}
					else{
						vm.importlistShow = true
						vm.importErrorList_header = "文件数据不全"
					}
				}
			},
			importList(){
				this.dialogVisible_import = true
				
			},
			handleSuccess (result) {
				this.importLists.attachVo = result.data
				//this.importLists.attach.push(result.data.attach)
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
				ajax.findPage('/gps',vm.searchParam).then(function (res) {
					vm.tableData = res.data
					for(var item of vm.tableData.list){
						vm.changeName(item)
					}
					vm.loading = false
				}, function () {
					vm.loading = false
				})
			},
			importErrorList_close(){
				this.importlistShow = false
			},
			/**
			 * id转换值
			 */
			changeName (item) {
				if(item.basAcc == 1){
					item.basAcc = '开'
				}
				if(item.basAcc == 0){
					item.basAcc = '关'
				}
				if(item.basRideSta == 0){
					item.basRideSta = '未知'
				}
				if(item.basRideSta == 1){
					item.basRideSta = '骑行'
				}
				if(item.basRideSta == 2){
					item.basRideSta = '非骑行'
				}
				if(item.devStatus == 0){
					item.devStatus = '不可用'
				}
				if(item.devStatus == 1){
					item.devStatus = '可用'
				}
				if(item.devStatus == 2){
					item.devStatus = '异常'
				}
			},
			/**
			 * 值转换id
			 */
			changeId (item) {
				if(item.basAcc == '开'){
					item.basAcc = 1
				}
				if(item.basAcc == '关'){
					item.basAcc = 0
				}
				if(item.basRideSta == '未知'){
					item.basRideSta = 0
				}
				if(item.basRideSta == '骑行'){
					item.basRideSta = 1
				}
				if(item.basRideSta == '非骑行'){
					item.basRideSta = 2
				}
				if(item.devStatus == '不可用'){
					item.devStatus = 0
				}
				if(item.devStatus == '可用'){
					item.devStatus = 1
				}
				if(item.devStatus == '异常'){
					item.devStatus = 2
				}
			}
		},
		mounted(){
		},
		components: {
			componentTable: componentTable,
			componentSelect:componentSelect,
			componentUpload:componentUpload
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
			  <el-form-item label="设备标识:">
			    <el-input style="width:170px" clearable v-model="searchParam.dto.devId">
			  </el-form-item>
			  <el-form-item label="设备序列号:">
			    <component-select v-model="searchParam.dto.devSno" type="gpsDevSno" :search="true" :remoteseach="true"></component-select>
			  </el-form-item>
			  <el-form-item label="关联系统:">
			    <component-select v-model="searchParam.dto.projId" type="proj"></component-select>
			  </el-form-item>
			  <el-form-item label="厂商:">
			    <component-select v-model="searchParam.dto.extFirmId" type="firm"></component-select>
			  </el-form-item>
			  <el-form-item label="型号:">
			    <component-select v-model="searchParam.dto.extModeId" type="mode"></component-select>
			  </el-form-item>
			  <el-form-item label="类型:">
			    <component-select v-model="searchParam.dto.extTypeId" type="type"></component-select>
			  </el-form-item>
			  <el-form-item label="商品编码:">
			  	<el-input style="width:170px" clearable v-model="searchParam.dto.prodNo">
			  </el-form-item>
			  <el-form-item label="电门开关:">
			    <component-select v-model="searchParam.dto.basAcc" type="basAccState"></component-select>
			  </el-form-item>
			  <el-form-item label="骑行状态:">
			    <component-select v-model="searchParam.dto.basRideSta" type="rideState"></component-select>
			  </el-form-item>
			   <el-form-item label="电池序列号:">
			    <component-select v-model="searchParam.dto.batSn" type="gpsBatSn" :search="true" :remoteseach="true"></component-select>
			  </el-form-item>
			   <el-form-item label="设备状态:">
			    <component-select v-model="searchParam.dto.devStatus" type="devState"></component-select>
			  </el-form-item>
			  <button @click="fetchData()" type="button" class="btn btn-primary">搜索</button>
			 </el-form>
`
var Gpstable	=`
		<el-table-column
						show-overflow-tooltip
						prop="devId"
						sortable="custom"
						label="设备标识"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="devSno"
						sortable="custom"
						label="设备序列号"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="projName"
						sortable="custom"
						label="关系服务系统"
						min-width="150">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="firmName"
						sortable="custom"
						label="厂商"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="modeName"
						sortable="custom"
						label="型号"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="typeName"
						sortable="custom"
						label="类型"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="prodNo"
						sortable="custom"
						label="商品编码"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="basAcc"
						sortable="custom"
						label="电门开关"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="basRideSta"
						sortable="custom"
						label="骑行状态"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="batSn"
						sortable="custom"
						label="电池序列号"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="devStatus"
						sortable="custom"
						label="设备状态"
						min-width="120">
					</el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="a"
						sortable="custom"
						label="地图"
						min-width="120">
					</el-table-column>
`
	
	
var addOrEditHtml=`	
				<div class="ui-row" style="margin-left:0px !important">
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">设备:</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.devId" name="">
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">设备序列号:</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.devSno" name="">
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">关系服务系统:</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.projId" type="proj"></component-select>
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">厂商:</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.extFirmId" type="firm"></component-select>
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">型号:</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.extModeId" type="mode"></component-select>
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">类型:</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.extTypeId" type="type"></component-select>
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">电门开关:</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.basAcc" type="basAccState"></component-select>
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">骑行状态：</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.basRideSta" type="rideState"></component-select>
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">电池序列号：</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.batSn" name="">
										</div>
									</div>
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">设备状态:</label>
										<div class="ui-col-60">
											<component-select v-model="currentRow.devStatus" type="devState"></component-select>
										</div>
									</div>
								</div>
								<div class="ui-col">
									<div class="ui-form-group ui-col-50">
										<label class="ui-label-control ui-col-30 required-txt">商品编码:</label>
										<div class="ui-col-60">
											<input type="text" class="ui-input-control" v-model="currentRow.prodNo" name="">
										</div>
									</div>
								</div>
							 </div>
			`
	var importlisttable = `
						<el-form :inline="true" label-width="90px" size="mini" class="demo-form-inline">
							  <el-form-item label="厂商:">
							    <component-select v-model="importLists.extFirmId" type="firm"></component-select>
							  </el-form-item>
							  <el-form-item label="型号:">
							    <component-select v-model="importLists.extModeId" type="mode"></component-select>
							  </el-form-item>
							  <el-form-item label="类型:">
							    <component-select v-model="importLists.extTypeId" type="type"></component-select>
							  </el-form-item>
							  <el-form-item label="设备状态:">
							    <component-select v-model="importLists.devStatus" type="devState"></component-select>
							  </el-form-item>
							   <el-form-item label="关联系统:">
							    <component-select v-model="importLists.projId" type="proj"></component-select>
							  </el-form-item>
						       <el-form-item label="设备文件:">
							    <component-upload @success="handleSuccess" ref="upload" :auto-upload="true" ></component-upload>
							   </el-form-item>
							     <el-button
							     	v-show="importSuccessbutton"
								    plain
								    >
								    成功
							   </el-button>
							   <el-card v-show="importlistShow" class="box-card import-card" ref="card">
							   	  <div slot="header" class="clearfix">
								    <span>{{importErrorList_header }}</span>
								    <el-button  @click="importErrorList_close"  type="success">重新导入</el-button>
								  </div>
								  <div v-for="(value, key) in importErrorList" class="text item">
								   		{{ key }}: {{ value }}
								  </div>
							   </el-card>
			  			</el-form>
	`