window.verSelector = (function () {
    var selector = function (param) {
        this.select = document.querySelectorAll("*[data-selector]");
        //加载样式列表
        this.style();
        changes(this.select);
    };
    //加载默认元素
    selector.prototype = {
        getPath: function () {
            var jsPath = document.currentScript ? document.currentScript.src : function () {
                var js = document.scripts
                    , last = js.length - 1
                    , src;
                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),
        style: function () {
            var path = this.getPath + "need/";
            var icon_link = document.createElement("link"),
                css_link = document.createElement("link");
            icon_link.href = path + "vericon.css?version=1.0";
            css_link.href = path + "select.css?version=1.0";
            css_link.rel = icon_link.rel = "stylesheet";
            css_link.type = icon_link.type = "text/css";
            var link = document.getElementsByTagName("head")[0];
            link.appendChild(css_link);
            link.appendChild(icon_link);
        }
    };
    //生成选择组件
    var changes = function (items) {
        items.forEach(function (it) {
            //生成select表单
            var name = it.name,
                checks = it.getAttribute("data-selector-checks");
            it.setAttribute("data-name", name);
            it.name = "";
            var html = document.createElement("div");
            html.className = "verSelector";
            var btn = '',
                de_height = "";
            if (checks) {
                html.setAttribute("data-selector-checks", true);
                btn = " <div class=\"verSelector-btns verSelector-two\"><button type='button' class=\"verSelector-success-button verSelector-btn verSelector-two\">保存</button>\n" +
                    " <button type='button' class=\"verSelector-error-button verSelector-btn verSelector-two\">取消</button> \n</div>\n";
                de_height = "verSelector-max-options";

            }

            html.setAttribute("data-name", name);

            var defa_text = it.querySelector("option").innerText,
                defa_value = it.value;

            html.setAttribute("data-value", defa_text);
            var _html = "<div class=\"verSelector-focus\">\n" +
                " </div>\n" +
                " <div class=\"verSelector-box verSelector-one\">\n" +
                " <span class=\"verSelector-text verSelector-one\">" + defa_text + "</span>\n" +
                " <i class=\"verJsFont icon-caret-down verSelector-caret verSelector-one\"></i>\n" +
                " </div>\n" +
                " <div class=\"verSelector-items verSelector-two\">\n" +
                " <div class=\"verSelector-search verSelector-two\">\n" +
                " <input type=\"search\" autocomplete=\"off\" class=\"verSelector-search-input verSelector-two\">\n" +
                " <i class=\"verSelector-search-button verJsFont icon-search verSelector-two\"></i>\n" +
                " </div>\n" +
                " <div class=\"verSelector-option verSelector-two " + de_height + "\"></div>\n" +
                btn +
                " </div>\n" + "<div class='verSelector-input-list'></div>";

            html.innerHTML = _html;
            insertAfter(html, it);
            option();
            html.querySelector(".verSelector-search-input").onkeyup = keyup_search;
            html.querySelector(".verSelector-search-button").onclick = keyup_search;
            if (checks) {
                html.querySelector(".verSelector-success-button").onclick = save_checks;
                html.querySelector(".verSelector-error-button").onclick = reset_checks;
            }
        });
    };
    //点击取消按钮
    var reset_checks = function () {
        var actives = this.parentElement.parentElement.querySelectorAll(".actives");
        var parent = this.parentElement.parentElement.parentElement;
        actives.forEach(function (active) {
            active.classList.remove("actives");
            var icon = active.querySelector(".verSelector-icon-check");
            if (icon) {
                icon.classList.add("icon-check-box");
                icon.classList.remove("icon-check-box-cicre");
            }
        });
        parent.querySelector(".verSelector-focus").classList.remove("verSelector-focus-show");
        parent.querySelector(".verSelector-items").classList.remove("verSelector-focus-show");
    };
    //点击保存按钮
    var save_checks = function () {
        var parent = this.parentElement.parentElement.parentElement,
            actives = this.parentElement.parentElement.querySelectorAll(".actives");
        if (actives.length < 1) {
            // alert("系统检测到您没有选择任何参数");
            this.parentElement.parentElement.classList.remove("verSelector-focus-show");
            parent.querySelector(".verSelector-focus").classList.remove("verSelector-focus-show");
            parent.querySelector(".verSelector-text").innerText = parent.getAttribute("data-value");
            return false;
        }
        var html = parent.querySelector(".verSelector-input-list"),
            _h = html.querySelectorAll("input[type='hidden']"),
            text = [];
        _h.forEach(function (its) {
            text.push(its.getAttribute("data-name"));
        });
        text = text.join(",");
        parent.querySelector(".verSelector-text").innerText = text;
        parent.querySelector(".verSelector-focus").classList.remove("verSelector-focus-show");
        parent.querySelector(".verSelector-items").classList.remove("verSelector-focus-show");
    };
    //搜索关键字查询
    var keyup_search = function () {
        if (this.classList.contains("verSelector-search-input")) {
            var value = this.value;
        } else {
            var value = this.parentElement.querySelector(".verSelector-search-input").value;
        }

        var ops = this.parentElement.parentElement.parentElement,
            select = ops.getAttribute("data-name"),
            child = document.querySelector("[data-name='" + select + "']").querySelectorAll("option"),
            options = this.parentElement.nextElementSibling,
            text = [],
            default_input_value = [],
            check = ops.getAttribute("data-selector-checks");
        if (value == "") {
            show_options(this.parentElement.parentElement);
            return false;
        }

        var defa_input = ops.querySelector(".verSelector-input-list");
        if (defa_input) {
            defa_input = defa_input.querySelectorAll("input");
            if (defa_input) {
                defa_input.forEach(function (ims) {
                    default_input_value.push(ims.value);
                });
            }
        }
        child.forEach(function (ite) {
            if (ite.innerText.indexOf(value) >= 0) {
                text.push(ite);
            }
        });
        if (text.length < 1) {
            options.innerHTML = "<span style='display: block;margin: 0;padding: 0;color: grey;text-align: center;line-height: 60px'>没搜索到关键字信息</span>";
        } else {
            var _h = "";
            for (var i in text) {
                var value = text[i].getAttribute("value");
                var cl = "";
                if (default_input_value) {
                    for (var k in default_input_value) {
                        if (value == default_input_value[k]) {
                            cl = "actives";
                            break;
                        }
                    }
                }
                var icon = "";
                if (check == "true") {
                    var ic = "icon-check-box";
                    if (cl) {
                        ic = "icon-check-box-cicre";
                    }
                    if (value != "") {
                        icon = '<i class="verJsFont verSelector-icon-check ' + ic + '"></i>'
                    }
                }
                _h += '<p data-value="' + value + '" class="verSelector-option-value verSelector-two ' + cl + '">' + icon + ' ' + text[i].innerText + '</p>'
            }

            options.innerHTML = _h;
        }
        _option(check);
    };
    //显示选择列表
    var show_options = function (tar) {
        var parents = tar.parentNode,
            select = parents.getAttribute("data-name"),
            option = document.querySelector("[data-name=" + select + "]"),
            items = parents.querySelector(".verSelector-items"),
            options = option.querySelectorAll("option"),
            check = parents.getAttribute("data-selector-checks"),
            mobile = isMobile(),
            default_input_value = [],
            ops = items.querySelector(".verSelector-option");
        if (mobile) {
            parents.querySelector(".verSelector-focus").classList.toggle("verSelector-focus-show")
        }
        items.classList.toggle("verSelector-focus-show");
        if (!items.classList.contains("verSelector-focus-show")) return false;
        parents.querySelector(".verSelector-search-input").value = "";
        var defa_input = parents.querySelector(".verSelector-input-list");
        if (defa_input) {
            defa_input = defa_input.querySelectorAll("input");
            if (defa_input) {
                defa_input.forEach(function (ims) {
                    default_input_value.push(ims.value);
                });
            }
        }

        var _h = "";
        options.forEach(function (i) {
            var cl = "";
            var icon = "";
            var value = i.getAttribute("value");
            if (default_input_value) {
                for (var j in default_input_value) {
                    if (value == default_input_value[j]) {
                        cl = "actives";
                        break;
                    }
                }
            }
            if (check) {
                var ic = "icon-check-box";
                if (cl) {
                    ic = "icon-check-box-cicre";
                }
                if (value != "") {
                    icon = '<i class="verJsFont verSelector-icon-check ' + ic + '"></i>'
                }
            }
            if (value != '') {
                _h += '<p data-value="' + value + '" class="verSelector-option-value verSelector-two ' + cl + '">' + icon + ' ' + i.innerText + '</p>'
            }
        });
        ops.innerHTML = _h;
        _option(check);
    };
    //相关操作信息
    var option = function () {
        document.onclick = function (e) {
            var target = e.target;
            //判断是否是下拉选框点击时间
            if (target.classList.contains("verSelector-one")) {
                if (target.classList.contains("verSelector-text") || target.classList.contains("verSelector-caret")) {
                    target = target.parentElement;
                }
                var parent = target.parentElement;
                _deletes(parent);
                show_options(target);
            } else if (target.classList.contains("verSelector-two")) {
                return true;
            } else {
                _deletes();
            }
        }
    };
    var _deletes = function (target) {
        var item = document.querySelectorAll(".verSelector-items");
        var focus = document.querySelectorAll(".verSelector-focus");
        item.forEach(function (itm) {
            if ((itm.parentElement != target && target) || itm.classList.contains("verSelector-focus-show")) {
                itm.classList.remove("verSelector-focus-show");
                //判断是否有选中的值？
                var inputs = itm.parentElement.querySelector(".verSelector-input-list").querySelectorAll("input[type='hidden']");
                var defat = itm.parentElement.querySelector(".verSelector-text").innerText;
                defat = defat.split(",");
                if (inputs.length) {
                    var txt = [];
                    inputs.forEach(function (input) {
                        var name = input.getAttribute("data-name");
                        if (defat.indexOf(name) >= 0) {
                            txt.push(name);
                        } else {
                            input.parentElement.removeChild(input);
                        }
                    });
                    if (txt.length) {
                        txt = txt.join(",");
                        itm.parentElement.querySelector(".verSelector-text").innerText = txt;
                    } else {
                        itm.parentElement.querySelector(".verSelector-text").innerText = itm.parentElement.getAttribute("data-value");
                    }
                } else {
                    itm.parentElement.querySelector(".verSelector-text").innerText = itm.parentElement.getAttribute("data-value");
                }
            }
        });
        if (isMobile()) {
            focus.forEach(function (itm) {
                itm.classList.remove("verSelector-focus-show");
            })
        }
    };
    //选中某一项条件
    var _option = function (checks) {
        var options = document.querySelectorAll(".verSelector-option-value");
        options.forEach(function (items) {
            items.onclick = function () {
                var text = this.innerText,
                    value = this.getAttribute("data-value");
                if (!checks) {
                    this.classList.add("actives");
                    var parent = this.parentElement.parentElement.parentElement,
                        name = parent.getAttribute("data-name");
                    options.forEach(function (ic) {
                        if (ic.innerText != text) {
                            ic.classList.remove("actives");
                        }
                    });
                    //查找select，生成选中数据
                    var html = parent.querySelector(".verSelector-input-list");
                    var input = '<input name="' + name + '" value="' + value + '" type="hidden" data-name="' + trim(this.innerText) + '"/>';
                    html.innerHTML = input;
                    parent.querySelector(".verSelector-text").innerText = trim(text);
                    parent.querySelector(".verSelector-focus").classList.remove("verSelector-focus-show");
                    parent.querySelector(".verSelector-items").classList.remove("verSelector-focus-show");
                } else {
                    this.querySelector(".verSelector-icon-check").classList.toggle("icon-check-box");
                    this.querySelector(".verSelector-icon-check").classList.toggle("icon-check-box-cicre");
                    this.classList.toggle("actives");
                    var parent = this.parentElement.parentElement.parentElement,
                        name = parent.getAttribute("data-name");
                    var html = parent.querySelector(".verSelector-input-list");
                    if (this.querySelector(".verSelector-icon-check").classList.contains("icon-check-box-cicre")) {
                        var _h = document.createElement("input");
                        _h.type = "hidden";
                        _h.name = name + "[]";
                        _h.setAttribute("data-name", trim(this.innerText));
                        _h.value = value;
                        html.appendChild(_h);
                    } else {
                        var el = html.querySelector("[data-name='" + trim(this.innerText) + "']");
                        html.removeChild(el);
                    }
                }
            }
        });
    };
    //在某一元素之后追加元素
    var insertAfter = function (item, afters) {
        var parent = afters.parentNode;
        if (parent.lastChild == afters) {
            parent.appendChild(item);
        } else {
            parent.insertBefore(item, afters.nextSibling)
        }
    };
    //是否是移动端
    var isMobile = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            var width = document.body.offsetWidth;
            //响应式操作
            if (width <= 980) {
                flag = true;
            }
        }

        return flag;
    };
    var trim = function (s) {
        return s.replace(/(^\s*)|(\s*$)/g, "");
    }

    return selector;
})();
