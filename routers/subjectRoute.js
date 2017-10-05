let express = require('express')
let router = express.Router()
let model = require('../models/')


router.get('/',function(req,res){
  model.Subjects.findAll().then(function(subjectsData){
    res.render('subjects',{Subjects:subjectsData})
  })
})


module.exports = router
