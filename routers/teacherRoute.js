let express = require('express')
let router = express.Router()
let model = require('../models/')


router.get('/',function(req,res){
  model.Teacher.findAll().then(function(teachersData){
    res.render('teachers',{Teacher:teachersData})
  })
})


module.exports = router
