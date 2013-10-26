/**
 * 
 */
var isMouseDown = false;
var mouseDownPt = new Point2D();
var prevPt = null;

function getThetaBetween(p0, p1){
	return (Math.atan2(p1.y, p1.x) - Math.atan2(p0.y, p0.x))/2 + Math.PI;
}

function getArcThetaBetween2(p0, p1){
	return Math.atan(Math.abs(p0.y - p1.y)/ Math.abs(p0.x - p1.x));
}

function max(a, b){
	return (a> b)? a: b;
}

function min(a, b){
	return (a< b)? a: b;
}

function direction(p0, p1, p2){
	return (p1.x - p0.x)*(p2.y - p0.y) - (p2.x - p0.x)*(p1.y - p0.y);
}

function onSegement(p0, p1, p2) {
	if(min(p0.x, p1.x) <= p2.x && p2.x <= max(p0.x, p1.x) &&
			min(p0.y, p1.y) <= p2.y && p2.y <= max(p0.y, p1.y)){
		return true;
	}
	return false;
}

function segementsInterset(p1, p2, q1, q2){
	var d0, d1, d2, d3;
//	console.log(p1);
//	console.log(p2);
//	console.log(q1);
//	console.log(q2);
	
	d0 = direction(q1, q2, p1);
	d1 = direction(q1, q2, p2);
	d2 = direction(p1, p2, q1);
	d3 = direction(p1, p2, q2);
	
	
	if((d0 > 0 && d1 < 0 || d0 < 0 && d1 > 0) &&
			(d2 > 0 && d3 < 0 || d2 < 0 && d3 > 0))
		return true;
	else if (d0 == 0 && onSegement(q1, q2, p1))
		return true;
	else if (d1 == 0 && onSegement(q1, q2, p2))
		return true;
	else if (d2 == 0 && onSegement(p1, p2, q1))
		return true;
	else if (d3 == 0 && onSegement(p1, p2, q1))
		return true;
	else return false;
}

function isOutOfBound(p){
	if(p.x >= WORLD_LENGTH || p.x < 0 || p.y >= WORLD_LENGTH || p.y <0)
		return true;
	return false;
}

function createPFCanvas(roboName){
	var canvasElement = document.createElement("canvas");
	canvasElement.id = "canvasPF_"+roboName;
	canvasElement.width = CANVAS_POTENTIAL_LENGTH;
	canvasElement.height = CANVAS_POTENTIAL_LENGTH;
	var wrapperId = "pf_"+roboName;
	$("#pfCanvasGroup").append("<div id='"+wrapperId+"'class='pfCanvas'><h4>Potential["+roboName+"]:</h4></div>");
	$("#"+wrapperId).append(canvasElement);
	
	console.log("potential canvas for ["+roboName+"] is created!!");
	return canvasElement;
}

function averageBitmap(arr){
	var bitmap = new Array(WORLD_LENGTH);
	console.log(arr);
	//console.log(arr.length+" "+arr[0].length+" "+arr[0][0].length);
	var ctrlNum = arr.length;
	for(var y=0, h=WORLD_LENGTH; y<h; y++){
		bitmap[y] = new Array(WORLD_LENGTH);
		for(var x=0, w=WORLD_LENGTH; x<w; x++){
			//init
			bitmap[y][x] = 0;
			for(var n=0, arrLen=arr.length; n<arrLen; n++){
				//sum of n control points			
				//console.log(" bitmap["+y+"]["+x+"]:"+bitmap[y][x]+" arr["+n+"]["+y+"]["+x+"]:"+arr[n][y][x]);
				bitmap[y][x] += arr[n][y][x];
			}
			bitmap[y][x] /= ctrlNum;
		}
	}
	return bitmap;
}


function mouseDownHandler(event){
	var x, y;
	// Get the mouse position relative to the canvas element.
	if (event.layerX || event.layerX == 0) { // Firefox
		console.log("Geoko click");
	    x = event.layerX;
	    y = event.layerY;
	} else if (event.offsetX || event.offsetX == 0) { // Opera
		console.log("Webkit click");
	    x = event.offsetX;
	    y = event.offsetY;
	}
	var clickP = new Point2D(x, y);
	isMouseDown = true;
	mouseDownPt = clickP;
	mpWorker.onPick(clickP);
	prevPt = clickP;
}

function mouseMoveHandler(event){
	if(isMouseDown){
		var x, y;
		// Get the mouse position relative to the canvas element.
		if (event.layerX || event.layerX == 0) { // Firefox
		    x = event.layerX;
		    y = event.layerY;
		} else if (event.offsetX || event.offsetX == 0) { // Opera
		    x = event.offsetX;
		    y = event.offsetY;
		}
		
		var moveToPt = new Point2D(x, y);
		var isRotate = (event.button == 2)? true : false;
		mpWorker.onMove(moveToPt, prevPt, mouseDownPt, isRotate);
		
		//clear the canvas
		mCanvas.width = mCanvas.width;
		mpWorker.repaint();
		
		prevPt = moveToPt;
		
	}
}

function mouseReleaseHandler(event){
	var x, y;
	// Get the mouse position relative to the canvas element.
	if (event.layerX || event.layerX == 0) { // Firefox
	    x = event.layerX;
	    y = event.layerY;
	} else if (event.offsetX || event.offsetX == 0) { // Opera
	    x = event.offsetX;
	    y = event.offsetY;
	}
	
	isMouseDown = false;
	prevPt = null;
	var clickP = new Point2D(x, y);
	mpWorker.onRelease(clickP);
}

function createArray(index, arrLen){
	var num = arrLen[index++];
	//console.log(index);
	var arr = new Array(num);
	if(index == arrLen.length)
		return arr;
	//console.log(arr);
	
	for(var i =0; i<num; i++){
		arr[i] = createArray(index, arrLen);
	}
	return arr;	
}

function parseIntConf(conf){
	return new Configuration(parseInt(conf.x), parseInt(conf.y), parseInt(conf.degree));
}

function displayError(msg){
	$("#error").html(msg);
}

function log(tag, msg, type){
	var str = ""; 
	switch(type){
	case LogType._DEBUG:
		//str = "<div class='logD'><span class='tag'>"+tag+"</span>"+msg+"</div>";
		str = "["+tag+"]\t"+msg;
		break;
	case LogType._ERROR:
		//str = "<div class='logE'><span class='tag'>"+tag+"</span>"+msg+"</div>";
		str = "["+tag+"]\t"+msg;
		break;
	}
	if(str != "")
		$("#log").append("\r\n"+str);
}

function listPilotType(parent){
	var child = "<select id='pilot_type'>";
	
	for(var i in PILOT_TYPE){
		child += "<option value='"+PILOT_TYPE[i]+"'>"+PILOT_TYPE[i]+"</option>";
	}
	child += "</select>";
	parent.append(child);
}

function listHeuristicType(parent){
	var child = "<select id='heuristic_type'><option value=''>Just use configuration of robot</option>";
	
	for(var i in HeuristicType){
		child += "<option value='"+HeuristicType[i]+"'>"+HeuristicType[i]+"</option>";
	}
	child += "</select>";
	parent.append(child);
}

/**
 * Open a popup dialog. After that, the main page layer can't be interacted.
 * @param callback callback function will be invoked after popup the dialog
 * @param spd animate speed
 * @param msgHtml the message show on the popup dialog. Can be html. 
 */
function openOffersDialog(callback, dur, msgHtml) {
	$('#overlay').fadeIn(dur, function() {
		$("#contentMsg").html(msgHtml);
		$('#boxpopup').css('display','block');
        $('#boxpopup').animate({'left':'30%'},
        	{
        		duration: dur,
        		complete: function(){
                	if(callback!=null)
                		callback();
                },
                queue: false            
        	}
        );
    });
}


function closeOffersDialog(prospectElementID) {
	$('#' + prospectElementID).css('position','absolute');
	$('#' + prospectElementID).animate({'left':'-100%'}, 
		{
			duration: 50,
			complete: function(){
				$('#' + prospectElementID).css('position','fixed');
				$('#' + prospectElementID).css('left','100%');
				$('#overlay').fadeOut('fast');
            },
            queue:false
		}
	);
}