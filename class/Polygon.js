function Polygon(){
	this.vertices = new Array();
	
	this.minX = 0;
	this.maxX = 0;
	this.minY = 0;
	this.maxY = 0;
	
}

Polygon.prototype.updateEndPt = function(){
	var n = this.vertices.length;
	if(n>0){
		this.maxX = this.minX = this.vertices[0].x;
		this.maxY = this.minY = this.vertices[0].y;
		for(var i=1, n=this.vertices.length, vtxs = this.vertices; i<n; i++){
			this.maxX = max(this.maxX, vtxs[i].x);
			this.minX = min(this.minX, vtxs[i].x);
			this.maxY = max(this.maxY, vtxs[i].y);
			this.minY = min(this.minY, vtxs[i].y);
		}
	}
};

Polygon.prototype.addVertex = function(p){
	this.vertices.push(p);
	this.updateEndPt();
};

Polygon.prototype.getVertexNum = function(){
	return this.vertices.length;
};

Polygon.prototype.getVertices = function(){
	return this.vertices;
};

/**
 * Determine if the point is locate in this polygon
 * @param p the point
 * @returns {Boolean}  
 * */
Polygon.prototype.contains = function(p){
	var vtxs = this.vertices;
	var vtxNum = vtxs.length;
	
	var bool = false;
	for(var i=0, j=vtxNum-1; i< vtxNum; j = i++){
		var q1 = vtxs[i];
		var q2 = vtxs[j];
		if((q1.y > p.y)!=(q2.y > p.y) &&  p.x <(q2.x - q1.x)*(p.y-q1.y)/(q2.y-q1.y) + q1.x)
			bool = !bool;
	}
	return bool;
};

Polygon.prototype.intersect = function(poly){
	var vtxs1 = this.vertices;
	var vtxNum1 = vtxs1.length;
	
	var vtxs2 = poly.getVertices();
	var vtxNum2 = vtxs2.length;
	
	for(var i=0, j=i+1; i< vtxNum1; i++){
		//out of bounding
		if(isOutOfBound(vtxs1[i]))
			return true;
		
		var p1 = vtxs1[i];
		var p2 = vtxs1[j%vtxNum1];
		j++;
		for(var m=0, n=m+1; m< vtxNum2; m++){
			var q1 = vtxs2[m];
			var q2 = vtxs2[n%vtxNum2];
			//console.log("i:"+i+" j:"+j%vtxNum2);
			n++;
			if(segementsInterset(p1, p2, q1, q2))
				return true;
		}
	}
	
	if(this.contains(vtxs2[0]) || poly.contains(vtxs1[0]))
		return true;
	return false;
};
//Polygon.prototype.getMinX = function(){
//	var minX = this.vertices[0].x;
//	for(var i=1, n=this.vertices.length, vtxs = this.vertices; i<n; i++){
//		minX = Math.min(minX, vtxs[i].x);
//	}
//};
//
//Polygon.prototype.getMaxX = function(){
//	var maxX = this.vertices[0].x;
//	for(var i=1, n=this.vertices.length, vtxs = this.vertices; i<n; i++){
//		maxX = Math.max(manX, vtxs[i].x);
//	}
//};
//
//Polygon.prototype.getMinX = function(){
//	var minX = this.vertices[0].x;
//	for(var i=1, n=this.vertices.length, vtxs = this.vertices; i<n; i++){
//		minX = Math.min(minX, vtxs[i].x);
//	}
//};
//
//Polygon.prototype.getMaxY = function(){
//	return 
//};
