module.exports = function( grunt ) {
  'use strict';

  var pkg = grunt.file.readJSON('package.json'),
      dirs = {
        src: 'src/',
        test: 'test/'
      },
      forEach = grunt.util._.forEach;

  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  grunt.initConfig({

    pkg: pkg,
    dirs: dirs,

    copy: {
      options: {
        processContent: grunt.template.process
      },
      prod: {
        files: {
          '<%= pkg.name %>.js': dirs.src + pkg.name + '.js'
        }
      }
    },

    // JavaScript minification
    uglify: {
      options: {
        banner: '/*! <%= pkg.title %> v<%= pkg.version %> */'
      },
      prod: {
        files: {
          '<%= pkg.name %>.min.js': pkg.name + '.js'
        }
      }
    },

    // Tests
    nodeunit : {
      dev: [dirs.test + '**/*.js']
    }
  });

  // Load tasks and helpers from the "tasks" directory, relative to gruntfile.js.
  // grunt.loadTasks('tasks');

  // Load tasks and helpers from the Npm-installed grunt plugins.
  var deps = Object.keys(pkg.devDependencies);
  forEach(deps, function(dep) {
    if (-1 !== dep.search(/^grunt-/)) {
      grunt.loadNpmTasks(dep);
    }
  });

  // Default task.
  grunt.registerTask('default', ['nodeunit', 'copy', 'uglify']);
};
