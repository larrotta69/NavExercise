function NavigationMobile (){

}
NavigationMobile.prototype.init = function(){
	console.log('mobile');
	window.MobileThat = this;
	window.iconOpen = document.getElementById('open_mobile');
	window.iconClose = document.getElementById('close_mobile');
	this.headerEvents();	
	this.overlayEvents();	
};


NavigationMobile.prototype.headerEvents = function(){

	iconOpen.addEventListener('click', function(){
		document.getElementById('menu_mobile').className += ' open';
		document.getElementsByClassName('banner')[0].className += ' open';
		document.getElementsByClassName('navigation_mobile')[0].className += ' headerOpen';
		util.showElement(over);
		this.className += ' hideIcon';
		iconClose.classList.remove('hideIcon');

	});

	iconClose.addEventListener('click', function(){
		over.dispatchEvent(click);
		this.className += ' hideIcon';
	});
};


NavigationMobile.prototype.overlayEvents = function(){
	over.addEventListener('click', function(){
		document.getElementById('menu_mobile').classList.remove('open');
		document.getElementsByClassName('banner')[0].classList.remove('open');
		document.getElementsByClassName('navigation_mobile')[0].classList.remove('headerOpen');
		over.classList.remove('active');
		over.style.display = 'none';
		
		iconOpen.classList.remove('hideIcon');
		iconClose.className += ' hideIcon';
	});
};
var navMobile = new NavigationMobile();
navMobile.init();