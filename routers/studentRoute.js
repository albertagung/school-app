let express = require('express')
let router = express.Router()
let model = require('../models/')


router.get('/',function(req,res){
  model.Student.findAll().then(function(studentsData){
    res.render('students',{Student:studentsData})
  })
})

router.get('/add',function(req,res){
  res.render('addStudent')
})

router.post('/add',function(req,res){
  model.Student.create({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,createdAt:new Date(),updatedAt:new Date()}).then(function(){
    res.redirect('/students')
  }).catch(function(err){
    console.log('Please enter a valid email account');
    res.render('addStudent',{error:err})
  })
})

router.get('/edit/:id',function(req,res){
  model.Student.findAll({where:{id:req.params.id}}).then(function(studentsData){
    res.render('editStudents',{Student:studentsData});
  })
})

router.post('/edit/:id',function(req,res){
  model.Student.update({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email},{where:{id:req.params.id}}).then(function(){
    res.redirect('/students')
  })
})

router.get('/delete/:id',function(req,res){
  model.Student.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/students')
  })
})


module.exports = router
