module.exports = function ( grunt ) {

  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      jquery: {
        src: [
          'lib/utils.js',
          'lib/adapters/placeholders.jquery.js'
        ],
        dest: 'build/placeholders.jquery.js'
      },
      prototype: {
        src: [
          'lib/main.js',
          'lib/adapters/placeholders.prototype.js'
        ],
        dest: 'build/placeholders.prototype.js'
      },
      yui3: {
        src: [
          'lib/main.js',
          'lib/adapters/placeholders.yui3.js'
        ],
        dest: 'build/placeholders.yui3.js'
      }
    },

    uglify: {
      options: {
        banner: '/* Placeholders.js v<%= pkg.version %> */\n'
      },
      build: {
        files: {
          'build/placeholders.min.js': [
            'build/placeholders.js'
          ],
          'build/placeholders.jquery.min.js': [
            'build/placeholders.jquery.js'
          ],
          'build/placeholders.prototype.min.js': [
            'build/placeholders.prototype.js'
          ],
          'build/placeholders.yui3.min.js': [
            'build/placeholders.yui3.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'concat',
    'uglify'
  ]);
};
