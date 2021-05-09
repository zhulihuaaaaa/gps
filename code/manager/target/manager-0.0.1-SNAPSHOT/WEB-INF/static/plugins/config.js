/**
 * ==============
 * 前端模块配置文件
 * ==============
 * @author 詹小灰@461632311
 * @editor Spark
 */
 
var js = {
	base : ctx,
	lib:"plugins/mgllib/",
	plugin : "plugins/",
}; 

require.config({
    baseUrl: js.base,
    paths: {
        'jquery': [js.plugin + 'jquery/jquery.min'],
        'util': './js/common/util',
        //封装Ajax
        'ajax': './js/common/AjaxUtils',
       //validate表单验证
        'validate': js.lib + 'jquery.validate',
        //日期选择器
        	'datetimepicker':[js.plugin + 'bootstrap-datetimepicker/bootstrap-datetimepicker.min'],
        	 // 过滤tableColumn
         'mix-table': './js/components/mix-table',
         //表格组件
         'component-table': './js/components/component-table',
         //下拉组件
         'component-select': './js/components/component-select',
         //上传组件
         'component-upload': './js/components/component-upload',
         // 自定义列组件
         'custom-table-column': './js/components/custom-table-column',
         // 拖拽组件
         'vue-dragging': './js/components/vue-dragging',
         //消息提示
         'dialog': './js/common/dialog',
         //map
         'map': 'https://unpkg.com/vue-amap/dist/index'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'util': {
            exports: 'util',
            deps: ['jquery']
        },
        'ajax': {
        	exports: 'ajax',
        	deps: ['jquery']
        },
        'datetimepicker': {
            exports: '',
            deps: ['jquery']
        }
    }
});
