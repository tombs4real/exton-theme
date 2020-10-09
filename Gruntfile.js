module.exports = function(grunt) {

  // Project config.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          assetCacheBuster: false,
          cache: false,
          cacheDir: 'css/sass/.sass-cache',
          sassDir: 'css/sass',
          cssDir: 'css',
          outputStyle: 'compressed',
          noLineComments: true
        }
      }
    },

    uglify: {
      build: {
        src: 'js/app.js',
        dest: 'js/app.min.js'
      }
    },

    // Watch Sass Updates
    watch: {
      css: {
        files: ['css/sass/**/*.sass'],
        tasks: ['compass'],
      },
      scripts: {
        files: ['js/app.js'],
        tasks: ['uglify'],
      },
    },

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Run tasks
  grunt.registerTask('default', ['compass', 'uglify', 'watch']);

};
