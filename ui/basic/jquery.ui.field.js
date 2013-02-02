/**
 *
 * 公共form表单文本字段控件父类,对基础form表单文本字段控件初始化好样式和基本属性.
 *
 **/
(function( $, undefined ) {
	
	$.widget("ui.field", $.ui.basic,{
		
		options:{
			role:'exit-field',
			defaultHelpIconClass:'fn-in-inline-block ui-text-field-icon',
			serachable:true,
			hideField:false,
			width:160,
			height:20
		},
		
		_create:function() {
			
			if (!this._isField()) {
				return false;	
			}
			
			this.divContainer = $("<div>").addClass("fn-in-inline-block");
			
			this.element.before(this.divContainer);
			this.divContainer.append(this.element);
					
			this.element.attr("autocomplete","off");
			
			this._super();
			
			if ($.isNotEmpty(this.options.helpText)) {
				
				var icon = $("<span>").
							addClass("ui-icon ui-icon-question fn-in-inline-block ui-field-help-icon").
							attr("title",this.options.helpText);
				
				this.divContainer.after(icon);
				
				icon.tooltip();
			
			}
			
			if (this.options.serachable) {
				this.element.bind("keyup" + this.eventNamespace,function(event){
					
					var tempFunction = function(event){
						
						var val = $(this.element).val();
						
						if (($.isEmpty(val) && $.isEmpty(this.originalSearchVal)) || this.originalSearchVal === val){
							return ;
						}
						
						this.originalSearchVal = val;
						
						this._search(val);
					};
					tempFunction.defer(500,this,[event]);
					
				}.createDelegate(this));
			}
			
			if (this.options.hideField) {
				this._createHideField(this.element.attr("name"));
			}
			
			if (this.element.is(":disabled")) {
				this.disable();
			}
		},
		
		_search:function(){},
		
		getDivContainer:function() {
			return this.divContainer;
		},
		getValue:function() {
			return this.element.val();
		},
		_getFieldName:function() {
			return this.hideInput ? this.hideInput.attr("name") : this.element.attr("name");
		},
		_createHideField:function(name) {
			this.hideInput = $("<input type='hidden'>").attr("name",name);
			this.element.after(this.hideInput);
			this.element.removeAttr("name");
			this.hideInput.val(this.element.val());
		},
		_isField:function() {
			return this.element.is("select") || 
					this.element.is("textarea") || 
					(this.element.is("input:not(:button)") &&
					this.element.is("input:not(:submit)") &&
					this.element.is("input:not(:image)") && 
					this.element.is("input:not(:reset)"));
		}
	});
	
})( jQuery );