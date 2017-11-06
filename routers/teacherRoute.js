let express = require('express')
let router = express.Router()
let model = require('../models/')

router.use(function(req,res,next){
  if(req.session.role === 'headmaster'){
    next()
  }
  else{
    res.render('index',{session:req.session.username,errMsg:''})
  }
})

router.get('/',function(req,res){
  model.Teacher.findAll({include:[model.Subjects]}).then(function(teachersData){
    res.render('teachers',{Teacher:teachersData,session:req.session.username});
  })
})

router.get('/add',function(req,res){
  model.Subjects.findAll().then(function(subjectsData){
    res.render('addTeacher',{Subjects:subjectsData,session:req.session.username})
  })
})

router.post('/add',function(req,res){
  model.Teacher.create({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    createdAt:new Date(),
    updatedAt:new Date(),
    SubjectId:req.body.SubjectId
  }).then(function(){
    res.redirect('/teachers')
  }).catch(function(err){
    res.render('addTeacher',{error:err,session:req.session.username})
  })
})

router.get('/edit/:id',function(req,res){
  model.Teacher.findAll({where:{id:req.params.id}}).then(function(teachersData){
    model.Subjects.findAll().then(function(subjectsData){
      // console.log(teachersData[0].Subject);
      res.render('editTeacher',{Teacher:teachersData,Subjects:subjectsData,session:req.session.username});
    })
  })
})

router.post('/edit/:id',function(req,res){
  model.Teacher.update({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    SubjectId:req.body.SubjectId},
    {where:{id:req.params.id}
  }).then(function(){
    res.redirect('/teachers')
  })
})

router.get('/delete/:id',function(req,res){
  model.Teacher.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/teachers')
  })
})

module.exports = router
