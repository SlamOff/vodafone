$(document).ready(function() {
	$('.roll').click(function(){
		$('.chat_container').removeClass('resizable');
		chatContainer.style.width = "auto";
		chatContainer.style.height = "auto";
		var wrap = $('.chat_wrapper');
		wrap.toggleClass('closed_chat');
		if(wrap.hasClass('closed_chat')){
			$(chat).css('display', 'none');
			//$('.chat_container').css('min-height', '1px');
			$(resizer).hide();
			$('.chat_user_message').hide();
			$('.chat_user_footer').hide();
		}
		else{
			$(chat).css('display', 'block');
			$(resizer).show();
			$('.chat_user_message').show();
			$('.chat_user_footer').show();
		}
	});
	$('.chat_end').click(function(){
		var thanks = $('.thanks');
		thanks.toggle();
		var messageInput = $('.chat_user_message input');
		messageInput.attr('placeholder', 'Чат завершен');
		messageInput.attr('disabled', 'disabled');
		this.textContent = 'Возобновить чат';
		$('.chat_user_message .send').css('border-left-color', '#cdcdcd');
		if($('.thanks').is(':hidden')){
			messageInput.removeAttr('disabled');
			$('.chat_user_message .send').css('border-left-color', '#e50000');
			messageInput.attr('placeholder', 'Введите Ваше сообщение');
			this.textContent = 'Завершить чат';
			messageInput.focus();
		}
	});
	var rating = $('.rating');
	var rating2 = $('.next_rating');
	var rating3 = $('.final_rating');
	var rateWrapper = $('.dialog');
	$('#rate').click(function(){
		$('.chat_user_message').hide();
		$('.chat_user_footer').hide();
		rateWrapper.css({
			'backgroundColor' : '#fff',
			'paddingBottom' : '20px',
			'minHeight' : '1px',
			'border' : 'none'
		});
		rateWrapper.empty();
		rateWrapper.append(resizer);
		rateWrapper.append(rating);
		rating.show();
		rating2.hide();
		rating3.hide();
	});
	$('#next_rate').click(function(){
		rateWrapper.empty();
		rateWrapper.append(resizer);
		rateWrapper.append(rating2);
		rating2.show();
		rating3.hide();
	});
	$('.final_rate').click(function(e){
		console.log(e);
		rateWrapper.empty();
		rateWrapper.append(resizer);
		rateWrapper.append(rating3);
		rating3.show();
	});
	// resize
	var chat = document.querySelector('.chat_main');
	var chatContainer = document.querySelector('.chat_container');
	var chatHeigth = $('.chat_container').height();
	var resizer = document.querySelector('.resizer');
	resizer.addEventListener('mousedown', initDrag, false);
	var startX, startY, startWidth, startHeight;

	function initDrag(e) {
		startX = e.clientX;
		startY = e.clientY;
		chatContainer.classList.add('resizable');
		//$('.chat_container').css('min-height', '300px');
		startWidth = parseInt(document.defaultView.getComputedStyle(chatContainer).width, 10);
		startHeight = parseInt(document.defaultView.getComputedStyle(chatContainer).height, 10);
		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);
		// $('.dialog').css('min-height', '1px');
	}

	function doDrag(e) {
		chatContainer.style.width = (startWidth + e.clientX - startX) + 'px';
		chatContainer.style.height = (startHeight + e.clientY - startY) + 'px';
	}

	function stopDrag(e) {
		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);
	}

	$('.chat_main').mCustomScrollbar({
		//scrollbarPosition: "outside"
	});

	var locationURL = window.location.pathname;
	if ( locationURL == "/ua" ) {
		var validationName = "Це поле обов'язкого для заповнення";
		var validationNameMax = "Від 2 до 16 літер";
		var validationPhone = "Невірний формат номеру";
		var validationEmail = "Введите вірний E-mail";
	}
	else {
		var validationName = "Это поле обязательно для заполнения";
		var validationNameMax = "От 2 до 16 букв";
		var validationPhone = "Неправильный формат номера";
		var validationEmail = "Введите корректный E-mail";
	}

	var stars = document.querySelectorAll('.star');
	var stars2 = Array.prototype.slice.call(stars);

	stars2.map(function(el, ind){
		el.onmouseover = function(e){
			for(var m = 0; m < ind; m++){
				stars[m].style.backgroundColor = '#e60000';
			}
			this.style.backgroundColor = '#e60000';
		}
		el.onmouseout = function(e){
			el.style.backgroundColor = '#000';
			for(var m = 0; m < ind; m++){
				stars[m].style.backgroundColor = '#000';
			}
		}
		el.onclick = function(e){
			el.style.backgroundColor = '#e60000';
			for(var m = 0; m < ind; m++){
				stars[m].style.backgroundColor = '#e60000';
			}
		}
	});
	$('.form').validate({
		errorPlacement: function(error, element) {
			if (element.attr("name") == "name" ){
				error.insertAfter(".form #name p");
			}
			else if (element.attr('name') == 'phone' ){
				error.insertAfter('.form #tel p');
			}
		},
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			phone: {
				required: true,
				digits: true
			}
		},
		messages: {
			name: {
				required: validationName,
				minlength: validationNameMax,
				maxlength: validationNameMax
			},
			phone: {
				required: validationName,
				digits: validationPhone
			}
		}
	});
	autosize($('.textarea2'));
});