module.exports = function(gulp, $, config, messages) {
	gulp.task('scripts', function() {
		return gulp.src([config.scripts.application.source, config.scripts.application.modules])
			.pipe($.plumber({
				errorHandler: messages.error
			}))
			.pipe($.sourcemaps.init())
			.pipe($.concat(config.scripts.application.file))
			.pipe($.ngAnnotate())
			.pipe($.uglify())
			.pipe($.sourcemaps.write(config.scripts.application.sourcemaps))
			.pipe(gulp.dest(config.scripts.application.destination))
			.pipe($.notify(messages.success));
	});
};
