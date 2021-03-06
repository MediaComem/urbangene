<!DOCTYPE html>
<html lang="fr">
    <head>
	<title>URBANGENE</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width">

	<meta property="og:title" content="URBANGENE"/>
	<meta property="og:url" content="https://urbangene.heig-vd.ch/"/>
  	<meta property="og:image" content="https://urbangene.heig-vd.ch/img/URBANGENE_Final.png"/>
  	<meta property="og:site_name" content="Projet URBANGENE"/>
  	<meta property="og:description" content="C'est le printemps, contribuez à notre inventaire !"/>


	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/map.css" />
	<link rel="stylesheet" href="css/leaflet.search.css" />
	<link rel="stylesheet" href="css/leaflet.css" />
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<link media="all" type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans:400,700">

    <link rel="stylesheet" href="css/MarkerCluster.css" />
	<link rel="stylesheet" href="css/MarkerCluster.Default.css" />
	<link rel="stylesheet" href="css/leaflet-google-autocomplete.css" />
	<link rel="stylesheet" href="css/jquery.fileupload.css">

	<link rel="stylesheet" href="css/L.Control.Zoomslider.css" />

	<link rel="stylesheet" href="css/bootstrap.css">
	<script type="text/javascript">
	 var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	 if (width < 700) alert("L'application n'est pas encore fonctionnelle sur les petits écrans...");
	</script>

    <script src="js/config.js" type="text/javascript"></script>
	<script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js" type="text/javascript"></script>
    <script src="js/jquery.touch-punch.min.js" type="text/javascript"></script>
    <link rel="shortcut icon" href="/favicon.png">
<!--    <link rel="apple-touch-icon" href="ico/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="ico/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="ico/apple-touch-icon-114x114.png"> -->

	<!--[if lt IE 9]>
	  <script src="https://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    </head>
    <body>
    	<div id="sidebar" class="full">
    		<div id="hideShowBar"><div id="hideShowArrow"></div></div>
    		<div id="sideContent">
    			<div id="sideContainer">
	    			<div id="introduction">
	    				<div class="contentCenter">
	    					<div class="narrowCenter">
	    						<header>
	    							<h1>Projet URBANGENE</h1>
	    							<p class="facebook-share"><a href="//www.facebook.com/urbangene" target="_blank">facebook</a></p>
	    						</header>
	    						<ul class="partners">
	    							<li class="epfl"><a href="http://www.epfl.ch" title="">Ecole polytechnique fédérale de Lausanne</a></li>
	    							<li class="heig"><a href="http://www.heig-vd.ch/formations/bachelor/ingenierie-des-medias" title="Haute Ecole d'Ingénierie et de Gestion du Canton de Vaud">Haute Ecole d'Ingénierie et de Gestion du Canton de Vaud</a></li>
	    						</ul>
		    					<div>
			    					<div class="intro">
					    				<p>Le projet <strong>URBANGENE</strong> est conduit par l’EPFL et le Grand Genève. Son but est d’estimer les effets de l’urbanisation sur la biodiversité dans l’agglomération genevoise.</p>
										<p>Des informations complémentaires sur le projet peuvent être trouvées sur <a href="http://urbangene.epfl.ch">le site du projet URBANGENE de l'EPFL</a>.</p>
										<div class="facebook-buttons">
	    									<div class="fb-like" data-href="https://urbangene.heig-vd.ch" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
	    								</div>
			    					</div>
			    					<div class="intro">
										<p>Vous pouvez contribuer à notre inventaire !</p>
										<p>Poursuivez en indiquant sur la carte (en Suisse ou en France) les emplacements où vous avez vu une mare...</p>

										<div id="groupeNextButton"><p>C'est parti !</p><div class="nextButton"><div id="hideArrow"></div></div></div>
			    					</div>
		    					</div>
	    					</div>
						</div>
	    			</div>
	    			<div id="logoBottom"><a href="http://www.grand-geneve.org/"><img src="img/logo/gg.png" alt="Grand genève"></a></div>


    			</div>
	    		<div id="addPoint">
	    			<div id="markerSection">
	    				<div id="notification">
							<p>Votre mare a été ajoutée</p>
						</div>
	    				<div id="buttons">
					    	<button id="delete">annuler</button>
				    	</div>
				    	<span id="dndtext" title="Glisser l'icône sur la carte">Ajouter une mare</span>
				    	<span class="poi-type">
				    		<img class="drag" type="point" src="css/img/icones/marker_add.png" title="Glisser l'icône sur la carte" alt="Glisser l'icône sur la carte" />
				    		<img class="dragDummy" type="point" src="css/img/icones/marker_add.png" title="Glisser l'icône sur la carte" alt="Glisser l'icône sur la carte" />
				    	</span>
				    	<span id="smallText">Glisser l'icône sur la carte</span>
		    		</div>
		    		<div id="dataForm">
		    			<div id="pointData">
				    		<div id="imageRadio">
				    			<label>Cliquez sur la ou les espèce(s) que vous avez vue(s) près de cette mare.</label>
				    			<label class="imageType" for="rd1">
									<input id="rd1" type="checkbox" name="imageType" value="Crapaud commun" />
									<img src="img/type/animal1off.png" class="imgChoice" alt="images-ronde_2" width="150" height="150" infobox="">
								</label>

								<label class="imageType" for="rd2">
									<input id="rd2" type="checkbox" name="imageType" value="Triton alpestre"/>
									<img src="img/type/animal2off.png" class="imgChoice" alt="images-ronde_3" width="150" height="150" infobox="">
								</label>

								<label class="imageType" for="rd3">
									<input id="rd3" type="checkbox" name="imageType" value="Grenouille rousse" />
									<img src="img/type/animal3off.png" class="imgChoice" alt="images-ronde_1" width="150" height="150" infobox="">
								</label>
				    		</div>
				    		<div id="prop">
				    			<label>Avez-vous identifié une autre espèce ?</label>
				    			<label class="yesNo" for="autreOui">
					    			<input id="autreOui" type="radio" name="prop" value="true">Oui
				    			</label>
								<label class="yesNo" for="autreNon">
									<input id="autreNon" type="radio" name="prop" value="false">Non
								</label>
				    		</div>
				    		<div id="otherSpecies">
								<label>Si vous connaissez le nom de cette espèce, merci de l’indiquer dans le champ ci-après :</label>
					    		<input type="text" name="speciesName" placeholder="Nom de l'espèce">
					    		<label>Si vous avez une photo de cette espèce, vous avez la possibilité de la télécharger ci-dessous :</label>
					    		<!-- The fileinput-button span is used to style the file input field as button -->
							    <span class="btn btn-success fileinput-button">
							        <i class="glyphicon glyphicon-plus"></i>
							        <span>Ajouter une photo</span>
							        <!-- The file input field used as target for the file upload widget -->
							        <input id="fileupload" type="file" name="files[]" >
							    </span>
							    <!-- The global progress bar -->
							    <div id="progress" class="progress">
							        <div class="progress-bar progress-bar-success"><span id="progressDone">Fichier téléchargé</div></div>
				    		</div>
					    	<div id="ownership">
						    	<label>La mare indiquée est :</label>
						    	<select id="ownershipSelect">
						    		<option value="x">choisir</option>
						    		<option value="a">Sur ma propriété</option>
						    		<option value="b">Sur le domaine public</option>
						    		<option value="c">Sur la propriété privée d’un tiers</option>
						    		<option value="d">Je ne sais pas</option>
						    	</select>
					    	</div>
							<div id="contact">
								<label>Comme la mare figure sur votre propriété, autorisez-vous l’EPFL à vous contacter afin de prendre rendez-vous dans le but d’échantillonner ?</label>
								<label class="yesNo" for="contactOui">
					    			<input id="contactOui" type="radio" name="contact" value="true">Oui
				    			</label>
								<label class="yesNo" for="contactNon">
									<input id="contactNon" type="radio" name="contact" value="false">Non
								</label>
						    	<input id="contactEmail" class="email" type="text" name="email" placeholder="E-mail">
					    	</div>
					    	<div id="pseudo">
					    		<hr />
				    			<label class="pseudo">Nom:</label>
							    <input class="pseudo" type="text" name="pseudo" placeholder="(optionnel)">
							    <span class="smallText">Signez votre contribution avec un nom ou un pseudonyme</span>
			    			</div>
		    			</div>
		    			<div id="questions">
		    				<hr />
							<label>Voulez-vous encore nous aider en répondant à six brèves questions ?</label>
							<label class="yesNo" for="questionsTTOui">
				    			<input id="questionsTTOui" type="radio" name="questionsTT" value="true">Oui
			    			</label>
							<label class="yesNo" for="questionsTTNon">
								<input id="questionsTTNon" type="radio" name="questionsTT" value="false">Non
							</label>
		    			</div>
		    			<div id="personalData">
		    				<div id="biodEtVous">La biodiversité et vous ...</div>
					    	<div id="distance">
						    	<label>A quelle distance approximative de votre habitation se trouve un espace naturel (un parc public, un jardin, etc.) ?</label>
								<label class="leftAlign"><input type="radio" name="distance" value="a">Directement autour de ma maison</label>
								<label class="leftAlign"><input type="radio" name="distance" value="b">A quelques dizaines de mètres</label>
								<label class="leftAlign"><input type="radio" name="distance" value="c">A quelques centaines de mètres</label>
								<label class="leftAlign"><input type="radio" name="distance" value="d">A plus d’un kilomètre</label>
							</div>
							<div id="presence">
								<label>Combien de temps passez-vous dans un espace naturel ?</label>
								<label class="leftAlign"><input type="radio" name="presence" value="a">Plusieurs heures par jour</label>
								<label class="leftAlign"><input type="radio" name="presence" value="b">Environ une heure chaque jour</label>
								<label class="leftAlign"><input type="radio" name="presence" value="c">Quelques heures par semaine</label>
								<label class="leftAlign"><input type="radio" name="presence" value="d">Une heure par semaine</label>
								<label class="leftAlign"><input type="radio" name="presence" value="e">Moins d’une heure par semaine</label>
								<label class="leftAlign"><input type="radio" name="presence" value="f">Jamais</label>
							</div>
					    	<div id="biodiversity">
								<label>A quoi vous fait penser le terme «biodiversité» ? (cochez la ou les réponses qui vous conviennent le mieux)</label>
								<label class="leftAlign" for="ba">
					    			<input id="ba" type="checkbox" name="biodiversity" value="A la grande variété des plantes et des animaux sur la terre">A la grande variété des plantes et des animaux sur la terre
				    			</label>
								<label class="leftAlign" for="bb">
									<input id="bb" type="checkbox" name="biodiversity" value="A la diversité de produits naturels sans intervention humaine">A la diversité de produits naturels sans intervention humaine
								</label>
								<label class="leftAlign" for="bc">
					    			<input id="bc" type="checkbox" name="biodiversity" value="A la diversité des légumes et des fruits de la région">A la diversité des légumes et des fruits de la région
				    			</label>
								<label class="leftAlign" for="bd">
									<input id="bd" type="checkbox" name="biodiversity" value="A la présence de différents espaces naturels (champs, jardins, parcs, etc.)">A la présence de différents espaces naturels (champs, jardins, parcs, etc.)
								</label>
								<label class="leftAlign" for="be">
					    			<input id="be" type="checkbox" name="biodiversity" value="Au nombre important d’espèces vivantes autour de chez moi">Au nombre important d’espèces vivantes autour de chez moi
				    			</label>
				    			<label class="leftAlign" for="bf">
					    			<input id="bf" type="checkbox" name="biodiversity" value="A la varitété des individus de chaque espèce vivante">A la variété des individus de chaque espèce vivante
				    			</label>
								<label id="bxlabel" class="leftAlign" for="">
									<input id="bx" type="checkbox" name="biodiversity" value=""><input id="otherBio" type="text" name="q6" placeholder="Autre">
								</label>
					    	</div>
					    	<div id="quality">
						    	<label>Diriez-vous que la biodiversité du quartier où vous habitez est: </label>
					    		<div id="sliderQuality"></div>
					    		<span class="faible">faible</span><span class="forte">forte</span>
					    	</div>
						    <div id="life">
								<label>Comment évaluez-vous votre qualité de vie ?</label>
								<div id="sliderLife"></div>
								<span class="faible">mauvaise</span><span class="forte">excellente</span>
						    </div>
							<div id="health">
								<label>et votre état de santé ?</label>
								<div id="sliderHealth"></div>
								<span class="faible">mauvais</span><span class="forte">excellent</span>
					    	</div>
					    	<div id="extra">
						    	<label>Vous pouvez m’adresser un questionnaire complet sur la perception de la biodiversité en milieu urbain</label>
								<label class="yesNo" for="extraOui">
					    			<input id="extraOui" type="radio" name="extra" value="true">Oui
				    			</label>
								<label class="yesNo" for="extraNon">
									<input id="extraNon" type="radio" name="extra" value="false">Non
								</label>
								<input id="contactEmail2" class="email" type="text" name="email" placeholder="E-mail">
					    	</div>

		    			</div>
		    			<hr class="hr2" />
				    	<button id="accept">Enregistrer</button>
			    	</div>
    			</div>
    		</div>
    	</div>
		<div id="map">
		</div>

		<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=752633244755467";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-48859792-1', 'heig-vd.ch');
		  ga('send', 'pageview');
		</script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.1/leaflet.js"></script>
		<script src="js/leaflet.google.js"></script>
		<!--[if lte IE 8]><link rel="stylesheet" href="css/MarkerCluster.Default.ie.css" /><![endif]-->
		<script src="js/leaflet.markercluster-src.js"></script>
		<script src="js/leaflet-google-autocomplete.js"></script>
		<script src="js/jquery-ui.dnd.js"></script>
		<script src="js/jquery.simpletip-1.3.1.min.js"></script>

		<!-- slider -->
		<script src="js/L.Control.Zoomslider.js" ></script>

		<script src="js/jquery.knob.js"></script>

		<!-- image upload -->
		<script src="js/jquery.ui.widget.js"></script>
		<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
		<script src="js/jquery.iframe-transport.js"></script>
		<!-- The basic File Upload plugin -->
		<script src="js/jquery.fileupload.js"></script>
		<!-- Bootstrap JS is not required, but included for the responsive demo navigation -->
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>



		<!-- Our main JS file -->
		<script src="js/script.js"></script>

		<script src="js/map.js" type="text/javascript"></script>
	</body>
</html>
