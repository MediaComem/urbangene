DROP TABLE point;
DROP TABLE type;
DROP TABLE autreespece;
DROP TABLE preservation;
DROP TABLE utilisateur;


CREATE TABLE point (
	id serial NOT NULL,
	geom geometry,
	zoom INTEGER,
	date DATE,
	fkey_id_utilisateur INTEGER,
	fkey_id_autreespece INTEGER,
	PRIMARY KEY(id)
);
CREATE TABLE type (
	nom VARCHAR(35) NOT NULL,
	id_point INTEGER,
	PRIMARY KEY(nom, id_point)
);
CREATE TABLE autreespece(
	id serial NOT NULL,
	nom VARCHAR(45),
	source text,
	PRIMARY KEY(id)
);
CREATE TABLE preservation(
	id serial NOT NULL,
	text text,
	id_utilisateur INTEGER,
	PRIMARY KEY(id)
);
CREATE TABLE utilisateur(
	id serial NOT NULL,
	pseudo VARCHAR(45),
	typelocation VARCHAR(50),
	mail VARCHAR(45),
	autorisation BOOLEAN,
	presence VARCHAR(2),
	distance VARCHAR(2),
	qualitevie INTEGER,
	sante INTEGER,
	qualite INTEGER,
	questionsup BOOLEAN,
	PRIMARY KEY(id)
);
