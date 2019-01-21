/**
 * Created by zhangxin on 2017/10/26.
 */

(function (win,doc,$) {
    var Loading = function (option,container) {
        var defaults = {
            dom: doc.body,
            text: "",
            time: 0
        },
            self = this;
        self.options = $.extend({},defaults,option);
        self.el = container?container:this.options.dom;
        self._show();
        if(self.options.time!==0&& typeof self.options.time == 'number'){
            setTimeout(function () {
                self._destroy();
            },self.options.time);
        }
    };
    Loading.prototype = {
        constructor:Loading,
        _init:function () {
            var _self = this,
            _html = this._createHtml();
            _self.el.style.position = "relative";
            _self.el.style.overflow = "hidden";
            _self.el.appendChild(_html);
        },
        _createHtml:function () {
            var mask = doc.createElement("div"),
                spinner = doc.createElement("div"),
                p = doc.createElement("p"),
                circular = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>';
            mask.className = this.options.isfullscreen ? "el-loading-mask is-fullscreen" : "el-loading-mask";
            spinner.className = "el-loading-spinner";
            spinner.innerHTML = circular;
            if(this.options.text){
                p.innerText = this.options.text
                spinner.appendChild(p);
            }
            mask.appendChild(spinner);
            return mask;
        },
        _show:function () {
            this._init();
        },
        _destroy:function () {
            this.el.querySelector(".el-loading-mask").style.display = "none";
            this.el.removeAttribute('style');
            var thisMask = this.el.querySelector(".el-loading-mask");
            this.el.removeChild(thisMask);
        },
        callMethod: function (fun) {
            var func = false;
            fun == 'show' ? func=this._show() : func=this._destroy();
            return func;
        }
    };
    if($){
        $.fn.loading = function (options) {
            return this.each(function () {
                if(typeof options !== "string"){
                    var newLoading = new Loading(options,this);
                    $.data(this,'loading', newLoading);
                }else{
                    var $instance = $(this).data('loading');
                    if(!$instance){
                        throw new Error('[loading] the element is not instantiated');
                    } else {
                        return $instance.callMethod(options);
                    }
                }
            });
        }
    }
}(window,document,$));

























