package com.gps.manager.web.controller;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.gps.manager.entity.vo.AttachVo;
import com.gps.manager.service.BaseService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;

@Controller
@RequestMapping(value="/base")
public class BaseController {
	 @Autowired
	 private BaseService baseService;
	/**
	 * 上传并返回实例map
	 * @param request
	 * @param response
	 * @param multipartfiles
	 * @throws IOException
	 */
	@RequestMapping("/upload")
	@ResponseBody
	public AjaxResult uplaodFile(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("file") MultipartFile multipartfile) throws IOException {
		try {
			AttachVo attachVo = baseService.uploadFile(multipartfile);
			return AjaxResult.createSuccessResult(attachVo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED, "上传失败");
	}
	
}
