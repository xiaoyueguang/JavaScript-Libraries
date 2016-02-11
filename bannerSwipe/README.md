## banner-Swipe
##### 这是一个基于 原生的JavaScript 的 banner滑动插件

***

#### 使用方法
1.  引入 `bannerSwipe.js` 文件  
2.  HTML 的结构如下  

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

3.  初始化函数  
<!---->
<!---->
`
    bannerSwipe({  

    	//	ID  
		id:"ID",  
		//	设置轮播时间,默认 3000(单位:毫秒)  
		speed:2000,  
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
`

测试