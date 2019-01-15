/**
 * Created by zhangxin on 2018/11/21.
 */
$(function () {
    /**
     * 初始化日期插件
     */
    $(".datepicker").daterangepicker({
        maxDate : moment(), //最大时间
        dateLimit : {
            days : 180
        },//起止时间的最大间隔
        opens: 'left',
        // autoApply:true,
        format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
        separator : ' 到 ',
        autoUpdateInput: false,
        buttonClasses: 'btn',
        applyClass: 'btn-blue',
        cancelClass: 'btn-default',
        ranges : {
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()]
        },
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
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'));
        $("input[name=startDate]").val(picker.startDate.format('YYYY-MM-DD'));
        $("input[name=endDate]").val(picker.endDate.format('YYYY-MM-DD'));
    }).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
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
            pagination: true,
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
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'id',
                    title: '线索编号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '企业名称',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '企业类型',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field3',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (val,row) {
                        console.log(row, val);
                        var tag = '<span class="fa fa-circle text-danger fs10"></span> <span>'+ val +'</span>'
                        return tag;
                    }
                },
                {
                    field: 'field4',
                    title: '跟进人',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field7',
                    title: '线索领取时间',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter:function () {
                        var a = '';
                        a += '<a href="08-工作记录-洽谈备忘-全部记录.html"><span class="text-muted">工作记录</span></a>';
                        return a;
                    }
                }
            ]
        });
        $(window).resize(function () {
            $table.bootstrapTable('resetView');
        });
    };
    initTable();
});