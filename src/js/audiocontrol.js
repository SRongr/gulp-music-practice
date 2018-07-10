//控制音乐 加载     暂停  开始，playTo
(function($,root){
    function audioControl(){
        this.audio = new Audio();
        this.status = "pause"
    }
    audioControl.prototype = {
        play : function(){
            this.audio.play();
            this.status = "play"
        },
        pause : function(){
            this.audio.pause();
            this.status = "pause"
        },
        getAudio : function(src){
            this.audio.src = ".." + src;
            this.audio.load();
        },
        playTo : function(time){
            this.audio.currentTime = time
        }
    }
    root.audioControl = audioControl
})(window.Zepto,window.player || (window.player={}))