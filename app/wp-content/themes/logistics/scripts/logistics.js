/*jslint browser: true*/
/*jslint white: true */
/*global $,jQuery,ozy_headerType,headerMenuFixed,Parallax,alert,ajaxurl,$OZY_WP_AJAX_URL,$OZY_WP_IS_HOME,$OZY_WP_HOME_URL,addthis*/

/* Logistics WordPress Theme Main JS File */

/**
* Call Close Fancybox
*/
function close_fancybox(){
	"use strict";
	jQuery.fancybox.close();
}

/* 
Some of dynamic elements like essential grid are not
sizing correctly when you refresh the page and jump to
another tab and back. Following handlers will fix it.
*/
window.onblur = function(){ jQuery(window).resize(); }  
window.onfocus = function(){ jQuery(window).resize(); }

/**
* Read cookie
*
* @key - Cookie key
*/
function getCookieValue(key) {
	"use strict";
    var currentcookie = document.cookie, firstidx, lastidx;
    if (currentcookie.length > 0)
    {
        firstidx = currentcookie.indexOf(key + "=");
        if (firstidx !== -1)
        {
            firstidx = firstidx + key.length + 1;
            lastidx = currentcookie.indexOf(";", firstidx);
            if (lastidx === -1)
            {
                lastidx = currentcookie.length;
            }
            return decodeURIComponent(currentcookie.substring(firstidx, lastidx));
        }
    }
    return "";
}

/**
* Cookie checker for like system
*
* @post_id - WordPress post ID
*/
function check_favorite_like_cookie(post_id) {
	"use strict";	
	var str = getCookieValue( "post_id" );
	if(str.indexOf("[" + post_id + "]") > -1) {
		return true;
	}
	
	return false;
}

/**
* Cokie writer for like system
*
* @post_id - WordPress post ID
*/
function write_favorite_like_cookie(post_id) {
	"use strict";	
	var now = new Date();
	now.setMonth( now.getYear() + 1 ); 
	post_id = "[" + post_id + "]," + getCookieValue("post_id");
	document.cookie="post_id=" + post_id + "; expires=" + now.toGMTString() + "; path=/; ";
}

/**
* Like buttons handler
*
* @post_id - WordPress post ID
* @p_post_type
* @p_vote_type
* @$obj
*/
function ajax_favorite_like(post_id, p_post_type, p_vote_type, $obj) {
	"use strict";	
	if( !check_favorite_like_cookie( post_id ) ) { //check, if there is no id in cookie
		jQuery.ajax({
			url: ozy_headerType.$OZY_WP_AJAX_URL,
			data: { action: 'logistics_ozy_ajax_like', vote_post_id: post_id, vote_post_type: p_post_type, vote_type: p_vote_type },
			cache: false,
			success: function(data) {
				//not integer returned, so error message
				if( parseInt(data,0) > 0 ){
					write_favorite_like_cookie(post_id);
					jQuery('span', $obj).text(data);
				} else {
					alert(data);
				}
			},
			error: function(MLHttpRequest, textStatus, errorThrown){  
				alert("MLHttpRequest: " + MLHttpRequest + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown); 
			}  
		});
	}
}

function logistics_ozy_ajax_load_more_blog_action() {
	jQuery(".load_more_blog").click(function(e) {		

		e.preventDefault();
		
		jQuery(this).text( jQuery(this).data('loadingcaption') );
		
		var order 			= jQuery(this).data("order");
		var orderby 		= jQuery(this).data("orderby");
		var item_count 		= jQuery(this).data("item_count");
		var excerpt_length 	= jQuery(this).data("excerpt_length");
		var category_name 	= jQuery(this).data("category_name");
		var offset 			= jQuery(this).data("offset");
		var found 			= jQuery(this).data("found");
		var layout_type 	= jQuery(this).data("layout_type");
		var	fitRows		 	= jQuery(this).data("fitrows");

		offset = offset + item_count;
		logistics_ozy_ajax_load_more_blog(order, orderby, item_count, category_name, offset, found, jQuery(this), layout_type, fitRows);
		jQuery(this).data("offset", offset);		

		return false;
		
	});	
}

/**
* Popup window launcher
*
* @url - Url address for the popup window
* @title - Popup window title
* @w - Width of the window
* @h - Height of the window
*/
function ozyPopupWindow(url, title, w, h) {
	"use strict";
	var left = (screen.width/2)-(w/2), top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

/**
* To check iOS devices and versions
*/
function ozyCheckIsMobile() {
	"use strict";
	return (/Mobi/.test(navigator.userAgent));
}

function ozyCheckMac(){
	"use strict";
	var isMac = /(mac)/.exec( window.navigator.userAgent.toLowerCase() );
	return ( isMac != null && isMac.length );
}

/**
* ozy_full_row_fix
* 
* Set sections to document height which matches with selector
*/
function logistics_ozy_height_fix() {
	"use strict";
	/* Master Slider Template */
	if(jQuery('body.page-template-page-masterslider-full').length) { 
		logistics_ozy_full_row_fix_calc('height'); 
	}
	/* Countdown Page */
	if(jQuery('body.page-template-page-countdown').length) {
		jQuery('#content').height(jQuery(window).height());
	}	
}

function logistics_ozy_full_row_fix_calc(height_param) {
	"use strict";
	var header_height = jQuery('#header').height();
	var window_height = (jQuery(window).innerHeight() - ((jQuery(this).outerHeight(true) - jQuery(this).height())));
	if(jQuery('#wpadminbar').length>0) {header_height = header_height + jQuery('#wpadminbar').height();}		
	jQuery('#main').css(height_param, (window_height - header_height) + 'px' );	
}

function logistics_ozy_share_button() {
	"use strict";
	jQuery(document).on('click', 'body.single .post-submeta>a:not(.blog-like-link)', function(e) {
		e.preventDefault();
		ozyPopupWindow(jQuery(this).attr('href'), 'Share', 640, 440);		
	});	
}

var ozy_ticker_containerheight = 0, ozy_ticker_numbercount = 0, ozy_ticker_liheight, ozy_ticker_index = 1, ozy_ticker_timer;
function logistics_ozy_callticker() {
	"use strict";
	jQuery(".ozy-ticker ul").stop().animate({
		"margin-top": (-1) * (ozy_ticker_liheight * ozy_ticker_index)
	}, 1500);
	jQuery('#ozy-tickerwrapper .pagination>a').removeClass('active');jQuery('#ozy-tickerwrapper .pagination>a[data-slide="'+ (ozy_ticker_index) +'"]').addClass('active');//bullet active
	if (ozy_ticker_index != ozy_ticker_numbercount - 1) {
		ozy_ticker_index = ozy_ticker_index + 1;
	}else{
		ozy_ticker_index = 0;
	}
	ozy_ticker_timer = setTimeout("ozy_callticker()", 3600);
}

// Function Primary Menu Fix for Mobile Devices
function logistics_ozy_primary_menu_fix() {
	if(!jQuery('body').hasClass('ozy-alternate-menu') && jQuery(window).width() < 1025 ) {
		jQuery('body').addClass('ozy-alternate-menu ozy-page-locked ozy-menu-script');
	}else if(jQuery('body').hasClass('ozy-menu-script') && jQuery(window).width() > 1025) {
		jQuery('body').removeClass('ozy-alternate-menu ozy-page-locked ozy-menu-script');
	}
}

/* Resets windows scroll position if there is a hash to make it work smooth scroll*/
var windowScrollTop = jQuery(window).scrollTop();
window.scrollTo(0, 0);
setTimeout(function() {
	"use strict";
	window.scrollTo(0, windowScrollTop);
}, 1);

jQuery(window).resize(function() {
	"use strict";
	
	logistics_ozy_height_fix();
	
	logistics_ozy_primary_menu_fix();
});

/**
* logistics_ozy_hash_scroll_fix
*
* Check if there is a hash and scrolls to there, onload
*/
function logistics_ozy_hash_scroll_fix() {
	"use strict";
	setTimeout(function(){
	if(window.location.hash) {
		var hash = window.location.hash;
		if(jQuery(hash).length) {
			jQuery('html,body').animate({scrollTop: jQuery(hash).offset().top}, 1600, 'easeInOutExpo');
		}
	}}, 200);	
}

jQuery(window).load(function(){
	"use strict";
	if (jQuery().masonry) {
		
		/* Search page */
		if(jQuery('body.search-results').length) {
			jQuery('body.search-results .post-content>div').masonry({
				itemSelector : 'article.result',
				gutter : 20
			});
		}
	}

	logistics_ozy_menu_bg_color_fixer();
	
	/* Row Kenburns Slider */
	jQuery('.smoothslides').each(function() {
		jQuery(jQuery(this)).smoothSlides({
			effectDuration:5000,
			navigation:false,
			pagination:false,
			matchImageSize:false
		});
    });

	/* Service Box and Service Box Excerpt height fix */
	jQuery('.vc_row .ozy-service-box').equalHeights();
	jQuery('.vc_row .ozy-service-box>.front-face>.excerpt-box').equalHeights();
	
	jQuery('#request-a-rate>div').scrollLock();
});

/* Sticky Menu, only works on desktop devices */
function logistics_ozy_menu_bg_color_fixer() {
	"use strict";
	var headerMenuFixed = false;
	if(!jQuery('body').hasClass('force-transparent-menu') && !jQuery('body').hasClass('ozy-menu-script')) {		
		if(jQuery(window).scrollTop() >= 110) {
			if(!headerMenuFixed) {
				jQuery('body').addClass('ozy-alternate-menu');
			}
		} else {
			jQuery('body').removeClass('ozy-alternate-menu');
			headerMenuFixed = false;
		}
	}
}

jQuery(window).scroll(function() {
	"use strict";
	logistics_ozy_menu_bg_color_fixer();
});

jQuery(document).ready(function($) {
	"use strict";	

	/*******DEMO*******/
	$('form#demo-switcher input[type=radio]').on('change', function() {
   		$(this).closest("form").submit();
	});
	$('form#demo-switcher>a').click(function(e) {
        e.preventDefault();
		$('form#demo-switcher').toggleClass('open');
		return false;
    }).click();
	/*******DEMO*******/

	logistics_ozy_share_button();

	logistics_ozy_height_fix();
	
	logistics_ozy_ajax_load_more_blog_action();
	
	logistics_ozy_hash_scroll_fix();
	
	logistics_ozy_primary_menu_fix();

	/* Primary Menu */
	$("#top-menu").menumaker({
	   format: "multitoggle"
	});
	
	$('#main-menu-button').click(function(e) {
        e.preventDefault();
		$('body').toggleClass('menu-open');
		$(this).find('p').html($('body').hasClass('menu-open') ? $(this).data('closecaption') : $(this).data('defaultcaption'));
    });
	
	/* Animsition */
	if(ozy_Animsition.is_active) {
		$(".animsition").animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',		
			inDuration: 1500,
			outDuration: 800,
			linkElement: '#top-menu li>a:not([target="_blank"]):not([href^="#"])',
			loading: true,
			loadingParentElement: 'body',
			loadingClass: 'cube-loader-wrapper',
			loadingInner: '<div class="loader-box"><div class="loader-cube"></div><div class="loader-cube"></div><div class="loader-cube"></div><div class="loader-cube"></div></div>', 
			timeout: true,
			timeoutCountdown: 3000,
			onLoadEvent: true,
			browser: [ 'animation-duration', '-webkit-animation-duration'],
			overlay : false,
			overlayClass : 'animsition-overlay-slide',
			overlayParentElement : 'body',
			transition: function(url){ window.location.href = url; }
		});
	}
	
	/* Menu Link */	
	$('#top-menu ul>li>a[href*="#"]:not([href="#"]):not([href="#top-search"]):not(#tracking-form):not(#request-a-rate-button):not(.request-a-rate-button):not([href="#side-menu"]),#content a[href^="#"]:not(.show-more):not([data-vc-container])').click(function(e) {
		var pattern = /^((http|https|ftp):\/\/)/;
		if(pattern.test(this.href)) {
			e.preventDefault();
			if(ozy_click_hash_check(this)) {
				if(ozy_Animsition.is_active) {
					$('.animsition').animsition('out', $(e.target), ozy_headerType.$OZY_WP_HOME_URL + this.hash);
				}else{
					window.location = ozy_headerType.$OZY_WP_HOME_URL + this.hash;
				}
			}
		}else if (/#/.test(this.href)) {		
			e.preventDefault();
			if(ozy_click_hash_check(this)) {			
				if(ozy_Animsition.is_active) {
					$('.animsition').animsition('out', $(e.target), ozy_headerType.$OZY_WP_HOME_URL + $(this).attr('href'));
				}else{
					window.location = ozy_headerType.$OZY_WP_HOME_URL + $(this).attr('href');
				}
			}
		}else{
			if(ozy_Animsition.is_active) {
				e.preventDefault();
				$('.animsition').animsition('out', $(e.target), $(this).attr('href'));
			}
		}		
	});		

	/* Search Button & Stuff */
	$('#close-search-overlay,#main-search-button').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('search-overlay-open');$('#search-overlay #search').focus();
	});		
	
	/* Language Switcher */
	$('.lang-switcher').click(function(e) {
		$('body').toggleClass('language-switcher-open');
        e.preventDefault();
    });	
	
	/* Request A Rate Form */
	function call_request_rate_form() {
		$('body').toggleClass('request-a-rate-open');
	}
	$('#request-a-rate-button, .request-a-rate-button, #request-a-rate-close-button').click(function(e) {
		e.preventDefault();
		call_request_rate_form();
		return false;
    });

	/* Tracking Form */
	$('a#tracking-form').click(function(e) {
        e.preventDefault();
		$('body').toggleClass('tracker-form-open');
		return false;
    });	
	
	/* Escape Key */
	$(document).keyup(function(e) {
		if (e.which == 27) {
			$('body').removeClass('search-overlay-open').removeClass('request-a-rate-open').removeClass('menu-open').removeClass('language-switcher-open').removeClass('tracker-form-open');
		}
		e.preventDefault();
    });
	
	$(document).on("click", function(e) {
		var dropdown_menu_div = $("#drop-menu-wrapper,#main-menu-button");
		if (!dropdown_menu_div.is(e.target) && !dropdown_menu_div.has(e.target).length) {
			if($('body').hasClass('menu-open')){				
				$('body').removeClass('menu-open');
			}
		}
	});

	/* Close overlay boxes when clicked somewhere on the document, if opened already */
	$(document).on("click", function(e) {
		var tracker_form_elm = $("body.tracker-form-open .primary-menu-bar-wrapper #freevision_tracker_form,body.tracker-form-open .header-menu-wrapper #freevision_tracker_form");
		if (!$('a#tracking-form').is(e.target) && !tracker_form_elm.is(e.target) && !tracker_form_elm.has(e.target).length && tracker_form_elm.is(':visible')) {
			$('body').removeClass('tracker-form-open');
		}
		var lang_switcher_elm = $("body.language-switcher-open span.lang-switcher-dropdown");
		if (!$('span.lang-switcher').is(e.target) && !lang_switcher_elm.is(e.target) && !lang_switcher_elm.has(e.target).length && lang_switcher_elm.is(':visible')) {
			$('body').removeClass('language-switcher-open');
		}		
	});	
	
	function logistics_ozy_visual_stuff() {	
		/* Blog Share Button*/
		$(document).on('click', '.post-submeta>a.post-share', function(e) {
			if($(this).data('open') !== '1') {
				$(this).data('open', '1').next('div').stop().animate({'margin-left': '0', opacity: 'show'}, 300, 'easeInOutExpo');
			}else{
				$(this).data('open', '0').next('div').stop().animate({'margin-left': '30px', opacity: 'hide'}, 300, 'easeInOutExpo');
			}
			e.preventDefault();
		});
		$(document).on("click", function(e) {
			var post_share_button = $(".post-submeta>a.post-share");
			if (!post_share_button.is(e.target) && !post_share_button.has(e.target).length) {
				post_share_button.data('open', '0').next('div').stop().animate({'margin-left': '30px', opacity: 'hide'}, 300, 'easeInOutExpo');
			}
		});
		
		/* Tooltip plugin init */	
		$(function(){
			$('.tooltip-top').tooltipsy({className:'tooltipsy white', offset: [0, 20]});
			$('.tooltip').tooltipsy();
		});
		
		/* Page Share Buttons */
		$('a.page-social-share').on('click',function(event){
		  event.preventDefault();
		  
		  $(this).parent().parent().find('a').not('.page-social-share').each(function(index){
			if(!$(this).hasClass('show')){
				$('body').addClass('page-social-share-open');
				$(this).addClass('show').css('opacity', 0).animate({top:((index+1)*36), opacity:1}, 50, 'easeInOutExpo');
			}else{      
			  $(this).animate({top:0, opacity:0}, 
			  {
				 duration: 50, 
				 easing: 'easeInOutExpo', 
				 complete: function(){ $('.page-share-buttons a').removeClass('show');}
			  });
			  $('body').removeClass('page-social-share-open');
			}
		  });
		});
		
		$(document).on("click", function(e) {
			if($('body').hasClass('page-social-share-open')) {
				var sidr_div = $("a.page-social-share");
				if (!sidr_div.is(e.target) && !sidr_div.has(e.target).length && sidr_div.is(':visible')) {
					$('a.page-social-share').click();
				}
			}
		});
		
		/* Counter */
		if ('undefined' !== typeof jQuery.fn.waypoint) {
			jQuery('.ozy-counter>.timer').waypoint(function() {
				if(!$(this).hasClass('ran')) {
					$(this).addClass('ran').countTo({
						from: $(this).data('from'),
						to: $(this).data('to'),
						speed: 5000,
						refreshInterval: 25,
						sign: $(this).data('sign'),
						signpos: $(this).data('signpos')
					});
				}
			},{ 
				offset: '85%'
			});
		}		
		
		/* Flickity Testimonial Slider */
		$('.carouselOfImages').each(function(index, element) {
			var $imagesCarousel = $(this).flickity({
				contain				: true,
				wrapAround			: true,
				pageDots			: $(this).data('pagedots'),
				prevNextButtons		: $(this).data('prevnextbuttons'),		
				groupCells			: $(this).data('groupcells'),
				autoPlay			: $(this).data('autoplay'),
				friction			: 0.3
			});
			
			function resizeCells() {
				var flkty = $imagesCarousel.data('flickity');
				var $current = flkty.selectedIndex
				var $length = flkty.cells.length
				if ($length < '3') {
					$imagesCarousel.flickity('destroy');
				}
				$('.carouselOfImages .carouselImage').removeClass("nextToSelected");
				$('.carouselOfImages .carouselImage').eq($current-1).addClass("nextToSelected");
				if ($current+1 == $length) {
					var $endCell = "0"
				} else {
					var $endCell = $current+1
				}
				$('.carouselOfImages .carouselImage').eq($endCell).addClass("nextToSelected");
			};
			
			resizeCells();
			
			$imagesCarousel.on( 'scroll.flickity', function() {
				resizeCells();
			});
        });
		
		/* Flickity Events Slide */
		$('.events-listing').flickity({
			// options
			lazyLoad: true,
			contain: true,
			accessibility: true,
			imagesLoaded: true,
			percentPosition: true,
			prevNextButtons: false,
			pageDots: false,
			cellAlign: 'left',
			wrapAround: true,
			adaptiveHeight:true,
			setGallerySize: false
		});
		
		if($('.events-listing').length > 0) {
			var $events = $('.events-listing').flickity({
				prevNextButtons: false,
				pageDots: false
			});
			// Flickity instance
			var flkty = $events.data('flickity');
			// elements
			var $cellButtonGroup = $('.button-group--cells');
			var $cellButtons = $cellButtonGroup.find('.carousel-nav-item');
			
			// update selected cellButtons
			$events.on( 'cellSelect.flickity', function() {
				$cellButtons.filter('.is-selected')
				.removeClass('is-selected');
				$cellButtons.eq( flkty.selectedIndex )
				.addClass('is-selected');
			});
			
			// select cell on button click
			$cellButtonGroup.on( 'click', '.carousel-nav-item', function() {
				var index = $(this).index();
				$events.flickity( 'select', index );
			});
		}
		
		/* YouTube Embed */
		$('.oytb-videoWrapper').each(function(index, element) {
			var $poster = $(this);
			var $wrapper = $poster.closest(this);

			$(this).click(function(ev){
				ev.preventDefault();
				videoPlay($wrapper);
			});
			
			function videoPlay($wrapper) {
				var $iframe = $wrapper.find('.oytb-js-videoIframe');
				var src = $iframe.data('src');
				$wrapper.addClass('oytb-videoWrapperActive');
				$poster.parent('div').find('.oytb-video-StopButton').show(100, 'easeInOutExpo');
				$iframe.attr('src',src);
			}
			
			$('.oytb-video-StopButton').click(function(){
				videoStop($wrapper);
			});
			
			function videoStop($wrapper) {
				if (!$wrapper) {
					var $wrapper = $('.oytb-js-videoWrapper');
					var $iframe = $('.oytb-js-videoIframe');
				} else {
					var $iframe = $wrapper.find('.oytb-js-videoIframe');
				}
				$wrapper.removeClass('oytb-videoWrapperActive');
				$poster.parent('div').find('.oytb-video-StopButton').hide(100, 'easeInOutExpo');
				$iframe.attr('src','');
			}
        });
		
		/* Post Slider */
		$('.ozy-post-slider').flickity({
			selectedAttraction: 0.1,
			friction: 0.4,
			prevNextButtons: false,
			cellAlign: 'left',
			contain: false,
			imagesLoaded: true,
			percentPosition: false,
			groupCells: 2
		});		

		/* Simple Info Box Equal Height */	
		var maxheight = 0;$('.vc_row .wpb_wrapper .ozy-simlple-info-box').each(function () {maxheight = ($(this).height() > maxheight ? $(this).css('height') : maxheight);});
		$('.vc_row .wpb_wrapper .ozy-simlple-info-box').height(maxheight);
		
		/* Image With Text Block */
		maxheight = 0;$('.vc_row .wpb_wrapper .ozy-image-with-text-block').each(function () {maxheight = ($(this).height() > maxheight ? $(this).css('height') : maxheight);});
		$('.vc_row .wpb_wrapper .ozy-image-with-text-block').height(maxheight);		
		
		/* Custom Buttons */
		$('.ozy-custom_button.ocbtn-6')
		.on('mouseenter', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
				$(this).find('span').css({top:relY, left:relX})
		})
		.on('mouseout', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});		
	}
	
	logistics_ozy_visual_stuff();
	
	function logistics_ozy_vc_components() {
		/* Google Map */
		if ('undefined' !== typeof jQuery.fn.prettyMaps) {
			$('.ozy-google-map:not(.init-later)').each(function(index, element) {
				$(this).parent().append(
					$('<div class="gmaps-cover"></div>').click(function(){ $(this).remove(); })
				);
				$(this).prettyMaps({
					address: $(this).data('address'),
					zoom: $(this).data('zoom'),
					panControl: true,
					zoomControl: true,
					mapTypeControl: true,
					scaleControl: true,
					streetViewControl: true,
					overviewMapControl: true,
					scrollwheel: true,
					image: $(this).data('icon'),
					hue: $(this).data('hue'),
					saturation: $(this).data('saturation'),
					lightness: $(this).data('lightness')
				});
			});
		}

		/* Multi Google Map */
		if ('undefined' !== typeof jQuery.fn.ozyGmap) {
			$('.ozy-multi-google-map').each(function(index, element) {
				$(this).parent().append(
					$('<div class="gmaps-cover"></div>').click(function(){ $(this).remove(); })
				);
				$(this).ozyGmap({
					dataPath: $(this).data('path'),
					zoom: $(this).data('zoom'),
					panControl: true,
					zoomControl: true,
					mapTypeControl: true,
					scaleControl: true,
					streetViewControl: true,
					overviewMapControl: true,
					scrollwheel: true,
					image: $(this).data('icon'),
					hue: $(this).data('hue'),
					saturation: $(this).data('saturation'),
					lightness: $(this).data('lightness')
				});
			});
		}
		
		/* News Ticker Box */
		$(".ozy-news-box-ticker").each(function() {
			$(this).bootstrapNews({
				newsPerPage: $(this).data('item_per_page'),
				autoplay: $(this).data('auto_play'),
				pauseOnHover: true,
				direction: $(this).data('direction'),
				newsTickerInterval: $(this).data('ticker_interval')
			});
        });
		if($(".ozy-news-box-ticker").length>0){ $(window).resize(); }

		/* Counter */
		if ('undefined' !== typeof jQuery.fn.waypoint) {
			jQuery('.ozy-counter>.timer').waypoint(function() {
				if(!$(this).hasClass('ran')) {
					$(this).addClass('ran').countTo({
						from: $(this).data('from'),
						to: $(this).data('to'),
						speed: 5000,
						refreshInterval: 25,
						sign: $(this).data('sign'),
						signpos: $(this).data('signpos')
					});
				}
			},{ 
				offset: '85%'
			});
		}
		
		/* Typewriter */
		$(".typing-box").each(function(index, element) {
			var options = {
				typeSpeed : $(this).data('typespeed'),
				startDelay : $(this).data('startdelay'),
				backSpeed : $(this).data('backspeed'),
				backDelay : $(this).data('backdelay'),
				loop : $(this).data('loop'),
				strings : $.parseJSON(ozyTypeWriterData[$(this).data('path')])
			};
			$(this).typed(options);            
        });		
		
		/* Team Member Extended Content */
		if($('.ozy-team_member_simple.has-extended-content').length) {
			$('body').append('<div id="side-extended-content-overlay"><div id="side-extended-content"><button type="button" class="close oic-cancel"></button><div class="content content-font"></div></div></div>');

			$('.ozy-team_member_simple.has-extended-content a.show-more').click(function(e) {
				e.preventDefault();
				var $this = $(this).parents('div.ozy-team_member_simple');
				$this.find('figure>a').click(function(e){ e.preventDefault(); });
				var $source = $this.find('.extended-content'),
				$target = $('#side-extended-content'),
				$width = window.innerWidth;
				if($width<620) {$width = $width - 20;}else{$width = 600;}$target.css('width', $width+'px');
				$('#side-extended-content-overlay').stop().css('left','0px').animate({opacity:1}, 200, 'easeInOutExpo', function(){
					$('html').css('overflow','hidden');
					$target.find('div.content').html($source.html());
					$target.show().stop().animate({right:0, opacity:1}, 500, 'easeInOutExpo');
				});
	
				function close_extended_box() {
					$target.stop().animate({right:'-'+$width+'px',opacity:0}, 500, 'easeInOutExpo', function(){
						$target.hide();
						$('html,body').css('overflow','auto');
						$('#side-extended-content-overlay').stop().css('left', '100%').animate({opacity:1}, 200, 'easeInOutExpo');
					});
				}
				
				$(window).resize(function() {
					close_extended_box();
				});
				
				$('#side-extended-content-overlay #side-extended-content button.close').click(function(){
					close_extended_box();
				});
				
				$('#side-extended-content-overlay').on('click', function(e) {
					var side_extended_content_div = $('#side-extended-content');
					if (!side_extended_content_div.is(e.target) && !side_extended_content_div.has(e.target).length) {
						e.preventDefault();
						close_extended_box();
					}
				});				
			});
		}
		
		
		/* Team Member Extended Content (Lightbox)*/
		if($('.ozy-team_member.has-extended-content').length) {
			$('.ozy-team_member.has-extended-content a').click(function(e) {
				e.preventDefault();
				var $this = $(this).parents('div.ozy-team_member');
				$this.find('figure>a').click(function(e){ e.preventDefault(); });
				var $source = $this.find('.extended-content'),
				$target = $('#side-extended-content');
				$.fancybox({
					minWidth:940,
					maxWidth:940,
					maxHeight:640,
					padding:0,
					scrolling:'no',
					'content' : $source.html()
				});				
			});
		}

		/* Row Scrolling Effect */
		$('.wpb_row[data-bgscroll]').each(function() {
			var params = $(this).data('bgscroll').split(',');
			$(this).ozyBgScroller({direction:params[0], step:params[1]});
		});
		
		/* TTA Margin Bottom Fix */
		$('.vc_tta.vc-no-bottom-margin').parents('.vc_tta-container').css('margin', '0');
		
		/* CMB Calculator */
		function calculate_cbm() {
			//var unit = $('#ozy-cbm_calculator').data('unit');
			var unit = $('#ozy-cbm_calculator #unit-type').val();
			
			var number_of_cartons = parseFloat( $('#number_of_cartons').val() );
			var length = parseFloat( $('#length').val() );
			var height = parseFloat( $('#height').val() );
			var width = parseFloat( $('#width').val() );

			var total_cmb_calculated = 0;
			if( unit == 'Inches' ) {
				total_cmb_calculated = ((length * height * width) / 1728) * 0.02831685 * number_of_cartons;
			}else{
				total_cmb_calculated = ((length * height * width) / 1000000) * number_of_cartons;
			}
			
			$('#total_cmb_calculated').html( total_cmb_calculated );
			$('#cbm').val( total_cmb_calculated );
			
			var cbm_rate = parseFloat( $('#cbm_rate').val() );
			
			if( cbm_rate > 0 ) {
				$('#base_ocean_freight_rate').html( (cbm_rate * total_cmb_calculated).formatMoney(2, ',', '.') );
			}
		}
		
		$('#ozy-cbm_calculator #unit-type').on('change', function() {
			$('#ozy-cbm_calculator label>.unit-span').text( $(this).val() );
			calculate_cbm();
		});
		
		$('#number_of_cartons, #length, #height, #width, #cbm_rate').on('keyup', function() {
			calculate_cbm();
		});
		
		$('#calculate_cbm').on('click', function() {
			calculate_cbm();
		});
	
		/* MT Calculator */
		function calculate_mt() {
			
			var total_weight_in_kgs = parseFloat( $('#total_weight_in_kgs').val() );
			var mt_rate = parseFloat( $('#mt_rate').val() );
			var total_cmb_calculated = ((total_weight_in_kgs * mt_rate) / 1000);
			
			$('#base_ocean_freight_rate_mt').html( (total_cmb_calculated).formatMoney(2, ',', '.') );
		}
		
		$('#total_weight_in_kgs, #mt_rate').on('keyup', function() {
			calculate_mt();
		});
		
		$('#calculate_mt').on('click', function() {
			calculate_mt();
		});			
	}
	
	Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
		var n = this,
			decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
			decSeparator = decSeparator == undefined ? "." : decSeparator,
			thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
			sign = n < 0 ? "-" : "",
			i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
	};	
	
	logistics_ozy_vc_components();
	
	/* Check if section ID and menu target is match */
	$('.wpb_row').bind('inview', function (event, visible) {
		var $elm = $('#top-menu>div>div>ul>li>a[href*="#'+ $(this).attr('id') +'"]:not([href="#"])').parent();
		if (visible == true) {
			$elm.addClass('current_page_item');
		}else{
			$elm.removeClass('current_page_item');
		}
	});
		
	/* Contact Form 7 Date Time Picker */
	if ('undefined' !== typeof jQuery.fn.datetimepicker) {
		$('input.datetimepicker').datetimepicker();
	}

	function ozy_click_hash_check($this) {
		if (location.pathname.replace(/^\//,'') == $this.pathname.replace(/^\//,'') 
			|| location.hostname == $this.hostname) {
	
			var target = $($this.hash);
			target = target.length ? target : $('[name=' + $this.hash.slice(1) +']');
		   	if (target.length) {
				$('html,body').animate({
					 scrollTop: target.offset().top
				}, 1600, 'easeInOutExpo');
				return false;
			}
		}
		return true;
	}	
	
	/* Waypoint animations */
	if ('undefined' !== typeof jQuery.fn.waypoint) {
	    jQuery('.ozy-waypoint-animate').waypoint(function() {
			jQuery(this).addClass('ozy-start-animation');
		},{ 
			offset: '85%'
		});
	}
	
	/* Blog post like function */
	$(document).on('click', '.blog-like-link', function(e) {
		ajax_favorite_like($(this).data('post_id'), 'like', 'blog', this);
		e.preventDefault();
    });
	
	/* FancyBox initialization */
	$(".wp-caption>p").click(  function(){ jQuery(this).prev('a').attr('title', jQuery(this).text()).click(); } ); //WordPress captioned image fix
	$(".fancybox, .wp-caption>a, .single-image-fancybox a").fancybox({
		beforeLoad: function() {
		},
		padding : 0,
		helpers		: {
			title	: { type : 'inside' },
			buttons	: {}
		}
	});
	$('.fancybox-media').fancybox({openEffect  : 'none',closeEffect : 'none',helpers : {title	: { type : 'inside' }, media : {}}});
	
	/* Back to top button */	
	var pxScrolled = 200;
	var duration = 500;
	
	$(window).scroll(function() {
		if ($(this).scrollTop() > pxScrolled) {
			$('.logistics-btt-container').css({'bottom': '40px', 'transition': '.3s'});
		} else {
			$('.logistics-btt-container').css({'bottom': '-100px'});
		} 
	});
	
	$('.top').click(function() {
		$('body,html').animate({scrollTop: 0}, duration);
	})	
});

/**
* SVG replacer. Replaces <img src=svg/> into SVG element.
*
* Credits: How to change color of SVG image using CSS (jQuery SVG image replacement)?, http://stackoverflow.com/q/11978995
*/
jQuery(function(){
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            
            // Check if the viewport is set, else we gonna set it if we can.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
    
            // Replace image with new SVG
            $img.replaceWith($svg);
    
        }, 'xml');
    
    });
});



jQuery(function($) {
	if($('body.use-side-navigation').length) {

		$('body').append('<nav id="section-menu" class="content-font-family"><ul></ul></nav>');
		
		var html = $('html');
		var viewport = $(window);
		var viewportHeight = viewport.height();
		
		var scrollMenu = $('#section-menu');
		var timeout = null;
		
		function menuFreeze() {
			if (timeout !== null) {
			  scrollMenu.removeClass('freeze');
			  clearTimeout(timeout);
			}
		
			timeout = setTimeout(function() {scrollMenu.addClass('freeze');}, 2000);
		}
		scrollMenu.mouseover(menuFreeze);
	
		/* Build the Scroll Menu based on Sections .scroll-item */
	
		var sectionsHeight = {},
		viewportheight, i = 0;
		var scrollItem = $('.vc_row.wpb_row[data-rowcaption][id]');
		var bannerHeight;
		
		function sectionListen() {
			viewportHeight = viewport.height();
			bannerHeight = (viewportHeight);
			$('.vc_row.wpb_row[data-rowcaption][id]').addClass('resize');
			scrollItem.each(function() {
				sectionsHeight[this.id] = $(this).offset().top;
			});
		}
		sectionListen();
		viewport.resize(sectionListen);
		viewport.bind('orientationchange', function() {
			sectionListen();
		});
		
		var count = 0;
	
		scrollItem.each(function() {
			var anchor = $(this).attr('id');
			var title = $(this).data('rowcaption');
			count++;
			$('#section-menu ul').append('<li><a id="nav_' + anchor + '" href="#' + anchor + '"><span>' + count + '</span> ' + title + '</a></li>');
		});
	
		function menuListen() {
			var pos = $(this).scrollTop();
			pos = pos + viewportHeight * 0.625;
			for (i in sectionsHeight) {
				if (sectionsHeight[i] < pos) {
					$('#section-menu a').removeClass('active');
					$('#section-menu a#nav_' + i).addClass('active');
				} else {
					$('#section-menu a#nav_' + i).removeClass('active');
				}
			}
		}
		scrollMenu.css('margin-top', scrollMenu.height() / 2 * -1);
	
		/* Smooth Scroll for Anchor Links and URL refresh */
	
		scrollMenu.find('a').click(function() {
			var href = $.attr(this, 'href');
			$('html,body').animate({
				scrollTop: $(href).offset().top
			}, 500, function() {
				window.location.hash = href;
			});
			return false;
		});
	
	  	/* Fire functions on Scroll Event */
	
		function scrollHandler() {
			menuListen();
			menuFreeze();
		}
		scrollHandler();
		viewport.on('scroll', function() {
			scrollHandler();
		});
	}
});