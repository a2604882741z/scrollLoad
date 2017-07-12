/**
 * [滚动加载插件]
 * callback的参数包括一个Deferred回调函数和一个num参数用于统计已加载条目数，请在callback里返回Deferred的promis()，在回调中的加载结束后执行Deferred的resolve()方法通告加载结束
 */
define('scrollload', ["zepto"], function($) {
	var scrollload = function(data) {
		this.param = {
			target: 'body',
			// count: 10,  //每页个数
			// maxPage: 2,  //最大页码
			// formPageNum: 1, //起始页码
			// callback: function() {} //回调函数
		};
		this.param = $.extend(this.param, data);

		this.param.parentNode = $(this.param.target);
		this.param.parentNode.addClass('ui-scroll-wrapper');

		this.container = this.param.parentNode.children();
		this.container.addClass('ui-scroll-container');

		if (this.param.formPageNum != this.param.maxPage) {
			this.param.parentNode.append('<div class="ui-scroll-bottom"><p id="ui-scroll-tips">松开加载更多</p></div>');
			this.param.tipsNode = this.param.parentNode.find('#ui-scroll-tips');
		}

		this.init();
	};

	// 绑定touch事件，初始化计算参数
	scrollload.prototype.init = function() {
		// 存储滑动距离
		this._distance;
		// 存储Y轴起始值
		this._startY;

		this._nodeHeight = this.container.height();
		this._scrollHeight = this.container.get(0).scrollHeight;

		this.container.on({
			scroll: this.updateDistance.bind(this),
			touchstart: this.touchstart.bind(this),
			touchmove: this.touchmove.bind(this),
			touchend: this.touchend.bind(this)
		});
	};

	scrollload.prototype.updateDistance = function() {
		var scrollTop = this.container.get(0).scrollTop;
		this._distance = this._scrollHeight - (scrollTop + this._nodeHeight);
	};

	scrollload.prototype.touchstart = function() {
		this._scrollHeight = this.container.get(0).scrollHeight;
		this.container.css({
			'-webkit-transition-duration': '0ms'
		});
	};

	scrollload.prototype.touchmove = function() {
		this.updateDistance();
		if (isNaN(this._distance) || this._distance > 2 || this.param.formPageNum >= this.param.maxPage)
			return;

		event.preventDefault(); //兼容UC浏览器，默认情况下UC浏览器在滚动到边界的时候touchmove只会相应一次。

		if (!this._startY) 
			this._startY = event.touches[0].clientY;

		var movingY = event.touches[0].clientY;
		var scrollY = movingY - this._startY;

		if (scrollY >= 0) 
			return;

		this.container.css({
			'-webkit-transform': 'translate3d(0, ' + scrollY / 2 + 'px, 0)',
			'-webkit-transition-duration': '0ms',
			'overflow': 'hidden'
		});
	};

	scrollload.prototype.touchend = function() {
		var dtd = $.Deferred();
		var nextIndex = this.param.formPageNum * this.param.count;

		if (isNaN(this._distance) || this._distance > 2 || this.param.formPageNum >= this.param.maxPage) 
			return;

		this.container.css({
			'-webkit-transform': 'translate3d(0, -' + this.param.tipsNode.height() + 'px, 0)',
			'-webkit-transition-duration': '300ms',
			'pointer-events': 'none'
		});
		this.param.tipsNode.html('正在加载...');

		this.param.formPageNum += 1;

		$.when(this.param.callback(dtd, nextIndex)).then(function() {
			var scrollTop = this.container.get(0).scrollTop;
			this._startY = 0;
			this._scrollHeight = this.container.get(0).scrollHeight;
			this._distance = this._scrollHeight - (scrollTop + this._nodeHeight);
			setTimeout(function() {
				this.container.css({
					'-webkit-transform': 'translate3d(0, 0, 0)',
					'overflow-y': 'auto',
					'pointer-events': 'auto'
				});
			}.bind(this), 1000);
		}.bind(this));
	};

	return scrollload;
});