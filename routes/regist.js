var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, responce, next) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  if(request.query==undefined||request.query=={}){
      return;
  }
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("database_user");
    dbo.collection("user_table"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log("查询结果",result);
        let flag=false;
        for(let i=0;i<result.length;i++){
          if(result[i].username==request.query.name){
            flag=true;
            break;
          }
        }
        console.log("请求参数",request.query);
        if(!flag){
            var dbo = db.db("database_user");
            var myobj = { username: request.query.name, password:request.query.password};
            dbo.collection("user_table").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                responce.send({code:0,message:"regist success!"});
                db.close();
            });
        }else{
            console.log("用户名已存在");
            responce.send({code:1,message:"user name already used!"});
            db.close();
        }
    });
  });
});

module.exports = router;
