const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Такого пользавателя не существует");
  }

  const isCorrectPass = await bcrypt.compare(password, user.password);

  if (!isCorrectPass) {
    throw new Error("Пароль не верен");
  }

  return jwt.sign({ user: user.email }, process.env.SECRET, {
    expiresIn: "30d",
  });
}

async function register({ email, password }) {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("Такой пользаватель уже существует");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  return await User.create({ email, password: hashPassword });
}

module.exports = { login, register };
