package com.gps.manager.web.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.github.pagehelper.PageInfo;
import com.gps.manager.entity.Gps;
import com.gps.manager.entity.GpsFirm;
import com.gps.manager.entity.GpsMode;
import com.gps.manager.entity.GpsType;
import com.gps.manager.entity.dto.GpsDto;
import com.gps.manager.service.FirmService;
import com.gps.manager.service.ModeService;
import com.gps.manager.service.TypeService;
import com.gps.manager.web.util.AjaxResult;
import com.gps.manager.web.util.MessageCode;
import com.gps.manager.web.util.PageUtils;

@Controller
@RequestMapping(value="/dictionary")
public class DictionaryController {
    @Autowired
    private FirmService firmService;
    @Autowired
    private TypeService typeService;
    @Autowired
    private ModeService modeService;
    
    @RequestMapping("/main")
	public ModelAndView main() {
		ModelAndView modelAndView = new ModelAndView("/dictionary/dictionary");
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
		//	return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,gpsService.add(dto));
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
		//	return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,gpsService.edit(dto));
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
		//	return AjaxResult.createSuccessResultWithCode(MessageCode.SAVE_SUCCESS,gpsService.delete(gps));
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
    public AjaxResult findAll(HttpServletRequest request){
    	 	try {
    	 		Map<String,Object> map = new HashMap<String,Object>();
    			List<GpsMode> modeList = modeService.findList();
    			map.put("mode",modeList);
    			List<GpsType> typeList = typeService.findList();
    			map.put("type",typeList);
    			List<GpsFirm> firmList = firmService.findList();
    			map.put("firm",firmList);
    			return AjaxResult.createSuccessResult(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return AjaxResult.createErrorResult(MessageCode.OPERATE_FAILED);	
    }
    
}
