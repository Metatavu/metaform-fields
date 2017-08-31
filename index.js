/*jshint esversion: 6 */
/* global __dirname */

const path = require("path");
const pugLoad = require('pug-load');

module.exports = {
  
  templates: () => {
    return {
      resolve: (filename, source, pugOptions) => {
        if (filename.startsWith('metaform')) {
          return `${__dirname}/views${filename.substring(8)}`;
        }

        return pugLoad.resolve(filename, source, pugOptions);
      }
    };
  },
  
  public: () => {
    return `${__dirname}/public`;
  }
  
};