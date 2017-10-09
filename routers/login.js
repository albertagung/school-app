let express = require('express')
let router = express.Router()
let model = require('../models/')
let getMatch = require('../helper/getMatch')

router.get('/',function(req,res){
  res.render('login',{session:req.session.username})
})

router.post('/',function(req,res){
  model.user.findAll({
    where:{
      username: req.body.username,
    }
  }).then(function(dataLogin,error){
    let match = getMatch(req.body.password,dataLogin[0].secret);
    console.log(dataLogin[0].secret);
    if(match === dataLogin[0].password){
      req.session.username = req.body.username;
      req.session.role = dataLogin[0].role;
      res.redirect('/')
    }
    else{
      res.render('login',{errMsg:error,session:req.session.username})
    }
  })
})


module.exports = router
