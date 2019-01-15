$(function(){
    var laypage = layui.laypage,layer = layui.layer;
        laypage.render({
            elem: 'pager'
            ,count: 1000
            ,layout: ['limit', 'prev', 'page', 'next']
            ,first: false
            ,last: false
            ,theme: '#1E9FFF'
        });
})