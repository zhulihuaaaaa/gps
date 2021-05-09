package com.gps.manager.entity.dto;

import com.gps.manager.entity.Gps;
import com.gps.manager.entity.vo.AttachVo;

public class GpsDto extends Gps {
	
	private AttachVo attachVo;

	public AttachVo getAttachVo() {
		return attachVo;
	}

	public void setAttachVo(AttachVo attachVo) {
		this.attachVo = attachVo;
	}

}