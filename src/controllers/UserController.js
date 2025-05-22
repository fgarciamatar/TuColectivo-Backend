const { getUsers, addUser } = require('../services/UserService');

const getAllUsers = (req, res) => {
  const users = getUsers();
  res.json(users);
};

const createUser = (req, res) => {
  const newUser = addUser(req.body);
  res.status(201).json(newUser);
};

module.exports = { getAllUsers, createUser };
