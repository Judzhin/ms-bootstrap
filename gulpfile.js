/** 
 * @access protected
 * @author Judzhin Miles <info[woof-woof]msbios.com>
 */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(["scss/*.scss"]).pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
    return gulp.src([
        'node_modules/bootstrap/js/dist/*.js',
        'src/*.js'

        // 'node_modules/popper.js/dist/umd/popper.min.js'
    ])
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"  
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
})

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
})

gulp.task('default', ['js','serve', 'fa', 'fonts']);