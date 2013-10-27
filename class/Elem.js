function Elem(name){
	this.configuration = new Configuration();
	this.name = (name != null)? name : "";
	this.polygons = new Array();

}

Elem.prototype.getName = function(){
	return this.name;
};

Elem.prototype.setName = function(name){
	this.name = name;
};

Elem.prototype.setConf = function(conf){
	this.configuration = conf;
};

Elem.prototype.getConf = function(){
	return this.configuration;
};

Elem.prototype.addPolygon = function(polygon){
	this.polygons.push(polygon);
};

Elem.prototype.getPolygons = function(){
	return this.polygons;
};

Elem.prototype.intersectWithElem = function(elem){
	//console.log("["+this.getName()+"]check intersect with ["+elem.getName()+"]");
	//console.log(elem);
	var rPolys = this.polygons;
	var oPolys = elem.getPolygons();

	for(var i=0, m=rPolys.length; i<m; i++){
		var rPoly = Transformation.transform(rPolys[i], this.getConf());
		for(var j=0, n=oPolys.length; j<n; j++){
			var oPoly = Transformation.transform(oPolys[j], elem.getConf());
			if(rPoly.intersect(oPoly)){
				displayError("["+this.getName()+"] intersects with ["+elem.getName()+"]!!!!!");
				return true;
			}
		}
	}
	return false;
};

Elem.prototype.draw = function(context){
	var conf = this.configuration;
	for(var i=0, m=this.polygons.length; i<m; i++){
		var npoly = Transformation.transform(this.polygons[i], conf);
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
	var textPt = Transformation.plannerToCanvas(Transformation.worldToPlanner(this.getConf().getLocation()));
	context.fillText(this.getName(), textPt.x, textPt.y);
};

