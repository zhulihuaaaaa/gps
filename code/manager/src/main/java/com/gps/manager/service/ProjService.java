package com.gps.manager.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.gps.manager.entity.Proj;
import com.gps.manager.entity.dto.ProjDto;
import com.gps.manager.web.util.PageUtils;

public interface ProjService {
	
public PageInfo<Proj> findPage(PageUtils<ProjDto> page);
	
	public int add(ProjDto dto);
	
	public int edit(ProjDto dto);
	
	public int delete(Proj proj);
	
	public List<Proj> findList();
	
}
