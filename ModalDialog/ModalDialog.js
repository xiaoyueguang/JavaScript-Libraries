function dialog(obj){
	this.width = obj.width;
	this.height = obj.height;
	this.id = obj.id;
	this.title = obj.title;
	
	var div = document.getElementById(this.id);
	
	this.init = function(){
		if(div === null){
			div = document.createElement('div');
			div.id = this.id;
			document.getElementsByTagName('body')[0].appendChild(div);
		}
		div.style.width = this.width;
		div.style.height = this.height;
		div.style.position = 'fixed';
		div.style.top = (parseInt(window.screen.availHeight) - parseInt(this.height)) / 2 + 'px';
		div.style.left = (parseInt(window.screen.availWidth) - parseInt(this.width)) / 2 + 'px';
		
		titlediv = document.createElement('div');
		titletext = document.createTextNode(this.title);
		titlediv.appendChild(titletext);
		
		div.appendChild(titlediv);
	}
	
}


var ff = new dialog({
	width:'300px',
	height:'200px',
	id:'dialog',
	title:'TITLE'
});

ff.init();