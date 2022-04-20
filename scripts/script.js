var opened = 0;

function disableChatbotButton(){
	document.getElementById("chatbot_button").disabled = true;
	setTimeout(function(){document.getElementById("chatbot_button").disabled = false;},2000);
}

jQuery(document).ready(function($) {
	jQuery(document).on('click', '.iconInner', function(e) {//funzione di jquery che da vita al bot
		jQuery(this).parents('.botIcon').addClass('showBotSubject');
		$("[name='msg']").focus();
		
		opened++;

		var messaggio='';//in base al momento della giornata fornisce un messaggio di benvenuto differente
		if (opened<=1){
		var i_am_bot = 'sono il bot di Alberto e sono qui per aiutarti. Cosa vuoi sapere?'
		nowtime = new Date();
		nowhoue = nowtime.getHours();
		if(nowhoue >= 12 && nowhoue <= 16) {
			messaggio='Buon  pomeriggio, ';
		} else if(nowhoue >= 10 && nowhoue <= 12) {
			messaggio='Buongiorno, '+ i_am_bot;
		} else {
			messaggio='Buona sera, ' + i_am_bot;
		}
		$('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url(https://img.freepik.com/free-vector/cute-robot-cartoon-vector-icon-illustration-techology-robot-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1474.jpg?w=740)"></figure></span><span class="responsText">' + messaggio + '</span></div>');
		$("[name='msg']").val("");

		}


	});

	jQuery(document).on('click', '.closeBtn, .chat_close_icon', function(e) {
		jQuery(this).parents('.botIcon').removeClass('showBotSubject');
		jQuery(this).parents('.botIcon').removeClass('showMessenger');
	});

	jQuery(document).on('submit', '#botSubject', function(e) {
		e.preventDefault();

		jQuery(this).parents('.botIcon').removeClass('showBotSubject');
		jQuery(this).parents('.botIcon').addClass('showMessenger');
	});
	
	/* Chatboat Code */
	$(document).on("submit", "#messenger", function(e) {
		e.preventDefault();

		disableChatbotButton()

		var val = $("[name=msg]").val().toLowerCase();
		var mainval = $("[name=msg]").val();
		name = '';
		nowtime = new Date();
		nowhoue = nowtime.getHours();

		function userMsg(msg) {//funzione che fa apparire i messaggi di chi digita
			$('.Messages_list').append('<div class="msg user"><span class="avtr"><figure style="background-image: url(https://img.freepik.com/free-vector/cute-robot-cartoon-vector-icon-illustration-techology-robot-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1474.jpg?w=740)"></figure></span><span class="responsText">' + mainval + '</span></div>');
		};
		function appendMsg(msg) {//funzione che fa apparire i messaggi del bot
			$('.Messages_list').append('<div class="msg"><span class="avtr"><figure style="background-image: url(https://img.freepik.com/free-vector/cute-robot-cartoon-vector-icon-illustration-techology-robot-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-1474.jpg?w=740)"></figure></span><span class="responsText">' + msg + '</span></div>');
			$("[name='msg']").val("");
		};

		//QUI c'è tutta la logica del bot
		userMsg(mainval);
		if( val.indexOf("salve") > -1 || val.indexOf("ciao") > -1|| val.indexOf("help") > -1|| val.indexOf("aiuto") > -1) {
				appendMsg('Credo di averti già salutato ;-)');
			
		}
		//da qui iniziano le domande da inserire e tutte le risposte da costruire
		
		 else {
			var requestOptions = {
				method: 'GET',
				redirect: 'follow'
			};
		  var endpoint="http://127.0.0.1:5000/students/?template=1&text="+val
		  fetch(endpoint, requestOptions)
			.then(response => response.text())
			.then(result => appendMsg(result))
			.catch(error => console.log('error', error));

			//appendMsg(result);

		} 

		function saybye() {
			if (nowhoue <= 10) {
				appendMsg(" buona giornata! :)");
			} else if (nowhoue >= 11 || nowhoue <= 20) {
				appendMsg(" ciao!");
			} else {
				appendMsg(" a presto!");
			}
		}

		var lastMsg = $('.Messages_list').find('.msg').last().offset().top;
		$('.Messages').animate({scrollTop: lastMsg}, 'slow');
	});
	/* Chatboat Code */
})