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
			autoWrite:{}
		},
		
		_create:function() {
			if (this.element.is("select")) {
				var input = $("<input>");
				this.selectTarget = this.element;
				
				this.element.after(input);
				this._hide(this.selectTarget);
				
				input.addClass(this.element.attr("css"));
				this.element = input;
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
		_init:function(){
			if ($.isNotEmpty(this.selectTarget)) {
				
				var op = this.selectTarget.find("option");
				var data = new Array();
				
				$.each(op,function(i,o) {
					o = $(o);
					var temp = {};
					temp[this.options.valueField] = o.attr("value");
					temp[this.options.textField] = o.html();
					data.push(temp)
				}.createDelegate(this));
				
				this.add(data);
			} else {
				this.load(this.options.url);
			}
			
		},
		_initDropDownLayer:function() {
			
			this.widget().layer({
				width:this.dropDownWidth,
				height:this.dropDownHeight,
				autoShow:false
			});
			
			this.ul = $("<ul>").addClass("ui-combo-dd-widget");
			
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
					
					if (event.keyCode === $.ui.keyCode.DOWN ) {
						event.preventDefault();
						this._open( event );
						return;
					}
				},
				focusout:function( event ) {
					this._close();
				}
			});
		},
		load:function(url,param) {
			if ($.isEmpty(url)) {
				return ;
			}
			$.post(url,param,function(data){
				this.add(data);
			}.createDelegate(this));
			
		},
		add:function(data) {
			
			this.ul.empty();
			
			$.each(data,function(i,o){
				var li = $("<li>").
					html(o[this.options.textField]).
					attr("val",o[this.options.valueField]).
					addClass("mouse-hand");
				this.ul.append(li);
				this._hoverable(li);
			}.createDelegate(this));
			
			this.widget().layer("addContent",this.ul);
		},
		_open:function() {
			this.widget().layer("open");
			this.element.focus();
		},
		_close:function(focus) {
			this.widget().layer("close");
			if (focus) {
				this.element.focus();
			}
		},
		_onClick:function() {
			this._open();
		}
	});
	
})(jQuery);