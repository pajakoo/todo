const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(bodyParser.json());
//app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.urlencoded());

// JSON '{
//  "category" : "Sprint", 
//  "points" : 700, 
//  "id" : "829aa84a-4bba-411f-a4fb-38167a987cda"
//}';
const SELECT_ALL_TASKS = 'SELECT * FROM tasks';


const connection = mysql.createConnection({
    host: 'remotemysql.com',
    port: '3306',
    user: 'I3u5c8uA0C',
    password: 'xz1otkExCM',
    database:'I3u5c8uA0C'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

app.get('/tasks', (req,res)=>{
   connection.query(SELECT_ALL_TASKS, (err, results) =>{
       
       if(err){
           return res.send(err);
       }
       else{
           return res.json({
               data: results
           });
       }
   });
});
app.get('/', (req,res)=>{
   connection.query(SELECT_ALL_TASKS, (err, results) =>{
    
       if(err){
           return res.send(err);
       }
       else{
           return res.sendFile({
               data: results
           });
       }
   });
});

app.get('/tasks/add', function(req, res){
    const { taskString } = req.query;
    const INSERT_TASK_QUERY = `INSERT INTO tasks ( taskString ) VALUES( '${taskString}')`;
    connection.query(INSERT_TASK_QUERY, function(err, result){
       if(err){
           return res.send(err);
       } 
        else{
            return res.send('addet task');
        }
    });
});
//                      app.post('/test-page', function(req, res) {
//                      var name = req.body.name,
//                      color = req.body.color;
//                      ...
//        });
app.post('/tasks/delete', function(req, res){
    console.log('in delete sever page');//до тук
   
    var bodyIn = req.body;
    console.log(bodyIn);//{ name: '191 ' }
    var arr=[];
    var str;
    str = JSON.stringify(bodyIn);
    arr=str.split('"');
    console.log(arr[3]);
    var itemDel = parseInt(arr[3], 10);		
    const DELETE_ITEM_QUERY = `DELETE FROM tasks WHERE taskID = '${itemDel}'`;
    connection.query(DELETE_ITEM_QUERY, (err, results) =>{

       if(err){
           return res.send(err);
       }
       else{
           return res.json({
               data: results
           });
       }
   });
    
  
});
    
    
    
//    var myData = req.body.data.name
//    console.log(req.body.data.name);
////    var itemID = req.body.name,
//    const DELETE_TASK_QUERY = `DELETE INTO task WHERE taskID ='${myData}`;
//    connection.query(DELETE_TASK_QUERY, function(err, result){
//        console.log('conn.quer done');
//       if(err){
//           return res.send(err);
//       } 
//        else{
//            return res.send('del task');
//        }
//    });
//});


app.listen(4000, function(){
   console.log(`server listen at port 4000`);
});