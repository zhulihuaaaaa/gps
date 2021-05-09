package com.gps.manager.entity.vo;

import java.io.Serializable;
import java.util.Map;

import com.gps.manager.entity.Attach;

public class AttachVo extends Attach implements Serializable {
	private Map<String,Long> map;
	
	private String ErrorFlag; 

	public Map<String, Long> getMap() {
		return map;
	}

	public void setMap(Map<String, Long> map) {
		this.map = map;
	}

	public String getErrorFlag() {
		return ErrorFlag;
	}

	public void setErrorFlag(String errorFlag) {
		ErrorFlag = errorFlag;
	}

}