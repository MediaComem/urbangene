This is the code repository for the URBANGENE project, see http://urbangene.epfl.ch. For now, the code source is about a crowdsourcing web application built in partnership between HEIG-VD and EPFL. It is the first piece of software for a PPGIS platform dedicated to urban biodiversity. 

Crowdsourcing campaigns roadmap:
- March 21th, 2014: it is planned a first campaign using the application during spring 2014, so as to build an inventory of ponds biodiversity in the surounding region of Geneva, Switzerland.
- other campaign coming soon ...

## Requirements ##

- PHP 5.5.3
- PostgreSQL 9.3.1
- PostGIS 2.1.1

## Installation ##

The two following files need to be modified in order to reference the correct locations,

- /www/js/config.js
- /conf/conf.php

The credentials to connect your database need to be updated in the connection file.

- /conf/Connection.php
