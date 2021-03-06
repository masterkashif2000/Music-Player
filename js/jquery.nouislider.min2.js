(function(a) {
    a.fn.noUiSlider2 = function(b, c) {
        function d(a) {
            return a < 0
        }
        function e(a) {
            return Math.abs(a)
        }
        function f(a, b) {
            return Math.round(a / b) * b
        }
        function g(a) {
            return jQuery.extend(true, {}, a)
        }
        var h, i, j, c = c || [],
            k, l = "ontouchstart" in document.documentElement;
        h = {
            handles: 2,
            connect: true,
            scale: [0, 100],
            start: [25, 75],
            to: 0,
            handle: 0,
            change: "",
            end: "",
            step: false,
            save: false,
            click: true
        };
        j = {
            scale: function(a, b, c) {
                var f = b[0],
                    g = b[1];
                if (d(f)) {
                    a = a + e(f);
                    g = g + e(f)
                } else {
                    a = a - f;
                    g = g - f
                }
                return a * c / g
            },
            deScale: function(a, b, c) {
                var f = b[0],
                    g = b[1];
                g = d(f) ? g + e(f) : g - f;
                return a * g / c + f
            },
            connect: function(a) {
                if (a.connect) {
                    if (a.handles.length > 1) {
                        a.connect.css({
                            left: a.low.left(),
                            right: a.slider.innerWidth() - a.up.left()
                        })
                    } else {
                        a.low ? a.connect.css({
                            left: a.low.left(),
                            right: 0
                        }) : a.connect.css({
                            left: 0,
                            right: a.slider.innerWidth() - a.up.left()
                        })
                    }
                }
            },
            left: function() {
                return parseFloat(a(this).css("left"))
            },
            call: function(a, b, c) {
                if (typeof a == "function") {
                    a.call(b, c)
                }
            },
            bounce: function(a, b, c, d) {
                var e = false;
                if (d.is(a.up)) {
                    if (a.low && b < a.low.left()) {
                        b = a.low.left();
                        e = true
                    }
                } else {
                    if (a.up && b > a.up.left()) {
                        b = a.up.left();
                        e = true
                    }
                }
                if (b > a.slider.innerWidth()) {
                    b = a.slider.innerWidth();
                    e = true
                } else if (b < 0) {
                    b = 0;
                    e = true
                }
                return [b, e]
            }
        };
        i = {
            init: function() {
                return this.each(function() {
                    var b, d, e;
                    d = a(this).css("position", "absolute");
                    e = new Object;
                    e.options = a.extend(h, c);
                    b = e.options;
                    typeof b.start == "object" ? 1 : b.start = [b.start];
                    e.slider = d;
                    e.low = a('<div class="noUi-handle2 noUi-lowerHandle"><div></div></div>');
                    e.up = a('<div class="noUi-handle2 noUi-upperHandle"><div></div></div>');
                    e.connect = a('<div class="noUi-midBar2"></div>');
                    b.connect ? e.connect.appendTo(e.slider) : e.connect = false;
                    if (b.knobs) {
                        b.handles = b.knobs
                    }
                    if (b.handles === 1) {
                        if (b.connect === true || b.connect === "lower") {
                            e.low = false;
                            e.up = e.up.appendTo(e.slider);
                            e.handles = [e.up]
                        } else if (b.connect === "upper" || !b.connect) {
                            e.low = e.low.prependTo(e.slider);
                            e.up = false;
                            e.handles = [e.low]
                        }
                    } else {
                        e.low = e.low.prependTo(e.slider);
                        e.up = e.up.appendTo(e.slider);
                        e.handles = [e.low, e.up]
                    }
                    if (e.low) {
                        e.low.left = j.left
                    }
                    if (e.up) {
                        e.up.left = j.left
                    }
                    e.slider.children().css("position", "absolute");
                    a.each(e.handles, function(c) {
                        a(this).css({
                            left: j.scale(b.start[c], e.options.scale, e.slider.innerWidth()),
                            zIndex: c + 1
                        }).children().bind(l ? "touchstart.noUi" : "mousedown.noUi", k.start)
                    });
                    if (b.click) {
                        e.slider.click(k.click).find("*:not(.noUi-midBar2)").find("*:not(#display_progress_loading)").click(k.flse)
                    }
                    j.connect(e);
                    e.options = b;
                    e.slider.data("api", e)
                })
            },
            move: function() {
                var b, d, e, f, h;
                b = g(a(this).data("api"));
                b.options = a.extend(b.options, c);
                if (b.options.knob) {
                    b.options.handle = b.options.knob
                }
                f = b.options.handle;
                f = b.handles[f == "lower" || f == 0 || typeof f == "undefined" ? 0 : 1];
                d = j.bounce(b, j.scale(b.options.to, b.options.scale, b.slider.innerWidth()), f.left(), f);
                f.css("left", d[0]);
                if (f.is(b.up) && f.left() == 0 || f.is(b.low) && f.left() == b.slider.innerWidth()) {
                    f.css("zIndex", parseInt(f.css("zIndex")) + 2)
                }
                if (c.save === true) {
                    b.options.scale = c.scale;
                    a(this).data("api", b)
                }
                j.connect(b);
                j.call(b.options.change, b.slider, "move");
                j.call(b.options.end, b.slider, "move")
            },
            value: function() {
                var b, d, e;
                e = g(a(this).data("api"));
                e.options = a.extend(e.options, c);
                b = e.low ? Math.round(j.deScale(e.low.left(), e.options.scale, e.slider.innerWidth())) : false;
                d = e.up ? Math.round(j.deScale(e.up.left(), e.options.scale, e.slider.innerWidth())) : false;
                if (c.save) {
                    e.options.scale = c.scale;
                    a(this).data("api", e)
                }
                return [b, d]
            },
            api: function() {
                return a(this).data("api")
            },
            disable: function() {
                return this.each(function() {
                    a(this).addClass("disabled")
                })
            },
            enable: function() {
                return this.each(function() {
                    a(this).removeClass("disabled")
                })
            }
        }, k = {
            start: function(b) {
                if (!a(this).parent().parent().hasClass("disabled")) {
                    b.preventDefault();
                    a("body").bind("selectstart.noUi", k.flse);
                    a(this).addClass("noUi-activeHandle");
                    a(document).bind(l ? "touchmove.noUi" : "mousemove.noUi", k.move);
                    l ? a(this).bind("touchend.noUi", k.end) : a(document).bind("mouseup.noUi", k.end)
                }
            },
            move: function(b) {
                var c, f, g, h, i = false,
                    k, l;
                g = a(".noUi-activeHandle");
                h = g.parent().parent().data("api");
                k = g.parent().is(h.low) ? h.low : h.up;
                c = b.pageX - Math.round(h.slider.offset().left);
                if (isNaN(c)) {
                    c = b.originalEvent.touches[0].pageX - Math.round(h.slider.offset().left)
                }
                f = k.left();
                l = j.bounce(h, c, f, k);
                c = l[0];
                i = l[1];
                if (h.options.step && !i) {
                    var m = h.options.scale[0],
                        n = h.options.scale[1];
                    if (d(n)) {
                        n = e(m - n);
                        m = 0
                    }
                    n = n + -1 * m;
                    var o = j.scale(h.options.step, [0, n], h.slider.innerWidth());
                    if (Math.abs(f - c) >= o) {
                        c = c < f ? f - o : f + o;
                        i = true
                    }
                } else {
                    i = true
                }
                if (c === f) {
                    i = false
                }
                if (i) {
                    k.css("left", c);
                    if (k.is(h.up) && k.left() == 0 || k.is(h.low) && k.left() == h.slider.innerWidth()) {
                        k.css("zIndex", parseInt(k.css("zIndex")) + 2)
                    }
                    j.connect(h);
                    j.call(h.options.change, h.slider, "slide")
                }
            },
            end: function() {
                var b, c;
                b = a(".noUi-activeHandle");
                c = b.parent().parent().data("api");
                a(document).add("body").add(b.removeClass("noUi-activeHandle").parent()).unbind(".noUi");
                j.call(c.options.end, c.slider, "slide")
            },
            click: function(b) {
                if (!a(this).hasClass("disabled")) {
                    var c = a(this).data("api");
                    var d = c.options;
                    var e = b.pageX - c.slider.offset().left;
                    e = d.step ? f(e, j.scale(d.step, d.scale, c.slider.innerWidth())) : e;
                    if (c.low && c.up) {
                        e < (c.low.left() + c.up.left()) / 2 ? c.low.css("left", e) : c.up.css("left", e)
                    } else {
                        c.handles[0].css("left", e)
                    }
                    j.connect(c);
                    j.call(d.change, c.slider, "click");
                    j.call(d.end, c.slider, "click")
                }
            },
            flse: function() {
                return false
            }
        };
        if (i[b]) {
            return i[b].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof b === "object" || !b) {
            return i.init.apply(this, arguments)
        } else {
            a.error("No such method: " + b)
        }
    }
})(jQuery)