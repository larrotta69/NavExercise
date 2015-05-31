function Utility (){
	window.UtilThat = this;
	window.over = document.getElementsByClassName('overlay')[0];
	window.click = document.createEvent('HTMLEvents');
	click.initEvent('click', true, false);
}
Utility.prototype.removeClassToAll = function(elementClass, className){
	var elements = document.getElementsByClassName(elementClass);
	Array.prototype.forEach.call(elements, function(item, index){
		item.classList.remove(className);
	});
};


Utility.prototype.checkMobile = function(){
	if (window.innerWidth <= 768)
		return true;
	else
		return false;
}
Utility.prototype.showOverlay = function(){
	UtilThat.showElement(over);
};

Utility.prototype.overlayEvent = function(){
	var submenu = document.getElementsByClassName('sub_menu');
	var navEl = document.getElementsByClassName('menu_item_subitem');

	over.addEventListener('click', function(){
		
		UtilThat.hideElement(over);
		Array.prototype.forEach.call(submenu, function(item, index){
			UtilThat.hideElement(item);
		});
		Array.prototype.forEach.call(navEl, function(item, index){
			item.classList.remove('activeTab');
		});

	});
};

Utility.prototype.showElement = function(element){
	element.style.display = 'block';
	setTimeout(function(){
		element.className += ' active';
	}, 10);
};

Utility.prototype.hideElement = function(element){
	element.classList.remove('active');
	setTimeout(function(){
		element.style.display = 'none';
	}, 250);
};

var util = new Utility();


