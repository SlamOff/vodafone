	$(document).ready(function() {
		var wrap = $('.chat_wrapper');
		// сворачивание чата
		$('.roll').click(function(){
			$('.chat_container').removeClass('resizable');
			//chatContainer.style.width = "auto";
			chatContainer.style.height = 'auto';
			wrap.toggleClass('closed_chat');
			if(wrap.hasClass('closed_chat')){
				$(chat).css('display', 'none');
				wrap.css('align-items', 'flex-end');
				$('.chat_container *').hide();
				$('.chat_container .chat_header *, .chat_container .chat_header').show();
				$('star br').hide();
			}
			else{
				$(chat).show();
				$('.chat_container *').show();
				$('.no_message').css('align-items', 'center');
				checkHeight();
				getHeight();
				// $(resizer).show();
				// $('.chat_user_message').show();
				// $('.chat_user_footer').show();
				//checkHeight();
			}
		});
		

		// завершение/возобновление чата
		$('.chat_end').click(function(){
			checkHeight();
			$('.message_container').css('height', containerHeight);
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
			else{
				checkHeight();
			}
		});
		// следующие шаги
		var rating = $('.first_rating');
		var rating2 = $('.next_rating');
		var rating3 = $('.final_rating');
		var rateWrapper = $('.dialog');
		$('#rate').click(function(){
			rateWrapper.addClass('no_message');
			checkHeight();
			getHeight();
			$('.message_container').css('height', 'auto');
			wrap.css('align-items', 'center');
			$('.chat_user_message').remove();
			$('.chat_user_footer').remove();
			rateWrapper.css({
				'backgroundColor' : '#fff',
				'paddingBottom' : '40px',
				'minHeight' : '1px',
				'border' : 'none'
			});
			$('.chat_main').mCustomScrollbar('destroy');
			rateWrapper.empty();
			rateWrapper.css('height', 'auto');
			
			chatContainer.append(resizer);
			//chatContainer.style.height = 'auto';
			rateWrapper.append(rating);
			
			rating.show();
			$('.chat_main').mCustomScrollbar();
		});
		$('#next_rate').click(function(){
			$('.chat_main').mCustomScrollbar('destroy');
			rateWrapper.empty();
			chatContainer.append(resizer);
			rateWrapper.append(rating2);
			rating2.show();
			$('.chat_main').mCustomScrollbar();
			//chatContainer.style.height = 'auto';
		});
		$('.final_rate').click(function(){
			$('.chat_main').mCustomScrollbar('destroy');
			rateWrapper.empty();
			chatContainer.append(resizer);
			rateWrapper.append(rating3);
			rating3.show();
			$('.chat_main').mCustomScrollbar();
		});
	$('.chat_main').mCustomScrollbar();
		var chat = document.querySelector('.chat_main');
		var chatContainer = document.querySelector('.chat_container');
		var chatHeigth = $('.chat_container').height();
		var resizer = document.querySelector('.resizer');
		resizer.addEventListener('mousedown', initDrag, false);
		var startX, startY, startWidth, startHeight;
		var containerHeight;

		function getHeight(){
			containerHeight = parseInt(getComputedStyle(chatContainer).height);
			return containerHeight;
		}
		var variableHeight = getHeight();
		//$('.resizer').click(getHeight);
		// отцентровка контейнера, если его высота не больше высоты окна
		function checkHeight(){
			if(window.innerHeight <= containerHeight){
				wrap.css('align-items', 'stretch');
				console.log(1);
			}
			else {
				wrap.css('align-items', 'center');
				console.log(window.innerHeight);
				console.log(containerHeight);
				console.log(variableHeight);
				
			}
		}
		checkHeight();
		$('.submit').click(function(){
			checkHeight();
			getHeight();
			//$('.chat_wrapper').css('align-items', 'stretch');
		});
		// ресайзер чата
		function initDrag(e) {
			startX = e.clientX;
			startY = e.clientY;
			chatContainer.classList.add('resizable');
			startWidth = parseInt(document.defaultView.getComputedStyle(chatContainer).width, 10);
			startHeight = parseInt(document.defaultView.getComputedStyle(chatContainer).height, 10);
			document.documentElement.addEventListener('mousemove', doDrag, false);
			document.documentElement.addEventListener('mouseup', stopDrag, false);
			checkHeight();
			getHeight();
		}

		function doDrag(e) {
			chatContainer.style.width = (startWidth + e.clientX - startX) + 'px';
			chatContainer.style.height = (startHeight + e.clientY - startY) + 'px';
			checkHeight();
			getHeight();
		}

		function stopDrag(e) {
			document.documentElement.removeEventListener('mousemove', doDrag, false);
			document.documentElement.removeEventListener('mouseup', stopDrag, false);
			checkHeight();
			getHeight();
		}
		
		
		
		// оценка оператора
		var stars = document.querySelectorAll('.star');
		var stars2 = Array.prototype.slice.call(stars);
		var cancel = false;
		function changeColor(color, index){
			for(var l = 0; l < stars.length; l++){
				stars[l].style.backgroundColor = '#000';
			}
			for(var m = 0; m <= index; m++){
				stars[m].style.backgroundColor = color;
			}
		}
		stars2.map(function(el, ind){
			el.onmouseover = function(){
				if(!cancel){
					changeColor('#e60000', ind);
				}
			}
			el.onclick = function(){
				cancel = true;
				changeColor('#e60000', ind);
			}
			
			el.onmouseout = function(){
				if(!cancel){
					changeColor('#000', ind);
				}
			}
		});

		// валидация
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
		// ресайз текстареа
		autosize($('.textarea2'));
	});