package com.gps.manager.web.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.gps.manager.entity.Gps;
import com.gps.manager.entity.dto.GpsDto;
import com.gps.manager.entity.vo.GpsVo;
import com.gps.manager.service.GpsService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;
import com.gps.manager.web.util.PageUtils;

@Controller
@RequestMapping(value="/gps")
public class GpsController {
    @Autowired
    private GpsService gpsService;
    
    @RequestMapping("/main")
	public ModelAndView main() {
		ModelAndView modelAndView = new ModelAndView("/gps/gps");
		return modelAndView;
	}
    
    /**
	 * 查询所有gps带分页
	 * @param request
	 * @param dto
	 * @return	
	 */
	@RequestMapping("/findPage")
	@ResponseBody
	public AjaxResult findPage(HttpServletRequest request,@RequestBody PageUtils<GpsDto> page) {
		try {
			return AjaxResult.createSuccessResult(gpsService.findPage(page));
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
	public AjaxResult add(HttpServletRequest request,@RequestBody GpsDto dto) {
		try {
			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,gpsService.add(dto));
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
	public AjaxResult edit(HttpServletRequest request,@RequestBody GpsDto dto) {
		try {
			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,gpsService.edit(dto));
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
	public AjaxResult delete(HttpServletRequest request,@RequestBody Gps gps) {
		try {
			return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,gpsService.delete(gps));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
	}
	
    /**
	 * 查询gps所有 下拉用
	 * @param request
	 * @param 
	 * @return
	 */
	@RequestMapping(value="/findList")
    @ResponseBody
    public AjaxResult findAll(HttpServletRequest request,@RequestBody GpsDto gpsdto){
    	 	try {
			return AjaxResult.createSuccessResult(gpsService.findAll(gpsdto));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
    }
	
	  /**
		 * 批量导入
		 * @param request
		 * @param 
		 * @return
		 */
		@RequestMapping(value="/importList")
	    @ResponseBody
	    public AjaxResult importList(HttpServletRequest request,@RequestBody GpsDto gpsdto){
	    	 	try {
				return AjaxResult.createSuccessResult(gpsService.importList(gpsdto));
			} catch (Exception e) {
				e.printStackTrace();
			}
			return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
	    }
    
}
