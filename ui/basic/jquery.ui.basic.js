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
		
		_create:function() {
			this.element.uniqueId();
			this.element.attr("role",this.options.role);
			
			if ($.isNotEmpty(this.options.tabIndex) && $.isNumeric(this.options.tabIndex)) {
				this.element.attr("tab-index",this.options.tabIndex);
			}
			
			if (this.options.focusable) {
				this._focusable(this.element);
			}
			
			if (this.options.hoverable) {
				this._hoverable(this.element);
			}
			
		},
		
		getId:function() {
			return this.element.attr("id");
		}
		
	});
	
})( jQuery );