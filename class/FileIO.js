/**
 * Read data from file or output data to file
 */

function isFileExist(file){
	
}

/**
 * 
 * @param ajaxData
 * @returns {Array}
 */
function createRobotFromData(ajaxData){
	var robots = new Array();
	
	try{
		var str = ajaxData.split("\t");
		var index = 0;
		//Number of robot
		var roboNum = str[index];
		//$("#con").append("<br/>roboNum: "+roboNum+"<br/>");
		//Read data of each robot
		for(var i_roboNum = 0; i_roboNum < roboNum; i_roboNum++){
			var robo = new Robot("Robo"+i_roboNum);
			//number of polygon
			var polyNum = str[++index];
			//$("#con").append("polyNum: "+polyNum+"<br/>");
			
			for(var i_polyNum = 0; i_polyNum < polyNum; i_polyNum++){
				var polygon = new Polygon();
				//number of vertex
				var vertexNum = str[++index];
				//$("#con").append("vertexNum: "+vertexNum+"<br/>");
				//read data of each vertex
				for(var i_vertexNum = 0; i_vertexNum < vertexNum; i_vertexNum++){
					var p = new Point2D(parseFloat(str[++index]), parseFloat(str[++index]));
					polygon.addVertex(p);
				}
				robo.addPolygon(polygon);
			}
			
			//set init conf
			robo.setConf(new Configuration(parseFloat(str[++index]), parseFloat(str[++index]), parseFloat(str[++index])));
			//set goal conf
			robo.setGoalConf(new Configuration(parseFloat(str[++index]), parseFloat(str[++index]), parseFloat(str[++index])));
			
			//number of ctrl point
			var ctrlPtsNum = str[++index];
			//read data of each ctrl point
			for(var i_ctrlPtsNum  = 0; i_ctrlPtsNum  < ctrlPtsNum ; i_ctrlPtsNum ++){
				var pt = new Point2D(parseFloat(str[++index]), parseFloat(str[++index]));
				//console.dir(pt);
				robo.addCtrlPoint(pt);
			}
			robots.push(robo);
		}
		
	}catch(err){
		$("#error").html(err.message);
	}
	return robots;
}

function createObstacleFromData(ajaxData){
	var obstacles = new Array();
	
	try{
		var str = ajaxData.split("\t");
		var index = 0;
		//Number of obstacle
		var obsNum = str[index];
		//$("#con").append("<br/>obsNum: "+obsNum+"<br/>");
		//Read data of each robot
		for(var i_obsNum = 0; i_obsNum < obsNum; i_obsNum++){
			var obs = new Obstacle("Obs"+i_obsNum);
			//number of polygon
			var polyNum = str[++index];
			//$("#con").append("polyNum: "+polyNum+"<br/>");
			
			for(var i_polyNum = 0; i_polyNum < polyNum; i_polyNum++){
				var polygon = new Polygon();
				//number of vertex
				var vertexNum = str[++index];
				//$("#con").append("vertexNum: "+vertexNum+"<br/>");
				//read data of each vertex
				for(var i_vertexNum = 0; i_vertexNum < vertexNum; i_vertexNum++){
					var p = new Point2D(parseFloat(str[++index]), parseFloat(str[++index]));
					polygon.addVertex(p);
				}
				obs.addPolygon(polygon);
			}
			
			//set init conf
			
			obs.setConf(new Configuration(parseFloat(str[++index]), parseFloat(str[++index]), parseFloat(str[++index])));
			console.log(obs.getName()+" :"+obs.configuration.x +" "+obs.configuration.y+" "+obs.configuration.degree);
			obstacles.push(obs);
		}
		
	}catch(err){
		$("#error").html(err.message);
	}
	
	return obstacles;
}