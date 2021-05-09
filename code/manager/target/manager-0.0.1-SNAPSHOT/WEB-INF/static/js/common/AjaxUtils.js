/**
 * Ajax设置
 * @author 张渊
 * @since 2017.12.08
 * @returns ajax
 */
define(['util'], function (util) {
	var showLoadDialog = false
	function closeLoadDialog() {
		if (showLoadDialog) {
			util.dialog({getIdClose: 'dialogLoad'})
			showLoadDialog = false
		}
	}
	var custom = function (option) {
		return $.ajax(option)
	}
	var post = function (url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'post',
				dataType: 'json',
				url: ctx + url,
				data: JSON.stringify(data),
				contentType: 'application/json'
			}).then(function (result) {
				closeLoadDialog()
				if (result && result['state'] === 1) {
					if (result['message']) {
						util.promptMsg({
							type: 'tip',
							modal: false,
							content: result.message
						})
					}
					resolve(result)
				} else {
					reject(result)
					util.promptMsg({
						type: 'tip',
						modal: false,
                        content: result.message
                    })
				}
			}, function (err) {
				closeLoadDialog()
				var result = {
					state: 0,
					message: '请求失败，请重试'
				}
				reject(result)
				util.promptMsg({
					type: 'tip',
					modal: false,
                    content: result.message
                })
			})
		})
	}
	var get = function (url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'get',
				dataType: 'json',
				url: ctx + url,
				data: data,
				contentType: 'application/json'
			}).then(function (result) {
				closeLoadDialog()
				if (result && result['state'] === 1) {
					if (result['message']) {
						util.promptMsg({
							type: 'tip',
							modal: false,
							content: result.message
						})
					}
					resolve(result)
				} else {
					reject(result)
					util.promptMsg({
						type: 'tip',
						modal: false,
	                    content: result.message
	                })
				}
			}, function (err) {
				closeLoadDialog()
				var result = {
					state: 0,
					message: '请求失败，请重试'
				}
				reject(result)
				util.promptMsg({
					type: 'tip',
					modal: false,
                    content: result.message
                })
			})
		})
	}
	return {
		/**
		 * 自定义请求
		 */
		custom: custom,
		/**
		 * get请求
		 */
		get: get,
		/**
		 * post请求
		 */
		post: post,
		/**
		 * 分页查询
		 */
		findPage: function (moduleUrl, data) {
			return post(moduleUrl + '/findPage', data)
		},
		/**
		 * 条件查询
		 */
		findAll: function (moduleUrl, data) {
			return post(moduleUrl + '/findAll', data)
		},
		/**
		 * ID查询
		 */
		findOne: function (moduleUrl, id) {
			return get(moduleUrl + '/findOne', {
				id: id
			})
		},
		/**
		 * 保存
		 */
		save: function (moduleUrl, data) {
			return post(moduleUrl + '/save', data)
		},
		/**
		 * 更新
		 */
		update: function (moduleUrl, data) {
			return post(moduleUrl + '/update', data)
		},
		/**
		 * 删除
		 * @moduleUrl 模块路径
		 * @id 数据ID
		 * @confirm 是否需要确认，默认true
		 */
		delete: function (moduleUrl, id, confirm) {
			if (confirm == null || confirm) {
				return new Promise(function (resolve, reject) {
					util.dialog({
						title: '提示',
						content: '是否删除该数据？',
						modal: true,
						okValue: '确定',
						ok: function () {
							util.promptMsg({
					            type: 'load',
					            stayTime: 0,
					            id: 'dialogLoad'
					        })
					        showLoadDialog = true
							get(moduleUrl + '/delete', {id: id}).then(function (result) {
								resolve(result)
							}, function (err) {
								reject(err)
							})
						},
						cancelValue: '取消',
						cancel: function () {
							reject('取消删除')
						}
					})
				})
			} else {
				return post(moduleUrl + '/delete', {
					id: id
				})
			}
		},
		/**
		 * 获取详情页HTML
		 */
		detail: function (moduleUrl, data) {
			return new Promise(function (resolve, reject) {
				custom({
					url: ctx + moduleUrl + '/detail',
					type: 'post',
					data: data
				}).then(function (result) {
					resolve(result)
				}, function (err) {
					reject(err)
				})
			})
		},
		/**
		 * 获取下拉选项
		 * @param {String, Array} optionNames 数据名('FeeType', ['FeeType'])
		 */
		getOptions: function (optionNames) {
			optionNames = typeof optionNames === 'string' ? [optionNames] : optionNames
			return get('/base/getOptions', {
				params: optionNames.join(",")
			})
		},
		exportExcel: function (moduleUrl, params) {
			window.open(ctx + moduleUrl + '/exportExcel' + '?param=' + JSON.stringify(params))
		}
	}
})