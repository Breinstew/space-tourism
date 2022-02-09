let preprocessor = 'sass';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import less from 'gulp-less';

import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin-fix';
import newer from 'gulp-newer';
import del from 'del';




browserSync.create();
export const browsersync = () => {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: true
  })
}


export const scripts = () => {
  return gulp.src([
    'app/js/app.js'
  ])
  .pipe(concat('app.min.js'))
  .pipe(uglify.default())
  .pipe(gulp.dest('app/js/'))
  .pipe(browserSync.stream())
}


export const styles = () => {
  return gulp.src('app/' + preprocessor + '/main.' + preprocessor + '')
  .pipe(eval(preprocessor)())
  .pipe(concat('app.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true}))
  .pipe(cleancss(( {level: { 1: {specialComments: 0 } }, format: 'beautify'} )))
  .pipe(gulp.dest('app/css/'))
  .pipe(browserSync.stream())
}


export const images = () => {
  return gulp.src('app/images/src/**/*')
  .pipe(newer('app/images/dest/'))
  .pipe(imagemin())
  .pipe(gulp.dest('app/images/dest/'))
}


export const cleanImg = () => {
  return del('app/images/dest/**/*', {force: true});
}


export const cleanDist = () => {
  return del('dist/**/*', {force: true});
}


const buildCopy = () => {
  return gulp.src(['app/css/**/*.min.css',
                   'app/js/**/*.min.js',
                   'app/images/dest/**/*',
                   'app/**/*.html', 
                  ], {base: 'app'})
                   .pipe(gulp.dest('dist'));
}

export const startWatch = () => {
  gulp.watch('app/**/' + preprocessor + '/**/*', styles);
  gulp.watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  gulp.watch('app/**/*.html').on('change', browserSync.reload);
  gulp.watch('app/images/src/**/*', images);
}


export const build = gulp.series(cleanDist, styles, scripts, images, buildCopy);

export default gulp.parallel(styles, scripts, browsersync, startWatch);
