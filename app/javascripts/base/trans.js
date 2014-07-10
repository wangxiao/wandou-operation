/* jshint ignore:start */
(function() {
var T, baidu = T = baidu || {
    version: "1.3.9"
};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.dom = baidu.dom || {};
baidu.browser = baidu.browser || {};
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["\x241"]
}
baidu.dom.opacity = function (b, a) {
    b = baidu.dom.g(b);
    if (!baidu.browser.ie) {
        b.style.opacity = a;
        b.style.KHTMLOpacity = a
    } else {
        b.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(a * 100) + ")"
    }
};
baidu.dom.scale = function (c, g, b) {
    if (!(c = baidu.dom.g(c)) || typeof g != "number") {
        return null
    }
    b = b || {};
    var e = c.style,
        a = b.transformOrigin || "0px 0px";
    if (baidu.browser.ie) {
        e.zoom = g
    } else {
        var d = "ransform",
            f = d + "Origin";
        e["WebkitT" + f] = e["MozT" + f] = e["OT" + f] = e["t" + f] = a;
        e["WebkitT" + d] = e["MozT" + d] = e["OT" + d] = e["t" + d] = "scale(" + g + ")"
    }
};
baidu.event = baidu.event || {};
baidu.event._listeners = baidu.event._listeners || [];
baidu.lang = baidu.lang || {};
baidu.lang.isString = function (a) {
    return "[object String]" == Object.prototype.toString.call(a)
};
baidu.isString = baidu.lang.isString;
baidu.dom._g = function (a) {
    if (baidu.lang.isString(a)) {
        return document.getElementById(a)
    }
    return a
};
baidu._g = baidu.dom._g;
baidu.event.on = function (b, e, g) {
    e = e.replace(/^on/i, "");
    b = baidu.dom._g(b);
    var f = function (i) {
            g.call(b, i)
        },
        a = baidu.event._listeners,
        d = baidu.event._eventFilter,
        h, c = e;
    e = e.toLowerCase();
    if (d && d[e]) {
        h = d[e](b, e, f);
        c = h.type;
        f = h.listener
    }
    if (b.addEventListener) {
        b.addEventListener(c, f, false)
    } else {
        if (b.attachEvent) {
            b.attachEvent("on" + c, f)
        }
    }
    a[a.length] = [b, e, g, f, c];
    return b
};
baidu.on = baidu.event.on;
baidu.dom.g = function (a) {
    if ("string" == typeof a || a instanceof String) {
        return document.getElementById(a)
    } else {
        if (a && a.nodeName && (a.nodeType == 1 || a.nodeType == 9)) {
            return a
        }
    }
    return null
};
baidu.g = baidu.G = baidu.dom.g;
baidu.dom.insertHTML = function (d, a, c) {
    d = baidu.dom.g(d);
    var b, e;
    if (d.insertAdjacentHTML) {
        d.insertAdjacentHTML(a, c)
    } else {
        b = d.ownerDocument.createRange();
        a = a.toUpperCase();
        if (a == "AFTERBEGIN" || a == "BEFOREEND") {
            b.selectNodeContents(d);
            b.collapse(a == "AFTERBEGIN")
        } else {
            e = a == "BEFOREBEGIN";
            b[e ? "setStartBefore" : "setEndAfter"](d);
            b.collapse(e)
        }
        b.insertNode(b.createContextualFragment(c))
    }
    return d
};
baidu.insertHTML = baidu.dom.insertHTML;
baidu.dom.getDocument = function (a) {
    a = baidu.dom.g(a);
    return a.nodeType == 9 ? a : a.ownerDocument || a.document
};
baidu.dom.getComputedStyle = function (b, a) {
    b = baidu.dom._g(b);
    var d = baidu.dom.getDocument(b),
        c;
    if (d.defaultView && d.defaultView.getComputedStyle) {
        c = d.defaultView.getComputedStyle(b, null);
        if (c) {
            return c[a] || c.getPropertyValue(a)
        }
    }
    return ""
};
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
baidu.dom._styleFilter.filter = function (b, e, f) {
    for (var a = 0, d = baidu.dom._styleFilter, c; c = d[a]; a++) {
        if (c = c[f]) {
            e = c(b, e)
        }
    }
    return e
};
baidu.string = baidu.string || {};
baidu.string.toCamelCase = function (a) {
    if (a.indexOf("-") < 0 && a.indexOf("_") < 0) {
        return a
    }
    return a.replace(/[-_][^-_]/g, function (b) {
        return b.charAt(1).toUpperCase()
    })
};
baidu.dom.getStyle = function (c, b) {
    var e = baidu.dom;
    c = e.g(c);
    b = baidu.string.toCamelCase(b);
    var d = c.style[b] || (c.currentStyle ? c.currentStyle[b] : "") || e.getComputedStyle(c, b);
    if (!d) {
        var a = e._styleFixer[b];
        if (a) {
            d = a.get ? a.get(c) : baidu.dom.getStyle(c, a)
        }
    }
    if (a = e._styleFilter) {
        d = a.filter(b, d, "get")
    }
    return d
};
baidu.getStyle = baidu.dom.getStyle;
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    baidu.browser.opera = +RegExp["\x241"]
}
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.dom.getPosition = function (a) {
    a = baidu.dom.g(a);
    var j = baidu.dom.getDocument(a),
        d = baidu.browser,
        g = baidu.dom.getStyle,
        c = d.isGecko > 0 && j.getBoxObjectFor && g(a, "position") == "absolute" && (a.style.top === "" || a.style.left === ""),
        h = {
            left: 0,
            top: 0
        },
        f = (d.ie && !d.isStrict) ? j.body : j.documentElement,
        k, b;
    if (a == f) {
        return h
    }
    if (a.getBoundingClientRect) {
        b = a.getBoundingClientRect();
        h.left = Math.floor(b.left) + Math.max(j.documentElement.scrollLeft, j.body.scrollLeft);
        h.top = Math.floor(b.top) + Math.max(j.documentElement.scrollTop, j.body.scrollTop);
        h.left -= j.documentElement.clientLeft;
        h.top -= j.documentElement.clientTop;
        var i = j.body,
            l = parseInt(g(i, "borderLeftWidth")),
            e = parseInt(g(i, "borderTopWidth"));
        if (d.ie && !d.isStrict) {
            h.left -= isNaN(l) ? 2 : l;
            h.top -= isNaN(e) ? 2 : e
        }
    } else {
        k = a;
        do {
            h.left += k.offsetLeft;
            h.top += k.offsetTop;
            if (d.isWebkit > 0 && g(k, "position") == "fixed") {
                h.left += j.body.scrollLeft;
                h.top += j.body.scrollTop;
                break
            }
            k = k.offsetParent
        } while (k && k != a);
        if (d.opera > 0 || (d.isWebkit > 0 && g(a, "position") == "absolute")) {
            h.top -= j.body.offsetTop
        }
        k = a.offsetParent;
        while (k && k != j.body) {
            h.left -= k.scrollLeft;
            if (!d.opera || k.tagName != "TR") {
                h.top -= k.scrollTop
            }
            k = k.offsetParent
        }
    }
    return h
};
baidu.page = baidu.page || {};
baidu.page.getViewHeight = function () {
    var b = document,
        a = b.compatMode == "BackCompat" ? b.body : b.documentElement;
    return a.clientHeight
};
baidu.fx = baidu.fx || {};
baidu.dom.show = function (a) {
    a = baidu.dom.g(a);
    a.style.display = "";
    return a
};
baidu.show = baidu.dom.show;
baidu.object = baidu.object || {};
baidu.extend = baidu.object.extend = function (c, a) {
    for (var b in a) {
        if (a.hasOwnProperty(b)) {
            c[b] = a[b]
        }
    }
    return c
};
(function () {
    var a = window[baidu.guid];
    baidu.lang.guid = function () {
        return "TANGRAM__" + (a._counter++).toString(36)
    };
    a._counter = a._counter || 1
})();
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.isFunction = function (a) {
    return "[object Function]" == Object.prototype.toString.call(a)
};
baidu.lang.Class = function (a) {
    this.guid = a || baidu.lang.guid();
    window[baidu.guid]._instances[this.guid] = this
};
window[baidu.guid]._instances = window[baidu.guid]._instances || {};
baidu.lang.Class.prototype.dispose = function () {
    delete window[baidu.guid]._instances[this.guid];
    for (var a in this) {
        if (!baidu.lang.isFunction(this[a])) {
            delete this[a]
        }
    }
    this.disposed = true
};
baidu.lang.Class.prototype.toString = function () {
    return "[object " + (this._className || "Object") + "]"
};
baidu.lang.Event = function (a, b) {
    this.type = a;
    this.returnValue = true;
    this.target = b || null;
    this.currentTarget = null
};
baidu.lang.Class.prototype.addEventListener = function (d, c, b) {
    if (!baidu.lang.isFunction(c)) {
        return
    }!this.__listeners && (this.__listeners = {});
    var a = this.__listeners,
        e;
    if (typeof b == "string" && b) {
        if (/[^\w\-]/.test(b)) {
            throw ("nonstandard key:" + b)
        } else {
            c.hashCode = b;
            e = b
        }
    }
    d.indexOf("on") != 0 && (d = "on" + d);
    typeof a[d] != "object" && (a[d] = {});
    e = e || baidu.lang.guid();
    c.hashCode = e;
    a[d][e] = c
};
baidu.lang.Class.prototype.removeEventListener = function (d, c) {
    if (typeof c != "undefined") {
        if ((baidu.lang.isFunction(c) && !(c = c.hashCode)) || (!baidu.lang.isString(c))) {
            return
        }
    }!this.__listeners && (this.__listeners = {});
    d.indexOf("on") != 0 && (d = "on" + d);
    var b = this.__listeners;
    if (!b[d]) {
        return
    }
    if (typeof c != "undefined") {
        b[d][c] && delete b[d][c]
    } else {
        for (var a in b[d]) {
            delete b[d][a]
        }
    }
};
baidu.lang.Class.prototype.dispatchEvent = function (d, a) {
    if (baidu.lang.isString(d)) {
        d = new baidu.lang.Event(d)
    }!this.__listeners && (this.__listeners = {});
    a = a || {};
    for (var c in a) {
        d[c] = a[c]
    }
    var c, b = this.__listeners,
        e = d.type;
    d.target = d.target || this;
    d.currentTarget = this;
    e.indexOf("on") != 0 && (e = "on" + e);
    baidu.lang.isFunction(this[e]) && this[e].apply(this, arguments);
    if (typeof b[e] == "object") {
        for (c in b[e]) {
            b[e][c].apply(this, arguments)
        }
    }
    return d.returnValue
};
baidu.global = baidu.global || {};
(function () {
    var a = window[baidu.guid];
    baidu.global.get = function (b) {
        return a[b]
    }
})();
baidu.lang.createClass = function (f, b) {
    b = b || {};
    var e = b.superClass || baidu.lang.Class;
    var d = function () {
            if (e != baidu.lang.Class) {
                e.apply(this, arguments)
            } else {
                e.call(this)
            }
            f.apply(this, arguments)
        };
    d.options = b.options || {};
    var h = function () {},
        g = f.prototype;
    h.prototype = e.prototype;
    var a = d.prototype = new h();
    for (var c in g) {
        a[c] = g[c]
    }
    typeof b.className == "string" && (a._className = b.className);
    a.constructor = g.constructor;
    d.extend = function (k) {
        for (var j in k) {
            d.prototype[j] = k[j]
        }
        return d
    };
    return d
};
baidu.fx.Timeline = baidu.lang.createClass(function (a) {
    baidu.object.extend(this, baidu.fx.Timeline.options);
    baidu.object.extend(this, a)
}, {
    className: "baidu.fx.Timeline",
    options: {
        interval: 16,
        duration: 500,
        dynamic: true
    }
}).extend({
    launch: function () {
        var a = this;
        a.dispatchEvent("onbeforestart");
        typeof a.initialize == "function" && a.initialize();
        a["\x06btime"] = new Date().getTime();
        a["\x06etime"] = a["\x06btime"] + (a.dynamic ? a.duration : 0);
        a["\x06pulsed"]();
        return a
    },
    "\x06pulsed": function () {
        var b = this;
        var a = new Date().getTime();
        b.percent = (a - b["\x06btime"]) / b.duration;
        b.dispatchEvent("onbeforeupdate");
        if (a >= b["\x06etime"]) {
            typeof b.render == "function" && b.render(b.transition(b.percent = 1));
            typeof b.finish == "function" && b.finish();
            b.dispatchEvent("onafterfinish");
            b.dispose();
            return
        }
        typeof b.render == "function" && b.render(b.transition(b.percent));
        b.dispatchEvent("onafterupdate");
        b["\x06timer"] = setTimeout(function () {
            b["\x06pulsed"]()
        }, b.interval)
    },
    transition: function (a) {
        return a
    },
    cancel: function () {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");
        this.dispose()
    },
    end: function () {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]()
    }
});
baidu.fx.create = function (d, b, c) {
    var e = new baidu.fx.Timeline(b);
    e.element = d;
    e._className = c || e._className;
    e["\x06original"] = {};
    var a = "baidu_current_effect";
    e.addEventListener("onbeforestart", function () {
        var g = this,
            f;
        g.attribName = "att_" + g._className.replace(/\W/g, "_");
        f = g.element.getAttribute(a);
        g.element.setAttribute(a, (f || "") + "|" + g.guid + "|", 0);
        if (!g.overlapping) {
            (f = g.element.getAttribute(g.attribName)) && window[baidu.guid]._instances[f].cancel();
            g.element.setAttribute(g.attribName, g.guid, 0)
        }
    });
    e["\x06clean"] = function (h) {
        var g = this,
            f;
        if (h = g.element) {
            h.removeAttribute(g.attribName);
            f = h.getAttribute(a);
            f = f.replace("|" + g.guid + "|", "");
            if (!f) {
                h.removeAttribute(a)
            } else {
                h.setAttribute(a, f, 0)
            }
        }
    };
    e.addEventListener("oncancel", function () {
        this["\x06clean"]();
        this["\x06restore"]()
    });
    e.addEventListener("onafterfinish", function () {
        this["\x06clean"]();
        this.restoreAfterFinish && this["\x06restore"]()
    });
    e.protect = function (f) {
        this["\x06original"][f] = this.element.style[f]
    };
    e["\x06restore"] = function () {
        var j = this["\x06original"],
            h = this.element.style,
            f;
        for (var g in j) {
            f = j[g];
            if (typeof f == "undefined") {
                continue
            }
            h[g] = f;
            if (!f && h.removeAttribute) {
                h.removeAttribute(g)
            } else {
                if (!f && h.removeProperty) {
                    h.removeProperty(g)
                }
            }
        }
    };
    return e
};
baidu.fx.scale = function (c, a) {
    if (!(c = baidu.dom.g(c))) {
        return null
    }
    a = baidu.object.extend({
        from: 0.1,
        to: 1
    }, a || {});
    var e = /^(-?\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(-?\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i;
    !e.test(a.transformOrigin) && (a.transformOrigin = "0px 0px");
    var b = {},
        d = baidu.fx.create(c, baidu.object.extend({
            fade: true,
            initialize: function () {
                baidu.dom.show(c);
                var k = this,
                    f = b,
                    p = c.style,
                    j = function (o) {
                        k.protect(o)
                    };
                if (baidu.browser.ie) {
                    j("top");
                    j("left");
                    j("position");
                    j("zoom");
                    j("filter");
                    this.offsetX = parseInt(baidu.dom.getStyle(c, "left")) || 0;
                    this.offsetY = parseInt(baidu.dom.getStyle(c, "top")) || 0;
                    if (baidu.dom.getStyle(c, "position") == "static") {
                        p.position = "relative"
                    }
                    e.test(this.transformOrigin);
                    var i = RegExp["\x241"].toLowerCase(),
                        h = RegExp["\x244"].toLowerCase(),
                        l = this.element.offsetWidth,
                        g = this.element.offsetHeight,
                        n, m;
                    if (/\d+%/.test(i)) {
                        n = parseInt(i, 10) / 100 * l
                    } else {
                        if (/\d+px/.test(i)) {
                            n = parseInt(i)
                        } else {
                            if (i == "left") {
                                n = 0
                            } else {
                                if (i == "center") {
                                    n = l / 2
                                } else {
                                    if (i == "right") {
                                        n = l
                                    }
                                }
                            }
                        }
                    }
                    if (!h) {
                        m = g / 2
                    } else {
                        if (/\d+%/.test(h)) {
                            m = parseInt(h, 10) / 100 * g
                        } else {
                            if (/\d+px/.test(h)) {
                                m = parseInt(h)
                            } else {
                                if (h == "top") {
                                    m = 0
                                } else {
                                    if (h == "center") {
                                        m = g / 2
                                    } else {
                                        if (h == "bottom") {
                                            m = g
                                        }
                                    }
                                }
                            }
                        }
                    }
                    p.zoom = this.from;
                    f.cx = n;
                    f.cy = m
                } else {
                    j("WebkitTransform");
                    j("WebkitTransformOrigin");
                    j("MozTransform");
                    j("MozTransformOrigin");
                    j("OTransform");
                    j("OTransformOrigin");
                    j("transform");
                    j("transformOrigin");
                    j("opacity");
                    j("KHTMLOpacity");
                    p.WebkitTransform = p.MozTransform = p.OTransform = p.transform = "scale(" + this.from + ")";
                    p.WebkitTransformOrigin = p.MozTransformOrigin = p.OTransformOrigin = p.transformOrigin = this.transformOrigin
                }
            },
            render: function (i) {
                var g = c.style,
                    f = this.to == 1,
                    f = typeof this.opacityTrend == "boolean" ? this.opacityTrend : f,
                    h = f ? this.percent : 1 - this.percent,
                    j = this.to * i + this.from * (1 - i);
                if (baidu.browser.ie) {
                    g.zoom = j;
                    if (this.fade) {
                        g.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:" + Math.floor(h * 100) + ")"
                    }
                    g.top = this.offsetY + b.cy * (1 - j);
                    g.left = this.offsetX + b.cx * (1 - j)
                } else {
                    g.WebkitTransform = g.MozTransform = g.OTransform = g.transform = "scale(" + j + ")";
                    if (this.fade) {
                        g.KHTMLOpacity = g.opacity = h
                    }
                }
            }
        }, a), "baidu.fx.scale");
    return d.launch()
};
baidu.fx.move = function (b, a) {
    if (!(b = baidu.dom.g(b)) || baidu.dom.getStyle(b, "position") == "static") {
        return null
    }
    a = baidu.object.extend({
        x: 0,
        y: 0
    }, a || {});
    if (a.x == 0 && a.y == 0) {
        return null
    }
    var c = baidu.fx.create(b, baidu.object.extend({
        initialize: function () {
            this.protect("top");
            this.protect("left");
            this.originX = parseInt(baidu.dom.getStyle(b, "left")) || 0;
            this.originY = parseInt(baidu.dom.getStyle(b, "top")) || 0
        },
        transition: function (d) {
            return 1 - Math.pow(1 - d, 2)
        },
        render: function (d) {
            b.style.top = (this.y * d + this.originY) + "px";
            b.style.left = (this.x * d + this.originX) + "px"
        }
    }, a), "baidu.fx.move");
    return c.launch()
};
baidu.fx.moveTo = function (d, b, c) {
    if (!(d = baidu.dom.g(d)) || baidu.dom.getStyle(d, "position") == "static" || typeof b != "object") {
        return null
    }
    var f = [b[0] || b.x || 0, b[1] || b.y || 0];
    var a = parseInt(baidu.dom.getStyle(d, "left")) || 0;
    var g = parseInt(baidu.dom.getStyle(d, "top")) || 0;
    var e = baidu.fx.move(d, baidu.object.extend({
        x: f[0] - a,
        y: f[1] - g
    }, c || {}));
    return e
};
baidu.zhidao = baidu.zhidao || {};
baidu.zhidao.Pixel = function (a) {
    this.source = a;
    this.element = a.cloneNode(true);
    this.width = a.offsetWidth;
    this.height = a.offsetHeight;
    var b = baidu.dom.getPosition(a);
    this.top = b.top;
    this.left = b.left;
    this.element.style.position = "absolute";
    this.rect_t;
    this.rect_r;
    this.rect_b;
    this.rect_l
};
baidu.object.extend(baidu.zhidao.Pixel.prototype, {
    setPosTop: function (a) {
        if (this.tempTop == a) {
            return
        }
        this.element.style.top = ((this.tempTop = a) - this.rect_t) + "px"
    },
    setPosLeft: function (a) {
        if (this.tempLeft == a) {
            return
        }
        this.element.style.left = ((this.tempLeft = a) - this.rect_l) + "px"
    },
    hide: function () {
        this.element.style.display = "none"
    },
    show: function () {
        this.element.style.display = ""
    }
});
baidu.zhidao.Sketchpad = function (a) {
    this.source = a;
    this.field = null;
    this.arena = null;
    this.pixels = [];
    this.otiose = [];
    this.pxwidth = 32;
    this.pxheight = 33;
    this.pxh = 20;
    this.pxv = 24;
    this.max = 11;
    this.ix = 16;
    this.iy = 2;
    this.dis = 4;
    this.width = this.source.offsetWidth;
    this.zhong = Math.ceil((this.width - this.pxwidth * this.ix) / 2 - this.pxwidth * this.dis / 2);
    this.height = 1010;
    this.bgcolor = "#F7F7F7"
};
baidu.object.extend(baidu.zhidao.Sketchpad.prototype, {
    render: function () {
        var h = this;
        var a = this.field = this.source.ownerDocument.createElement("DIV");
        a.style.position = "absolute";
        a.style.width = this.width + "px";
        a.style.height = this.height + "px";
        a.style.fontSize = '25px';
        this.source.parentNode.insertBefore(a, this.source);
        this.position = baidu.dom.getPosition(this.field);
        this.arenaLeft = this.width - (this.pxwidth * this.pxh);
        this.field.innerHTML = "<div style='z-index:200;font-size:25px;position:absolute; top:0px; left:" + this.arenaLeft + "px; width:" + this.pxwidth * this.pxh + "px; height:" + this.pxheight * this.pxv + "px;'></div>";
        this.arena = this.field.firstChild;
        baidu.event.on(window, "onresize", function () {
            h.width = baidu.dom.g("center").offsetWidth;
            h.field && (h.field.style.width = h.width + "px")
        });
        var m = this.source.getElementsByTagName("TABLE");
        var f = this.ts = [];
        this.max = m.length - 1;
        for (var e = 0; e < this.max; e++) {
            f[e] = m[e]
        }
        var d = baidu.page.getViewHeight();
        for (var e = 0; e < this.max; e++) {
            var k = baidu.dom.getPosition(f[e]);
            if (this.pixels.length > 190) {
                var c = f[e].cloneNode(true);
                this.field.appendChild(c);
                c.style.position = "absolute";
                c.style.top = (k.top - this.position.top) + "px";
                c.style.left = (k.left - this.position.left) + "px";
                this.otiose.push(c)
            } else {
                for (var j = 0; j < this.iy; j++) {
                    var g = f[e].offsetHeight < this.pxheight * 2;
                    if (j == 1 && g) {
                        continue
                    }
                    for (var l = 0; l < this.ix; l++) {
                        var b = new baidu.zhidao.Pixel(f[e]);
                        b.lineno = e;
                        b.bgc = b.element.bgColor;
                        b.element.bgColor = "";
                        b.rect_t = this.pxheight * j + ((2 + j) * (j + 1));
                        b.rect_r = this.pxwidth * (l + 1) + 12;
                        b.rect_b = this.pxheight * (j + 1) + ((2 + j) * (j + 1));
                        b.rect_l = this.pxwidth * l + 12;
                        if (g) {
                            b.element.style.marginLeft = b.element.style.left = "0px";
                            b.rect_b = 48;
                            b.rect_l = this.pxwidth * l
                        }
                        b.element.mm = "rect(" + b.rect_t + "px " + b.rect_r + "px " + b.rect_b + "px " + b.rect_l + "px)";
                        b.element.onclick = function () {};
                        b.element.style.clip = "rect(" + b.rect_t + "px " + b.rect_r + "px " + b.rect_b + "px " + b.rect_l + "px)";
                        this.pixels.push(b);
                        this.field.appendChild(b.element);
                        b.element.style.top = (b.top - this.position.top) + "px";
                        b.element.style.left = (b.left - this.position.left) + "px"
                    }
                }
            }
            f[e].style.visibility = "hidden"
        }
        this.bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden"
    },
    scale: function (a) {
        a = a || Math.floor((baidu.page.getViewHeight() - this.position.top) / 100) / 10;
        baidu.dom.scale(this.arena, a)
    },
    dismiss: function () {
        if (baidu.browser.ie) {
            var b = document.createElement("DIV");
            b.appendChild(this.field);
            b.innerHTML = ""
        } else {
            (this.field.parentNode) && this.field.parentNode.removeChild(this.field)
        }
        for (var a = this.ts.length - 1; a > -1; a--) {
            this.ts[a].style.visibility = ""
        }
        document.body.style.overflow = this.bodyOverflow;
        baidu.lang.Class.prototype.dispose.call(this)
    },
    draw: function (d, g) {
        for (var f = 0, b = 0; f < d.length; f++) {
            for (var a = (g || 32); a > 0; a--) {
                var e = Math.pow(2, a - 1);
                if (d[f] & e) {
                    var c = this.pixels[b];
                    if (!c.busy) {
                        this.arena.appendChild(c.element);
                        c.busy = true;
                        c.show()
                    }
                    c.setPosTop(this.pxheight * f);
                    c.setPosLeft(this.pxwidth * ((g || this.pxh) - a));
                    b++
                }
            }
        }
        for (; b < this.pixels.length; b++) {
            var c = this.pixels[b];
            if (c.busy) {
                c.hide();
                c.busy = false;
                this.field.appendChild(c.element)
            }
        }
    }
});

window.startTrans = function () {
    var o = [
        [0, 0, 336, 496, 336, 496, 496, 224, 0, 3574, 3574, 3574, 3574, 3574, 3574, 3574, 0, 432, 432, 432, 432, 432, 952, 952],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 432, 432, 432, 1008, 1008],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 816, 816, 1840, 1904, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 1016, 1788, 1790, 246, 240, 0, 432, 432, 816, 1584, 3632, 3696, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 1016, 1788, 1278, 243, 240, 0, 432, 944, 560, 1584, 3632, 3696, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 2040, 3326, 2295, 241, 240, 0, 1968, 1968, 1584, 3632, 3632, 112, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 1016, 1788, 1278, 243, 240, 0, 432, 944, 560, 1584, 3632, 3696, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 1016, 1788, 1790, 246, 240, 0, 432, 432, 816, 1584, 3632, 3696, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 816, 816, 1840, 1904, 112],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 432, 432, 432, 1008, 1008],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 480, 480, 480, 992, 896],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 1016, 1790, 1782, 240, 0, 432, 480, 480, 480, 384, 896, 896],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 1016, 1788, 638, 242, 240, 0, 240, 240, 480, 480, 96, 224, 224],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 2040, 3326, 2295, 241, 240, 0, 496, 496, 944, 944, 48, 240, 240],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 1016, 1788, 638, 242, 240, 0, 240, 240, 480, 480, 96, 224, 224],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 1016, 1790, 1782, 240, 0, 432, 480, 480, 480, 384, 896, 896],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 480, 480, 480, 992, 896],
        [0, 0, 160, 240, 240, 112, 496, 496, 0, 240, 496, 504, 504, 1016, 1020, 252, 0, 432, 432, 432, 432, 432, 1008, 1008],
        [0, 0, 5376, 7936, 5376, 7936, 7936, 3584, 0, 57184, 57184, 57184, 57184, 57184, 57184, 57184, 0, 6912, 6912, 6912, 6912, 6912, 15232, 15232],
        [0, 0, 5376, 7936, 5376, 7936, 7936, 3584, 0, 57184, 57184, 57184, 57184, 106288, 106288, 106288, 0, 6912, 6912, 6912, 6912, 6912, 15232, 15232],
        [0, 0, 5376, 7936, 5376, 7936, 7936, 3584, 0, 57184, 57184, 106288, 204568, 466716, 270084, 7936, 0, 6912, 6912, 6912, 6912, 6912, 15232, 15232],
        [0, 0, 5376, 7936, 5376, 7936, 7936, 3584, 0, 57184, 57184, 237368, 991006, 794374, 7936, 7936, 0, 6912, 6912, 6912, 6912, 6912, 15232, 15232],
        [0, 0, 5376, 7936, 5376, 7936, 7936, 3584, 0, 2088831, 2088831, 7936, 7936, 7936, 7936, 7936, 0, 6912, 6912, 6912, 6912, 6912, 15232, 15232]
    ];
    var centerDom = document.getElementById("center");
    centerDom.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    var g = new baidu.zhidao.Sketchpad(centerDom);
    g.render();
    var b = [],
        c = 0;
    for (var m = 0; m < o[0].length; m++) {
        for (var p = g.pxh; p > 0; p--) {
            var f = Math.pow(2, p - 1);
            if (o[0][m] & f) {
                b.push([g.pxwidth * (g.pxh - p), g.pxheight * m])
            }
        }
    }
    function d() {
        var i = new baidu.fx.Timeline();
        i.interval = 50;
        i.duration = 160;
        i.render = function (r) {
            var t = Math.ceil(r / 0.25);
            var b = document.body.style;
            b.paddingTop = b.paddingLeft = [27, 24, 22, 21, 0][t] + "px"
            var q = document.getElementById('center').style;
            q.paddingTop = q.paddingLeft = [27, 24, 22, 21, 0][t] + "px"
        };
        i.launch()
    }
    function l(v, u) {
        baidu.browser.ie && (u -= 100);
        for (var s = 0; s < v; s++) {
            var r = true;
            while (r) {
                var q = g.pixels[Math.ceil(Math.random() * 182)];
                if (q && q.busy) {
                    r = false;
                    q.busy = false
                }
            }
            q.exploded = true;
            g.field.appendChild(q.element);
            q.element.style.top = (q.tempTop - q.rect_t) * g.scaleTo + "px";
            var t = (q.tempLeft - q.rect_l) * g.scaleTo;
            q.element.style.left = (t + g.arenaLeft) + "px";
            q.element.style.backgroundColor = "";
            q.element.bgColor = q.bgc;
            baidu.fx.moveTo(q.element, [q.left - g.position.left + h(q), q.top - g.position.top], {
                duration: u,
                interval: 30
            })
        }
    }
    function h(s) {
        var r = g.pxwidth * Math.ceil(g.ix / 2);
        var q = (s.lineno % 2);
        var t = 1 * g.pxwidth;
        q == 0 ? r -= t : r += t;
        return s.rect_l <= r ? 0 : g.dis * t
    }
    function a(v, u) {
        for (var s = 0; s < v; s++) {
            var r, q = true;
            while (q) {
                r = g.pixels[Math.ceil(Math.random() * (g.pixels.length - 1))];
                if (!(r && r.busy)) {
                    q = false;
                    r.busy = true
                }
            }
            r.element.style.backgroundColor = g.bgcolor;
            r.show();
            g.arena.appendChild(r.element);
            var t = b[c++];
            t[0] -= r.rect_l;
            t[1] -= r.rect_t;
            r.element.style.left = (r.left - g.position.left - g.arenaLeft) + "px";
            baidu.fx.moveTo(r.element, t, {
                duration: u,
                interval: 50
            })
        }
    }
    function k(i) {
        g.arenaMarginLeft = i;
        g.arena.style.marginLeft = -i + "px"
    }
    var e = [
        [10, function () {
            a(3, 200)
        }],
        [100, function () {
            a(5, 200)
        }],
        [200, function () {
            a(8, 200)
        }],
        [300, function () {
            a(16, 200)
        }],
        [400, function () {
            a(32, 200)
        }],
        [500, function () {
            for (var n = 0; n < g.otiose.length; n++) {
                g.otiose[n].style.display = "none"
            }
            for (var n = g.pixels.length - 1; n > -1; n--) {
                !g.pixels[n].busy && (g.pixels[n].element.style.backgroundColor = g.bgcolor) && g.pixels[n].hide()
            }
        }],
        [500, function () {
            for (var q = 0; q < g.pixels.length; q++) {
                var n = g.pixels[q];
                if (!n.busy) {
                    n.show();
                    n.busy = true;
                    g.arena.appendChild(n.element);
                    var r = b[c++];
                    n.setPosLeft(r[0]);
                    n.setPosTop(r[1]);
                    n.element.style.backgroundColor = g.bgcolor;
                    if (c >= b.length) {
                        break
                    }
                }
            }
        }],
        [700, function () {
            var i = baidu.page.getViewHeight() - g.position.top - 10;
            var r = g.scaleTo = parseFloat((i / (g.pxheight * g.pxv)).toFixed(2));
            var q = g.width - g.pxwidth * g.pxh * r;
            baidu.fx.scale(g.arena, {
                transformOrigin: "right top",
                duration: 200,
                interval: 40,
                from: 1,
                to: r,
                fade: false
            })
        }],
        [1600, function () {
            g.draw(o[1]);
            k(30)
        }],
        [1700, function () {
            g.draw(o[2]);
            k(40)
        }],
        [1800, function () {
            g.draw(o[3]);
            k(50)
        }],
        [1900, function () {
            g.draw(o[4]);
            k(60)
        }],
        [2000, function () {
            g.draw(o[5]);
            k(70)
        }],
        [2100, function () {
            g.draw(o[6]);
            k(80)
        }],
        [2200, function () {
            g.draw(o[7]);
            k(90)
        }],
        [2300, function () {
            g.draw(o[8]);
            k(100)
        }],
        [2400, function () {
            g.draw(o[9]);
            k(120);
            d()
        }],
        [2800, function () {
            g.draw(o[10]);
            k(130)
        }],
        [2900, function () {
            g.draw(o[11]);
            k(140)
        }],
        [3000, function () {
            g.draw(o[12]);
            k(150)
        }],
        [3100, function () {
            g.draw(o[13]);
            k(160)
        }],
        [3200, function () {
            g.draw(o[14]);
            k(170)
        }],
        [3300, function () {
            g.draw(o[15]);
            k(180)
        }],
        [3400, function () {
            g.draw(o[16]);
            k(190)
        }],
        [3500, function () {
            g.draw(o[17]);
            k(200);
            d()
        }],
        [3900, function () {
            g.draw(o[18]);
            k(180)
        }],
        [3900, function () {
            g.draw(o[19])
        }],
        [4000, function () {
            g.draw(o[20])
        }],
        [4100, function () {
            g.draw(o[21])
        }],
        [4200, function () {
            g.draw(o[22])
        }],
        [4600, function () {
            g.field.style.left = g.zhong + "px";
            g.arenaMarginLeft += g.zhong;
            g.arena.style.marginLeft = -g.arenaMarginLeft + "px";
            l(2, 200)
        }],
        [4700, function () {
            l(5, 200)
        }],
        [4800, function () {
            l(10, 200)
        }],
        [4900, function () {
            l(16, 200)
        }],
        [5000, function () {
            l(32, 200)
        }],
        [5200, function () {
            g.field.style.top = g.position.top + "px";
            for (var q = 0; q < g.pixels.length; q++) {
                var n = g.pixels[q];
                n.element.bgColor = n.bgc;
                if (n.busy) {
                    g.field.appendChild(n.element);
                    n.element.style.backgroundColor = "";
                    n.element.style.top = (n.tempTop - n.rect_t) * g.scaleTo + "px";
                    var r = (n.tempLeft - n.rect_l) * g.scaleTo;
                    n.element.style.left = (r + g.arenaLeft) + "px";
                    baidu.fx.moveTo(n.element, [n.left + h(n) - g.position.left, n.top - g.position.top], {
                        duration: 200
                    })
                }
                if (!n.exploded) {
                    n.show();
                    n.element.style.backgroundColor = "";
                    n.element.style.top = n.top - g.position.top + "px";
                    n.element.style.left = n.left - g.position.left + h(n) + "px"
                }
            }
            for (var q = 0; q < g.otiose.length; q++) {
                g.otiose[q].style.display = ""
            }
        }],
        [5800, function () {
            g.arena.style.left = "0px";
            g.arena.style.marginLeft = "0px";
            baidu.dom.scale(g.arena, 1);
            for (var q = g.pixels.length - 1; q > -1; q--) {
                var n = g.pixels[q];
                if (h(n) > 0) {
                    g.arena.appendChild(n.element)
                }
            }
            g.field.parentNode.insertBefore(g.arena, g.field);
            g.arena.style.left = g.zhong + "px";
            g.arena.style.top = g.position.top + "px";
            baidu.fx.moveTo(g.field, [g.pxwidth * (g.dis / 2) + g.zhong, g.position.top], {
                duration: 600,
                transition: function (i) {
                    return 1 - (Math.cos(i * 4.5 * Math.PI) * Math.exp(-i * 6))
                }
            });
            baidu.fx.moveTo(g.arena, [g.pxwidth * (-g.dis / 2) + g.zhong, g.position.top], {
                duration: 600,
                transition: function (i) {
                    return 1 - (Math.cos(i * 4.5 * Math.PI) * Math.exp(-i * 6))
                }
            })
        }],
        [6600, function () {
            for (var q = 0; q < g.ts.length; q++) {
                if (g.ts[q].offsetHeight < g.pxheight * 2) {
                    g.ts[q].style.visibility = ""
                }
            }
            for (var q = g.pixels.length - 1; q > -1; q--) {
                var n = g.pixels[q];
                if (h(n) > 0) {
                    g.field.appendChild(n.element);
                    n.element.style.left = n.left - g.position.left + "px"
                }
            }
            g.field.appendChild(g.arena)
        }],
        [6700, function () {
            baidu.fx.moveTo(g.field, [g.position.left, g.position.top], {
                duration: 600,
                onafterfinish: function () {
                    g.dismiss()
                },
                transition: function (i) {
                    return 1 - (Math.cos(i * 4.5 * Math.PI) * Math.exp(-i * 6))
                }
            })
            centerDom.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        }]
    ];
    for (var j = 0; j < e.length; j++) {
        setTimeout(e[j][1], e[j][0] + 1200)
    }
}

})();
/* jshint ignore:end */