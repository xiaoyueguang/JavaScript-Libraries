//window.onload = function(){
	var	banner = document.getElementById("banner");
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
			console.log("这里执行")
			status = "true";
			timer = setInterval(function(){
						current ++;
						bannerSwipeRun(current);
					},3000);
		}
		
		//	滑动函数.
		function bannerSwipeRun(numm){
			if(numm === bannerlength){
				numm = 0;
			}
			current = numm;
			bannerSwipe.style.left = (-numm * 100) + "%";
			bannerSwipeBarAInit(numm);
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
				var index = this.getAttribute("data-index");
				bannerSwipeAuto(index,"click");
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
			if(current === 0){
				current = bannerlength;
			}
			current--;
		}else{
			current ++;
		}
		bannerSwipeAuto(current,"click");
	}
	
	bannerSwipeBarInit();
	bannerSwipeAuto(0);
//};