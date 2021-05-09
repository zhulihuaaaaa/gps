<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
	<head>
		<%@include file="../include/head.jsp"%>
		<title></title>
	</head>
	<body style="overflow-y: hidden;">
		<%@include file="../include/menu.jsp"%>
		<div class="index-main">
			<%@include file="../include/left_menu.jsp"%>
			<div class="pull-right index-ifram">
				<!--main-->
				<div class="main">
			<div class="top-title">
				<p class="pull-left">字典管理</p>
				<div class="pull-right">
					<form class="form-inline">
					  <div class="form-group">
					    <label>批量文件操作</label>
					    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#batch-import">批量导入</button>
					    <button type="button" class="btn btn-default">批量更新</button>
					    <button type="button" class="btn btn-default">批量绑定</button>
					  </div>
					  <div class="form-group">
					    <label>批量列表操作</label>
					    <button type="button" class="btn btn-default">批量解绑</button>
					    <button type="button" class="btn btn-default">批量删除</button>
					  </div>
					</form>
					
					 <!--弹出框-->
					 <el-dialog
					 	title="新增"
					    v-if="isAdd"
					    :visible.sync="dialogVisible2">
					     <!-- 添加页 -->
					    <template class="dialog-table"></template>
					    <span slot="footer" class="dialog-footer">
					      <el-button @click="dialogVisible2 = false">取 消</el-button>
					      <el-button type="primary" @click="submit('add')">确 定</el-button>
					    </span>
					  </el-dialog>
				</div>
			</div>

		   <!-- table1 -->
				<el-row type="flex" :gutter="10" justify="center">
					<el-col :span="12">
					<!--搜索-->
					<div class="search-div">
					<form class="form-inline">
					  <div class="form-group">
					    <label>厂商</label>
					    <component-select v-model="searchParam.dto.devId" type="firm"></component-select>
					  </div>
					  <button @click="fetchData()" type="button" class="btn btn-primary">搜索</button>
					  <button type="button" class="btn btn-success" @click="add('firm')">新增</button>
					</form>
					</div>
					<!--搜索end-->
					<div class="table-div">
						<component-table
							:loading="loading"
							:max-height="300"
							@edit="edit"
							@delete="del"
							@fetch-data="fetchData"
							:data="tableData.firm"
							:columns="tableConfig.columns"
							>
							<!-- 主列表 -->
							 <template class="firm-table"></template>
						</component-table>			
					</div>
					</el-col>
			<!-- table2 -->
					<el-col :span="12">
					<!--搜索-->
					<div class="search-div">
					<form class="form-inline">
					  <div class="form-group">
					    <label>类型</label>
					    <component-select v-model="searchParam.dto.devId" type="type"></component-select>
					  </div>
					  <button @click="fetchData()" type="button" class="btn btn-primary">搜索</button>
					  <button type="button" class="btn btn-success" @click="add('type')">新增</button>
					</form>
					</div>
					<!--搜索end-->
					<div class="table-div">
						<component-table
							:loading="loading"
							:max-height="300"
							@edit="edit"
							@delete="del"
							@fetch-data="fetchData"
							:data="tableData.type"
							:columns="tableConfig.columns"
							>
							<!-- 主列表 -->
							 <template class="type-table"></template>
						</component-table>			
					</div>
					</el-col>
				</el-row>
			<!-- table3 -->
				<el-row  style="margin-top: 20px;" type="flex" :gutter="10" >
					<el-col :span="12">
					<!--搜索-->
					<div class="search-div">
					<form class="form-inline">
					  <div class="form-group">
					    <label>型号</label>
					    <component-select v-model="searchParam.dto.devId" type="mode"></component-select>
					  </div>
					  <button @click="fetchData()" type="button" class="btn btn-primary">搜索</button>
					  <button type="button" class="btn btn-success" @click="add('mode')">新增</button>
					</form>
					</div>
					<!--搜索end-->
					<div class="table-div">
						<component-table
							:loading="loading"
							:max-height="300"
							@edit="edit"
							@delete="del"
							@fetch-data="fetchData"
							:data="tableData.mode"
							:columns="tableConfig.columns"
							>
							<!-- 主列表 -->
							 <template class="mode-table"></template>
						</component-table>			
					</div>
					</el-col>
				</el-row>
			
			
			<!--弹出框-->
			 <el-dialog
			 	title="编辑"
			    v-if="currentRow != null"
			    :visible.sync="dialogVisible">
			    <!-- 编辑页 -->
			    <template class="dialog-table"></template>
			    <span slot="footer" class="dialog-footer">
			      <el-button @click="dialogVisible = false">取 消</el-button>
			      <el-button type="primary" @click="submit('edit')">确 定</el-button>
			    </span>
			  </el-dialog>
			  
		  	<!--批量导入-->
			<div class="modal fade " id="batch-import" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      	<div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 class="modal-title">批量导入</h4>
				    </div>
				    <div class="modal-body">
				        <table class="table" id="table">
				        	<tr>
				        		<td><input type="file" /></td>
				        		<td>
				        			<i class="fa fa-plus" id="addTable"></i>
				        			<i class="fa fa-close" id="deletTable"></i>
				        		</td>
				        	</tr>
				        </table>
				    </div>
				    <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				        <button type="button" class="btn btn-primary">保存</button>
				    </div>
			    </div>
			  </div>
			</div>
			<!--新增-->
	
		</div>
		<!-- main -->
			</div>
		</div>
		
	</body>
	<%@include file="../include/footer.jsp"%>
	
	<!-- 外部 -->
	 <script src="${ctx}/js/dictionary/dictionary.js"></script> 

</html>