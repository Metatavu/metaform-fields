/* jshint esversion: 6 */
/* global module:false */

const _ = require('lodash');
const fs = require('fs');
const util = require('util');
const path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    'sass': {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'public/metaform/css',
          ext: '.min.css'
        }]
      }
    },
    'babel': {
      options: {
        sourceMap: true,
        minified: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: ['*.js'],
          dest: 'public/metaform/js/',
          ext: '.js'
        }]
      }
    }
  });
  
  grunt.registerTask('default', [ 'sass', 'babel' ]);
};