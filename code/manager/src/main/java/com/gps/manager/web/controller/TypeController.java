package com.gps.manager.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gps.manager.entity.GpsType;
import com.gps.manager.service.TypeService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;

@Controller
@RequestMapping(value="/type")
public class TypeController {
    @Autowired
    private TypeService typeService;
    
    /**
	 * 查询所有类型
	 * @param request
	 * @param 
	 * @return
	 */
	@RequestMapping("/findList")
	@ResponseBody
	public AjaxResult findList(HttpServletRequest request) {
		try {
			return AjaxResult.createSuccessResult(typeService.findList());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
	}
	
	/**
	 * 新增
	 * @param request
	 * @param dto
	 * @return
	 */
	@RequestMapping("/add")
	@ResponseBody
	public AjaxResult add(HttpServletRequest request,@RequestBody GpsType type) {
		try {
			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,typeService.add(type));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
	}

	/**
  	 * 编辑
  	 * @param request
  	 * @param dto
  	 * @return
  	 */
  	@RequestMapping("/edit")
  	@ResponseBody
  	public AjaxResult edit(HttpServletRequest request,@RequestBody GpsType type) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,typeService.edit(type));
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
  	}
  	 
  	
  	/**
  	 * 删除
  	 * @param request
  	 * @param dto
  	 * @return
  	 */
  	@RequestMapping("/delete")
  	@ResponseBody
  	public AjaxResult delete(HttpServletRequest request,@RequestBody GpsType type) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,typeService.delete(type));
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
  	}
	
}
