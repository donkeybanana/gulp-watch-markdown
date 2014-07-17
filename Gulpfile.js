var gulp = require('gulp')
  , watch = require('gulp-watch')
  , spawn = require('child_process').spawn;

gulp.task('default', function () {
  gulp.src('./src/**/*.*')
    .pipe(watch(function(files) {
      process.chdir('src');
      var pp = spawn('markdown-pp.py', [
        'index.mdpp',
        '../dist/README.md'
      ]);
      process.chdir('..');
      return pp;
    }));
});
