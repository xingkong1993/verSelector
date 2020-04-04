window.verjs_select = (function () {
    //默认配置项
    var select = function () {
    };
    var requid_css = function () {
        var path = getPath + "need/",
            icon = document.createElement("link"),
            css_link = document.createElement("link");
        icon.href = path + "verfont.css?version=2.0";
        css_link.href = path + "select.2.0.css?version=2.0";
        css_link.rel = icon.rel = "stylesheet";
        css_link.type = icon.type = "text/css";
        var link = document.getElementsByTagName("head")[0];
        link.appendChild(css_link);
        link.appendChild(icon);
    };
    var getPath = function () {
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
    }();
    var props = function () {
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (callback, thisArg) {
                var T, k;
                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0; // Hack to convert O.length to a UInt32
                if ({}.toString.call(callback) != "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }
                if (thisArg) {
                    T = thisArg;
                }
                k = 0;
                while (k < len) {
                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }

        if (!("classList" in document.documentElement)) {
            Object.defineProperty(HTMLElement.prototype, 'classList', {
                get: function () {
                    var self = this;

                    function update(fn) {
                        return function (value) {
                            var classes = self.className.split(/\s+/g),
                                index = classes.indexOf(value);

                            fn(classes, index, value);
                            self.className = classes.join(" ");
                        }
                    }

                    return {
                        add: update(function (classes, index, value) {
                            if (!~index) classes.push(value);
                        }),

                        remove: update(function (classes, index) {
                            if (~index) classes.splice(index, 1);
                        }),

                        toggle: update(function (classes, index, value) {
                            if (~index)
                                classes.splice(index, 1);
                            else
                                classes.push(value);
                        }),

                        contains: function (value) {
                            return !!~self.className.split(/\s+/g).indexOf(value);
                        },

                        item: function (i) {
                            return self.className.split(/\s+/g)[i] || null;
                        }
                    };
                }
            });
        }
    }();
    //其他回调函数
    select.prototype = {
        //初始化系统参数
        render(data) {
            var name = data.name || '';
            props;
            //引入默认样式
            requid_css();
            //重置配置项
            Object.assign(this.config, data);
            this.config.name = name;
            this.dom_code();
            document.onclick = function (e) {
                var target = e.target;
                var selectr = target.getAttribute("data-verselect");
                if (!selectr) {
                    var selectlist = document.getElementsByClassName("verjs-select-option-list");
                    [].forEach.call(selectlist, function (i) {
                        i.classList.remove("verjs-select-option-list-hide");
                        var icon = i.parentNode.querySelector(".verjs-select .verJsFont.verJsFont-selector-icon-caret-up");
                        if (icon) {
                            icon.classList.remove("verJsFont-selector-icon-caret-up");
                            icon.classList.add("verJsFont-selector-icon-caret-down");
                        }

                    });
                } else if (target.getAttribute('data-verselect-input')) {
                    var self_option = '';
                    if (!target.classList.contains("verjs-select")) {
                        var options = target.parentNode.nextSibling;
                        var icon = target.classList.contains("verJsFont") ? target : target.nextSibling;
                    } else {
                        var options = target.nextSibling;
                        var icon = target.querySelector(".verJsFont");
                    }
                    if (options.classList.contains("verjs-select-option-list")) {
                        options.classList.toggle("verjs-select-option-list-hide");
                        self_option = options.id;
                    }
                    if (icon) {
                        var add_class = icon.classList.contains("verJsFont-selector-icon-caret-up") ? "verJsFont-selector-icon-caret-down" : "verJsFont-selector-icon-caret-up";
                        var remove_class = icon.classList.contains("verJsFont-selector-icon-caret-down") ? "verJsFont-selector-icon-caret-down" : "verJsFont-selector-icon-caret-up";
                        icon.classList.add(add_class);
                        icon.classList.remove(remove_class);
                    }
                    //隐藏其他打开的选择框
                    [].forEach.call(document.getElementsByClassName('verjs-select-option-list'), function (item) {
                        if (self_option != item.id) {
                            item.classList.remove("verjs-select-option-list-hide");
                            var prev = item.previousSibling;
                            if (prev.classList.contains("verjs-select")) {
                                var icon = prev.querySelector(".verJsFont-selector-icon-caret-up");
                                if (icon) {
                                    icon.classList.remove("verJsFont-selector-icon-caret-up");
                                    icon.classList.add("verJsFont-selector-icon-caret-down");
                                }
                            }
                        }
                    });
                }
            }
        },
        dom_code() {
            var objs = document.querySelector(this.config.elem);
            objs.classList.add("verjs-select-box");
            objs.setAttribute("data-verSelect", "true");
            this.config.objs = objs.id;
            var select_items = document.createElement("div");
            select_items.className = "verjs-select";
            select_items.style.width = this.config.width;
            select_items.style.height = this.config.height;
            select_items.setAttribute("data-verSelect", "true");
            select_items.setAttribute("data-verselect-input", "true");
            var _h = '<span class="verjs-option-selected" id="' + (objs.id) + '-selected" data-verSelect="true" data-verselect-input="true">' + this.config.placeholder + '</span><i class="verJsFont verJsFont-selector-icon-caret-down" data-verSelect="true" data-verselect-input="true"></i>';
            select_items.innerHTML = _h;
            var options_list = document.createElement("div");
            options_list.className = "verjs-select-option-list";
            options_list.id = objs.id + 'option-list';
            options_list.style.maxHeight = this.config.body_height + 'px';
            var width = parseInt(this.config.width) + 30;
            options_list.style.minWidth = width + "px";
            options_list.style.top = /^\d+px$/.test(this.config.height) ? (parseInt(this.config.height) - 5) + "px" : "30px";
            options_list.setAttribute("data-verSelect", "true");
            var search = document.createElement('div');
            search.className = 'verjs-search-items';
            search.id = objs.id + '-search';
            search.setAttribute("data-verSelect", "true");
            search.style.width = width + "px";
            var _search_height = this.config.checkbox ? 80 : 40;
            search.style.height = _search_height + "px";
            if(this.config.checkbox){
               var btn =  this.search_btns();
               search.append(btn);
            }
            var input = document.createElement("input");
            input.type = 'text';
            input.className = "verjs-search-input";
            input.placeholder = this.config.search_text;
            input.onkeyup = this.search_input;
            input.setAttribute("data-id", objs.id);
            input.setAttribute("data-verSelect", "true");
            input.style.width = (width - 35) + "px";
            search.append(input);
            var icon = document.createElement("i");
            icon.classList = "verJsFont verJsFont-search";
            icon.onclick = this.search_input;
            icon.setAttribute("data-id", objs.id);
            icon.setAttribute("data-verSelect", "true");
            if(this.config.checkbox){
                icon.style.top = "40px";
            }
            search.append(icon);
            options_list.append(search);
            var ul = document.createElement("ul");
            ul.className = 'verjs-select-option-items';
            ul.id = objs.id + '-options';
            ul.style = 'max-height:' + (this.config.body_height - _search_height - 5) + 'px';
            ul.setAttribute("data-verSelect", "true");
            options_list.append(ul);
            objs.appendChild(select_items);
            objs.appendChild(options_list);
            objs.setAttribute("data-objes-items", JSON.stringify(this.config.data));
            objs.setAttribute("data-objes-defaults", JSON.stringify(this.config.init_value));
            this.option_list();
        },
        search_btns(){
            var btn_list = document.createElement('div');
            btn_list.className = 'verjs-select-btn-list';
            btn_list.setAttribute("data-verSelect", "true");
            var btnlist = this.config.btn;
            var _self = this;
            [].forEach.call(btnlist,function (i) {
                var icon = document.createElement("span");
                icon.className = i.icon;
                icon.innerText = i.name;
                if(typeof i.callfun == "function"){
                    icon.onclick = i.callfun;
                } else {
                    icon.setAttribute("data-change",i.callfun)
                    icon.onclick = _self.all_chang_btn;
                }
                icon.setAttribute("data-id",_self.config.objs);
                icon.setAttribute("data-verSelect", "true");
                btn_list.append(icon);
            });
            return btn_list;
        },
        all_chang_btn(){
            var item = this.getAttribute('data-change'),
                list = JSON.parse(window.sessionStorage.getItem("verselect_"+this.getAttribute('data-id')));
            var options = document.getElementById(list.objs+"-options").querySelectorAll(".verjs-select-option-items-value");
            var value = [],_default = [];
            if(options.length){
                [].forEach.call(options,function (i) {
                    if(item == 'changeAll'){
                        i.classList.add("verjs-select-selecteds");
                        value.push(JSON.parse(i.getAttribute("data-item")));
                        _default.push(i.innerText);
                        i.querySelector("i").classList.remove("verJsFont-checkbox");
                        i.querySelector("i").classList.add("verJsFont-checked");
                    } else if(item == 'rechangeAll'){
                        if(i.classList.contains("verjs-select-selecteds")){
                            i.classList.remove("verjs-select-selecteds");
                            i.querySelector("i").classList.add("verJsFont-checkbox");
                            i.querySelector("i").classList.remove("verJsFont-checked");
                        } else {
                            i.classList.add("verjs-select-selecteds");
                            value.push(JSON.parse(i.getAttribute("data-item")));
                            _default.push(i.innerText);
                            i.querySelector("i").classList.remove("verJsFont-checkbox");
                            i.querySelector("i").classList.add("verJsFont-checked");
                        }
                    } else{
                        i.classList.remove("verjs-select-selecteds");
                        i.querySelector("i").classList.add("verJsFont-checkbox");
                        i.querySelector("i").classList.remove("verJsFont-checked");
                    }
                });
            }
            list.value = value;
            window.sessionStorage.setItem("verselect_"+list.objs,JSON.stringify(list));
            document.getElementById(list.objs+'-selected').innerText = _default.length?_default.join(","):list.placeholder;
        },
        //系统配置项
        config: {
            data: [],//初始数据
            init_value: [],//默认值
            bindid: "id",//赋值键值，默认为字段id
            key: "name",//option的名称
            height: "35px",//选择框高度
            width: "220px",//选择框宽度
            body_height: "345",//选项列表高度
            placeholder: "请选择",//默认显示文字
            checkbox: false,//是否开启多选
            search_text: "请输入搜索内容",//搜索框提示文字
            empty_search: "没有可选择信息",//空数据提示文字
            name: '',//表单名称，如果为空则不保存到表单中
            value: [],
            btn: [{name:"全选",icon:"verJsFont verJsFont-quanxuan",callfun:"changeAll"},{name:"反选",icon:"verJsFont verJsFont-tubiaozhizuomoban",callfun:"rechangeAll"},{name:"清空",icon:"verJsFont verJsFont-cancel",callfun:"clearChange"}]
        },
        //初始化参数
        option_list() {
            this.config.value = [];
            var option = document.getElementById(this.config.objs + '-options');
            if (this.config.data.length < 1) {
                option.innerHTML = '<li class="verjs-empty-option" data-verSelect="true">' + this.config.empty_search + '</li>';
                return;
            }
            var _self = this;
            var _html = "",
                _default = [];
            [].forEach.call(this.config.data, function (i) {
                var h = document.createElement("li");
                h.className = "verjs-select-option-items-value";
                h.setAttribute("data-item", JSON.stringify(i));
                h.setAttribute("data-value", i[_self.config.bindid]);
                h.setAttribute("data-id", _self.config.objs);
                h.setAttribute("data-verSelect", "true");
                var select = false;
                if (_self.config.init_value.length && _self.config.init_value.indexOf(i[_self.config.bindid]) >= 0) {
                    _self.config.value.push(i);
                    _default.push(i[_self.config.key]);
                    select = true;
                    h.classList.add("verjs-select-selecteds");
                }
                var _h = "";
                if (_self.config.checkbox) {
                    _h = select ? '<i class="verJsFont verJsFont-checked" data-verSelect="true"></i>' : '<i class="verJsFont verJsFont-checkbox" data-verSelect="true"></i>';
                }
                _h += '<span class="verjs-values" data-verSelect="true">' + i[_self.config.key] + '</span>';
                h.innerHTML = _h;
                h.onclick = _self.click_value;
                option.append(h);
            });
            if (_default.length) {
                document.getElementById(this.config.objs + "-selected").innerText = _self.config.checkbox ? (_default.join(",")) : _default[_default.length - 1];
            }
            window.sessionStorage.setItem('verselect_' + _self.config.objs, JSON.stringify(_self.config));
        },
        //点击选项框
        click_value(_self) {
            var config = window.sessionStorage.getItem('verselect_' + this.getAttribute("data-id"));
            config = JSON.parse(config);
            config.value = [];
            if (this.classList.contains("verjs-select-selecteds")) {
                this.classList.remove("verjs-select-selecteds");
                if (config.checkbox) {
                    var icons = this.querySelector("i.verJsFont-checked");
                    icons.classList.remove("verJsFont-checked");
                    icons.classList.add("verJsFont-checkbox");
                }
            } else {
                if (config.checkbox) {
                    var icons = this.querySelector("i.verJsFont-checkbox");
                    icons.classList.add("verJsFont-checked");
                    icons.classList.remove("verJsFont-checkbox");
                } else {
                    var selected = this.parentNode.querySelectorAll('.verjs-select-selecteds');
                    [].forEach.call(selected, function (i) {
                        i.classList.remove("verjs-select-selecteds");
                    });
                }
                this.classList.add("verjs-select-selecteds");
            }
            var selected = this.parentNode.querySelectorAll('.verjs-select-selecteds');
            var _default = [];
            [].forEach.call(selected, function (i) {
                config.value.push(JSON.parse(i.getAttribute("data-item")));
                _default.push(i.innerText);
            });
            window.sessionStorage.setItem('verselect_' + config.objs, JSON.stringify(config));
            document.getElementById(config.objs + "-selected").innerText = config.checkbox ? _default.join(",") : _default[_default.length - 1];
            if (selected.length < 1) {
                document.getElementById(config.objs + "-selected").innerText = config.placeholder;
            }
            if (!config.checkbox) {
                document.getElementById(config.objs + "option-list").classList.remove('verjs-select-option-list-hide');
                var icon = document.getElementById(config.objs).querySelector('.verJsFont-selector-icon-caret-up');
                if (icon) {
                    icon.classList.add("verJsFont-selector-icon-caret-down");
                    icon.classList.remove("verJsFont-selector-icon-caret-up");
                }
            }
        },
        //获取配置参数
        get_config: function (selected) {
            return JSON.parse(window.sessionStorage.getItem('verselect_' + selected));
        },
        //获取提交的form表单值
        get_form_value: function (selected) {
            var config = this.get_config(selected),
                value = config.value,
                _def = [],
                rets = {};
            [].forEach.call(value, function (i) {
                _def.push(i[config.bindid]);
            });
            _def = _def.join(",");
            if (config.name != '') {
                rets[config.name] = _def;
            } else {
                rets = _def;
            }
            return rets;
        },
        //获取选中的值
        get_value(selected) {
            var config = this.get_config(selected);
            return config.value;
        },
        //搜索关键字
        search_input() {
            var config = JSON.parse(window.sessionStorage.getItem('verselect_' + this.getAttribute("data-id")));
            var value = '';
            if (this.classList.contains("verJsFont")) {
                value = this.parentNode.querySelector(".verjs-search-input").value;
            } else {
                value = this.value;
            }
            var quers_list = document.getElementById(config.objs + '-options').querySelectorAll("li.verjs-select-option-items-value");
            if (value == '') {
                var hide = document.getElementById(config.objs + '-options').querySelectorAll("li.verjs-select-option-items-value-hide");
                [].forEach.call(hide, function (i) {
                    i.classList.remove('verjs-select-option-items-value-hide');
                });
            }
            var query = quers_list.length;
            if (quers_list.length) {
                [].forEach.call(quers_list, function (i) {
                    var item = JSON.parse(i.getAttribute('data-item'));
                    if (item.name.indexOf(value) < 0) {
                        i.classList.add("verjs-select-option-items-value-hide");
                        query--;
                    } else {
                        i.classList.remove("verjs-select-option-items-value-hide");
                    }
                });
            }
            var empty_length = document.getElementById(config.objs + '-options').querySelector(".verjs-empty-option");
            if (query < 1 && !empty_length) {
                var html = document.createElement("li");
                html.className = "verjs-empty-option";
                html.innerText = config.empty_search;
                html.setAttribute("data-verSelect", 'true');
                document.getElementById(config.objs + '-options').append(html);
                // document.getElementById(config.objs+'-options').ap = '';
            } else if (query > 0 && empty_length) {
                empty_length.remove();
            }
        }
    };
    return select;
})();