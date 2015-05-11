var gulp = require('gulp');
var mocha = require('gulp-mocha');
 
gulp.task('test', function () {
    return gulp.src('test/**/*Test.js', {read: false})
        .pipe(mocha({
        	reporter: 'spec'
        }))
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });;
});

gulp.task('default', ['test'], function() {
	// place code for your default task here
});
