##Usage

   1. Include [jQuery 1.2](http://jquery.com) or higher, jquery.zentooltip.js, and zenTooltip.css on your page
   2. Add a title attribute to the elements with the text to be displayed.
   3. Invoke the tooltip plugin `$(".tooltip").zenTooltip();` on those elements

##Features

  * Unobtrusively extends the HTML title attribute
  * Window collision correction
  * Text formatting allows bold, italic, and other styles in the tooltips.
  * Supports [jquery.bgiframe](http://docs.jquery.com/Plugins/bgiframe) hack, if included.
  * Compressed version less than 2k
  * Tested in FF3, FF3.5, IE6, IE7, IE8, Chrome

##Text Formatting

You can put some extra formatting into your tooltips by wrapping the text with some special characters. For example text wrapped with \* will be **bold**.

Default tags:

  * `#Heading#`
  * `*bold*`
  * `_italic_`
  * `|paragraph|`

You can change these or add your own, see Options.

##Options

  * **delay: [milliseconds]** *Default: 300*

    Hover delay before the tooltip is shown
      
  * **mouseOffset: {top: [px], left: [px]}** *Default: {left: 12, top: 22}*

    Position of tooltip from cursor
      
  * **useFormatting: [bool]** *Default: true*

    Whether text formatting will be used. *See Tags*
    
  * **tags: {[special character]:[associated tag],[...]}** *Default: {"#":"h4", "*":"b", "_":"i", "|":"p"}*

    Special formatting options for the tooltip. The special characters will be replaced with the tag indicated.
    
  * **tooltipClass: [class to add to tooltip]**

    Adds a optional class to the tooltip

---

Licensed under [Mozilla Public License 1.1](http://www.mozilla.org/MPL/)
