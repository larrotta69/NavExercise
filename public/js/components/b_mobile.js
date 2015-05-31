function NavigationMobile (){

}
NavigationMobile.prototype.init = function(){
	console.log('mobile');
	window.MobileThat = this;
	this.headerEvents();	
	this.overlayEvents();	
};


NavigationMobile.prototype.headerEvents = function(){
	var iconOpen = document.getElementById('open_mobile');
	var iconClose = document.getElementById('close_mobile');
	var click = document.createEvent('HTMLEvents');
	click.initEvent('click', true, false);

	iconOpen.addEventListener('click', function(){
		document.getElementById('menu_mobile').className += ' open';
		document.getElementsByClassName('banner')[0].className += ' open';
		document.getElementsByClassName('navigation_mobile')[0].className += ' headerOpen';
		util.showElement(over);
	});

	iconClose.addEventListener('click', function(){
		over.dispatchEvent(click);
	});
};


NavigationMobile.prototype.overlayEvents = function(){
	over.addEventListener('click', function(){
		document.getElementById('menu_mobile').classList.remove('open');
		document.getElementsByClassName('banner')[0].classList.remove('open');
		document.getElementsByClassName('navigation_mobile')[0].classList.remove('headerOpen');
		over.classList.remove('active');
		over.style.display = 'none';
	});
};
var navMobile = new NavigationMobile();
navMobile.init();