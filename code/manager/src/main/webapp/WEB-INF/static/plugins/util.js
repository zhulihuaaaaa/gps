/**
 * ===========
 * 前端前端组件
 * ===========
 * 组件大部分依赖jquery
 * @ require(['util'], function(util){...}) @
 * 执行requirejs AMD
 * @author 詹小灰@461632311
 */

(function(window) {
    var util = {

        /**
         * datepicker日期选择
         * @author zhanpthy
         * @param  {dateRange} 是否为日期区间
         * @param  {selector}  绑定Input选择器
         * @param  {showToday} 是否显示今天的角标样式
         * @return {opts}
         */
        datePicker: function(options) {
            var opts = $.extend({
                dateRange: false,
                selector: options.dateRange == true ? ['.daterange-start', '.daterange-end'] : '.date-time', //如果是日期区间默认值为数组
                showToday: true,
                format: 'yyyy-mm-dd',
                disableDblClickSelection: true,
                leftArrow: '<',
                rightArrow: '>',
                closeIcon: '×',
                closeButton: false,
                language: 'zh-CN',
                render: false
            }, options);
            var nowTemp = new Date();
            var dateNow = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            if (opts.showToday) {
                opts.onRender = function(date) {
                    dateNow = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                    //当前日期加标记
                    return dateNow.valueOf() == now.valueOf() ? 'current' : '';
                }
            }

            if (opts.showToday === false) {
                opts.onRender = function(date) {
                    dateNow = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
                    //当前日期加标记
                    return dateNow.valueOf() < now.valueOf() ? 'disabled' : '';
                }
            }

            require(['datepicker'], function() {
                if (!opts.dateRange) {
                    if (typeof(opts.selector) === 'string') {
                        $(opts.selector).mgldatepicker(opts).on('changeDate', function (ev) {
                        	$(opts.selector)[0].dispatchEvent(new Event('input'));
                        });
                    }
                    if ($.isArray(opts.selector)) {
                        $(opts.selector[0]).mgldatepicker(opts).on('changeDate', function (ev) {
                        	$(opts.selector[0])[0].dispatchEvent(new Event('input'));
                        });
                    }
                }
                if (opts.dateRange && $.isArray(opts.selector)) {
                    datepickerRange(); //日期区间函数
                }
            })

            function datepickerRange() {
                var checkin = $(opts.selector[0]).mgldatepicker(opts).on('changeDate', function(ev) {
                    if (ev.date.valueOf() > checkout.date.valueOf()) {
                        var newDate = new Date(ev.date)
                        newDate.setDate(newDate.getDate());
                        checkout.update(newDate);
                    }
                    checkin.hide();
                    // Spark 手动触发input事件
                    $(opts.selector[0])[0].dispatchEvent(new Event('input'));
                    $(opts.selector[1])[0].focus();
                }).data('datepicker');

                var optRange = $.extend({}, opts);

                if (opts.showToday) {
                    optRange.onRender = function(date) {
                        return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
                    }
                }

                var checkout = $(opts.selector[1]).mgldatepicker(optRange).on('changeDate', function(ev) {
                    checkout.hide();
                    // Spark 手动触发input事件
                    $(opts.selector[1])[0].dispatchEvent(new Event('input'));
                }).data('datepicker');
            }
        },

        /**
         * swiper图片切换
         * @author zhanpthy
         * @param  {containerClass}      最外层容器
         * @param  {direction}           显示方向
         * @param  {pagination}          分页器
         * @param  {paginationClickable} 分页器是否可点击
         * @param  {onAutoPlay}          鼠标移入暂停播放
         * @return {opts}
         */
        
        swiper: function(options) {
            require(['swiper'], function() {
                var opts = $.extend({
                    containerClass: '.banner-container',
                    direction: 'horizontal',
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    onAutoPlay: false,
                    onEvent: function(){}
                }, options);

                var mySwiper = new Swiper(opts.containerClass, opts);

                if (opts.onAutoPlay) {
                    $(opts.containerClass).mouseenter(function () {
                        mySwiper.stopAutoplay();
                    }).mouseleave(function(){
                        mySwiper.startAutoplay();
                    });
                }

                opts.onEvent();
            });
        },

        /**
         * swiper的tab功能切换
         * @author zhanpthy
         * @param  {speed}            切换速度
         * @param  {tabNavClass}      tab菜单选择器
         * @param  {pagination}       内容选择器
         * @return {opts}
         */
        
        swiperTab: function(options) {
            require(['swiper'], function() {
                var opts = $.extend({
                    speed: 250,
                    tabNavClass: '.swiper-navgation',
                    containerClass: '.tab-container',
                    onSlideChangeStart: function() {
                        var actIndex = tabSwiper.activeIndex;
                        $(opts.tabNavClass).find('li').removeClass('active').eq(actIndex).addClass('active');
                    }
                }, options);

                var tabSwiper = new Swiper(opts.containerClass, opts);

                $(opts.tabNavClass).find('li').on('click', function(event) {
                    event.preventDefault();
                    //得到当前索引
                    var i = $(this).index();
                    $(opts.tabNavClass).find('li').removeClass('active').eq(i).addClass('active');
                    tabSwiper.slideTo(i, opts.speed, true);
                    if (opts.hasOwnProperty('change') && typeof opts.change === 'function') {
                    	opts.change(i)
                    }
                });
            });
        },

        /**
         * 图片列表预览
         * @author zhanpthy
         * @param  {selector      绑定选择器
         * @param  {cells}        只展图片示个数
         * @param  {align}        显示预览
         * @param  {nextOnClick}  点击下一张
         * @param  {bgClose}      点击背景关闭
         * @return {opts}
         */
        
        imagesGrid: function(options) {
            var opts = $.extend({
                selector: '.images-grid',
                cells: 6,
                align: true,
                nextOnClick: true,
                bgClose: true
            }, options);

            require(['imagesGrid'], function(imagesGrid) {
                $(opts.selector).imagesGrid(opts);
            })
        },

        /**
         * 文件上传
         * @author zhanpthy
         * @param  {selector}     绑定选择器
         * @param  {type}         上传类型
         * @param  {showThumbs}   显示缩略图
         * @param  {addMore}      选择多张
         * @return {opts}
         */
        
        uploadFile: function(options) {
            var opts = $.extend({
                selector: '#filerUpdate',
                type: 'file',
                showThumbs: true,
                addMore: true,
                allowDuplicates: false
            }, options);

            require(['uploadFile'], function(uploadFile) {
                switch (opts.type) {
                    case 'image':
                        uploadFile.image(opts);
                        break;
                    case 'file':
                        uploadFile.file(opts);
                        break;
                    default:
                        uploadFile.file(opts);
                }
            })
        },

        /**
         * dialog弹窗
         * @author zhanpthy
         * @param  {selector      绑定选择器
         * @param  {contentDom}   获取html内容
         * @param  {modal}        是否模态显示
         * @param  {getIdClose}   查找id，并关闭
         * @return {opts}
         */
        
        dialog: function(options) {
            var opts = $.extend({
                selector: '',
                contentDom: '',
                modal: true,
                width: 440,
                fixed: true,
                skin: 'mgl-mall',
                getIdClose: ''
            }, options);

            if (opts.contentDom != '') {
                $(opts.contentDom).hide();
                opts.content = $(opts.contentDom).html();
                $(opts.contentDom).remove();
            }

            require(['dialog'], function() {
                var dialogMsg;
                if (opts.selector != '') {
                    $(opts.selector).click(function(){
                        dialogMsg = dialog(opts);
                        dialogMsg.show();
                    });
                } else if (opts.content != null) {	// 增加content为空的判断，解决getIdClose失败的问题
                    dialogMsg = dialog(opts);
                    dialogMsg.show();
                }

                if (opts.getIdClose != '') {
                    dialog.get(opts.getIdClose).remove();
                }
            });
        },

        /**
         * tip提示
         * @author zhanpthy
         * @param  {content      内容
         * @param  {stayTime}    自动关闭时间
         * @param  {appendTo}    设置父级DOM
         * @return {opts}
         */
        
        promptMsg: function(options) {
            var opts = $.extend({
                content: '消息提示',
                stayTime: 3000,
                getid: '',
                id: '',
                quickCloseNone: true,
                icon: '',
                type: 'tip',
                appendTo: '',
                skin: 'dark-pormp'
            }, options);

            //判断type风格
            switch (opts.type) {
                case 'load':
                    if (opts.appendTo === '' || opts.appendTo === 'body') {
                        opts.content = '<span class="ui-dialog-loading"></span>';
                    } else {
                        opts.icon = 'ui-dialog-loading popmsg-tip-load';
                        opts.content = '';
                    }
                    break;
            }

            require(['dialog'], function() {
                if (opts.appendTo === '' || opts.appendTo === 'body') {
                    var diamsg = dialog(opts);
                    diamsg.show();
                    if (opts.getid != '') {
                        dialog.get(opts.getid).close().remove();
                    }
                    if (opts.stayTime > 0) {
                        setTimeout(function() {
                            diamsg.close().remove();
                        }, opts.stayTime);
                    }
                } else {
                    if (opts.getid != '') {
                        $('#' + opts.getid).remove();
                    }
                    //tip自定义父级。
                    $.mglmessage(opts)
                }
            });
        },

        /**
         * select选择框
         * @author zhanpthy
         * @param  {selector}    绑定选择器
         * @return {opts}
         */
        
        select2: function(options) {
            var opts = $.extend({
                selector: '.select-control',
                minimumResultsForSearch: 12
            }, options);

            require(['select'], function() {
                $(opts.selector).select2(opts).on("select2:select", function (e) {
                	if ($(opts.selector).val() === 'all') {
                		$(opts.selector).val("")
                		$(opts.selector).trigger('change.select2')
                	}
                	e.currentTarget.dispatchEvent(new Event('change'))
                });
            })
        },

        /**
         * 表单验证
         * @author zhanpthy
         * @param  {selector}    绑定选择器
         * @param  {changeReset} 需要手动刷新的选择器
         * @return {opts}
         */
        
        formValid: function(options) {
        	var that = this
            var opts = $.extend({
                selector: '.select-form',
                changeReset: '.select-control',
                errorPlacement: function(error, element) {
                    if (element.is(':checkbox') || element.is(':radio')) {
                        error.appendTo(element.parent().parent().parent());
                    } else {
                        error.appendTo(element.parent());
                    }
                },
                submitHandler: function(form) {
                    form.submit();
                }
            }, options);

            require(['validate'], function() {
            	if ($.validator) {
            		   $.validator.prototype.elements = function () {
            			   var validator = this,
            			   rulesCache = {};
            			   return $(this.currentForm)
            			   	.find("input, select, textarea")
        			   		.not(":submit, :reset, :image, [disabled]")
    			   			.not(this.settings.ignore)
        			   				.filter(function () {
//        			   					var name = this.id
//        			   						|| 
//        			   						$(this).prop('class').match(/(valid-\w+)\s?/) != null
//        			   							&& $(this).prop('class').match(/(valid-\w+)\s?/).length > 0 ?
//        			   								$(this).prop('class').match(/(valid-\w+)\s?/)[1] : 
        			   					var name = this.name || $( this ).attr( "name" )
        			   					if ((!name || name !== '') && validator.settings.debug && window.console) {
        			   						console.error("%o has no name assigned", this);
        			   					}
        			   					rulesCache[name] = true;
        			   					return true;
            		    });
        		   }
        		   $.validator.addMethod("notEqualTo", function (value, element, param) {  
					   return value != $(param).val()
        		   }, $.validator.format("两次输入不能相同!"))
        		   $.validator.addMethod("idcard", function (value, element, param) {  
					   return that.reg('idcard', value)
        		   }, $.validator.format("请输入有效身份证号码"))
            	}
            	
                $(opts.selector).find(opts.changeReset).change(function() {
                    $(this).valid();
                });

                $(opts.selector).validate(opts);
            });
        },

        /**
         * 城市联动
         * @author zhanpthy
         * @param  {selector}    绑定选择器
         * @param  {select2}     使用select2风格
         * @return {opts}
         */
        
        city: function(options) {
            var opts = $.extend({
                selector: '.distpicker',
                minimumResultsForSearch: 10,
                select2: false,
                valueType: 'code'
            }, options);

            require(['city'], function() {
                $(opts.selector).distpicker(opts);
                if (opts.select2) {
                    $(opts.selector + ' select').select2(opts);
                    if ($('[data-toggle="distpicker"] select').length > 0) {
                        $('[data-toggle="distpicker"] select').select2(opts);
                    }
                }
            })
        },
 
        /**
         * 富文本
         * @author zhanpthy
         * @param  {selector}    绑定选择器
         * @param  {svgPath}     图标路径
         * @return {opts}
         */
        
        editor: function(options) {
            var opts = $.extend({
                selector: '#editor',
                svgPath: '/mgljs/fonts/trumbowyg.svg',
                resetCss: true,
                lang: 'zh_cn',
                btnsDef: {
                    // Customizables dropdowns
                    image: {
                        dropdown: ['insertImage', 'upload'],
                        ico: 'insertImage'
                    }
                },
                btns: [
                    ['viewHTML'],
                    ['undo', 'redo'],
                    ['formatting'],
                    'btnGrp-design', ['superscript', 'subscript'],
                    ['link'],
                    ['image'],
                    'btnGrp-justify',
                    'btnGrp-lists', ['foreColor', 'backColor'],
                    ['table'],
                    ['preformatted'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen']
                ],
                plugins: {
                    // 图片上传配置
                    upload: {
                        serverPath: 'https://api.imgur.com/3/image',
                        fileFieldName: 'image',
                        headers: {
                            'Authorization': 'Client-ID 9e57cb1c4791cea'
                        },
                        urlPropertyName: 'data.link'
                    }
                }
            }, options);

            require(['editor'], function() {
                $(opts.selector).trumbowyg(opts);
            })
        },

        /**
         * 获取url
         * @author zhanpthy
         * @method  {get(key)}    获取url上的参数
         * @return {value}
         */
        
        get: function(par) {
            //获取当前URL
            var local_url = document.location.href;
            //获取要取得的get参数位置
            var get = local_url.indexOf(par + '=');
            if (get == -1) {
                return false;
            }
            //截取字符串
            var get_par = local_url.slice(par.length + get + 1);
            //判断截取后的字符串是否还有其他get参数
            var nextPar = get_par.indexOf('&');
            if (nextPar != -1) {
                get_par = get_par.slice(0, nextPar);
            }
            return get_par;
        },

        /**
         * 替换get参数
         * @author zhanpthy
         * @method  {getReplace(key, name)}    替换指定参数的值
         * @return {string}
         */

        getReplace: function(paramName, replaceWith) {
            var oUrl = location.href.toString();
            if (oUrl.indexOf(paramName) >= 0) {
                var re = eval('/(' + paramName + '=)([^&]*)/gi');
                return oUrl.replace(re, paramName + '=' + replaceWith);
            } else {
                if (oUrl.indexOf('?') >= 0) {
                    return oUrl + '&' + paramName + '=' + replaceWith;
                } else {
                    return oUrl + '?' + paramName + '=' + replaceWith;
                }
            }
        },

        /**
         * 常用正则验证
         * @author zhanpthy
         * @method  {reg(string)}    验证
         * @return {string}
         */
        
        reg: function(type, val) {
            switch (type) {
            	case 'idcard':
            		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
                case 'email':
                    return /^([a-zA-Z0-9_\-\.])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(val);
                case 'http':
                    return /^(http[s]?:)?(\/{2})?([a-z0-9]+\.)?[a-z0-9]+(\.(com|cn|cc|org|net|com.cn))$/i.test(val);
                case 'tel':
                    return /(?:\(\d{3,4}\)|\d{3,4}-?)\d{8}/.test(val);
                case 'phone':
                    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val);
                case 'id':
                    return /^(\d{15}|\d{18})$/.test(val);
            }
        },
        
        /**
         * input格式化
         * @author zhanpthy
         * @param  {selector}    绑定选择器
         * @param  {type}        格式化默认风格
         * @return {opts}
         */
        
        inputFormat: function(options) {
            var typeOpts;
            var opts = $.extend({
                selector: '.input',
                type: ''
            }, options);

            require(['inputformat'], function() {
                switch (opts.type) {
                    case 'tel':
                        typeOpts = {
                            blocks: [3, 4, 4],
                            numericOnly: true,
                            delimiter: ' '
                        };
                        break;
                    case 'bank':
                        typeOpts = {
                            creditCard: true,
                            delimiter: ' '
                        };
                        break;
                    case 'idNo':
                        typeOpts = {
                            blocks: [3, 3, 8, 4],
                            delimiter: ' '
                        };
                        break;
                    case 'date':
                        typeOpts = {
                            date: true,
                            datePattern: ['Y', 'm', 'd'],
                            delimiter: '-'
                        };
                        break;
                    default:
                        var typeOpts = opts;
                }

                var cleave = new Cleave(opts.selector, typeOpts);
            })
        },

        /**
         * 拖动滑块验证
         * @author zhanpthy
         * @param  {selector}           绑定选择器
         * @param  {labelTip}           提示语
         * @param  {successLabelTip}    成功提示语
         * @param  {duration}           区间宽度
         * @return {opts}
         */
        
        dragValid: function(options) {
            var opts = $.extend({
                selector: '.slideunlock-slider',
                labelTip: '按住滑块，拖动到最右边',
                successLabelTip: '验证通过',
                duration: 200,
                success: function(){
                    var $this = $(this);
                    var slider = $this[0].elm.find('.slideunlock-label');
                    slider.off('mousedown');
                    $this[0].elm.nextAll('.error').hide();
                },
                always: function(){}
            }, options);

            require(['drag'], function() {
                var slider = new SliderUnlock(opts.selector, opts, opts.success, opts.always);
                slider.init();
            });
        },

        /**
         * 二维码生成
         * @author zhanpthy
         * @param  {selector}           绑定选择器
         * @return {opts}
         */
        
        qrcode: function(options) {
            var opts = $.extend({
                selector: '.img-qrcode',
                width: 200,
                height: 200,
                text: '',
                imgSrc: '',
                imgWidth: 45,
                useCanvas: false
            }, options);

            require(['qrcode'], function() {
                var imgQrcode = new QRCode(opts.selector, opts);
            });
        },

        /**
         * 字母排序
         * @author zhanpthy
         * @param  {selector}    绑定选择器
         * @return {opts}
         */
        
        listSort: function(options){
            var opts = $.extend({
                selector: '.list-sort',
                includeAll: true,
                allText: '全部',
                includeOther: false,
                removeDisabled: false,
                noMatchText: '没有数据',
                showCounts: false
            }, options);

            require(['listnav'], function() {
                $(opts.selector).listnav(opts);
            });
        },

        /**
         * 局部打印
         * @author zhanpthy
         * @param  {selector}      绑定选择器
         * @param  {printDom}      局部打印的DOM
         * @param  {importCSS}     引用打印前页面的样式
         * @return {opts}
         */
        
        print: function(options){
            var opts = $.extend({
                selector: '',
                printDom: '.print-select',
                debug: false,
                importCSS: true, 
                printContainer: true,
                operaSupport: true
            }, options);

            require(['jqprint'], function() {
                if (opts.selector != '') {
                    $(opts.selector).click(function(){
                        $(opts.printDom).jqprint(opts);
                    });
                } else {
                    $(opts.printDom).jqprint(opts);
                }
            });
        },

        /**
         * 侧滑效果
         * @author zhanpthy
         * @param  {selector}      绑定选择器
         * @return {opts}
         */
        
        mScrollbar: function(options){
            var opts = $.extend({
                selector: ''
            }, options);

            require(['mScrollbar'], function() {
                $(opts.selector).mCustomScrollbar(opts);
            });
        },

        /**
         * datatable 插件
         * @author zhanpthy
         * @param  {selector}      绑定选择器
         * @return {opts}
         */
        
        datatable: function(options){
            var listDataTable;
            var opts = $.extend({
                selector: '',
                autoWidth: false,
                deferRender: true,
                processing: true,
                serverSide: true,
                searching: false,
                deferRender: true,
                pageLength: 20,
                stripeClasses: ['table-list'],
                ordering: false,
                bAutoWidth:  false,
                sZeroRecords: '没有检索到数据',
                searchBtn: '.btn-search-data',
                scrollY: true,
                scrollX: true,
                scrollCollapse: true,
                fixedColumns: {
                    leftColumns: 1
                },
                tableComplete: function(){
                    if ($('.table-null').length > 0) {
                        $('.table-list').click(function(){
                            return false;
                        });
                    }
                }
            }, options);

            var slideHeight = $('.slide-overflow').height();

            require(['datatables', 'datatables-fixed'], function() {
                listDataTable = $(opts.selector).DataTable(opts);

                $(opts.searchBtn).click(function() {
                    listDataTable.ajax.reload();
                    // 重新初始化
                    $('.check-all').prop('checked', false);
                    $('.btn-opt-dis').attr('disabled', true);
                });

                $(opts.selector).on('draw.dt', function(){
                    var slideHeight = $('.slide-overflow').height();
                    opts.tableComplete();
                    // 重新计算高度
                    $('.dataTables_scrollBody').height(slideHeight - 63);

                    if (opts.fixedColumns) {
                        // 延迟绑定hover事件
                        setTimeout(function(){
                            $('.table-list').hover(function(){
                                var tableIndex = $(this).index();
                                $('.dataTable tbody').each(function(index, el) {
                                    $(el).find('tr').eq(tableIndex).siblings().removeClass('hover').end().addClass('hover');
                                });
                            }, function(){
                                $('.table-list').removeClass('hover');
                            });
                        },100);
                    }
                });
            });
        },

        /**
         * 鼠标hover显示内容
         * @author zhanpthy
         * @param  {selector}      绑定选择器
         * @return {opts}
         */
        
        hoverExplain: function(options){
            var opts = $.extend({
                selector: '.order-pirce'
            }, options);

            require(['mallList'], function(){
                $(opts.selector).hoverPop(opts);
            });
        },

        /**
         * 全选、取消全选
         * @author zhanpthy
         * @param  {itemBoxClass}      需要全选的容器
         * @param  {checkAllClass}     全选按钮选择器
         * @return {opts}
         */
        
        checkAll: function(options){
            var opts = $.extend({
                itemBoxClass: '.check-items',
                checkAllClass: '.check-all'
            }, options);

            require(['mallList'], function(){
                $(opts.itemBoxClass).checkAll(opts);
            });
        },
        selectLink: function(options){
            var opts = $.extend({
                selector: '.select-list',
                minimumResultsForSearch: 10
            }, options);

            require(['mallList'], function(){
                $(opts.selector).selectLink(opts);
            });
        },

        /**
         * 加载侧边详情页
         * @author zhanpthy
         * @return {opts}
         */
        
        slideDetail: function(options){
            var opts = $.extend({
                selector: '.table-list',
                contentDom: '#slideEidt'
            }, options);

            require(['mallList'], function(){
                $(opts.selector).slideDetail(opts);
            });
        },

        /**
         * 切换菜单列表选中
         * @author zhanpthy
         * @param  {activeBox}      容器
         * @param  {activeList}     列表
         * @param  {activeClass}    操作的class
         * @param  {coexistence}    是否需要多选
         * @return {opts}
         */
        
        activeList: function(options){
            var opts = $.extend({
                activeBox: '.active-Box',
                activeList: '.active-list',
                activeClass: 'active',
                coexistence: false,
                onClick: function(el){}
            }, options);

            $(opts.activeBox).find(opts.activeList).click(function() {
                if (opts.coexistence) {
                    $(this).toggleClass(opts.activeClass);
                } else {
                    $(this).siblings().removeClass(opts.activeClass).end().addClass(opts.activeClass);
                }
                opts.onClick($(this));
            });
        },

        /**
         * 倒计时
         * @author zhanpthy
         * @param  {selector}       绑定选择器
         * @param  {hourClass}      时选择器
         * @param  {minClass}       分选择器
         * @param  {secClass}       秒选择器
         * @param  {hour}           时
         * @param  {min}            分
         * @param  {sec}            秒
         * @param  {stayTime}       倒计时刷新时间
         * @param  {onEnd()}        结束执行函数
         * @return {opts}
         */
        
        countDown: function(options){
            var opts = $.extend({
                selector: '.selector-time',
                hourClass: '.hour-time',
                minClass: '.min-time',
                secClass: '.sec-time',
                hour: 0,
                min: 0,
                sec: 0,
                stayTime: 1000,
                onEnd: function(hEl, mEl, sEl){}
            }, options);

            var hourTime = Number(opts.hour);
            var minTime = Number(opts.min);
            var secTime = Number(opts.sec);

            function showTime() {
                $(opts.selector).find(opts.hourClass).text(hourTime);
                $(opts.selector).find(opts.minClass).text(checkTime(minTime));
                $(opts.selector).find(opts.secClass).text(checkTime(secTime));

                if (hourTime === 0 && minTime === 0 && secTime === 0) {
                    clearInterval(setTimeFn);
                    opts.onEnd(opts.hourClass, opts.minClass, opts.secClass);
                }
                if (minTime === 0) {
                    if (hourTime > 0) {
                        hourTime --;
                        minTime = 59;
                    }
                }
                if (secTime === 0) {
                    minTime --;
                    secTime = 60;
                }

                secTime --;
            }

            function checkTime(num){
                if (num < 10) {
                    num = '0' + num;
                }
                return num;
            } 

            var setTimeFn = setInterval(function() {
                showTime();
            }, opts.stayTime);
        },

        /**
         * 回车键执行事件
         * @author zhanpthy
         * @return {opts}
         */

        keyEnter: function(options) {
            var opts = $.extend({
                selector: '.select-btn'
            }, options);

            $('body').keydown(function(event) {
                if (event.keyCode === 13) {
                    $(opts.selector).click();
                }
            });
        },

        /**
         * 按钮添加 loading 样式
         * @author zhanpthy
         * @return {opts}
         */
        setLoading: function(options) {
            var opts = $.extend({
                selector: '.select-btn',
                iconClass: 'ico-loading',
                isClick: true
            }, options);

            if (opts.isClick) {
            	$(opts.selector).prepend('<i class="'+ opts.iconClass +'"></i>');

            	$(opts.selector).attr('disabled', true);
            } else {
                $(opts.selector).prepend('<i class="'+ opts.iconClass +'"></i>');
                $(opts.selector).attr('disabled', false);
            }
        },

        /**
         * 遍历数据，使用‘,’分割
         * @param {array} array
         * @param {thousand}  分割的字符
         * @author zhanpthy
         * @return {opts}
         */

        substrPut: function(array, thousand) {
            var getType = Object.prototype.toString;
            var typeStr = '', typeCount = '';
            thousand = thousand || ",";
            
            if (getType.call(array) === '[object Object]') {
                $.each(array, function(index, el) {
                    typeStr += ($(el).val()) + thousand;
                });
            } else {
                $.each(array, function(index, val) {
                    typeStr += val + thousand;
                });
            }

            typeCount = typeStr.substr(0, typeStr.length - 1);

            return typeCount;
        },

        /**
         * 输入限制 - （只能输入数字和小数点，最多输入三位小数，且输入值>0）
         * @author zhanpthy
         * @param  {selector}    选择器
         * @param  {places}      小数保留位数
         * @param  {isInteger}   是否是正整数
         * @return {opts}
         */

        decimalInput: function(options) {
            var opts = $.extend({
                selector: '.input-format',
                places: 3,
                isInteger: false,
                isNeg: false
            }, options);

            var cnDecimal = '';
            for (var i = 0; i < opts.places; i++) {
                cnDecimal += '\\d';
            }

            $('body').on('keyup', opts.selector, function(){
                var value = $(this).val();
                // 设置变量
                var reNum =new RegExp('^(\\-)*(\\d+)\\.(' + cnDecimal + ').*$');

                if (opts.isInteger) {
                    value = value.replace(/[^0-9]*$/g,'');
                } else if(opts.isNeg){
                    value = value.replace(/[^\-\d]/g,'');
                } else {
                    // 只能输入正小数
                    value = value.replace(/[^\d.]/g,'');
                    value = value.replace(/^\./g,"");
                    value = value.replace(/\.{2,}/g,".");
                    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                    value = value.replace(reNum,'$1$2.$3');
                    if(value.indexOf(".") < 0 && value != ''){
                       value= parseFloat(value);    
                    }
                }

                

                $(this).val(value);
                return true;
            })
        },

        /**
         * 价格格式化
         * @author zhanpthy
         * @param  {num}         要格式化的数字
         * @param  {places}      小数保留位数
         * @param  {symbol}      金额的单位
         * @param  {thousand}    千位分隔符
         * @param  {decimal}     小数点分隔符
         * @return {opts}
         */

        picreFormat: function(num ,places, symbol, thousand, decimal) {
            // usage: util.picreFormat(number ,decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
            // defaults: (6999 , 2, "¥", ",", ".")
            places = !isNaN(places = Math.abs(places)) ? places : 2;
            symbol = symbol !== undefined ? symbol : "¥";
            thousand = thousand || ",";
            decimal = decimal || ".";
            var number = num,
                negative = number < 0 ? "-" : "",
                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            var priceNum = symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
            /*var priceStr = priceNum.split('.')[1];

            // 如果小数点部分为 0 则不显示
            if (Number(priceStr) === 0) {
                priceNum = priceNum.split('.')[0];
            }*/
            
            return priceNum;
        },

        /**
         * ajax拦截bug
         * @author zhanpthy
         * @return {opts}
         */
        
        ajaxSetup: function() {
            $.ajaxSetup({
                complete: function(xhr,status) {  
                    var sessionStatus = xhr.getResponseHeader('sessionstatus');  
                    if(sessionStatus == 'interceptorErrpr') {
                        window.location.href = xhr.getResponseHeader('redirectURL');
                    }  
                }
            });
        },

        submitForm: function(action, params) {  
            var form = $("<form></form>");  
            form.attr('action', action);  
            form.attr('method', 'post');  
            form.attr('target', '_self');  
            for (var prop in params) {   
                var input1 = $("<input type='hidden' name='"+prop+"' />");  
                input1.attr('value', params[prop]);  
                form.append(input1);  
            }  
            form.appendTo("body");  
            form.css('display', 'none');  
            form.submit();
            form.remove();
        },

        /**
         * 空格替换为 ‘--’
         * @author zhanpthy
         * @return {opts}
         */
        
        replaceSpace: function(str, char) {
            char = char || '--';

            if(str === null || str === '' || str === 'null'){
                return char;
            } else {
                return str;
            }
        },

        /**
         * ‘--’ 替换为空格
         * @author zhanpthy
         * @return {opts}
         */

        returnSpace: function(str, char) {
            var returnVal = '--';
            char = char || '';
            if(str === null || str === returnVal){
                return char;
            } else {
                return str;
            }
        },
        /**
         * 格式化数字
         * @param num 待处理数字
         * @param scale 精确度
         * @param round 处理方式（ceil(向上进位),floor(舍去末位))，为空时四舍五入
         */
        formatNumber: function (num, scale, round) {
        	if (num != null) {
        		num = typeof num === 'string' ? parseFloat(num) : num 
        		var resultNumber = parseFloat(num.toFixed(scale))
        		if (round && round === 'ceil') {
        			return Math.ceil(resultNumber)
        		} else if (round && round === 'floor') {
        			return Math.floor(resultNumber)
        		}
        		return resultNumber
        	} else {
        		return 0
        	}
        },
        /**
         * 生成GUID(12位，用于前台唯一标识元素)
         */
        guid () {
        	function S4 () {
        		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        	}
        	return (S4() + S4() + S4())
        }
    };
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return util;
        });
    } else {
        window.util = util;
    }
})(window);
