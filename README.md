###### verSelector.js 1.0

###### 一、使用须知：
verSelector.js是一款select下拉框多选与关键字筛选插件，解决了select控件不支持多选及搜索筛选的问题
###### 二、方法介绍
使用verSelector.js只需在js中new一个既可以使用，如下面实例：
~~~
new verSelector();
<div>
    <h5>单选</h5>
    <select name="search" id="search" data-selector>
        <option value="">请选择</option>
    </select>
</div>
<div>
    <h5>多选</h5>
    <select name="searchs" id="searchs" data-selector data-selector-checks="true">
        <option value="">请选择</option>
    </select>
</div>
~~~ 
###### 三、属性说明
1. data参数
    1. data-selector：插件关键字，在select中加入该关键字同时实例插件即可支持搜索相关关键词选择
    2. data-selector-checks：多选关键词，加入关键词且赋值为true即可支持多选搜索条件，在加入此关键词之前需要加入data-selector关键词
2. IE浏览器暂时支持9.0以上版本使用
###### 四、样式实例
[多选&单选](https://www.xincheng-blog.cn/ver.select.html)
###### 版权信息
> Copyright © 2019 by [搬砖的小白](https://www.xincheng-blog.cn)  
> All rights reserved。
