!function(s,n){function t(t){this.dom=t,this.dataList=[],this.indexObj=null,this.roatTimer=null,this.listCon=null,this.curIndex=0,this.pro=new n.propgress.progressMove,this.drag=new n.propgress.drag(document.querySelector(".circle")),this.autoId=null}t.prototype={init:function(){this.getDom(),this.getData("../mock/data.json")},getData:function(t){var i=this;s.ajax({url:t,method:"get",success:function(t){i.dataList=t,i.listControl(),i.indexObj=new n.index(t.length),i.loadMusic(i.indexObj.index),i.musicControl(),i.dragProgress()},error:function(){}})},getDom:function(){this.record=document.querySelector(".songImg img"),this.controBtn=document.querySelectorAll(".control li")},loadMusic:function(t){n.render(this.dataList[t]),n.music.load(this.dataList[t].audioSrc),this.pro.musicTime(this.dataList[t].duration),"play"==n.music.status&&(n.music.play(),this.pro.move(0),this.controBtn[2].className="playing",this.imgRotate(0)),this.curIndex=t,this.listCon.listChang(t)},musicControl:function(){var i=this;this.controBtn[1].addEventListener("touchend",function(){n.music.status="play",i.loadMusic(i.indexObj.prev()),i.autoMusic()}),this.controBtn[2].addEventListener("touchend",function(){var t;"pause"==n.music.status?(n.music.status="play",this.className="playing",i.autoMusic(),i.pro.move(),n.music.play(),t=i.record.dataset.rotate||0,i.imgRotate(t)):(i.pro.stop(),n.music.status="pause",this.className="",i.indexObj.index=i.curIndex,clearInterval(i.autoId),n.music.pause(),i.imgStop())}),this.controBtn[3].addEventListener("touchend",function(){n.music.status="play",i.loadMusic(i.indexObj.next()),i.autoMusic()})},imgRotate:function(t){var i=this;clearInterval(this.roatTimer),this.roatTimer=setInterval(function(){t=+t+.2,i.record.style.transform="rotate("+t+"deg)",i.record.dataset.rotate=t},1e3/60)},imgStop:function(){clearInterval(this.roatTimer)},listControl:function(){var s=this;this.listCon=n.listControl(this.dom,this.dataList),this.controBtn[4].addEventListener("touchend",function(){s.listCon.listUp()}),this.listCon.musicList.forEach(function(t,i){t.addEventListener("touchend",function(){s.curIndex!=i&&(n.music.status="play",s.listCon.listDown(),s.curIndex=i,s.listCon.listChang(i),s.loadMusic(i))})})},dragProgress:function(){var s=this;this.drag.init(),this.drag.start=function(){},this.drag.move=function(t){s.pro.update(t)},this.drag.end=function(t){var i=t*s.dataList[s.indexObj.index].duration;n.music.playto(i),n.music.play(),s.pro.move(t),n.music.status="play",s.controBtn[2].className="playing",s.imgRotate(0),s.autoMusic()}},autoMusic:function(){var t=this;this.autoId=setInterval(function(){t.pro.comSong&&(t.loadMusic(t.indexObj.next()),t.pro.comSong=null)},1e3)}},new t(document.querySelector("#warp")).init()}(window.Zepto,window.player);