/**
 * Created by zhangxin on 2018/11/23.
 */
(function ($) {
	

    var Star = function ($element,options) {
        var self = this;
        self.$group = null;
        self.$ele = $($element);
        self.opts = $.extend({}, Star.defaults, $.isPlainObject(options) && options);
        self._init();
        self.bindEvent();
    };
    Star.prototype = {
        constructor: Star,
        _init: function () {
            var _this = this;
                _group = document.createElement('div');
            _group.className = "form-control-static star-group",
            _starEle = '';
            for(var i = 0; i< _this.opts.starNum; i++){
                if(i < (_this.opts.val / _this.opts.starPrice)){
                    _starEle +='<i class="fa fa-star current"></i> '
                }else{
                    _starEle +='<i class="fa fa-star"></i> '
                }
            }
            _starEle += '  <span class="star-score">'+ _this.opts.val +'</span><span>'+ _this.opts.starUnit +'</span>';
            _group.innerHTML = _starEle;
            _this.$ele.attr('type','hidden').parent().append(_group);
            _this.$group = $(_group);
            _this._setVal(_this.opts.val);
        },
        _destroy: function () {
            var _this = this;
            _this.$ele.attr('type','text').parent().find(_this.$group).remove();
            _this.$group = null;
            _this.$ele = null;
            _this.opts = Star.defaults;
        },
        _callMethod: function (options) {
            var _this = this,
                res = false;
            switch (options){
                case 'val':
                    res = this.$ele.val();
                break;
                case 'destroy':
                    _this._destroy();
                break;
            }
            return res;
        },
        _setVal: function (score) {
            this.$group.prev().val(score).next().find(".star-score").text(score);
        },
        bindEvent: function () {
            var _this = this;
            if(_this.$group !== null){
                _this.$group.on("click", "i", function () {
                    $(this).nextAll().removeClass("current");
                    $(this).addClass("current").prevAll().addClass("current");
                    var val = ($(this).index()+1)* _this.opts.starPrice;
                    _this._setVal(val);
                }).on("mouseover", "i", function () {
                    $(this).nextAll().removeClass("hover");
                    $(this).addClass("hover").prevAll().addClass("hover");
                }).on("mouseout", "i", function () {
                    $(this).removeClass("hover").siblings().removeClass("hover");
                });
            }
        }
    };
    Star.defaults = {
        val: 0,         /*总得分值*/
        starNum: 5,     /*星星的个数*/
        starPrice: 20,  /*单个星星的分值*/
        starUnit: '分'    /*星星的分值的单位*/
    };
    $.fn.star = function (options) {
        var value,
            chain = this.each(function () {
            if(typeof options !== 'string'){
                var newStar = new Star(this,options);
                $.data(this, 'star', newStar);
            }else{
                var $instance = $(this).data('star');
                if(!$instance){
                    throw new Error('[star] the element is not instantiated');
                } else {
                    value = $instance._callMethod(options);
                    return $instance._callMethod(options);
                }
            }
        });
        if(value !== undefined){
            return value;
        }else{
            return chain;
        }
    }
    
    $.fn.clear = function(options){
    	var value = 0;
    }
})(jQuery || window.jQuery)