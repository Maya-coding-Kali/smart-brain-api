const express = require("express");
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const { response } = require("express");
//const { user } = require("pg/lib/defaults");
const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';
const db = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {res.send('it is working')});

app.post("/signin", (req, res) => {
  signIn.handelSignIn(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
});
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
app.listen(PORT,host, () => {
  console.log(`Server is running on ${PORT}`);
});
