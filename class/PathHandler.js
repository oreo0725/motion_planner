/**
 * 
 */

function PathHandler(mpWorker) {
	this.mpWorker = mpWorker;
	this.pilotType = PILOT_TYPE.HALF;
}

/**
 * 
 */

PathHandler.prototype.smoothPath = function(robotid, pliotType) {
	var robo = this.mpWorker.robots[robotid];
	var path = this.mpWorker.pathMap[robo.getName()];
	if(path == null)
		return;
	
	console.log(robo.getName()+" smooth!!!");
	if(pliotType != null)
		this.pilotType = pliotType;
	var n1 = 0, n2 = path.length-1;
	var confList = new Array();
	this.smooth(robotid, n1, n2, path, confList);
	console.log("=============after smooth==========");
	console.log(confList);
	return confList;
};

PathHandler.prototype.smooth = function(robotid, n1, n2, path, confList) {
	//console.log(confList);
	var list;
	if (n1 != n2) {
		list = this.generatePath(path[n1], path[n2]);
		list.push(path[n2]);
		console.log("==============generatePath==========");
//		console.log(list);
		if(this.mpWorker.collisionInPath(robotid, list)){
			var pilot = this.getPilot(n1, n2);
			this.smooth(robotid, n1, pilot, path, confList);
			this.smooth(robotid, pilot+1, n2, path, confList);
		}
		else{
			console.log("no collision in path!");
			console.log("====list====");
//			console.log(list);
			for(var i=0, len=list.length; i<len; i++){
				confList.push(list[i]);
			}
		}
	} else {
		confList.push(path[n1]);
	} 
//	var b = this.generatePath(path[n1], path[n2]);
//	b.push(path[n2]);
//	for(var i = 0, len=b.length; i<len; i++){
//		confList.push(b[i]);
//	}
};

/**
 * 
 * @param c1
 * @param c2
 * @param confList
 */
// generatePath :function(c1, c2, confList){
// var x = (c1.x + c2.x)/2;
// var y = (c1.y + c2.y)/2;
// var d = (c1.degree + c2.degree)/2;
// var c = new Configuration(x, y, d);
//		
// if(this.isShortestDistance()){
// confList.push(c1);
// }else{
// this.generatePath(c1, c2, confList);
// this.generatePath(c, c2, confList);
// }
// },
PathHandler.prototype.generatePath = function(c1, c2) {
	var confList = new Array();

	if (this.isShortestDistance(c1, c2)) {
		confList.push(c1);
		return confList;
	} else {
		var x = (c1.x + c2.x) / 2;
		var y = (c1.y + c2.y) / 2;
		var d = (c1.degree + c2.degree) / 2;
		var c = new Configuration(x, y, d);

		confList = confList.concat(this.generatePath(c1, c));
		confList = confList.concat(this.generatePath(c, c2));
		
		return confList;
	}
};

/**
 * 
 * @param c1
 * @param c2
 * @returns {Boolean}
 */
PathHandler.prototype.isShortestDistance = function(c1, c2) {
	return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y)
			+ Math.abs(c1.degree - c2.degree) <= 2;
};

PathHandler.prototype.getPilot = function(n1, n2){
	console.log("type:::"+this.pilotType);
	switch(this.pilotType){
	case PILOT_TYPE._HALF:
		console.log("is --"+PILOT_TYPE._HALF);
		return parseInt((n1+n2)/2);
		
	case PILOT_TYPE._RANDOM:
		//TODO generate random int between n1 and n2
		console.log("is --"+PILOT_TYPE._RANDOM);
		var n = Math.floor(Math.random()*(n2-n1) + n1);
		console.log(n1+" "+n2+" "+n);
		return n;
		break;
	}
};