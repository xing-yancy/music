;(function(root){
    //渲染歌曲图片
    function renderImg(src){
        root.blurImg(src);

        var img = document.querySelector(".songImg img");
        img.src=src;
    }
    //渲染歌曲信息
    function renderInfo(data){
        document.querySelector('.songSinger').innerHTML=data.singer;
        document.querySelector('.songName').innerHTML=data.name;
        document.querySelector('.songAlbum').innerHTML=data.album;
    }
    //渲染是否喜欢
    function renderIsLike(like){
        var con = document.querySelectorAll('.control li')[0];
        con.className=like?'liking':'';
    }
    root.render=function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
})(window.player || (window.player={}));