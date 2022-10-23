//imports
const http = require('http');
// const events = require('events')
const express = require('express'); // building web application and API
const mysql = require('mysql');
const exp = require('constants');

const port = process.env.PORT || 3000 ;
const app = express(); // this is our app or instance of express

// --Events
// const emmiter = new events.EventEmitter();


// ----- Static Files
app.use(express.static('public'))// to serve our public folder as a static folder 
app.use('/css', express.static(__dirname+'public/css'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/img', express.static(__dirname+'public/img'))

// Api Midlewares
app.use(express.json()); // this is to accept data in json format
app.use(express.urlencoded()); // to decode the data send thoruh html form 



//------ Set Views
app.set('views','./views')
app.set('view engine', 'ejs')
// shows index.ejs
app.get('',(req, res)=>{
    res.render('index', {text: 'This is ejs'})
})
// shows about.ejs
app.get('/about',(req, res)=>{
    res.render('about', {text: 'About Page'})
})

// app.get('',(req,res)=>{  //sends a file to display it in the browser
//     res.sendFile(__dirname+'/views/index.html')
// })

// Send information 


// Listen on port 3000
app.listen(port, ()=> console.info(`listening on port ${port}`));