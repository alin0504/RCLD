$(function(){
    $('input').iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_minimal-blue',
        radioClass : 'iradio_minimal-blue',
        increaseArea : '20%'
    });
})
//时间插件初始化
function initDateSelect(callback) {
    $(".date-select").daterangepicker({
        maxDate : moment(), //最大时间
        dateLimit : {
            days : 180
        },//起止时间的最大间隔
        opens: 'center',
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        separator : ' ~ ',
        autoUpdateInput: false,
        buttonClasses: 'btn',
        applyClass: 'btn-blue',
        cancelClass: 'btn-default',
        locale: {
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        }
    }).on('apply.daterangepicker', function(ev, picker) {
        var start = picker.startDate.format('YYYY');
        var end = picker.endDate.format('YYYY');
        $(this).val(start + ' ~ ' + end);
        $(this).parents('li').addClass('active').siblings().removeClass('active');
        $(this).parents('li').data("startdate",start);
        $(this).parents('li').data("enddate",end);
        callback(start,end);
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

}
//筛选项的点击事件
function headerFilter(callback) {
    $('.search-box').on('click','.item-list li',function () {
        //如果li下面没有input说明不是时间插件
        if($(this).find('input').length == 0){
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).siblings().find('input').length != 0){
                $(this).siblings().find('input').val('');
            }
            callback($(this));
        }
    })
}

//icheck全选和反选
function checkAllMine(dom,name) {
    dom.on('ifChecked', function(event){
        $('[name='+name+']').iCheck('check');
    });
    dom.on('ifUnchecked', function(event){
        $('[name='+name+']').iCheck('uncheck');
    });
}
//封装筛选项的map集合
function getFilterMap() {
    var map = {};
    var list = $(".screen-box .item");
    for(var i = 0;i<list.length;i++){
        if($(list[i]).hasClass("rang-time")){
            var startDate = $(list[i]).find('.active').data("startdate");
            var endDate = $(list[i]).find('.active').data("enddate");
                if(startDate != -1){
                    map.beginDate = startDate;
                    map.endDate = endDate;
                }
        }else{
            var attr = $(list[i]).attr("id");
            var value = $(list[i]).find('.active').data("val");
            map[attr] = value;
            if(value == -1){
                delete map[attr];
            }
        }

    }
    if(map.length == 0){
        return false
    }else{
        return map;
    }
}
function handleDate() {
    var list = $(".rang-time").find("li");
    for(var i = 0;i<list.length;i++){
        var text = $(list[i]).html();
        var startTime,endTime;
        switch (text){
            case "0-25岁":
                startTime = moment().add(-25, 'year').format('YYYY');
                endTime =  moment().add(0, 'year').format('YYYY');
                break;
            case "25-35岁":
                endTime = ( moment().add(-25, 'year').format('YYYY'));
                startTime = (moment().add(-35, 'year').format('YYYY') );
                break;
            case "35-45岁":
                startTime = moment().add(-45, 'year').format('YYYY');
                endTime = moment().add(-35, 'year').format('YYYY');
                break;
            case "45-55岁":
                startTime = moment().add(-55, 'year').format('YYYY');
                endTime = moment().add(-45, 'year').format('YYYY');
                break;
            case "55-65岁":
                startTime = moment().add(-65, 'year').format('YYYY');
                endTime = moment().add(-55, 'year').format('YYYY');
                break;
            case "65岁以上":
                startTime = moment().add(-120, 'year').format('YYYY');
                endTime = moment().add(-65, 'year').format('YYYY');
                break;
            case "全部":
                startTime = -1;
                break;
            default:
                startTime = -2;
        }
        $(list[i]).data("startdate",startTime);
        $(list[i]).data("enddate",endTime)

    }
}