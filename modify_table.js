// Para modificar la estructura de la tabla
const express = require("express");
const  mysql = require('mysql');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path')
const port = process.env.PORT || 3000;

var modify_table = express();






// Api Midlewares
modify_table.use(express.json()); // this is to accept data in json format
modify_table.use(express.urlencoded()); // to decode the data send thoruh html form 

// define parameters of connection to mysql server and create connection 
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


// table creation and data ingest
function queryDatabase(){
    mysqlConnection.query('DROP TABLE IF EXISTS people', 
        function(err,results,fields){
            if(err) throw err;
            console.log('Dropped people table if existed');
    })
    mysqlConnection.query('CREATE TABLE people (id serial PRIMARY KEY, genero VARCHAR(50), own_car VARCHAR(50), children INTEGER ,sueldo INTEGER, educacion VARCHAR(50), estado_civil VARCHAR(50), vivienda VARCHAR(50), nacimiento DATE, inicio_trabajo DATE , telefono INTEGER, email VARCHAR(50), name VARCHAR(50));',
        function (err, results, fields){
            if (err) throw err;
        console.log("Created client table");
    })
    mysqlConnection.query('INSERT INTO people (genero, own_car, children, sueldo, educacion, estado_civil, vivienda, nacimiento, inicio_trabajo, telefono, email,name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);',['masculino','no',0,10,'licenciado','soltero','rentada','2022/10/20','2022/10/20',44231864,'andre@po.com','andru'],
            function(err,results,fields){
                if (err) throw err;
            else console.log('Inserted '+ results.affectedRows+'row(s).');
    })
mysqlConnection.end(function(err){
    if (err) throw err;
    else console.log('Done.')
});
}

// function to get data from azure mysql database
function readData(){

    mysqlConnection.query('SELECT * FROM people ',
        function(err,results,fields){

            if(err) throw err;
            else console.log('Selected '+ results.lenght + 'row(s)');
            for (i=0; i< results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done');
        });

    mysqlConnection.end(
        function (err) {
            if (err) throw err;
            else console.log('Closing connection')
        });

};

// queryDatabase();
readData();

modify_table.listen(port, ()=> console.info(`listening on port ${port}`));