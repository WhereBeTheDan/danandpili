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

$(window).load(function() {

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
	          	var bg = 'url(' + el.getAttribute('data-lazy') +')';
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
	}

  	var date = new Date(2016, 8, 30);
  	$('#default-countdown').countdown({until: date, format: 'DHM'});

    $('.il-scattered-gallery a').each(function(index, el){
	    var img = $(this).html();
	    var imgThumb = '<li data-slide-number="' + index + '" href="" class="' + (index ? 'active-slide' : '') + '">' + img + '</li>';
	    $('.couple-thumbs').append(imgThumb);
	    $('.couple-mobile-slider').append(imgThumb);
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