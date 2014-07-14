var express = require('express');
var fs = require('fs');
var mime = require('mime');

module.exports = function(cb){
  var app = express();
  var DIR_PREFIX = './test/libs/';
  
  app.get('/', function(req, res){
    var config = req.query;
    //console.dir(config);
    var htmlFile = fs.readFileSync(DIR_PREFIX + 'index.html');
    htmlFile = htmlFile.toString();
    if(config.jsmin === 'true'){
      htmlFile = htmlFile.replace(/app\.js/,"app.min.js");
    }
    
    if(config.cssmin === 'true'){
      htmlFile = htmlFile.replace(/app\.css/,"app.min.css");
    }
    
    if(config.htmlmin === 'true'){
      htmlFile = htmlFile.replace(/\s/g,"");
    }
    
    //console.log(htmlFile.toString());
    
    res.setHeader('Content-Type', mime.lookup('index.html'));
    res.send(htmlFile);    
  });
  
  app.get('/app.js', function(req, res){
    var file = fs.readFileSync(DIR_PREFIX + 'app.js');
    console.log('app.js served');
    res.setHeader('Content-Type', mime.lookup('app.js'));
    res.send(file.toString());
  });
  
  app.get('/app.min.js', function(req, res){
    var file = fs.readFileSync(DIR_PREFIX + 'app.min.js');
    console.log('app.min.js served');
    res.setHeader('Content-Type', mime.lookup('app.min.js'));
    //console.log(file.toString());
    res.send(file.toString());
  });
  
  app.get('/app.css', function(req, res){
    var file = fs.readFileSync(DIR_PREFIX + 'app.css');
    console.log('app.css served');    
    res.setHeader('Content-Type', mime.lookup('app.css'));
    //console.log(file.toString());
    res.send(file.toString());    
  });
  
  app.get('/app.min.css', function(req, res){
    var file = fs.readFileSync(DIR_PREFIX + 'app.min.css');
    console.log('app.min.css served');
    res.setHeader('Content-Type', mime.lookup('app.min.css'));
    //console.log(file.toString());
    res.send(file.toString());
  });
  
  app.listen(8080, '127.0.0.1', function(){
    console.log('%s: Node server started on %s:%s ...', Date(Date.now()), '127.0.0.1', '8080');
    return cb();
  });
    
};