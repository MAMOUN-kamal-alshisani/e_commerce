const User = require("../models/user");

async function getAllUsers(req, res) {
  try {
    //  console.log(    res.cookie('toke','sad'));

    const user = await User.findAll({});
    console.log(user);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    res.status(200).send(user);
    console.log(user);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);

    console.log(user);
    res.status(201).send("user created successfully");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

async function deleteUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.destroy({ where: { id: id } });

    console.log(user);

    res.status(200).send("user has been removed successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function UpdateUser(req, res) {
  const { Username, Email, Password } = req.body;
  const id = req.params.id;

  try {
    const user = await User.update(req.body, {
      where: { id: id },
    });
    console.log(user);
    res.status(201).send("user has been updated successfully");
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

module.exports = { getAllUsers, getUser, createUser, deleteUser, UpdateUser };
