/**
 * 
 * @param x
 * @param y
 * @returns {Point2D}
 */
function Point2D(x, y){
	if(x == null)//default x
		x = 0;
	if(y == null)//default y
		y = 0;
	
	this.x = x;
	this.y = y;
}

Point2D.prototype.getX = function(){
	return this.x;
};

Point2D.prototype.getY = function(){
	return this.y;
};

Point2D.prototype.setX = function(x){
	this.x = x;
};

Point2D.prototype.setY = function(y){
	this.y = y;
};

Point2D.prototype.setLocation = function(p){
	this.setX(p.x);
	this.setY(p.y);
};

Point2D.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
};