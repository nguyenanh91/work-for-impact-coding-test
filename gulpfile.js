const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const flatten = require('gulp-flatten');
const purgecss = require('gulp-purgecss');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const cssnanoAdvanced = require('cssnano-preset-advanced');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const plumber = require('gulp-plumber');

function compileCSS() {
  return gulp.src([
      'styles/base/base.scss',
      'styles/components/*.scss',
      'styles/sections/*.scss',
      'styles/templates/*.scss',
    ])
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed', silenceDeprecations: ['legacy-js-api'] }).on('error', sass.logError))
    .pipe(flatten())
    .pipe(postcss([
      cssnano({
        preset: [cssnanoAdvanced, { zindex: false }],
      }),
    ]))
    .pipe(gulp.dest('./assets'))
}

const terserOptions = {
  compress: {
    dead_code: true,
    drop_debugger: true,
    conditionals: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: true,
    hoist_funs: true,
    keep_fargs: false,
    hoist_vars: true,
    if_return: true,
    join_vars: true,
    side_effects: true,
    warnings: false,
    drop_console: true,
  },
  mangle: false,
  output: {
    comments: false,
  }
}

function compileCartDrawerJs() {
  return gulp
    .src([
      'scripts/cart/cart.js',
      'scripts/cart/cart-drawer.js',
    ])
    .pipe(plumber())
    .pipe(cached('cart-drawer'))
    .pipe(remember('cart-drawer'))
    .pipe(concat('cart-drawer.js'))
    .pipe(terser(terserOptions))
    .pipe(gulp.dest('assets/'))
}

function compileCartNotificationJs() {
  return gulp
    .src([
      'scripts/cart/cart.js',
      'scripts/cart/cart-notification.js',
    ])
    .pipe(plumber())
    .pipe(cached('cart-notification'))
    .pipe(remember('cart-notification'))
    .pipe(concat('cart-notification.js'))
    .pipe(terser(terserOptions))
    .pipe(gulp.dest('assets/'))
}

function compileComponentJs() {
  return gulp
    .src([
      'scripts/components/*.js',
    ])
    .pipe(terser(terserOptions))
    .pipe(gulp.dest('assets/'))
}

function compileCoreJs() {
  return gulp
    .src([
      'scripts/core/constants.js',
      'scripts/core/pubsub.js',
      'scripts/core/global.js',
      'scripts/core/details-disclosure.js',
      'scripts/core/details-modal.js',
      'scripts/core/search-form.js',
    ])
    .pipe(plumber())
    .pipe(cached('core'))
    .pipe(remember('core'))
    .pipe(concat('core.js'))
    .pipe(terser(terserOptions))
    .pipe(gulp.dest('assets/'))
}

function watchFiles() {
  gulp.watch('styles/**/*.scss', compileCSS);
  gulp.watch('scripts/cart/*.js', gulp.series(compileCartDrawerJs, compileCartNotificationJs));
  gulp.watch('scripts/core/*.js', compileCoreJs);
  gulp.watch('scripts/components/*.js', compileComponentJs);
}

gulp.task('compile-css', compileCSS);
gulp.task('compile-core', compileCoreJs);
gulp.task('compile-components', compileComponentJs);
gulp.task('watch', watchFiles);
gulp.task('build', gulp.parallel('compile-css', 'compile-core', 'compile-components'));
gulp.task('default', gulp.parallel('compile-css', 'compile-core', 'compile-components', 'watch'));
