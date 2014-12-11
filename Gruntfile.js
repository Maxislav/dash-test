module.exports = function (grunt) {

	var sassFiles = [
		'css/default.scss'
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
					style : 'compressed'
				},
				files: {
					'build/default.css': sassFiles
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


	grunt.registerTask('default', ['sass:dev', 'watch']);
}