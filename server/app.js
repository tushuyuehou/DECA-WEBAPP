const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

let pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    database:'deca',
    user:'root',
    password:'',
    connectionLimit:100
});
let app = new express();
//配置中间件 middleware
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/register',(req,res)=>{
    let deca_user = req.body.deca_user;
    let sql = 'SELECT * FROM deca.deca_user WHERE uname = ?';
    pool.query(sql,[deca_user.uname],(err,results)=>{
        if(results.length ===1){
            res.send('{"status":"用户名已存在"}');
        }
    });
    sql = 'INSERT INTO deca.deca_user VALUES(NULL,?,?,?,?,?)';
    pool.query(sql,[
        deca_user.uname,
        deca_user.upwd,
        deca_user.email,
        deca_user.phone,
        deca_user.gender
    ],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows === 1){
            res.send({"status":"ok"});
        }else {
            res.send({"status":"err"});
        }
    });
});

app.listen(3000);