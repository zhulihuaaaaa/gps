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
				<p class="pull-left">系統集成管理</p>
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
					<button type="submit" class="btn btn-success" @click="add">新增</button>
					
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
			<!--搜索-->
			<template class="search-table"></template>
			<!--搜索end-->
			
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
					<!-- 主列表 -->
					 <template class="proj-table"></template>
				</component-table>			
			</div>
		
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
	 <script src="${ctx}/js/proj/proj.js"></script> 

</html>