
(function($,root){
    var curAllTime,
        frameId,
        startTime,
        lastPer = 0;
    //渲染每首歌的时间
    function renderTime(duration){
        // lastPer = 0;
        curAllTime = duration;
        var allTime = formatTime(duration)
        $body.find('.all_time').html(allTime)
    }
    function formatTime(time){
        time = Math.round(time)
        var min = Math.floor(time/60)
        var second = time - min*60
        if(min < 10){
            min = '0' + min
        }
        if(second < 10){
            second = '0' + second
        }
        var allTime =  min + ':'  + second
        return allTime
    }
    //更新进度条和播放了的时间
    function upDate(percent){
        //  播放的时候切歌需要重置per 和startTime
        if(percent == 0){
            lastPer = 0
            startTime = new Date().getTime();
        }
       
        var curTime = percent * curAllTime;
        curTime =  formatTime(curTime)  //格式化成时间的格式
        $body.find('.cur_time').html(curTime)
        var per = (percent-1)*100 + '%';
        // console.log(lastPer)
        // console.log(percent)
        // lastPer = percent;
        $body.find('.pro_top').css('transform','translate(' + per + ')')
    }
    function start(newPer){
        // if(newPer){
        //     lastPer = newPer
        // }
        lastPer = newPer == undefined ? lastPer : newPer ;
        startTime = new Date().getTime();
            frame();
        
        // 因为startTime 只有一个 不能一直执行，所以不能把start 和frame 放在一个函数
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime)/(curAllTime*1000)
            if(percent < 1){
                upDate(percent)
                frameId = requestAnimationFrame(frame) 
            }else{
                cancelAnimationFrame(frameId)
            }
           
        }
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPer += (stopTime - startTime)/curAllTime/1000
        console.log(lastPer)
        
        cancelAnimationFrame(frameId)
    }
    root.process = {
        renderTime : renderTime,
        upDate : upDate,
        start : start,
        stop : stop,
    }
})(window.Zepto,window.player || (window.player ={}))