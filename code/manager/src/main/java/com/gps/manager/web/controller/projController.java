package com.gps.manager.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.gps.manager.entity.Proj;
import com.gps.manager.entity.dto.ProjDto;
import com.gps.manager.service.ProjService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;
import com.gps.manager.web.util.PageUtils;

@Controller
@RequestMapping(value="/proj")
public class projController {
    @Autowired
    private ProjService projService;
    
    @RequestMapping("/main")
   	public ModelAndView main() {
   		ModelAndView modelAndView = new ModelAndView("/proj/proj");
   		return modelAndView;
   	}
    
    /**
  	 * 查询所有proj带分页
  	 * @param request
  	 * @param dto
  	 * @return
  	 */
  	@RequestMapping("/findPage")
  	@ResponseBody
  	public AjaxResult findPage(HttpServletRequest request,@RequestBody PageUtils<ProjDto> page) {
  		try {
  			return AjaxResult.createSuccessResult(projService.findPage(page));
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
  	public AjaxResult add(HttpServletRequest request,@RequestBody ProjDto dto) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,projService.add(dto));
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
  	public AjaxResult edit(HttpServletRequest request,@RequestBody ProjDto dto) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,projService.edit(dto));
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
  	public AjaxResult delete(HttpServletRequest request,@RequestBody Proj proj) {
  		try {
  			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,projService.delete(proj));
  		} catch (Exception e) {
  			e.printStackTrace();
  		}
  		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
  	}
    
    /**
	 * 查询所有关联服务系统 下拉使用
	 * @param request
	 * @param dto
	 * @return
	 */
	@RequestMapping("/findList")
	@ResponseBody
	public AjaxResult findList(HttpServletRequest request) {
		try {
			return AjaxResult.createSuccessResult(projService.findList());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
	}
	
}
