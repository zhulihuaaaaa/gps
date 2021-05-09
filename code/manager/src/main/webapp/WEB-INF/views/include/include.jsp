<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path=request.getContextPath();/* 获取当前的系统路径 */
%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/><!--输当前所在的项目名称  -->

<!--  CSS -->
<%-- <link rel="icon" href="${ctx}/images/favicon.png"> --%>

<link rel="stylesheet" type="text/css" href="${ctx}/plugins/booststrap/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/plugins/font-awesome-4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/mgl-style.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/common.css"/>
<link href="${ctx}/plugins/elementui/index.css" rel="stylesheet" charset="utf-8">



