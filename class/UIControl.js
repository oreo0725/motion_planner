/**
 * 
 */

UIControl = {

	onCanControl : function(bool) {
		if(bool){
			$("#blockCanvas").hide();
			$("input[type!=checkbox]").removeAttr("disabled");
			$("select").removeAttr("disabled");
		}else{
			$("#blockCanvas").show();
			$("input[type!=checkbox]").attr("disabled", "disabled");
			$("select").attr("disabled", "disabled");
		}
		
	},
	
	onCollided :function(){
		this.onCanSearch(false);
		$("#collideLabel").show();
	},

	onHasPath : function() {
		this.onCanControl(true);
	},

	onCanSearch : function(bool) {
		$("#blockCanvas").hide();
		if (bool) {
			$("#searchBtn").removeAttr("disabled");
			$("#smoothBtn").attr("disabled", "disabled");
			$("#animateBtn").attr("disabled", "disabled");
			$("#collideLabel").hide();
		} else {
			this.onInit();
		}
	},

	onInit : function() {
		$("#searchBtn").attr("disabled", "disabled");
		$("#smoothBtn").attr("disabled", "disabled");
		$("#animateBtn").attr("disabled", "disabled");
	}
// ,canSmooth :function(bool){
// if(bool)
// $("#smoothBtn").removeAttr("disabled");
// else $("#smoothBtn").attr("disabled", "disabled");
// }
};