module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				style: 'expanded',
				sourcemap: 'file',
				noCache: true
			},
			style: {
				files: [{
					expand: true,
					cwd: 'sass/style',
					src: ['*.{scss,sass}'],
					dest: '.tmp',
					ext: '.css'
				}]
			},
			plugins: {
				files: [{
					expand: true,
					cwd: 'sass/plugins',
					src: ['*.{scss,sass}'],
					dest: '.tmp',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
			},
			style: {
				files: [{
					expand: true,
					cwd: '.tmp/',
					src: 'style.css',
					dest: '.tmp/'
				}]
			}
		},

		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: '.tmp/',
		      src: ['*.css', '!*.min.css'],
		      dest: '../production/css/',
		      ext: '.min.css'
		    }]
		  }
		},

		uglify: {
			options: {
				
			},
			app: {
				src: [ 'javascript/app/*.js'],
				dest: '../production/js/app.min.js'
			},
			plugins: {
				src: [ 'javascript/plugins/*.js'],
				dest: '../production/js/plugins.min.js'
			}
		},

		jade: {
			files: {
				options: {
					debug: false,
					pretty: true
				},
				files: [ {
					cwd: "",
					src: "*.jade",
					dest: "../production/",
					expand: true,
					ext: ".html"
				} ]
			},
		},

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 9000,
					base: '../production/',
					open: true,
					livereload: 35729
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['sass/plugins/*.scss', 'sass/style/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			js: {
				files: ['javascript/app/*.js', 'javascript/plugins/*.js'],
				tasks: ['uglify']
			},
			jade: {
				files: ['*.jade'],
				tasks: ['jade']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			}
		}

});

    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);

};