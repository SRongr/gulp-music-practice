

//实现渲染
(function($,root){
    var $body = $(document.body)

    function renderSong(data){
        var html = '';
        html = '<div class="song_name">' + data.song +'</div>\
        <div class="singer_name">' + data.singer + '</div>\
        <div class="album">' + data.album + '</div>'
        $body.find('.song_info').html(html)
    }
    function renderImg(data){
        var src = '..' + data.img
        var img = new Image();
        img.src = src;
        img.onload = function(){
            root.blurImg(img,$body);
            $body.find('.img_wrapper img').attr('src',src)

        }
    }
    function renderLike(islike){
        if(islike){
            $body.find('.like_btn').addClass('liking')
        }else{
            $body.find('.like_btn').removeClass('liking')
            
        }
    }
 
    root.render = function(data){
        renderSong(data);
        renderImg(data);
        renderLike(data.islike)
    }
    
})(window.Zepto,window.player || (window.player = {}))
//通过window.render 暴漏函数