require(['util'], function(){
    util.select2({width: '100%'});
    
    //顶部菜单栏子菜单隐藏切换
    $('.menu-down').click(function(e) {
        //出本身之外隐藏
        $('.dropdown-menu').not(this).hide();

        var menuParse = $(this).parent('li');
        var open = menuParse.hasClass('open');
        //移除全部open
        $('.top-menu').find('li').removeClass('open');
        //本身可点击
        e = e || event;
        stopFunc(e);

        //判断执行切换状态
        if (open) {
            menuParse.removeClass('open');
            menuParse.find('.dropdown-menu').hide();
            return false;
        }
        if (!open) {
            menuParse.addClass('open');
            menuParse.find('.dropdown-menu').show();
            return true;
        }
    });

    $('.sidebar-toggle').click(function() {
        var famSidebar = $(this).parents('.ui-sidebar');
        var hasSidebar = famSidebar.hasClass('sidebar-close');
        if (hasSidebar) {
            famSidebar.removeClass('sidebar-close');
            require(['cookie'], function(cookie) {
                cookie.set('_sidebarToggle', 'false');
            });
        }
        if (!hasSidebar) {
            famSidebar.addClass('sidebar-close');
            require(['cookie'], function(cookie) {
                cookie.set('_sidebarToggle', 'true');
            });
        }
    });

    //默认展开菜单
    var headList =$('.sidebar-menu').find('a');
    var locaHref = window.location.href;
    $.each(headList, function(index, el){
        if (String(locaHref).indexOf(el.href) > -1 && el.href != '') {
            $(el).addClass('active');
        }
    });
    var subLi = $('.sidebar-menu').find('.active');
    subLi.parents('.sub-menu').prev('a').addClass('open');
    subLi.parents('.sub-menu').css({
        display: 'block'
    });

    // nav选中菜单
    var locaHrefNav = window.location;
    var headListNav =$(".header-nav-sys").find("a");
    $.each(headListNav, function(index, el){
        if (String(locaHrefNav).indexOf(el.href) > -1 && el.href != '') {
            $(el).parent().addClass('active');
        }
    });

    //全局点击事件
    $('body').on('click', '.ui-dropbox', function(e) {
        $('.dropdown-menu').hide();
        $('.top-menu').find('li').removeClass('open');
    });

    //dropbox 展开
    $('.ui-dropbox > button').on('click', function(e) {
        var dropOpen = $(this).hasClass('open');
        var dropMenu = $(this).next('.ui-drop-menu');

        //dropbox 全局初始化状态
        $('.ui-drop-menu').hide();
        $('.ui-dropbox > button').removeClass('open');

        if (dropMenu.is(':hidden')) {
            dropMenu.show();
        } else {
            dropMenu.hide();
        }

        $(document).one('click', function() {
            $('.ui-drop-menu').hide();
            $('.ui-dropbox > button').removeClass('open');
        });

        if (dropOpen) {
            $(this).removeClass('open');
            dropMenu.hide();
        } 
        if (!dropOpen) {
            $(this).addClass('open');
        }

        e.stopPropagation();
    });
    $('.ui-drop-menu').on('click', function(e) {
        $('.ui-drop-menu').hide();
        $('.ui-dropbox > button').removeClass('open');
        e.stopPropagation();
    });

    function stopFunc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }

    //菜单切换
    (function($, window, document, undefined) {
        var pluginName = 'sidebarMenu';
        var defaults = {
            speed: 200,
            showDelay: 0,
            hideDelay: 0,
            singleOpen: true
        };
        function Plugin(element, options) {
            this.element = element;
            this.settings = $.extend({},
            defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.init()
        };
        $.extend(Plugin.prototype, {
            init: function() {
                this.openSubmenu();
            },
            openSubmenu: function() {
                $(this.element).children('ul').find('li').bind('click touchstart',
                function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if ($(this).children('.sub-menu').length > 0) {
                        if ($(this).children('.sub-menu').css('display') == 'none') {
                            $(this).children('.sub-menu').delay(defaults.showDelay).slideDown(defaults.speed);
                            $(this).children('.sub-menu').siblings('a').addClass('open');
                            if (defaults.singleOpen) {
                                $(this).siblings().children('.sub-menu').slideUp(defaults.speed);
                                $(this).siblings().children('.sub-menu').siblings('a').removeClass('open')
                            }
                            return false
                        } else {
                            $(this).children('.sub-menu').delay(defaults.hideDelay).slideUp(defaults.speed)
                        }
                        if ($(this).children('.sub-menu').siblings('a').hasClass('open')) {
                            $(this).children('.sub-menu').siblings('a').removeClass('open')
                        }
                    }
                    window.location.href = $(this).children('a').attr('href')
                })
            }
        });
        $.fn[pluginName] = function(options) {
            this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options))
                }
            });
            return this
        }
    })(jQuery, window, document);
    $('#sidebar-menu').sidebarMenu();

    /* ==========  自定义滚动条 ======== */
    /*侧边菜单栏*/
    util.mScrollbar({
        selector: '.sidebar-scroll',
        theme: 'minimal'
    });

    resizeHeight();
    $(window).resize(function () {
        resizeHeight();
    });

    function resizeHeight() {
        var h_num = $(window).height();
        var headH = $('.ui-header').height();
        var panelH = $('.panel-tit').height();
        var warpFoot = $('.warp-footer').height();
        var searchH = $('.search-opt').height();
        
        $('.dataTables_scrollBody').height(h_num - (headH + warpFoot + panelH + searchH + 93));
        $('.slide-overflow').height(h_num - (headH + warpFoot + panelH + searchH + 30));

        // var win_w = $(window).width();
        // var left_w = $('.ui-sidebar').width();
        // $('.mCSB_scrollTools_horizontal').width(win_w - left_w - 40);
    }

    $('#selectChangePage').change(function(){
        util.submitForm(window.location.href, {'changeType': $(this).val()});
    });

    // 筛选按钮切换
    $('.btn-opt-screen').click(function() {
        var isActive = $(this).hasClass('active');
        
        if (isActive) {
            $(this).removeClass('active');
            $('.search-criter').slideToggle(0);
        } else {
            $(this).addClass('active');
            $('.search-criter').slideToggle(0);
        }

        resizeHeight();
        $('.btn-search-data').click();
    });
});

//sidebar 收起后显示气泡
require(['dialog'], function() {
    $('.sidebar-menu').find('i').hover(function() {
        var cntShow = $('.sidebar-menu').closest('.ui-sidebar').hasClass('sidebar-close');
        var cntTxt = $(this).next('span').text();
        
        if (cntShow) {
            var sidebarDialog = dialog({
                align: 'right',
                content: cntTxt,
                skin: 'align-dialog align-close'
            });

            sidebarDialog.show(this);
        }
    }, function() {
        $('.align-close').parent('.ui-popup-focus').remove();
    });
});


