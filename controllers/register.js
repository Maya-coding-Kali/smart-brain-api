const handelRegister = (req, res, db, bcrypt) => {  
    const { email, name, password } = req.body;
    console.log(name, email,  password)
    if (!email || !name || !password) {
    return    res.status(400).json("incorrect form submission " + email + " " + name +" " + password)
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users", console.log("this is the users i am looking for 1"))
            .returning("*")
            .insert({
              email: loginEmail[0].email,
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => {
      res.status(400).json("Unable to register" + email + " " + name +" " + password);
    });
}
module.exports = {handelRegister: handelRegister}