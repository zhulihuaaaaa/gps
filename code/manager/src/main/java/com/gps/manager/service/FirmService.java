package com.gps.manager.service;

import java.util.List;

import com.gps.manager.entity.GpsFirm;

public interface FirmService {
	
	public List<GpsFirm> findList();
	
	public int add(GpsFirm firm);
	
	public int edit(GpsFirm firm);
	
	public int delete(GpsFirm firm);
}
