const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
cookieParser = require("cookie-parser");
const auth = require("./midllewaries/auth");

const {
  addLead,
  getLeads,
  deleteLead,
} = require("./controllers/leads.controller");

const { login, register } = require("./controllers/user.controller");

require("dotenv").config();
const app = express();

const port = process.env.PORT;
const url = process.env.MONGO_URL;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());

app.post("/", async (req, res) => {
  try {
    await addLead(req.body);
    res.json({ message: "Ваша заявка принята", error: null });
  } catch (error) {
    res.json({ message: null, error: `Что то пошло не так: ${error.message}` });
  }
});

app.post("/login", async (req, res) => {
  try {
    const token = await login(req.body);
    res.status(200);
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Авторизация выполнена успешно", error: null, token });
  } catch (e) {
    res.json({ message: null, error: `Что то пошло не так: ${e.message}` });
  }
});

app.post("/register", async (req, res) => {
  try {
    await register(req.body);
    res
      .status(200)
      .json({ message: "Пользаватель успешно создан", error: null });
  } catch (e) {
    res.json({ message: null, error: `Что то пошло не так: ${e.message}` });
  }
});

app.use(auth);

app.get("/leads", async (req, res) => {
  try {
    const leads = await getLeads();
    const formatLeads = leads.map(({ phone, fio, problem, id, data }) => {
      return { phone, fio, problem, id, data };
    });
    res.json({ leads: formatLeads, error: null });
  } catch (error) {
    res.json({ leads: [], error: error.message });
  }
});

app.delete(`/leads/:id`, async (req, res) => {
  try {
    await deleteLead(req.params.id);
    res.json({ message: `Запись удалена`, error: null });
  } catch (error) {
    res.json({ message: null, error: `ошибка ${error.message}` });
  }
});

mongoose.connect(url).then(() => {
  app.listen(port, () => {
    console.log(`Ура, сервер запущен на ${port} порту`);
  });
});
