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

<?php

session_start();
include_once './conn.php';

if (isset($_POST["submit"])) {
	$date = new DateTimeImmutable();
    $sql = "insert into users (username, email, password, timestamp) values ('".$_POST['name']."', '".$_POST['email']."','".md5($_POST['password'])."','".$date->getTimestamp()."')";

	if ($conn->query($sql) === TRUE) {
		$temp = 1;
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

    if ($temp === 1) {
        $_SESSION["email"] = $_POST["email"];
        setcookie("email", $_POST["email"], time()+100);
        header("Location: index.php");
    }
} else if (isset($_SESSION["email"])) {
    header("Location: index.php");
}

?>

<div class="register">
	<div class="register-each">
		<div class="register-each-logo">
			<a href="/">
				<img data-lazy="./files/logo/logo.png">
			</a>
		</div>
		<div class="register-each-content">
			<p key="register-title" class="register-each-content-welcome">Hello!<br>Say Hi to a better place!</p>
			<p key="register-subtitle" class="register-each-content-introduction">Use your account to access our platform and content</p>
			<p key="register-switch-1" class="register-each-content-text">Already have an account?</p>
			<a key="register-login" href="./login.php">Login</a>
		</div>
	</div>
	<div class="register-each">
		<div class="register-each-content">
			<p key="register-createaccount" class="register-each-form-title">Create Account</p>
			<div class="register-error-div">
				<p id="register-error-email" key="register-error-email">Email Not Valid</p>
				<p id="register-error-password" key="register-error-password">Password must be at least 6 characters with number</p>
			</div>
			<form action="./register.php" method="POST">
				<div>
					<i class="fa-solid fa-user"></i>
					<input type="text" id="name" name="name" placeholder="Name" value="username" required>
				</div>
				<div>
					<i class="fa-solid fa-at"></i>
					<input type="email" id="email" name="email" placeholder="Email" value="username@gmail.com" required>
				</div>
				<div>
					<i class="fa-solid fa-key"></i>
					<input type="password" id="password" name="password" placeholder="Password" value="password123" required>
				</div>				
				<button class="register-each-form-button" type="submit" value="submit" name="submit" onclick="startRegex()">Register</button>
			</form>
		</div>
	</div>
</div>

</body>

</html>