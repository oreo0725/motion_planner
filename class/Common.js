SearchAlgorithm = {
	_BFS : "Best First Search"
};

GetPotentialMethod = {
	_AVERAGE : "average all potential of each control point."
};

/**
 * 
 */
ColorCode = {
	ROBOT : "#58D3F7",
	ROBOT_GOAL : "#0101DF",
	OBSTACLE : "#B40431",
	NAME : "#FF8000",
	PATH : "#01DF3A"
};

MAP = {
	_SPACE : 254,
	_BLOCK : 255
};

PILOT_TYPE = {
	_HALF : "Central point of the path",
	_RANDOM : "A random point from the path"
};

HeuristicType = {
	_AVERAGE: "(v1+v2)/2",
	_HEAD_FIRST: "(v1*2 + v2)/3",
	_TAIL_FIRST: "(v2*2 + v1)/3"
};

LogType = {
	_DEBUG: "debug",
	_ERROR: "error"
};

Message = {
	_PLEASE_WAIT : "Please wait..."
};
