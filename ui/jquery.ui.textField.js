/**
 *
 * 基础文本控件.主要加一个左边的icon和按钮
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.textField", $.ui.field,{
		
		options:{
			role:'exit-text-field',
			defaultIconCls:'ui-text-field-icon ui-text-icon-color fn-in-inline-block'
		},
		
		_create:function() {
			
			var superResult = this._super();
			
			if ($.isNotEmpty(superResult) && !superResult) {
				return ;
			}
			
			if ($.isNotEmpty(this.options.lIcon)) {
				this.addIcon(this.options.lIcon);
				if ($.isEmpty(this.options.rIcon)) {
					this.element.addClass("ui-corner-right");
				}
			}
			
			if ($.isNotEmpty(this.options.rIcon)) {
				this.addIcon(this.options.rIcon);
				if ($.isEmpty(this.options.lIcon)) {
					this.element.addClass("ui-corner-left");
				}
			}
			
			if ($.isEmpty(this.options.lIcon) && $.isEmpty(this.options.rIcon)) {
				this.element.addClass("ui-corner-all");
			}
		},
		addIcon:function(config) {
			
			$.applyIf(config,{
				iconCls:this.options.defaultIconCls,
				position:'left'
			});
			
			var s = $("<span>").
						addClass(config.iconCls).css({
							 height:this.options.height + "px",
							 lineHeight:this.options.height + "px"
						}).
						attr("for",this.getId());
						
			/*if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
				s.css("marginTop","1px");
			}*/
			
			if ($.isNotEmpty(config.text)) {
				s.html(config.text);
			}
			
			if ($.isNotEmpty(config.cls)) {
				var c = $("<span>").addClass("ui-icon " + config.cls);
				s.append(c);
				c.css("marginTop",((this.options.height - c.height()) / 2) + "px");
			}
			
			if ($.isNotEmpty(config.handler) && $.isFunction(config.handler)) {
				s.addClass("ui-text-field-icon-button mouse-hand");
				this._hoverable(s)
				s.click(config.handler)
			}
			
			if (config.position === "left") {
				s.addClass("ui-border-top ui-border-left ui-border-bottom ui-corner-left").
				  attr("role","left");
				this.leftIcon = true;
				this.element.before(s);
			} else {
				s.addClass("ui-border-top ui-border-right ui-border-bottom ui-corner-right").
				  attr("role","right");
				this.rightIcon = true;
				this.element.after(s);
			}
		}
		
	});
	
})( jQuery );