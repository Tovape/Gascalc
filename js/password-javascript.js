document.addEventListener("DOMContentLoaded", function(event) { 

	var url = new URL(document.location);
	var ref = url.searchParams.get("ref");	
	console.log(ref)
	document.getElementById("encrypted").setAttribute('value',ref);

});