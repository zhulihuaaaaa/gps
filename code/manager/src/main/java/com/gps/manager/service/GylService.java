package com.gps.manager.service;

import com.gps.manager.web.util.PageUtils;

//import com.maigangle.gyl.facade.entity.AcntUserBasic;

/**
 * 定义供应链service接口
 * 
 * @author Administrator
 *
 */
public interface GylService<D> {
	
	/**
	 * 设置分页，排序
	 * @param page
	 */
	void setPageAndOrderBy(PageUtils<D> page);
	
	/**
	 * 获取当前时间(年后两位+月；建单号用)
	 * @return
	 */
	public String getCurrentTime();
	
}
