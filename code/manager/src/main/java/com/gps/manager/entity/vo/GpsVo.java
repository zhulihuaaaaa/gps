package com.gps.manager.entity.vo;

import java.io.Serializable;

import com.gps.manager.entity.Gps;

public class GpsVo extends Gps implements Serializable {
    private String firmName;
    private String typeName;
    private String modeName;
    private String projName;
	public String getFirmName() {
		return firmName;
	}
	public void setFirmName(String firmName) {
		this.firmName = firmName;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getModeName() {
		return modeName;
	}
	public void setModeName(String modeName) {
		this.modeName = modeName;
	}
	public String getProjName() {
		return projName;
	}
	public void setProjName(String projName) {
		this.projName = projName;
	}
    
}