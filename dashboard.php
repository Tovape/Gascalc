<!DOCTYPE HTML>
<html lang="en-US">
	<link rel="icon" href="./files/icons/logo.svg" type="image/gif" sizes="16x16">
	<link rel="stylesheet" type="text/css" href="./css/global.css">
	<link rel="stylesheet" type="text/css" href="./css/register.css">
	<link rel="stylesheet" type="text/css" href="./css/global-responsive.css">
	<link rel="stylesheet" type="text/css" href="./css/register-responsive.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<head>
	<title>Gascalc</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="UTF-8"/>
	<script src="https://kit.fontawesome.com/6308dbf55d.js" crossorigin="anonymous"></script>
	<script src="https://cdn.websitepolicies.io/lib/cookieconsent/1.0.3/cookieconsent.min.js" defer></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script type="text/javascript" src="../js/index-javascript.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/quicklink/2.2.0/quicklink.umd.js"></script>
</head>

<body>

<?php

session_start();
include_once './conn.php';

if ($_SESSION["email"] == null) {
	header("Location: index.php");
}

?>

</body>

</html>