package com.gps.manager.web.util;

import java.io.Serializable;

public class PageUtils<D> implements Serializable {
	private static final long serialVersionUID = -4504500341927596005L;
	// 当前页
    private int pageNum;
    // 每页的数量
    private int pageSize;
    // 排序
    private String orderByClause;
	// 需查询的实体
    private D dto;
    
    public PageUtils() {}
	public PageUtils(int pageNum, int pageSize, D dto) {
		this.pageNum = pageNum;
		this.pageSize = pageSize;
		this.dto = dto;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public String getOrderByClause() {
		return orderByClause;
	}
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}
	public D getDto() {
		return dto;
	}
	public void setDto(D dto) {
		this.dto = dto;
	}
    
}
