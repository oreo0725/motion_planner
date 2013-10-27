var WORLD_LENGTH = 128.0;
var PLANNER_LENGTH = 128.0;
var CANVAS_LENGTH = 500.0;
var CANVAS_POTENTIAL_LENGTH = 200;

Transformation = {
	hWorld : WORLD_LENGTH,
	hWorld : WORLD_LENGTH,
	hPlanner : PLANNER_LENGTH,
	wWorld : PLANNER_LENGTH,
	hCanvas : CANVAS_LENGTH,
	wCanvas : CANVAS_LENGTH
};

Transformation.TYPE = {
	W2P: 0,
	P2C: 1,
	W2C: 2
};

Transformation.ratioW2P = PLANNER_LENGTH/WORLD_LENGTH;
Transformation.ratioW2C = CANVAS_LENGTH/WORLD_LENGTH;
Transformation.ratioP2C = CANVAS_LENGTH/PLANNER_LENGTH;

/**
 * 
 * @param p
 * @returns {___pt0}
 */
Transformation.worldToPlanner = function(p){
	var pt = new Point2D();
	//console.log("formW| x:"+p.x+" y:"+p.y);
	pt.x = p.x * this.ratioW2P;
	pt.y = p.y * this.ratioW2P;
	//console.log("toPlanner| x:"+pt.x+" y:"+pt.y);
	return pt;
};

Transformation.plannerToWorld = function(p){
	var pt = new Point2D();
	//console.log("formW| x:"+p.x+" y:"+p.y);
	pt.x = p.x / this.ratioW2P;
	pt.y = p.y / this.ratioW2P;
	//console.log("toPlanner| x:"+pt.x+" y:"+pt.y);
	return pt;
};

/**
 * 
 * @param p
 * @returns {___pt1}
 */
Transformation.plannerToCanvas = function(p){
	var pt = new Point2D();
	//console.log("formP| x:"+p.x+" y:"+p.y);
	pt.x = p.x * this.ratioP2C;
	pt.y = this.hCanvas - p.y*this.ratioP2C;
	//console.log("toCanvas| x:"+pt.x+" y:"+pt.y);
	
	return pt;
};

Transformation.canvasToPlanner = function(p){
	var pt = new Point2D();
	//console.log("formP| x:"+p.x+" y:"+p.y);
	pt.x = p.x / this.ratioP2C;
	pt.y = (this.hCanvas - p.y)/this.ratioP2C;
	//console.log("toCanvas| x:"+pt.x+" y:"+pt.y);
	
	return pt;
};

Transformation.canvasToWorld = function(p){
	return this.plannerToWorld(this.canvasToPlanner(p));
};


Transformation.affineTransform = function(p, conf){
	//var l = Math.sqrt(Math.pow((p.y-conf.y), 2) + Math.pow((p.x-conf.x), 2));
	//console.log("world| x:"+p.x+" y:"+p.y+" degree:"+conf.getDegree()+" theta:"+conf.getTheta());
	var nx = p.x* Math.cos(conf.getTheta()) - p.y* Math.sin(conf.getTheta()) + conf.x;
	var ny = p.x* Math.sin(conf.getTheta()) + p.y* Math.cos(conf.getTheta()) + conf.y;
	//console.log("after affine| x:"+nx+" y:"+ny);
	return new Point2D(nx, ny);
};

Transformation.convertPoint = function(pt, type, fSize, tSize){
	var ratio = tSize/fSize;
	var npt = new Point2D();
	npt.x = pt.x * ratio;
	npt.y = pt.y * ratio;
	if(type == this.TYPE.W2C){
		npt.y = tSize - npt.y;
	}
	return npt;
};


/**
 * Transform a polygon with a specific 2d configuration
 * @param poly
 * @param conf
 * @returns {Polygon}
 */
Transformation.transform = function(poly, conf){
	var nPoly = new Polygon();

	var vertices = poly.vertices;
	var n = vertices.length;
	
	for(var i=0; i< n; i++){
		var np = this.affineTransform(vertices[i], conf);
		nPoly.addVertex(np);
	}
	return nPoly;
};

Transformation.isInWorld = function(p){
	if(p.x < 0 || p.y < 0 || p.x > WORLD_LENGTH || p.y > WORLD_LENGTH)
		return false;
	return true;
};