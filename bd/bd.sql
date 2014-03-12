CREATE TABLE utilisateur(
  id serial NOT NULL,
  login text unique,
  pass text,
  CONSTRAINT utilisateur_pkey PRIMARY KEY (id)
);

CREATE TABLE type_point(
  nom text unique NOT NULL,
  url_icon text unique NOT NULL,
  CONSTRAINT type_point_pkey PRIMARY KEY (nom)
);


CREATE TABLE point(
  id serial NOT NULL,
  titre text,
  commentaire text,
  url_vignette text,
  CONSTRAINT points_pkey PRIMARY KEY (id),
  fk_utilisateur_id Integer REFERENCES utilisateur (id),
  fk_type_point_nom text REFERENCES type_point (nom)
);

SELECT AddGeometryColumn( 'point', 'geom', 4326, 'POINT', 2 );


INSERT INTO type_point (nom, url_icon) VALUES ('like', 'like.png');
INSERT INTO type_point (nom, url_icon) VALUES ('maison', 'maison.png');
INSERT INTO type_point (nom, url_icon) VALUES ('naissance', 'naissance.png');

INSERT INTO type_point (nom, url_icon) VALUES ('likeColoc', 'likeColoc.png');
INSERT INTO type_point (nom, url_icon) VALUES ('likeInterview', 'likeInterview.png');

INSERT INTO type_point (nom, url_icon) VALUES ('maisonColoc', 'maisonColoc.png');
INSERT INTO type_point (nom, url_icon) VALUES ('maisonInterview', 'maisonInterview.png');

INSERT INTO type_point (nom, url_icon) VALUES ('naissanceColoc', 'naissanceColoc.png');
INSERT INTO type_point (nom, url_icon) VALUES ('naissanceInterview', 'naissanceInterview.png');

INSERT INTO utilisateur (login, pass) VALUES ('user_test', 'pass');




/* INSERT POINT COLOC*/

INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Les racines d''a côté', 'Le bâtiment avec la coloc et les voisins', 'null', 1, 'maisonColoc', GeometryFromText('POINT(6.6474202 46.7814233)', 4326));



INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Aïcha Snoussi', 'Mon food gadget store! c’est à Manor que j’achète tous mes petits plats et que je trouve pleins d’idées', 'null', 1, 'likeColoc', GeometryFromText('POINT(6.6387998 46.7798301)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Aïcha Snoussi', 'Je suis né dans mon beau pays d’Yverdon bien que je ne renie pas mes valeurs marocaines', 'null', 1, 'naissanceColoc', GeometryFromText('POINT(6.6471796 46.7709494)', 4326));



INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Ben Chang', 'Je suis en dernière année d''acuponcture chinoise traditionnelle au centre XIYANG à Morges. J’adore cet endroit.', 'null', 1, 'likeColoc', GeometryFromText('POINT(6.5053400 46.5155700)', 4326));



INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Ben Chang', 'Je suis né à Yverdon-les-Bains dans le canton de vaud. C''est une ville fort plaisante dont j''ai une attache particulière.', 'null', 1, 'naissanceColoc', GeometryFromText('POINT(6.6471796 46.7709494)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Jonathan Rochat', 'J''aime faire du ski quand j''ai le temps. Surtout le hors-piste c’est mon kiff.', 'null', 1, 'likeColoc', GeometryFromText('POINT(7.2008107 46.3097725)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Jonathan Rochat', 'J''ai 24 ans et je viens d''Echallens. Je suis agriculteur et suis les cours à l''école d''agriculture de Grange-Verney et je suis né à l’hôpital st-loup à Pompaples', 'null', 1, 'naissanceColoc', GeometryFromText('POINT(6.5202314 46.6760821)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('João Perreira', 'Le Garage de la Plaine, le meilleur endroit du monde où mon futur bébé m''attend.', 'null', 1, 'likeColoc', GeometryFromText('POINT(6.6414898 46.7782175)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('João Perreira', 'Let''s Go Fitness ma deuxième maison.', 'null', 1, 'likeColoc', GeometryFromText('POINT(6.6445322 46.7813161)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('João Perreira', 'Bien que je sois né en Suisse. Je suis très fier de mon pays le Portugal et de mes origines du sud et de tout ce qui en découle', 'null', 1, 'naissanceColoc', GeometryFromText('POINT(6.6471796 46.7709494)', 4326));




/* INSERT POINT INTERVIEW*/


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Dorothée', 'Mon pays d''origine et lieu de naissance c’est la Vendée <a href="dorothee.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(-1.4482662 46.6613966)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Mirjam', 'Je suis né en Suisse bien qu’une partie de ma vie soit en Guinée <a href="mirjam.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(7.4446085 46.9479222)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Mirjam', 'La Guinée, mon deuxième pays <a href="mirjam.php">plus d''infos</a>', 'null', 1, 'likeInterview', GeometryFromText('POINT(-9.6966450 9.9455870)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Philipp', 'Mes racines et mes valeurs viennent de l''endroit où je suis né, l''Oberland bernois <a href="philipp.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(8.0546579 47.3349693)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Philipp', 'Le lac de thoune et l''oberland bernois est un des endroit ou je me sens le mieux. <a href="philipp.php">plus d''infos</a>', 'null', 1, 'likeInterview', GeometryFromText('POINT(7.7212158 46.6958354)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Claudette', 'Je suis né en France et j’’y ai vécu tout ma vie <a href="claudette.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(5.5507960 46.6713610)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Alice', 'Bien que je sois né en Hollande une grande partie de mes racines se trouve en suisse. <a href="alice.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(5.7698950 52.3747719)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Alice', 'J''aime les alpes <a href="alice.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(7.0129740 46.3453760 )', 4326));



INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Arnaud', 'Je suis né au pays au Cameroun dans mon village natal Bafou. <a href="arnaud.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(10.1166670 5.4666670)', 4326));



INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Arnaud', 'J''aime voire le bleu du lac Léman et les Alpes. <a href="arnaud.php">plus d''infos</a>', 'null', 1, 'likeInterview', GeometryFromText('POINT(6.5169799 46.4672520)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Anilda', 'Je suis né au Brazil ou je vivais paisiblement avec ma famille jusqu''à ce qu''un accident modifie ma destinée <a href="anilda.php">plus d''infos</a>', 'null', 1, 'naissanceInterview', GeometryFromText('POINT(-51.9252800 -14.2350040)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Anilda', 'Le petit banc de Cuarny et l’arbre sur lequel je peux me ressourcer. <a href="anilda.php">plus d''infos</a>', 'null', 1, 'likeInterview', GeometryFromText('POINT(6.6812639 46.7711850)', 4326));


INSERT INTO point(titre, commentaire, url_vignette, fk_utilisateur_id, fk_type_point_nom, geom)

VALUES ('Anilda', 'Le pont d''Yvonand avec sa petite chute d’eau énergétique. <a href="anilda.php">plus d''infos</a>', 'null', 1, 'likeInterview', GeometryFromText('POINT(6.6812639 46.7711850)', 4326));













