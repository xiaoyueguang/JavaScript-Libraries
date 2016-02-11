## banner-Swipe
##### 这是一个基于 原生的JavaScript 的 banner滑动插件

***

#### 使用方法
1、  引入 `bannerSwipe.js` 文件  
2、	 HTML 的结构如下  

<!---->	
	<!--整体结构 需要设置id-->
    <div id = "ID">
    	<ul>
    		<li>
				... content
			</li>
		</ul>
		
		<!--如果需要设置向前向后按钮, 需要设置ID-->
		<span id = "left"></span>
		<span id = "right"></span>
		
		<!--如果需要分页器 需要设置类名-->
		<div class="className">
			
		</div>
	</div>

3、  初始化函数  

<!---->	 
    bannerSwipe({  

    	//	ID  
		id:"ID",  
		//	设置 banner 长宽  
		size:"500*300",
		//	设置轮播时间,默认 3000(单位:毫秒)  
		timer:2000,  
		//	设置轮播速度,默认 0.5(单位:秒)  
		speed:0.5,
		//	设置循环,默认循环开启  
		loop:true,  
		//	设置自动轮播,默认自动轮播  
		autoplay:true,    
		//	设置向前向后按钮  
		prev:"left",  
		next:"right",  
		//	设定分页器,输入类名  
		pagination:"className"  
	});  
	
4、	CSS 样式 需要设置 整体框架的位置,分页器(分页器 类名为bar的容器 和 该类名下的 a 元素)和按钮

<br/>
##例子
	<div id="banner" class="banner">
		<ul class="banner-swipe">
			<li>
				<!--测试图片-->
				<img src="../resources/1.jpg"/>
			</li>
			<li>
				<!--测试图片-->
				<img src="../resources/2.jpg"/>
			</li>
			<li>
				<!--测试图片-->
				<img src="../resources/3.jpg"/>
			</li>
			<li>
				<!--测试图片-->
				<img src="../resources/4.jpg"/>
			</li>
		</ul>
		<div class="banner-swipe-bar">
		</div>
	</div>
	<br/>
	<button id="left">左</button>
	<button id="right">右</button>
	<br/>
	<style>
		div,ul,body,li,img {
			padding:0;
			margin:0;
		}
		.banner {
			margin:0 auto;
		}
		.banner-swipe-bar {
			position:absolute;
			bottom:10px;
		}
		.banner-swipe-bar a {
			height:10px;
			width:10px;
			border-radius:50%;
			background:#d3d3d3;
			display:inline-block;
			margin-right:10px;
		}
		.banner-swipe-bar a.active {
			background:#f23b22;
		}
	</style>
	<script>
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
	</script>