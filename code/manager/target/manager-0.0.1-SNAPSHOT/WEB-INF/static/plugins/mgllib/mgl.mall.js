(function($) {
    var popOpts = {
        premiumPrice: 100, //升贴水
        basePrice: 11800, //参考基价
        helpUrl: '#', //帮助中心的url
        helpIcon: 'icon-warning', //帮助中心的url
        target: true,
        align: false, //气泡风格
        content: '',
        contentDom: '',
        width: '',
        callfn: function() {} //加载完成后的回调事件
    };

    //check全选
    var checkAllOpts = {
        itemBoxClass: '.check-items', //check组的class
        checkAllClass: '.check-all', //全选按钮的class
        checkDomClass: 'input:checkbox',
        isCheckOne: false,
        checkOne: function() {},
        checkAllOn: function() {}, //点击全选选中时
        checkAllOff: function() {}, //点击全选未选中时
        callfn: function() {} //加载完成后的回调事件
    }

    //select联动
    var selectLinkOpts = {
        selectFir: '.select-one', //第一级联动
        selectSec: '.select-two', //第二级联动
        selectThr: '.select-three', //第三级联动
        selectData: {},
        select2: {
            optone: {},
            opttwo: {},
            optthree: {}
        },
        hasPick: true,
        callfn: function() {} //加载完成后的回调事件
    }

    // 点击侧滑菜单
    var slideDetailOpts = {
        selecotr: 'body',
        contentDom: '#slideEidt',
        emptyClass: '.table-null',
        active: 'active',
        url: '',
        data: {},
        modal: false,
        innerHTML: '<div id="slideEidt"><div class="rota-load"><i class="icon-jiazai icon-pulse"></i></div></div>',
        slideClose: '.slide-close',
        slideClear: function(el, select, active) {
            $(el).animate({
                right: -1010
            }, 250);
            $('.table-list').removeClass(active);
            $('.slide-contact-mask').fadeOut(200);
        },
        slideBefore: function(el) {},
        slideInit: function(_t, el) {},
        slideComplete: function(_t, el) {},
        slideAfter: function(_t,el){}
    }


    $.fn.extend({
        hoverPop: function(options) {
            var opts = $.extend({}, popOpts, options);
            return this.each(function() {
                var $this = $(this);
                var orderSum = opts.premiumPrice + opts.basePrice;
                var _blank = '_blank';
                var _self = '_self';
                var isAlign = opts.align;

                var html = '<div class="explain-box"><ul class="explain-box-num"><li>' + opts.premiumPrice + '</li><li>' + opts.basePrice + '</li><li>' + orderSum + '</li></ul><ul class="explain-box-txt"><li>升贴水</li><li>+</li><li>参考基价</li><li>=</li><li>订货价</li><li><a href="' + opts.helpUrl + '" target="' + (opts.target == true ? _blank : _self) + '"><i class="' + opts.helpIcon + '"></i></a></li></ul></div>';
                //将视图添加到页面
                if (isAlign) {
                    if (opts.contentDom != '') {
                        html = '<div class="explain-box explain-align" style="width:'+ opts.width +'px">' + $this.parent().find(opts.contentDom).html() +'</div>';
                    } else {
                        html = '<div class="explain-box explain-align" style="width:'+ opts.width +'px">' + opts.content +'</div>';
                    }
                }

                $this.append(html);

                $this.hover(function() {
                    $this.find('.explain-box').show();
                }, function() {
                    $this.find('.explain-box').hide();
                });

                opts.callfn($this);
            });
        },
        checkAll: function(options) {
            var opts = $.extend({}, checkAllOpts, options);
            return this.each(function() {
                var $this = $(this);
                
                $(opts.checkDomClass).click(function() {
                    var chkNum = $(opts.itemBoxClass).find(opts.checkDomClass).size();
                    var chk = 0;

                    $(opts.itemBoxClass).find(opts.checkDomClass).each(function() {
                        if ($(this).prop('checked')) {
                            chk++;
                            opts.checkAllOn();
                        }
                    });
                    if (chk === 0) {
                        opts.checkAllOff();
                    }
                    if (opts.isCheckOne) {
                        if (chk === 1) {
                            opts.checkOne();
                        } else {
                            opts.checkAllOff();
                        }
                    }

                    if (chkNum == chk) {
                        //全选
                        $(opts.checkAllClass).prop('checked', true);
                    } else {
                        //不全选
                        $(opts.checkAllClass).prop('checked', false);
                    }
                });

                $(opts.checkAllClass).click(function() {
                    if ($(this).is(':checked')) {
                        $(opts.itemBoxClass).find(opts.checkDomClass).prop('checked', true);

                        if (opts.isCheckOne) {
                            if ($(opts.itemBoxClass).find(opts.checkDomClass).size() === 1) {
                                opts.checkOne();
                            } else {
                                opts.checkAllOff();
                            }
                        } else {
                            if ($(opts.itemBoxClass).find(opts.checkDomClass).size() > 0) {
                                opts.checkAllOn();
                            }
                        }
                        
                    } else {
                        $(opts.itemBoxClass).find(opts.checkDomClass).prop('checked', false);
                        opts.checkAllOff();
                    }
                });


                opts.callfn($this);
            });
        },
        selectLink: function(options) {
            var opts = $.extend({}, selectLinkOpts, options);
        },
        slideDetail: function(options) {
            var opts = $.extend({}, slideDetailOpts, options);
            var $this = $(this);

            // 初始化解除body点击事件 - 防止点击事件累计
            $('body').off('click', opts.selector);

            opts.slideBefore(opts.selecotr);

            if ($(opts.emptyClass).length > 0) {
                return false;
            }

            $('body').on('click', opts.selector, function(e) {
                var tdThis = $(this);
                var cotDomInit = $(opts.contentDom).length;
                var tdIndex = 0;
                $(this).siblings().removeClass(opts.active).end().addClass(opts.active);
                $(this).parents('tr').siblings().removeClass(opts.active).end().addClass(opts.active);

                // 获取table的序号
                if (options.selector.indexOf(':first-child') > -1) {
                    tdIndex = $(tdThis).parents('tr').index();
                } else {
                    tdIndex = $(tdThis).index();
                }

                if ($('.datatable-index').length > 0) {
                    $('.dataTable tbody').each(function(index, el) {
                        $(el).find('tr').eq(tdIndex).siblings().removeClass(opts.active).end().addClass(opts.active);
                    });
                }

                if (cotDomInit < 1) {
                    $('body').append(opts.innerHTML);

                    if (opts.modal) {
                        $(opts.contentDom).after('<div class="slide-contact-mask"></div>');
                        var maskIndex = $(opts.contentDom).css('z-index');
                        $('.slide-contact-mask').css({'z-index': maskIndex - 5, 'display': 'block'});
                        $('.slide-contact-mask').click(function() {
                            opts.slideClear($(this).prev());
                        });
                    }
                    
                    // 加载内容
                    $.ajax({
                        url: opts.url,
                        type: 'POST',
                        data: opts.data,
                        success: function(data){
                            var result = $(data).find('.slide-cnt');
                            $(opts.contentDom).html(result);

                            opts.slideInit(tdThis ,opts.selecotr);
                            opts.slideComplete(tdThis ,opts.selecotr);
                            // 绑定关闭按钮
                            $(opts.slideClose).click(function(event) {
                                opts.slideClear(opts.contentDom, opts.selecotr, opts.active);
                            });
                        }
                    });
                } else {
                    // 加载完后执行
                    opts.slideComplete(tdThis ,opts.selecotr);
                    opts.slideAfter(tdThis ,opts.selecotr);
                }

                // 滑入动画
                $(opts.contentDom).animate({
                    right: 0
                }, 300);

                // 显示遮罩
                if (opts.modal) {
                    $('.slide-contact-mask').fadeIn(250);
                }

                // 关闭侧栏详情，停止冒泡
                $('.main-content, .ui-header').one('click', function(event) {
                    if($(event.target).closest('.ui-table').length === 0){
                        opts.slideClear(opts.contentDom, opts.selecotr, opts.active);
                    }
                    e.stopPropagation();
                });

                // 第一个禁止冒泡
                var stopFirst = options.selector.indexOf(':first-child');
                if (stopFirst > -1) {
                    $('.ui-table tbody tr td:first-child').click(function(chEve) {
                        chEve.stopPropagation();
                    });
                }
                
                // 停止冒泡
                $('.ui-table thead tr, input:checkbox').click(function(chEve) {
                    chEve.stopPropagation();
                });
            });

            return false;
        }
    });

})(jQuery);

