'use strict';

const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const gutil = require( 'gulp-util' );
var concat = require('gulp-concat');
var inject = require('gulp-inject');
const ftp = require( 'vinyl-ftp' );

require('dotenv').config();

let base = "xamltoy"

gulp.task('styles', function styles(){
  return gulp.src(
    [
      './src/lib/codemirror/codemirror.css',
      './src/css/style.css'
    ])
    .pipe(concat('all.css'))
    .pipe(csso())
    .pipe(rev())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rev.manifest("./dist/rev-manifest.json",{base: process.cwd()+'/dist', merge: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function scripts(){
  return gulp.src(
    [
    './src/lib/codemirror/codemirror.js',
    './src/js/codemirror-addons/*.js',
    './src/js/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(rev())
    .pipe(gulp.dest('./dist/js'))
    .pipe(rev.manifest("./dist/rev-manifest.json",{base: process.cwd()+'/dist', merge: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('pages', function pages() {
  var manifest = gulp.src("./dist/rev-manifest.json");
  return gulp.src('./src/**/*.html')
    .pipe(inject(gulp.src('./dist/css/all-*.css',{read: false}),
      {starttag: '<!-- inject:css -->', ignorePath: '/dist/', addPrefix: base}))
    .pipe(inject(gulp.src('./dist/js/all-*.js',{read: false}),
      {starttag: '<!-- inject:js -->', ignorePath: '/dist/', addPrefix: base}))
    .pipe(inject(gulp.src('./dist/lib/XamlToy/Gui.XamlToy.js',{read: false}),
      {starttag: '<!-- inject:xamltoy -->', ignorePath: '/dist/', addPrefix: base, addSuffix: '?v=13'}))
    .pipe(inject(gulp.src('./dist/lib/codemirror/codemirror.js',{read: false}),
      {starttag: '<!-- inject:codemirror -->', ignorePath: '/dist/', addPrefix: base}))
    .pipe(revReplace({manifest: manifest}))
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('libs', function libs(){
  return gulp.src('./src/lib/**/*')
  .pipe(gulp.dest('./dist/lib'));
});

gulp.task('clean', function clean(){
  return del(['dist'])
});

gulp.task('deploy', function deploy() {
  // .env file required in root directory with the following credentials:
	var conn = ftp.create( {
		host:     process.env.FTP_HOST,
		user:     process.env.FTP_USER,
		password: process.env.FTP_PASSWORD,
    parallel: 7,
    secure:   false,
		log:      gutil.log
	} );
  var remoteLocation = process.env.FTP_REMOTE;
  return gulp.src( 'dist/**', { base: './dist', buffer: false, allowEmpty:true })
  .pipe( conn.dest( remoteLocation ) );
});

gulp.task('default', 
  gulp.series('clean','styles','scripts','libs','pages')
);

gulp.task('deploy', 
  gulp.series('clean','styles','scripts','libs','pages','deploy')
);
