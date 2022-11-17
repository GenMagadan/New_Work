import gulp from 'gulp';
import browserSync from 'browser-sync';

import gulpsass from 'gulp-sass';
import sasscomp from 'sass';

import concat from 'gulp-concat';
import cleancss from 'gulp-clean-css';

const sass = gulpsass(sasscomp);
const bsInstante = browserSync.create();
const outputPatch = './dist';
const fotoOutputPath = outputPatch.concat('/foto');
const jsOutputPath = outputPatch.concat('/js');

function browsersync() {
   bsInstante.init({
      server: { baseDir: outputPatch },
      notify: false,
      online: false
   });
}

function pages() {
   return gulp.src('basis/index.html')
      .pipe(gulp.dest(outputPatch))
      .pipe(bsInstante.stream());
}
function foto() {
   return gulp.src('basis/foto/*.*')
      .pipe(gulp.dest(fotoOutputPath))
      .pipe(bsInstante.stream());
}
function jscript() {
   return gulp.src('basis/js/*.*')
      .pipe(gulp.dest(jsOutputPath))
      .pipe(bsInstante.stream());
}
function styles() {
   return gulp.src('basis/*.scss')
      .pipe(sass())
      .pipe(gulp.dest(outputPatch))
      .pipe(concat('styles.min.css'))
      .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
      .pipe(gulp.dest(outputPatch))
      .pipe(bsInstante.stream());
}

function startwatch() {
   gulp.watch('basis/*.html').on('change', () => {
      pages();
      bsInstante.reload;
   });
   gulp.watch('basis/*.scss').on('change', () => {
      styles();
      bsInstante.reload;
   });
   gulp.watch('basis/foto/*.*').on('change', () => {
      foto();
      bsInstante.reload;
   });
}

const build = gulp.series(gulp.parallel(pages, styles, foto, jscript));
const serve = gulp.series(build, gulp.parallel(browsersync, startwatch));

export {
   build,
   serve
}

export default build;
