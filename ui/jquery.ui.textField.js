/**
 *
 * 基础文本控件.主要加一个左边的icon和按钮
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.textField", $.ui.field,{
		
		options:{
			role:'exit-text-field',
			defaultIconCls:'ui-text-field-icon ui-text-icon-color fn-in-inline-block',
			lIcon:{
				text:'@'
			},
			rIcon:{
				text:'@',
				position:'right'
			}
		},
		
		_create:function() {
			
			var superResult = this._super();
			
			if ($.isNotEmpty(superResult) && !superResult) {
				return ;
			}
			
			if ($.isNotEmpty(this.options.lIcon)) {
				this.addIcon(this.options.lIcon);
			}
			
			if ($.isNotEmpty(this.options.rIcon)) {
				this.addIcon(this.options.rIcon);
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
						
			if ($.browser.msie && ($.browser.version == "6.0" || $.browser.version == "7.0")) {
				s.css("marginTop","1px");
			}
			
			if ($.isNotEmpty(config.text)) {
				s.html(config.text);
			}
			
			if ($.isNotEmpty(config.resource)) {
				var img = $("<img>").addClass("ui-icon").arrt("src",config.resource);
				s.append(img);
			}
			
			if ($.isNotEmpty(config.handler) && $.isFunction(config.handler)) {
				s.addClass("ui-text-field-icon-button mouse-hand");
				this._hoverable(s)
				s.click(config.handler)
			}
			
			if (config.position === "left") {
				s.addClass("ui-border-top ui-border-left ui-border-bottom ui-corner-tl ui-corner-bl").
				  attr("role","left");
				  
				this.element.before(s);
			} else {
				s.addClass("ui-border-top ui-border-right ui-border-bottom ui-corner-tr ui-corner-br").
				  attr("role","right");
				  
				this.element.after(s);
			}
		}
		
	});
	
})( jQuery );