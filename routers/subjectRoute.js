let express = require('express')
let router = express.Router()
let model = require('../models/')

router.use(function(req,res,next){
  if(req.session.role === 'academic' || req.session.role === 'headmaster'){
    next()
  }
  else{
    res.render('index',{session:req.session.username,errMsg:''})
  }
})

router.get('/',function(req,res){
  model.Subjects.findAll({
    include:[
      model.Teacher,
      model.Student
    ]
  }).then(function(subjectsData){
      res.render('subjects',{Subjects:subjectsData,session:req.session.username})
  })
})

router.get('/:id/enrolledstudent',function(req,res){
  model.student_subject.findAll({
    attributes: [
      'id',
      'SubjectId',
      'StudentId',
      'score'
    ],
    where:{
      SubjectId:req.params.id
    },
    include:[
      model.Student,
      model.Subjects,
    ]
  }).then(function(studentSubjectData){
    res.render('enrolledStudent',
    {
      student_subject:studentSubjectData,
      session:req.session.username
    })
  })
})

router.get('/:id/givescore',function(req,res){
  model.student_subject.findAll({
    attributes: [
      'id',
      'SubjectId',
      'StudentId',
      'score'
    ],
    where:{
      id:req.params.id
    },
    include:[
      model.Student,
      model.Subjects
    ]
  }).then(function(studentSubjectData){
    res.render('giveScore',{
      student_subject:studentSubjectData,
      session:req.session.username
    })
  })
})

router.post('/:id/givescore',function(req,res){
  model.student_subject.update({
    score:req.body.score
  },{
    where: {
      id:req.params.id
    }
  }).then(function(){
    res.redirect('/subjects')
  })
})

module.exports = router
