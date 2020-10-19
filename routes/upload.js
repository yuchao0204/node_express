var express = require('express');
var router = express.Router();

router.get('/', function(request, responce, next) {
  console.log('request',request)
  responce.send({code:0,message:"login success!"});

  // var form = new multiparty.Form();
  // res.render('index', { title: 'Express' });
  // form.parse(req, function(err, fields, files) {
  //   console.log(files.file[0])
  //   //找到上传的图片上传之前的名字
  //   var orgFilename = files.file[0].originalFilename;
  //   console.log(orgFilename)
  //   //切割orgFilename 找到图片的扩展名 以证明图片是什么格式的
  //   //切割后是一个数组，找到数组最后一个
  //   var formate = orgFilename.split(".");
  //   //拼接新的图片名称
  //   var fileName = uuidV1() + "." + formate[formate.length - 1];
  //   images(files.file[0].path) //Load image from file 
  //   .size(1920, 1276)
  //   .save("public/images/detail/" + fileName, {
  //     quality: 1000
  //   });
  //   //返回前台存储地址
  //   var src = "/images/detail/" + fileName;
    
  //   res.json({
  //     status: true,
  //     msg: src
  //   })
  // });
});

module.exports = router;
