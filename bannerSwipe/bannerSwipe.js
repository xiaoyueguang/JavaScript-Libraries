//window.onload = function(){

//	封装到构造函数
function bannerSwipe(config){
	//	参数设定
	var obj = {};
	function setObj(argu,val){
		obj[argu] = config[argu] === undefined ? val : config[argu];
	}
	//	设定ID
	setObj("id","banner");
	//	设定速度
	setObj("speed",3000);
	//	设定是否循环
	setObj("loop",true);
	//	设定是否自动播放
	setObj("autoplay",true);
	
	
	console.log(obj);
	
	
	var	banner = document.getElementById(obj.id),
		bannerSwipe = banner.getElementsByClassName("banner-swipe")[0],
		bannerSwipeLeft = window.getComputedStyle(bannerSwipe).left,
		bannerli = banner.getElementsByTagName("li"),
		bannerlength = bannerli.length,
		current = 0,
		timer = '',
		status = "false";
		
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
						},obj.speed);
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
	function bannerSwipeBarInit(){
		var bar = banner.getElementsByClassName("banner-swipe-bar")[0];
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
		var bar = banner.getElementsByClassName("banner-swipe-bar")[0],
			a = bar.getElementsByTagName("a");
		if(bar.getElementsByClassName("active").length > 0){
			bar.getElementsByClassName("active")[0].className = "";
		}
		a[num].className = "active";
	}
	
	//	左右按钮
	function bannerGo(str){
		if(str === "left"){
			currentEdit("prev");
		}else{
			currentEdit();
		}
		bannerSwipeAuto(current,"click");
	}
	
	bannerSwipeBarInit();
	bannerSwipeAuto(0);
	document.getElementById("left").onclick = function(){
		bannerGo("left");
	}
	document.getElementById("right").onclick = function(){
		bannerGo();
	}
}