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
    
    var done = this.async(),
      options = this.data.options,
      optionCopy,
      pagespeed,
      errors = [];
    
    if(options.nokey === undefined && options.key === undefined){
      options.nokey = true;
    } 
    
    pagespeed = require('gpagespeed');    
    pagespeed(options, function(err, result){
      var res,
        verify,
        minVerify;
      
      if(err) {
        //console.dir('GRUNT ERROR!');
        //console.dir(err);
        grunt.fail.warn(err);
        return done(err);
      }            
      result = JSON.parse(result);            
      
      if(result.error){
        //In case of wrong key, pagespeed npm doesnt throws any error 
        //console.dir(result.error);
        grunt.log.error(result.error);
        grunt.fail.warn(result.error.message);
        return done(result.error.message);
      }            
            
      for(res in result.formattedResults.ruleResults){
        verify = options['verify_' + res];
        minVerify = options['minverify_' + res];
        /*console.log('Rule: ' + res + " :" + 
            result.formattedResults.ruleResults[res].ruleImpact + 
            ('. verify_' + res) + " Verify: " + verify + 
            " MinVerify:" + minVerify);*/
        //score of zero should always pass
        if(verify !== undefined && verify !== null && (result.formattedResults.ruleResults[res].ruleImpact !== 0 && 
            result.formattedResults.ruleResults[res].ruleImpact !== verify)){
          errors.push(res + " test failed. Actual ruleImpact: " + 
              result.formattedResults.ruleResults[res].ruleImpact + ". Expected: " + verify);          
        }
        
        if(minVerify !== undefined && minVerify !== null && (result.formattedResults.ruleResults[res].ruleImpact !== 0 && 
            result.formattedResults.ruleResults[res].ruleImpact > minVerify)){
          errors.push(res + " test failed. Actual ruleImpact: " + 
              result.formattedResults.ruleResults[res].ruleImpact + ". Expected Minimum: " + minVerify);          
        }
      }
      if(errors.length !== 0){
        grunt.log.error(errors.join("\n"));
        grunt.fail.warn('One or more criteria failed. Please see above lines for details.');        
      }
      
      return done(result);
    });

  });

};
