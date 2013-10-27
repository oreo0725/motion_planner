/**
 *
**/

function Obstacle(name){
	this.base = Elem;
	this.base(name);
	
}

Obstacle.prototype = new Elem();
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.draw = function(context){
	context.strokeStyle = ColorCode.OBSTACLE;
	context.fillStyle = ColorCode.OBSTACLE;
	this.base.prototype.draw.apply(this, [context]);
	
};

Obstacle.prototype.intersectWithElem = function(elem){
	if(elem instanceof Robot){
		//console.log("["+this.getName()+"]check intersect with ["+elem.getName()+"]");
		//console.log(elem);
		var mPolys = this.polygons;
		var mPoly;
		var yPolys = elem.getPolygons();
		var yPoly;
	
		for(var i=0, m=mPolys.length; i<m; i++){
			mPoly = Transformation.transform(mPolys[i], this.getConf());
			for(var j=0, y=yPolys.length; j<y; j++){
				yPoly = Transformation.transform(yPolys[j], elem.getConf());
				if(mPoly.intersect(yPoly)){
					displayError("["+this.getName()+"] intersects with ["+elem.getName()+"]!!!!!");
					return true;
				}
				yPoly = Transformation.transform(yPolys[j], elem.getGoalConf());
				if(mPoly.intersect(yPoly)){
					displayError("["+this.getName()+"] intersects with ["+elem.getName()+"]'s goal!!!!!");
					return true;
				}
			}
		}
	}else{
		this.base.prototype.intersectWithElem.apply(this, [elem]);
	}
	return false;
	
};