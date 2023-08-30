const express = require("express");
const app = new express();

let loginDetails = [];
let months = [
    January,
    Febuary,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
];

app.get("/", (req, res) => {
    res.send("Welcome to this server");
});

app.get("/loginDetails", (req, res) => {
    res.send(JSON.stringify(loginDetails));
});

app.post("/login/:name", (req, res) => {
    loginDetails.push({
        "name": req.params.name,
        "login_time": new Date(),
    });
    res.send(req.params.name + ", you are logged in");
});

app.get("/:name", (req, res) => {
    res.send("Hello ", req.params.name);
});

// fetch a particular month from a list and return it to user. If the number is invalid, it should return appropriate error message
app.get("/fetchMonth/:num", (req, res) => {
    let num = parseInt(req.params.num);
    if (num < 1 || num > 12) {
        res.send('Invalid month');
    } else {
        res.send(months[num - 1]);
    }
});

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});