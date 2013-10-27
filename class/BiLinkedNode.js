/**
**
*/
function BiLinkedNode(node, parent){
	this.node = node;
	this.parent = parent;
}

BiLinkedNode.prototype.getParent = function(){
	return this.parent;
};

BiLinkedNode.prototype.getNode = function(){
	return this.node;
};

BiLinkedNode.prototype.set = function(node, parent){
	if(node != null)
		this.node = node;
	if(parent != null)
		this.parent = parent;
};