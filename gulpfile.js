var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');


var path = {
  HTML: 'src/index.html',
  IMAGES: ['src/images/*.*', 'src/images/**/*.*'],
  ALL: ['src/images/*.*',
        'src/js/*.js',
        'src/js/**/*.js',
        'src/css/*.css',
        'src/index.html'],
  JS: ['bower_components/jquery/dist/jquery.js',
       'bower_components/bootstrap/dist/js/bootstrap.js'],
  CSS: ['bower_components/bootstrap/dist/css/bootstrap.css',
        'src/styles/*.css'],
  DEP: 'dep.min.js',
  MIN_CSS_OUT: 'main.min.css'
};

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest("dist/js"));
});

gulp.task('buildbower', function(){
  gulp.src(path.JS)
    .pipe(concat(path.DEP))
    .pipe(uglify(path.DEP))
    .pipe(gulp.dest('dist/js/utils'));
});

gulp.task('buildcss', function() {
  gulp.src(path.CSS)
    .pipe(concat(path.MIN_CSS_OUT))
    .pipe(cssmin({keepBreaks: false}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('replaceHTML', function() {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js' : 'js/utils/dep.min.js',
      'css' : 'styles/main.min.css'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  gulp.src(path.IMAGES)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest("dist/images"));
});

gulp.task('default', ['browserify', 'replaceHTML', 'buildbower','buildcss','images']);

gulp.task('watch', function() {
  gulp.watch(path.ALL, ['default']);
});