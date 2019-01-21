/**
 * Created by zhangxin on 2018/11/21.
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
                    width: '60px',
                    title: '序号',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '姓名',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '职位',
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '电话',
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
    /**
     * 初始化星级
     */
    $(".star-control").star({val: 40});
});