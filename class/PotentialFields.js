/**
 * 
 */
function Potential(w, h) {
	this.TAG = "[Potential]";
	this.bitmap = new Array(new Array());

	for ( var y = 0; y < h; y++) {
		this.bitmap[y] = new Array(w);
	}
}

Potential.prototype.clearBitmap = function() {
	for ( var y = 0, h = this.bitmap.length; y < h; y++) {
		for ( var x = 0, w = this.bitmap[y].length; x < w; x++) {
			this.bitmap[y][x] = MAP._SPACE;
		}
	}
};

/**
 * 
 * @param goalPt
 * @param obstacles
 */
Potential.prototype.updateBitmap = function(goalPt, obstacles) {
	console.log(this.TAG + " update bitmap");
	this.clearBitmap();
	this.fillObstacle(obstacles);
	this.nf1Extend(goalPt);
};

/**
 * 
 * @param obstacles
 */
Potential.prototype.fillObstacle = function(obstacles) {
	console.log(this.TAG + " fill obstacles. num:"+obstacles.length);
	var pt = new Point2D();
	for ( var i=0, o=obstacles.length; i<o; i++) {
		var obs = obstacles[i];
		var polys = obs.getPolygons();
		var conf = obs.getConf();
		console.log("\n"+obs.getName() + " has poly num:"+polys.length);
		for ( var j=0, p=polys.length; j<p; j++) {
			var poly = Transformation.transform(polys[j], conf);
			var minX = parseInt(poly.minX);
			var maxX = parseInt(poly.maxX);
			console.log("minX: "+minX+" maxX:"+maxX+" |minY: "+poly.minY+" maxY:"+poly.maxY);
			for ( var x = minX; x <= maxX; x++) {
				for ( var y = parseInt(poly.minY), maxY = parseInt(poly.maxY); y < maxY; y++) {
					//console.log(" pt: "+pt.x+" "+pt.y);
					pt.set(x, y);
					if (poly.contains(pt)) {
						this.bitmap[y][x] = MAP._BLOCK;
					}
				}
			}
		}
	}
};

Potential.prototype.nf1Extend = function(goalPt) {
	var potentialList = new Array(MAP._BLOCK);
	for(var i = 0, n=potentialList.length; i <n ; i++)
		potentialList[i] = new Array();
	
	potentialList[0].push(new Point2D(parseInt(goalPt.x), parseInt(goalPt.y)));
	
	for(var i = 0, n=potentialList.length; i<n; i++){
		for(var key in potentialList[i]){
			var tempP = potentialList[i][key];
			if (tempP.x+1 < WORLD_LENGTH && this.bitmap[tempP.y][tempP.x+1] == MAP._SPACE){
				this.bitmap[tempP.y][tempP.x+1] = i+1;
				potentialList[i+1].push(new Point2D(tempP.x+1, tempP.y));
			}
			if (tempP.x-1 >= 0 && this.bitmap[tempP.y][tempP.x-1] == MAP._SPACE){
				this.bitmap[tempP.y][tempP.x-1] = i+1;
				potentialList[i+1].push(new Point2D(tempP.x-1, tempP.y));
			}
			if (tempP.y+1 < WORLD_LENGTH && this.bitmap[tempP.y+1][tempP.x] == MAP._SPACE){
				this.bitmap[tempP.y+1][tempP.x] = i+1;
				potentialList[i+1].push(new Point2D(tempP.x, tempP.y+1));
			}
			if (tempP.y-1 >= 0 && this.bitmap[tempP.y-1][tempP.x] == MAP._SPACE){
				this.bitmap[tempP.y-1][tempP.x] = i+1;
				potentialList[i+1].push(new Point2D(tempP.x, tempP.y-1));
			}
		}
	}	
	
};

Potential.prototype.getBitmap = function() {
	return this.bitmap;
};

/*
Potential.calcPotential = function(arr, method){
	switch(method){
	case GetPotentialMethod._AVERAGE:
		var bitmap = new Array(WORLD_LENGTH);
		console.log(arr);
		//console.log(arr.length+" "+arr[0].length+" "+arr[0][0].length);
		var ctrlNum = arr.length;
		for(var y=0, h=WORLD_LENGTH; y<h; y++){
			bitmap[y] = new Array(WORLD_LENGTH);
			for(var x=0, w=WORLD_LENGTH; x<w; x++){
				//init
				bitmap[y][x] = 0;
				for(var n in arr){
					//sum of n control points
					//console.log(" bitmap["+y+"]["+x+"]:"+bitmap[y][x]+" arr["+n+"]["+y+"]["+x+"]:"+arr[n][y][x]);
					bitmap[y][x] += arr[n][y][x];
				}
				bitmap[y][x] /= ctrlNum;
			}
		}
		return bitmap;
	}
};*/

