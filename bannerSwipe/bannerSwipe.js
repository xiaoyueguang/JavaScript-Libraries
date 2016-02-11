//	封装函数
function bannerSwipe(config){
	//	参数设定
	var obj = {};
	function setObj(argu,val){
		obj[argu] = config[argu] === undefined ? val : config[argu];
	}
	//	设定ID
	setObj("id","banner");
	//	设定 banner 长宽
	setObj("size","");
	//	设定轮播时间
	setObj("timer",3000);
	//	设定轮播速度
	setObj("speed","0.5");
	//	设定是否循环
	setObj("loop",true);
	//	设定是否自动轮播
	setObj("autoplay",true);
	//	设定向前按钮ID
	setObj("prev","");
	//	设定向后按钮ID
	setObj("next","");
	//	设定分页器
	setObj("pagination","");
	
	
	
	// 参数初始化
	var	banner = document.getElementById(obj.id),
		bannerSwipe = banner.getElementsByTagName("ul")[0],
		bannerSwipeLeft = window.getComputedStyle(bannerSwipe).left,
		bannerli = banner.getElementsByTagName("li"),
		bannerlength = bannerli.length,
		current = 0,
		timer = '',
		status = "false";
	
	if(judg("size")){
		banner.style.width = obj.size.split("*")[0] + "px";
		banner.style.height = obj.size.split("*")[1] + "px";
	}
	
	for(var i = 0;i<bannerlength;i++){
		bannerli[i].style.left = (i * 100) + "%" ;
	}
	
	//	banner 自动轮播初始化
	function bannerSwipeAuto(num){
		if(arguments[1] === "click"){
			clearInterval(timer);
			bannerSwipeRun(num);
			status = "false";
		}
		if(status === "false"){
			status = "true";
			
			if(obj.autoplay){
				timer = setInterval(function(){
							currentEdit();
							bannerSwipeRun(current);
						},obj.timer);
			}
		}
		
		//	滑动函数.
		function bannerSwipeRun(numm){
			bannerSwipe.style.left = (-numm * 100) + "%";
			bannerSwipeBarAInit(numm);
		}
	}
	
	//	current 修改器
	function currentEdit(){
		if(!obj.loop){
			if(arguments[0] === "prev"){
				current = current === 0 ? 0 : current-1;
			}else{
				current = current === bannerlength-1 ? bannerlength-1 : current+1;
			}
		}else{
			if(arguments[0] === "prev"){
				current = current === 0 ? bannerlength-1 : current-1;
			}else{
				current = current === bannerlength-1 ? 0 : current+1;
			}
		}
	}
	//	指示器 初始化
	function bannerSwipeBarInit(elem){
		var bar = banner.getElementsByClassName(elem)[0];
		var a;
		for(var i = 0;i<bannerlength;i++){
			a = document.createElement("a");
			a.setAttribute("data-index",i);
			a.onclick = function(){
				current = parseInt(this.getAttribute("data-index"));
				bannerSwipeAuto(current,"click");
			}
			bar.appendChild(a);
		}
		bannerSwipeBarAInit(0);
	}
	
	//	指示器 添加 active
	function bannerSwipeBarAInit(num){
		if(judg("pagination")){
			var bar = banner.getElementsByClassName(obj.pagination)[0],
				a = bar.getElementsByTagName("a");
			if(bar.getElementsByClassName("active").length > 0){
				bar.getElementsByClassName("active")[0].className = "";
			}
			a[num].className = "active";
		}
	}
	
	//	向前向后按钮
	function bannerGo(str){
		if(str === "left"){
			currentEdit("prev");
		}else{
			currentEdit();
		}
		bannerSwipeAuto(current,"click");
	}
	
	// 判断是否开启功能
	function judg(str){
		if(obj[str] === ""){
			return false;
		}
		return true;
	}
	
	if(judg("prev")){
		document.getElementById(obj.prev).onclick = function(){
			bannerGo("left");
		}
		document.getElementById(obj.next).onclick = function(){
			bannerGo();
		}
	}
	
	if(judg("pagination")){
		bannerSwipeBarInit(obj.pagination);
	}
	bannerSwipeAuto(0);
	
	(function(){
		var style = document.createElement("style"),
			str = "#" + obj.id + "{overflow:hidden;position:relative;}";
		str += "#" + obj.id + " ul{width:100%;list-style-type:none;position:relative;left:0;transition:ease " + obj.speed + "s;}";
		str += "#" + obj.id + " ul li{width:100%;position:absolute;}";
		str += "#" + obj.id + " ul img{width:100%;}";
		style.innerHTML = str;
		document.getElementById(obj.id).appendChild(style);
	}());
}
var obj = {
	id:"banner",
	speed:1,
	timer:2000,
	loop:true,
	autoplay:true,
	prev:"left",
	next:"right",
	pagination:"banner-swipe-bar",
	size:"600*300"
}
bannerSwipe(obj);