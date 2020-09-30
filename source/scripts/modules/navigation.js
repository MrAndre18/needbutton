// Управление меню

$('.menu-btn').click(() => {
	switchMenu();
});

function switchMenu() {
	$('.menu').toggleClass('menu-disactive');
	$('.menu').toggleClass('menu-active');
}

// Скрытие меню по клику вне блока

$(document).click((e) => {
	if ( ! $('.menu-btn').is(e.target) &&
				$('.menu-btn').has(e.target).length === 0 &&
			 ! $('.menu').is(e.target) &&
			  $('.menu').has(e.target).length === 0
		) {
		$('.menu').addClass('menu-disactive');
		$('.menu').removeClass('menu-active');
	}
});

// Кнопки навигации

const navigationBtns = $('.menu-items a');

function makeNavBtnActive(element) {
	navigationBtns.each(function() {
		if ($(this).is($(element))) {
			$(this).addClass('active');
		}
		else {
			$(this).removeClass('active');
		}
	});
}

$(document).scroll(() => {
	navigationBtns.each(function() {
		const blockID = '' + $(this).attr('href');
		if ($(document).scrollTop() >= $(blockID).offset().top - 180) {
			makeNavBtnActive($(this));
		}
	});
});

navigationBtns.each(function() {
	$(this).click(() => {
		makeNavBtnActive($(this));
	})
});