// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by Brian W Sewell (bwsewell)
// Date: 12/23/2011
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen

(function($){
	$.fn.sticky = function(options) {
		var defaults = {
			topSpacing: 0,
			className: 'is-sticky',
			scrollLength: 0
		};  
		var o = $.extend(defaults, options);
		return this.each(function() {
			var topSpacing = o.topSpacing,
			stickyElement = $(this),
			stickyId = stickyElement.attr('id'),
			fixed = false;
			stickyElement
				.wrapAll('<div id="' + stickyId + 'StickyWrapper"></div>')
				.css('width', stickyElement.width());
			var stickyWrapper = stickyElement.parent();
			stickyWrapper
				.css('width', stickyElement.outerWidth())
				.css('height', stickyElement.outerHeight())
				.css('clear', stickyElement.css('clear'));
			$(window).scroll(function() {
				var scrollTop = $(window).scrollTop();
				var elementTop = stickyWrapper.offset().top;
				var scrollLimit = elementTop + o.scrollLength + topSpacing;
				if (scrollTop >= scrollLimit - topSpacing && o.scrollLength != 0) {
					if (fixed) {
						stickyElement.css('position', '').css('top', '').removeClass(o.className);
						stickyWrapper.css('paddingTop', o.scrollLength + topSpacing);
						fixed = false;
					}
				}
				else if (scrollTop <= elementTop - topSpacing) {
					if (fixed) {
						stickyElement.css('position', '').css('top', '').removeClass(o.className);
						stickyWrapper.css('paddingTop', 0);
						fixed = false;
					}
				}
				else if (!fixed) {
					if (scrollTop >= elementTop - topSpacing) {
						stickyElement.css('position', 'fixed').css('top', topSpacing).addClass(o.className);
						stickyWrapper.css('paddingTop', 0);
						fixed = true;
					}
				}
			});
		});
	};
})(jQuery);