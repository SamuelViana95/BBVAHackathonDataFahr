//imports
const http = require('http');
const express = require('express'); // building web application and API
const mysql = require('mysql');

const port = 3000 ;
const app = express(); // this is our app or instance of express

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/img', express.static(__dirname+'public/img'))



// Listen on port 3000
app.listen(port, ()=> console.info(`listening on port ${port}`));