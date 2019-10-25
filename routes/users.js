const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require("../model/users");

/* GET users listing. */
router.get('/login', async (req, res, next)=> {
  res.render("template", {
    locals: {
      title: "Login"
    },
    partials: {
      partial: "partial-login"
    }
  });
});

router.get('/sign-up', async (req, res, next) => {

  res.render("template", {
    locals: {
      title: "signup",
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: "partial-sign-up"
    }
  })
});
router.get('/logout', async (req, res, next) => {

  req.session.destroy();
  res.status(200).redirect('/');
});
router.post("/sign-up", async (req, res, next) => {
  console.log(req.body);
  const {
    first_name,
    last_name,
    email_address
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = new userModel(first_name, last_name, email_address, hash);
  const addUser = await user.save();
  console.log("was user added?", addUser.id);
  if (addUser) {
    res.status(200).redirect("/users/login");
  } else {
    res.status(500);
  }
  console.log(addUser);
  res.status(200).redirect("/");
});
router.post("/login", async (req, res, next) => {
  const {
    email_address,
    password
  } = req.body;
  const user = new userModel(null, null, email_address, password);
  const response = await user.login();
  console.log(response);
  if (response.isValid) {
    req.session.is_logged_in = response.isValid;
    req.session.first_name = response.first_name;
    req.session.last_name = response.last_name;
    req.session.user_id = response.id;
    res.status(200).redirect("/");
  } else {
    res.status(400)
  }

});



module.exports = router;