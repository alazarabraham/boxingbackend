var express = require('express');
var router = express.Router();
const boxerModel = require("../model/boxer");


/* GET home page. */
router.get('/', async (req, res, next) =>{
  const BoxerList = await boxerModel.getAll();
  res.render('template', {
  locals: {
    title: 'Boss level boxers',
    data: BoxerList
  },
  partials: {
    partial: 'partial-index'}
  });
});

router.get('/:boxer_id',async (req,res,next)=>{
  const { boxer_id } = req.params;
  const theBoxer = await boxerModel.getById(boxer_id);
  res.render("template", {
    locals: {
      title: "Boxers",
      data: theBoxer
    },
    partials: {
      partial: 'partial-single-boxer'
    }
  })
})
module.exports = router;
