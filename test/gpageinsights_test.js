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
          
          runTask('gpageinsights:t0', {
            t0: {options: {
              url: ngrokUrl + "?jsmin=true&cssmin=true",
              verify_MinifyHTML: 0,
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0
            }}        
          }, function(err, task){
            if(err){
              console.dir(err);
              console.log('All good error');
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
          
          runTask('gpageinsights:t1', {
            t1: {options: {
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
              console.log('JS Min error');
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
              console.log('CSS Min error');
              expect(true).to.equal(false);
              return done();
            }                                   
          });                              
        });
      });
                  
      describe('Minimum verify MinimizeRenderBlockingResources Positive', function() {
        var runTask = require('grunt-run-task');
        runTask.loadTasks('tasks');
        //runTask.option('force', true);
        it('should Pass when Min MinimizeRenderBlockingResources value is too high', function(done) {                              
          runTask('gpageinsights:t5', {
            t5: {options: {
              url: ngrokUrl + "?jsmin=true&cssmin=true",
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0,
              minverify_MinimizeRenderBlockingResources: 20
            }}        
          }, function(err, task){
            if(err){
              console.log(err);
              console.log('MinimizeRenderBlockingResources Positive failed');
              expect(true).to.equal(false);              
              return done();
            } else{
              expect(true).to.equal(true);              
              return done();
            }                                   
          });                              
        });
      });
      
      describe('Minimum verify MinimizeRenderBlockingResources Negative', function() {
        var runTask = require('grunt-run-task');
        runTask.loadTasks('tasks');
        runTask.option('force', true);
        it('should Fail when Min MinimizeRenderBlockingResources value is too low', function(done) {                              
          runTask('gpageinsights:t6', {
            t6: {options: {
              url: ngrokUrl + "?jsmin=true&cssmin=true",
              verify_MinifyJavaScript: 0,
              verify_MinifyCss: 0,
              minverify_MinimizeRenderBlockingResources: 1
            }}        
          }, function(err, task){
            if(err){
              console.log(err);
              expect(true).to.equal(true);              
              return done();
            } else{
              expect(false).to.equal(true);              
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
        runTask('gpageinsights:t4', {
          t4: {options: {
            url: ngrokUrl + "?jsmin=true&cssmin=true",
            verify_MinifyJavaScript: 0,
            verify_MinifyCss: 0,
            key: 'fakefortest'
          }}        
        }, function(err, task){
          if(err){
            console.log('Wrong key got an expected error for url - ' + ngrokUrl + "?jsmin=true&cssmin=true");
            console.log(err);
            expect(err).to.not.equal('undefined');
            expect(err).to.not.equal('null');
            return done();
          } else{
            console.log('Wrong key no error');
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
        runTask('gpageinsights:t3', {
          t3: {options: {
            verify_MinifyJavaScript: 0,
            verify_MinifyCss: 0
          }}        
        }, function(err, task){          
          if(err){
            console.log('No URL got an expected error');
            console.log(err);
            expect(err).to.not.equal('undefined');
            expect(err).to.not.equal('null');              
            return done();              
          } else{
            console.log('No Url Error');
            expect(true).to.equal(false);
            return done();
          }                                   
        });                              
      });
    });
              
  });