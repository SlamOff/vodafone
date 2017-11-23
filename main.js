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
		}
		else{
			$(chat).css('display', 'block');
			$(resizer).show();
		}
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
	// $('textarea').keypress(function(){
	// 	var height = getComputedStyle(this).height;
		
	// 	// text = this.value.length;
	// 	// if (text > 35){
	// 	// 	height = 60;
	// 	// }
	// 	text = $(this).val();
	// 	if (text > 35){
	// 		height = 60;
	// 	}



	// 	console.log(text);
	// });
	// function resizeArea(text_id, minHeight, maxHeight){
	// 	var area = $(text_id);
	// 	var area_hidden = $(text_id + "_hidden");
	// 	var text = '';
	// 	area.value.replace(/[<>]/g, '_').split("\n").each( function(s) {
	// 		text = text + '<div>' + s.replace(/\s\s/g, ' &nbsp;') + '&nbsp;</div>'+"\n";
	// 	});
	// 	area_hidden.innerHTML = text;
	// 	var height = area_hidden.offsetHeight + 15;
	// 	height = Math.max(minHeight, height);
	// 	height = Math.min(maxHeight, height);
	// 	area.style.height = height + 'px';
	// }
	// //resizeArea();
	// $('#comment_text').keyup(function(){
	// 	resizeArea('comment_text', 45, 455);
	// });

	// var linecount = 1;
	// var area = $('.form textarea');
	// area.value.split("\n").each( function(s) {
	// 	linecount += Math.floor( s.length / cols ) + 1;
	// });
	// area.rows = linecount;
	// console.log(linecount);
	// var area = $('.form textarea');
	
	// $('textarea').keyup(function(){
	// 	console.log(area.val());
	// });
	// var textarea = document.querySelector('#textarea');

	// textarea.addEventListener('keydown', autosize);
             
	// function autosize(){
	// 	var el = this;
	// 	setTimeout(function(){
	// 	el.style.cssText = 'height:auto; padding:0';
	// 	// for box-sizing other than "content-box" use:
	// 	// el.style.cssText = '-moz-box-sizing:content-box';
	// 	el.style.cssText = 'height:' + el.scrollHeight + 'px';
	// 	},0);
	// }
	autosize($('#textarea'));

});