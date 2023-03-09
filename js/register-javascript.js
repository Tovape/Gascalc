function startRegex() {
	var flag = null;
	
	// Get Email and Password
	if (document.getElementById("email") !== null) {
		var password = document.getElementById("password").value;
		var email = document.getElementById("email").value;
		console.log("Analizing Password: " + password + " | Email: " + email);
		flag = 0;
	} else {
		var password = document.getElementById("password").value;
		flag = 1;
	}
	
	// Regex
	var passwordExpression  = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	var emailExpression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	
	// HTML
	if (flag === 0) {
		var passwordError = document.getElementById("register-error-password");
		var emailError = document.getElementById("register-error-email");
	
		if(!passwordExpression.test(password)) {
			emailError.classList.remove("register-error-on");
			passwordError.classList.add("register-error-on");
		} else if (!emailExpression.test(email)) {
			passwordError.classList.remove("register-error-on");
			emailError.classList.add("register-error-on");
		} else {
			passwordError.classList.remove("register-error-on");
			emailError.classList.remove("register-error-on");
		}
	} else {
		var passwordError = document.getElementById("register-error-div");
		if(!passwordExpression.test(password)) {
			passwordError.classList.add("register-error-on");
		} else {
			passwordError.classList.remove("register-error-on");
		}
	}
}