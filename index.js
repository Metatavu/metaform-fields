/*jshint esversion: 6 */
/* global __dirname */
(() => {
  'use strict';
  
  const _ = require('lodash');
  const path = require("path");
  const pugLoad = require('pug-load');

  class LocalizationUtils {

    static resolveLocaleKey(string) {
      const match = /^\[\[([.a-z-A-Z0-9]*)\]\]$/.exec(string);
      if (match && match.length > 1) {
        return match[1];
      }

      return null;
    }

    static localizeProperty(i18n, object, propertyName) {
      if (object[propertyName]) {
        const localeKey = LocalizationUtils.resolveLocaleKey(object[propertyName]);
        const localizedValue = localeKey ? i18n.__(localeKey) : null;

        if (localizedValue) {
          object[propertyName] = localizedValue;
        }
      }
    }

    static localizeFormField(i18n, formField) {
      if (formField.options) {
        _.forEach(formField.options, (option) => {
          LocalizationUtils.localizeProperty(i18n, option, 'text');
        });
      }

      const localizableProperties = ['title', 'text'];

      _.forEach(localizableProperties, (localizableProperty) => {
        LocalizationUtils.localizeProperty(i18n, formField, localizableProperty);
      });
    }

    static localizeFormSection(i18n, section) {
      _.forEach(section.fields, (field) => {
        LocalizationUtils.localizeFormField(i18n, field);
      });
    }

  }

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
    },

    localizeViewModel(i18n, viewModel) {
      _.forEach(viewModel.sections, (section) => {
        LocalizationUtils.localizeFormSection(i18n, section);
      });

      LocalizationUtils.localizeProperty(i18n, viewModel, 'title');

      return viewModel;
    }

  };
})();