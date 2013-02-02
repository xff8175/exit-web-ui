// JavaScript Document

(function( $, undefined ) {
	
	$.widget("ui.multipleComboBox", $.ui.comboBox,{
		options:{
			hideField:false
		},
		_createDataContainer:function(o) {
			var li = $("<li>"),
			check = $("<input type='checkbox'>").
					attr("name",this._getFieldName()).
					val(o[this.options.valueField]);
					
			li.prepend(check);
			check.checker({
				text:o[this.options.textField]
			});
			return li;
		},
		_init:function(){
			if (this.options.autoLoad && $.isNotEmpty(this.options.url)) {
				this.load(this.options.url);
			} else if (this.options.data) {
				this.add(this.options.data);
				if (this.selectedVal.length > 0) {
					$.each(this.selectedVal,function(i,o){
						this.setValue($(o).attr("value"));
					}.createDelegate(this));
					delete this.selectedVal;
				}
			}
		},
		setValue:function(val,checked) {
			var arr = new Array();
				
			var c = this.dataContainer.find("input[type='checkbox'][value='"+val+"']");
			
			if (!checked) {
				c.checker("checked");
			}
			
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
			
			return arr;
		},
		_itemClick:function(event) {
			
			this.element.focus();
			this.isClose = false;
			
			if ($(event.target).is("span")) {
				var id = $(event.target).attr("for");
				this.setValue($("#" + id).checker("getValue"),true);
			} else {
				this.setValue($(event.currentTarget).find("input[type='checkbox']").val());
			}
			
		},
		validValue:function() {
			
			if (!this.options.notFoundDelete) {
				return ;
			}
			
			var checkeds = this.dataContainer.find("input[type='checkbox']:checked");
			var texts = this.element.val().split(",");
			
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