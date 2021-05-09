require(['util'], function(){
    //-----------------
    // 客户 - 新增
    //-----------------
    $('.btn-add-client').click(function(){
        $.ajax({
            type: 'post',
            url: ctx + '/clientCommonBehavior/addClientView',
            success: function(data) {
                var html = '';
                html += '<form id="addClientDataForm">';
                html += '<h5 class="bg-tit">基本信息</h5>';
                html += '<div class="ui-col">';

                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20 required-txt">客户属性</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.clientType" class="select-control client-type-change">';
                html += '<option value="">请选择</option>';
                $.each(data["CLIENTTYPE"], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-25 required-txt">客户名称</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.clientName" placeholder="请输入客户名称">';
                html += '</div></div>';

                html += '</div>';
                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20 required-txt">客户级别</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.clientLevel" class="select-control">';
                html += '<option value="">请选择</option>';
                $.each(data["CLIENTLEVEL"], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-25 required-txt">客户来源</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.clientSource" class="select-control">';
                html += '<option value="">请选择</option>';
                $.each(data["CLIENTSOURCE"], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '</div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20 required-txt">摊位号</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.firmId" placeholder="请输入摊位号">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-25">所属客户池</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.seaId" class="select-control"  disabled="disabled">';
                html += '<option value=""></option>';
                html += '</select></div></div>';

                html += '</div>';
                
                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-10 ui-pr0 required-txt">已开通产品</label>';
                html += '<div class="ui-col-80">';
                html += '<div>';
                $.each(data["BUSINESSTYPE"], function(index, val) {
                    html += '<label class="ui-mt4 ui-ml8 ui-mr12"><input type="checkbox" class="ui-check ui-checkbox" name="clientVo.businessType" value="'+val.dictValue+'">' + val.dictName + '</label>';
                });;
                html += '</div></div></div>';

                html += '</div>';
                html += '<div class="clearfix"></div>'
                html += '<h5 class="bg-tit">公司信息</h5>';
                html += '<div class="ui-col">';

                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col-50 client-company-name">';
                html += '<label class="ui-label-control ui-col-20 required-txt">公司名称</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.companyName" placeholder="请输入公司名称">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col-50 client-company-type">';
                html += '<label class="ui-label-control ui-col-20 required-txt">公司类型</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.companyType" class="select-control">';
                html += '<option value="">请选择</option>';
                $.each(data["COMPANYTYPE"], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '</div>'

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20">公司法人</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.legalPerson" placeholder="请输入公司法人">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20">公司座机</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.phone" placeholder="请输入公司座机">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20">法人手机</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.mobile" placeholder="请输入法人手机">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20">公司传真</label>';
                html += '<div class="ui-col-60">';
                html += '<input type="text" class="ui-input-control" name="clientVo.fax" placeholder="请输入公司传真">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20">主营行业</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.tradeType" data-placeholder="添加主营行业" class="select-control" multiple>';
                $.each(data["MAINBUSINESS"], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col-50">';
                html += '<label class="ui-label-control ui-col-20">公司规模</label>';
                html += '<div class="ui-col-60">';
                html += '<select name ="clientVo.companySize" class="select-control">';
                html += '<option value="">请选择</option>';
                $.each(data["COMPANYSIZE"], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-10 ui-pr0">所在城市</label>';
                html += '<div class="ui-col-90">';
                html += '<div class="client-distpicker">';
                html += '<div class="ui-col col-100 ui-mr10"><select name="clientVo.province"></select></div>';
                html += '<div class="ui-col col-100 ui-mr10"><select name="clientVo.city"></select></div>';
                html += '<div class="ui-col col-100 ui-mr10"><select name="clientVo.county"></select></div>';
                html += '<div class="ui-col-40"><input type="text" class="ui-input-control" name="clientVo.address" placeholder="请输入详细地址"></div>'
                html += '</div></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-10">公司介绍</label>';
                html += '<div class="ui-col ui-col-80">';
                html += '<textarea class="ui-input-control ui-height-auto" rows="3" name="clientVo.companyInfo" placeholder="请输入公司介绍"></textarea>';
                html += '</div></div>';

                html += '</div>';
                html += '<div class="clearfix"></div>'
                html += '<h5 class="bg-tit">附加信息</h5>';
                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-10">备注</label>';
                html += '<div class="ui-col ui-col-80">';
                html += '<textarea class="ui-input-control ui-height-auto" rows="3" name="clientVo.notes" placeholder="备注"></textarea>';
                html += '</div></div>';

                html += '</div>';
                html += '</form>';
                
                util.dialog({
                    width: 800,
                    height: 500,
                    fixed: true,
                    skin: 'crm-form crm-form-over',
                    title: '新建客户',
                    content: html,
                    okValue: '确定',
                    ok: function() {
                        if ($('#addClientDataForm').valid()) {
                            $.ajax({
                                type: 'post',
                                url: ctx + '/clientCommonBehavior/addClient',
                                data: $('#addClientDataForm').serialize(),
                                success: function(data) {
                                    if (data.isSuccess === 'true') {
                                        util.promptMsg({
                                            content: data.msg
                                        });

                                        setTimeout(function() {
                                            window.location.reload();
                                        }, 800);
                                    } else {
                                        util.promptMsg({
                                            content: data.msg
                                        });
                                    }
                                }
                            });
                        } else {
                            return false;
                        }
                    },
                    cancelValue: '取消',
                    cancel: function() {},
                    onshow: function() {
                        util.city({
                            selector: '.client-distpicker',
                            select2: true,
                            minimumResultsForSearch: 10
                        });

                        util.select2({
                            width: '100%'
                        });

                        // 客户属性切换
                        $('.client-type-change').change(function(){
                            var thisVal = $(this).val();
                            if (thisVal === 'B') {
                                $('.client-company-name, .client-company-type').find('.ui-label-control').removeClass('required-txt');
                                $('.client-company-name, .client-company-type').find('label.error').hide();
                            } else {
                                $('.client-company-name, .client-company-type').find('.ui-label-control').addClass('required-txt');
                            }
                        });

                        // 表单验证
                        addClientDataValid();
                    }
                });
             }
        });
    });

    //-----------------
    // 销售线索 - 新增
    //-----------------
    $('.btn-add-clue').click(function(){
        $.ajax({
            type: 'post',
            url: ctx + '/clue/addClueView',
            success: function(data) {
                var html = '';
                html += '<form id="addClueForm">';
                html += '<h5 class="bg-tit">基本信息</h5>';

                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20 required-txt">姓名</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="hidden" name="clueVo.clueId" value="">';
                html += '<input type="text" class="ui-input-control" name="clueVo.person" placeholder="请输入姓名">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">公司</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="clueVo.company" placeholder="请输入公司">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20 required-txt">线索来源</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="clueVo.clueSource" class="select-control">';
                html += '<option value="">-请选择-</option>';
                $.each(data["CLUESOURCE"], function(index, obj) {
                    html += "<option value='" + obj.dictValue + "'>" + obj.dictName + "</option>";
                })
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">线索级别</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="clueVo.clueLevel" class="select-control">';
                html += '<option value="">-请选择-</option>';
                $.each(data["CLUELEVEL"], function(index, obj) {
                    html += "<option value='" + obj.dictValue + "'>" + obj.dictName + "</option>";
                })
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col ui-col-20">线索详情</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<textarea class="ui-input-control ui-height-auto" rows="3" name="clueVo.clueDesc" placeholder="请输入线索详情"></textarea>';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">线索池</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="clueVo.poolId" class="select-control">';
                html += '<option value="">-请选择-</option>';
                $.each(data.poolList, function(index, obj) {
                    html += '<option value="' + obj.poolId + '">' + obj.poolName + '</option>';
                })
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20 required-txt">手机</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="clueVo.mobile" placeholder="请输入手机">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">电话</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="clueVo.phoneNo" placeholder="请输入电话">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">职务</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="clueVo.position" placeholder="请输入职务">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">主要工作</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="clueVo.mainWork" placeholder="请输入主要工作">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">联系人地址</label>';
                html += '<div class="ui-col ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="clueVo.address" placeholder="请输入联系人地址">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">主营行业</label>';
                html += '<div class="ui-col-75">';
                html += '<select data-placeholder="主营行业" name ="clueVo.tradeType" class="select-control" multiple>';
                html += '<option value=""></option>';
                $.each(data["MAINBUSINESS"], function(index, obj) {
                    html += "<option value='" + obj.dictValue + "'>" + obj.dictName + "</option>";
                })

                html += '</select></div></div>';
                html += '</form>';
                
                util.dialog({
                    width: 540,
                    height: 510,
                    fixed: true,
                    skin: 'crm-form crm-form-over',
                    title: '新建线索',
                    content: html,
                    okValue: '保存',
                    ok: function() {
                        if ($('#addClueForm').valid()) {
                            $.ajax({
                                type: 'post',
                                url: ctx + '/clue/addClue',
                                data: $('#addClueForm').serialize(),
                                success: function(data) {
                                    if (data.isSuccess === 'true') {
                                        util.promptMsg({
                                            content: data.msg
                                        });

                                        setTimeout(function() {
                                            window.location.reload();
                                        }, 800);
                                    } else {
                                        util.promptMsg({
                                            content: data.msg
                                        });
                                    }
                                }
                            });
                        } else {
                            return false;
                        }
                    },
                    cancelValue: '取消',
                    cancel: function() {},
                    onshow: function() {
                        util.select2({
                            width: '100%'
                        });
                        // 表单验证
                        clueValid();
                    }
                });
            }
        });
    });
    
    //-----------------
    // 联系人 - 新增
    //-----------------
    $('.btn-add-contacts').click(function(){
        $.ajax({
            url: ctx + '/contact/addContactView',
            type: "POST",
            success: function(data) {
                var selectData = data.ClientDto;
                var html = '';
                html += '<form id="addContactDataForm">';
                html += '<h5 class="bg-tit">基本信息</h5>';
                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20 required-txt">客户名称</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="clientId" class="select-control" data-placeholder="客户名称">';
                html += '<option value="">请选择</option>';
                $.each(selectData, function(index, obj) {
                    html += '<option value="' + obj.clientId + '">' + obj.clientName + '</option>';
                });
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">名片</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="file" class="dis-hidden" name="contactNameCard" id="filerImage">';
                html += '<p class="ui-ft12 ui-color-9">支持jpg、gif、png格式的图片，最多可添加20张</p>';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20 required-txt">姓名</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="contactName" placeholder="请输入姓名">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">部门</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="contactDepartment" placeholder="请输入部门">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">职务</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="contactPosition" placeholder="请输入职务">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20 required-txt">关键决策人</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="decisionMaker" class="select-control">';
                html += '<option value="">请选择</option>';
                html += '<option value="Y">是</option>';
                html += '<option value="N">否</option>';
                html += '</select></div></div>';
                html += '</div>';

                html += '<div class="clearfix"></div>';
                html += '<h5 class="bg-tit">联系方式</h5>';
                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">电话</label>';
                html += '<div class="ui-col-75">';
                html += '<div class="pos-relative">';
                html += '<input type="text" class="ui-input-control" name="phone" placeholder="请输入电话"><i class="icon-cuowuguanbiquxiao-xianxingyuankuang ui-hidden btn-contact-del"></i>';
                html += '</div>';
                html += '<a href="javascript:void(0);" class="a-edit ui-blueDark btn-add-phone">+ 添加电话号码</a>';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">手机</label>';
                html += '<div class="ui-col-75">';
                html += '<div class="pos-relative">';
                html += '<input type="text" class="ui-input-control" name="mobile" placeholder="请输入手机"><i class="icon-cuowuguanbiquxiao-xianxingyuankuang ui-hidden btn-contact-del"></i>';
                html += '</div>';
                html += '<a href="javascript:void(0);" class="a-edit ui-blueDark btn-add-mobile">+ 添加手机号码</a>';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">邮件</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="mail" placeholder="请输入邮件">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">地址</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="address" placeholder="请输入地址">';
                html += '</div></div>';

             /*   html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">职务</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="" placeholder="请输入职务">';
                html += '</div></div>';*/

                html += '</div>';

                html += '<div class="clearfix"></div>';
                html += '<h5 class="bg-tit">附加信息</h5>';
                html += '<div class="ui-col">';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">生日</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control birthday-time" name="contactBirthday" placeholder="请选择日期">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">公司名称</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="companyName" placeholder="请输入公司名称">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">性别</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="contactSex" class="select-control">';
                html += '<option value="">请选择</option>';
                html += '<option value="M">男</option>';
                html += '<option value="W">女</option>';
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">介绍人</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="contactIntroducer" placeholder="请输入介绍人">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">备注</label>';
                html += '<div class="ui-col-75">';
                html += '<textarea class="ui-input-control ui-height-auto" rows="3" name="notes" placeholder="备注"></textarea>';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">爱好</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="interestDesc" placeholder="请输入爱好">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">微信</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="weixin" placeholder="请输入微信号">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">QQ</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="qq" placeholder="请输入QQ号">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">传真</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="fax" placeholder="请输入传真">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">新浪微博</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="sinaMicroblog" placeholder="请输入新浪微博">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">腾讯微博</label>';
                html += '<div class="ui-col-75">';
                html += '<input type="text" class="ui-input-control" name="tencentMicroblog" placeholder="请输入腾讯微博">';
                html += '</div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">角色关系</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="contactRelation" class="select-control">';
                html += '<option value="">请选择</option>';
                $.each(data['CONTACTRELATION'], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '<div class="ui-form-group ui-col">';
                html += '<label class="ui-label-control ui-col-20">亲密程度</label>';
                html += '<div class="ui-col-75">';
                html += '<select name ="contactIntimacy" class="select-control">';
                html += '<option value="">请选择</option>';
                $.each(data['CONTACTINTIMACY'], function(index, obj) {
                    html += '<option value="' + obj.dictValue + '">' + obj.dictName + '</option>';
                });
                html += '</select></div></div>';

                html += '</div>';
                html += '</form>';

                util.dialog({
                    width: 540,
                    height: 500,
                    fixed: true,
                    skin: 'crm-form crm-form-over',
                    title: '新建联系人',
                    content: html,
                    okValue: '保存',
                    ok: function() {
                        if ($('#addContactDataForm').valid()) {
                            $.ajax({
                                type: 'post',
                                url: ctx + '/contact/addContact',
                                data: $('#addContactDataForm').serialize(),
                                success: function(data) {
                                    if (data.isSuccess === 'true' || data.isSuccess === true) {
                                        util.promptMsg({
                                            content: data.msg
                                        });

                                        setTimeout(function() {
                                            window.location.reload();
                                        }, 800);
                                    } else {
                                        util.promptMsg({
                                            content: data.msg
                                        });
                                    }
                                }
                            });
                        } else {
                            return false;
                        }
                    },
                    cancelValue: '取消',
                    cancel: function() {},
                    onshow: function() {
                        util.datePicker({
                            selector: '.birthday-time'
                        });

                        util.select2({
                            width: '100%',
                            minimumResultsForSearch: 5
                        });

                        // 绑定添加手机电话事件
                        $('.btn-add-phone, .btn-add-mobile').click(function() {
                            var inputHtml = '';

                            inputHtml += '<div class="pos-relative">';
                            if ($(this).hasClass('btn-add-mobile')) {
                                inputHtml += '<input type="text" class="ui-input-control ui-mt15" name="mobile" placeholder="请输入手机"><i class="icon-cuowuguanbiquxiao-xianxingyuankuang btn-contact-del"></i>';
                            } else {
                                inputHtml += '<input type="text" class="ui-input-control ui-mt15" name="phone" placeholder="请输入电话"><i class="icon-cuowuguanbiquxiao-xianxingyuankuang btn-contact-del"></i>';
                            }
                            inputHtml += '</div>';

                            $(this).parent().find('.btn-contact-del').show();
                            $(this).before(inputHtml);
                        });

                        // 绑定删除事件 
                        $('body').on('click', '.btn-contact-del', function() {
                            if ($(this).parent().parent().find('.pos-relative').length < 3) {
                                $(this).parent().parent().find('.btn-contact-del').hide();
                                $(this).parent().parent().find('.ui-input-control').css('margin-top', '0');
                            }

                            $(this).parent().remove();
                        });

                        // 上传图片
                        flierImageUpdata()

                        // 表单验证
                        contactPublicValid();
                    }
                });
            }
        });
    });
});

//---------------
// 客户 - 新建验证
//---------------
function addClientDataValid() {
    util.formValid({
        selector: '#addClientDataForm',
        onkeyup:false,
        rules: {
            'clientVo.clientType': {
                required: true
            },
            'clientVo.clientName': {
                required: true,
                remote : {
                    url : ctx + '/common/judgeClientNameExists',
                    type : 'post',
                    data : {
                        clientName: function() {
                            return $('#addClientDataForm input[name="clientVo.clientName"]').val();
                        }
                    }
                }
            },
            'clientVo.clientLevel': {
                required: true
            },
            'clientVo.clientSource': {
                required: true
            },
            'clientVo.firmId': {
                required: true,
                nochinese: true,
                checkNumeric: true,
                remote : {
                    url : ctx + '/common/judgeClientFirmExists',
                    type : 'post',
                    data : {
                        firmId: function() {
                            return $('#addClientDataForm input[name="clientVo.firmId"]').val();
                        }
                    }
                }
            },
            'clientVo.businessType': {
                required: true
            },
            'clientVo.companyName': {
                required: function(el) {
                    var closeEl = $(el).closest('#addClientDataForm');
                    var inputVal = $(closeEl).find('[name="clientVo.clientType"]').val();

                    if (inputVal === 'B') {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            'clientVo.companyType': {
                required: function(el) {
                    var closeEl = $(el).closest('#addClientDataForm');
                    var inputVal = $(closeEl).find('[name="clientVo.clientType"]').val();

                    if (inputVal === 'B') {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        messages: {
            'clientVo.clientType': {
                required: '请选择客户属性'
            },
            'clientVo.clientName': {
                required: '请输入客户名称',
                remote: '客户名称已存在'
            },
            'clientVo.clientLevel': {
                required: '请选择客户级别'
            },
            'clientVo.clientSource': {
                required: '请选择客户来源'
            },
            'clientVo.firmId': {
                required: '请输入摊位号',
                remote: '摊位号已存在'
            },
            'clientVo.businessType': {
                required: '请选择开通产品'
            },
            'clientVo.companyName': {
                required: '请输入公司名称'
            },
            'clientVo.companyType': {
                required: '请选择公司类型'
            }
        }
    });
}

//-----------------
// 销售线索 - 新建验证
//-----------------
function clueValid() {
    util.formValid({
        selector: '#addClueForm',
        onkeyup:false,
        rules: {
            'clueVo.person': {
                required: true,
                remote : {
                    url : ctx + '/common/isAddClueByPersonAndPhoneNo',
                    type : 'post',
                    data : {
                    	person: function() {
                            return $('#addClueForm input[name="clueVo.person"]').val();
                        }, 
                        phoneNo: function() {
                            return $('#addClueForm input[name="clueVo.mobile"]').val();
                        }, 
                        clueId: function() {
                            return $('#addClueForm input[name="clueVo.clueId"]').val();
                        }
                    }
                }
            },
            'clueVo.clueSource': {
                required: true
            },
            'clueVo.mobile': {
                required: true,
                remote : {
                    url : ctx + '/common/isAddClueByPersonAndPhoneNo',
                    type : 'post',
                    data : {
                    	person: function() {
                            return $('#addClueForm input[name="clueVo.person"]').val();
                        }, 
                        phoneNo: function() {
                            return $('#addClueForm input[name="clueVo.mobile"]').val();
                        }, 
                        clueId: function() {
                            return $('#addClueForm input[name="clueVo.clueId"]').val();
                        }
                    }
                }
            }
        },
        messages: {
            'clueVo.person': {
                required: '姓名不能为空',
                remote: '姓名和手机号已经存在不允许新建线索'
            },
            'clueVo.clueSource': {
                required: '请选择线索池来源'
            },
            'clueVo.mobile': {
                required: '手机号不能为空',
                remote: '姓名和手机号已经存在不允许新建线索'
            }
        }
    });
}


//----------------------
// 联系人 - 新建验证
//----------------------
function contactPublicValid() {
    util.formValid({
        selector: '#addContactDataForm',
        onkeyup:false,
        rules: {
            'clientName': {
                required: true
            },
            'clientId': {
                required: true
            },
            'contactName': {
                required: true
            },
            'decisionMaker': {
                required: true
            }
        },
        messages: {
            'clientName': {
                required: '请选择客户名称'
            },
            'clientId': {
                required: '请选择客户名称'
            },
            'contactName': {
                required: '请输入姓名'
            },
            'decisionMaker': {
                required: '请选择关键决策人'
            }
        }
    });
}

//-------------------
// 联系人 - 新建上传名片
//-------------------
function flierImageUpdata(picArray) {
    picArray = picArray || [];
    util.uploadFile({
        selector: '#filerImage',
        type: 'image',
        limit: 20,
        changeInput: '<div class="jFiler-input-cnt"><div class="jFiler-input-cer"><i class="icon-tupian-xianxing"></i></div><p>上传图片</p></div>',
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
            item: '<li class="jFiler-item">\
            <div class="jFiler-item-container">\
              <div class="jFiler-item-inner">\
                <div class="jFiler-item-thumb">\
                  <div class="jFiler-item-del"><a class="icon-remove jFiler-item-trash-action">X</a></div>\
                  <div class="jFiler-item-status"></div>\
                  <div class="jFiler-item-thumb-overlay">\
                    <div class="jFiler-item-info">\
                      <div style="display:table-cell;vertical-align: middle;">\
                      </div>\
                    </div>\
                  </div>\
                  {{fi-image}}\
                </div>\
                <div class="jFiler-item-assets jFiler-row">\
                  <ul class="list-inline pull-left">\
                    <li>{{fi-progressBar}}</li>\
                  </ul>\
                </div>\
              </div>\
            </div>\
          </li>',
            itemAppend: '<li class="jFiler-item">\
            <div class="jFiler-item-container">\
              <div class="jFiler-item-inner">\
                <div class="jFiler-item-thumb">\
                  <div class="jFiler-item-del"><a class="icon-remove jFiler-item-trash-action">X</a></div>\
                  <div class="jFiler-item-status"></div>\
                  <div class="jFiler-item-thumb-overlay">\
                    <div class="jFiler-item-info">\
                      <div style="display:table-cell;vertical-align: middle;">\
                      </div>\
                    </div>\
                  </div>\
                  {{fi-image}}\
                </div>\
                <div class="jFiler-item-assets jFiler-row">\
                  <p class="jFiler-item-others text-success"><i class="icon-zhengquewancheng-xianxingyuankuang"></i><span>已上传</span><input type="hidden" value="{{fi-name}}" name="contactNameCard"></p>\
                </div>\
              </div>\
            </div>\
          </li>',
            progressBar: '<div class="bar"></div>',
            canvasImage: true,
            removeConfirmation: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        uploadFile: {
            url: ctx + "/fileOpera/uplaodCardImage",
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            synchron: true,
            beforeSend: function() {},
            success: function(data, itemEl, listEl, boxEl, newInputEl, inputEl, id) {
                var parent = itemEl.find(".jFiler-jProgressBar").parent(),
                    filerKit = inputEl.prop("jFiler");
                itemEl.find(".jFiler-jProgressBar").fadeOut("slow", function() {
                    $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-zhengquewancheng-xianxingyuankuang\"></i>上传成功<input type='hidden' value='" + data.adr + "' name='contactNameCard'></div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            error: function(el) {
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function() {
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-gantanhao-xianxingyuankuang\"></i>上传失败</div>").hide().appendTo(parent).fadeIn("slow");
                });
            }
        },
        files: picArray
    });
}

