/**
 *
 * 公共form表单文本字段控件父类,对基础form表单文本字段控件初始化好样式和基本属性.
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.field", $.ui.basic,{
		
		options:{
			role:'exit-field',
			defaultHelpIconClass:'ui-text-field-icon fn-in-inline-block',
			serachable:true,
			width:160,
			height:30
		},
		
		_create:function() {
			
			if (!this._isField()) {
				return ;	
			}
			
			this.options = $.applyIf(this.getDataOptions() || {},this.options);
			
			this.divContainer = $("<div>").addClass("fn-in-inline-block");
			
			this.element.before(this.divContainer);
			this.divContainer.append(this.element);
			
			this.element.addClass("ui-border-all ui-field-text ui-widget-shadow-inset " + (this.options.fieldClass || "")).
					css({
						 width:this.options.width + "px",
						 height:this.options.height + "px",
						 lineHeight:this.options.height + "px"
					});
			
			this._super();
			
			if ($.isNotEmpty(this.options.helpText)) {
				
				var icon = $("<span>").
							addClass("ui-icon ui-icon-question fn-in-inline-block ui-field-help-icon").
							attr("title",this.options.helpText);
				
				this.element.after(icon);
				
				icon.tooltip();
			
			}
			
			if (this.options.serachable) {
				this.element.bind("input" + this.eventNamespace,this._search.createDelegate(this));
			}
			
			if (this.element.is(":disabled")) {
				this.disable();
			}
		},
		
		_search:function(){
			
		},
		
		getDataOptions:function() {
			var options = this.element.attr("data-options");
			return $.isEmpty(options) ? null : $.parseJSON("{" + options + "}");
		},
		
		getDivContainer:function() {
			return this.divContainer;
		},
		getValue:function() {
			return this.element.val();
		},
		_isField:function() {
			return this.element.is("input") || this.element.is("select") || this.element.is("textarea");
		}
		
	});
	
})( jQuery );