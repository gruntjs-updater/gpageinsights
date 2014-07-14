/*
 * gpageinsights
 * https://github.com/Weborrent/gpageinsights
 *
 * Copyright (c) 2014 Prasun
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    gpageinsights: {
      default_options: {
        options: {
          verify_MinifyCss: 0,
          verify_MinifyJavaScript: 1,
          verify_LeverageBrowserCaching: 4,
          verify_MinimizeRenderBlockingResources: 8,
          verify_OptimizeImages: 4,
          url: 'http://prasun.io'
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }      
    },        

    mocha_istanbul:{
      coverage : {
        src : 'test', // the folder, not the files
        options : {
          mask : '*test.js',
          timeout : 30000,
          reporter : 'spec',
          coverageFolder : 'test/coverage',
          check : {
            lines : 100,
            statements : 100
          }
        }
      },
      coveralls : {
        src : 'test', // the folder, not the files
        options : {
          mask : '*test.js',
          timeout : 30000,
          reporter : 'spec',
          coverage : true,
          coverageFolder : 'test/coverage',
          check : {
            lines : 100,
            statements : 100
          }
        }
      }    
    }  
  });
  
  grunt.event.on('coverage', function(lcov, done) {
    require('coveralls').handleInput(lcov, function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
  grunt.registerTask('testCoveralls', ['mocha_istanbul:coveralls']);
  // To run unit with coverage report
  grunt.registerTask('testCoverage', ['mocha_istanbul:coverage' ]);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'gpageinsights'/*, 'nodeunit'*/]);
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  //grunt.option('force', true);

};
