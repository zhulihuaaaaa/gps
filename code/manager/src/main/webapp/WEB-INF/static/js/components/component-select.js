/**
 * 下拉列表组件
 * @returns
 */
define(['ajax'], function (ajax) {
	return {
		name: 'component-select',
		template: `
			<el-select v-model="selectData" 
				:value-key="prop"
				:filterable="search"
				:clearable="true"
				:name="name"
				:id="id"
			    :remote="remoteseach"
			    :placeholder=" remoteseach || search ? '请输入关键字':'请选择'"
			    :remote-method="remoteMethod"
			    :disabled = "isdisabled"
			    :loading="loading"
			    @clear="doClear"
			    @focus ="fetchData">
			  <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
				</el-option>
			</el-select>
		`,
		props: {
			/**
			 * 是否禁用
			 */
			isdisabled:{
				type: Boolean,
    				default: false
			},
			/**
			 * 选中项
			 */
			value: {
				type: [Object, String, Number]
			},
			/**
			 * 选中项为Object时，prop为必填项
			 */
			prop: {
				type: String
			},
			/**
			 * 表单验证的需要
			 */
			name:{
				type: String
			},
			/**
			 * 是否需要远程搜索
			 */
			remoteseach:{
				type: Boolean,
				default: false
			},
			/**
			 * 需要根据某数据来查询出一些下拉数据
			 */
			param: {
				type: [String, Object,Array]
			},
			id: {
				type: String
			},
			type: {
				/**
				 * select类型 firm: 厂商 gpsDev 设备
				 */
				type: String,
				required: true
			},
			/**
			 * 是否搜索
			 */
			search:{
				type: Boolean,
		        default: false
			},
			

		},
		data () {
			return {
				options: [
					{
						label: '',
						value: ''
					}
				],
				searchParam: {
				},
				loading:false,
				temporary:'',
				// 输入框失去焦点
				inputBlur: false
			}
		},
		computed: {
			selectData: {
				get () {
					return this.value
				},
				set (val) {
					this.$emit('input', val)
					//this.$emit('change', val)
				}
			},
//			filterable () {
//				if (['base'].indexOf(this.type) > -1) {
//					return true
//				}
//				return false
//			},
//			showIcon () {
//				return this.temporary != null && this.temporary != '' && this.inputBlur
//			}
		},
		watch: {
			selectData:{  
                handler:function(val, oldval){
	                	if(this.selectData && this.options.length == 1){
	                		var value = this.type
	                		if(value.indexOf('State') != -1){
	        					this.gps_stateCommon(value)
	        				}
	        				else{
	        					this.gps_common(value)
	        				}
	                	}
                },
                immediate: true
            }
//			param: {
//				handler: function (val, old) {
//					var same = true
//					if (val != null && old != null) {
//						if (val instanceof String) {
//							if (val !== old) {
//								same = false
//							}
//						} else if (val instanceof Object) {
//							for (var key of Object.keys(val)) {
//								if (val[key] !== old[key]) {
//									same = false
//									break
//								}
//							}
//						}
//					} else {
//						same = false
//					}
//					if (!same) {
//						// this.fetchData()
//					}
//				},
//				immediate: true
//			}
//			ignoreClientId: function (val, old) {
//				var vm = this
//				this.options = $.extend(true, [], this.optionsCopy)
//				if (val) {
//					this.options.forEach(function (item, index) {
//						if (item.value == val) {
//							vm.options.splice(index, 1)
//						}
//					})
//				}
//			}
		},
		methods: {
			/**
			 * 获取下拉数据
			 */
			fetchData () {
				if(this.remoteseach == true){
				}
				else{
					let val = this.type
					this.loading =true
					if(val.indexOf('State') != -1){
						this.gps_stateCommon(val)
					}
					else if(val.indexOf('Proj') != -1){
						this.proj_common(val)
					}
					else {
						this.gps_common(val)
					}
					this.defaultSelected()
					this.remoteNeed(val)
				}
			},
			// 远程搜索的特殊需求
			remoteNeed(val){
//				if(val =='crmClients'){
//					this.remoteseach = true
//				}
			},
			// 远程搜索
			remoteMethod (query){
				let val = this.type
				let vm = this
				if (val == 'gpsDevSno'){
					vm.$set(vm.searchParam,'devSno',query)
				}
				if (val == 'gpsBatSn'){
					vm.$set(vm.searchParam,'batSn',query)
				}
				if(val.indexOf('State') != -1){
					this.gps_stateCommon(val)
				}
				else if(val.indexOf('Proj') != -1){
					this.proj_common(val)
				}
				else {
					this.gps_common(val,query)
				}
				
				this.defaultSelected()
			},
			// 默认选中
			defaultSelected(){
//				let vm = this
//				let j = 0
//				if (vm.selectData != null && vm.selectData !== '') {
//					for(var i in vm.options){
//						let one = vm.options[i]
//						if (one.value === vm.selectData){
//							j +=1
//						}
//					}
//					
//				}
			},
			
			 //gps通用类 
			  gps_common (val,query) {
				  let vm = this
				  if(val.indexOf('gps') != -1){
					  ajax.post("/gps/findList",vm.searchParam).then(function (res) {
						  var options = []
						  let datas = res.data
						  for( var i  in datas){
							  let option = {
								  label:'',
								  value:''
							  }
							  if(val=='gpsDev'){
								  option.label = datas[i].devId
								  option.value = datas[i].devId
							  }
							  if(val=='gpsDevSno'){
								  option.label = datas[i].devSno
								  option.value = datas[i].devSno
							  }
							  if(val=='gpsProdNo'){
								  option.label = datas[i].prodNo
								  option.value = datas[i].prodNo
							  }
							  if(val=='gpsBatSn'){
								  option.label = datas[i].batSn
								  option.value = datas[i].batSn
							  }
							  options.push(option)
						  }
						  vm.options = options 
						  vm.loading = false
						}, function () {
							vm.loading = false
						})
				  }
				  else{
					  ajax.get("/"+val+"/findList").then(function (res) {
						  var options = []
						  let datas = res.data
						  for( var i  in datas){
							  let option = {
								  label:'',
								  value:''
							  }
							  if(val == 'firm'){
								  option.label = datas[i].firmName
								  option.value = datas[i].firmId
							  }
							  else if(val == 'proj'){
								  option.label = datas[i].projName
								  option.value = datas[i].projId
							  }
							  else if(val == 'mode'){
								  option.label = datas[i].modeName
								  option.value = datas[i].modeId
							  }
							  else if(val == 'type'){
								  option.label = datas[i].typeName
								  option.value = datas[i].typeId
							  }
							  options.push(option)
						  }
						  vm.options = options 
						  vm.loading = false
						}, function () {
							vm.loading = false
						})
				  }
			  },
			  
			  //proj通用类
			  proj_common(val){
				  let vm = this
				  ajax.get("/proj/findList").then(function (res) {
					  var options = []
					  let datas = res.data
					  for( var i  in datas){
						  let option = {
							  label:'',
							  value:''
						  }
						  if(val=='ProjId'){
							  option.label = datas[i].projId
							  option.value = datas[i].projId
						  }
						  if(val=='ProjName'){
							  option.label = datas[i].projName
							  option.value = datas[i].projName
						  }
						  if(val=='ProjIp'){
							  option.label = datas[i].projIp
							  option.value = datas[i].projIp
						  }
						  if(val=='ProjKey'){
							  option.label = datas[i].projKey
							  option.value = datas[i].projKey
						  }
						  if(val=='ProjcontName'){
							  option.label = datas[i].contName
							  option.value = datas[i].contName
						  }
						  if(val=='ProjcontPhone'){
							  option.label = datas[i].contPhone
							  option.value = datas[i].contPhone
						  }
						  if(val=='ProjcontEmail'){
							  option.label = datas[i].contEmail
							  option.value = datas[i].contEmail
						  }
						  options.push(option)
					  }
					  vm.options = options 
					  vm.loading = false
					}, function () {
						vm.loading = false
					})
			  },
			  
			  //gps判断状态类
			  gps_stateCommon(val){
				  let vm = this
				  if(val == 'basAccState'){
					  var options = []
					  let option1 = {
						  label:'开',
						  value:1
					  }
					  let option2 = {
						  label:'关',
						  value:0
					  }
					  options.push(option1)
					  options.push(option2)
					  vm.options = options 
					  vm.loading = false
				  }
				  else if(val == 'rideState'){
					  var options = []
					  let option1 = {
						  label:'骑行',
						  value:1
					  }
					  let option2 = {
						  label:'非骑行',
						  value:2
					  }
					  let option3 = {
						  label:'未知',
						  value:0
					  }
					  options.push(option1)
					  options.push(option2)
					  options.push(option3)
					  vm.options = options 
					  vm.loading = false
				  }
				  else if(val == 'devState'){
					  var options = []
					  let option1 = {
							  label:'不可用',
							  value:0
					  }
					  let option2 = {
							  label:'可用',
							  value:1
					  }
					  let option3 = {
							  label:'异常',
							  value:2
					  }
					  options.push(option1)
					  options.push(option2)
					  options.push(option3)
					  vm.options = options 
					  vm.loading = false
				  }
			  },
			  /**
			   * 检测值是否在option中存在，
			   * 如果不存在的话添加一个label为空，value为value的选项
			   */
			  addBlankLabelToOption (options, value) {
				  if (options && value) {
					  var count = 0
					  options.forEach(function (item, index) {
						  if (item.value == value) {
							  count++
						  }
					  })
					  if (count == 0) {
//						  options.push({
//							  label: '',
//							  value: value
//						  })
						  this.selectData=''
					  }
				  }
			  },
			  doClear () {
				  this.selectData = ''
				 //  this.fetchData()
			  }
		}
	}
})