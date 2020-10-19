var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, responce, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("database_user");
        dbo.collection("user_table"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log("查询结果",result);
            console.log("request.query",request.query);
            if(result.length>0){
                let flag=0;
                for(let i=0;i<result.length;i++){
                    if(result[i].username==request.query.username){
                        if(result[i].password==request.query.password){
                            flag=0;
                            break;
                        }else{
                            flag=2;
                            break;
                        }
                    }else{
                      flag=1;
                      // break;
                    }
                }
                if(flag==0){
                    responce.send({code:0,message:"login success!"});
                }else if(flag==1){
                    responce.send({code:1,message:"user name error!"});
                }else if(flag==2){
                    responce.send({code:2,message:"password error!"});
                }
            }
            db.close();
        });
    });
});

module.exports = router;
