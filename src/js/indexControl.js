;(function(root){
    function Index(len){
        this.len=len;
        this.index=0;
    }
    Index.prototype={
        // 上一首歌的索引
        prev:function(){
            return this.get(-1);
        },
        // 下一首歌的索引
        next:function(){
            return this.get(1);
        },
        // 获取歌曲的索引，做边界处理和切换歌曲
        get:function(dev){
            this.index=(this.index+dev+this.len)%this.len;
            return this.index;
        } 
    }
    return root.index=Index;
})(window.player || (window.player()))