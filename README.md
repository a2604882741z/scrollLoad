<h4>手机版下拉加载组件</h4>
<p>依赖Zepto以及Deferred组件,通过Deferred控制回调和交互动画的顺序</p><br>
<b>example:</b><br>
new scrollload({<br>
&nbsp;&nbsp;target: domNode, //DOM对象<br>
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