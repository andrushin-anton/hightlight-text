var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


//css
gulp.task('css', function () {
    gulp.src('./css/*.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename("styles/bundle.min.css"))
        .pipe(gulp.dest('./static'))
        .pipe(notify('Done!'));
});

//js
gulp.task('js', function() {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./static/js'))
});

//watch
gulp.task('watch', function(){
    gulp.watch('./css/*.css', ['css']);
    gulp.watch('./js/*.js', ['js']);
});

//default
gulp.task('default', ['css', 'js', 'watch']);