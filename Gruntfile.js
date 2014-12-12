module.exports = function (grunt) {

	var sassFiles = [
		'css/default.scss'
	]

	var jsFiles = [
		'lib/angular/angular.js',
		'lib/angular/extendHttp.js',
		'lib/angular/angular-ui-router.js',
		'js/init.js'
	]

	grunt.initConfig({
		sass: {
			dev: {
				options: {
					sourcemap: 'auto'
				},
				files: {
					'build/default.css': sassFiles
				}
			},
			prod: {
				options: {
					sourcemap: 'none',
					style: 'compressed'
				},
				files: {
					'build/default.css': sassFiles
				}
			}
		},
		uglify: {
			prod: {
				options: {
					sourceMap: true,
					mangle: false
				},
				files: {
					'build/scripts.min.js': jsFiles
				}
			}
		},
		'string-replace': {
			dev: {
				files: {
					'index.html': 'index.html'
				},
				options: {
					replacements: [
						{
							pattern: /\<\!\-\-\$dev\s/,
							replacement: function () {
								return '<!--$dev-->'
							}
						},
						{
							pattern: /dev\&\-\-\>/,
							replacement: function () {
								return '<!--&dev-->'
							}
						},
						{
							pattern: /\<\!\-\-\$prod\-\-\>/,
							replacement: function () {
								return '<!--$prod'
							}
						},
						{
							pattern: /\<\!\-\-\&prod\-\-\>/,
							replacement: function () {
								return '&prod-->'
							}
						}
					]
				}
			},
			prod: {
				files: {
					'index.html': 'index.html'
				},
				options: {
					replacements: [
						{
							pattern: /\<\!\-\-\$prod/,
							replacement: function () {
								return '<!--$prod-->'
							}
						},
						{
							pattern: /\&prod\-\-\>/,
							replacement: function () {
								return '<!--&prod-->'
							}
						},
						{
							pattern: /\<\!\-\-\$dev\-\-\>/,
							replacement: function () {
								return '<!--$dev'
							}
						},
						{
							pattern: /\<\!\-\-\&dev\-\-\>/,
							replacement: function () {
								return '&dev-->'
							}
						}
					]
				}
			}
		},
		watch: {
			_sass: {
				files: sassFiles,
				tasks: ['sass:dev'],
				options: {
					nospawn: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass:dev', 'string-replace:dev', 'watch']);
	grunt.registerTask('prod', ['sass:prod', 'string-replace:prod', 'uglify']);
}