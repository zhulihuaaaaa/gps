package com.gps.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gps.manager.dao.GpsTypeMapper;
import com.gps.manager.entity.GpsType;
import com.gps.manager.entity.GpsTypeExample;
import com.gps.manager.service.TypeService;

@Service("TypeService")
public class TypeServiceImpl extends GylServiceImpl implements TypeService {
	
	@Autowired
	private GpsTypeMapper gpsTypeMapper;
	
	public List<GpsType> findList() {
		GpsTypeExample example = new GpsTypeExample();
		return gpsTypeMapper.selectByExample(example);
	}
	
	public int add(GpsType type) {
		return gpsTypeMapper.insertSelective(type);
	}
	
	public int edit(GpsType type) {
		return gpsTypeMapper.updateByPrimaryKey(type);
	}
	
	public int delete(GpsType type) {
		return gpsTypeMapper.deleteByPrimaryKey(type.getTypeId());
	}
}
