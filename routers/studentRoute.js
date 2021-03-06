let express = require('express')
let router = express.Router()
let model = require('../models/')

router.use(function(req,res,next){
  if(req.session.role === 'headmaster' || req.session.role === 'teacher' || req.session.role === 'academic'){
    next()
  }
  else{
    res.render('index',{session:req.session.username,errMsg:''})
  }
})

router.get('/',function(req,res){
  model.Student.findAll({include:[model.Subjects]}).then(function(studentsData){
    res.render('students',{Student:studentsData,session:req.session.username})
  })
})

router.get('/add',function(req,res){
  res.render('addStudent',{session:req.session.username})
})

router.post('/add',function(req,res){
  model.Student.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    createdAt:new Date(),
    updatedAt:new Date()
  }).then(function(){
    res.redirect('/students')
  }).catch(function(err){
    res.render('addStudent',{error:err})
  })
})

router.get('/edit/:id',function(req,res){
  model.Student.findAll({where:{id:req.params.id}}).then(function(studentsData){
    res.render('editStudents',{Student:studentsData,session:req.session.username});
  })
})

router.post('/edit/:id',function(req,res){
  model.Student.update({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
  },
    {where:{id:req.params.id}}).then(function(){
    res.redirect('/students')
  })
})

router.get('/delete/:id',function(req,res){
  model.Student.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/students')
  })
})

router.get('/edit/:id/addsubject',function(req,res){
  model.Student.findAll({where:{id:req.params.id}}).then(function(studentsData){
    model.Subjects.findAll().then(function(subjectsData){
      res.render('addSubject',{Student:studentsData,Subjects:subjectsData,session:req.session.username})
    })
  })
})

router.post('/edit/:id/addsubject',function(req,res){
  model.student_subject.create({
    SubjectId:req.body.SubjectId,
    StudentId:req.params.id
  }).then(function(){
    res.redirect('/students')
  })
})

module.exports = router
