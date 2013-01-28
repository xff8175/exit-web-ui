// JavaScript Document

(function( $, undefined ) {
	
	$.widget("ui.layer",{
			 
		options:{
			role:'exit-layer',
			width:'auto',
			height:'auto',
			closeAction:'hide'
		},
		
		_create:function() {
			this.layerWidget = $("<div>").
								addClass("ui-layer ui-widget ui-corner-all ui-widget-content ui-border-all ui-widget-shadow");
								
			if (this.options.width === "auto") {
				this.layerWidget.width(this.element.width());
			}
			
			this.element.after(this.layerWidget);
			var offset = this.element.offset();
			
			this.layerWidget.css({
				"left":offset.left,
				"top":offset.top + this.element.height()
			});
			
			this._hide(this.layerWidget);
		},
		_init:function() {
			if (this.options.autoShow) {
				this.open();
			}
		},
		open:function() {
			this._show(this.layerWidget);
			this._trigger("open");
		},
		destroy:function() {
			this.layerWidget.remove();
		},
		close:function() {
			if (this.options.hide === "close") {
				this._destroy();
			} else {
				this._hide(this.layerWidget);
			}
			this._trigger("close");
		},
		widget:function(){
			return this.layerWidget;
		},
		addContent:function(content) {
			this.layerWidget.html(content);
		}
		
	});
	
})(jQuery);