var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(request, responce, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("database_user");
        console.log("request.query",request.body.content);
        dbo.collection("theweb").find({content:{$elemMatch:{info:{$regex:(request.body.content)}}}}).toArray(function(err, result) { // 模糊检索 regex
            if (err) throw err;
            console.log("查询结果",result);
            // console.log("request.query",request);
            // if(result.length>0){
            //     let flag=0;
            //     for(let i=0;i<result.length;i++){
            //         if(result[i].username==request.query.username){
            //             if(result[i].password==request.query.password){
            //                 flag=0;
            //                 break;
            //             }else{
            //                 flag=2;
            //                 break;
            //             }
            //         }else{
            //           flag=1;
            //           // break;
            //         }
            //     }
            //     if(flag==0){
            //         responce.send({code:0,message:"login success!"});
            //     }else if(flag==1){
            //         responce.send({code:1,message:"user name error!"});
            //     }else if(flag==2){
            //         responce.send({code:2,message:"password error!"});
            //     }
            // }
            responce.send({code:0,message:"success!",data:result});
            db.close();
        });
    });
});

module.exports = router;
