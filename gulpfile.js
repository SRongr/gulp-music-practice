var gulp = require('gulp')                  //gulp
var imagemin = require("gulp-imagemin");        // 压缩图片
var newer = require("gulp-newer")               // 查看是否重复
var htmlClean = require('gulp-htmlclean')        // html压缩
var uglify = require("gulp-uglify")               //js 压缩
var stripDebug = require("gulp-strip-debug")     // 消除debug和console
var concat = require("gulp-concat")               // 拼接js文件
var less = require("gulp-less")                    //  less 转化css
var postcss = require("gulp-postcss")              // 对css压缩和兼容操作
var autoprefixer = require("autoprefixer")         //  兼容操作
var cssnano = require("cssnano")                   //   压缩操作         
var connect = require("gulp-connect")              //   开启服务

var devMode = process.env.NODE_ENV == "development"
console.log(devMode)
var folder = {
    src : './src/',         //开发目录
    dist : './dist/',     //压缩打包后目录
}
// gulp.task()  //任务
// gulp.src()   //读文件
// gulp.dest()     //写文件
// gulp.watch()    //监听
// gulp.pipe()         //变成流文件

gulp.task("images",function(){
    gulp.src(folder.src + "img/*")
        // .pipe(newer(folder.dist + "img"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "img"))
})

gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())         //实时刷新
    if(!devMode){
        page.pipe(htmlClean())
    }
        // page.pipe(newer(folder.dist + "html"))
        page.pipe(gulp.dest(folder.dist + "html"))
})
gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
    if(!devMode){
        page.pipe(uglify())
        .pipe(stripDebug())
    }
    page.pipe(gulp.dest(folder.dist + "js"))
    
        
})
gulp.task("css",function(){
    var options=[autoprefixer(),cssnano()];
    var page = gulp.src(folder.src + "css/*")
    .pipe(connect.reload())
    if(!devMode){
        page.pipe(postcss(options))
    }
        page.pipe(less())
        .pipe(gulp.dest(folder.dist + "css"))
})
gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"])
    gulp.watch(folder.src + "js/*",["js"])
    gulp.watch(folder.src + "css/*",["css"])
    gulp.watch(folder.src + "img/*",["images"])
})

gulp.task("server",function(){
    connect.server({
        port:"8090",            //上传地址
        livereload:true,        //实时刷新
    }) 
})   
    


gulp.task("default",["images","html","js","css","watch","server"],function(){
    // console.log(123)
})
