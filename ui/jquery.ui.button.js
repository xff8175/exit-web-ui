
(function( $, undefined ) {
	
	$.widget("ui.button", $.ui.basic,{
			 
		options:{
			basicClass:'fn-in-inline-block ui-border-all ui-corner-all ui-button ui-widget',
			role:'button',
			hoverable:true
		},
		
		_create:function() {
			this.element.addClass(this.options.basicClass + " " + (this.options.buttonClass || ""));
			
			this._on(this.element,{
				mousedown:function(){
					if (this.options.disabled ) {
						return;
					}
					this.element.addClass("ui-state-active")
				}.createDelegate(this),
				mouseleave:function() {
					this.element.removeClass("ui-state-active")
				},
				mouseup:function() {
					this.element.removeClass("ui-state-active")
				}
			});
			
			this._super();
			
		}
	});
	
})(jQuery);