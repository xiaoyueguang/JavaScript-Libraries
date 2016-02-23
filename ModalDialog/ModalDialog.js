function dialog(obj){
	this.width = obj.width;
	this.height = obj.height;
	this.id = obj.id;
	this.title = obj.title;
	this.content = obj.content;
	var div = document.getElementById(this.id);
	var backdiv,
		titlediv,
		titletext,
		contentdiv,
		contenttext;
	if(div === null){
		backdiv = document.createElement('div');
		backdiv.className = 'backdiv';
		div = document.createElement('div');
		div.id = this.id;
		document.getElementsByTagName('body')[0].appendChild(backdiv);
	}
	backdiv.style.background = 'rgba(0,0,0,0.5)';
	backdiv.style.position = 'fixed';
	backdiv.style.width = '100%';
	backdiv.style.height = '100%';
	backdiv.style.top = 0;
	backdiv.style.left = 0;
	backdiv.style.display = 'none';
	div.style.width = this.width;
	div.style.height = this.height;
	div.style.position = 'fixed';
	var range = {
			top:0,
			left:0,
			bottom: parseInt(document.documentElement.clientHeight) - parseInt(this.height),
			right: parseInt(document.documentElement.clientWidth) - parseInt(this.width)
		};
	div.style.top = range.bottom / 2 + 'px';
	div.style.left = range.right / 2 + 'px';
	
	titlediv = document.createElement('div');
	contentdiv = document.createElement('div');
	titletext = document.createTextNode(this.title);
	contenttext = document.createTextNode(this.content);
	titlediv.appendChild(titletext);
	titlediv.className = 'title';
	div.appendChild(titlediv);
	backdiv.appendChild(div);
	contentdiv.appendChild(contenttext);
	div.appendChild(contentdiv);
	var diffLeft,
		diffTop,
		startLeft,
		endLeft,
		startTop,
		endTop;
		
	titlediv.onmousedown = function(ev){
		var space = 20;
		diffLeft = parseInt(div.style.left) - ev.clientX;
		diffTop = parseInt(div.style.top) - ev.clientY;
		backdiv.onmousemove = function(event){
				
			startLeft = event.clientX;
			if(startLeft > endLeft){
				if(parseInt(div.style.left) < range.right - space){
					div.style.left = event.clientX + diffLeft + 'px';
				}else{
					diffLeft = parseInt(div.style.left) - event.clientX;
				}
			}else if(startLeft < endLeft){
				if(parseInt(div.style.left) > range.left + space){
					div.style.left = event.clientX + diffLeft + 'px';
				}else{
					diffLeft = parseInt(div.style.left) - event.clientX;
				}
			}
			endLeft = startLeft;
			
			startTop = event.clientY;
			if(startTop > endTop){
				if(parseInt(div.style.top) < range.bottom - space){
					div.style.top = event.clientY + diffTop + 'px';
				}else{
					diffTop = parseInt(div.style.top) - event.clientY;
				}
			}else if(startTop < endTop){
				if(parseInt(div.style.top) > range.top + space){
					div.style.top = event.clientY + diffTop + 'px';
				}else{
					diffTop = parseInt(div.style.top) - event.clientY;
				}
			}
			endTop = startTop;
		};
		
	};
	backdiv.onmouseup = function(){
		backdiv.onmousemove = undefined;
	};
	this.display = function(){
		backdiv.style.display = 'block';
	}
	this.hide = function(){
		backdiv.style.display = 'none';
	}
	this.changeContent = function(content){
		this.content = content;
		contentdiv.innerHTML = content;
	}
}
dialog.prototype.alert = function(){
	this.display();
}
dialog.prototype.confirm = function(){
	this.display();
}
dialog.prototype.inter = function(){
	timer = arguments[0];
	if(arguments.length === 2){
		this.changeContent(arguments[1]);
	}
	this.display();
	setTimeout(this.hide,timer);
}
var msgbox = new dialog({
	width:'500px',
	height:'400px',
	id:'dialog',
	title:'标题',
	content:'测试测试内容'
});

document.getElementById('btn1').onclick = function(){
	msgbox.inter(5000);
};