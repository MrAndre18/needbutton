
// Скролл наверх 

$('.short-logo').click(function(){
	if ($(document).scrollTop() > '0') {
		$('body').animate({scrollTop:0}, 1000);
		$('html').animate({'scrollTop':0}, 1000);
	}
});

// Скроллинг по якорям

const anchors = $('a[data-target^="anchor"]');

anchors.each(function() {
	$(this).click((event)=>{
		event.preventDefault();

		const blockID = '' + $(this).attr('href');
		const top = $(blockID).offset().top;
		$("body, html").animate({scrollTop: top}, 1000);
	})
});

// Кнопка "Заказать сайт"

$('.to-checkout, .checkout-btn').click(() => {
	$("body, html").animate({scrollTop: $('#contacts').offset().top}, 1000);
});

$(window).scroll(() => {
	if ($(window).scrollTop() >= $('#contacts').offset().top - 200) {
		$('.to-checkout').fadeOut(600, 'linear');
	}
	else {
		$('.to-checkout').fadeIn(1000, 'linear');
	}
});