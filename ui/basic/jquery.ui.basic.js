/**
 *
 * �����ؼ�����,�Ի����Ŀؼ���ʼ���û���������.
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.basic", {
		
		options:{
			focusable:true,
			role:'exit-cmp'
		},
		
		_create:function() {
			this.element.uniqueId();
			this.element.attr("role",this.options.role);
			
			if ($.isNotEmpty(this.options.tabIndex) && $.isNumeric(this.options.tabIndex)) {
				this.element.attr("tab-index",this.options.tabIndex);
			}
			
		},
		
		getId:function() {
			return this.element.attr("id");
		}
		
	});
	
})( jQuery );