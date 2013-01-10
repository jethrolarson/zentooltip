/*: ZenTooltip - Simple jQuery Tooltip
    #license MIT or GPL Version 2 licenses. Like jQuery http://jquery.org/license
    #author Jethro Larson http://jethrolarson.com

    #requires - jQuery 1.2 or higher {@link http://jquery.com}
    #takes: @settings: #object
    @settings.delay: #int - Hover delay before showing tooltip
    @settings.mouseOffset: #object{@left #int, @top #int} - pixel offset from cursor
    @settings.useFormatting: #bool - Whether text formatting will be used. #see @tags
    @settings.tags: #object - Special formatting options for the tooltip. #see documentation
    @settings.tooltipClass: #string - Adds a optional class to the tooltip
*/
(function($){
  $.fn.zentooltip = function(settings){
    var $elems = this;
    settings = $.extend({
      "delay": 300,
      "mouseOffset": {"left":11, "top":23},
      "useFormatting": true,
      "tags": {
        "#": "h4",
        "*": "b",
        "_": "i",
        "|": "p"
      },
      "tooltipClass": ""
    }, settings);
    
    var tooltip = $("#tooltip").length ? $("#tooltip") : $('<div id="tooltip"><div id="tooltipIWrap"></div></div>').appendTo("body").hide();
    var ttHide = function(){
      clearTimeout($(this).data("timeoutID"));
      $("#tooltip").hide();
    };
    var ttShow = function(e){
      if(settings.tooltipClass !="")
        tooltip.addClass(settings.tooltipClass);
      else tooltip.removeClass();
      var loc = mousepos;
      loc.left += settings.mouseOffset.left;
      loc.top += settings.mouseOffset.top;
      var text = $(this).data("title");
      if(settings.useFormatting) text = transformTitle(text);
      $("#tooltipIWrap").html(text);
      tooltip.css({"left": loc.left, "top": loc.top}).show();
      var ttwidth = tooltip.width(),
          ttheight = tooltip.height();
      //Bottom Collision
      if (loc.top + ttheight > $(window).scrollTop() + $(window).height()){
        tooltip.css("top",loc.top-(ttheight+(settings.mouseOffset.top*1.5)));
      }
      //Right side collision
      if (loc.left + ttwidth > $(window).scrollLeft() + $(window).width()){
        tooltip.css("left",loc.left-(ttwidth+settings.mouseOffset.left));
      }
      
      //: #optional IE6 iframe hack. #requires http://docs.jquery.com/Plugins/bgiframe
      if($.fn.bgiframe) tooltip.bgiframe();
    };
    $elems.hover(function(e){
      //delay
      var t = this;
      var timeoutID = setTimeout(function(){
        ttShow.call(t, e);
      }, settings.delay);
      $(this).data("timeoutID",timeoutID);
    },ttHide).each(function(){
      $(this).data("title",this.title);
    }).removeAttr("title");
    
    //: Formats @text according to @settings.tags. #returns #HTML
    function transformTitle(text){
      $.each(settings.tags, function(key,val){
        var spl = text.split(key),
            out = "";
        for(var i=0;i<spl.length;i++){
          if(i>0)out += "<"+(i%2?"":"/")+val+">";
          out += spl[i];
        }
        text = out;
      });
      return text;
    }
    
    //Constantly tracks mouse position
    var mousepos = {};
    $(document).mousemove(function(e){
      //adapted from http://www.quirksmode.org/js/events_properties.html
      if (!e) var e = window.event;
      if (e.pageX || e.pageY) 	{
        mousepos.left = e.pageX;
        mousepos.top = e.pageY;
      }
      else if (e.clientX || e.clientY) 	{
        mousepos.left = e.clientX + document.body.scrollLeft
          + document.documentElement.scrollLeft;
        mousepos.top = e.clientY + document.body.scrollTop
          + document.documentElement.scrollTop;
      }
    });
    return this;//Allow Chaining
  };
})(jQuery);