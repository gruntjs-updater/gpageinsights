/*
 * gpageinsights
 * https://github.com/Weborrent/gpageinsights
 *
 * Copyright (c) 2014 Prasun
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('gpageinsights', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    
    var done = this.async(),
      options = this.data.options,
      pagespeed;
    
    if(options.nokey === undefined && options.key === undefined){
      options.nokey = true;
    }
    
    //console.log(options);
    
    if(typeof options.url !== 'string' && !(options.url instanceof String)){
      grunt.fatal("Url is required.");
    }
    
    pagespeed = require('gpagespeed');    

    pagespeed(options, function(err, result){
      var res,
        verify;
      if(err) {
        grunt.fatal("Well, Url is required.");
        return done(result);
      }
      result = JSON.parse(result);
      var errors = [];
      for(res in result.formattedResults.ruleResults){
        verify = options['verify_' + res];
        //console.log('Rule: ' + res + " :" + result.formattedResults.ruleResults[res].ruleImpact + ('. verify_' + res) + " Verify: " + verify);        
        if(verify !== undefined && verify !== null && (result.formattedResults.ruleResults[res].ruleImpact !== 0 && 
            result.formattedResults.ruleResults[res].ruleImpact !== verify.ruleImpact)){
          errors.push(res + " test failed. Actual ruleImpact: " + 
              result.formattedResults.ruleResults[res].ruleImpact + ". Expected: " + verify);
        }
      }
      if(errors.length !== 0){
        grunt.fatal(errors.join("\n"));        
      }
      
      return done(result);      
    });


    // Iterate over all specified file groups.
    /*this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  });

};
