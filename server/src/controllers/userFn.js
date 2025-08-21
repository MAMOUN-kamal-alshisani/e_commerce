// const User = require("../models/user");
import User from "../models/user.js";

// fetch all users from the database
async function getAllUsers(req, res) {
  try {
    const user = await User.findAll({});
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
}
// fetch a user by id
async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
}
// create new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).send("user created successfully");
  } catch (err) {
    res.send(err.message);
  }
}
// remove a user by id
async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.destroy({ where: { id: id } });
    res.status(200).send("user has been removed successfully");
  } catch (err) {
    res.status(404).send(err);
  }
}
// update user data
async function UpdateUser(req, res) {
  const { Username, Email, Password } = req.body;
  const id = req.params.id;

  try {
    const user = await User.update(req.body, {
      where: { id: id },
    });
    res.status(201).send("user has been updated successfully");
  } catch (err) {
    res.status(404).send(err.message);
  }
}

export { getAllUsers, getUser, createUser, deleteUser, UpdateUser };
