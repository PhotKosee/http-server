const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();

let users = [];

// Function to check of the user exists
const doesExist = (username) => {
    let userwithsamename = users.filter((user) => {
        return user.username === username;
    });

    if (userwithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

// Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

app.use(express.json());

app.use(session({secret:"fingerprint"}));

app.use("/auth", function auth(req, res, next) {
    if (req.session.authorization) {
        // get the authorization object stored in the session
        // retrieve the token from authorization object
        token = req.session.authorization['accessToken'];
        // use JWT to verify token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({message:"User not authenticated"});
            }
        });
    } else {
        return res.status(403).json({message:"User not logged in"});
    }
});

app.post("/login", (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (!username || !password) {
        return res.status(404).json({message:"Please log in with your username and password"});
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, "access", {expiresIn:60*60});

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("Successfully log in");
    } else {
        return res.status(208).json({message:"Invalid username or password"});
    }
});

app.post("/register", (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (username && password) {
        if (!doesExist(username)) {
            users.push({
                "username": username,
                "password": password,
            });
            return res.status(200).json({message:"Succesfully registered"});
        } else {
            return res.status(404).json({message:"Username already exists"});
        }
    }
    return res.status(404).json({message:"Require both username and password"});
});

// main endpoint
app.get("/auth/get_message", (req, res) => {
    return res.status(200).json({message:"Hello"});
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server is listening to port " + PORT));