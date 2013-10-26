var setGoal = false;
var pickedElem = null;
var _framerate = 30;
var originalTheta = null;

function MotionPlanner(canvas){
	this.TAG = "[MotionPlanner]";
	
	//the main canvas
	this.mCanvas = (canvas != null)? canvas: null;	
	//canvas for draw the potential fields, one potential canvas just for one robot
	this.canvasPF = new Array();	
	this.bitmap = new Array();
	
	this.robots = new Array();
	this.obstacles = new Array();
	
	//one potential field for one robot
	this.potentialMap = new Array();
	//
	this.pathMap = new Array();
	//number of path
	this.pathNum = 0;	
	//is to show path
	this.showPath = false;
	//is showing animation?
	this.animating = false;
	//save playing animation state
	this.animFinish = 0;
	
}

MotionPlanner.prototype.STATE = {
	_NOT_ENOUGH_DATA: "Map data is not ready.",
	_COLLIDED: "There is collision.",
	_LOADED_DATA: "Data of map is ready.",
	_READY_FOR_SEARCH: "Ready for search path.",
	_SEARCHING: "Searching for robot path.",
	_HAS_PATH: "Found a path to goal.",
	_ANIMATING: "Playing animation."
};

MotionPlanner.prototype.init = function(){
	if(this.mCanvas == null){
		console.log("canvas isn't set. Can't set events");
		return;
	}
	
	this.setState(this.STATE._NOT_ENOUGH_DATA);
	
	this.mCanvas.addEventListener('mousedown', mouseDownHandler, false);
	this.mCanvas.addEventListener('mousemove', mouseMoveHandler, false);
	this.mCanvas.addEventListener('mouseup', mouseReleaseHandler, false);
	//avoid popup context menu by right click on canvas
	this.mCanvas.oncontextmenu = function(){ return false; };
};

MotionPlanner.prototype.load = function(elemArr){
	this.setState(this.STATE._NOT_ENOUGH_DATA);
	if(elemArr.length > 0){
		if(elemArr[0] instanceof Robot){
			this.robots = elemArr;
			if(this.potentialMap != null && this.potentialMap.length >0){
				//reset potentialMap if reload robot
				this.potentialMap = new Array();
			}
			console.log("mp added robots.."+elemArr.length);
		}else if(elemArr[0] instanceof Obstacle){
			this.obstacles = elemArr;
			console.log("mp added obstacles.."+elemArr.length);
		}
		this.repaint();
	}
	
	if(this.isReady()){
		this.pathMap = new Array(this.robots.length);
		if(this.hasCollision()){
			this.setState(this.STATE._COLLIDED);
		}else{
			this.setState(this.STATE._LOADED_DATA);
		}
	}
};

MotionPlanner.prototype.repaint = function(){
	if(this.mCanvas == null){
		console.log("canvas isn't set in Motion Planner");
		return;
	}
	this.mCanvas.width = this.mCanvas.width; 
	var context = this.mCanvas.getContext("2d");
	for(var i=0, len=this.robots.length; i<len; i++){
		//console.log("in robot:"+i);
		this.robots[i].draw(context);
	}
	
	for(var i=0, len=this.obstacles.length; i<len; i++){
		//console.log("in obstacle:"+i);
		this.obstacles[i].draw(context);
	}
	
	if(this.pathMap != null && this.showPath){
		this.drawPath(context);
	}
};

MotionPlanner.prototype.onPick = function(p){
	var elem;
	var poly;
	var npoly;
	var tempC = null;
	p = Transformation.plannerToWorld(Transformation.canvasToPlanner(p));
	//check the picked target if is a Robot
	for(var i=0, m=this.robots.length; i<m; i++){
		elem = this.robots[i];
		var polys = elem.getPolygons();
		var conf = elem.getConf();
		var goalConf = elem.goalConf;
		for(var j=0, n=polys.length; j<n; j++){
			poly = polys[j];
			npoly = Transformation.transform(poly, conf);
			//check Robot's current position
			if(npoly.contains(p)){
				pickedElem = elem;
				tempC = conf;
				setGoal = false;
				console.log("in a Robo: "+ elem.getName());
				break;
			}
			//check Robot's goal position
			npoly = Transformation.transform(poly, goalConf);
			if(npoly.contains(p)){
				pickedElem = elem;
				tempC = goalConf;
				setGoal = true;
				console.log("in a Robo's goal: "+ elem.getName());
				break;
			}
		}
	}
	if(pickedElem == null){
		//check the picked target if is an Obstacle
		for(var i=0, m=this.obstacles.length; i<m; i++){
			elem = this.obstacles[i];
			var polys = elem.getPolygons();
			var conf = elem.getConf();
			for(var j=0, n=polys.length; j<n; j++){
				poly = polys[j];
				poly = Transformation.transform(poly, conf);
				//console.log(poly);
				if(poly.contains(p)){
					pickedElem = elem;
					tempC = conf;
					originalTheta = conf.getTheta();
					setGoal = false;
					console.log("in a Obs: "+ elem.getName());
					break;
				}
			}
		}
	}
	
	if(pickedElem != null){
		console.log("originalTheta= "+originalTheta);
		//store the original theta when clicked
		originalTheta = tempC.getTheta();
	}
	console.log(pickedElem);
	console.log("click on =="+p.x+" "+p.y);
};

/**
 * 
 * @param p0 the current location of cursor
 * @param p1 the previous location of cursor 
 * @param clickPt the location that mouse clicked
 * @param isRotate
 */
MotionPlanner.prototype.onMove = function(p0, p1, clickPt, isRotate){
	//$("#error").html("move =="+p0.x+" "+p0.y);
	if(pickedElem != null){
		//console.log(pickedElem);
		
		//Transfer
		if(!isRotate){
			$("#error").html("transfer: "+p0.x+" "+p0.y);
			//transform the canvas point into world configuration
			p0 = Transformation.canvasToWorld(p0);
			p1 = Transformation.canvasToWorld(p1);
			var dx = p1.x - p0.x;
			var dy = p1.y - p0.y;
			
			var op; //original point
			if(setGoal){
				op = pickedElem.goalConf.getLocation();
				pickedElem.goalConf.setLocation(new Point2D(op.x-dx, op.y-dy));
			}else{
				op = pickedElem.getConf().getLocation();
				pickedElem.configuration.setLocation(new Point2D(op.x-dx, op.y-dy));
			}
		}else{
			//rotate case
			//FIXME: rotate theta not correct
			$("#error").html("rotate: "+p0.x+" "+p0.y);
			var elemPt;
			clickPt = Transformation.canvasToWorld(clickPt);
			var dt1;// = getThetaBetween(p0, clickPt);
			var dt2;
			var dt;
			//var theta = 
			if(setGoal){
				elemPt = Transformation.affineTransform(new Point2D(0, 0), pickedElem.goalConf);
				elemPt = Transformation.plannerToCanvas(Transformation.worldToPlanner(elemPt));
				dt1 = getThetaBetween(p1, elemPt);	//theta between mouse clicked location and center of elem
				dt2 = getThetaBetween(p0, elemPt); //theta between current mouse location and center of elem
				dt = pickedElem.goalConf.getTheta() + (dt2 - dt1);
				pickedElem.goalConf.setTheta(dt);
			}else{
				elemPt = Transformation.affineTransform(new Point2D(0, 0), pickedElem.configuration);
				elemPt = Transformation.plannerToCanvas(Transformation.worldToPlanner(elemPt));
				dt1 = getThetaBetween(p1, elemPt);	//theta between mouse clicked location and center of elem
				dt2 = getThetaBetween(p0, elemPt); //theta between current mouse location and center of elem
				dt = pickedElem.configuration.getTheta() + (dt2 - dt1);
				pickedElem.configuration.setTheta(dt);
			}
			console.log("rotote theta= "+dt*180/Math.PI);
		}
		this.collisionDetected(pickedElem, setGoal);
//		if(pickedElem instanceof Robot)
//			if(BestFirstSearch.foundCollision(pickedElem, this.obstacles, pickedElem.configuration))
//				displayError("["+pickedElem.getName()+"] collision!!!!!!");;
	}

};

MotionPlanner.prototype.onRelease = function(p){
	//console.log("release on =="+p.x+" "+p.y);
	if(pickedElem != null){
		if(this.hasCollision()){
			this.setState(this.STATE._COLLIDED);
		}else{
			this.setState(this.STATE._READY_FOR_SEARCH);
			if(setGoal || pickedElem instanceof Obstacle)
				this.updatePotentialFields();
		}
		this.repaint();
		pickedElem = null;
		setGoal = false;
	}
	//console.log(this.robots.length);
	//console.log(this.obstacles.length);
};

/**
 * 
 */
MotionPlanner.prototype.updatePotentialFields = function(){
	console.log(this.TAG + "show potential..");
	var goalPt;
	for ( var i = 0, m = this.robots.length; i < m; i++) {
		goalPt = this.robots[i].goalConf.getLocation();
		var roboName = this.robots[i].getName();
		var ctrlPts = this.robots[i].getCtrlPts();

		/*
		 * var pfs = this.potentialMap[roboName]; if(pfs == null){
		 * console.log("potential field for ["+roboName+"] is not init.. Now
		 * creating"); //this.potentialMap[roboName] = new Array(ctrlNum); pfs =
		 * this.potentialMap[roboName]; }
		 */

		// for(var j=0; j<ctrlNum; j++){
		var pf = new Potential(WORLD_LENGTH, WORLD_LENGTH);
		pf.updateBitmap(goalPt, this.obstacles);
		this.potentialMap[roboName] = pf;
		// }
		// this.potentialMap[roboName] = Potential.calcPotential(pfBitmapArr,
		// potentialMethod);
		var canvas = this.canvasPF[roboName];
		if (canvas == null) {
			console.log("potential canvas for [" + roboName + "] is not set.. Now creating");
			canvas = createPFCanvas(roboName);
			this.canvasPF[roboName] = canvas;
		}
		// TODO draw potential in canvas
		this.drawPotential(roboName);
	}
};

MotionPlanner.prototype.findPath = function(param){
	this.pathNum = 0;
	var searchAlgorithm = param["searchAlgorithm"];
	switch(searchAlgorithm){
	case SearchAlgorithm._BFS :
		var heuristic = param["heuristic"];
	
		var robo;
		var bitmap;
		console.log(this);
		for(var i=0, m=this.robots.length; i<m; i++){
			robo = this.robots[i];
			bitmap = this.potentialMap[robo.getName()].getBitmap();
			console.log(robo.getName()+"'s bitmap");
			console.log(bitmap);
			this.pathMap[robo.getName()] = BestFirstSearch.searchPath(bitmap, i, this, heuristic);
			//console.log("PathMap:"+robo.getName()+" "+this.pathMap[robo.getName()]);
			if(this.pathMap[robo.getName()] != null)
				this.pathNum++;
		}
		break;
	}
	
	if(this.pathNum > 0){
		this.setState(this.STATE._HAS_PATH);
	}
//	if(this.pathMap[robo.getName()] == null){
//		console.error("Can't find path");
//		return;
//	}
	
};

MotionPlanner.prototype.smoothPath = function(pliotType){
	for(var i=0, len=this.robots.length; i<len; i++){
		var robo = this.robots[i];
		var path = this.pathMap[robo.getName()];
		
		var smoother = new PathHandler(this);
		this.pathMap[robo.getName()] = smoother.smoothPath(i, pliotType);
	}
	this.repaint();
};


MotionPlanner.prototype.drawPotential = function(roboName){
//	if(!this._update){
//		PotentialFields.updateBitmap();
//	}
	console.log(this.TAG + "draw potential for ["+roboName+"]");
	var canvas = this.canvasPF[roboName];
	if(canvas == null){
		console.error("potential canvas for ["+roboName+"] is not created.");
		return;
	}
	
	//get average potential of bitmap for each control point
	var bitmap = this.potentialMap[roboName].getBitmap();
		
	//console.log(bitmap);
	if(bitmap == null){
		console.error("potential bitmap for ["+roboName+"] is not init.");
		return;
	}
	
	canvas.witdh = CANVAS_POTENTIAL_LENGTH;
	var ctx = canvas.getContext("2d");
	var r = CANVAS_POTENTIAL_LENGTH/WORLD_LENGTH;
	for(var y=0, h=bitmap.length; y<h; y++){
		for(var x=0, w=bitmap[y].length; x<w; x++){
			//console.log("x:"+x+" y:"+y+" :"+bitmap[y][x]);
			//ctx.fillStyle='hsl(240, ' + (bitmap[y][x]/255*100) + '%, 80%)';
			//ctx.fillRect(x,y,1,1);
			//if(bitmap[y][x]== MAP._BLOCK){
				var ptOnCanvas = Transformation.convertPoint(new Point2D(x, y), Transformation.TYPE.W2C, WORLD_LENGTH, canvas.width);
				ctx.fillStyle='hsl(240,' + (bitmap[y][x]/255*100) + '%,' + (bitmap[y][x]/255*100) + '%)';
				ctx.fillRect(ptOnCanvas.x, ptOnCanvas.y, r, r);
			//}
		}
	}

};

MotionPlanner.prototype.drawPath = function(context){
	console.log(this.robots.length);
	context.strokeStyle = ColorCode.PATH;
	for(var i=0, len=this.robots.length; i<len; i++){
		//console.log("i:"+i+" len:"+len);
		var robo = this.robots[i];
		var path = this.pathMap[robo.getName()];
		if(path == null)//this robo hasn't found path yet
			continue;
		for(var j=0, m=path.length; j<m; j++){
			var conf = path[j];
			var polys = robo.getPolygons();
			for(var k=0, n=polys.length; k<n; k++){
				var npoly = Transformation.transform(polys[k], conf);
				var vertices = npoly.getVertices();
				var vlen = vertices.length;
				var firstV = null;	//the first vertex to traverse
				
				context.beginPath();
				for(var l=0, a=vertices.length; l<a; l++){
					var p = vertices[l];
					var np = Transformation.plannerToCanvas(Transformation.worldToPlanner(p));
					
					if(l == 0){	//first point
						firstV = np;
						context.moveTo(np.x, np.y);
					}else if(l == vlen-1){//last point
						context.lineTo(np.x, np.y);
						context.lineTo(firstV.x, firstV.y);	//from the last link to the first
					}else{
						context.lineTo(np.x, np.y);
					}
				}
				context.closePath();
				context.stroke();
				//context.fill();
			}
		}
		
	}
};

/**
 * For detect collision between robots and obstacles
 * @returns {Boolean}
 */
MotionPlanner.prototype.hasCollision = function(){
	for(var i=0, len=this.robots.length; i<len; i++){
		var robo = this.robots[i];
		var conf = robo.getConf();
		//var goalConf = robo.getGoalConf();
		if(this.collisionDetected(robo, true) || this.collisionDetected(robo, false))
			return true;
	}
	return false;
};

MotionPlanner.prototype.collisionDetected = function(elem, isGoal){
	//console.log(this.TAG+elem.getName()+" start detect collision.. isGoal:"+isGoal);
	
	if(elem instanceof Robot){
		var obs;
		for(var i=0, len=this.obstacles.length; i<len; i++){
			obs = this.obstacles[i];
			if(elem.intersectWithElem(obs, isGoal)){
				
				return true;
			}
		}
	}else if(elem instanceof Obstacle){
		var robo;
		for(var i=0, len=this.robots.length; i<len; i++){
			robo = this.robots[i];
			if(elem.intersectWithElem(robo)){
				
				return true;
			}
		}
	}
	return false;
};

MotionPlanner.prototype.collisionInPath = function(robotid, confList){
	console.log(this.TAG+"start detect collision..");
	for(var i=0, len=confList.length; i<len; i++){
		if(this.robotCollision(robotid, confList[i]))
			return true;
	}
	return false;
};


/**
 * 
 * @param robotid
 * @param roboConf
 * @returns {Boolean}
 */
MotionPlanner.prototype.robotCollision = function(robotid, roboConf){
	//console.log(this.TAG+robo.getName()+" start detect collision ======");
	var rPolys = this.robots[robotid].getPolygons();
	var conf = (roboConf != null)? roboConf : null; 
	var obstacles = this.obstacles;
	for(var i=0, len1=rPolys.length; i<len1; i++){
		var rPoly = Transformation.transform(rPolys[i], conf);
		for(var n=0, on=obstacles.length; n<on; n++){
			//console.log(this.TAG+robo.getName()+" check collision with "+obstacles[n].getName());
			var oPolys = obstacles[n].getPolygons();
			for(var j=0, len2=oPolys.length; j<len2; j++){
				var oPoly = Transformation.transform(oPolys[j], obstacles[n].getConf());
				if(rPoly.intersect(oPoly))
					return true;
			}
		}
	}
	return false;
};

MotionPlanner.prototype.showAnimation = function(){
	//var worker = new Array();
	this.setState(this.STATE._ANIMATING);
	
	var _this = this;
	for(var i=0, r=this.robots.length; i<r; i++){
		var robo = this.robots[i];
		var path = this.pathMap[robo.getName()];

		if(path != null && path.length > 0){
			//create worker to run loop
			var worker = new Worker('./class/AnimationWorker.js');
	        worker.addEventListener('message', function(event) {
	        	if(event.data == "finish"){
	        		console.log("finish:"+_this.animFinish+" pathNum:"+_this.pathNum);
	        		if(++_this.animFinish == _this.pathNum){
	        			_this.animFinish = 0;
	        			_this.setState(_this.STATE._HAS_PATH);
	        		}
	        		return;
	        	}
	        	
	            var index = event.data["confNum"];
	            var id = event.data["robotid"];
	            //console.log(id+" worker:"+index);
	            
	            var robo = _this.robots[id];
	    		var roboName = robo.getName();
	    		var path = _this.pathMap[robo.getName()];
	            
	            robo.setConf(path[index]);
	            _this.repaint();
	        });
	
	        worker.addEventListener('error', function(event) {
	            console.error(event.message, event);
	        });
	        
        worker.postMessage({robotid: i, confNum: path.length, sleep: _framerate});
		}
	}
};

MotionPlanner.prototype.isReady = function(){
	return this.robots.length > 0 && this.obstacles.length > 0;
};

MotionPlanner.prototype.setState = function(state){
	switch(state){
	case this.STATE._NOT_ENOUGH_DATA:
		console.log("state:"+this.STATE._NOT_ENOUGH_DATA);
		UIControl.onCanSearch(false);
		this.showPath = false;
		break;
		
	case this.STATE._COLLIDED:
		console.log("state:"+this.STATE._COLLIDED);
		UIControl.onCollided();
		this.pathMap = new Array();
		this.showPath = false;
		break;
		
	case this.STATE._LOADED_DATA:
		console.log("state:"+this.STATE._LOADED_DATA);
		UIControl.onCanSearch(true);
		this.showPath = false;
		break;
		
	case this.STATE._READY_FOR_SEARCH:
		console.log("state:"+this.STATE._READY_FOR_SEARCH);
		UIControl.onCanSearch(true);
		this.animFinish = 0;
		this.showPath = false;
		break;
		
	case this.STATE._SEARCHING:
		console.log("state:"+this.STATE._SEARCHING);
		UIControl.onCanControl(false);
		break;
		
	case this.STATE._HAS_PATH:
		console.log("state:"+this.STATE._HAS_PATH);
		UIControl.onHasPath();
		this.showPath = true;
		this.repaint();
		break;
		
	case this.STATE._ANIMATING:
		console.log("state:"+this.STATE._ANIMATING);
		UIControl.onCanControl(false);
		this.showPath = false;
		break;
	
	}
};