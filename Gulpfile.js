var gulp = require('gulp')
  , spawn = require('child_process').spawn
  , gaze = require('gaze')
  , util = require('gulp-util');

gulp.task('watch', function () {
  var gaze = require('gaze')
    , busy = false;

  gaze('src/**/*', function(err, watcher) {
    this.on('all', function(event, filepath) {
      // Primitive race condition prevention,
      // won't help the running process though...
      if (busy) {
        util.log(
          'Waiting for previous task to complete,',
          'stop hitting save'
        );
        return;
      }
      busy = true;

      util.log(filepath.split(process.cwd())[1], 'was', event);
      util.log('Running markdown-pp.py ...');

      process.chdir('src');

      var pp = spawn('markdown-pp.py', [
        'index.mdpp',
        '../README.md'
      ]);

      pp.on('exit', function(){
        util.log('Done');
        busy = false;
        process.chdir('..');
      });
    });
  });
});
