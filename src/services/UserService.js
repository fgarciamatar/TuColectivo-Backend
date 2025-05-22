let users = [];

const getUsers = () => {
  return users;
};

const addUser = (user) => {
  const newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return newUser;
};

module.exports = { getUsers, addUser };
