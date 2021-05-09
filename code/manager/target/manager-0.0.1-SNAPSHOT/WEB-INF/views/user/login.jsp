<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" isELIgnored="false"%>
<!DOCTYPE html>
<html>
	<head>
		<%@include file="../include/head.jsp"%>
		<!-- 外部css -->
		<link rel="stylesheet" type="text/css" href="${ctx}/css/login.css"/> 
		<title></title>
	</head>
	<body>
		<img class="login-bg" src="${ctx }/images/login1.png"/>
		<div class="login-div">
			<h2>GPS设备数据平台</h2>
			<hr />
			<form id="loginform">
			  <div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon"><i class="fa fa-user"></i></div>
			      <input type="text" class="form-control" v-model="logindata.username" name="username" placeholder="请输入用户名">
			    </div>
			  </div>
			  <div class="form-group">
			    <div class="input-group">
			      <div class="input-group-addon"><i class="fa fa-lock"></i></div>
			      <input type="text" class="form-control" v-model="logindata.userpass" name="userpass" placeholder="请输入密码">
			    </div>
			  </div>
			    <div onsubmit="validateCode()" style="padding: 10px 60px 0 60px;overflow: hidden;">
				    <input class="pull-left" type="text"  id="inputCode" placeholder="请输入验证码"/>
				    <div class="pull-left" id="checkCode"  @click="createCode"></div>
				    <a href="#" class="login-a"  @click="createCode" style="">换一个</a>
			    </div>
				<div class="login-button">
				  	<button type="button" class="btn btn-primary" id="Button1" @click="submit">登&nbsp;&nbsp;&nbsp;&nbsp;陆</button>
				  	<a href="#">忘记密码?</a>
				</div>
			 </form> 
		</div>
	</body>
	<%@include file="../include/footer.jsp"%>
	<!-- 外部js -->
	<script src="${ctx}/js/user/login.js"></script>

</html>
