/**
 * 
 */

function Configuration(x, y, degree){
	this.base = Point2D;
	this.base(x, y);
	this.degree = (degree != null)? degree%360 : 0;
}
Configuration.prototype = new Point2D();
Configuration.prototype.constructor = Configuration;

Configuration.prototype.getDegree = function(){
	return this.degree;
};

Configuration.prototype.setDegree = function(d){
	this.degree = (d+360) % 360;
};

Configuration.prototype.setTheta = function(t){
	this.setDegree(t * 180.0 / Math.PI);
};

Configuration.prototype.getTheta = function(t){
	return this.degree * Math.PI / 180.0;
};

Configuration.prototype.setConf = function(x, y, d){
	this.x = x;
	this.y = y;
	this.degree = d;
};

Configuration.prototype.getLocation = function(){
	return new Point2D(this.x, this.y);
};