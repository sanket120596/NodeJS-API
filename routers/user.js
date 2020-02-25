const express = require("express");
const router = new express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

//Insert User
router.post("/user", async (req, res) => {
  try {
    var user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get All Users
router.get("/", auth, async (req, res) => {
  try {
    var users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get User by ID
router.get("/user/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    var user = await User.findById(_id);
    await user.populate('tasks').execPopulate()
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Find user  and update
router.post("/user/:id", auth, async (req, resp) => {
  try {
    var user = await User.findByIdAndUpdate(req.params.id, { age: 2 });
    var count = await User.countDocuments({ age: 2 });
    return resp.status(200).send("Success updating user");
  } catch (e) {
    console.log(e);
  }
});

//Update User
router.patch("/user/:id", auth, async (req, resp) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findById(req.params.id);
    updates.forEach(item => {
      user[item] = req.body[item];
    });
    await user.save();
    if (!user) {
      resp.status(404).send();
    }
    resp.status(200).send(user);
  } catch (e) {
    console.log(e);
    resp.status(400).send(e);
  }
});

//Login User
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to Login");
  }
});

//delete user
//User can delete only his profile as user is deleted based on id present in token
router.delete("/users/delete", auth, async (req, resp) => {
  try {
    req.user.remove();
    resp.status(200).send();
  } catch (error) {
    console.log(error);
    resp.status(401).send();
  }
});


//Logout User
router.post("/users/logout", auth, async (req, resp) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    resp.status(200).send();
  } catch (error) {
    console.log(error);
    resp.status(401).send();
  }
});

///Logout All
router.post("/users/logoutAll", auth, async (req, resp) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    resp.status(200).send();
  } catch (error) {
    resp.status(401).send();
  }
});

module.exports = router;
