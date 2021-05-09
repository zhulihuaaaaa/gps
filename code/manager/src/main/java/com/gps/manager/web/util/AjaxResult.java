package com.gps.manager.web.util;

import java.io.Serializable;

/**
 * Ajax返回数据模板
 * @author fengw
 * @create 2016年11月10日
 */
public class AjaxResult implements Serializable  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4803823571908989734L;
	/**
	 * 请求结果
	 * 成功
	 */
	private static int STATE_SUCCESS = 1;
	/**
	 * 请求结果
	 * 失败
	 */
	private static int STATE_ERROR = 0;
	
	/**
	 * 请求结果
	 */
	private int state;
	/**
	 * 信息代码
	 */
	private MessageCode code;
	/**
	 * 数据内容
	 */
	private Object data;
	/**
	 * 附加消息
	 */
	private String message;
	
	/**
	 * 
	 */
	private AjaxResult() {
		super();
	}
	/**
	 * @param type
	 * @param code
	 * @param data
	 * @param message
	 */
	private AjaxResult(int state, MessageCode code, Object data, String message) {
		super();
		this.state = state;
		this.code = code;
		this.data = data;
		this.message = message;
	}
	/**
	 * 创建请求成功的返回值
	 * @param code
	 * @param data
	 * @param message
	 * @return
	 * @author fengw
	 * @create 2016年11月10日
	 */
	public static AjaxResult createSuccessResult(Object data, String message) {
		return new AjaxResult(STATE_SUCCESS, null, data, message);
	}
	public static AjaxResult createSuccessResult(Object data) {
		return new AjaxResult(STATE_SUCCESS, null, data, null);
	}
	public static AjaxResult createSuccessResultWithCode(MessageCode code) {
		return new AjaxResult(STATE_SUCCESS, code, null, code.getCodeInfo());
	}
	public static AjaxResult createSuccessResultWithCode(MessageCode code, String message) {
		if (message == null) {
			message = code.getCodeInfo();
		}
		return new AjaxResult(STATE_SUCCESS, code, null, message);
	}
	public static AjaxResult createSuccessResultWithCode(MessageCode code, Object data) {
		return new AjaxResult(STATE_SUCCESS, code, data, code.getCodeInfo());
	}
	public static AjaxResult createSuccessResultWithCode(MessageCode code, Object data, String message) {
		if (message == null) {
			message = code.getCodeInfo();
		}
		return new AjaxResult(STATE_SUCCESS, code, data, message);
	}
	/**
	 * 创建请求失败对象
	 * @param code
	 * @param message
	 * @return
	 * @author fengw
	 * @create 2016年11月16日
	 */
	public static AjaxResult createErrorResult(MessageCode code, String message) {
		if (message == null) {
			message = code.getCodeInfo();
		}
		return new AjaxResult(STATE_ERROR, code, null, message);
	}
	public static AjaxResult createErrorResult(MessageCode code) {
		return new AjaxResult(STATE_ERROR, code, null, code.getCodeInfo());
	}
	
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public MessageCode getCode() {
		return code;
	}
	public void setCode(MessageCode code) {
		this.code = code;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}

