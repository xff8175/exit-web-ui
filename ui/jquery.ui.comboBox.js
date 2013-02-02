// JavaScript Document

(function( $, undefined ) {
	
	$.widget("ui.comboBox", $.ui.textField,{
			 
		options:{
			role:'exit-text-combo',
			notFoundDelete:true,
			hideField:true,
			dropDownWidth:'auto',
			dropDownHeight:'auto',
			textField:'text',
			valueField:'value',
			searchModel:'local',
			autoLoad:true
		},
		_create:function() {
			
			if (!this._isField(this.element)) {
				return ;
			}
			
			if(this.element.is("select")) {
				this._initSelect();
			}
			
			var icon = {
				cls:'ui-icon-arrows-down',
				handler:this._onClick.createDelegate(this),
				position:"right"
			};
			
			if ($.isNotEmpty(this.options.icon)) {
				
				if ($.isArray(this.options.icon)) {
					this.options.icon.push(icon);
				} else {
					var arr = new Array();
					arr.push(this.options.icon);
					arr.push(icon);
					this.options.icon = arr;
				}
				
			} else {
				this.options.icon = icon;
			}
			
			this._super();
			
			this._initDropDownLayer();
		},
		_initSelect:function() {
			this.options.data = this.options.data || new Array();
			$.each(this.element.find("option"),function(i,o){
				var temp = {},o = $(o);
				temp[this.options.textField] = o.html().replace(this.rtrim,"");
				temp[this.options.valueField] = o.attr("value");
				this.options.data.push(temp);
			}.createDelegate(this));
			
			var temp = this.element;
			
			this.selectedVal = this.element.find("option:selected");
			
			this.element = $("<input type='text'>").attr({
				"name":this._getFieldName(),
				"data-options":temp.attr("ata-options")
			});
			this.options.url = "";
			temp.after(this.element).remove();
		},
		_init:function(){
			if (this.options.autoLoad && $.isNotEmpty(this.options.url)) {
				this.load(this.options.url);
			} else if (this.options.data) {
				this.add(this.options.data);
				
				if (this.selectedVal.length > 0) {
					this.setValue(this.selectedVal.attr("value"));
					delete this.selectedVal;
				}
			}
		},
		_initDropDownLayer:function() {
			
			this.getDivContainer().layer({
				width:this.options.dropDownWidth,
				autoShow:false
			});
			
			this.dataContainer = $("<ul>").addClass("ui-combo-dd-widget").height(this.options.dropDownHeight);
			
			this.selectedIndex = -1;
			
			this._on( this.element, {
				keyup: function( event ) {
					
					if (event.isDefaultPrevented() && !event.keyCode) {
						return ;
					}
					
					event.preventDefault();
					
					switch(event.keyCode){
						case $.ui.keyCode.ESCAPE:
							this._close( event );
							break;
						case $.ui.keyCode.ENTER:
							if (this.isOpen && this.selectedIndex >= 0) {
								event.currentTarget = this.dataContainer.find("li:not(:hidden)").get(this.selectedIndex);
								this._itemClick( event );
							}
							break;
						case $.ui.keyCode.DOWN:
							if (this.isOpen && this.selectedIndex < this.dataContainer.find("li:not(:hidden)").length - 1) {
								this._select(++this.selectedIndex);
							} else {
								this._open();
							}
							break;
						case $.ui.keyCode.UP:
							if (this.isOpen && this.selectedIndex > 0) {
								this._select(--this.selectedIndex);
							} else {
								this._open();
							}
							break;
					}
					
				},
				focusout:function( event ) {
					this.validValue();
					this.isClose = true;
					this._close.defer(150,this);
				}
			});
		},
		validValue:function() {
			
			if (!this.options.notFoundDelete) {
				return ;
			}
			
			var val = this.element.val();
			
			if (this._hasValue(val)) {
				this.setValue(this.findValue(val));
			} else {
				this.element.val("");
				this.hideInput.val("");
			}
			
		},
		load:function(url,param) {
			if ($.isEmpty(url)) {
				return ;
			}
			$.post(url,param,this._onLoad.createDelegate(this));
			
		},
		add:function(data) {
			
			this.dataContainer.empty();
			
			if ($.isEmpty(data)) {
				this._notFoundResult();
			} else {
				$.each(data,function(i,o){
					var li = this._createDataContainer(o);
					this.dataContainer.append(li);
					this._hoverable(li);
					
				}.createDelegate(this));
				
				this._on(this.dataContainer.find("li"),{
					click:this._itemClick.createDelegate(this)
				});
			}
			
			this.metadata = data;
			
			this.getDivContainer().layer("addContent",this.dataContainer);
		},
		_createDataContainer:function(o) {
			
			var val = o[this.options.valueField];
			var li = $("<li>").
					html(o[this.options.textField]).
					attr("val",val);
					
			return li;
		},
		setValue:function(val){
			this.hideInput.val(val);
			var text = this.findText(val);
			this.element.val(text);
		},
		getValue:function() {
			
			return this.hideInput.val();
		},
		findText:function(val) {
			return this._findPropertyValue(val,this.options.valueField,this.options.textField);
		},
		findValue:function(text) {
			return this._findPropertyValue(text,this.options.textField,this.options.valueField);
		},
		_findPropertyValue:function(keyVal,key,value) {
			var result = "";
			
			$.each(this.metadata,function(i,o){
				if (keyVal === o[key]) {
					result = o[value];
					return false;
				}
			}.createDelegate(this));
			
			return result;
		},
		_hasValue:function(text) {
			var result = false;
			
			$.each(this.metadata,function(i,o){
				if (text === o[this.options.textField]) {
					result = true;
					return false;
				}
			}.createDelegate(this));
			
			return result;
		},
		_open:function() {
			
			if (this.isOpen) {
				return ;
			}
			this._clear();
			
			this.getDivContainer().layer("open");
			this.element.focus();
			this.isOpen = true;
		},
		_close:function(focus) {
			
			if (!this.isClose) {
				return ;
			}
			
			this.getDivContainer().layer("close");
			
			if (focus) {
				this.element.focus();
			}
			
			this.isOpen = false;
			this.selectedIndex = -1;
			this._clear();
		},
		_onLoad:function(data) {
			this.add(data);
		},
		_onClick:function() {
			if (this.isOpen) {
				this._close(true);
			} else {
				this.isClose = false;
				this._open();
			}
		},
		_search:function(val) {
			
			this._open();
			
			this._clear();
			this.selectedIndex = -1;
			this._show(this.dataContainer.find("li"));
			
			if ($.isEmpty(val)) {
				return ;
			}
			
			if (this.options.searchModel === "local") {
				this._searchLocatData(val);
			}
			
			if (this.options.searchModel === "remote") {
				this._searchRemoteData(val);
			}
			
		},
		_searchLocatData:function(query) {
			this._hide(this.dataContainer.find("li"));
				
			var li = this.dataContainer.find("li:contains('" + query + "')");
			
			if (li.length > 0) {
				this._show(li);
			} else {
				this._notFoundResult();
			}
		},
		_notFoundResult:function() {
			this.dataContainer.append($("<li>").html(this.options.notFoundText || "").addClass("not-found-text"));
		},
		_searchRemoteData:function(query) {
			var param = {};
			param[this.options.searchField] = query;
			this.load(this.options.url,param);
		},
		_clear:function() {
			this.dataContainer.find("li").removeClass("ui-state-hover");
			this.dataContainer.find("li.not-found-text").remove();
		},
		_select:function(index) {
			this._clear();
			var li = this.dataContainer.find("li:not(:hidden)").get(index);
			$(li).addClass("ui-state-hover");
		},
		_itemClick:function(event) {
			this.setValue($(event.currentTarget).attr("val"));
			this.isClose = true;
			this._close();
			this.element.focus();
		}
	});
	
})(jQuery);