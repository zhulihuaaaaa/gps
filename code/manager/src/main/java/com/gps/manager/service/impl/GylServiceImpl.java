package com.gps.manager.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.github.pagehelper.PageHelper;
import com.gps.manager.service.GylService;
import com.gps.manager.web.util.PageUtils;

/**
 * 接口实现
 * 
 * @author Administrator
 *
 */
@Service
@Transactional
public class GylServiceImpl<D> implements GylService<D> {

	public void setPageAndOrderBy(PageUtils<D> page) {
		if (page != null) {
			PageHelper.startPage(page.getPageNum(), page.getPageSize());
			if (!StringUtils.isEmpty(page.getOrderByClause())) {
				PageHelper.orderBy(page.getOrderByClause());
			}
		}
	}

	public String getCurrentTime() {
		return new SimpleDateFormat("yyMM",Locale.CHINESE).format(Calendar.getInstance().getTime());
	}
	
}
