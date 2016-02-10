//window.onload = function(){
	var	banner = document.getElementById("banner");
		bannerSwipe = banner.getElementsByClassName("banner-swipe")[0],
		bannerSwipeLeft = window.getComputedStyle(bannerSwipe).left,
		bannerli = banner.getElementsByTagName("li"),
		bannerlength = bannerli.length,
		current = 0;
	
	for(var i = 0;i<bannerlength;i++){
		bannerli[i].style.left = (i * 100) + "%" ;
	}
	
	//	滑动函数.
	function bannerSwipeRun(num){
		if(num === bannerlength){
			current = num = 0;
		}
		current = num;
		bannerSwipe.style.left = (-num * 100) + "%";
		bannerSwipeBarAInit(num);
	}
	
	//	banner 自动轮播初始化
	function bannerSwipeAuto(){
		setInterval(function(){
			current ++;
			bannerSwipeRun(current);
		},3000);
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
				bannerSwipeRun(index);
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
		bannerSwipeRun(current);
	}
	
	bannerSwipeBarInit();
	bannerSwipeAuto();
//};