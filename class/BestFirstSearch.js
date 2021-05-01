/**
 * 
 */
var DEGREE_SCALE = 5;
var DEGREE_DIM = 360/DEGREE_SCALE;

BestFirstSearch = {
	TAG : "[BestFirstSearch]  ",	
	
	searchPath :function(bitmap, robotid, mpWorker, heuristic){
		var robo = mpWorker.robots[robotid];
		var cps = robo.getCtrlPts();
		console.log(this.TAG+robo.getName()+" start find path...");
		var visitedMap = createArray(0, [WORLD_LENGTH, WORLD_LENGTH, DEGREE_DIM]); //a 3D map to record which the configuration is visited. [height][width][rotate]
		this.fillVisitedMap(false, visitedMap);
		// a array of Link to record the coordinary that has same potential. Content type:{BiLinkedNode}
		var openList = createArray(0, [MAP._BLOCK+DEGREE_DIM, 0]);	
		
		var success = false;
		
		var conf = parseIntConf(robo.configuration);
		var goalConf = parseIntConf(robo.goalConf);
		//the ideal potential that robo should get to. Ideal potential comes from goal location
		var best = bitmap[conf.y][conf.x]+ parseInt(Math.abs(goalConf.degree-conf.degree)/DEGREE_SCALE);
		//add the curr robot location into OpenList to be the first node
		var startNode = new BiLinkedNode(conf, null);
		openList[best].push(startNode);
		var fail = false;
		/**
		 * configuration of a 1-neighbour
		 */
		while(!success && !fail){
			while(openList[best].length == 0){
				best++;
				if(best > 254){
					fail = true;
					break;
				}
				
				//console.log("BEST = "+best);
			}
			if(fail){	//can't find any path
				displayError("Fail to find path for Robo["+robotid+"]!!!!" );
				return null;
			}
			//System.out.println("Best: "+best);
			var currNode = openList[best].shift();
			var currConf = currNode.node;
			
			//console.log("====x:"+currConf.x+" y:"+currConf.y+" d:"+currConf.degree+" ::best:"+best);
			//to record the neighbour's potential
			//1-neighbour check if it has collision
			for(var i in this.NEIGHBOUR_TYPE){
				//if(this.NEIGHBOUR_TYPE[i] == this.NEIGHBOUR_TYPE._D_P)
				var neighbour = this.generate1Neighbour(currConf, this.NEIGHBOUR_TYPE[i], visitedMap);
				
				//Make sure the 1-neighbour is satisfied with 2 condition:
				if(neighbour != null &&	//1. 1-neighbour is available in the map
						!mpWorker.robotCollision(robotid, neighbour)){ // 2. no collision detected
						
					var value = -1;
					//TODO add heuristic function to calculate value;
					// value = H(bitmap, neigbour, robo)
					
					var vArr = new Array();
//					if(heuristic != '' && cps != null){
//						console.log("Use heuristic:"+heuristic);
//						for(var cpi = 0, cpLen=cps.length; cpi<cpLen; cpi++){
//							var cp = cps[cpi];
//							cp = Transformation.affineTransform(cp, neighbour);
//							vArr.push(bitmap[parseInt(cp.y)][parseInt(cp.x)]);
//						}
//						value = this.heuristicFunction(vArr, heuristic);
//						//console.log(value);
//					}else{
						//console.log("Use config");
						value = bitmap[neighbour.y][neighbour.x] + parseInt(Math.abs(goalConf.degree-neighbour.degree)/DEGREE_SCALE);
//					}
					
					var newNeighbourNode = new BiLinkedNode(neighbour, currNode);
					//console.log("x:"+neighbour.x+" y:"+neighbour.y+" d:"+neighbour.degree+" ::value:["+value);
					//$('#error').append("<br/>x:"+neighbour.x+" y:"+neighbour.y+" d:"+neighbour.degree+" ::current value:"+value);
					//current configuration is set to be visited
					visitedMap[neighbour.y][neighbour.x][neighbour.degree/DEGREE_SCALE] = true;
					
					openList[value].push(newNeighbourNode);
					//if(value < best){
					if(value < best){
						best = value;
					}
					
					//if(best = 1 && Math.abs(neighbour.degree - goalConf.degree)<=DEGREE_SCALE){
					if(best <= 1){
						success = true;
						break;
					}
				}else if(neighbour != null){
					neighbour = null;
				}
			}
			
		}
		
		
		//A list of configuration, to record the back-tracing path form goal to start node.
		var path;
		
		var goalNode = openList[best].pop();
		if(success && goalNode != null){
			path = new Array();
			console.log(this.TAG+"Found available path!!!");
			for(var tempNode = goalNode; tempNode != null; tempNode = tempNode.parent){
				path.push(tempNode.getNode());
			}
			//let element order be from START to GOAL in the path list
			path.reverse();
			console.log(path);
		}
		return path;
	},
	
	/**
	 * 
	 * @param conf
	 * @param type
	 * @param visitedMap
	 * @returns
	 */
	generate1Neighbour :function(conf, type, visitedMap){
		switch(type){
		case this.NEIGHBOUR_TYPE._X_P:
			if(conf.x+1 >= WORLD_LENGTH || visitedMap[conf.y][conf.x+1][conf.degree/DEGREE_SCALE])
				return null;
			return new Configuration(conf.x+1, conf.y, conf.degree);
		
		case this.NEIGHBOUR_TYPE._X_R:
			if(conf.x-1 < 0 || visitedMap[conf.y][conf.x-1][conf.degree/DEGREE_SCALE])
				return null;
			return new Configuration(conf.x-1, conf.y, conf.degree);
		
		case this.NEIGHBOUR_TYPE._Y_P:
			if(conf.y+1 > WORLD_LENGTH || visitedMap[conf.y+1][conf.x][conf.degree/DEGREE_SCALE])
				return null;
			return new Configuration(conf.x, conf.y+1, conf.degree);
		
		case this.NEIGHBOUR_TYPE._Y_R:
			if(conf.y-1 < 0 || visitedMap[conf.y-1][conf.x][conf.degree/DEGREE_SCALE])
				return null;
			return new Configuration(conf.x, conf.y-1, conf.degree);
		
		case this.NEIGHBOUR_TYPE._D_P:
			var d = conf.degree + DEGREE_SCALE;
			if(d >= 360)
				d -= 360;
			if(visitedMap[conf.y][conf.x][d/DEGREE_SCALE])
				return null;
			return new Configuration(conf.x, conf.y, d);
		
		case this.NEIGHBOUR_TYPE._D_R:
			var d = conf.degree - DEGREE_SCALE;
			if(d < 0)
				d += 360;
			if(visitedMap[conf.y][conf.x][d/DEGREE_SCALE])
				return null;
			return new Configuration(conf.x, conf.y, d);
		}
		return null;
	},
	
	NEIGHBOUR_TYPE :{
		_X_P: "x+1",
		_X_R: "x-1",
		_Y_P: "y+1",
		_Y_R: "y-1",
		
		_D_P: "degree+",
		_D_R: "degree-"
	},
	
	heuristicFunction :function(vArr, hType){
		var v = 0;
		var len = vArr.length;
		switch(hType){
		case HeuristicType._AVERAGE:
			for(var i=0; i<len; i++){
				v += vArr[i];
			}
			v /= len;
			break;
		case HeuristicType._HEAD_FIRST:
			var t = 0;
			for(var i=len; i>0; i--){
				v += vArr[len-i]*i;
				t += i;
			}
			//console.log("v="+v+" t="+t);
			v /= t;
			break;
			
		case HeuristicType._TAIL_FIRST:
			var t = 0;
			for(var i=1; i<=len; i++){
				v += vArr[i-1]*i;
				t += i;
			}
			v /= t;
			break;
		}
		return parseInt(v);
	},
	
	fillVisitedMap :function(value, map3d){
		for(var i=0, h=map3d.length; i< h; i++){
			for(var j=0 , w=map3d[i].length; j< w; j++){
				for(var k=0 , d=map3d[i][j].length; k< d; k++){
					map3d[i][j][k] = value;
				}
			}
		}
	}
	
	//TODO target need to be changed
	
};
