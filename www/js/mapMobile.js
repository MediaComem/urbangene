map = null;
var baseLayer = null;
var arrayType = ['naissance', 'maison', 'like', 'likeColoc', 'maisonColoc', 'naissanceColoc',
'likeInterview', 'maisonInterview', 'naissanceInterview'];
var markers = new L.MarkerClusterGroup();

$(document).ready(function() {

    setHeight();
    
    map = L.map('mapMobile', {
        center: new L.LatLng(46.79, 6.65),
        zoom: 12
    });
    
    baseLayer = L.tileLayer('http://{s}.tile.cloudmade.com/b9941117432e4e63bb0e5a410de8e6eb/93138/256/{z}/{x}/{y}.png', {
        // Ajoute un copyright custom
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
   
    // ensuite on creer la map (asynchrone)
    $.when(
        getPoints()
    ).then(addControl)
    
});



function getPoints(){
    // pour chaque type de point
    $(arrayType).each(function(index, type) {
        // prend les points qui  correspond au type, ensuite on créer les layers
            $.getJSON(APP_URL+DISPATCHER, {controller: 'point', action: 'getPointFromType', type: type}, function(data){
                $(data.features).each(function(index, feat) {
                    var output = "<div class='popupMap'><div class='text'><h2>" + feat.properties.titre + "</h2><p>" + feat.properties.comm + "</p></div></div>";
                    var options = {
                        'minWidth': 500
                    };
                    var typePoint = feat.properties.type;
                    var icon = getIcon(typePoint);
                    var actualLat = feat.geometry.coordinates[1];
                    var actualLong = feat.geometry.coordinates[0];

                    var point = L.marker([actualLat, actualLong], {icon: icon}).bindPopup(output, options).addTo(markers);
                });
           })
    });
}

function addControl(){
    map.addLayer(markers);
}

    

function getIcon(typePoint){
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [65, 65],
            popupAnchor: [0, -25]
        }
    });
    var icon = new LeafIcon({iconUrl: 'img/'+typePoint+'.png'});
    return icon;
}

function setHeight() {
    var diff = "100%";
    $("#map").css('height', diff);
}