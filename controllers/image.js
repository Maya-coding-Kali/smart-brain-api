const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "c79c6fc862174baa9322e874692a63e3",
});
const handelApi = (req, res) => {
  app.models
    .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API" + err));
};
const handelImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => {
      res.status(400).json("unable to get entries" + err);
      console.log(err);
    });
};

module.exports = {
  handelImage: handelImage,
  handelApi: handelApi,
};
