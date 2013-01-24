/**
 *
 * 公共form表单文本字段控件父类,对基础form表单文本字段控件初始化好样式和基本属性.
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.field", $.ui.basic,{
		
		options:{
			role:'exit-field',
			basicClsss:'ui-border-all ui-field-text',
			defaultHelpIconClass:'ui-text-field-icon fn-in-inline-block',
			disable:false,
			width:160,
			height:30
		},
		
		_create:function() {
			
			if (!this._isField()) {
				return ;	
			}
			
			this.element.addClass(this.options.basicClsss).
					css({
						 width:this.options.width + "px",
						 height:this.options.height + "px",
						 lineHeight:this.options.height + "px"
					});
					
			this._focusable(this.element);
			
			if ($.isEmpty(this.options.helpText)) {
				return ;
			}
			
			var icon = $("<span>").
						addClass("ui-icon ui-icon-question fn-in-inline-block ui-field-help-icon").
						attr("title",this.options.helpText);
			
			this.element.after(icon);
			
			icon.tooltip({
			  track: true
			});
			
			this._super();
			
		},
		
		_isField:function() {
			return (this.element[0].tagName === "INPUT" && 
					(this.element.attr("type") !== "button" || 
					 this.element.attr("type") !== "submit" || 
					 this.element.attr("type") !== "reset" || 
					 this.element.attr("type") !== "image" || 
					 this.element.attr("type") !== "checkbox" ||
					 this.element.attr("type") !== "radio")) || 
					this.element[0].tagName === "SELECT" || 
					this.element[0].tagName === "TEXTAREA";
		}
		
	});
	
})( jQuery );