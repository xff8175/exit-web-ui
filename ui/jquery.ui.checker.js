
(function( $, undefined ) {
	
	$.widget("ui.checker", $.ui.field,{
		options:{
			basicClass:'fn-in-inline-block mouse-hand ui-checker',
			checkBoxClass:'checkbox',
			redioClass:'radio',
			role:'checked',
			hoverable:true
		},
		_create:function() {
			
			var superResult = this._super();
			
			if ($.isNotEmpty(superResult) && !superResult) {
				return ;
			}
			
			this._hide(this.element);
			
			this.span = $("<span>").addClass(this.options.basicClass);
			
			if (this.element.is(":checkbox")) {
				this.span.addClass(this.options.checkBoxClass + " " + (this.options.fieldClass || ""));
			} else {
				this.span.addClass(this.options.redioClass + " " + (this.options.fieldClass || ""));
			}
			
			this.span.attr("for",this.getId());
			
			this.text = $("<label>").html(this.options.text).addClass("ui-checked-text");
			
			this.divContainer.append(this.span).append(this.text);
			
			this._hoverable(this.span);
			
			if (!this.element.is(":disabled")) {
				this._on(this.span,{
					click:this._onClick.createDelegate(this)
				});
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
		disable:function() {
			this._super();
			this.span.addClass("ui-state-disabled");
		},
		enable:function() {
			this._super();
			this.span.removeClass("ui-state-disabled");
		}
	});
	
})(jQuery);