# gpageinsights

[![Build Status](https://travis-ci.org/Weborrent/gpageinsights.svg?branch=master)](https://travis-ci.org/Weborrent/gpageinsights)
[![Coverage Status](https://img.shields.io/coveralls/Weborrent/gpageinsights.svg)](https://coveralls.io/r/Weborrent/gpageinsights)

<a href="https://david-dm.org/Weborrent/gpageinsights#info=dependencies&view=table"><img src="https://david-dm.org/Weborrent/gpageinsights.png"></a>
<a href="https://david-dm.org/Weborrent/gpageinsights#info=devDependencies&view=table"><img src="https://david-dm.org/Weborrent/gpageinsights/dev-status.svg"/></a>
<br/>

> Ensure specific Google Page Insight tests are passing before your build passes.
> (eg use case: I want the build to fail if Javascript and HTML are not minified.)
> For best usage, use it with ngrok (Obtain a web url for localhost and run insights against the web url that has access to your localhost server)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gpageinsights --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('gpageinsights');
```

## The "gpageinsights" task

### Overview
In your project's Gruntfile, add a section named `gpageinsights` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gpageinsights: {
    options: {
      url: MY_WEB_URL_OR_NGROK_URL
      /*Add verify_GOOGLE_INSIGHT_NAME : EXPECTED_SCORE*/
      /*eg: verify_MinifyCss: 0, verify_MinifyJavaScript: 0*/      
    }
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Ensure Javascript and CSS are minfied
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  gpageinsights: {
    options: {
      url: MY_WEB_URL_OR_NGROK_URL,      
      verify_MinifyCss: 0, 
      verify_MinifyJavaScript: 0
    },    
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
