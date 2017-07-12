手机版下拉加载组件，依赖jQuery或者Zepto<br><br>
example:<br>
new scrollload({<br>
&nbsp;&nbsp;target: domNode,<br>
&nbsp;&nbsp;count: 10, //每页数量<br>
&nbsp;&nbsp;maxPage: 2, //最大页码<br>
&nbsp;&nbsp;formPageNum: 1, //起始页码<br>
&nbsp;&nbsp;callback: function(dtd, num) { //回调函数，返回Deferred延迟对象以及num当前页码<br>
&nbsp;&nbsp;&nbsp;&nbsp;$.ajax({<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url: '',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: {}<br>
&nbsp;&nbsp;&nbsp;&nbsp;}).then(function() {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$('#container').append(template);<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dtd.resolve();<br>
&nbsp;&nbsp;&nbsp;&nbsp;});<br><br>

&nbsp;&nbsp;&nbsp;&nbsp;return dtd.promise();<br>
&nbsp;}<br>
});