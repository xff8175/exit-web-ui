/**
 *
 * 公共控件父类,对基础的控件初始化好基本的属性.
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.basic", {
		
		options:{
			focusable:true,
			hoverable:false,
			role:'exit-cmp'
		},
		//清除左右两边空格
		rtrim:/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		_create:function() {
			
			this.options = $.applyIf(this.getDataOptions() || {},this.options);
			
			this.element.uniqueId();
			this.element.attr("role",this.options.role);
			
			if ($.isNotEmpty(this.options.tabIndex) && $.isNumeric(this.options.tabIndex)) {
				this.element.attr("tab-index",this.options.tabIndex);
			}
			
			if (this.options.focusable) {
				this._focusable(this.widget());
			}
			
			if (this.options.hoverable) {
				this._hoverable(this.widget());
			}
			
			if (this.element.is(":disabled")) {
				this.disable();
			}
			
		},
		getDataOptions:function() {
			var options = this.element.attr("data-options");
			return $.isEmpty(options) ? null : $.parseJSON("{" + options + "}");
		},
		getId:function() {
			return this.element.attr("id");
		}
		
	});
	
})( jQuery );