const {src,dest,watch,series} = require('gulp');

//压缩html文件
const htmlClean=require('gulp-htmlclean');

//将less文件转换成css文件
const less=require('gulp-less');
//压缩css文件
const cleanCss=require('gulp-clean-css');

//去掉js中的调试语句
const stripDebug=require('gulp-strip-debug');
//压缩js文件
const uglify=require('gulp-uglify');

//压缩图片
// const im=require('gulp-imagemin');

//服务器
const connect=require('gulp-connect');

const folder={
  src:'src/',
  dist:'dist/'
}

function html(){
  return src(folder.src+'html/*')
          .pipe(htmlClean())
          .pipe(dest(folder.dist+'html/'))
          .pipe(connect.reload());
}
function css(){
  return src(folder.src+'css/*')
          .pipe(less())
          .pipe(cleanCss())
          .pipe(dest(folder.dist+'css/'))
          .pipe(connect.reload());
}
function js(){
  return src(folder.src+'js/*')
          .pipe(stripDebug())
          .pipe(uglify())
          .pipe(dest(folder.dist+'js/'))
          .pipe(connect.reload());
}
function image(){
  return src(folder.src+'image/*')
          .pipe(dest(folder.dist+'image/'));
}

function server(cb){
  connect.server({
    port:'1109',
    livereload:true
  });
  cb();
}
watch(folder.src+'html/*',function(cb){
  html();
  cb();
})
watch(folder.src+'js/*',function(cb){
  js();
  cb();
})
watch(folder.src+'css/*',function(cb){
  css();
  cb();
})

exports.default=series(html,css,js,image,server);