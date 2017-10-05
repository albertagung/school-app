let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs')

let teachers = require('./routers/teacherRoute.js')
let subjects = require('./routers/subjectRoute.js')
let students = require('./routers/studentRoute.js')

//Teachers
app.use('/teachers',teachers)
//Subjects
app.use('/subjects',subjects)
//Students
app.use('/students',students)


app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
