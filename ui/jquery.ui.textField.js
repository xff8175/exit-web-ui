/**
 *
 * 基础文本控件.主要加一个左右两边的icon和按钮
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.textField", $.ui.field,{
		
		options:{
			role:'exit-text-field',
			defaultIconCls:'fn-in-inline-block ui-text-field-icon ui-text-icon-color '
		},
		
		_create:function() {
			
			var superResult = this._super();
			
			if ($.isNotEmpty(superResult) && !superResult) {
				return ;
			}
			
			this.element.addClass("ui-border-all ui-field-text ui-widget-shadow-inset " + (this.options.fieldClass || "")).
			css({
				 width:this.options.width + "px",
				 height:this.options.height + "px",
				 lineHeight:this.options.height + "px"
			});
					
			this._initIcon(this.options.icon);
			
			this.getDivContainer().find("span[role='left']:first").addClass("ui-corner-left");
			this.getDivContainer().find("span[role='right']:last").addClass("ui-corner-right");
			
			if (this.leftIcon && !this.rightIcon) {
				this.element.addClass("ui-corner-right");
			} else if (!this.leftIcon && this.rightIcon) {
				this.element.addClass("ui-corner-left");
			} else if (!this.leftIcon && !this.rightIcon){
				this.element.addClass("ui-corner-all");
			}
			
		},
		_initIcon:function(icon) {
			if ($.isEmpty(icon)) {
				return ;
			}
			if ($.isArray(icon)) {
				$.each(icon,function(i,config) {
					 this.addIcon(config);
				}.createDelegate(this));
			} else {
				this.addIcon(icon)
			}
		},
		addIcon:function(config) {
			
			$.applyIf(config,{
				iconCls:this.options.defaultIconCls,
				position:'left'
			});
			
			var s = $("<span>").
						addClass(config.iconCls).css({
							 height:this.element.innerHeight() + "px",
							 lineHeight:this.element.innerHeight() + "px"
						}).
						attr("for",this.getId());
						
			if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
				s.css("marginTop","1px");
			}
			
			s.html(config.text || "");
			
			if ($.isNotEmpty(config.cls)) {
				var c = $("<span>").addClass("ui-icon " + config.cls);
				s.append(c);
			}
			
			if ($.isNotEmpty(config.handler) && $.isFunction(config.handler)) {
				s.addClass("ui-button mouse-hand");
				this._hoverable(s)
				s.click(config.handler)
			}
			
			if (config.position === "left") {
				s.addClass("ui-border-top ui-border-left ui-border-bottom").attr("role","left");
				this.leftIcon = true;
				this.element.before(s);
			} else {
				s.addClass("ui-border-top ui-border-right ui-border-bottom").attr("role","right");
				this.rightIcon = true;
				this.element.after(s);
			}
			
		}
		
	});
	
})( jQuery );