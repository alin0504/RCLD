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
    var list = $(".search-box .item");
    for(var i = 0;i<list.length;i++){
        if($(list[i]).hasClass("rang-time")){
            //最近一周,最近一月等处理
            var startDate = $(list[i]).find('.active').data("startdate");
            if(startDate){
                var endDate = $(list[i]).find('.active').data("enddate")||moment().format('YYYY-MM-DD');
                if(startDate != -1){
                    map.beginDate = startDate;
                    map.endDate = endDate;
                }
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