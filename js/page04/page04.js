/**
 * Created by zhangxin on 2018/11/26.
 */
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
                align: 'center',
                checkbox: true,
                valign: 'middle',
                width: '50px'
            },
            {
                field: 'id',
                title: '登录账号',
                align: 'center',
                valign: 'middle',
                width: '50px'
            },
            {
                field: 'field2',
                title: '用户姓名',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'field4',
                title: '职务',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'field4',
                title: '联系方式',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'field3',
                title: '详细信息',
                align: 'center',
                valign: 'middle',
                formatter: function () {
                    return '<a href="page04_01.html" class="text-green2">查看</a>'
                }
            }
        ]
    });
    $(window).resize(function () {
        $table.bootstrapTable('resetView');
    });
    $(".left-nav").on('click', 'li>a',function () {
        $(this).parent().addClass('active').siblings().removeClass('active')
    });
    $("input[type=radio]").iCheck({
        radioClass: 'iradio_square-blue',
        increaseArea: '20%'
    });
};
initTable();