;(function($){
	var defaults={

	};
	function MagicFilter(options, elements){
		this.config= $.extend({}, defaults, options)
		this.element= elements;
		this.init();

	};

	MagicFilter.prototype.init = function() {
		var self= this;

		this._categoryArray= [];

		for(var i= 0; i < this.element.length; i++){
			this._categoryArray.push($(this.element[i]).attr('data-target'))
		}
		this._categoryArray= this._categoryArray.filter(this.unicArrayFilter);
		this.createObjCategory();
		this.action(self);
	};

	MagicFilter.prototype.unicArrayFilter = function(value, index, arr) {
		return arr.indexOf(value) === index;
	};

	MagicFilter.prototype.createObjCategory = function() {
		this._objCategory= {};

		for(var i= 0; i<this._categoryArray.length; i++){
			this._objCategory[this._categoryArray[i]]= [];
		}
		return this._objCategory;
	};
	MagicFilter.prototype.action = function(self){
		$(this.element).on('click', function(){
			self.categoryObj= self.createObjCategory();
			var target= $(this).attr('data-target');
			checkbox= '[data-target='+target+']'+':checked';
			$(checkbox).each(function(){
				self.categoryObj[target].push(this.value);
			});
			self.join(target);
			self.sendAjax(self.categoryObj);
		});
		$(".close").on("click", function(){
			var dataClose= $(this).attr("data-close");
			self.categoryObj[dataClose].pop();
			self.join(dataClose);		
		});
	};
	MagicFilter.prototype.join= function(target){
		$(target).text(this.categoryObj[target].join())
	}
	MagicFilter.prototype.sendAjax = function(obj) {
		$('.loader').fadeIn('slow');
		setTimeout(function(){
			//$('.content-load').load('item.html');
			$.ajax({
				type: 'get',
				url: 'item.html',
				data: JSON.stringify(obj),
				success: function(response){
					$('.loader').fadeOut('slow');
					$('.content-load').append(response);
				},
			})
		}, 1000);
	};
	$.fn.magicFilter= function(options){
		new MagicFilter(options, this);
	}
})(jQuery);