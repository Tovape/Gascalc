<!DOCTYPE HTML>
<html lang="en-US">
	<link rel="icon" href="./files/icons/logo.svg" type="image/gif" sizes="16x16">
	<link rel="stylesheet" type="text/css" href="./css/global.css">
	<link rel="stylesheet" type="text/css" href="./css/register.css">
	<link rel="stylesheet" type="text/css" href="./css/global-responsive.css">
	<link rel="stylesheet" type="text/css" href="./css/register-responsive.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">	
<head>
	<title>Gascalc</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8"/>
	<script src="https://kit.fontawesome.com/6308dbf55d.js" crossorigin="anonymous"></script>
	<script src="https://cdn.websitepolicies.io/lib/cookieconsent/1.0.3/cookieconsent.min.js" defer></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.2.0/quicklink.umd.js"></script>
</head>

<body>

<div class="register">
	<div class="register-each">
		<div class="register-each-logo">
			<a href="/">
				<img data-lazy="/logo/logo.png">
			</a>
		</div>
		<div class="register-each-content">
			<p key="register-title" class="register-each-content-welcome">Hello!<br>Say Hi to a better place!</p>
			<p key="register-subtitle" class="register-each-content-introduction">Use your account to access our platform and content</p>
			<p key="register-switch-2" class="register-each-content-text"></p>
			<a key="register-register" href="./register.php">Register</a>
		</div>
	</div>
	<div class="register-each">
		<div class="register-each-content">
			<p key="register-login" class="register-each-form-title">Login Account</p>
			<div class="register-error-div">
				<p>

				</p>
			</div>
			<form action="/login" method="POST">
				<div>
					<i class="fa-solid fa-at"></i>
					<input type="email" id="email" name="email" placeholder="Email" required>
				</div>
				<div>
					<i class="fa-solid fa-key"></i>
					<input type="password" id="password" name="password" placeholder="Password" required>
				</div>				
				<button key="register-login" class="register-each-form-button" type="submit">Login</button>
				<a key="register-forgotpassword" href="/resetpassword">Forgot Password? Click Here</a>
			</form>
		</div>
	</div>
</div>



</body>

</html>