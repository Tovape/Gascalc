// Resposnive Nav

function menudropper() {
  var menu = document.getElementById("responsive");
  var bar = document.getElementById("bar");
  var cross = document.getElementById("cross");
  
  if (menu.className === "hidden") {
    
	bar.className += " hidden";
	cross.className += " shown";
	
	setTimeout(() => {  
		menu.className += " shown";
	}, 10);
	
  } else {
   
	menu.className += " leftmenu";
   
	bar.className = "";
	cross.className = "hidden";	
	
	setTimeout(() => {  
		menu.className = "hidden";
	}, 1000);
	
	
  }

	
}
