<!DOCTYPE html>
<html lang="fr">
    <head>
	<title>URBANGENE</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width">

	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/main.css" />
	<link rel="stylesheet" href="css/map.css" />
	<link rel="stylesheet" href="css/leaflet.search.css" />
	<link rel="stylesheet" href="css/leaflet.css" />
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<link media="all" type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans:400,700">

    <link rel="stylesheet" href="css/MarkerCluster.css" />
	<link rel="stylesheet" href="css/MarkerCluster.Default.css" />
	<link rel="stylesheet" href="css/leaflet-google-autocomplete.css" />

    <script src="js/config.js" type="text/javascript"></script>
	<script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js" type="text/javascript"></script>
    <script src="js/jquery.touch-punch.min.js" type="text/javascript"></script>
    <link rel="shortcut icon" href="/favicon.png">
<!--    <link rel="apple-touch-icon" href="ico/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="ico/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="ico/apple-touch-icon-114x114.png"> -->

	<!--[if lt IE 9]>
	  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
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
	    						<h1>Projet URBANGENE</h1>
	    						<ul class="partners">
	    							<li class="epfl"><a href="http://www.epfl.ch" title="">Ecole polytechnique fédérale de Lausanne</a></li>
	    							<li class="heig"><a href="http://www.heig-vd.ch/formations/bachelor/ingenierie-des-medias" title="Haute Ecole d'Ingénierie et de Gestion du Canton de Vaud">Haute Ecole d'Ingénierie et de Gestion du Canton de Vaud</a></li>
	    						</ul>
		    					<div>
			    					<div class="intro">
					    				<p>Le projet <strong>URBANGENE</strong> est conduit par l’EPFL et le Grand Genève. Son but est d’estimer les effets de l’urbanisation sur la biodiversité dans l’agglomération genevoise.</p>
										<p>Des informations complémentaires sur le projet peuvent être trouvées sur <a href="http://urbangene.epfl.ch">le site du projet URBANGENE de l'EPFL</a>.</p>
			    					</div>
			    					<div class="intro">
										<p>Dans ce cadre, nous avons besoin de votre contribution dans le but de dresser un inventaire aussi complet que possible des mares existantes sur le territoire de l'agglomération genevoise, des deux côtés de la frontière. </p>
										<p>Avec l’aide de cet outil cartographique, merci d'indiquer sur la carte le ou les emplacements où vous savez que se trouve une mare.</p>
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
				    	<span class="poi-type">
				    		<img class="drag" type="point" src="css/img/icones/marker_add.png" title="Glisser l'icône sur la carte" alt="Glisser l'icône sur la carte" />
				    		<img class="dragDummy" type="point" src="css/img/icones/marker_add.png" title="Glisser l'icône sur la carte" alt="Glisser l'icône sur la carte" />
				    	</span>
				    	<span id="dndtext" title="Glisser l'icône sur la carte">Ajouter une mare...</span>
				    	<span id="smallText">(glisser l'icône sur la carte)</span>
		    		</div>
		    		<div id="dataForm">
		    			<div id="pointData">
				    		<div id="imageRadio">
				    			<label>Indiquez la ou les photo(s) correspondant à une ou plusieurs espèces que vous avez vue(s) à proximité de cette mare.</label>
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
								<span class="smallText right">Crédit photo: Andreas Meyer</span>
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
					    		<form id="upload" method="post" action="upload.php" enctype="multipart/form-data">
					    			<label>Si vous avez une photo de cette espèce, vous avez la possibilité de l'ajouter ici :</label>
						    		<a>Ajouter une photo</a>
						    		<input type="file" name="upl" placeholder="upload">
						    		<ul></ul>
								</form>
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
						    	<input id="contactEmail" type="text" name="email" placeholder="E-mail">
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
								<input id="contactEmail2" type="text" name="email" placeholder="E-mail">
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
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-48859792-1', 'heig-vd.ch');
		  ga('send', 'pageview');
		</script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
		<script src="http://cdn.leafletjs.com/leaflet-0.7.1/leaflet.js"></script>
		<script src="js/leaflet.google.js"></script>
		<!--[if lte IE 8]><link rel="stylesheet" href="css/MarkerCluster.Default.ie.css" /><![endif]-->
		<script src="js/leaflet.markercluster-src.js"></script>
		<script src="js/leaflet-google-autocomplete.js"></script>
		<script src="js/jquery-ui.dnd.js"></script>
		<script src="js/jquery.simpletip-1.3.1.min.js"></script>

		<script src="js/jquery.knob.js"></script>

		<!-- jQuery File Upload Dependencies -->
		<script src="js/jquery.ui.widget.js"></script>
		<script src="js/jquery.iframe-transport.js"></script>
		<script src="js/jquery.fileupload.js"></script>

		<!-- Our main JS file -->
		<script src="js/script.js"></script>

		<script src="js/map.js" type="text/javascript"></script>
	</body>
</html>
