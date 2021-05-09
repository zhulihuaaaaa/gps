package com.gps.manager.web.util;

import java.util.Calendar;
import java.util.Date;

/**
 * 日期通用工具类
 * @author 张渊
 * @since 2017年12月15日 下午1:25:02
 * @version 1.0
 */
public class DateUtils {
	/**
	 * 将指定日期时间设为 00:00:00
	 * @param date
	 * @return
	 */
	public static Date getStartDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		return calendar.getTime();
	}
	/**
	 * 将指定日期时间设为23:59:59
	 * @param date
	 * @return
	 */
	public static Date getEndDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 23);
		calendar.set(Calendar.MINUTE, 59);
		calendar.set(Calendar.SECOND, 59);
		return calendar.getTime();
	}
}
