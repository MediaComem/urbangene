/*
Auteur: Léo Taillard
*/

$(document).ready(function() {

//	console.log(localStorage['videoVu']);
//	
//	if(localStorage['videoVu'] == "true"){
//		$('video#main-video').attr('autoplay', '');
//		$('video#main-video').removeAttribute('autoplay');
//		$('video#main-video').attr('autoplay', 'false');
//	}
//	
	//function se déclenchant à la fin de la vidéo	
//	$('video#main-video').bind('ended',function(){
//		localStorage['videoVu'] = "true";
//	});
	setHeight();
	$( window ).konami({  
	      cheat: function() {
	          alert( 'Yeah!' );
	      }
	  });
	  
	  
	  $("#up-arrow").click(function() {
		  		$("#personnages").slideToggle("slow",function() {
		  		$("#up-arrow img").toggleClass('rotate');
		  	});
	  });
	  
	  
	$(".chapitres li").click(function() {
		var popcorn = Popcorn( "#container-video video" );
		
		var time = $(this).attr('data-start');
//		var index = $(".chapitres li").index(this);
		
		popcorn.currentTime(time).play();
		
	});
});

function setHeight(){
	var heightWindow = $(window).height();
	var heightMenu = $("#main-nav").height();
	var heightFooter = $("#footer").height();
	
	
	
	var diff = heightWindow - heightMenu - heightMenu;
	
//	$("#main-page").css('min-height', diff);
	$("#house").css('min-height', diff);
	$("#form").css('min-height', diff);
	$("#map").css('min-height', diff);
	
//	$("#content").css('min-height', diff);
	
}
