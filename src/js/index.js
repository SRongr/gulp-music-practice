window.$ = window.Zepto;
window.root = window.player;
var controlManger;
var audioControl = new root.audioControl()   //全局引入audioControl对象
var listControl;
var $body=$(document.body)
var index = 0;
var songList;
var $play = $('.play_btn');
var $like = $('like_btn')
var $div = $('div')[0];
var process = root.process;
function bindEvent(){
    $body.on('click','.like_btn',function(){
        $(this).toggleClass('liking')
    })
    $body.on('click','.play_btn',function(){
        if(audioControl.status ==="play"){
            audioControl.pause();
            root.process.stop();
        }else{
            audioControl.play();
            root.process.start()
        }
        $(this).toggleClass('pause')
    })
    $body.on('play:change',function(e,liIndex){
        if(liIndex){
            index = liIndex
        }
        root.render(songList[index])
        audioControl.getAudio(songList[index].audio)
        listControl.renderActive()
        process.renderTime(songList[index].duration)      
        /* 暂停之后 切歌 继续暂停*/  
        // if(audioControl.status == 'play'){
        // audioControl.play();
        // }
        /* 暂停之后 切歌 继续播放*/
        if(audioControl.status ==="pause"){
            console.log(123)
            $('.play_btn').trigger('click')
        }else{
            audioControl.play();
        }
       
        process.upDate(0)
    })
    $body.on('click','.pre_btn',function(){    
        index = controlManger.pre()
        console.log(index)
        $body.trigger('play:change')    
    })
    $body.on('click','.next_btn',function(){
        index = controlManger.next();
        $body.trigger('play:change')
        
    })
    $body.on('click','.list_btn',function(){
        $body.find('.list').removeClass('hidden')
    })

    $body.on('click','.close',function(){
        $body.find('.list').addClass('hidden')
    })
    $body.on('click','li',function(){
        var listIndex = $(this).attr('liIndex')
        $body.trigger('play:change',listIndex)
    })
}
function bindTouch(){
    var $slider = $('.slider');
    var offset = $body.find('.pro_wrapper').offset()
    var offsetLeft = offset.left;
    var offsetWidth = offset.width

    console.log(offset)
    $slider.on('touchstart',function(e){
        process.stop();
    }).on('touchmove',function(e){
        // console.log(e)
        var x = e.changedTouches[0].clientX - offsetLeft;
        var per  = x/offsetWidth 
        if(per > 1){
            per = 1
        }else if(per < 0){
            per = 0
        }
        process.upDate(per)
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX - offsetLeft;
        var per  = x/offsetWidth 
        if(per > 1){
            per = 1
        }else if(per < 0){
            per = 0
        }
        var curDuration = songList[controlManger.getIndex(index)].duration;
        var curTime = per * curDuration;
        audioControl.playTo(curTime)
        process.start(per)
    })
}
function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            songList = data;
            len = songList.length
            controlManger = new root.controlManger()    //全局引入controlManger对象
            listControl = new root.listControl();
            audioControl.getAudio(data[index].audio)
            bindEvent();
            bindTouch();
            listControl.renderList()
            process.renderTime(songList[index].duration)
            root.render(data[index])
        },
        error:function(){
            console.log('error')
        }
    })
}
getData("../data/data.json");