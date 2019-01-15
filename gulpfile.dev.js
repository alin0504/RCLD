/**
 *该文件放置的时开发环境下调用的任务，同时使用browser-sync实现编写程序的时候浏览器自动刷新的功能
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    jshint=require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require("gulp-rename"),
    htmlmin = require('gulp-htmlmin'),
    postcss = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    Config = require('./gulpfile.config');

function dev() {
    // JS 压缩并混淆加密
    gulp.task('minjs:dev',function(){
        var jshintConfig={
            asi:true,//忽略缺少;
            strict:false,//不使用严格模式
            eqnull:true,
            eqeqeq: false
        };

        gulp.src(Config.js.src)
            .pipe(jshint(jshintConfig))
            .pipe(jshint.reporter(stylish))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .on('error',function (error) {
                console.log(error.message)
            })
            .pipe(gulp.dest(Config.js.src))
    });

    // JS 语法检查
    gulp.task('jshint:dev', function () {
        gulp.src(Config.js.src)
            .pipe(jshint())
            .pipe(jshint.reporter())
            .pipe(concat('allindex.js'))
            .pipe(gulp.dest(Config.js.src))
    });


    // 文件清除，用于每次连续生成DEV的时候，清除原来的
    gulp.task('clean:dev',function(){
        var path = Config.src + '/';
        del([path]);
    });

    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src)
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(postcss([ autoprefixer({
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ],
                cascade: true //  是否美化属性值
            }) ]))
            .pipe(gulp.dest(Config.sass.dev))
            .pipe(minifyCss())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(Config.sass.dev))
    });

    gulp.task('dev', ['sass:dev'], function () {
        browserSync.init({
            server: {
                baseDir: './src',
                directory: false // 是否打开文件目录
                //, index: "/html/globalPanel.html" //运行试试
            },
            port: 9090,
            notify: false
        });

        gulp.watch(Config.src + '**', ['sass:dev']).on('change', browserSync.reload());
    });

    /*
     * 实时刷新  connect+watch
     * 不能自动打开浏览器
     *
     * */
    gulp.task('connect',function(){
        connect.server({
            // root:'src',
            // port:9090,
            livereload:true
        });
    });

    gulp.task('allfile', function () {
        gulp.src('src/**').pipe(connect.reload());
    });

    gulp.task('watch',function(){
        gulp.watch('src/**',['allfile']);
    });
    gulp.task('liveport',['connect','watch']);
}

module.exports = dev;
