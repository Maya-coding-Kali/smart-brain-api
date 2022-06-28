const express = require("express");
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const { response } = require("express");
const { user } = require("pg/lib/defaults");
const PORT = process.env.PORT;
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "root",
    database: "smart-brain",
  },
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {});

app.post("/signin", (req, res) => {
  signIn.handelSignIn(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handelRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handelProfile(req, res, db);
});
app.put("/image", (req, res) => {
  image.handelImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handelApi(req, res);
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
