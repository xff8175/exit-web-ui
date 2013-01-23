
(function( $, undefined ) {
	
	$.widget("ui.basic", {
		
		options:{
			focusable:true,
			role:'exit-cmp',
		},
		
		basicAttr:function(element) {
			
			this.currentWiget = element;
			this.currentWiget.uniqueId();
			this.currentWiget.attr("role",this.getRole());
			
			if ($.isNotEmpty(this.options.tabIndex) && $.isNumeric(this.options.tabIndex)) {
				this.currentWiget.attr("tab-index",this.options.tabIndex);
			}
			
		},
		
		widget: function() {
			return this.currentWiget;
		},
		
		getId:function() {
			return this.basicTarget.id;
		},
		
		setId:function(id) {
			this.basicTarget.attr("id",id);
		},
		
		getRole:function() {
			return this.options.role;
		}
		
	});
	
})( jQuery );