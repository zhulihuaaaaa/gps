package com.gps.manager.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;
import com.gps.manager.dao.GpsMapper;
import com.gps.manager.dao.ext.GpsExtMapper;
import com.gps.manager.entity.Gps;
import com.gps.manager.entity.dto.GpsDto;
import com.gps.manager.entity.vo.GpsVo;
import com.gps.manager.service.GpsService;
import com.gps.manager.web.util.PageUtils;

@Service("GpsService")
public class GpsServiceImpl extends GylServiceImpl implements GpsService {
	
	@Autowired
	private GpsMapper gpsMapper;
	
	@Autowired
	private GpsExtMapper gpsExtMapper;

	@SuppressWarnings("unchecked")
	public PageInfo<GpsVo> findPage(PageUtils<GpsDto> page) {
		if (page == null) {
			return null;
		}
		setPageAndOrderBy(page);
		List<GpsVo> list = gpsExtMapper.findPage(page.getDto());
		return new PageInfo<GpsVo>(list);
		//处理分页丢失数据
//		PageInfo<GpsVo> dtoForPage = new PageInfo<GpsVo>();
//		BeanUtils.copyProperties(page,dtoForPage);
//		dtoForPage.setList(list);
//		return dtoForPage;
	}
	
	public List<GpsVo> findAll(GpsDto gpsDto) {
		return gpsExtMapper.findPage(gpsDto);
	}

	public int add(GpsDto dto) {
		return gpsMapper.insertSelective(dto);
	}
	
	public int edit(GpsDto dto) {
		return gpsMapper.updateByPrimaryKey(dto);
	}
	
	public int delete(Gps gps) {
		return gpsMapper.deleteByPrimaryKey(gps.getDid());
	}

	public Boolean importList(GpsDto gpsDto) {
		Boolean flag = true;
		Map<String, Long> map = gpsDto.getAttachVo().getMap();
		
		for (Map.Entry<String, Long> entry : map.entrySet()) {
			String dev_sno = entry.getKey().toString();
			Long dev_id = entry.getValue();
			gpsDto.setDevId(dev_id);
			gpsDto.setDevSno(dev_sno);
			int row = gpsMapper.insertSelective(gpsDto);
			if (row == 0) {
				flag = false;
			}
			else {
				gpsDto.setDid(null);
			}
		}
		return flag;
	}
}
