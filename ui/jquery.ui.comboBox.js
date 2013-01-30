// JavaScript Document

(function( $, undefined ) {
	
	$.widget("ui.comboBox", $.ui.textField,{
			 
		options:{
			role:'exit-text-combo',
			multiple:false,
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
			
			
			this.submitName = this.element.attr("name");
			
			if(this.element.is("select")) {
				this.options.data = this.options.data || new Array();
				$.each(this.element.find("option"),function(i,o){
					var temp = {},o = $(o);
					temp[this.options.textField] = o.html().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");
					temp[this.options.valueField] = o.attr("value");
					this.options.data.push(temp);
				}.createDelegate(this));
				
				var temp = this.element;
				
				this.element = $("<input type='text'>").attr({
					"name":this.submitName,
					"data-options":temp.attr("ata-options")
				});
				
				this.options.multiple = temp.is("multiple") || false;
				
				temp.after(this.element).remove();
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
			
			if (!this.options.multiple) {
				this.hideInput = $("<input type='hidden'>").attr("name",this.submitName);
				this.element.after(this.hideInput);
			}
			
			this.element.removeAttr("name");
		},
		_init:function(){
			if (this.options.autoLoad && this.options.url) {
				this.load(this.options.url);
			} else if (this.options.data) {
				this.add(this.options.data);
			}
		},
		_initDropDownLayer:function() {
			
			this.getDivContainer().layer({
				width:this.dropDownWidth,
				height:this.dropDownHeight,
				autoShow:false
			});
			
			this.dataContainer = $("<ul>").addClass("ui-combo-dd-widget");
			
			this.selectedIndex = -1;
			
			this._on( this.element, {
				keydown: function( event ) {
					if (event.isDefaultPrevented() && !event.keyCode) {
						return ;
					}
					
					if (event.keyCode === $.ui.keyCode.ESCAPE ) {
						event.preventDefault();
						this._close( event );
						return;
					}
					
					if (event.keyCode === $.ui.keyCode.ENTER ) {
						event.preventDefault();
						if (this.isOpen && this.selectedIndex >= 0) {
							event.currentTarget = this.dataContainer.find("li").get(this.selectedIndex);
							this._itemClick( event );
						} else {
							this._open( event );
						}
						return;
					}
					
					if (event.keyCode === $.ui.keyCode.DOWN ) {
						event.preventDefault();
						if (this.isOpen && this.selectedIndex < this.dataContainer.find("li").length - 1) {
							this._select(++this.selectedIndex);
						}
						return;
					}
					
					if (event.keyCode === $.ui.keyCode.UP) {
						if (this.isOpen && this.selectedIndex > 0) {
							this._select(--this.selectedIndex);
						}
					}
				},
				focusout:function( event ) {
					this.isClose = true;
					this._close.defer(150,this);
				}
			});
		},
		load:function(url,param) {
			if ($.isEmpty(url)) {
				return ;
			}
			$.post(url,param,this._onLoad.createDelegate(this));
			
		},
		add:function(data) {
			
			this.dataContainer.empty();
			
			$.each(data,function(i,o){
				var li = $("<li>").
					html(o[this.options.textField]).
					addClass("mouse-hand");
				
				var val = o[this.options.valueField];
			
				if (this.options.multiple) {
					var check = $("<input type='checkbox'>").attr("name",this.submitName).val(val);
					li.prepend(check);
				} else {
					li.attr("val",val);
				}
				
				this.dataContainer.append(li);
				this._hoverable(li);
				
			}.createDelegate(this));
			
			this._on(this.dataContainer.find("li"),{
				click:this._itemClick.createDelegate(this)
			});
			
			this.metadata = data;
			
			this.getDivContainer().layer("addContent",this.dataContainer);
		},
		setValue:function(val){
			var text = null;
			
			if (this.options.multiple) {
				var arr = new Array();
				
				
				var c = this.dataContainer.find("input[type='checkbox'][value='"+val+"']");
				c.prop("checked", !c.is(":checked"));
				
				$.each(this.dataContainer.find("input[type='checkbox']:checked"),function(i,o){
					arr.push(this.findText($(o).val()));
				}.createDelegate(this));
				
				text = arr.join(",")
			} else {
				this.hideInput.val(val);
				text = this.findText(val);
			}
			
			this.element.val(text);
		},
		getValue:function() {
			
			var val = "";
			
			if (this.options.multiple) {
				var cs = this.dataContainer.find("input[type='checkbox']:checked");
				var arr = new Array();
				$.each(cs,function(i,o){
					arr.push($(o).val());
				});
				val = arr;
			} else {
				val = this.hideInput.val();
			}
			
			return val;
		},
		findText:function(val) {
			var result = "";
			
			$.each(this.metadata,function(i,o){
				if (val === o[this.options.valueField]) {
					result = o[this.options.textField];
					return false;
				}
			}.createDelegate(this));
			
			return result;
		},
		_open:function() {
			
			this.dataContainer.find("li.not-found-text").remove();
			
			this._show(this.dataContainer.find("li"));
			
			if (this.isOpen) {
				return ;
			}
			
			this.selectedIndex = -1;
			
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
			
			this.dataContainer.find("li").removeClass("ui-state-hover")
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
		_search:function(event) {
			
			this._open();
			
			var val = $(event.currentTarget).val();
			
			if ($.isEmpty(val)) {
				return ;
			}
			
			this.selectedIndex = -1;
			
			if (this.options.searchModel === "local") {
			
				this._hide(this.dataContainer.find("li"));
				
				var li = this.dataContainer.find("li:contains('" + val + "')");
				
				if (li.length > 0) {
					this._show(li);
				} else {
					this.dataContainer.append($("<li>").html(this.options.notFoundText || "").addClass("not-found-text"));
				}
				
			}
			
			if (this.options.searchModel === "remote") {
				var param = {};
				param[this.options.searchField] = val;
				this.load(this.options.url,param);
			}
			
		},
		
		_select:function(index) {
			var li = this.dataContainer.find("li").removeClass("ui-state-hover").get(index);
			$(li).addClass("ui-state-hover");
		},
		
		_itemClick:function(event) {
			var temp = $(event.currentTarget);
			if (this.options.multiple) {
				this.setValue(temp.find("input[type='checkbox']").val());
				this.isClose = false;
			} else {
				this.setValue(temp.attr("val"));
				this.isClose = true;
				this._close();
			}
			this.element.focus();
		}
	});
	
})(jQuery);