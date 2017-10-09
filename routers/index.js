let express = require('express')
let router = express.Router()

router.get('/',function(req,res){
  res.render('index',{session:req.session.username})
})

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/login')
})

module.exports = router
