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
const critical = require('critical');

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
      'scripts/core/lozad.js',
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

function compileProductCriticalCSS() {
  return critical.generate({
    base: './',
    inline: false,
    src: 'snapshots/product.html',
    css: [
      'assets/base.css',
      'assets/component-cart-items.css',
      'assets/component-cart-drawer.css',
      'assets/component-cart.css',
      'assets/component-totals.css',
      'assets/component-price.css',
      'assets/component-discounts.css',
      'assets/component-predictive-search.css',
      'assets/quantity-popover.css',
      'assets/component-slideshow.css',
      'assets/component-slider.css',
      'assets/component-list-menu.css',
      'assets/component-search.css',
      'assets/component-menu-drawer.css',
      'assets/component-price.css',
      'assets/section-main-product.css',
      'assets/component-accordion.css',
      'assets/component-deferred-media.css',
      'assets/component-product-variant-picker.css',
      'assets/component-swatch-input.css',
      'assets/component-swatch.css',
      'assets/component-pickup-availability.css',
      'assets/component-card.css',
      'assets/section-footer.css',
      'assets/component-newsletter.css',
      'assets/component-list-menu.css',
      'assets/component-list-payment.css',
      'assets/component-list-social.css',
    ],
    dimensions: [
      { width: 320, height: 480 },
      { width: 768, height: 1024 },
      { width: 1280, height: 960 }
    ],
    target: {
      css: './snippets/product-critical-css.liquid',
    },
    ignore: ['@font-face']
  });
}

function compileHomePageCriticalCSS() {
  return critical.generate({
    base: './',
    inline: false,
    src: 'snapshots/index.html',
    css: [
      'assets/base.css',
      'assets/section-image-banner.css',
      'assets/component-cart-items.css',
      'assets/component-cart-drawer.css',
      'assets/component-cart.css',
      'assets/component-totals.css',
      'assets/component-price.css',
      'assets/component-discounts.css',
      'assets/component-predictive-search.css',
      'assets/quantity-popover.css',
      'assets/component-slideshow.css',
      'assets/component-slider.css',
      'assets/component-list-menu.css',
      'assets/component-search.css',
      'assets/component-menu-drawer.css',
      'assets/component-price.css',
      'assets/section-main-product.css',
      'assets/component-accordion.css',
      'assets/component-deferred-media.css',
      'assets/component-product-variant-picker.css',
      'assets/component-swatch-input.css',
      'assets/component-swatch.css',
      'assets/component-pickup-availability.css',
      'assets/component-card.css',
      'assets/section-footer.css',
      'assets/component-newsletter.css',
      'assets/component-list-menu.css',
      'assets/component-list-payment.css',
      'assets/component-list-social.css',
    ],
    dimensions: [
      { width: 320, height: 480 },
      { width: 768, height: 1024 },
      { width: 1280, height: 960 }
    ],
    target: {
      css: './snippets/homepage-critical-css.liquid',
    },
    ignore: ['@font-face']
  });
}

function watchFiles() {
  gulp.watch('styles/**/*.scss', compileCSS);
  gulp.watch('scripts/cart/*.js', gulp.series(compileCartDrawerJs, compileCartNotificationJs));
  gulp.watch('scripts/core/*.js', compileCoreJs);
  gulp.watch('scripts/components/*.js', compileComponentJs);
}

gulp.task('compile-css', compileCSS);
gulp.task('compile-product-critical-css', compileProductCriticalCSS);
gulp.task('compile-homepage-critical-css', compileHomePageCriticalCSS);
gulp.task('compile-core', compileCoreJs);
gulp.task('compile-components', compileComponentJs);
gulp.task('watch', watchFiles);
gulp.task('build', gulp.parallel('compile-css', 'compile-product-critical-css', 'compile-homepage-critical-css', 'compile-core', 'compile-components'));
gulp.task('dev', gulp.parallel('compile-css', 'compile-core', 'compile-components', 'watch'));
