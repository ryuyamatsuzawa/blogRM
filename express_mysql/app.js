const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())
//React側からexpress側へアクセスできるようになる方法
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.set('view engine', 'ejs');

const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ryuya1028',
	database: 'express_db',
});

// con.connect(function(err) {
// 	if (err) throw err;
// 	console.log('Connected');
// });

app.get('/posts', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.render('index', { users: result });
	});
});

app.get('/', (req, res) => {
	const sql = "select * from users";
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		res.render('index', { users: result });
	});
});

app.post('/', (req, res) => {
	const sql = "INSERT INTO users SET ?"
	con.query(sql, req.body, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.get('/create', (req, res) =>
	res.sendFile(path.join(__dirname, 'html/form.html')))

app.get('/edit/:id', (req, res) => {
	const sql = "SELECT * FROM users WHERE id = ?";
	con.query(sql, [req.params.id], function (err, result, fields) {
		if (err) throw err;
		res.render('edit', { user: result });
	});
});

app.post('/update/:id', (req, res) => {
	const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
	con.query(sql, req.body, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.post('/login', (req, res) => {
	const username = req.body.username
	const email = req.body.email
	const password = req.body.password
	con.query(
		"SELECT * FROM users WHERE username = ? AND email = ? AND password = ?",
		[username, email, password],
		(err, result) => {
			if (err) {
			return	res.send({err: err})
			}

			if (result) {
			return	res.send(result)
			} else {
			return	res.send({ message: "ユーザネーム、メールアドレス、パスワードのいずれかが間違っています" });
			}
		}
	);
});


app.post('/myPage', (req, res) => {
	const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
	con.query(sql, req.body, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.get('/delete/:id', (req, res) => {
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql, [req.params.id], function (err, result, fields) {
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});

app.post('/register', (req, res) => {
	console.log(req);
	const name = req.body.username
	const email = req.body.email
	const password = req.body.password
	con.query(
		"INSERT INTO users (name, email, password) VALUES (?,?,?)",
		[name, email, password],
		(err, result) => {
			console.log(err)
		}
	);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));