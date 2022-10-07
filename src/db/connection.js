const mysql = require('mysql');


const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
})

db.connect(function(err,data){
    if(err){

        console.log('Error connecting to database',err)
    }else{

        console.log("database connection established");
    }
})


module.exports={
    db
}