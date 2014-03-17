/*
 * L.Control.GoogleAutocomplete - search for an address and zoom to it's location
 * https://github.com/rmunglez/leaflet-google-autocomplete
 */

(function($, undefined) {
    L.GoogleAutocomplete = {
        component: null,
    };

    // MSIE needs cors support
    jQuery.support.cors = true;

    L.GoogleAutocomplete.Result = function(x, y, label) {
        this.X = x;
        this.Y = y;
        this.Label = label;
    };

    L.Control.GoogleAutocomplete = L.Control.extend({
        options: {
            position: 'topleft'
        },

        initialize: function(options) {
            this._config = {};
            if (!options) {
                options = {};
            }
            var optionsTmp = {
                'searchLabel': options.searchLabel || 'Recherche lieu, adresse, commune, ...',
                'closeToMeLabel': options.closeToMeLabel || 'Proche de moi',
                'notFoundMessage': options.notFoundMessage || 'Pas trouvé',
                'zoomLevel': options.zoomLevel || 16
            }
            L.Util.extend(this.options, optionsTmp);
            /*$.ajax({
            url: "https://maps.googleapis.com/maps/api/js?v=3&callback=onLoadGoogleApiCallback&sensor=false&libraries=places",
            dataType: "script"
        });*/
        },

        onAdd: function(map) {
            var $controlContainer = $(map._controlContainer);

            if ($controlContainer.children('.leaflet-top.leaflet-center').length == 0) {
                $controlContainer.append('<div class="leaflet-top leaflet-right"></div>');
                map._controlCorners.topcenter = $controlContainer.children('.leaflet-top.leaflet-right').first()[0];
            }

            this._map = map;
            this._container = L.DomUtil.create('div', 'leaflet-control-googleautocomplete');

            var searchwrapper = document.createElement('div');
            searchwrapper.className = 'leaflet-control-googleautocomplete-wrapper';

            var searchbox = document.createElement('input');
            searchbox.id = 'leaflet-control-googleautocomplete-qry';
            searchbox.type = 'text';
            searchbox.placeholder = "No need to fill this field";
            console.log(searchbox);
            this._searchbox = searchbox;

            /*
        var closetomebox = document.createElement('div');
        closetomebox.id = 'leaflet-control-googleautocomplete-closetome';
        closetomebox.className = 'leaflet-control-googleautocomplete-closetome';
        this._closetomebox = closetomebox;
*/

            $(searchwrapper).append(this._searchbox);
            $(this._container).append(searchwrapper);
            // $(this._closetomebox).html("<span>"+this.options.closeToMeLabel+"</span>");

            L.DomEvent.addListener(this._container, 'click', L.DomEvent.stop);
            L.DomEvent.disableClickPropagation(this._container);

            //L.DomEvent.addListener(this._closetomebox, 'click', this._closeToMe, this);
            //L.DomEvent.disableClickPropagation(this._closetomebox);

            // init google autocomplete
            var autocomplete = new google.maps.places.Autocomplete(this._searchbox, {
                // SW                     // NE
                bounds: new google.maps.LatLngBounds(new google.maps.LatLng(45.744526980468436, 5.592041015625), new google.maps.LatLng(46.63152171082673, 7.073822021484375))
            });
            autocomplete.setTypes(['geocode']);
            autocomplete.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng(45.744526980468436, 5.592041015625), new google.maps.LatLng(46.63152171082673, 7.073822021484375)));

            L.GoogleAutocomplete.component = autocomplete;



            var Me = this;
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // Inform the user that the place was not found and return.
                    $('leaflet-control-googleautocomplete-qry').addClass('notfound');
                    return;
                }
                var placeLocation = L.latLng(place.geometry.location.lat(), place.geometry.location.lng());
                if (!maxBounds.contains(placeLocation)) {
                    console.log('Hey! I am not contained in the map');
                    $('<div></div>').html("Ce lieu est trouvé hors de la zone d'étude. Merci d'en rechercher un autre.").dialog({
                        dialogClass: 'simple_alert'
                    });

                    return;
                }
                // If the place has a geometry, then update the map
                if (place.geometry.location) {
                    $('leaflet-control-googleautocomplete-qry').removeClass('notfound');
                    if (place.geometry.viewport) {
                        map.fitBounds([
                            [place.geometry.viewport.getSouthWest().lat(),
                                place.geometry.viewport.getSouthWest().lng()
                            ],
                            [place.geometry.viewport.getNorthEast().lat(),
                                place.geometry.viewport.getNorthEast().lng()
                            ]
                        ]);
                        //map.setZoom(18);
                    } else if (place.geometry.bounds) {
                        map.fitBounds([
                            [place.geometry.bounds.getSouthWest().lat(),
                                place.geometry.bounds.getSouthWest().lng()
                            ],
                            [place.geometry.bounds.getNorthEast().lat(),
                                place.geometry.bounds.getNorthEast().lng()
                            ]
                        ]);
                    } else {
                        map.setView([place.geometry.location.d, place.geometry.location.e], Me.options.zoomLevel);
                    }
                }
            });

            return this._container;
        },

        /*
_closeToMe: function (e) {
        if (navigator.geolocation) {
            var Me = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                //Me._map.panTo([position.coords.latitude, position.coords.longitude]);
                //Me._map.setZoom(Me.options.zoomLevel);
                Me._map.setView([position.coords.latitude, position.coords.longitude],Me.options.zoomLevel);
            });
        }
    },
*/
    });
})(jQuery);