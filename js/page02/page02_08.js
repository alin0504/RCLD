/**
 * Created by zhangxin on 2018/11/21.
 */
$(function () {
    /**
     * 初始化表格
     */
    var $table = $("#table"),
        $table2 = $("#table2");
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
                    field: 'field2',
                    title: '标题',
                    align: 'center',
                    valign: 'middle',
                    width: '280px',
                    formatter: function (val) {
                        var _h = '<div class="text-left text-ellipsis">'+ val +'</div>'
                        return _h;
                    }
                },
                {
                    field: 'field2',
                    title: '内容',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (val) {
                        var _h = '<div class="text-left text-ellipsis">'+ val +'</div>'
                        return _h;
                    }
                },
                {
                    field: 'field3',
                    title: '时间',
                    align: 'center',
                    width: '220px',
                    valign: 'middle'
                },
                {
                    align: 'center',
                    width: '50px',
                    valign: 'middle',
                    formatter:function () {
                        var a = '';
                        a += '<span class="fa fa-star text-yellow"></span>';
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
    function initTable2() {
        $table2.bootstrapTable({
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
                    width: '50px',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'field2',
                    title: '标题',
                    align: 'center',
                    valign: 'middle',
                    width: '280px',
                    formatter: function (val) {
                        var _h = '<div class="text-left text-ellipsis">'+ val +'</div>'
                        return _h;
                    }
                },
                {
                    field: 'field2',
                    title: '内容',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (val) {
                        var _h = '<div class="text-left text-ellipsis">'+ val +'</div>'
                        return _h;
                    }
                },
                {
                    field: 'field3',
                    title: '时间',
                    align: 'center',
                    width: '220px',
                    valign: 'middle'
                },
                {
                    align: 'center',
                    width: '50px',
                    valign: 'middle',
                    formatter:function () {
                        var a = '';
                        a += '<span class="fa fa-star text-yellow"></span>';
                        return a;
                    }
                }
            ]
        });
        $(window).resize(function () {
            $table2.bootstrapTable('resetView');
        });
    };
    initTable2();
    $('input[type=checkbox][name=allStar]').iCheck({
        checkboxClass: 'icheckbox_square-aero'
    });
});