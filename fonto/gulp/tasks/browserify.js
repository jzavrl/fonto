module.exports = function(gulp, $, config, messages) {
	gulp.task('browserify', function() {
		return gulp.src(config.scripts.bundle.source)
			.pipe($.plumber({
				errorHandler: messages.error
			}))
			.pipe($.browserify())
			.pipe($.uglify())
			.pipe(gulp.dest(config.scripts.bundle.destination))
			.pipe($.notify(messages.success));
	});
};
