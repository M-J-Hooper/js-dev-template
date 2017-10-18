var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var mocha = require('gulp-mocha');


var paths = {
    dist: 'dist',
    dev: 'dev',
    test: 'test'
};
var alljs = path => path+'/**/*.js';
paths.defaultjs = [alljs(paths.dev), alljs(paths.test)];

var defaultTasks = ['lint', 'test', 'compress'];

gulp.task('default', defaultTasks.concat('watch'));

gulp.task('lint', function() {
    return gulp.src(paths.defaultjs)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    return gulp.src(alljs(paths.test))
        .pipe(mocha({
            reporter: 'progress'
        }));
});

gulp.task('compress', function() {
    return gulp.src(alljs(paths.dev))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('beautify', function() {
    return gulp.src(paths.defaultjs)
        .pipe(beautify({
            indent_size: 4
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(paths.defaultjs, defaultTasks);
});