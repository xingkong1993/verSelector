###### verSelector.js 2.0

#### 一、使用须知：
verSelector.js是一款select下拉框多选与关键字筛选插件，解决了select控件不支持多选及搜索筛选的问题，2.0版本是在1.0版本的基础上进行优化提升，ui界面风格更加美化，针对许多网友提出的修改建议有做相关的参考。
#### 二、使用方法
##### 实例select选框
~~~~
<div id="search"></div>
<script>
var select = new verjs_select();
select.render({
  elem: "#search",
  data: [{id: 1, name: "123456"}, {id: 2, name: "哈哈哈哈"}],
  init_value: [1],
  checkbox: true,
  name: "test"
});
</script>
~~~~
##### render方法相关参数说明
| 参数名称        | 参数类型    |  缺省值  |  参数说明  |
| --------   | -----  | ---- |  ---- | 
| elem        | string       |   null      | 实例化select对象，推荐使用id
| data        | array      |   []    | 实例化对象选项
| init_value        | array      |   []    |实例化对象默认选中的值
|checkbox | bool | false |是否开启多选，默认为关闭
|name|string|null|表单中的name键值，需要通过get_form_value获取，默认为空
|bindid|string|id|表单中的键值，及selecte-option中的value值,在data中必须存在该值
|key|string|name|select款中选项的显示值，在data中必须存在该值
|height|string|35px|选择框显示高度
|width|string|220px|选择框显示长度
|body_height|number|354|下拉框高度
|placeholder|string|请选择|选择框默认显示字符
|search_text|string|请输入搜索内容|搜索框默认提示文字
|empty_search|string|没有可选择信息|空数据提示文字

##### get_form_value方法
获取select选中的值
###### 携带参数
|参数名称 |说明 |示例|
| --------   | -----  | ---- | 
|selected|select选择框，在实例化时的elem值|select.get_form_value("search");
###### 返回参数
如实例化是name值不为空则返回json数据，name值为空则返回选择的值。

##### get_value方法
获取select选中的参数
###### 携带参数
|参数名称 |说明 |示例|
| --------   | -----  | ---- | 
|selected|select选择框，在实例化时的elem值|select.get_value("search");
###### 返回参数
返回为一段json数组，为选中的data值

#### 版权信息
> Copyright © 2019 by [搬砖的小白](https://www.verjs.cn)  
> All rights reserved。
