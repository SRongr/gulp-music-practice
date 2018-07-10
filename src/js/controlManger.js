(function($,root){
    function controlManger(){
        this.index = index;
        this.len = len;
    }
    controlManger.prototype = {
        pre : function(){
            return this.getIndex(-1)
        },
        next : function(){ 
            return this.getIndex(1)
        },
        getIndex : function(val){
            var curIndex = (len + index + val) % len;
            this.index = curIndex;
            return curIndex;
        }
        
    }
    root.controlManger = controlManger
})(window,window.player || (window.player = {}))