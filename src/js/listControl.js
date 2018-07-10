(function($,root){
    function listControl(){
        this.len = len;
        // this.data = songList;
        // this.index = index ;
    }
  
    listControl.prototype = {
        renderList : function(){
            var liStr = ''; 
            songList.forEach(function(ele,index){
                liStr +='<li liIndex="' + index + '">' + ele.song + '-' + ele.singer +'</li>'
            })
            $body.find('ul').html(liStr)
            $body.find('li').eq(index).addClass('active')
            console.log(songList,index)
            
        },
        renderActive : function(){
            $body.find('li').removeClass().eq(index).addClass('active')
        }
        
    }
    root.listControl = listControl;
})(window.Zepto,window.player || (window.player = {}) )