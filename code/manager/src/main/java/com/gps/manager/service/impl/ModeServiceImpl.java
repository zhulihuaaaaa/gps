package com.gps.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gps.manager.dao.GpsModeMapper;
import com.gps.manager.entity.GpsMode;
import com.gps.manager.entity.GpsModeExample;
import com.gps.manager.service.ModeService;

@Service("ModeService")
public class ModeServiceImpl extends GylServiceImpl implements ModeService {
	
	@Autowired
	private GpsModeMapper gpsModeMapper;
	
	public List<GpsMode> findList() {
		GpsModeExample example = new GpsModeExample();
		return gpsModeMapper.selectByExample(example);
	}
	
	public int add(GpsMode mode) {
		return gpsModeMapper.insertSelective(mode);
	}
	
	public int edit(GpsMode mode) {
		return gpsModeMapper.updateByPrimaryKey(mode);
	}
	
	public int delete(GpsMode mode) {
		return gpsModeMapper.deleteByPrimaryKey(mode.getModeId());
	}
}
