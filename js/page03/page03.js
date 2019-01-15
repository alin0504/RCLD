/**
 * Created by zhangxin on 2018/11/26.
 */
$(function () {
    /**
     * 初始化表格
     */
    var $table = $("#table");
    function initTable() {
        $table.bootstrapTable({
            url: '../data/data.json',
            method:'get',
            dataType: 'json',
            queryParams: function (params) {
                return {
                    pageSize: params.limit,
                    pageNumber: params.offset/params.limit+1,
                    sort:params.sort,
                    sortOrder: params.order
                }
            },
            sortable: true,
            sortOrder: 'asc',
            pagination: false,
            sidePagination: 'server',
            pageNumber:1,//初始化加载第一页，默认第一页
            pageSize: 10,//每页的记录行数（*）
            // pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            pageList: "",        //可供选择的每页的行数（*）
            onLoadSuccess: function () {
                /**
                 * 初始化复选框
                 */
                // $("input[type=checkbox]").iCheck({
                //     checkboxClass: 'icheckbox_square-blue',
                //     increaseArea: '20%'
                // });
            },
            columns: [
                {
                    field: 'id',
                    title: '排名',
                    align: 'center',
                    valign: 'middle',
                    width: '50px'
                },
                {
                    field: 'field2',
                    title: '姓名',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field4',
                    title: '跟进数量',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '签约数量',
                    align: 'center',
                    valign: 'middle'
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    };
    initTable();
    var colors = ['#f4c22b', '#36d2b3', '#5498f6', '#6ad275', '#ff5f18', '#ad29d3'],
        pieChart = echarts.init(document.getElementById('pie')),
        lineChart = echarts.init(document.getElementById('line')),
        funnelChart = echarts.init(document.getElementById('funnel')),
        barChart = echarts.init(document.getElementById('bar'));
    var funnelOption = {
        color: colors,
        title: {
            text: '漏斗分析图',
            left: 'center',
            textStyle:{
                color: '#279db7',
                fontSize: '14px',
                fontWeight:'400'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        calculable: true,
        series: [
            {
                name:'漏斗分析图',
                type:'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 0,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter:function (val) {
                            return val.name + val.value + '条';
                        }
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                },
                data: [
                    {value: 100, name: '全部线索'},
                    {value: 66, name: '跟进线索'},
                    {value: 33, name: '成功入驻'}
                ]
            }
        ]
    };
    funnelChart.setOption(funnelOption, true);
    var lineOption = {
        tooltip: {
            formatter: function (params) {
                var data = params.data || [0, 0];
                return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            axisPointer: {
                show: true,
                type: 'line',
                lineStyle: {
                    type: 'dotted'
                },
                label: {
                    formatter: function (params) {
                        return '降水量  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            axisLine:{
                show: true,
                lineStyle:{
                    color: '#5498f6'
                },
                onZero: true
            },
            axisLabel: {
                color: '#333'
            },
            axisTick:{
                show: false
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {show: false, onZero: true},
            splitLine: {
                lineStyle: {
                    color: '#ddeafd',
                    type: 'dotted'
                }
            },
            axisTick:{
                show: false
            }
        },
        series: [
            {
                color: '#5498f6',
                type: 'line',
                smooth: true,
                symbolSize: 10,
                areaStyle: {
                    color: 'rgba(84, 152, 246, .3)'
                },
                data: [2000,3000,5000,8000,4100,4200,3000,1110,4223,2321,2222,2112]
            }
        ]
    };
    lineChart.setOption(lineOption, true);
    var legendData = [],
        seriesData = [],
        pieData = [
            {value:335, name:'汽车车厂'},
            {value:310, name:'汽车经销商'},
            {value:234, name:'汽车后市场'},
            {value:135, name:'汽车电商'},
            {value:1548, name:'二手车经销商'},
            {value:14, name:'其他'}
        ];
    for(var i in pieData ){
        legendData.push(pieData[i].name + pieData[i].value + '家');
        var obj = {};
        obj.name = pieData[i].name + pieData[i].value + '家';
        obj.value = pieData[i].value;
        seriesData.push(obj);
    }
    var pieOption = {
        color: colors,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            top: 'center',
            right: 'right',
            data:legendData
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                center: ['45%','center'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        // position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: '400'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: seriesData
            }
        ]
    };
    pieChart.setOption(pieOption, true);

    var myData = [
        '传统主机厂商',
        '汽车后市场',
        '新能源汽车',
    ]
    var dataFirm = {
        1: [389, 259, 262]
    }
    var dataDevice = {
        1: [121, 388, 233]
    }
    var timeLineData = [1];
    var barOption ={
        baseOption: {
            timeline: {
                show: false,
                top: 0,
                data: []
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                formatter: '{b}<br/>{a}: {c}人',
                axisPointer: {
                    type: 'shadow'
                }
            },
    
            grid: [{
                    show: false,
                    left: '9%',
                    top: 0,
                    bottom: 0,
                    containLabel: true,
                    width: '31%'
                },
                {
                    show: false,
                    left: '52.5%',
                    top: 0,
                    bottom: 0,
                    width: '0%'
                },
                {
                    show: false,
                    right: '9%',
                    top: 0,
                    bottom: 0,
                    containLabel: true,
                    width: '31%'
                }
            ],
    
            xAxis: [{
                    type: 'value',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    position: 'top',
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                {
                    gridIndex: 1,
                    show: false
                },
                {
                    gridIndex: 2,
                    nameTextStyle: {
                        color: '#50afff',
                        fontSize: 14
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    position: 'top',
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [{
                    type: 'category',
                    inverse: true,
                    position: 'right',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: myData
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    inverse: true,
                    position: 'left',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: '#50afff',
                            fontSize: 14
                        }
                    },
                    data: myData.map(function(value) {
                        return {
                            value: value,
                            textStyle: {
                                align: 'center'
                            }
                        }
                    })
                },
                {
                    gridIndex: 2,
                    type: 'category',
                    inverse: true,
                    position: 'left',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: myData
                }
            ],
            series: []
        },
        options: []
    }   
    barOption.baseOption.timeline.data.push(timeLineData[0])
    barOption.options.push({
    tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{a}: {c} '
    },
    series: [{
            name: '跟进项目',
            type: 'bar',
            barWidth: 10,
            barMinWidth: 5,
            label: {
                normal: {
                    show: true,
                    position: 'left',
                    offset: [0, 0],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#4ca8f6',
                    barBorderRadius: 50
                }
            },

            data: dataFirm[timeLineData[0]]
        },
        {
            name: '成功签约',
            type: 'bar',
            barWidth: 10,
            xAxisIndex: 2,
            yAxisIndex: 2,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    offset: [0, 0],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#00d484',
                    barBorderRadius: 50
                }
            },
            data: dataDevice[timeLineData[0]]
        }
    ]
})
    barChart.setOption(barOption, true)
})
