package com.gps.manager.entity;

import java.io.Serializable;
import java.math.BigDecimal;

public class Gps implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = -1509981223914137665L;

	/**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.did
     *
     * @mbggenerated
     */
    private Integer did;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.dev_id
     *
     * @mbggenerated
     */
    private Long devId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.dev_sno
     *
     * @mbggenerated
     */
    private String devSno;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.ext_firm_id
     *
     * @mbggenerated
     */
    private Integer extFirmId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.ext_mode_id
     *
     * @mbggenerated
     */
    private Integer extModeId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.ext_type_id
     *
     * @mbggenerated
     */
    private Integer extTypeId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.proj_id
     *
     * @mbggenerated
     */
    private Integer projId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.prod_no
     *
     * @mbggenerated
     */
    private Integer prodNo;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.dev_ts
     *
     * @mbggenerated
     */
    private Long devTs;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bas_acc
     *
     * @mbggenerated
     */
    private Integer basAcc;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bas_defe_sta
     *
     * @mbggenerated
     */
    private Integer basDefeSta;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bas_ride_sta
     *
     * @mbggenerated
     */
    private Integer basRideSta;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bas_reason
     *
     * @mbggenerated
     */
    private Integer basReason;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bas_sensor
     *
     * @mbggenerated
     */
    private Integer basSensor;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bas_fcode
     *
     * @mbggenerated
     */
    private String basFcode;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.gps_lng
     *
     * @mbggenerated
     */
    private BigDecimal gpsLng;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.gps_lat
     *
     * @mbggenerated
     */
    private BigDecimal gpsLat;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.gps_spd
     *
     * @mbggenerated
     */
    private Integer gpsSpd;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.gps_heading
     *
     * @mbggenerated
     */
    private Integer gpsHeading;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.gps_ts
     *
     * @mbggenerated
     */
    private Long gpsTs;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.dev_mc
     *
     * @mbggenerated
     */
    private String devMc;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bat_vol
     *
     * @mbggenerated
     */
    private Integer batVol;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bat_cap
     *
     * @mbggenerated
     */
    private Integer batCap;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.bat_sn
     *
     * @mbggenerated
     */
    private String batSn;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column gps.dev_status
     *
     * @mbggenerated
     */
    private Integer devStatus;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.did
     *
     * @return the value of gps.did
     *
     * @mbggenerated
     */
    public Integer getDid() {
        return did;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.did
     *
     * @param did the value for gps.did
     *
     * @mbggenerated
     */
    public void setDid(Integer did) {
        this.did = did;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.dev_id
     *
     * @return the value of gps.dev_id
     *
     * @mbggenerated
     */
    public Long getDevId() {
        return devId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.dev_id
     *
     * @param devId the value for gps.dev_id
     *
     * @mbggenerated
     */
    public void setDevId(Long devId) {
        this.devId = devId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.dev_sno
     *
     * @return the value of gps.dev_sno
     *
     * @mbggenerated
     */
    public String getDevSno() {
        return devSno;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.dev_sno
     *
     * @param devSno the value for gps.dev_sno
     *
     * @mbggenerated
     */
    public void setDevSno(String devSno) {
        this.devSno = devSno == null ? null : devSno.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.ext_firm_id
     *
     * @return the value of gps.ext_firm_id
     *
     * @mbggenerated
     */
    public Integer getExtFirmId() {
        return extFirmId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.ext_firm_id
     *
     * @param extFirmId the value for gps.ext_firm_id
     *
     * @mbggenerated
     */
    public void setExtFirmId(Integer extFirmId) {
        this.extFirmId = extFirmId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.ext_mode_id
     *
     * @return the value of gps.ext_mode_id
     *
     * @mbggenerated
     */
    public Integer getExtModeId() {
        return extModeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.ext_mode_id
     *
     * @param extModeId the value for gps.ext_mode_id
     *
     * @mbggenerated
     */
    public void setExtModeId(Integer extModeId) {
        this.extModeId = extModeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.ext_type_id
     *
     * @return the value of gps.ext_type_id
     *
     * @mbggenerated
     */
    public Integer getExtTypeId() {
        return extTypeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.ext_type_id
     *
     * @param extTypeId the value for gps.ext_type_id
     *
     * @mbggenerated
     */
    public void setExtTypeId(Integer extTypeId) {
        this.extTypeId = extTypeId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.proj_id
     *
     * @return the value of gps.proj_id
     *
     * @mbggenerated
     */
    public Integer getProjId() {
        return projId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.proj_id
     *
     * @param projId the value for gps.proj_id
     *
     * @mbggenerated
     */
    public void setProjId(Integer projId) {
        this.projId = projId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.prod_no
     *
     * @return the value of gps.prod_no
     *
     * @mbggenerated
     */
    public Integer getProdNo() {
        return prodNo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.prod_no
     *
     * @param prodNo the value for gps.prod_no
     *
     * @mbggenerated
     */
    public void setProdNo(Integer prodNo) {
        this.prodNo = prodNo;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.dev_ts
     *
     * @return the value of gps.dev_ts
     *
     * @mbggenerated
     */
    public Long getDevTs() {
        return devTs;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.dev_ts
     *
     * @param devTs the value for gps.dev_ts
     *
     * @mbggenerated
     */
    public void setDevTs(Long devTs) {
        this.devTs = devTs;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bas_acc
     *
     * @return the value of gps.bas_acc
     *
     * @mbggenerated
     */
    public Integer getBasAcc() {
        return basAcc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bas_acc
     *
     * @param basAcc the value for gps.bas_acc
     *
     * @mbggenerated
     */
    public void setBasAcc(Integer basAcc) {
        this.basAcc = basAcc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bas_defe_sta
     *
     * @return the value of gps.bas_defe_sta
     *
     * @mbggenerated
     */
    public Integer getBasDefeSta() {
        return basDefeSta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bas_defe_sta
     *
     * @param basDefeSta the value for gps.bas_defe_sta
     *
     * @mbggenerated
     */
    public void setBasDefeSta(Integer basDefeSta) {
        this.basDefeSta = basDefeSta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bas_ride_sta
     *
     * @return the value of gps.bas_ride_sta
     *
     * @mbggenerated
     */
    public Integer getBasRideSta() {
        return basRideSta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bas_ride_sta
     *
     * @param basRideSta the value for gps.bas_ride_sta
     *
     * @mbggenerated
     */
    public void setBasRideSta(Integer basRideSta) {
        this.basRideSta = basRideSta;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bas_reason
     *
     * @return the value of gps.bas_reason
     *
     * @mbggenerated
     */
    public Integer getBasReason() {
        return basReason;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bas_reason
     *
     * @param basReason the value for gps.bas_reason
     *
     * @mbggenerated
     */
    public void setBasReason(Integer basReason) {
        this.basReason = basReason;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bas_sensor
     *
     * @return the value of gps.bas_sensor
     *
     * @mbggenerated
     */
    public Integer getBasSensor() {
        return basSensor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bas_sensor
     *
     * @param basSensor the value for gps.bas_sensor
     *
     * @mbggenerated
     */
    public void setBasSensor(Integer basSensor) {
        this.basSensor = basSensor;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bas_fcode
     *
     * @return the value of gps.bas_fcode
     *
     * @mbggenerated
     */
    public String getBasFcode() {
        return basFcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bas_fcode
     *
     * @param basFcode the value for gps.bas_fcode
     *
     * @mbggenerated
     */
    public void setBasFcode(String basFcode) {
        this.basFcode = basFcode == null ? null : basFcode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.gps_lng
     *
     * @return the value of gps.gps_lng
     *
     * @mbggenerated
     */
    public BigDecimal getGpsLng() {
        return gpsLng;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.gps_lng
     *
     * @param gpsLng the value for gps.gps_lng
     *
     * @mbggenerated
     */
    public void setGpsLng(BigDecimal gpsLng) {
        this.gpsLng = gpsLng;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.gps_lat
     *
     * @return the value of gps.gps_lat
     *
     * @mbggenerated
     */
    public BigDecimal getGpsLat() {
        return gpsLat;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.gps_lat
     *
     * @param gpsLat the value for gps.gps_lat
     *
     * @mbggenerated
     */
    public void setGpsLat(BigDecimal gpsLat) {
        this.gpsLat = gpsLat;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.gps_spd
     *
     * @return the value of gps.gps_spd
     *
     * @mbggenerated
     */
    public Integer getGpsSpd() {
        return gpsSpd;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.gps_spd
     *
     * @param gpsSpd the value for gps.gps_spd
     *
     * @mbggenerated
     */
    public void setGpsSpd(Integer gpsSpd) {
        this.gpsSpd = gpsSpd;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.gps_heading
     *
     * @return the value of gps.gps_heading
     *
     * @mbggenerated
     */
    public Integer getGpsHeading() {
        return gpsHeading;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.gps_heading
     *
     * @param gpsHeading the value for gps.gps_heading
     *
     * @mbggenerated
     */
    public void setGpsHeading(Integer gpsHeading) {
        this.gpsHeading = gpsHeading;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.gps_ts
     *
     * @return the value of gps.gps_ts
     *
     * @mbggenerated
     */
    public Long getGpsTs() {
        return gpsTs;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.gps_ts
     *
     * @param gpsTs the value for gps.gps_ts
     *
     * @mbggenerated
     */
    public void setGpsTs(Long gpsTs) {
        this.gpsTs = gpsTs;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.dev_mc
     *
     * @return the value of gps.dev_mc
     *
     * @mbggenerated
     */
    public String getDevMc() {
        return devMc;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.dev_mc
     *
     * @param devMc the value for gps.dev_mc
     *
     * @mbggenerated
     */
    public void setDevMc(String devMc) {
        this.devMc = devMc == null ? null : devMc.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bat_vol
     *
     * @return the value of gps.bat_vol
     *
     * @mbggenerated
     */
    public Integer getBatVol() {
        return batVol;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bat_vol
     *
     * @param batVol the value for gps.bat_vol
     *
     * @mbggenerated
     */
    public void setBatVol(Integer batVol) {
        this.batVol = batVol;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bat_cap
     *
     * @return the value of gps.bat_cap
     *
     * @mbggenerated
     */
    public Integer getBatCap() {
        return batCap;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bat_cap
     *
     * @param batCap the value for gps.bat_cap
     *
     * @mbggenerated
     */
    public void setBatCap(Integer batCap) {
        this.batCap = batCap;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.bat_sn
     *
     * @return the value of gps.bat_sn
     *
     * @mbggenerated
     */
    public String getBatSn() {
        return batSn;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.bat_sn
     *
     * @param batSn the value for gps.bat_sn
     *
     * @mbggenerated
     */
    public void setBatSn(String batSn) {
        this.batSn = batSn == null ? null : batSn.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column gps.dev_status
     *
     * @return the value of gps.dev_status
     *
     * @mbggenerated
     */
    public Integer getDevStatus() {
        return devStatus;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column gps.dev_status
     *
     * @param devStatus the value for gps.dev_status
     *
     * @mbggenerated
     */
    public void setDevStatus(Integer devStatus) {
        this.devStatus = devStatus;
    }
}