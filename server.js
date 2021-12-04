// Define app using express
var express = require("express")
var app = express()
    // Require database SCRIPT file
var db = require("./database.js")

// Require md5 MODULE
var md5 = require("md5")

const path = require('path');
const { userInfo } = require("os");
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());
app.use(express.static('public'))

// Set server port
HTTP_PORT = 3000
    // Start server
app.listen(HTTP_PORT, () => {
    // console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.post('/data', (req, res, next) => {
    const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
    const info = stmt.run(req.body.username, md5(req.body.password))
    res.redirect('/typingtest.html');
});

// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new", (req, res) => {
    const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
    const info = stmt.run(req.body.user, md5(req.body.pass))
        //{"message":"1 record created: ID 3 (201)"}{"id":3,"user":"newtest","pass":"38a7744f5523335db845ff1976bf4747"}%
    res.status(201).send({ message: info.changes + " record created: ID " + info.lastInsertRowid + " (201)" });
});
// READ a list of all users (HTTP method GET) at endpoint /app/users/     DONE 
app.get("/app/users", (req, res) => {
    const stmt = db.prepare("SELECT * FROM userinfo").all();
    res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id      DONE 
app.get("/app/user/:id", (req, res) => {
    const stmt = db.prepare("SELECT user, pass FROM userinfo WHERE id = ?");
    const info = stmt.get(req.params.id);
    //const pass = stmt.get(req.body.pass);
    //pass = md5(pass);
    var object = {
        id: parseInt(req.params.id),
        user: info["user"],
        pass: info["pass"],
    }
    res.status(200).json(object);
});
// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id
//app.patch("/app/update/user/:id", (req, res) => {
//  const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id = ?");
//const info = stmt.run(req.body.username, md5(req.body.password), req.params.id)
//  res.status(200).send({ message: info.changes + " record updated: ID " + req.params.id + " (200)" });
//});

// UPDATE a single USERNAME (HTTP method POST) at endpoint /updateuser
app.post("/updateuser", (req, res) => {
    const stmt = db.prepare("UPDATE userinfo SET user = COALESCE(?,user) WHERE user = ?");
    const info = stmt.run(req.body.newuser, req.body.username)
    res.redirect('/typingtest.html');
});

// UPDATE a single USERNAME (HTTP method POST) at endpoint /updateuser
app.post("/updatepass", (req, res) => {
    const stmt = db.prepare("UPDATE userinfo SET pass = COALESCE(?,pass) WHERE pass = ?");
    const info = stmt.run(req.body.newpassword, req.body.password)
    res.redirect('/typingtest.html');
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/delete/user/:id", (req, res) => {
    const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?");
    const info = stmt.run(req.params.id)
    res.status(200).send({ message: info.changes + " record deleted: ID " + req.params.id + " (200)" });
});
// Default response for any other request
app.use(function(req, res) {
    res.json({ "message": "Error!)" });
    res.status(404);
});