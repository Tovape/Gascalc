<?php

session_start();
session_destroy();

setcookie("nom", null, time()+100);
header("Location: login.php");

?>