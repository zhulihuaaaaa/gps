package com.gps.manager.service;

import java.util.List;

import com.gps.manager.entity.GpsMode;

public interface ModeService {
	
	public List<GpsMode> findList();
	
	public int add(GpsMode mode);
	
	public int edit(GpsMode mode);
	
	public int delete(GpsMode mode);
}	