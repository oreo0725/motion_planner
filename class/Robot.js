/**
 * 
 */

function Robot(name){
	this.base = Elem;
	this.base(name);
	this.ctrlPoints = new Array();
	
	this.goalConf = new Configuration();
	
}
Robot.prototype = new Elem();
Robot.prototype.constructor = Robot;

Robot.prototype.moveTo = function(){
	this.setLocation(p);
};

Robot.prototype.setGoalConf = function(conf){
	this.goalConf = conf;
};

Robot.prototype.getGoalConf = function(){
	return this.goalConf;
};

Robot.prototype.addCtrlPoint = function(p){
	this.ctrlPoints.push(p);
};

Robot.prototype.getCtrlPts = function(){
	return this.ctrlPoints;
};

/**
 * Detect robot if intersects with other element. 
 * Robot's goal configuration is detected if isGoal is set to be true . 
 * @param elem
 * @param isGoal
 * @returns {Boolean}
 */
Robot.prototype.intersectWithElem = function(elem, isGoal){
	
	if(isGoal){
		//console.log("["+this.getName()+"]_G check intersect with ["+elem.getName()+"]");
		//console.log(elem);
		var rPolys = this.polygons;
		var oPolys = elem.getPolygons();

		for(var i=0, r=rPolys.length; i<r; i++){
			var rPoly = Transformation.transform(rPolys[i], this.getGoalConf());
			for(var j=0, o=oPolys.length; j<o; j++){
				var oPoly = Transformation.transform(oPolys[j], elem.getConf());
				if(rPoly.intersect(oPoly)){
					displayError("["+this.getName()+"]'s goal intersect with ["+elem.getName()+"]!!!!");
					return true;
				}
			}
		}
		return false;
	}else{
		return this.base.prototype.intersectWithElem.apply(this, [elem]);
	}
};

Robot.prototype.draw = function(context){
	context.strokeStyle = ColorCode.ROBOT;
	context.fillStyle = ColorCode.ROBOT;
	this.base.prototype.draw.apply(this, [context]);// extends draw function of parent's draw
	
	context.strokeStyle = ColorCode.ROBOT_GOAL;
	context.fillStyle = ColorCode.ROBOT_GOAL;
	
	for(var i=0, m=this.polygons.length; i<m; i++){
		var npoly = Transformation.transform(this.polygons[i], this.goalConf);
		var vertices = npoly.getVertices();
		var len = vertices.length;
		var firstV = null;	//the first vertex to traverse
		
		context.beginPath();
		for(var j=0, n=vertices.length; j<n; j++){
			var p = vertices[j];
			var np = Transformation.plannerToCanvas(Transformation.worldToPlanner(p));
			
			if(j == 0){	//first point
				firstV = np;
				context.moveTo(np.x, np.y);
			}else if(j == len-1){
				context.lineTo(np.x, np.y);
				context.lineTo(firstV.x, firstV.y);	//from the last link to the first
			}else{
				context.lineTo(np.x, np.y);
			}
		}
		context.closePath();
		context.stroke();
		context.fill();
	}
	context.fillStyle = ColorCode.NAME;
	context.font= 'bold';
	var textPt = Transformation.plannerToCanvas(Transformation.worldToPlanner(this.getGoalConf().getLocation()));
	context.fillText  (this.getName()+"_G", textPt.x, textPt.y);
};