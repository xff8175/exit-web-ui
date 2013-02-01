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
			
			this.options = $.applyIf(this.getDataOptions() || {},this.options);
			
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
		
		_isField:function() {
			return this.element.is("select") || 
					this.element.is("textarea") || 
					(this.element.is("input:not(:button)") &&
					this.element.is("input:not(:submit)") &&
					this.element.is("input:not(:image)") && 
					this.element.is("input:not(:reset)"));
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