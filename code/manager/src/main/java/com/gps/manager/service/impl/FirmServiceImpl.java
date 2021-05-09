package com.gps.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gps.manager.dao.GpsFirmMapper;
import com.gps.manager.entity.GpsFirm;
import com.gps.manager.entity.GpsFirmExample;
import com.gps.manager.service.FirmService;

@Service("FirmService")
public class FirmServiceImpl extends GylServiceImpl implements FirmService {
	
	@Autowired
	private GpsFirmMapper gpsFirmMapper;
	
	public List<GpsFirm> findList() {
		GpsFirmExample example = new GpsFirmExample();
		return gpsFirmMapper.selectByExample(example);
	}
	
	public int add(GpsFirm firm) {
		return gpsFirmMapper.insertSelective(firm);
	}
	
	public int edit(GpsFirm firm) {
		return gpsFirmMapper.updateByPrimaryKey(firm);
	}
	
	public int delete(GpsFirm firm) {
		return gpsFirmMapper.deleteByPrimaryKey(firm.getFirmId());
	}
}
