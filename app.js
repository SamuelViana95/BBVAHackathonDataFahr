//imports
const http = require('http');
// const events = require('events')
const express = require('express'); // building web application and API
const mysql = require('mysql');
const fs = require('fs');
// const exp = require('constants');

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
    res.render('index', {text: 'BBVA'})
})
// shows about.ejs
app.get('/about',(req, res)=>{
    res.render('about', {text: 'About Page'})
})

// app.get('',(req,res)=>{  //sends a file to display it in the browser
//     res.sendFile(__dirname+'/views/index.html')
// })

var mysqlConnection = mysql.createConnection({
    host:'myclients.mysql.database.azure.com',
    user:'andru@myclients',
    password:'Myeasytwo!',
    database: 'helloclient',
    port: 3306,
    ssl:{
        ca:fs.readFileSync('BaltimoreCyberTrustRoot.crt.pem')
        }
});
 //connect and check for errors
mysqlConnection.connect((err)=>{
    if(!err) //if there is no error
    console.log('DB coonnect succeded');
    else //if there is an error 
    console.log('Db connection failed \n Error: '+JSON.stringify(err, undefined, 2));
});

// ---- Send information 
app.post('/submit', function(req,res){
    console.log(req.body);

    mysqlConnection.query('INSERT INTO people (name, email) VALUES(?,?);',[req.body.id,req.body.name],
            function(err,results,fields){
                if (err) throw err;
            else {
                console.log('Inserted '+ results.affectedRows+'row(s).');
                res.render('about', {text: 'Disfruta tu tarjeta'});
                }  
    });

    
    
    mysqlConnection.end(function(err){
        if (err) throw err;
        else console.log('Done.')
    });

});

// app.get('/consult', function(req, res){
//     mysqlConnection.query('SELECT * FROM people',
//         function(err,results,fields){

//             if(err) throw err;
//             else console.log('Selected '+ results.lenght + 'row(s)');
//             for (i=0; i< results.length; i++) {
//                 console.log('Row: ' + JSON.stringify(results[i]));
//             }
//             console.log('Done');
//         });

//     mysqlConnection.end(
//         function (err) {
//             if (err) throw err;
//             else {console.log('Closing connection');
//                   res.render('index', {text: 'This is ejs'});
//         }
//         });

// });






// Listen on port 3000
app.listen(port, ()=> console.info(`listening on port ${port}`));



