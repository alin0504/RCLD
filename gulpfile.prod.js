/**
 * Created by LiFei on 2018/11/14.
 * 
 * 用于放置生产环境下运行的任务
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    jshint=require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require("gulp-rename"),
    htmlmin = require('gulp-htmlmin'),
    postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    Config = require('./gulpfile.config');

function prod() {
    gulp.task('minhtml',function(){
        var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: false,//压缩HTML
            collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        };
        gulp.src(Config.html.src)
            .pipe(htmlmin(options))
            .on('error',function(error){
                console.log(error.message);
            })
            .pipe(gulp.dest(Config.html.dist));
    });

    // css 压缩
    gulp.task('mincss',function(){
        return  gulp.src(Config.sass.src)
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
            .pipe(gulp.dest(Config.css.src))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(minifyCss())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.init())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(Config.css.src))
            .pipe(gulp.dest(Config.css.dist))
    });

    // JS 压缩并混淆加密
    gulp.task('minjs',function(){
        var jshintConfig={
            asi:true,//忽略缺少;
            strict:false,//不使用严格模式
            eqnull:true,
            eqeqeq: false
        };

        gulp.src(Config.js.src)
            .pipe(gulp.dest(Config.js.dist))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .on('error',function (error) {
                console.log(error.message)
            })
            .pipe(gulp.dest(Config.js.dist))
    });

    // JS 语法检查
    gulp.task('jshint', function () {
        gulp.src(Config.js.src)
            .pipe(jshint())
            .pipe(jshint.reporter())
            .pipe(concat('allindex.js'))
            .pipe(gulp.dest(Config.js.dist))
    });

    // 图片压缩
    gulp.task('imgmin',function(){
        gulp.src(Config.img.src)
            .pipe(imgmin([
                imgmin.gifsicle({interlaced: true}),
                imgmin.jpegtran({progressive: true}),
                imgmin.optipng({optimizationLevel: 5}),
                imgmin.svgo({plugins: [{removeViewBox: true}]})
            ]))
            .pipe(gulp.dest(Config.img.dist))
    });

    // 文件copy
    gulp.task('copy',function(){
        gulp.src(Config.assets.src)
            .pipe(gulp.dest(Config.assets.dist));
        gulp.src(Config.src + 'data/**')
            .pipe(gulp.dest(Config.dist + 'data'));
    });

    // 文件清除，用于每次连续生成DEV的时候，清除原来的
    gulp.task('clean',function(){
        del(Config.dist + '/');
    });

    gulp.task('build', ['minhtml', 'mincss', 'minjs', 'imgmin', 'copy']);
}

module.exports = prod;