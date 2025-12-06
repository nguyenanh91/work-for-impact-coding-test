const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const flatten = require('gulp-flatten');
const purgecss = require('gulp-purgecss')
const postcss = require('gulp-postcss')
const cleanCSS = require('gulp-clean-css');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
const cssnanoAdvanced = require('cssnano-preset-advanced')

const sources = [
  'styles/base/*.scss',
  'styles/vendors/tailwind.scss'
];

gulp.task('sass', function () {
  return gulp.src(sources)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(flatten())
    .pipe(postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer()
    ]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./assets'))
});

gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', gulp.series('sass'))
})

gulp.task('clean', function () {
  return gulp.src(['assets/custom.css'])
    .pipe(purgecss({
      content: ['sections/**/*.liquid', 'snippets/**/*.liquid', 'layout/**/*.liquid', 'templates/**/*.liquid'],
      safelist: {
        standard: [],
        deep: [],
        greedy: []
      }
    }))
    .pipe(postcss([
      cssnano({
        preset: [cssnanoAdvanced, { autoprefixer: false, mergeIdents: false, reduceIdents: false, zindex: false }],
      }),
    ]))
    .pipe(gulp.dest('assets')).on('error', sass.logError)
});
