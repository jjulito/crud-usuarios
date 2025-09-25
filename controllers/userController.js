const { users, User } = require("../models/userModel");

// GET: listar todos
const getUsers = (req, res) => {
  res.json(users);
};

// GET: buscar por id
const getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

// POST: crear
const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const newUser = new User(name, email);
  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT: actualizar
const updateUser = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
};

// DELETE: eliminar
const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  users.splice(index, 1);
  res.json({ message: "Usuario eliminado correctamente" });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};