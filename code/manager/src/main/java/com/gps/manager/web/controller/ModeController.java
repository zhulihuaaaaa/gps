package com.gps.manager.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gps.manager.entity.GpsMode;
import com.gps.manager.service.ModeService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;

@Controller
@RequestMapping(value="/mode")
public class ModeController {
    @Autowired
    private ModeService modeService;
    
    /**
	 * 查询所有型号
	 * @param request
	 * @param 
	 * @return
	 */
	@RequestMapping("/findList")
	@ResponseBody
	public AjaxResult findList(HttpServletRequest request) {
		try {
			return AjaxResult.createSuccessResult(modeService.findList());
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
	public AjaxResult add(HttpServletRequest request,@RequestBody GpsMode mode) {
		try {
			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,modeService.add(mode));
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
  	public AjaxResult edit(HttpServletRequest request,@RequestBody GpsMode mode) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,modeService.edit(mode));
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
  	public AjaxResult delete(HttpServletRequest request,@RequestBody GpsMode mode) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,modeService.delete(mode));
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
  	}
	
}
