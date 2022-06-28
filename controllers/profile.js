const handelProfile = (req, res, db) => {
    const { id } = req.params;
    let found = false;
    db.select("*")
      .from("users")
      .where({ userid: id })
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json("Could not find user: ");
        }
      })
      .catch((err) => {
        res.status(400).json("Error getting user: ");
      })
    }
      module.exports = {
        handelProfile:handelProfile
      }