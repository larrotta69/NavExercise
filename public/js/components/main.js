function Navigation (){

}
Navigation.prototype.init = function(){
	window.Mythat = this;
	this.query(this.createNav, '/api/nav.json');
	util.overlayEvent();	
	
};

Navigation.prototype.query = function(callback, url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, true);

	xmlhttp.onload = function(){
		if (xmlhttp.status == 200)
			callback(JSON.parse(xmlhttp.responseText));	
	}
	
	xmlhttp.send();
};

/*@group populate desktop and mobile navigation*/
/*Makes a validation to the sub items for the secondary navigation*/
/*if true, it will append the sub_menu markup*/
Navigation.prototype.createNav = function(obj){
	console.log('1');
	
	var menu = document.getElementsByClassName("menu")[0];
	var menuMobile = document.getElementsByClassName("list_mobile")[0];
	 
	var element = '';
	var MobileElement = '';

	Array.prototype.forEach.call(obj.items, function(item, indexItem){
		var position = indexItem + 1;
		if ( item.items.length == 0 ){ 
			//Desktop
			menu.innerHTML += '<li class="menu_item"><a href="'+item.url+'">'+item.label+'</a></li>';
			//Mobile
			menuMobile.innerHTML += '<li class="menu_mobile_item menu_mobile_item_no"><a href="'+item.url+'">'+item.label+'</a></li>';
		}
		else{
			//Desktop
			menu.innerHTML += '<li class="menu_item menu_item_subitem"><p>'+item.label+'</p><ul class="sub_menu list galaxie"></ul></li>';
			//Mobile
			menuMobile.innerHTML += '<li class="menu_mobile_item menu_mobile_item_subitem"><p class="garde_bold">'+item.label+'</p><img class="icon_arrow" src="images/arrow.svg" /><ul class="sub_menu_mobile list galaxie"></ul></li>';

			element = menu.querySelectorAll('.menu_item')[position];
			console.log(position);
			MobileElement = menuMobile.querySelectorAll('.menu_mobile_item')[position-1];

			

			Array.prototype.forEach.call(item.items, function(subitem, index){
				//Desktop
				element.querySelectorAll('.sub_menu')[0].innerHTML += '<li><a href="'+subitem.url+'">'+subitem.label+'</a></li>';
				//Mobile
				MobileElement.querySelectorAll('.sub_menu_mobile')[0].innerHTML += '<li><a class="galaxie" href="'+subitem.url+'">'+subitem.label+'</a></li>';
			});
		}
			
	});

	/*assign events to navigation*/
	Mythat.navEvents();
	Mythat.mobileNavEvents();
};
/*@end populate desktop navigation*/


/*@group add the navigation behavior*/
Navigation.prototype.navEvents = function(obj){
	console.log('2');
	var navEl = document.getElementsByClassName('menu_item_subitem');
	var menus = document.getElementsByClassName('sub_menu');

	Array.prototype.forEach.call(navEl, function(item, index){
		Mythat.subItemEvents(item, menus)
		item.addEventListener('click', function(){
			var subMenu = this.querySelectorAll('ul')[0]
			util.removeClassToAll('sub_menu', 'active');
			util.showOverlay();
			util.showElement(subMenu);
		});	
	});

};

Navigation.prototype.mobileNavEvents = function(obj){
	var mobileSubItems = document.getElementsByClassName('menu_mobile_item_subitem');
	var mobileNoSubItems = document.getElementsByClassName('menu_mobile_item_no');
	var hei = 0;
	var click = document.createEvent('HTMLEvents');
	click.initEvent('click', true, false);


	Array.prototype.forEach.call(mobileSubItems, function(subitem, index){
		subitem.addEventListener('click', function(){
			Array.prototype.forEach.call(mobileSubItems, function(subitem, index){
				subitem.style.height = '48px';
				subitem.querySelectorAll('.icon_arrow')[0].classList.remove('arrow_open')
			});
			
			hei = this.querySelectorAll('.sub_menu_mobile li').length * 48;
			this.style.height = hei+'px';
			//arrow
			this.querySelectorAll('.icon_arrow')[0].className += ' arrow_open';

		});
	});

	Array.prototype.forEach.call(mobileNoSubItems, function(subitemNo, index){
		subitemNo.addEventListener('click', function(){
			over.dispatchEvent(click);
		});
	});
};
/*@end add the navigation behavior*/

Navigation.prototype.subItemEvents = function(subMenu, subMenuArray){
	var subMenuChilds = subMenu.querySelectorAll('li');

	Array.prototype.forEach.call(subMenuChilds, function(child, index){
		child.addEventListener('click', function(){
			util.hideElement(over);
			Array.prototype.forEach.call(subMenuArray, function(submenu, index){
				util.hideElement(submenu);	
			});
			
		});
	});
};

var nav = new Navigation();
nav.init();