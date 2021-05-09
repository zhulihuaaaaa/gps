/**
 * 登录设置
 * 
 * @author zlh
 * @since 2018.2.27
 */
require(['ajax', 'util'], function (ajax, util) {
	// 主页面Vue组件
	var page = new Vue({
		el: '.login-div',
		data: {
			logindata: {
				loginname:'',
				loginpass:''
			}
		},
		computed: {
		},
		methods: {
			createCode () {
				code = "";
	            var codeLength = 5; //验证码的长度
	            var checkCode = document.getElementById("checkCode");
	            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
	            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
	            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
	            for (var i = 0; i < codeLength; i++) 
	            {
	                var charNum = Math.floor(Math.random() * 52);
	                code += codeChars[charNum];
	            }
	            if (checkCode) 
	            {
	                checkCode.className = "code";
	                checkCode.innerHTML = code;
	            }
			},
			submit () {
				if ($('#loginform').valid()) {
					var inputCode = document.getElementById("inputCode").value;
				      if (inputCode.length <= 0) 
				      {
				          alert("请输入验证码！");
				          return;
				      }
				      else if (inputCode.toUpperCase() != code.toUpperCase()) 
				      {
				          alert("验证码输入有误！");
				          this.createCode();
				          return;
				      }
					ajax.post('/user/loginValid',this.logindata).then((result) => {
						if (result.state == 1 && result.data == true ) {
							window.location.href="gps/main";
						}
						else if (result.state == 1 && result.data == false ){
							alert("用户名/密码错误！")
							this.logindata.loginname = ''
							this.logindata.loginpass = ''
							this.createCode() 
						}
						else{
							window.location.href="error";
						}
					}, function () {
					})
				}
			}
		},
		mounted(){
			//验证
			this.$nextTick(function() {
				loginValid()
			})
		},
	})
	// 筛选条件显示切换
	$(".btn-opt-screen").click(function() {
	    $(".search-criter").slideToggle(300);
	    $(this).toggleClass("active");
	});
	
	// ---------------
	// 登录验证
	// ---------------
	function loginValid () {
		util.formValid({
			selector: '#loginform',
			onkeyup: false,
			rules: {
				'username': {
					required: true
				},
				'userpass': {
					required: true,
				}
			},
			messages: {
				'username': {
					required: '请输入登录名'
				},
				'userpass': {
					required: '请输入密码'
				}
			}
		})
	  }
})




