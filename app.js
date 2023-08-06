const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  fs.readFile("msg.txt", "utf8", (err, data) => {
    console.log("data", data);
    res.send(
      `<p>${data}</p><form onSubmit=localStorage.setItem('username',document.getElementById('username').value) action='/' method='POST'><input id='username' type='text' name='username'/><button type='submit'>Submit</button></form>`
    );
  });
});

app.post("/message", (req, res, next) => {
  const message = JSON.stringify(req.body);
  console.log(message);
  fs.writeFile("msg.txt", message, { flag: "a" }, () => {
    console.log("message written");
  });
  res.redirect("/login");
});

app.post("/", (req, res, next) => {
  const username = JSON.stringify(req.body.username);
  res.send(
    `<form action='/message' method='POST'><input id='message' type="text" name=${username} /><button type='submit'>Send message</button></form>`
  );
});

app.listen(3000);
