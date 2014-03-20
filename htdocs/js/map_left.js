//46.374767, 6.481563
//46.110374, 5.824959

var map;
var baseLayer = null;
var arrayType = ['normal'];
var markers = new L.MarkerClusterGroup({
    maxClusterRadius: 35,
    spiderfyDistanceMultiplier: 1.5
});
var marker;
var points;
var isActive = false;
var poiIcon = L.Icon.extend({
    options: {
        iconSize: [40, 49],
        iconAnchor: [20, 49],
        popupAnchor: [0, -61]
    }
});

var msg_success = "votre point a bien été ajouté, merci";
var msg_error = "veuillez remplir tous les champs";
$(window).resize(function() {
    setHeight();
});
$(document).ready(function() {
    //need contact email to hide it here because css leaves a empty gap where it should be
    $("#contactEmail").hide();
    $("#contactEmail2").hide();
    $('.dragDummy').hide();
    $("#delete").attr("disabled", true);
    $("#accept").attr("disabled", true);
    $("#msg").hide();
    setHeight();

    map = L.map('map', {
        center: new L.LatLng(46.31, 6.23),
        zoom: 11,
        maxZoom: 17,
    });

    baseLayer = L.tileLayer('http://{s}.tile.cloudmade.com/b9941117432e4e63bb0e5a410de8e6eb/116155/256/{z}/{x}/{y}.png', {
        // Ajoute un copyright custom
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var ggl = new L.Google('SATELLITE');

    map.addLayer(baseLayer);
    map.addControl(new L.Control.Layers({
        'Carte': baseLayer,
        'Satellite': ggl
    }, {}));

    new L.Control.GoogleAutocomplete().addTo(map);

    // ensuite on creer la map (asynchrone)
    $.when(
        getPoints()
    ).then(addControl)

    //animate drag n drop on hover
    $('.drag').mouseenter(function() {
        $(this).animate({
            "width": "55px",
            "height": "68px",
            "marginLeft": "-27.5px",
            "marginTop": "-68px"
        }, 50)
    }).mouseleave(function() {
        $(this).animate({
            "width": "40px",
            "height": "49px",
            "marginLeft": "-20px",
            "marginTop": "-49px"
        }, 50)
    });

    $("#maison, #naissance, #like").change(function() {
        $("#msg").slideUp(200);
    });
    $("#inputDescription, #inputName").click(function() {
        $("#msg").slideUp(200);
    });

    //navigation between the content of the sidebar
    onClick(".nextButton")
    onClick("#hideShowBar")
    onClick("#accept")
    onClick("#delete")
    $("#sideContent").removeAttr('overflow-y');


    hideShowProp();
    hideShowOwnership();
    hideShowEmail();
    hideShowEmail2();
    hideShowSearch();

    //select checkbox on textfield click, uncheck if empty on click out
    $('#otherBio').focus(function() {
        $('#bf').prop('checked', true);
    }).blur(function() {
        if ($(this).val() == "") {
            $('#bf').prop('checked', false);
        }
    });
});

function hideShowProp() {
    //choice to display other species
    $("input[name='prop']").change(function() {
        var oldScrollTop;
        if ($(this).val() == "true") {
            $("#otherSpecies").slideDown({
                duration: 400,
                easing: 'easeInOutQuad'
            }).fadeTo(400, 1);
            $('#sideContent').animate({
                scrollTop: $("#sideContent").scrollTop() + 146
            }, 500, 'easeInOutQuad');
            oldScrollTop = $("#sideContent").scrollTop();
        } else if ($(this).val() == "false" && $('#otherSpecies').css('display') != 'none') {
            $('#sideContent').delay(200).animate({
                scrollTop: $("#sideContent").scrollTop() - 146
            }, 400, 'easeInOutQuad');
            $("#otherSpecies").fadeTo(200, 0).slideUp({
                duration: 400,
                easing: 'easeInOutQuad'
            });
        }
    });
}

function hideShowOwnership() {
    //display contact if ownership is true
    $("input[name='ownership']").change(function() {
        var oldScrollTop;
        if ($(this).val() == "a") {
            $("#contact").slideDown({
                duration: 400,
                easing: 'easeInOutQuad'
            }).fadeTo(400, 1);
            $('#sideContent').animate({
                scrollTop: $("#sideContent").scrollTop() + 160
            }, 400);
            oldScrollTop = $("#sideContent").scrollTop();
        } else if ($('#contact').css('display') != 'none') {
            $('#sideContent').delay(200).animate({
                scrollTop: $("#sideContent").scrollTop() - 160
            }, 400);
            $("#contact").fadeTo(200, 0).slideUp({
                duration: 400,
                easing: 'easeInOutQuad'
            });
        }
    });
}

function hideShowEmail() {
    //display email field if user is willing to be contacted
    $("#contact input[name='contact']").change(function() {
        if ($(this).val() == "true" && $("#extra input:radio[name='extra']:checked").val() != "true") {
            slideDownMail("contactEmail");
            $('#sideContent').animate({
                scrollTop: $("#sideContent").scrollTop() + 26
            }, 200);
        } else if ($(this).val() == "false" && $("#extra input:radio[name='extra']:checked").val() == "true") {
            slideDownMail("contactEmail2");
            slideUpMail("contactEmail");
        } else if ($("#contactEmail").css('display') != 'none') {
            slideUpMail("contactEmail");
            $('#sideContent').delay(200).animate({
                scrollTop: $("#sideContent").scrollTop() - 26
            }, 200);

        }
    })
}

function hideShowEmail2() {
    //display email field if user is willing to be contacted
    $("#extra input[name='extra']").change(function() {
        if ($(this).val() == "true" && $("#contact input:radio[name='contact']:checked").val() != "true") {
            slideDownMail("contactEmail2");
            $('#sideContent').animate({
                scrollTop: $("#sideContent").scrollTop() + 26
            }, 200);
        } else if ($(this).val() == "false" && $("#contact input:radio[name='contact']:checked").val() == "true") {
            slideDownMail("contactEmail");
            slideUpMail("contactEmail2");
        } else if ($("#contactEmail2").css('display') != 'none') {
            slideUpMail("contactEmail2");
            $('#sideContent').delay(200).animate({
                scrollTop: $("#sideContent").scrollTop() - 26
            }, 200);
        }
    })
}

function slideDownMail(mailId) {
    $("#" + mailId).slideDown({
        duration: 200,
        easing: 'easeInOutQuad'
    }).fadeTo(200, 1)
}

function slideUpMail(mailId) {
    $("#" + mailId).fadeTo(200, 0).slideUp({
        duration: 200,
        easing: 'easeInOutQuad'
    });
}

function hideShowSearch() {
    $(".leaflet-container .leaflet-control-googleautocomplete input").focus(function() {
        $(this).animate({
            width: "300px",
            height: "28px"
        })
        $(this).css({
            backgroundImage: "none"
        })
        $(this).attr("placeholder", "search for address...")

    });
    $(".leaflet-container .leaflet-control-googleautocomplete input").blur(function() {
        if ($(this).val() == "") {
            $(this).animate({
                width: "25px",
                height: "25px"
            })
            $(this).css({
                backgroundImage: "url(./img/leaflet/search-icon.png)"
            })
            $(this).attr("placeholder", "")
        }
    })
}


function onClick(button) {
    $(button).click(function() {

        switch (button) {
            case ".nextButton":
            case "#hideShowBar":

                if ($("#introduction").is(":visible")) {
                    $("#introduction").fadeOut(500);
                    $("#addPoint").delay(500).fadeIn(500);
                    var width;
                    if (isActive == false) {
                        width = 200;
                    } else {
                        width = 400;
                    }
                    setTimeout(function() {
                        setSidebarSize(width);
                    }, 500);

                    $('#hideShowArrow').delay(500).animate({
                        borderLeftColor: "#8f8f8f",
                        borderRightColor: "transparent",
                        borderLeftWidth: "10px",
                        borderRightWidth: "0px"
                    });
                } else {
                    $("#introduction").delay(500).fadeIn(500);
                    $("#addPoint").fadeOut(500);
                    percent = 0.90;
                    add_width = (percent * $('body').width());
                    setSidebarSize(add_width);

                    $('#hideShowArrow').animate({
                        borderLeftColor: "transparent",
                        borderRightColor: "#8f8f8f",
                        borderLeftWidth: "0px",
                        borderRightWidth: "10px"
                    });
                }
                break;
            case "#accept":
                var valid = true;

                //Check if fields are filled and valid
                var imageTypes = new Array();
                if ($("input[name='imageType']:checked").length != false) {
                    $("#imageRadio input:checked").each(function() {
                        imageTypes.push($(this).val());
                    })
                    $("#imageRadio").removeClass("warning");

                } else {
                    $("#imageRadio").addClass("warning");
                    valid = false;
                    //console.log("1: Aucun type selectioné")
                }
                var aeNom, aeSource
                if ($("#prop input:radio[name='prop']").is(':checked')) {
                    if ($("#prop input:radio[name='prop']:checked").val() == "true") {
                        if (!$("input[name='speciesName']").val().length == 0) {
                            aeNom = $("input[name='speciesName']").val();
                            $("#otherSpecies").removeClass("warning");

                        } else {
                            //console.log("2.1: aucun nom donné")
                            $("#otherSpecies").addClass("warning");
                            valid = false;
                        }
                        if (!$("input[name='image']").val().length == 0) {
                            aeSource = $("input[name='image']").val();
                            $("#otherSpecies").removeClass("warning");

                        } else {
                            //console.log("2.2: aucune source donnée")
                            $("#otherSpecies").addClass("warning");
                            valid = false;
                        }
                    }
                } else {
                    //console.log("2: pas de réponse")
                    $("#prop").addClass("warning");
                }

                var ownership, email, prop, contact;
                //if ownership answered
                if ($("#ownership input:radio[name='ownership']").is(':checked')) {
                    ownership = $("#ownership input:radio[name='ownership']:checked").val();
                    $("#ownership").removeClass("warning");
                    //if ownership = a
                    if ($("#ownership input:radio[name='ownership']:checked").val() == "a") {
                        //if contact answered
                        if ($("#contact input:radio[name='contact']").is(':checked')) {
                            contact = $("#contact input:radio[name='contact']").val()
                            //if contact = yes AND the email form is displayed
                            if ($("#contact input:radio[name='contact']:checked").val() == "true" && $("#contactEmail").css('display') != 'none') {
                                if ($("#contact input[name='email']").val().length != 0) {
                                    email = $("#contact input[name='email']").val();
                                    $("#contact").removeClass("warning");
                                } else {
                                    $("#contact").addClass("warning");
                                    valid = false;
                                }
                            }
                        } else {
                            //console.log("3.1: no response")
                            $("#contact").addClass("warning");
                            valid = false;
                        }
                    } else {
                        //contact set to false to not make a error in the db
                        contact = false;
                    }
                } else {
                    //console.log("3: aucune information sur la location du point")
                    $("#ownership").addClass("warning");
                    valid = false;
                }

                var importance;
                if ($("#openspace input:radio[name='openspace']").is(':checked')) {
                    importance = $("#openspace input:radio[name='openspace']:checked").val()
                    $("#openspace").removeClass("warning");

                } else {
                    //console.log("4: aucune réponse donnée sur l'importance des espaces naturels")
                    $("#openspace").addClass("warning");
                    valid = false;
                }

                var life
                if ($("#health input:radio[name='life']").is(':checked')) {
                    life = $("#health input:radio[name='life']:checked").val()
                    $("#health").removeClass("warning");

                } else {
                    //console.log("5: aucune réponse donnée sur le role sur la vie")
                    $("#health").addClass("warning");
                    valid = false;
                }

                var health
                if ($("#health input:radio[name='health']").is(':checked')) {
                    health = $("#health input:radio[name='health']:checked").val()
                    $("#health").removeClass("warning");

                } else {
                    //console.log("6: aucune réponse donnée sur le role sur la santé")
                    $("#health").addClass("warning");
                    valid = false;
                }

                var biodiversity = new Array();
                if ($("input[name='biodiversity']:checked").length != false) {
                    $("#biodiversity input:checked").each(function() {
                        if ($(this).attr('id') != "bf") {
                            biodiversity.push($(this).val());
                        } else {
                            biodiversity.push($("#otherBio").val());
                        }
                        $("#biodiversity").removeClass("warning");

                    })
                } else {
                    //console.log("7: aucune réponse donnée sur les réponse a choix")
                    $("#biodiversity").addClass("warning");
                    valid = false;
                }

                var biod
                if ($("#quality input:radio[name='quality']").is(':checked')) {
                    biod = $("#quality input:radio[name='quality']:checked").val()
                    $("#quality").removeClass("warning");

                } else {
                    //console.log("8: aucune réponse donnée sur l'importance de la biodiversité")
                    $("#quality").addClass("warning");
                    valid = false;
                }

                var extra
                if ($("#extra input:radio[name='extra']").is(':checked')) {
                    extra = $("#extra input:radio[name='extra']:checked").val()
                    $("#extra").removeClass("warning");
                    if ($("#extra input:radio[name='extra']:checked").val() == "true" && $("#contactEmail2").css('display') != 'none') {
                        if ($("#extra input[name='email']").val().length != 0) {
                            console.log("emaill2: " + $("#extra input[name='email']").val())
                            email = $("#extra input[name='email']").val();
                        } else {
                            console.log("3:fail")
                            $("#extra").addClass("warning");
                            valid = false;
                        }
                    }
                } else {
                    //console.log("9: aucune réponse a la dèrniere question")
                    $("#extra").addClass("warning");
                    valid = false;
                }

                //Add point to database
                //isError(false);
                var parametres = {
                    lng: points.lng,
                    lat: points.lat,
                    typelocation: ownership,
                    autorisation: contact,
                    mail: email,
                    types: imageTypes,
                    aeNom: aeNom,
                    aeSource: aeSource,
                    importance: importance,
                    sante: health,
                    qualitevie: life,
                    preservation: biodiversity,
                    biodiversite: biod,
                    questionsup: extra,
                    controller: 'point',
                    action: 'add'
                };
                /*
		        var parametres = {
		            lng: points.lng,
		            lat: points.lat,
		            typelocation: "yes",
		            autorisation: "yes",
		            mail: "yes",
		            types: "yes",
		            aeNom : "yes",
		            aeSource: "yes",
		            importance: "yes",
		            sante: "yes",
		            qualitevie: "yes",
		            preservation: "yes",
		            biodiversite: "yes",
		            questionsup: "yes",
		            controller: 'point',
		            action: 'add'
		        };
*/

                console.log(parametres);
                if (valid) {
                    $.getJSON(APP_URL + DISPATCHER, parametres);
                    //reset in case questions were expanded
                    $("#otherSpecies").fadeOut()
                    $("#contact").fadeOut();

                    //remove all entered data from
                    $("input[name='prop']").prop('checked', false);
                    $("input[name='imageType']").prop('checked', false);
                    $("input[name='image']").val("");
                    $("input[name='speciesName']").val("");
                    $("input[name='ownership']").prop('checked', false);
                    $("input[name='contact']").prop('checked', false);

                    //fadeout data fields
                    $("#dataForm").fadeOut();
                    $("#imageRadio").fadeOut();

                    //set sidebar back to 200px
                    setSidebarSize(200);

                    //remover marker from map and add it to marker cluster
                    map.removeLayer(marker)
                    marker.addTo(markers)

                    //lock point after saved
                    marker.dragging.disable();

                    //dissable delete button
                    $("#delete").attr("disabled", true);
                    $("#accept").attr("disabled", true);

                    //reactivate marker on sidebar
                    $('#addPoint .drag, #dndtext').animate({
                        opacity: 1
                    });
                    $('.dragDummy').fadeOut();
                    $('.drag').fadeIn();

                    //the form is taken away
                    isActive = false;
                } else {
                    alert("point not valid")
                }
                break;
            case "#delete":
                //empty data so it can't be added to the database
                points = null
                //delete marker
                map.removeLayer(marker)
                markers.removeLayer(marker)
                marker.update()

                //set sidebar back to 200px
                setSidebarSize(200);

                //remove all entered data from
                $("input[name='prop']").prop('checked', false);
                $("input[name='imageType']").prop('checked', false);
                $("input[name='image']").val("");
                $("input[name='speciesName']").val("");
                $("input[name='ownership']").prop('checked', false);
                $("input[name='contact']").prop('checked', false);

                //fadeout data fields
                $("#dataForm").fadeOut();
                $("#imageRadio").fadeOut();

                //reactivate marker on sidebar
                $('#addPoint .drag, #dndtext').animate({
                    opacity: 1
                });
                $('.dragDummy').fadeOut();
                $('.drag').fadeIn();

                //dissable delete button
                $("#delete").attr("disabled", true);
                $("#accept").attr("disabled", true);

                //ramove of all warning class
                $(".warning").removeClass("warning")

                //the form is taken away
                isActive = false;
                break;
        }

    });
}


function isError(boolean) {
    $("#msg").empty();
    if (boolean) {
        // en cas d'erreur
        $("#msg").removeClass("success").addClass("error");
        $("#msg").append(msg_error);
        $("#msg").slideDown(200);
    } else {
        $("#msg").removeClass("error").addClass("success");
        $("#msg").append(msg_success);
        $("#msg").slideDown(200);
    }
}

function setSidebarSize(size) {
    $('#sidebar').animate({
        width: size + 30 + "px"
    });
    $('#sideContent').animate({
        width: size + "px"
    });
    $('#markerSection').animate({
        width: size + "px"
    })
    $("#dndtext").animate({
        width: size + "px"
    })
    $(".poi-type").animate({
        width: size + "px"
    })
    $("#buttons").animate({
        width: size + "px"
    })
    $(".leaflet-left").animate({
        marginLeft: size + 30 + "px"
    })
}

function getPoints() {
    $.getJSON(APP_URL + DISPATCHER, {
        controller: 'point',
        action: 'getPoints'
    }, function(data) {
        $(data).each(function(index, feat) {
            var output = "<div class='popupMap'>Adresse</div>";
            var options = {
                'minWidth': 200
            };
            var icon = getIcon(feat.type);
            var actualLat = feat.pointdata.lat;
            var actualLong = feat.pointdata.lng;
            var point = L.marker([actualLat, actualLong], {
                icon: icon
            }).bindPopup(output, options).addTo(markers);
        });
    })
}

function addControl() {
    map.addLayer(markers);
}



function getIcon(name) {
    var icon
    switch (name) {
        case "Butterfly":
            icon = new poiIcon({
                iconUrl: 'css/img/icones/marker_1.png'
            });
            break;
        case "plant":
            icon = new poiIcon({
                iconUrl: 'css/img/icones/marker_2.png'
            });
            break;
        case "frog":
            icon = new poiIcon({
                iconUrl: 'css/img/icones/marker_3.png'
            });
            break;
        case "normal":
            icon = new poiIcon({
                iconUrl: 'css/img/icones/marker_neutre_small.png'
            });
            break;
    }
    return icon;
}

// Drag & Drop
$(".drag").draggable({
    helper: "clone",
    appendTo: "body",
    containment: 'map',
    start: function(evt, ui) {

        setSidebarSize(0)
        $('#addPoint .drag, #dndtext').animate({
            opacity: 0.15
        });
        $("#delete").delay(500).attr("disabled", false);
        $("#accept").delay(500).attr("disabled", false);
    },
    stop: function(evt, ui) {

        setSidebarSize(400);

        var icon = getIcon("normal");

        console.log(ui.helper.attr('type'));
        var options = {
            pid: guid(),
            type: ui.helper.attr('type'),
            icon: icon,
            draggable: true
        };

        //switch the icon with a dummy
        $('.dragDummy').show();
        $('.drag').hide();

        //show data fiels
        $("#dataForm").fadeIn();
        $("#imageRadio").fadeIn();

        isActive = true;

        insertPointLocaly([ui.offset.left, ui.offset.top], options);
        map.panTo(new L.LatLng(points.lat, points.lng));

    }
});


//insert point
function insertPointLocaly(position, options) {

    //add the popup data
    points = map.containerPointToLatLng(position);
    var icon = getIcon("normal");
    var output = "<div class='popupMap'><span>Valider?</span></div>";
    var markerOptions = {
        'height': 100,
        icon: icon
    }
    //marker is added to map and not markers(cluster) because cluster can cause problems
    marker = L.marker([points.lat, points.lng], options).bindPopup(output, markerOptions).addTo(map);

    marker.on('dragend', setNewLngLat);
}

function setNewLngLat(e) {
    points = e.target._latlng;
    map.panTo(new L.LatLng(points.lat, points.lng));
}

// Create a GUID
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function setHeight() {
    var heightWindow = $(window).height();
    var heightMenu = $("#main-nav").height();
    var heightFooter = $("#footer").height();

    var diff = heightWindow - heightMenu - heightMenu;

    //	$("#main-page").css('min-height', diff);
    $("#form").css('min-height', diff);
    $("#map").css('min-height', diff);

    //	$("#content").css('min-height', diff);

}

function filterJSONCall(rawjson) {
    var json = {},
        key, loc, disp = [];

    for (var i in rawjson) {
        key = rawjson[i].formatted_address;

        loc = L.latLng(rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng());

        json[key] = loc; //key,value format
    }

    return json;
}