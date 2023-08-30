const express = require("express");
const app = new express();

app.use(express.static("staticfiles"));

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});