var SRC_DIR = './src/';
var DIST_DIR = './theme/';
var DIST_FILES = DIST_DIR + '**';

var Config={
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    html:{
        src: SRC_DIR + 'html/*.html',
        dist: DIST_DIR + 'html'
    },
    manageHtml:{
        src: SRC_DIR + 'manage/*.html',
        dist: DIST_DIR + 'manage'
    },
    assets:{
        src: SRC_DIR + 'vendor/**/*',
        dist: DIST_DIR + 'vendor'
    },
    css: {
        src: SRC_DIR + 'css/**/*.css',
        dist: DIST_DIR + 'css'
    },
    sass:{
        src: SRC_DIR + 'sass/**/*.scss',
        dist: DIST_DIR + 'css',
        dev: SRC_DIR + 'css'
    },
    js:{
        src: SRC_DIR + 'js/**/*.js',
        dist: DIST_DIR + 'js',
        build_name: 'build.js'
    },
    img: {
        src: SRC_DIR + 'images/**/*',
        dist: DIST_DIR + 'images'
    }
};

module.exports = Config;