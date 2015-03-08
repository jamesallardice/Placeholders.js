module.exports = function ( grunt ) {

  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      lib: {
        src: 'lib/placeholders.js',
        dest: 'dist/placeholders.js'
      }
    },

    concat: {
      jquery: {
        src: [
          'lib/placeholders.js',
          'lib/adapters/placeholders.jquery.js'
        ],
        dest: 'dist/placeholders.jquery.js'
      },
      prototype: {
        src: [
          'lib/placeholders.js',
          'lib/adapters/placeholders.prototype.js'
        ],
        dest: 'dist/placeholders.prototype.js'
      },
      yui3: {
        src: [
          'lib/placeholders.js',
          'lib/adapters/placeholders.yui3.js'
        ],
        dest: 'dist/placeholders.yui3.js'
      }
    },

    uglify: {
      options: {
        banner: '/* Placeholders.js v<%= pkg.version %> */\n',
        preserveComments: 'some'
      },
      build: {
        files: {
          'dist/placeholders.min.js': [
            'dist/placeholders.js'
          ],
          'dist/placeholders.jquery.min.js': [
            'dist/placeholders.jquery.js'
          ],
          'dist/placeholders.prototype.min.js': [
            'dist/placeholders.prototype.js'
          ],
          'dist/placeholders.yui3.min.js': [
            'dist/placeholders.yui3.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', [
    'copy',
    'concat',
    'uglify'
  ]);
};
