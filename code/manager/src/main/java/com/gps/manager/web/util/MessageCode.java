package com.gps.manager.web.util;

/**
 * ajax返回信息代码
 * @author 张渊
 * @since 2017年11月28日 上午11:39:56
 * @version 1.0
 */
public enum MessageCode {
	/** 请求异常*/
	//	404错误
	PAGE_NOT_FOUND("请求地址无效"),
	/**	账户异常 */
	//	未登录
	ACCOUNT_NO_LOGIN("您还未登录或登录失效"),
	/** 权限异常 */
	//	无操作权限
	ACCESS_DENIED("无权限执行此操作"),
	
	/**	操作提示*/
	FORM_NOT_COMPLETE("请完善表单信息后再提交"),
	
	OPERATE_SUCCESS("操作成功"),
	OPERATE_FAILED("操作失败"),
	
	SAVE_SUCCESS("保存成功"),
	SAVE_FAILED("保存失败"),
	
	UPDATE_SUCCESS("更新成功"),
	UPDATE_FAILED("更新失败"),
	
	DELETE_SUCCESS("删除成功"),
	DELETE_FAILED("删除失败"),
	
	APPROVAL_SUBMIT_SUCCESS("提交成功"),
	APPROVAL_SUBMIT_FAILED("提交失败"),
	APPROVAL_ABANDON_SUCCESS("撤销成功"),
	APPROVAL_ABANDON_FAILED("撤销失败"),
	APPROVAL_CANCEL_SUCCESS("作废成功"),
	APPROVAL_CANCEL_FAILED("作废失败"),
	APPROVAL_SUCCESS("审核成功"),
	APPROVAL_FAILED("审核失败"),
	APPROVAL_REJECT_SUCCESS("拒绝成功"),
	APPROVAL_REJECT_FAILED("拒绝失败");
	private String codeInfo;
	
	private MessageCode(String codeInfo) {
		this.codeInfo = codeInfo;
	}

	public String getCodeInfo() {
		return codeInfo;
	}
	
	
}
