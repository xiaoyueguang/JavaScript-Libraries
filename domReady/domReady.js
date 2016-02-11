//	不兼容 IE, 也没有去想兼容 IE
function domReady(fn){
	document.addEventListener("DOMContentLoaded",function(){
		fn();
	});
}