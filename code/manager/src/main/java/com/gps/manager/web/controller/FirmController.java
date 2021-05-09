package com.gps.manager.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gps.manager.entity.GpsFirm;
import com.gps.manager.service.FirmService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;

@Controller
@RequestMapping(value="/firm")
public class FirmController {
    @Autowired
    private FirmService firmService;
    
    /**
	 * 查询所有厂商
	 * @param request
	 * @param dto
	 * @return
	 */
	@RequestMapping("/findList")
	@ResponseBody
	public AjaxResult findList(HttpServletRequest request) {
		try {
			return AjaxResult.createSuccessResult(firmService.findList());
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
		public AjaxResult add(HttpServletRequest request,@RequestBody GpsFirm firm) {
			try {
				return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,firmService.add(firm));
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
	  	public AjaxResult edit(HttpServletRequest request,@RequestBody GpsFirm firm) {
	  		try {
	  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,firmService.edit(firm));
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
	  	public AjaxResult delete(HttpServletRequest request,@RequestBody GpsFirm firm) {
	  		try {
	  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,firmService.delete(firm));
	  		} catch (Exception e) {
	  			e.printStackTrace();
	  		}
	  		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
	  	}
	
}
