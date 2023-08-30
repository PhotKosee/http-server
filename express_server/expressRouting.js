const express = require("express");
const app = new express();

let userRouter = express.Router();
let itemRouter = express.Router();

userRouter.use(function (req, res, next) {
    console.log("User query time: ", Date());
    next();
});

userRouter.get("/:id", function (req, res, next) {
    res.send("User " + req.params.id + " last successfull login " + Date());
});

itemRouter.use(function (req, res, next) {
    console.log("Item query time: ", Date());
    next;
});

itemRouter.get("/:id", function (req, res, next) {
    res.send("Item " + req.params.id + " last enquery " + Date());
});

app.use("/user", userRouter);
app.use("/item", itemRouter);

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});