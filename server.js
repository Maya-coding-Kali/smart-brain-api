const express = require("express");
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const { response } = require("express");
const { user } = require("pg");
const PORT = process.env.PORT || 3000;
const host = "0.0.0.0";
const db = knex({
  client: "pg",
  connection: {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("it is working");
});

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
app.listen(PORT, host, () => {
  console.log(`Server is running on ${PORT}`);
});
