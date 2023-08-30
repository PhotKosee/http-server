const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/", (req, res) => {
  res.send(JSON.stringify({users}, null, 4));  
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  res.send(filtered_users);  
});


// POST request: Create a new user
router.post("/", (req, res) => {
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  })
  res.send("User " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email;
  let filtered_user = users.map((user) => user.email === email);
  if (filtered_user.length > 0) {
    let filtered_user = filtered_user[0];
    let firstName = req.query.DOB;
    if (firstName) {
      filtered_user.firstName = firstName;
    }
    let lastName = req.query.lastName;
    if (lastName) {
      filtered_user.lastName = lastName;
    }
    let DOB = req.query.DOB;
    if (DOB) {
      filtered_user.DOB = DOB;
    }
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    res.send(`User with the email  ${email} updated.`);
  } else {
    res.send("No users found");
  }  
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  let email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email  ${email} deleted.`);
});

// Create an endpoint in the same code for getting all users with a particular Last Name
app.get("/lastNmae/:lastName", (req, res) => {
  let lastName = req.params.lastName;
  let filtered_user = users.map((user) => user.lastName === lastName);
  res.send(JSON.stringify({filtered_user}, null, 4));
});

// Create an endpoint in the same code for sorting users by date of birth
app.put("/sort", (req, res) => {
  let sorted_users = users.sort(function(a, b) {
    let [d1, m1, y1] = a.DOB.split("=");
    let b1 = new Date(y1 + "/" + m1 + "/" + d1);
    let [d2, m2, y2] = b.DOB.split("=");
    let b2 = new Date(y2 + "/" + m2 + "/" + d2);
    return b1 - b2;
  })
  res,send(JSON.stringify({sorted_users}, null, 4));
});

module.exports=router;