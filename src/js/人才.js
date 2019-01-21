$(function(){
    /*初始化加载所有省份*/
    // getProvince();
    var laypage = layui.laypage;
    laypage.render({
        elem: 'pager'
        ,count: 1000
        ,layout: ['limit', 'prev', 'page', 'next']
        ,first: false
        ,last: false
        ,theme: '#1E9FFF'
    });
    laypage.render({
        elem: 'demo'
        ,count: 50 //数据总数
        ,theme: '#1E9FFF'
      });
      laypage.render({
        elem: 'demo1'
        ,count: 50 //数据总数
        ,theme: '#1E9FFF'
      });
        //筛选项
        handleDate();
        getFilterMap();
    headerFilter(function () {
        var filterData = getFilterMap();
        console.log(filterData)
    });
    initDateSelect(function (beginDate, endDate) {
        console.log(beginDate,endDate)
    });
})

/*  select显示标题*/
var opt0 = new Array("省","市","县");
/*字符串连接 符*/
var concatStr = "-";
// $.ajax({
//     url:"../data/data.json",
//     dataType:"json",
//     success:function(res){
//         console.log(res);
//     }
// })
/*获取所有省*/
function getProvince(){
	$("input[name='su.companyCountyCode']").val("");
    $("input[name='su.companySxy']").val("");
	var seleProvince = $("#seleProvince");
	seleProvince.empty();
	seleProvince.append("<option value=''>"+opt0[0]+"</option>");
	$("#seleCity").empty();
	$("#seleCity").append("<option value=''>"+opt0[1]+"</option>");
	$("#seleCounty").empty();
	$("#seleCounty").append("<option value=''>"+opt0[2]+"</option>");
	for(var x = 0; x < areaJson.length;x++){
		seleProvince.append("<option value='"+areaJson[x].areaId+"'>"+areaJson[x].areaName+"</option>");
	}
}
/*获取所有市*/
function getCity(areaId){
	$("input[name='su.companyCountyCode']").val("");
	$("input[name='su.companySxy']").val("");
	var seleCity = $("#seleCity");
	seleCity.empty();
	seleCity.append("<option value=''>"+opt0[1]+"</option>");
	$("#seleCounty").empty();
	$("#seleCounty").append("<option value=''>"+opt0[2]+"</option>");
	if(areaId!="")
	for(var x = 0; x < areaJson.length;x++){
		var areaIdTemp = areaJson[x].areaId;
		if(areaIdTemp == areaId)
		{
			//如果没有市，则将当前省做为最后一级
			if(areaJson[x].aearList == null || areaJson[x].aearList.length==0)
			{
				$("input[name='su.companyCountyCode']").val(areaId);
				$("input[name='su.companySxy']").val(areaJson[x].areaName);
			}else{
				for(var y = 0; y < areaJson[x].aearList.length; y++)
				{
					seleCity.append("<option value='"+areaJson[x].aearList[y].areaId+"'>"+areaJson[x].aearList[y].areaName+"</option>");
				}
			}
			break;
        }
    }
    var spr = $("select[id='seleProvince'] > option[value='"+$("#seleProvince").val()+"']").text();
    console.log(spr)
}
/*根据省和市获取县*/
function getCounty(cityId){
	$("input[name='su.companyCountyCode']").val("");
	$("input[name='su.companySxy']").val("");
	var proId = $("#seleProvince").val();
	var seleCounty = $("#seleCounty"); 
	seleCounty.empty();
	seleCounty.append("<option value=''>"+opt0[2]+"</option>");
	if(cityId!="")
	for(var x = 0; x < areaJson.length;x++){
		if(areaJson[x].areaId == proId)
		{
			for(var y = 0; y < areaJson[x].aearList.length; y++)
			{
				if(cityId==areaJson[x].aearList[y].areaId)
				{
					//如果没有县了，则将当前市做为最后一级
					if(areaJson[x].aearList[y].aearList == null || areaJson[x].aearList[y].aearList.length==0)
					{
						$("input[name='su.companyCountyCode']").val(cityId);
						$("input[name='su.companySxy']").val(areaJson[x].areaName+concatStr+areaJson[x].aearList[y].areaName);
					}else{
						for(var h = 0; h < areaJson[x].aearList[y].aearList.length; h++)
						{
							seleCounty.append("<option value='"+areaJson[x].aearList[y].aearList[h].areaId+"'>"+areaJson[x].aearList[y].aearList[h].areaName+"</option>");
						}
					}
					break;
				}
			}
			break;
		}
    }
    var spr = $("select[id='seleProvince'] > option[value='"+$("#seleProvince").val()+"']").text();
    var sci = $("select[id='seleCity'] > option[value='"+$("#seleCity").val()+"']").text();
    console.log(spr,sci)
}
/*选择县后  赋值  编号和拼接地址信息*/
function setCountyCode(areaId){
	$("input[name='su.companyCountyCode']").val(areaId);
	var spr = $("select[id='seleProvince'] > option[value='"+$("#seleProvince").val()+"']").text();
	var sci = $("select[id='seleCity'] > option[value='"+$("#seleCity").val()+"']").text();
    var sco = $("select[id='seleCounty'] > option[value='"+areaId+"']").text();
    console.log(spr,sci,sco)
	$("input[name='su.companySxy']").val(spr+concatStr+sci+concatStr+sco);
}


// 、、、、、

//省市县
/*  select显示标题*/
var opt0 = new Array("省","市","县");
/*字符串连接 符*/
var concatStr = "-";
var areaJson;
/*获取所有省*/
function getProvince(){
    $("input[name='su.companyCountyCode']").val("");
    $("input[name='su.companySxy']").val("");
    province = $("#province");
    province.empty();
    province.append("<option value=''>"+opt0[0]+"</option>");
    $("#city").empty();
    $("#city").append("<option value=''>"+opt0[1]+"</option>");
    $("#region").empty();
    $("#region").append("<option value=''>"+opt0[2]+"</option>");
    $.ajax({
        url:"/assets/data/data.json",
        dataType:"json",
        success:function(res){
            areaJson = res;
            for(var x = 0; x < areaJson.length;x++){
                province.append("<option value='"+areaJson[x].areaId+"'>"+areaJson[x].areaName+"</option>");
            }
        }
    });
}
/*获取所有市*/
function getCity(areaId){
    $("input[name='su.companyCountyCode']").val("");
    $("input[name='su.companySxy']").val("");
    city = $("#city");
    city.empty();
    city.append("<option value=''>"+opt0[1]+"</option>");
    $("#region").empty();
    $("#region").append("<option value=''>"+opt0[2]+"</option>");
    if(areaId!="")
        for(var x = 0; x < areaJson.length;x++){
            var areaIdTemp = areaJson[x].areaId;
            if(areaIdTemp == areaId){
                //如果没有市，则将当前省做为最后一级
                if(areaJson[x].aearList == null || areaJson[x].aearList.length==0){
                    $("input[name='su.companyCountyCode']").val(areaId);
                    $("input[name='su.companySxy']").val(areaJson[x].areaName);
                }else{
                    for(var y = 0; y < areaJson[x].aearList.length; y++){
                        city.append("<option value='"+areaJson[x].aearList[y].areaId+"'>"+areaJson[x].aearList[y].areaName+"</option>");
                    }
                }
                break;
            }
        }
    province = $("select[id='province'] > option[value='"+$("#province").val()+"']").text();
    search(downData,province);
    console.log(province)
}
/*根据省和市获取县*/
function getCounty(cityId){
    $("input[name='su.companyCountyCode']").val("");
    $("input[name='su.companySxy']").val("");
    var proId = $("#province").val();
    region = $("#region");
    region.empty();
    region.append("<option value=''>"+opt0[2]+"</option>");
    if(cityId!="")
        for(var x = 0; x < areaJson.length;x++){
            if(areaJson[x].areaId == proId)
            {
                for(var y = 0; y < areaJson[x].aearList.length; y++)
                {
                    if(cityId==areaJson[x].aearList[y].areaId)
                    {
                        //如果没有县了，则将当前市做为最后一级
                        if(areaJson[x].aearList[y].aearList == null || areaJson[x].aearList[y].aearList.length==0){
                            $("input[name='su.companyCountyCode']").val(cityId);
                            $("input[name='su.companySxy']").val(areaJson[x].areaName+concatStr+areaJson[x].aearList[y].areaName);
                        }else{
                            for(var h = 0; h < areaJson[x].aearList[y].aearList.length; h++)
                            {
                                region.append("<option value='"+areaJson[x].aearList[y].aearList[h].areaId+"'>"+areaJson[x].aearList[y].aearList[h].areaName+"</option>");
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    province = $("select[id='province'] > option[value='"+$("#province").val()+"']").text();
    city = $("select[id='city'] > option[value='"+$("#city").val()+"']").text();
    console.log(province,city);
    search(downData,province,city);
}
/*选择县后  赋值  编号和拼接地址信息*/
function setCountyCode(areaId){
    $("input[name='su.companyCountyCode']").val(areaId);
    province = $("select[id='province'] > option[value='"+$("#province").val()+"']").text();
    city = $("select[id='city'] > option[value='"+$("#city").val()+"']").text();
    region = $("select[id='region'] > option[value='"+areaId+"']").text();
    console.log(province,city,region);
    $("input[name='su.companySxy']").val(province+concatStr+city+concatStr+region);
    search(downData,province,city,region);
}
