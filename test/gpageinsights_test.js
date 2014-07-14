'use strict';

var expect = require('chai').expect;
var ngrok = require('ngrok');

describe('test All',
    function() {
      var ngrokUrl;
      
      before(function(done) {        
        ngrok.connect({
          port: 8080
        }, function(err, url) {
          if (err !== null) {
            grunt.fail.fatal(err);
            return done();
          }
          
          ngrokUrl = url;
          process.env.NGROK_URI = url.replace(/http:\/\/|https:\/\//, '');
          console.log('process ngrok url: ' + process.env.NGROK_URI);
          console.log('ngrok url: ' + url);          
          //initiate server listening process
          require('./libs/server')(done);          
        });
      });

      describe('/', function() {
        var runTask = require('grunt-run-task');
        runTask.loadTasks('tasks');
        it('should be good when everything is minified', function(done) {
          
          runTask('gpageinsights:t1', {
            t1: {options: {
              url: ngrokUrl + "?jsmin=true&cssmin=true",
              verify_MinifyHTML: 0,
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0
            }}        
          }, function(err, task){
            if(err){
              console.dir(err);
              expect(true).to.equal(false);
              return done();
            }
            //expect(err).to.equal('undefined');
            return done();            
          });                              
        });
      });
      
      describe('Fail JS not minified', function() {
        var runTask = require('grunt-run-task');
        runTask.loadTasks('tasks');
        runTask.option('force', true);
        it('should fail js not minified', function(done) {          
          //var gpageinsight = require('../tasks/gpageinsights')(grunt);
          
          runTask('gpageinsights:t2', {
            t2: {options: {
              url: ngrokUrl + "?cssmin=true",
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0
            }}        
          }, function(err, task){
            if(err){
              //console.dir('An error occured:' + err);
              expect(err).to.equal('One or more criteria failed. Please see above lines for details.');
              expect(err).to.not.equal('null');
              return done();
            } else{
              expect(true).to.equal(false);
              return done();
            }                                   
          });                              
        });
      });
      
      describe('Fail CSS not minified', function() {
        var runTask = require('grunt-run-task');
        runTask.loadTasks('tasks');
        runTask.option('force', true);
        it('should fail css not minified', function(done) {          
          //var gpageinsight = require('../tasks/gpageinsights')(grunt);
          
          runTask('gpageinsights:t2', {
            t2: {options: {
              url: ngrokUrl + "?jsmin=true",
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0
            }}        
          }, function(err, task){
            if(err){
              expect(err).to.equal('One or more criteria failed. Please see above lines for details.');
              expect(err).to.not.equal('null');
              return done();
            } else{
              expect(true).to.equal(false);
              return done();
            }                                   
          });                              
        });
      });
      
      describe('URL not specified', function() {
        var runTask = require('grunt-run-task');        
        runTask.loadTasks('tasks');
        runTask.option('force', true);
        it('should fail when url is not specified', function(done) {                              
          runTask('gpageinsights:t2', {
            t2: {options: {
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0
            }}        
          }, function(err, task){
            console.log('no url return');
            if(err){
              expect(err).to.not.equal('undefined');
              expect(err).to.not.equal('null');              
              return done();              
            } else{              
              expect(true).to.equal(false);
              return done();
            }                                   
          });                              
        });
      });
      
      describe('Wrong key specified', function() {
        var runTask = require('grunt-run-task');
        runTask.loadTasks('tasks');
        runTask.option('force', true);
        it('should fail when key is faked', function(done) {                              
          runTask('gpageinsights:t2', {
            t2: {options: {
              url: ngrokUrl + "?jsmin=true",
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0,
              key: 'fakefortest'
            }}        
          }, function(err, task){
            if(err){
              console.log(err);
              expect(err).to.not.equal('undefined');
              expect(err).to.not.equal('null');
              return done();
            } else{
              expect(true).to.equal(false);
              return done();
            }                                   
          });                              
        });
      });
      
    });