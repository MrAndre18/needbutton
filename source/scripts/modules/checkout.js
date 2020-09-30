$("#telephone").mask('+7 (999) 999-99-99', {autoclear: false});


const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

let name,
		email,
		tel,
		text = $("#message").val().trim();

function checkName() {
	name = $("#name").val().trim();

	if (name == '') {
		$(".name-form .svg").fadeIn();
		$('.name-form').addClass('form-error');
	}
	else {
		$(".name-form .svg").fadeOut();
		$('.name-form').removeClass('form-error');
	}
}

function checkEmail() {
	email = $("#email").val().trim();

	if (!emailPattern.test(email)) {
		$(".email-form .svg").fadeIn();
		$('.email-form').addClass('form-error');
	}
	else {
		$(".email-form .svg").fadeOut();
		$('.email-form').removeClass('form-error');
	}
}

function checkTelephone() {
	tel = $("#telephone").val().trim();

	if (tel == '') {
		$(".number-form .svg").fadeIn();
		$('.number-form').addClass('form-error');
	}
	else {
		$(".number-form .svg").fadeOut();
		$('.number-form').removeClass('form-error');
	}
}

$('#name').blur(() => {
	checkName();
});

$('#email').blur(() => {
	checkEmail();
});

$('#telephone').blur(() => {
	checkTelephone();
});


$('.btn-send').click(() => {
	checkName();
	checkEmail();
	checkTelephone();

	$('.form-error').each(function() {
		$(this).addClass('animate__shakeX');
	});
	setTimeout(() => {
		$('.form-error').each(function() { 
			$(this).removeClass('animate__shakeX');
		});
	}, 1000);

	let erroredForms = $.makeArray($('.form-error'));

	if (erroredForms.length == 0) {
		$('.checkout-success').fadeIn(1000);

		let timeoutID = setTimeout(() => {
			$('.checkout-success').fadeOut(1000);
		}, 5000);

		$('.checkout-success').click(() => {
			clearTimeout(timeoutID);
			$('.checkout-success').fadeOut(1000);
		});
	}
});


$('.checkout').submit((e) => {
	e.preventDefault();

	$.ajax({
		url: 'php/mail.php',
		type: 'POST',
		cache: false,
		data: {'name': name, 'email': email, 'tel': tel, 'text': text},
		dataType: 'html'
	});
});
