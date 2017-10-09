let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs')

let index = require('./routers/index.js')
let teachers = require('./routers/teacherRoute.js')
let subjects = require('./routers/subjectRoute.js')
let students = require('./routers/studentRoute.js')
let login = require('./routers/login.js')
let user = require('./routers/user.js')

app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true
}));

//Index
app.use('/',index)
//Teachers
app.use('/teachers',teachers)
//Subjects
app.use('/subjects',subjects)
//Students
app.use('/students',students)
//Login
app.use('/login',login);
//User
app.use('/user',user)



app.listen(process.env.PORT || '3000')
