var offset = 0;
var limit = 10;

var dispatcher = "./dispatcher.php"

$(document).ready(function() {
	//add content to database if new content 
	$.get('../scriptFacebook.php', function(data) {
    });
    
    //get content from database for quick display
	$.getJSON(dispatcher, {"controller":"post",
						"action":"getLatestPosts",
						"offset": offset,
						"limit": limit},
	function(data){
		//vider le contenu de la page
		$('#feedContainer').empty()
		$.each(data , function(key, post){
			displayPost(key, post)
		});
	});
	
	//boutton
	$('#bPrevious').click(function () {bPrevious()});
	$('#bNext').click(function () {bNext()});
});

function bPrevious(){
	if(offset >= limit){
		offset = offset - 10;
		$.getJSON(dispatcher, {"controller":"post",
						"action":"getLatestPosts",
						"offset": offset,
						"limit": limit},
		function(data){
			//vider le contenu de la page
			$('#feedContainer').empty()
			$.each(data , function(key, post){
				displayPost(key, post)
			});
			window.scrollTo(0, 0);
		});
	}
}

function bNext(){
	$.getJSON(dispatcher, {"controller":"post",
						"action":"getPostCount"},
	function(postCount){
		if(offset < (postCount- limit)){
			offset = offset + 10;
			$.getJSON(dispatcher, {"controller":"post",
						"action":"getLatestPosts",
						"offset": offset,
						"limit": limit},
			function(data){
				//vider le contenu de la page
				$('#feedContainer').empty()
				$.each(data , function(key, post){
					displayPost(key, post)
				});
				window.scrollTo(0, 0);
			});
		}

	});
	}

function displayPost(key, post){

	var authorData = getAuthor(post);
	var service = getService(post.service);	
	
	var imageLink = authorData.imageLink;
	var userName = authorData.userName;
	
	
	var link = post.link;
	var picture = post.picture;
	var message = post.message;
	
	var feedContainer = $('<div />');
	var post = $('<div />');
	var user = $('<div />');
	var profilPhoto = $('<img />');
	var nameP = $('<p />');
	var postContent = $('<div />');
	var arrow = $('<div />');
	var socialLink = $('<div />')
	var socialLogo = $('<div />');
	var postText = $('<span />');
	var paraImg = $('<p />');
	var linkImg = $('<a />');
	var image = $('<img />');
	
	post.addClass('post');
	user.addClass('user');
	
	profilPhoto.attr({
		src: imageLink,
		alt: 'Photo profil ' + userName,
		height: 100,
		width: 100
	});
	nameP.html(userName);
	postContent.addClass('postContent border' + service);
	arrow.addClass('arrow a' + service);
	socialLink.attr('href','test')
	socialLogo.addClass('socialLogo logo' + service);
	postText.html(message);
	linkImg.attr('href', link);
	image.attr({
		"src": picture,
		"alt": link
	});
	
	paraImg.append(linkImg);
	linkImg.append(image);
	postContent.append(arrow).append(socialLogo).append(postText).append(paraImg);
	
	user.append(profilPhoto).append(nameP);
	
	post.append(user).append(postContent).appendTo($('#feedContainer'));
	
}

function getAuthor(post){
	var userName;
	var imageLink;
	var socialLink;
	 
	switch (post.authorId) {
	    case '1':
			imageLink = 'img/avatar/perreira.png';
			userName = 'João Perreira';
			break;
		case '2':
			imageLink = 'img/avatar/rochat.png';
			userName = 'Jonathan Rochat';
			break;
		case '3':
			imageLink = 'img/avatar/snoussi.png';
			userName = 'Aïcha Snoussi';
			break;
		case '4':
			imageLink = 'img/avatar/chang.png';
			userName = 'Ben Chang';
			break;
	
	}
	
	return {"userName": userName, "imageLink": imageLink};
}

function getService(service){
	var service;
	switch (service) {
	    case 'facebook':
			service = 'Facebook';
			break;
		case 'instagram':
			service = 'Insta';
			break;
		case 'tumblr':
			service = 'Tumblr';
			break;
	
	}
	return service;
}
