(function($) {
  	$.fn.lazyInterchange = function() {
    	var selectors = this.each(function() {
      		if ($(this).attr('data-lazy')) {
		        $(this).attr('data-interchange', $(this).attr('data-lazy'));
		        $(this).removeAttr('data-lazy').removeAttr('data-src');
		        $(this).foundation('interchange', 'reflow');
      		}
    	});
    	return selectors;
  	};
}(jQuery));

function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}

$(window).load(function() {

	$('html').addClass('loading');
	setTimeout(function() {
		if (window.performance && performance.timing) {
			window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
			var timing = performance.timing || {};
			var parseTime = Math.max(1000, Math.max(0, 2500 - (timing.loadEventEnd - timing.responseEnd)));
			setTimeout(function() {
				$('html').addClass('loaded');
			}, parseTime);
		} else {
			setTimeout(function() {
				$('html').addClass('loaded');
			}, 2000);
		}
		// $('html').removeClass('loading');
	}, 0);

	appear((function() {
      	'use strict';
      	var nodes = [];

      	return {
        	init: function init() {
		        var els = document.getElementsByClassName('lazy');
		        var elsl = els.length;
		        for (var i = 0; i < elsl; i += 1) {
		            if (!els[i].classList.contains('section-header')) {
		              	nodes.push(els[i]);
		            }
		        }
        	},
        	elements: nodes,
        	appear: function doReveal(el) {
          		$(el).lazyInterchange().animate({opacity: 1},500);
        	},
        	bounds: 400
      	};
    }()));

	if (updateViewportDimensions().width > 768) {
	    appear((function() {
		    'use strict';
		    var nodes = [];

		    return {
		        init: function init() {
			        var els = document.querySelectorAll('.slideshow-photo');
			        var elsl = els.length;
			        for (var i = 0; i < elsl; i += 1) {
			            nodes.push(els[i]);
			        }
		        },
		        elements: nodes,
		        appear: function doReveal(el) {
			        var bg = el.getAttribute('data-lazy');
			        el.style.backgroundImage = 'url(' + bg + ')';
			        el.removeAttribute('data-lazy');
		        },
		        bounds: 400
		    };
	    }()));
	}

    appear((function() {
	    'use strict';
	    var nodes = [];

	    return {
	        init: function init() {
		        var els = document.getElementsByClassName('heroic-bg');
		        var elsl = els.length;
		        for (var i = 0; i < elsl; i += 1) {
		            if (els[i].hasAttribute('data-lazy')) {
		              	nodes.push(els[i]);
		            }
		        }
	        },
	        elements: nodes,
	        appear: function doReveal(el) {
	          	var bg = el.getAttribute('data-lazy');
	          	bg = 'url(' + bg.substring(0, bg.length - 4) + (updateViewportDimensions().width < 768 ? '_m' : '') + bg.substring(bg.length - 4) + ')';
	          	el.style.backgroundImage = bg;
	          	el.removeAttribute('data-lazy');
	        },
	        bounds: 1000
	    };
    }()));

});

$(document).ready(function() {

	// Get IE or Edge browser version
	var version = detectIE();

	if (version) {
		$('.browser-warning').show();
		$('body').css('overflow', 'hidden');
	}

  	var date = new Date(2016, 8, 30);
  	$('#default-countdown').countdown({until: date, format: 'DHM'});

    $('.il-scattered-gallery a').each(function(index, el){
	    var img = $(this).html();
	    var imgThumb = '<li data-slide-number="' + index + '" href="" class="' + (!index ? 'active-slide' : '') + '">' + img + '</li>';
	    $('.couple-thumbs').append(imgThumb);
	    $('.couple-mobile-slider').append(imgThumb);
	});

	$('body').on('click', '.blocking', function(e) {
		$('.couple-slideshow-wrap').removeClass('visible');
	    setTimeout(function(){
	      $('.couple-slideshow-wrap').css('z-index','');
	    }, 500);
	    $('.blocking').fadeOut(500);
	    return false;
	});

    $('#rsvp-form').on('submit', function(e) {
    	e.preventDefault();
    	$this = $(this);
    	$('#rsvp-submit').prop('disabled', true);
    	$.ajax({
           	type: "POST",
           	url: $this.prop('action'),
           	data: $this.serialize()
        }).done(function(data, status) {
        	var msg;
           	if (status == "success") {
           		msg = 'Thanks for RSVPing!'
       		} else {
       			msg = 'Something went wrong, try again!'
       		}
       		$('<h4>' + msg + '</h4>').hide().insertAfter('.rsvp-desc').fadeIn();
        	$this.animate({opacity: 0}, 500).remove();
        	$('#rsvp-submit').prop('disabled', false);
   		});
    });
});

$(window).scroll(function() {

	if ( $('#registries').exists() ){        
      	if ( $('#registries').isOnScreen() ) {
        	$('.registry').addClass('on-screen');
      	}
    }

});


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
  	// IE 10 or older => return version number
  	return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}