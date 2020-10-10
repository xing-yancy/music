;(function(root){
    function listControl(dom,data){
        var list = document.createElement('div'),
            dl = document.createElement('dl'),
            dt = document.createElement('dt'),
            close = document.createElement('div'),
            musicList=[];
        list.className='list';
        dt.innerHTML='播放列表';
        close.className='close';
        close.innerHTML='关闭';

        dl.appendChild(dt);

        //列表数据
        data.forEach(function(item,index){
            var dd=document.createElement('dd');
            dd.innerHTML=item.name;
            dd.addEventListener('touchend',function(){
                listChang(index);
            })
            musicList.push(dd);
            dl.appendChild(dd)
        })

        list.appendChild(dl);
        list.appendChild(close);
        dom.appendChild(list);

        // 选中的歌曲
        listChang(0)
        function listChang(index){
            for(var i=0;i<musicList.length;i++){
                musicList[i].className=''
            }
            musicList[index].className='active';
        }
        
        var listHeight = list.offsetHeight;
        list.style.transform="translateY("+listHeight+"px)";

        //显示列表
        function listUp(){
            list.style.transition='.3s'
            list.style.transform="translateY(0)";
        }
        // 隐藏列表
        function listDown(){
            list.style.transition='.3s'
            list.style.transform="translateY("+listHeight+"px)";
        }
        close.addEventListener('touchend',function(){
            listDown()
        })
        return{
            listUp:listUp,
            musicList:musicList,
            listChang:listChang,
            listDown:listDown
        }
    }
    root.listControl=listControl;
})(window.player || (window.player()))