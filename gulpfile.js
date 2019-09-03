// The require statement tells Node to look into the node_modules folder for a package
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
'use strict';
const {src, dest, watch, series, parallel } = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const panini = require('panini');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const removeCode = require('gulp-remove-code');
const removeLog = require('gulp-remove-logging');
const prettyHtml = require('gulp-pretty-html');
const sassLint = require('gulp-sass-lint');
const htmllint = require('gulp-htmllint');
const jshint = require('gulp-jshint');
const htmlreplace = require('gulp-html-replace');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const accessibility = require('gulp-accessibility');
const babel = require('gulp-babel');

// File paths
const files = { 
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js'
}

// ------------ DEVELOPMENT TASKS -------------
function reload(done) {
  browserSync.reload();
  done();
}

// COPY PORTFOLIO ASSETS
function portfolio() {
  console.log('---------------COPYING PORTFOLIO ASSETS---------------');
  return src(['src/pages/portfolio/**/images/*', 'src/pages/portfolio/**/videos/*'])
  .pipe(dest('dist/portfolio/'));
}

// COMPILE SCSS INTO CSS
function compileSCSS() {
  console.log('---------------COMPILING SCSS---------------');
  return src(['src/assets/scss/**/*.scss'])
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'scss'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream())
}

// USING PANINI, TEMPLATE, PAGE AND PARTIAL FILES ARE COMBINED TO FORM HTML MARKUP
function compileHTML() {
  console.log('---------------COMPILING HTML WITH PANINI---------------');
  return src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      pageLayouts: {
        'portfolio': 'portfolio'
      },
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(dest('dist'));
}

// COPY CUSTOM JS
function compileJS() {
  console.log('---------------COMPILE CUSTOM.JS---------------');
  return src(['src/assets/js/custom.js'])
    .pipe(babel())
    .pipe(dest('dist/assets/js/'));
}

// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
function resetPages(done) {
  console.log('---------------CLEARING PANINI CACHE---------------');
  panini.refresh();
  done();
}

// SASS LINT
function scssLint() {
  console.log('---------------SASS LINTING---------------');
  return src('src/assets/scss/**/*.scss')
    .pipe(sassLint({
      configFile: '.scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}

// HTML LINTER
function htmlLint() {
  console.log('---------------HTML LINTING---------------');
  return src('dist/*.html')
    .pipe(htmllint({}, htmllintReporter));
}

function htmllintReporter(filepath, issues) {
  if (issues.length > 0) {
    issues.forEach(function (issue) {
      log(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
    });
    process.exitCode = 1;
  } else {
    console.log('---------------NO HTML LINT ERROR---------------');
  }
}

// JS LINTER
function JSLint() {
  return src('src/assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
}


function watchHTML(){
  watch('src/**/*.html', series(resetPages, compileHTML, reload));
}

function watchSCSS(){
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'] , series(compileSCSS, reload));
}

function watchJS(){
  watch('src/assets/js/*.js', series(compileJS, reload));
}

function watchImg(){
  watch('src/assets/img/**/*', series(images, reload));
}

function watchPortfolio() {
  watch('src/pages/portfolio/**/**/', series(portfolio, reload));
}

// BROWSER SYNC
function browserSyncInit(done) {
  console.log('---------------BROWSER SYNC---------------');
  browserSync.init({
    server: './dist'
  });
  return done();
}

// ------------ OPTIMIZATION TASKS -------------
// COPIES AND MINIFY IMAGE TO DIST
function images() {
  console.log('---------------OPTIMIZING IMAGES---------------');
  return src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(newer('dist/assets/img/'))
    .pipe(imagemin())
    .pipe(dest('dist/assets/img/'));
}

// PLACES FONT FILES IN THE DIST FOLDER
function font() {
  console.log('---------------COPYING FONTS INTO DIST FOLDER---------------');
  return src([
      'src/assets/font/*',
    ])
    .pipe(dest('dist/assets/fonts'))
    .pipe(browserSync.stream());
}

// COPY JS VENDOR FILES
function jsVendor() {
  console.log('---------------COPY JAVASCRIPT VENDOR FILES INTO DIST---------------');
  return src([
      // 'node_modules/jquery/dist/jquery.js',
      // 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
      'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
      'node_modules/ionicons/dist/ionicons.js',
      'src/assets/vendor/js/*',
    ])
    .pipe(dest('dist/assets/vendor/js'))
    .pipe(browserSync.stream());
}

// COPY CSS VENDOR FILES
function cssVendor() {
  console.log('---------------COPY CSS VENDOR FILES INTO DIST---------------');
  return src([
      'src/assets/vendor/css/*',
    ])
    .pipe(dest('dist/assets/vendor/css'))
    .pipe(browserSync.stream());
}

// PRETTIFY HTML FILES
function prettyHTML() {
  console.log('---------------HTML PRETTIFY---------------');
  return src('dist/*.html')
    .pipe(prettyHtml({
      indent_size: 4,
      indent_char: ' ',
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
    }))
    .pipe(dest('dist'));
}

// DELETE DIST FOLDER
function cleanDist(done) {
  console.log('---------------REMOVING OLD FILES FROM DIST---------------');
  del.sync('dist');
  return done();
}

// CREATE DOCS FOLDER FOR DEMO
function docs() {
  console.log('---------------CREATING DOCS---------------');
  return src([
      'dist/**/*',
    ])
    .pipe(dest('docs'))
    .pipe(browserSync.stream());
}

// ACCESSIBILITY CHECK
function HTMLAccessibility() {
  return src('dist/*.html')
    .pipe(accessibility({
      force: true
    }))
    .on('error', console.log)
    .pipe(accessibility.report({
      reportType: 'txt'
    }))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(dest('accessibility-reports'));
}

// ------------ PRODUCTION TASKS -------------
// COPIES FILES TO BE PUT IN /DIST
function rootFiles() {
  console.log('---------------COPYING ROOT FILES---------------');
  return src('src/root/**/*.*')
    .pipe(dest('dist/'));
}

// CHANGE TO MINIFIED VERSIONS OF JS AND CSS
function renameSources() {
  console.log('---------------RENAMING SOURCES---------------');
  return src('dist/*.html')
    .pipe(htmlreplace({
      'js': 'assets/js/main.min.js',
      'css': 'assets/css/main.min.css'
    }))
    .pipe(dest('dist/'));
}

// CONCATINATE JS SCRIPTS
function concatScripts() {
  console.log('---------------CONCATINATE SCRIPTS---------------');
  return src([
      'dist/assets/vendor/js/jquery.js',
      // 'dist/assets/vendor/js/popper.js',
      // 'dist/assets/vendor/js/bootstrap.js',
      'dist/assets/vendor/js/ScrollMagic.min.js',
      'dist/assets/vendor/js/ionicons.js',

      'dist/assets/js/*'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/assets/vendor/js'))
    .pipe(browserSync.stream());
}

// MINIFY SCRIPTS
function minifyScripts() {
  console.log('---------------MINIFY SCRIPTS---------------');
  return src('dist/assets/vendor/js/main.js')
    .pipe(removeLog())
    .pipe(removeCode({
      production: true
    }))
    .pipe(uglify().on('error', console.error))
    .pipe(rename('main.min.js'))
    .pipe(dest('dist/assets/js'));
}

// MINIFY CSS
function minifyCss() {
  console.log('---------------MINIFY CSS---------------');
  return src([
      'dist/assets/vendor/css/**/*',
      'dist/assets/css/main.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(dest('dist/assets/css'));
}

// RUN ALL LINTERS
exports.linters = series(htmlLint, scssLint, JSLint);

// RUN ACCESSIILITY CHECK
exports.accessibility = HTMLAccessibility;

// DEV
exports.default = series(cleanDist, rootFiles, font, jsVendor, cssVendor, images, portfolio, compileHTML, compileJS, resetPages, prettyHTML, compileSCSS, browserSyncInit, parallel(watchHTML, watchImg, watchJS, watchSCSS, watchPortfolio));

// PROD
exports.prod = series(cleanDist, rootFiles, compileSCSS, font, jsVendor, cssVendor, images, portfolio, compileHTML, compileJS, concatScripts, minifyScripts, minifyCss, renameSources, prettyHTML, docs, browserSyncInit);

// Build
exports.build = series(cleanDist, rootFiles, compileSCSS, font, jsVendor, cssVendor, images, portfolio, compileHTML, compileJS, concatScripts, minifyScripts, minifyCss, renameSources, prettyHTML, docs);