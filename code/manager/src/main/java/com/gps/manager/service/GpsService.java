package com.gps.manager.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.gps.manager.entity.Gps;
import com.gps.manager.entity.dto.GpsDto;
import com.gps.manager.entity.vo.GpsVo;
import com.gps.manager.web.util.PageUtils;

public interface GpsService {
	
	public PageInfo<GpsVo> findPage(PageUtils<GpsDto> page);
	
	public int add(GpsDto dto);
	
	public int edit(GpsDto dto);
	
	public int delete(Gps gps);
	
	public List<GpsVo> findAll(GpsDto gpsDto);
	
	public Boolean importList(GpsDto gpsDto);
	
}
