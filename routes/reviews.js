const express = require('express');
const router = express.Router();
const reviewModel = require("../model/reviews");



router.get('/reviews', async (req, res, next) => {

  res.render("template", {
    locals: {
      title: "signup",
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: "partial-reviews"
    }
  })
});




module.exports = router;