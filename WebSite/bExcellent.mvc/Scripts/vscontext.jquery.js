(function ($)
{
    jQuery.fn.vscontext = function(options){
        var defaults = {
            menuBlock: null,
            offsetX : 0,
            offsetY : 0,
            speed : 'slow'
        };
        var options = $.extend(defaults, options);
        var menu_item = '.' + options.menuBlock;
        return this.each(function(){
            	$(this).bind("contextmenu",function(e){
				return false;
		});
            	$(this).mousedown(function(e){
                        var offsetX = e.pageX  + options.offsetX;
                        var offsetY = e.pageY + options.offsetY;
			if(e.button == "2"){
                            
                            $(menu_item).show(options.speed);
                            $(menu_item).css('display','block');
                            $(menu_item).css('top',offsetY);
                            $(menu_item).css('left',offsetX);
			}else {
                            $(menu_item).hide(options.speed);
                        }
		});
                $(menu_item).hover(function(){}, function(){$(menu_item).hide(options.speed);})
                
        });
    };
})(jQuery);
