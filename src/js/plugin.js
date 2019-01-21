(function () {
    var _options = {
        default_word : "hello world!"
    };
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    var _pulgin_api = {
        helloword : function (str) {
            console.log(str ? str : _options.default_word);
            return this;
        },
        /**
         * 判断两个数组是否相等
         * @param arr1
         * @param arr2
         * @returns {boolean}
         */
        arrayEqual:function (arr1, arr2) {
            if(arr1 === arr2) return true;
            if(arr1.length != arr2.length) return false;
            for(var i = 0; i < arr1.length; ++i){
                if(arr1[i] !== arr2[i]) return false;
            }
            return true;
        },
        /**
         * 判断`obj`是否为空
         * @param obj
         * @returns {boolean}
         */
        isEmptyObject : function(obj) {
            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
            return !Object.keys(obj).length;
        },
        /**
         * 根据Id 获取dom
         * @param domid
         */
        get_dom : function (domid) {
            return document.getElementById(domid);
        },
        /**
         * 判断元素是否有某个class
         * @param ele
         * @param cls
         * @returns {boolean}
         */
        hasClass : function (ele, cls) {
            return (new RegExp('(\\s|^)'+ cls +'(\\s|$)')).test(ele.className);
        },
        /**
         * 添加class
         * @param ele
         * @param cls
         */
        addClass : function (ele, cls) {
            if(!this.hasClass(ele, cls)){
                if(ele.className == ''||ele.className == null||ele.className == undefined){
                    ele.className = cls;
                }else{
                    ele.className += ' '+ cls;
                }
            }
        },
        /**
         * 删除class
         * @param ele
         * @param cls
         */
        removeClass : function (ele, cls) {
            if(this.hasClass(ele, clas)){
                var reg = new RegExp('(\\s|^)'+ cls +'(\\s|$)');
                ele.className = ele.className.replace(reg,' ');
            }
        },
        /**
         * 删除cookie
         * @param name
         */
        removeCookie : function(name) {
            // 设置已过期，系统会立刻删除cookie
            this.setCookie(name, '1', -1);
        },
        /**
         * 获取cookie
         * @param name
         * @returns {*}
         */
        getCookie : function(name) {
            var arr = document.cookie.replace(/\s/g, "").split(';');
            for (var i = 0,len = arr.length; i < len; i++) {
                var tempArr = arr[i].split('=');
                if (tempArr[0] == name) {
                    return decodeURIComponent(tempArr[1]);
                }
            }
            return '';
        },
        /**
         * 设置cookie
         * @param name
         * @param value
         * @param days
         */
        setCookie : function(name, value, days) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            document.cookie = name + '=' + value + ';expires=' + date;
        },
        /**
         * 获取浏览器类型和版本
         * @returns {*}
         */
        getExplore: function() {
            var sys = {},
                ua = navigator.userAgent.toLowerCase(),
                s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
                (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
                    (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
                        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
                            (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
                                (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                                    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
            // 根据关系进行判断
            if (sys.ie) return ('IE: ' + sys.ie)
            if (sys.edge) return ('EDGE: ' + sys.edge)
            if (sys.firefox) return ('Firefox: ' + sys.firefox)
            if (sys.chrome) return ('Chrome: ' + sys.chrome)
            if (sys.opera) return ('Opera: ' + sys.opera)
            if (sys.safari) return ('Safari: ' + sys.safari)
            return 'Unkonwn'
        },
        /**
         * 获取操作系统
         * @returns {*}
         */
        getOS : function() {
            var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
            var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
            var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

            if (/mac/i.test(appVersion)) return 'MacOSX'
            if (/win/i.test(appVersion)) return 'windows'
            if (/linux/i.test(appVersion)) return 'linux'
            if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
            if (/android/i.test(userAgent)) return 'android'
            if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
        },
        /**
         * 获取滚动条距离顶部的距离
         * @returns {Element|number}
         */
        getScrollTop:function(){
            return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        },
        /**
         * 设置滚动条距离顶部的位置
         * @param value
         * @returns {*}
         */
        setScrollTop : function(value) {
            window.scrollTo(0, value);
            return value;
        },
        /**
         * 在${duration}时间内，滚动条平滑滚动到${to}指定位置
         * @param to
         * @param duration
         */
        scrollTo : function(to, duration) {
            var getScrollTop = this.getScrollTop();
            var setScrollTop = this.setScrollTop();
            var requestAnimationFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
            if (duration < 0) {
                setScrollTop(to);
                return
            }
            var diff = to - getScrollTop();
            if (diff === 0) return
            var step = diff / duration * 10;
            requestAnimationFrame(function () {
                if (Math.abs(step) > Math.abs(diff)) {
                    setScrollTop(getScrollTop() + diff);
                    return;
                }
                setScrollTop(getScrollTop() + step);
                if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
                    return;
                }
                scrollTo(to, duration - 16);
            });
        },
        /**
         * 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
         * @param ele
         * @returns {{left: number, top: number}}
         */
        offset : function(ele) {
            var pos = {
                left: 0,
                top: 0
            };
            while (ele) {
                pos.left += ele.offsetLeft;
                pos.top += ele.offsetTop;
                ele = ele.offsetParent;
            }
            return pos;
        },
        watermark : function (can,name,number) {
            var canvasDom = document.createElement('canvas'),
                canvas = canvasDom.getContext('2d'),
                now = new Date(),
                datetime = now.Format("yyyy年MM月dd日 hh:mm:ss");
            canvas.rotate(-Math.PI/12);
            canvas.font = 'normal 14px 微软雅黑';
            canvas.textAlign = 'center';
            canvas.fillStyle = '#333333';
            canvas.fillText((name?name:'someone')+'  '+(number?number:'123123'), 105,66);
            // canvas.fillText(sysname?sysname:'情报监测系统', 105,84);
            // canvas.fillText(timer?timer:datetime, 105,90);
            var base64 = canvasDom.toDataURL('image/png'),
                mark = document.createElement('div');
            this.addClass(mark,'watermark');
            mark.style.backgroundImage = 'url('+base64+')';
            document.body.appendChild(mark);
        },
        /**
         * 判断浏览器是否全屏
         * @returns {boolean}
         */
        isFullScreen : function() {
            if (document.fullscreen) {
                return true
            } else {
                if (document.mozFullScreen) {
                    return true
                } else {
                    if (document.webkitIsFullScreen) {
                        return true
                    } else {
                        if (document.msFullscreenElement) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            }
        },
        /**
         * 触发浏览器全屏
         * @returns {boolean}
         */
        launchFullScreen : function(element) {
            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else {
                if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else {
                    if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen()
                    } else {
                        if (element.msRequestFullscreen) {
                            element.msRequestFullscreen()
                        }
                    }
                }
            }
        },
        /**
         * 退出浏览器全屏
         * @returns {boolean}
         */
        exitFullScreen : function() {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else {
                if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else {
                    if (document.msExitFullscreen) {
                        document.msExitFullscreen()
                    } else {
                        if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen()
                        }
                    }
                }
            }
        },
        computeScreen : function () {
            if(document.getElementsByClassName("page-wrapper").length<=0){
                return;
            }
            var fullScreenHeight = document.documentElement.clientHeight,//浏览器可见区域的高度
                headerHeight = document.getElementsByClassName("navbar-linear-gradient")[0].offsetHeight,
                footerHeight = document.getElementsByClassName("footer")[0].offsetHeight,
                footerTop = 20,
                wrapper = document.getElementsByClassName("page-wrapper")[0];
            if(wrapper.offsetHeight>parseFloat(fullScreenHeight-headerHeight-footerHeight-footerTop)){
                wrapper.style.minHeight = parseFloat(fullScreenHeight-headerHeight-footerHeight-footerTop)+"px";
            }else{
                wrapper.style.minHeight = parseFloat(fullScreenHeight-headerHeight-footerHeight-footerTop)+"px";
            }
        },
        extends : function() {
            // copy reference to target object
            var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

            // Handle a deep copy situation  /*如果第一个参数为boolean值，则取第二个参数为目标对象*/
            if ( target.constructor == Boolean ) {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            /*如果目标参数不是object或者function，那么就有可能是深度copy,*/
            if ( typeof target != "object" && typeof target != "function" )
                target = {};

            // extend jQuery itself if only one argument is passed /*如果参数长度为1，则将参数表示的对象的属性和方法复  制给jQuery本身*/
            if ( length == i ) {
                target = this;
                --i;
            }

            for ( ; i < length; i++ )
                // Only deal with non-null/undefined values当参数都为非空时，
                if ( (options = arguments[ i ]) != null )
                // Extend the base object
                    for ( var name in options ) {
                        var src = target[ name ], copy = options[ name ];

                        // Prevent never-ending loop /*防止死循环*/
                        if ( target === copy )
                            continue;

                        // Recurse if we're merging object values/*深度继承的实现*/
                        if ( deep && copy && typeof copy == "object" && !copy.nodeType )
                            target[ name ] = jQuery.extend( deep,
                                // Never move original objects, clone them
                                src || ( copy.length != null ? [ ] : { } )
                                , copy );

                        // Don't bring in undefined values  /*正常情况下的继承实现*/
                        else if ( copy !== undefined )
                            target[ name ] = copy;

                    }

            // Return the modified object
            return target;
        },
        /**
         * 计算Footer的位置
         */
        computeFooter: function(){
            if(document.getElementsByClassName("page-wrapper").length<=0){
                return;
            }
            var _this = this;
                wrapper = document.getElementsByClassName("right-content")[0],
                content = document.getElementsByClassName("page-content")[0],
                footer = document.getElementsByClassName("footer")[0];
            content.offsetHeight+footer.offsetHeight>=wrapper.offsetHeight ? footer.className = "footer static" : footer.className = "footer";
        },
        /**
         * 左侧菜单的点击事件
         */
        leftNavClick: function () {
            $(".left-nav>.nav>li>a").on("click",function () {
                var $this = $(this),
                    $thisParent = $this.parent(),
                    $thisParentsNav = $this.parents(".left-nav");
                $this.next()&&$this.next().toggle(0,function (e) {
                    var isShow = $this.next().css("display");
                    console.log(isShow);
                    if(isShow == 'block'){
                        $thisParent.addClass("current");
                    }else{
                        $thisParent.removeClass("current");
                    }
                });
                if(!$this.next().hasClass("sub-nav")){
                    $thisParentsNav.find("li").removeClass("active");
                    $thisParent.addClass("active");
                }
            });
            $(".left-nav .sub-nav>li>a").on("click",function () {
                var $this = $(this);
                $this.parents(".left-nav").find("li").removeClass("active");
                $this.parent().addClass("active");
            });
        },
        /**
         * 搜索项部分  根据评估滚动浮起
         */
        topFixedSearch: function () {
            var $top_fixed_search = $(".top-fixed-search");
            $top_fixed_search.on("click",".search-tab .btn",function () {
                var _this = $(this),
                    _index = $(this).index();
                if(_this.hasClass('no-event')){
                    return;
                }
                _this.addClass('btn-blue').siblings().removeClass("btn-blue").parents('.top-fixed-search').find('.tab-form').eq(_index).addClass('active in').siblings().removeClass('in active');
            });
            $(".right-content").scroll(function () {
                $(this).scrollTop()>50 ? $(".left-nav").length>0 ? $top_fixed_search.addClass('fixed-search').next().css({paddingTop:'181px'}) : $top_fixed_search.addClass('fixed-search').next().css({paddingTop:'121px'}) : $(".left-nav").length>0 ? $top_fixed_search.removeClass('fixed-search').next().css({paddingTop:'0'}) : $top_fixed_search.removeClass('fixed-search').next().css({paddingTop:'0'});
                $(this).scrollTop()>$top_fixed_search.height() ? $top_fixed_search.next().find('.nav-tabs').css({position: 'absolute'}).animate({left: '200px',right: '0',top: $top_fixed_search.height()+2,zIndex: 999}, 200, 'linear'): $top_fixed_search.next().find('.nav-tabs').css({position: 'static'}, 200, 'linear');
            });
        },
        judgeNoData: function(id, dataMap){
        	var hasData = false;
        	if(dataMap.length == 0){
        		return hasData;
        	}
        	for(var k in dataMap){
        		var isContinue = true;
        		var data = dataMap[k];
        		
        		for(var i = 0; i < data.length; i++){
        			if(typeof data[i] == 'number'){
        				if(data[i] != 0){
        					hasData = true;
        					isContinue = false;
        					break;
        				}
        			}else{
        				if(data[i].value != 0){
        					hasData = true;
        					isContinue = false;
        					break
        				}
        			}
        		}				
        		
        		if(!isContinue){
        			break
        		}
        	}
        	if(!hasData){
        		$('#' + id).find(".noData-box").remove();
        		$('#' + id).append('<div class="noData-box"><img class="noData-img" src="../../images/no_data.png"></div>');
        	}
        	return hasData;
        },
        init : function () {
            var _this = this;
            setTimeout(function () {
                _this.computeFooter();
            },100)
            _this.leftNavClick();
            _this.topFixedSearch();
            $(window).resize(function(){
                _this.computeFooter();
            });
            // this.computeScreen();
        }
    };
    this.zui = _pulgin_api;
    $(function () {
        zui.init();
    });
})();