/**
 * 
 */
var times;
var index = 0;
var tid;

self.addEventListener('message', function(e) {
	var sleep = e.data["sleep"];
	var id = e.data["robotid"];
	times = e.data["confNum"];
	var name = e.data["name"];
	tid = setInterval(function(){
		drawLoop(id);
		}, sleep);
	//self.postMessage("AA");
}, false); 

function drawLoop(id){
	
	self.postMessage({robotid: id, confNum: index});
	if(++index == times){
		self.postMessage("finish");
		clearInterval(tid);
		return;
	}
	
}

