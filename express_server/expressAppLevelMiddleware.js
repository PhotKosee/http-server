const express = require("express");
const app = new express();

app.use(function (req, res, next) {
    if (req.query.password !== "pwd123") {
        return res.status(402).send("Need to log in first");
    }
    console.log("Time: ", Date.now());
    next();
});

app.get("/home", (req, res) => {
    return res.send("Hello");
});

app.listen(3333, () => {
    console.log(`listening at http://localhost:3333`);
});