package com.gps.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.github.pagehelper.PageInfo;
import com.gps.manager.dao.ProjMapper;
import com.gps.manager.entity.Proj;
import com.gps.manager.entity.ProjExample;
import com.gps.manager.entity.dto.ProjDto;
import com.gps.manager.service.ProjService;
import com.gps.manager.web.util.PageUtils;

@Service("ProjService")
public class ProjServiceImpl extends GylServiceImpl implements ProjService {
	
	@Autowired
	private ProjMapper projMapper;
	
	@SuppressWarnings("unchecked")
	public PageInfo<Proj> findPage(PageUtils<ProjDto> page) {
		if (page == null) {
			return null;
		}
		setPageAndOrderBy(page);
		ProjExample example = new ProjExample();
		ProjExample.Criteria criteria = example.createCriteria();
		ProjDto dto = page.getDto();
		if(!StringUtils.isEmpty(dto.getProjId())) {
			criteria.andProjIdEqualTo(dto.getProjId());
		}
		if(!StringUtils.isEmpty(dto.getProjName())) {
			criteria.andProjNameEqualTo(dto.getProjName());
		}
		if(!StringUtils.isEmpty(dto.getProjIp())) {
			criteria.andProjIpEqualTo(dto.getProjIp());
		}
		if(!StringUtils.isEmpty(dto.getProjKey())) {
			criteria.andProjKeyEqualTo(dto.getProjKey());
		}
		if(!StringUtils.isEmpty(dto.getContName())) {
			criteria.andContNameEqualTo(dto.getContName());
		}
		if(!StringUtils.isEmpty(dto.getContPhone())) {
			criteria.andContPhoneEqualTo(dto.getContPhone());
		}
		if(!StringUtils.isEmpty(dto.getContEmail())) {
			criteria.andContEmailEqualTo(dto.getContEmail());
		}
		List<Proj> list = projMapper.selectByExample(example);
		return new PageInfo<Proj>(list);
	}
	
	public int add(ProjDto dto) {
		return projMapper.insertSelective(dto);
	}
	
	public int edit(ProjDto dto) {
		return projMapper.updateByPrimaryKey(dto);
	}
	
	public int delete(Proj proj) {
		return projMapper.deleteByPrimaryKey(proj.getProjId());
	}
	
	public List<Proj> findList() {
		ProjExample example = new ProjExample();
		return projMapper.selectByExample(example);
	}
}
