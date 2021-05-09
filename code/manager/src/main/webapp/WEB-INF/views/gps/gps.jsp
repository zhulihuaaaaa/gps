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
				<p class="pull-left">GPS设备管理</p>
				<div class="pull-right">
					<form class="form-inline">
					  <div class="form-group">
					    <label>批量文件操作</label>
					    <button type="button" class="btn btn-default" @click="importList">批量导入</button>
					    <button type="button" class="btn btn-default">批量更新</button>
					    <button type="button" class="btn btn-default">批量绑定</button>
					  </div>
					  <div class="form-group">
					    <label>批量列表操作</label>
					    <button type="button" class="btn btn-default">批量解绑</button>
					    <button type="button" class="btn btn-default">批量删除</button>
					  </div>
					</form>
					 <!--新增弹出框-->
					 <el-dialog
					 	title="导入"
					    :visible.sync="dialogVisible_import">
					     <!-- 添加页 -->
					    <template class="importList-table"></template>
					    <el-row>
					    		<el-col :span="3" :offset="10">
					    			<el-button type="success" @click="submit('import')">批量导入</el-button>
					    		</el-col>
					    </el-row>
					    <span slot="footer" class="dialog-footer">
					      <el-button @click="dialogVisible_import = false">关 闭</el-button>
					    </span>
					  </el-dialog>
					  
					<button type="submit" class="btn btn-success" @click="add">新增</button>
					
					 <!--新增弹出框-->
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
			<!--搜索-->
			<template class="search-table"></template>
			<!--搜索-->
			
			<!-- 主列表 -->
			<div class="table-div">
				<component-table
					:loading="loading"
					:max-height="400"
					@edit="edit"
					@delete="del"
					@fetch-data="fetchData"
					:data="tableData"
					:columns="tableConfig.columns"
					:pagination="true">
					 <template class="gps-table"></template>
				</component-table>			
			</div>
		
			<!--编辑弹出框-->
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
		  	
		</div>
		<!-- main -->
			</div>
		</div>
		
	</body>
	<%@include file="../include/footer.jsp"%>
	
	<!-- 外部 -->
	 <script src="${ctx}/js/gps/gps.js"></script> 

</html>