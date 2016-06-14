module.exports = function(gulp, $, config, messages) {
  gulp.task('watch', function() {
    // Watch for the application file changes
  	gulp.watch([config.scripts.application.source, config.scripts.application.modules], ['scripts']);

    // Watch for application bundle changes
    gulp.watch(config.scripts.bundle.source, ['browserify']);
  });
};
