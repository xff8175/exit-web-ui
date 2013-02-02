
(function( $, undefined ) {
	
	$.widget("ui.checker", $.ui.field,{
		options:{
			basicClass:'fn-in-inline-block ui-checker',
			checkBoxClass:'checkbox',
			redioClass:'radio',
			role:'checked',
			hoverable:true
		},
		_create:function() {
			
			
			this.span = $("<span>").addClass(this.options.basicClass);
			
			var superResult = this._super();
			
			if ($.isNotEmpty(superResult) && !superResult) {
				return ;
			}
			
			this._hide(this.element);
			
			if (this.element.is(":checkbox")) {
				this.span.addClass(this.options.checkBoxClass + " " + (this.options.fieldClass || ""));
			} else {
				this.span.addClass(this.options.redioClass + " " + (this.options.fieldClass || ""));
			}
			
			this.span.attr("for",this.getId());
			
			this.text = $("<label>").html(this.options.text);
			
			this.divContainer.append(this.span).append(this.text);
			
			if (!this.element.is(":disabled")) {
				this._on(this.span,{
					click:this._onClick.createDelegate(this)
				});
			}
			
		},
		_init:function() {
			if (this.element.is(":checked")) {
				this.element.prop("checked", false);
				this.checked();
			}
		},
		_onClick:function( event ) {
			this.checked();
		},
		
		checked:function() {
			if (this.element.is(":checkbox")) {
				this.element.prop("checked", !this.element.is(":checked"));
				if (this.element.is(":checked")) {
					this.span.addClass("checked");
				} else {
					this.span.removeClass("checked");
				}
			} else {
				var name = this._getFieldName();
				var parent = this.divContainer.parent("form");
				
				if (parent.length == 0) {
					parent = this.divContainer.parent();
				}
				
				this.element.prop("checked", true);
				this.span.addClass("checked");
				
				var radio = parent.find("input[type='radio'][name='"+name+"'][checked!='checked']");
				
				$.each(radio,function(i,o) {
					var dc = $(o).checker("getDivContainer");
					dc.find("span.ui-checker").removeClass("checked");
				});
			}
		},
		widget:function() {
			return this.span;
		},
		_setOption: function( key, value ) {
			this.options[ key ] = value;
	
			if ( key === "disabled" ) {
				
				var state = this.element.is(":checkbox") ? this.options.checkBoxClass : this.options.radioClass;
				
				this.widget()
					.toggleClass( this.widgetFullName + "-disabled "+ state +" ui-state-disabled", !!value )
					.attr( "aria-disabled", value );
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
	
			return this;
		}
	});
	
})(jQuery);