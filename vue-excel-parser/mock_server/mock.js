const port = 12345;

const cors = require("cors");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);


app.post("/cls/", (req, res) => {
    res.send({
        name: "developer",
        is_auth: true,
        is_staff: true,
        is_private: true,
    });
});