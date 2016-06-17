// Include gulp
var gulp = require('gulp');

// Config file
var config = require('./config.json')

// Auto load all required plugins
var $ = require('gulp-load-plugins')({
	pattern: '*',
	scope: 'dependencies'
});

// Messages data for notify to display
var messages = {
	error: function(err) {
		$.notify.onError({
			title: config.messages.error.title,
			message: config.messages.error.message,
		}) (err);

		this.emit('end');
	},
	success: {
		title: config.messages.success.title,
		message: config.messages.success.message,
		onLast: true
	}
};

// Load tasks from files
$.loadSubtasks('tasks/*.js', $, config, messages);

// Default Gulp task to Run
gulp.task('default', function() {
	gulp.start('build', 'watch');
});

// Gulp build task to run all tasks just once
gulp.task('build', function() {
	gulp.start('scripts');
});
