// JavaScript Document

(function( $, undefined ) {
	
	$.widget("ui.multipleComboBox", $.ui.comboBox,{
		options:{
			hideField:false
		},
		_createDataContainer:function(o) {
			var li = $("<li>").
					html(o[this.options.textField]).
					addClass("mouse-hand"),
					
			check = $("<input type='checkbox'>").
					attr("name",this._getFieldName()).
					val(o[this.options.valueField]);
					
			li.prepend(check);
					
			return li;
		},
		setValue:function(val) {
			var arr = new Array();
				
			var c = this.dataContainer.find("input[type='checkbox'][value='"+val+"']");
			c.prop("checked", !c.is(":checked"));
			
			$.each(this.dataContainer.find("input[type='checkbox']:checked"),function(i,o){
				arr.push(this.findText($(o).val()));
			}.createDelegate(this));
			
			text = arr.join(",");
			
			this.element.val(text);
		},
		getValue:function() {
			var cs = this.dataContainer.find("input[type='checkbox']:checked");
			var arr = new Array();
			
			$.each(cs,function(i,o){
				arr.push($(o).val());
			});
			
			return arr.join(",");
		},
		_itemClick:function(event) {
			this.setValue($(event.currentTarget).find("input[type='checkbox']").val());
			this.isClose = false;
			this.element.focus();
		},
		validValue:function() {
			
			if (!this.options.notFoundDelete) {
				return ;
			}
			
			var checkeds = this.dataContainer.find("input[type='checkbox']:checked");
			var texts = this.element.val().split(",");
			
			/*if (texts.length == checkeds.length) {
				return ;
			}*/
			
			checkeds.prop("checked",false);
			
			var arr = new Array();
			
			$.each(texts,function(i,text) {
				if (this._hasValue(text)) {
					this.setValue(this.findValue(text));
				}
			}.createDelegate(this));
		},
		_searchLocatData:function(query) {	
			
			var index = query.lastIndexOf(","),
			s = "";
			
			if (index > 0){
				s = query.substring(index + 1,query.length);
			} else {
				s = query;
			}
			
			if ($.isEmpty(s)) {
				return ;
			}
			
			this._hide(this.dataContainer.find("li"));
			
			var li = this.dataContainer.find("li:contains('" + s + "')");
			
			if (li.length > 0) {
				this._show(li);
			} else {
				this._notFoundResult();
			}
		}
	});
	
})(jQuery);