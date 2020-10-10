(function($,player){
    function MusicPlayer(dom){
        this.dom=dom;
        this.dataList=[];  //存放获取到的歌曲信息
        // this.index=0;
        this.indexObj=null;  //存放索引值对象（用于切歌）
        this.roatTimer=null; //定时器
        this.listCon=null;
        this.curIndex=0;

       this.pro=new player.propgress.progressMove();
       this.drag=new player.propgress.drag(document.querySelector('.circle'));


       this.autoId=null;
    }
    MusicPlayer.prototype={
        // 初始化
        init:function(){
            this.getDom();
            this.getData('../mock/data.json');
        },
        //请求的歌曲数据
        getData:function(url){
            var This=this;
            $.ajax({
                url:url,
                method:'get',
                success:function(data){
                    // 获取到的歌曲信息赋值变量，方便全局使用
                    This.dataList=data;

                    This.listControl();
                    // 把索引值对象赋值给变量（用于切歌）
                    This.indexObj=new player.index(data.length);
                    // 渲染第一首歌的信息
                    This.loadMusic(This.indexObj.index);
                    // 控制第一首歌
                    This.musicControl();

                    This.dragProgress();
                },
                error:function(){
                    console.log('请求失败');
                }
            })
        },
        getDom:function(){
            // 获取图片的元素
            this.record=document.querySelector('.songImg img');
            // 获取底部菜单元素（上一首，下一首，播放暂停）
            this.controBtn=document.querySelectorAll('.control li');
        },
        loadMusic:function(index){
            // 渲染歌曲的图片信息等
            
            player.render(this.dataList[index]);
            //加载音乐
            player.music.load(this.dataList[index].audioSrc);

            this.pro.musicTime(this.dataList[index].duration)
            //播放音乐
            if(player.music.status == 'play'){
                
                player.music.play();
                this.pro.move(0)
                // 更改为播放时的图标
                this.controBtn[2].className='playing';
                // 旋转歌曲的图片
                this.imgRotate(0)
            }
            this.curIndex=index;
            this.listCon.listChang(index);
        },
        // 控制音乐
        musicControl:function(){
            var This=this;
            //上一首
            this.controBtn[1].addEventListener('touchend',function(){
                // 更改为播放状态
                player.music.status='play';
                // 播放上一首歌曲
                This.loadMusic(This.indexObj.prev());  

                This.autoMusic();
            })
            // 播放暂停
            this.controBtn[2].addEventListener('touchend',function(){
                //判断当前的歌曲状态时播还是暂停
                if(player.music.status == 'pause'){   //暂停状态，
                    // 更改为播放状态
                    player.music.status='play';
                    // 更改为播放时的图标
                    this.className='playing';
                    This.autoMusic();
                    This.pro.move()
                    // 播放当前的歌曲
                    player.music.play();	
                    // 获取当前图片旋转的角度
                    var deg=This.record.dataset.rotate || 0;
                    // 图片旋转
                    This.imgRotate(deg)
                }else{
                    console.log(1234)
                    This.pro.stop()
                    // 更改为暂停状态
                    player.music.status='pause';
                    // 更改为暂停时的图标
                    this.className='';
                    // 暂停当前的歌曲
                    This.indexObj.index=This.curIndex;
                    clearInterval(This.autoId)
                    player.music.pause();	
                    // 停止图片旋转
                    This.imgStop();
                }
            })
            //下一首
            this.controBtn[3].addEventListener('touchend',function(){
                // 更改为播放状态
                player.music.status='play';
                // 播放下一首歌曲
                This.loadMusic(This.indexObj.next());
                This.autoMusic();
                
            })
        },
        //旋转歌曲图片
        imgRotate:function(deg){
            var This=this;
            // 清楚定时
            clearInterval(this.roatTimer);
            this.roatTimer=setInterval(function(){
                // 旋转的角度
                deg = +deg + .2;
                // 设置图片旋转
                This.record.style.transform='rotate('+ deg +'deg)';
                // 给当前图片的元素加以自定义属性，记录旋转的角度
                This.record.dataset.rotate=deg;
            },1000/60)
        },
        imgStop:function(){
            // 清楚定时，图片停止旋转
            clearInterval(this.roatTimer);
        },
        listControl:function(){ 
            var This=this;
            this.listCon=player.listControl(this.dom,this.dataList);
            this.controBtn[4].addEventListener('touchend',function(){
                This.listCon.listUp();
            })
            this.listCon.musicList.forEach(function(item,index){
                item.addEventListener('touchend',function(){
                    if(This.curIndex==index){
                        return;
                    }
                    player.music.status = 'play';
                    This.listCon.listDown()
                    This.curIndex=index;
                    This.listCon.listChang(index);
                    This.loadMusic(index);
                })
            })
        },
        dragProgress:function(){
            var This=this;
            this.drag.init();
            this.drag.start=function(){
                
            }
            this.drag.move=function(per){
                This.pro.update(per)
            }
            this.drag.end=function(per){
                var curTime=per*This.dataList[This.indexObj.index].duration;
                player.music.playto(curTime);
                player.music.play()

                This.pro.move(per)
                // 更改为播放状态
                player.music.status='play';
                // 更改为播放时的图标
                This.controBtn[2].className='playing';
                This.imgRotate(0)

                This.autoMusic();
            }
        },
        autoMusic:function(){
            var This=this;
            this.autoId=setInterval(function(){
                if(This.pro.comSong){
                    This.loadMusic(This.indexObj.next());
                    This.pro.comSong=null;
                }
            },1000)
        }
    }
    var musicPlayer=new MusicPlayer(document.querySelector('#warp'));
    musicPlayer.init()
})(window.Zepto,window.player)