
var clear;

if(clear){
	clearTimeout(clear);
}
clear = timer(time);

function timer(time){
	return setTimeout(function(){
		console.log(1);
	}, time)
}