let express = require('express')
let router = express.Router()
let model = require('../models/')

router.get('/adduser',function(req,res){
  model.user.findAll().then(function(userData){
    res.render('addUser',{user:userData,session:req.session.username})
  })
})

router.post('/adduser',function(req,res){
  if(req.body.username !== '' && req.body.password !== ''){
    model.user.create({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function(){
      res.redirect('/')
    })
  }
  else{
    model.user.findAll().then(function(userData){
      res.render('addUser',{user:userData,session:req.body.username,errMsg:'Please fill all the fields'})
    })
  }
})

module.exports = router
