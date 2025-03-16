var speed = 5000;
canTick = true;

jQuery(document).ready(function($) {
	$('.ozy-ticker-container ul div').each(function(i) {
		if ($(window).width() >= 500) {
			$(this).find('li').width($(window).width() - parseInt($(this).css('left')));
		}
		if (i == 0) {
			$(this).addClass('ticker-active');
		} else {
			$(this).addClass('not-active');
		}
		if ($(this).find('li').height() > 30) {
			$(this).find('li').css({
				'height': '20px',
				'width': '200%',
				'text-align': 'left',
				'padding-left': '5px'
			});
			$(this).find('li').css('width', $(this).find('li span').width());
		}
	});
	startTicker();
	animateTickerElementHorz();
});

jQuery(window).resize(function() {
	jQuery('.ozy-ticker-container ul div').each(function(i) {
		if (jQuery(this).find('li').height() > 30) {
			jQuery(this).css({
				'height': '20px',
				'width': '200%',
				'text-align': 'left',
				'padding-left': '5px'
			});
			jQuery(this).find('li').css('width', jQuery(this).find('li span').width());
		}
	});
});

function startTicker() {
	setInterval(function() {
		if (canTick) {
			jQuery('.ozy-ticker-container ul div.ticker-active')
				.removeClass('ticker-active')
				.addClass('remove');
			if (jQuery('.ozy-ticker-container ul div.remove').next().length) {
				jQuery('.ozy-ticker-container ul div.remove')
					.next()
					.addClass('next');
			} else {
				jQuery('.ozy-ticker-container ul div')
					.first()
					.addClass('next');
			}
			jQuery('.ozy-ticker-container ul div.next')
				.removeClass('not-active next')
				.addClass('ticker-active');
			setTimeout(function() {
				jQuery('.ozy-ticker-container ul div.remove')
					.css('transition', '0s ease-in-out')
					.removeClass('remove')
					.addClass('not-active finished');
				if (jQuery(window).width() < 500) {
					if (jQuery('.ozy-ticker-container ul div.finished li').width() < jQuery(window).width()) {
						jQuery('.ozy-ticker-container ul div.finished').removeClass('finished');
					}
				} else {
					if (jQuery('.ozy-ticker-container ul div.finished li').width() < (jQuery(window).width() - (parseInt(jQuery('.ozy-ticker-container ul div.ticker-active').css('left')) + 15))) {
						jQuery('.ozy-ticker-container ul div.finished').removeClass('finished');
					}
				}
				setTimeout(function() {
					jQuery('.ozy-ticker-container ul div')
						.css('transition', '0.25s ease-in-out');
				}, 75);
				animateTickerElementHorz();
			}, 250);
		}
	}, speed);
}

function animateTickerElementHorz() {
	if (jQuery(window).width() < 500) {
		if (jQuery('.ozy-ticker-container ul div.ticker-active li').width() > jQuery(window).width()) {
			setTimeout(function() {
				jQuery('.ozy-ticker-container ul div.ticker-active li').animate({
					'margin-left': '-' + ((jQuery('.ozy-ticker-container ul div.ticker-active li').width() - jQuery(window).width()) + 15)
				}, speed - (speed / 5), 'swing', function() {
					setTimeout(function() {
						jQuery('.ozy-ticker-container ul div.finished').removeClass('finished').find('li').css('margin-left', 0);
					}, ((speed / 5) / 2)); 
				});
			}, ((speed / 5) / 2));
		}
	} else {
		if (jQuery('.ozy-ticker-container ul div.ticker-active li').width() > (jQuery(window).width() - parseInt(jQuery('.ozy-ticker-container ul div.ticker-active').css('left')))) {
			setTimeout(function() {
				jQuery('.ticker-container ul div.ticker-active li').animate({
					'margin-left': Math.abs(jQuery('.ozy-ticker-container ul div.ticker-active li').width() - (jQuery(window).width() - parseInt(jQuery('.ozy-ticker-container ul div.ticker-active').css('left'))) + 15) * -1
				}, speed - (speed / 5), 'swing', function() {
					setTimeout(function() {
						jQuery('.ozy-ticker-container ul div.finished').removeClass('finished').find('li').css('margin-left', 0);
					}, ((speed / 5) / 2)); 
				});
			}, ((speed / 5) / 2));
		}
	}
}

jQuery('.ozy-ticker-container').on('mouseover', function() {
	canTick = false;
});

jQuery('.ozy-ticker-container').on('mouseout', function() {
	canTick = true;
});