/**
 * Created by zhangxin on 2018/6/5.
 */

;(function (win,doc) {
    var treeCharts = function (dom) {
        var defaults = {
            series: {
                color: ["#FFCEA3", "#FAE692", "#C0F5A2", "#78EBA8", "#8CEBDB", "#9EE0FF", "#C4C2FF", "#ECB4F4", "#FFA3D1", "#FEB1B1", "#FFAEAB", "#F0C673", "#74D681", "#85D6B8", "#8BB6E0", "#7E9BE0", "#AA8BE0", "#EB88D7", "#F08BA9", "#E87984"],
                itemNumber: 6,
                data:{},
                itemStyle: {
                    normal: {
                        width: 149,
                        height: 48,
                        borderWidth: 1,
                        borderColor: '#dadada',
                        backgroundColor: '#fff'
                    },
                    emphasis: {
                        borderColor: '#3385ff',
                        backgroundColor: '#3385ff'
                    }
                },
                labelStyle: {
                    normal: {
                        position: 'inside',
                        verticalAlign: 'middle',
                        color: '#000',
                        fontFamily: '"PingFang SC", Arial, "Microsoft YaHei", sans-serif',
                        fontSize: 12,
                        fontWeight: 400
                    },
                    emphasis: {
                        color: '#fff'
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#dadada'
                    },
                    emphasis: {
                        width: 2,
                        color: '#3385ff'
                    }
                }
            }
        };
        var _this = this;
        _this.$element = dom;
        _this.options = defaults;
        _this.$color = _this.options.series.color;
        _this.$zr = zrender.init(_this.$element,_this.options);
        _this.$groups = new zrender.Group();
        _this.$element.style.position = 'relative';
        _this._tooltip();
        _this.w = _this.$zr.getWidth();
        _this.h = _this.$zr.getHeight();
        return _this;
    };
    function extendsObject() {
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
    };
    treeCharts.prototype = {
        constructor: treeCharts,
        _tooltip: function () {
            var _this = this;
            if(_this.$element.querySelector('.charts-tooltip')){
                return;
            }
            var tooltip = doc.createElement('div');
            tooltip.className = 'charts-tooltip';
            _this.$element.appendChild(tooltip);
        },
        _createRect: function (nodes,parentNodeShape,pnode) {
            var _this = this,
                itemStyle = _this.options.itemStyle,
                rect = new zrender.Rect({
                pnode:pnode,
                type: 'rect',
                cursor: 'pointer',
                shape: {
                    cy: 0,
                    cx: 0,
                    x: nodes.x,
                    y: nodes.y,
                    width: itemStyle.normal.width,
                    height: itemStyle.normal.height,
                },
                style: {
                    text: nodes.name,
                    lineWidth: itemStyle.normal.borderWidth,
                    fill: nodes.fill,
                    stroke: nodes.stroke,
                    textPadding: 3,
                    truncate: {
                        outerWidth: itemStyle.normal.width,
                        outerHeight: itemStyle.normal.height,
                        ellipsis: '...',
                        placeholder: '...'
                    },
                    textPosition: 'inside',
                    textAlign: 'center',
                    textVerticalAlign: 'middle'
                },
                z:_this.hierarchy,
                disabled: nodes.disabled,
                children: nodes.children,
                val: nodes.val
            });
            if(nodes.name !== '会话开始'){
                _this._createLine(rect.shape,parentNodeShape,nodes);
            }
            return rect;
        },
        _createLine: function (opt,pnShape,nodes) {
            var _this = this,
                parentNodeShape = pnShape || null;
            if(parentNodeShape == null || parentNodeShape == "" || parentNodeShape == undefined) return;
            var w = parentNodeShape.x,
                h = parentNodeShape.y,
                x1 = w + parentNodeShape.width/2,
                y1 = h + parentNodeShape.height,
                x2 = opt.x + opt.width/2,
                y2 = opt.y,
                line = new zrender.BezierCurve({
                cursor: 'default',
                silent: false,
                shape: {
                    x1: x1,
                    y1: y1,
                    cpx1: (x1+x2)/2,
                    cpy1: y1,
                    cpx2: (x1+x2)/2,
                    cpy2: y2,
                    x2: x2 ,
                    y2: y2
                },
                style: {
                    fill: "rgba(0,0,0,0)",
                    stroke: '#dadada',
                    lineWidth: 1,
                    text: nodes.val ? (nodes.val/_this.parentCount*100).toFixed(2) + '%' : ' ',
                    textPosition: 'inside',
                    textFill: '#333',
                    textHeight: 20,
                    textLineHeight: 20,
                    textAlign: 'center',
                    textVerticalAlign: 'bottom',
                    textDistance: 8,
                    textBackgroundColor:'transparent',
                    textBorderColor: 'transparent',
                    fontFamily: '"PingFang SC", Arial, "Microsoft YaHei", sans-serif',
                    fontSize: 12,
                    fontWeight: 400
                },
                z:0
            });
            _this.groups.add(line)
        },
        _removeOtherGroups:function(Rect){
            var tempList=[],
                _this=this;
            var eachGroup=function(node){
                if(!node.group){
                    return;
                }
                node.group.eachChild(function(e){
                    if(e.group){
                        tempList.push(e.group);
                        e.group.eachChild(function(e1){
                            eachGroup(e1);
                            if(e1.group){
                                tempList.push(e1.group);
                            }
                        });
                    }
                });
            };
            eachGroup(Rect.pnode);
            tempList.forEach(function(e,item){
                e.dirty();
                e.removeAll();
                _this.$zr.flush();
            });
        },
        _eachNodes: function(option,parentNodeShape,pnode){
            var _this = this,
                group = new zrender.Group(),
                itemStyle = _this.options.itemStyle,
                data = option || _this.options.data;
                _this.groups = group;
                itemStyle.normal.width = (_this.w-_this.w/(data.length+1))/(data.length+1)>itemStyle.normal.width ? itemStyle.normal.width : _this.w/(data.length+1);
                for(var i in data) {
                    var isTrue = data[i].name === '会话开始',
                        nodes = {
                            name: data[i].name,
                            x: isTrue ? _this.w / 2 - itemStyle.normal.width / 2 : (_this.w - itemStyle.normal.width * data.length) / (data.length + 1) * (parseInt(i) + 1) + itemStyle.normal.width * parseInt(i),
                            y: parentNodeShape ? 50 + parentNodeShape.y + parentNodeShape.height : 20,
                            fill: isTrue ? _this.$color[parseInt(i)] : itemStyle.normal.backgroundColor,
                            disabled: isTrue,
                            val: data[i].count,
                            stroke: isTrue ? _this.$color[parseInt(i)] : itemStyle.normal.borderColor,
                            children: data[i].children,
                        },
                        rect = _this._createRect(nodes, parentNodeShape, pnode);
                    group.add(rect);
                }
                if(pnode){
                    pnode.group=group;
                }
                group.eachChild(function (e) {
                    var rect = e;
                    rect.on("click",function(){
                        var Rect = this;
                        if(Rect.active) return;
                        if(!Rect.children || Rect.children.length <= 0) return;
                        if(!Rect.disabled){
                           _this._removeOtherGroups(Rect);
                            group.eachChild(function (e,index) {
                                if(e.type == 'rect'){
                                    if(e.active){
                                        e.attr({
                                            active: false,
                                            style: {
                                                fill: _this.options.itemStyle.normal.backgroundColor,
                                                textFill: _this.options.labelStyle.normal.color,
                                                stroke: _this.options.itemStyle.normal.borderColor
                                            }
                                        });
                                    }

                                }
                            },this);
                            Rect.attr({
                                active: true,
                                style: {
                                    fill: _this.options.itemStyle.emphasis.backgroundColor,
                                    textFill: _this.options.labelStyle.emphasis.color,
                                    stroke: _this.options.itemStyle.emphasis.backgroundColor
                                }
                            });
                        }
                        Rect.active = true;
                        _this.parentCount = Rect.val;
                        _this._eachNodes(this.children,this.shape,Rect);
                        if(_this.$groups.getBoundingRect().height>_this.h){
                            var treeHeight = _this.$groups.getBoundingRect().height
                            var adjustSize = _this.h / treeHeight  * 0.9; //多缩小0.05不至于完全充盈dom
                            _this.adjustSize = adjustSize;
                            _this.$groups.dirty();
                            _this.$groups.scale=[ 1, adjustSize, 0, 0 ];
                            _this.$zr.flush();
                        }
                        if(Rect.disabled) return;
                        _this.hierarchy++;
                    });
                    rect.on("mouseover",function (e) {
                        var tooltipDiv = _this.$element.querySelector('.charts-tooltip'),
                            This = this;
                        if(This.type !='rect') return;
                        tooltipDiv.style.display = 'block';
                        tooltipDiv.style.left = (This.shape.x + This.shape.width/2 - tooltipDiv.clientWidth/2) + 'px';
                        var _oldTop = (This.shape.y - tooltipDiv.clientHeight - 5);
                        tooltipDiv.style.top = _oldTop -(_oldTop-_oldTop*(_this.adjustSize || 1) + (_this.adjustSize ? 10 : 0))  + 'px';
                        tooltipDiv.innerText = This.style.text;
                        if(!This.disabled){
                            if(This.active)return;
                            This.attr({
                                style: {
                                    fill: _this.options.itemStyle.emphasis.backgroundColor,
                                    textFill: _this.options.labelStyle.emphasis.color,
                                    stroke: _this.options.itemStyle.emphasis.backgroundColor
                                }
                            });
                            _this.$zr.flush();
                        }
                    });
                    rect.on("mouseout",function (e) {
                        var This = this;
                        if(This.type !='rect') return;
                        if(!This.disabled){
                            if(This.active)return;
                            This.attr({
                                style: {
                                    fill: _this.options.itemStyle.normal.backgroundColor,
                                    textFill: _this.options.labelStyle.normal.color,
                                    stroke: _this.options.itemStyle.normal.borderColor
                                }
                            });
                            _this.$zr.flush();
                        }
                        var tooltipDiv = _this.$element.querySelector('.charts-tooltip');
                        tooltipDiv.style.display = 'none';
                    });
                });
            _this.$groups.add(group)
            zrender.vector.scale(group,1,.5)
        },
        setOption: function(option){
            var _this = this;
            _this.options = extendsObject({},_this.options.series,option);
            _this.$color = _this.options.color;
            _this.hierarchy = 0;
            _this._eachNodes();
            _this.$zr.add(_this.$groups);
        },
        _destroy: function(){
            zrender.dispose(this.$zr);
        }
    };
    win.treeCharts = treeCharts;
}(window,document));