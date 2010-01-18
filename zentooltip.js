/**
 * @fileOverview Date: 2009-04-6
 * Licensed under Mozilla Public License 1.1 {@link http://www.mozilla.org/MPL/}
 * @author <a href="mailto:jethrolarson@gmail.com">Jethro Larson</a>
 * @version 12
 */
 
/** 
 * Unobtrusively augments the title attribute of html elements 
 * allowing additional formatting and style.
 * 
 * The only CSS properties required are 
 *   #tooltip{display:none; position: absolute}
 *   Beyond that feel free to go nuts. 
 *
 * @name zenTooltip {@link http://code.google.com/p/zentooltip}
 * @type jQuery
 * @cat Plugins/UI
 * @requires jQuery 1.2 or higher {@link http://jquery.com}
 * @example $([elements with tooltip]).zenTooltip()
 * @param {Object} [settings] settings to configure the tooltip.
 * @param {Number} [settings.delay=300] Hover delay before the tooltip is shown 
 * @param {Object} [settings.mouseOffset={left: 12, top: 22}] Position of tooltip from cursor 
 * @param {Bool}   [settings.useFormatting=true] Whether text formatting will be used. See Tags
 * @param {Object} [settings.tags={"#":"h4", "*":"b", "_":"i", "|":"p"}]
 *   {[special character]:[associated tag],[...]}
 *   Special formatting options for the tooltip. The special characters will be 
 *   replaced with the tag indicated. e.g. title="text with *bold*" becomes 
 *   "text with <b>bold</b>" in the tooltip. 
 * @param {String} [settings.tooltipClass] Adds a optional class to the tooltip
 */
(function($){
  $.fn.zenTooltip = function(settings){
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
      
      /** Optional IE6 iframe hack 
       * @requires bgiframe plugin {@link http://docs.jquery.com/Plugins/bgiframe}
       */
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
    
    /** Formats the text according to {@link settings.tags} 
     * @param {String} text to be transformed 
     * @returns Formatted HTML
     * @type String
     */
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
    return this;
  };
})(jQuery);