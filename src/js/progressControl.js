;(function(root){
    function ProgressMove(){
        this.durTime=0;  //总的时间
        this.framId=null;  //定时器
        this.startTime=0;  
        this.lastPercent=0;  
        this.init();
        this.comSong=null;


    }
    ProgressMove.prototype={
        init:function(){
            this.getDom();
        },
        getDom:function(){
            this.curTime=document.querySelector('.curTime');
            this.totalTime=document.querySelector('.totalTime');
            this.circle=document.querySelector('.circle');
            this.frontBg=document.querySelector('.frontBg');
            this.backBg=document.querySelector('.backBg');
        },
        musicTime:function(time){
            this.durTime=time;
            var times=this.conversionTime(time);
            this.totalTime.innerHTML=times;
        },
        conversionTime:function(time){
            var time=Math.round(time);
            var m=Math.floor(time/60);
            var s=time%60;
            m=m<10?'0'+m:m;
            s=s<10?'0'+s:s;
            return m+':'+s;
        },
        move:function(per){
            var This=this;
            this.lastPercent= per==undefined?this.lastPercent:per;
            cancelAnimationFrame(This.frameId);
            this.startTime=new Date().getTime();
            function frame(){
                var curTime = new Date().getTime();
                var per=This.lastPercent+(curTime-This.startTime)/(This.durTime*1000);
                if(This.durTime*per == This.durTime){
                    This.comSong=true;
                }

                if(per<=1){
                    This.update(per);
                }else{
                    cancelAnimationFrame(This.frameId);
                }
                This.frameId = requestAnimationFrame(frame);
            }
            frame();
        },
        update:function(per){
            var time=this.conversionTime(this.durTime*per);
            
            this.curTime.innerHTML=time;

            this.frontBg.style.width=per*100+"%";

            var l=this.backBg.offsetWidth*per;
            this.circle.style.transform='translateX('+ l +'px)';
        },
        stop:function(){
            cancelAnimationFrame(this.frameId);

            var stopTime=new Date().getTime();
            this.lastPercent+=(stopTime-this.startTime)/(this.durTime *1000);

        },
    }
    function Drag(obj){
        this.obj=obj;
        this.starPointX=0;
        this.starLeft=0;
        this.percent=0;
    }
    Drag.prototype={
        init:function(){
            var This=this;
            this.obj.style.transform='translateX(0)';
            this.obj.addEventListener('touchstart',function(e){
                This.starPointX=e.changedTouches[0].pageX;
                This.starLeft = parseFloat(this.style.transform.split('(')[1]);
                This.start && This.start();
            })
            this.obj.addEventListener('touchmove',function(e){
                This.disPointX=e.changedTouches[0].pageX-This.starPointX;
                var l =This.starLeft+This.disPointX;
                if(l<0){
                    l=0
                }else if(l>this.offsetParent.offsetWidth){
                    l=this.offsetParent.offsetWidth;
                }

                this.style.transform='translate('+ l +'px)';
                This.percent=l/this.offsetParent.offsetWidth;
                This.move && This.move(This.percent);
                e.preventDefault();
            })
            this.obj.addEventListener('touchend',function(){
                This.end && This.end(This.percent);
            })
        }
    }
    root.propgress={
        progressMove:ProgressMove,
        drag:Drag
    }
})(window.player || (window.player()))