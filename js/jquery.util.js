/**
 * Created by zhangxin on 2018/5/25.
 */
!function ($) {
    /**
     * ajax请求
     * @param option {url}
     */
    $.syncPost = function (option) {
        $.ajax({
            url : option.url,
            type : "post",
            data : option.data?option.data:{},
            dataType : 'json',
            async :option.async?option.async:false,
            success : function(result) {
                if (option.event != undefined) {
                    option.event(result);
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown) {
                if(option.errorFn){
                    option.errorFn(XMLHttpRequest, textStatus, errorThrown);
                    return;
                }
                var errorMsg = option.errorMsg?option.errorMsg:'请求失败!';
                // layer.alert(errorMsg);
            }
        });
    };
    /**
     * 校验数据类型
     * @param data
     * @returns {*}
     */
    $.validateDataType = function(data) {
        return Object.prototype.toString.call(data).match(/^\[object\s(.*)\]$/)[1];
    };
    /**
     * 格式化form表单的内容为{key:value}
     * @returns {*}
     */
    $.fn.buildFormData = function(){
        if($(this).is('form')){
            var params = $(this).serializeArray(), data = {};
            $.each(params, function(index, elm) {
                if(data[elm.name]){
                    data[elm.name] += ','+elm.value;
                }else
                    data[elm.name] = elm.value;
            });
            return data;
        }
        return null;
    };
    /**
     * 序列化表单里带name属性的表单元素
     * return []
     * []内是表单元素
     */
    $.fn.serializeElement = function() {
        var  rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|checkbox|radio|range|search|tel|text|time|url|week|file)$/i,
            rselectTextarea = /^(?:select|textarea)/i;

        return this.map(function(){
            return this.elements ? jQuery.makeArray( this.elements ) : this;
        })
        .filter(function(){
            return this.name && !this.disabled &&
                ( this.checked || rselectTextarea.test( this.nodeName ) ||
                rinput.test( this.type ) );
        })
        .map(function( i, elem ){
            var val = jQuery( this ).val();
            if(val == null){
                val = this.value;
            }
            return val == null ?
                null :
                jQuery.isArray( val ) ?
                    jQuery.map( val, function( val, i ){
                        return elem;
                    }) : elem;
        }).get();
    };
    /**
     * 给select插入option
     * @param data
     * [{name:xxx,text: xxx},{name:xxx,text: xxx}]
     */
    $.fn.buildSelectOption = function (data) {
        if($(this).is('select')){
            var html = '';
            $.each(data,function (index, ele) {
                html += '<option value="'+ele.value+'">'+ele.text+'</option>';
            });
            $(this).html(html).selectpicker('refresh');
        }
    }
}(window.jQuery);