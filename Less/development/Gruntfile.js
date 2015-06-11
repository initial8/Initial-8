module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),


		less: {
			style: {
				options: {
					sourceMap: true
				},
				files: {
					".tmp/style.css": "less/style/style.less"
				}
			},
			plugins: {
				options: {
					sourceMap: true
				},
				files: {
					".tmp/plugins.css": "less/plugins/plugins.less"
				}
			},
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
				files: ['less/plugins/plugins.less', 'less/style/style.less'],
				tasks: ['less', 'autoprefixer', 'cssmin']
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