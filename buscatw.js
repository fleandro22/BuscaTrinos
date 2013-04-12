
var ult_id = "";
var opcion = "";

$$(document).ready(function(event) {

	var sel="";
	$$('.arroa').style('color', '#2A95D3');

	//Btnes Footer
	$$("section#main footer a:nth-child(1)").tap(function(){

		$$('.arroa').style('color', '#2A95D3');
		$$("section#main footer a:nth-child(2)").toggleClass('current');
		$$('.hast').style('color', '#464646');
		$$(this).toggleClass('current');
    });

	$$("section#main footer a:nth-child(2)").tap(function(){

		opcion = '%23';
		$$('.hast').style('color', '#2A95D3');
		$$("section#main footer a:nth-child(1)").toggleClass('current');
		$$('.arroa').style('color', '#464646');
		$$(this).toggleClass('current');
    });




	var pull_example = new Lungo.Element.Pull('#container', {
		    onPull: "Pull down to refresh",
		    onRelease: "Release to get new data",
		    onRefresh: "Refreshing...",
		    callback: function() {
		    	buscartwitter();
		        pull_example.hide();
		    }
		});

	$$("#atras").tap(function(){
		$$("#txt_buscar").val("");
		Lungo.Router.back();
		$$('.arroa').style('color', '#2A95D3');
		$$("section#main footer a:nth-child(2)").removeClass('current');
		$$("section#main footer a:nth-child(1)").addClass('current');
		$$('.hast').style('color', '#464646');
		$$(this).toggleClass('current');
		opcion = "";

	});

	$$("#btn_buscar").tap(function(){
		buscartwitter();

	});


	function buscartwitter(){

		 var usuario = $$("#txt_buscar").val();
		if(!usuario || usuario.length === 0){

            Lungo.Notification.alert('Por favor digite el usuario', '', 'info', 3);

        }else{

	        var success = false;
		    Lungo.Notification.loading();
		    //var url = 'http://api.twitter.com/1/statuses/user_timeline/'+usuario+'.json';
			var url = 'http://search.twitter.com/search.json';




		    var data = {
		      	q: opcion+usuario,
		      	count: 1,
		      	include_rts:1,
		        callback:"?"
		    };

		    Lungo.Service.json(url, data, function(response) {


				var html_tw = '';
				html_tw +='<ul id="list_tw">';
				html_tw +='	<li  class="light center"';
				html_tw +='			<strong >Arrastre hacia abajo para actualizar</strong>';
				html_tw +='			<small></small>';
				html_tw +='	</li>';



		        Lungo.Notification.hide();
		        success = true;
		     	data2 = response.length;
		     	contli = 0;

		       // $$.each(response,function(i){

  				$$.each(response.results, function() {

  					var text = this.text;
		        	contli++;

		            Lungo.Notification.hide();

	 				if(text !== undefined) {

	 					var tiempo     ="";
						var date_tweet = new Date(this.created_at);
						var date_now   = new Date();
						segundos       = (date_now - date_tweet) / 1000;
						minutos        = segundos /60;
						horas          = minutos / 60;
						seg            = Math.round (segundos);
						min            = Math.round (minutos);
						horas          = Math.round (horas);
						dias           = horas / 24;
						dias           = Math.round (dias);

						if(seg<=60){
							tiempo = seg+" Seg";

						}else if(min<=60){

							tiempo = min+" Min";
						}else if (horas<=12){

							tiempo = horas+" H"
						}else{

							mes =  date_tweet.getMonth()+1;
							tiempo =  date_tweet.getDate() + '/' + mes+ '/' + date_tweet.getFullYear();

						}



						var nuevotext =  text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>')
						.replace(/(^|\s)#(\w+)/g,'$1<a href="http://search.twitter.com/search?q=%23$2">#$2</a>')
						.replace(/(^|\s)@(\w+)/g,'$1<a href="http://twitter.com/$2">@$2</a>');

 					 	html_tw +='	<li id="litw'+contli+'" data-image="'+this.profile_image_url+'"><img src="'+this.profile_image_url+'" class="icon ">';
						//html_tw +='			<div class="right bubble blue">'+tiempo+'</div>';
						html_tw +='			<div class="right bubble blue">'+tiempo+'</div>';
						//html_tw +='			<strong>'+elem[0]+cadenahttp+'</strong>';
						html_tw +='			<strong>'+nuevotext+'</strong>';
						html_tw +='			<small>'+this.from_user +'</small>';
						html_tw +='	</li>';



					}

		            /*if(response[i].text !== undefined){

		            	//ult_id = response[i]['id'];
		            	var text = response[i].text;
		            	var tiempo     ="";
						var date_tweet = new Date(response[i]['created_at']);
						var date_now   = new Date();
						segundos       = (date_now - date_tweet) / 1000;
						minutos        = segundos /60;
						horas          = minutos / 60;
						seg            = Math.round (segundos);
						min            = Math.round (minutos);
						horas          = Math.round (horas);
						dias           = horas / 24;
						dias           = Math.round (dias);

						if(seg<=60){
							tiempo = seg+" Seg";

						}else if(min<=60){

							tiempo = min+" Min";
						}else if (horas<=12){

							tiempo = horas+" H"
						}else{

							mes =  date_tweet.getMonth()+1;
							tiempo =  date_tweet.getDate() + '/' + mes+ '/' + date_tweet.getFullYear();

						}


						var elem = text.split('http');


						cadenahttp = elem[1];
						if(cadenahttp!=undefined){

							cadenahttp = "<a href='http"+elem[1]+"' target='_blank'>http"+elem[1]+"</a>";

						}else{

							cadenahttp = "";
						}


			          	html_tw +='	<li id="litw'+contli+'" data-image="'+response[0]["user"]["profile_image_url"]+'"><img src="'+response[0]["user"]["profile_image_url"]+'" class="icon ">';
						html_tw +='			<div class="right bubble blue">'+tiempo+'</div>';
						html_tw +='			<strong>'+elem[0]+cadenahttp+'</strong>';
						html_tw +='			<small>'+response[0]["user"]["name"]+'</small>';
						html_tw +='	</li>';


			        }else{

			        	html_tw +='	<li>';
						html_tw +='			<strong>No hay informacion para mostrar</strong>';
						html_tw +='	</li>';
			        }*/


		        });

		        html_tw +=' </ul>';



		        Lungo.Router.section("#buscartw");
				$$("#ultimo_tweet").html(html_tw);
				$$("#mostratw li:nth-child(-n +3)").toggleClass('lipull');

		    });


		    //Establecer tiempo de espera para comprobar si hay errores
		    setTimeout(function() {
		       if (!success) { Lungo.Notification.error('Error al buscar Twitters', 'Verifique e intente nuevamente!', 'warning', 3);  }
		    },5000);

        }

	}


});//ready

