import * as dotenv from 'dotenv'
dotenv.config()
import mysql from "mysql"
import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import CryptoJS from "crypto-js"
import passport from 'passport'
import flash from 'express-flash'
import session from 'express-session'
import methodOverride from 'method-override'
import favicon from 'serve-favicon'
import busboy from 'connect-busboy'
import fs from 'fs-extra'
import initialize from './passport-config.js'
import fetch from 'node-fetch'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
var data = null;
var users = [];
var temp = null;

initialize(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.id === id)
)

// Firewall

app.all('/server.js', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/.env', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/.gitattributes', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/.gitignore', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/package.json', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/package-lock.json', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/passport-config-js', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

app.all('/node_modules/*', function (req,res, next) {
   res.status(403).send({
      message: 'Access Forbidden'
   });
});

// USE
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({limit: '20mb', extended: false}));
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
app.set('view-engine', 'ejs')
app.use(busboy());
app.use(express.static(path.join(__dirname)));
app.use(favicon(__dirname + '/files/generic/favicon.ico'));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test) {
        res.redirect(".."+req.url.slice(0, -1));
    } else {
        next();
    }
});

// SQL Connection

const db = mysql.createConnection({ host: 'localhost', port: 3306, user: 'root', password: '', database: "gascalc" });

// Port

app.listen(PORT);

// Console

console.log(`%c 
\tGascalc                         
`, "color: #6497b1; font-family: Monospace;");

console.log('\t' +  '\x1b[90m', 'v1.0.0 | Stable' + '\x1b[0m');

console.log("\t--------------------------\n\t" + "\x1b[33m", "Server " + "\x1b[0m" + "Running in Port " + PORT + "\n\t--------------------------");
console.log("\t" + "\x1b[32m", "NodeJS" + "\x1b[0m" + " Online");

db.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
	if (error) throw error;
	console.log("\t--------------------------\n\t" + "\x1b[94m", "MySql" + "\x1b[0m" + " Connected");
});

// Get Users

temp = "SELECT * FROM users";

function getUsers() {
	users = [];
	try {
		db.query(temp, function (err, result, fields) {
			if (err) {
				throw err;
				console.log("Error Getting Users");
			} else {
				for(let i = 0; i < result.length; i++) {
					result[i] = JSON.parse(JSON.stringify(result[i]));
					users.push(result[i]);
				}
				console.log("\nGot Users");
			}
		});
	} catch {
		console.log("Critial Error")
	}
}

getUsers();

// Auth Function

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/dashboard')
	}
	next()
}

// GET

app.get('/', function (req, res) {
	res.render('index.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/index', function (req, res) {
	res.render('index.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/dashboard', checkAuthenticated, async (req, res) => {
	res.render('dashboard.ejs', { user_data: req.user }),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js')),
	app.use(express.static(__dirname + '/vendor'))
})

app.get('/resetpassword', checkNotAuthenticated, (req, res) => {
	res.render('resetpassword.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

app.get('/newpassword', function (req, res) {
	res.render('newpassword.ejs'),
	app.use(express.static(__dirname + '/css')),
	app.use(express.static(__dirname + '/files')),
	app.use(express.static(__dirname + '/js'))
})

// POST

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
	var passwordExpression  = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	var emailExpression = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	if(!passwordExpression.test(req.body.password)) {
		console.log("Password: From 6 to 16 with Numbers");
		return false;
	} else if (!emailExpression.test(req.body.email)) {
		console.log("Email: test@test.com");
		return false;
	} else {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10)
			temp = Date.now().toString();

			users.push({
				id: null,
				username: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				timestamp: temp
			})

			let query = "INSERT INTO users (username, email, password, timestamp) VALUES ('" + req.body.name + "','" + req.body.email + "','" + hashedPassword + "','" + temp + "')";

			db.query(query, function (err, result, fields) {
				if (err)  {
					throw err;
				} else {
					console.log("User Inserted Correctly")
				}
			});

			console.log(users)
			getUsers();
			res.redirect('/login')
		} catch {
			res.redirect('/register')
		}
	}
})

// DELETE

app.delete('/logout', (req, res) => {
	req.logout(req.user, err => {
		if(err) return next(err);
		res.redirect("/login");
	});
});

// ROUTE

app.route('/saveavatar').post(function (req, res, next) {
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
		console.log("Uploading: " + JSON.stringify(filename));
		filename = req.user[Object.keys(req.user)[0]] + ".jpg"
		fstream = fs.createWriteStream(__dirname + '/files/user/' + filename);
		file.pipe(fstream);
		fstream.on('close', function () {    
			console.log("Upload Finished of " + JSON.stringify(filename));              
			res.redirect('/dashboard');
		});
	});
});

// Password Resetting
app.route('/resetpassword').post(function (req, res, next) {

	// Create Encrypted ID
	var encrypted = CryptoJS.AES.encrypt(req.body.email, "Tovape");
	encrypted = encodeURIComponent(encrypted)
	console.log(encrypted.toString())
	

	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'reflowcompany@gmail.com',
		pass: 'jfqnfpdmiddfntfk'
	  }
	});

	var mailOptions = {
		from: 'reflowcompany@gmail.com',
		to: req.body.email,
		subject: 'Reflow | Cambiar Contraseña - Change Password',
		html: '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head> <title> </title>  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <style type="text/css"> #outlook a { padding: 0; } body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p { display: block; margin: 13px 0; } </style>    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"> <style type="text/css"> @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700); </style>  <style type="text/css"> @media only screen and (min-width:480px) { .mj-column-per-100 { width: 100% !important; max-width: 100%; } .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } } </style> <style media="screen and (min-width:480px)"> .moz-text-html .mj-column-per-100 { width: 100% !important; max-width: 100%; } .moz-text-html .mj-column-per-33-333333333333336 { width: 33.333333333333336% !important; max-width: 33.333333333333336%; } </style> <style type="text/css"> @media only screen and (max-width:480px) { table.mj-full-width-mobile { width: 100% !important; } td.mj-full-width-mobile { width: auto !important; } } </style> <style type="text/css"> .box-shadow table td { -webkit-box-shadow: 0px 3px 6px #6497b1; box-shadow: 0px 3px 6px #6497b1; } </style> </head> <body style="word-spacing:normal;"> <div style="">  <div style="margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"> <tbody> <tr> <td style="border:1px solid #000000;direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:100px;"> <img height="auto" src="http://localhost:5000/logo/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Arial;font-size:20px;line-height:1;text-align:center;color:#000000;">Cambio de Contraseña - Change Password</div> </td> </tr> <tr> <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">Hola ' + req.body.email + '!<br></br>Hemos recibido una petición para cambiar tu contrasenya para la plataforma de reflow, si no has sido tu no hace falta que hagas nada.</div> </td> </tr> <tr> <td align="center" vertical-align="middle" class="box-shadow" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"> <tbody> <tr> <td align="center" bgcolor="#6497b1" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#6497b1;" valign="middle"> <a href="http://localhost:5000/newpassword?ref=' + encrypted + '" style="display:inline-block;background:#6497b1;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Cambiar </a> </td> </tr> </tbody> </table> </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <p style="border-top:solid 4px #6497b1;font-size:1px;margin:0px auto;width:100%;"> </p>  </td> </tr> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Reflow Copyright 2022</div> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  <div style="background:#fbfbfb;background-color:#fbfbfb;margin:0px auto;max-width:600px;"> <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fbfbfb;background-color:#fbfbfb;width:100%;"> <tbody> <tr> <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/linkedin.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/youtube.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"> <tbody> <tr> <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"> <tbody> <tr> <td style="width:30px;"> <img height="auto" src="http://localhost:5000/icons/mail.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>  </td> </tr> </tbody> </table> </div>  </div> </body> </html>'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
		res.redirect('/failure');
	  } else {
		console.log('Email sent: ' + info.response);
		res.redirect('/success');
	  }
	});
});

app.route('/newpassword').post(async function (req, res, next) {
	
	var passwordExpression  = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

	// Regex Check
	if(!passwordExpression.test(req.body.password)) {
		console.log("Password: From 6 to 16 with Numbers");
		return false;
	} else {
	    if (req.body.encrypted === 'null' || req.body.encrypted === null || req.body.encrypted === '' || req.body.encrypted === undefined) {
	        res.redirect('../reflow/failure')
	    } else {
			// Get Email
			var decrypted = CryptoJS.AES.decrypt(req.body.encrypted, "Tovape");
			var email = decrypted.toString(CryptoJS.enc.Utf8);

			// Get Password Inputed
			const hashedPassword = await bcrypt.hash(req.body.password, 10)

			try {
				let query = "UPDATE users SET password = '" + hashedPassword + "' WHERE email = '" + email + "'";

				db.query(query, function (err, result, fields) {
					if (err)  {
						throw err;
					} else {
						console.log("User Updated Correctly")
					}
				});
				getUsers();

				res.redirect('/success')
			} catch {
				res.redirect('/failure')
			}
		}
	}
});

// Fetch GAS API

function getData() {
	fetch('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/')
		.then(response => response.json())
		.then(data => {
			console.log("GAS API OK")
		})
		.catch(err => console.error(err))
}

const interval = setInterval(getData, 86400)