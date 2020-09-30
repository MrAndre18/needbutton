$('.slider').slick({
	speed: 600,
	centerMode: true,
	variableWidth: false,
	waitForAnimate: false,
	focusOnSelect: true,
	swipeToSlide: true,
	responsive: [
		{
			breakpoint: 599,
			settings: {
				centerMode: false,
				waitForAnimate: true,
				rows: 2,
				slidesPerRow: 2,
				swipeToSlide: false,
			}
		},
		{
			breakpoint: 1023,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				waitForAnimate: true,
				centerMode: false,
				autoplay: false,
				autoplaySpeed: 5000,
				focusOnSelect: false,
			}
		}
	],
	mobileFirst: true
});
$('.slider .slick-prev').html('');
$('.slider .slick-prev').append($('<img>', {
	src: 'img/svg/left.svg',
	alt: 'Влево',
	class: 'svg prev-example'
}));
$('.slider .slick-next').html('');
$('.slider .slick-next').append($('<img>', {
	src: 'img/svg/right.svg',
	alt: 'Вправо',
	class: 'svg next-example'
}));

$(document).resize(function() {
	$('.slider').slick('setPosition');
});