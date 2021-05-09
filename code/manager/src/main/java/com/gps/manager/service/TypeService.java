package com.gps.manager.service;

import java.util.List;

import com.gps.manager.entity.GpsType;

public interface TypeService {
	
	public List<GpsType> findList();
	
	public int add(GpsType type);
	
	public int edit(GpsType type);
	
	public int delete(GpsType type);
	
}
