var map;
var baseLayer = null;
var ggl = null;
var ggl2 = null;
var arrayType = ['normal'];
var table;
var markers = new L.MarkerClusterGroup({
    maxClusterRadius: 35,
    spiderfyDistanceMultiplier: 1.5
});
var marker;
var points;
var offset;
var user;
var zoom;
var sidebarWidth = 200;
var isActive = false;
var poiIcon = L.Icon.extend({
    options: {
        iconSize: [40, 49],
        shadowSize: [15, 8],
        iconAnchor: [20, 49],
        shadowAnchor: [8, 4],
        popupAnchor: [0, -55]
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
    $("#delete").fadeOut();
    $("#accept").attr("disabled", true);
    $("#msg").hide();
    setHeight();

    map = L.map('map', {
        center: new L.LatLng(46.31, 6.23),
        zoom: 11,
        maxZoom: 20,
        zoomControl: false
    });





    new L.Control.GoogleAutocomplete().addTo(map);
    new L.control.zoom({
        position: 'topleft'
    }).addTo(map)
    baseLayer = L.tileLayer('http://{s}.tile.cloudmade.com/b9941117432e4e63bb0e5a410de8e6eb/116155/256/{z}/{x}/{y}.png', {
        // Ajoute un copyright custom
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    ggl = new L.Google('SATELLITE');
    ggl2 = new L.Google('HYBRID');

    //initial layer setup
    map.addLayer(baseLayer);
    map.addControl(new L.Control.Layers({
        'Carte': baseLayer,
        'Satellite': ggl,
        'Hybrid': ggl2
    }, {}));

    var zoom1
    map.on('zoomstart', function() {
        zoom1 = map.getZoom()
    });

    //change layer depending on zoom
    map.on('zoomend', function() {
        mapZoomDisplay(zoom1);
    });

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

    //slider set up
    sliderSetUp("sliderQuality");
    sliderSetUp("sliderLife");
    sliderSetUp("sliderHealth");

    //navigation between the content of the sidebar
    onClick(".nextButton")
    onClick("#hideShowBar")
    onClick("#accept")
    onClick("#delete")
    hideShowBiodiversite()

    $("#sideContent").removeAttr('overflow-y');

    checkboxChange();
    hideShowProp();
    hideShowOwnership();
    hideShowEmail();
    hideShowEmail2();
    hideSearch();

    //select checkbox on textfield click, uncheck if empty on click out
    $('#otherBio').focus(function() {
        $('#bx').prop('checked', true);
    }).blur(function() {
        if ($(this).val() == "") {
            $('#bx').prop('checked', false);
        }
    });

    getToolTip(".imgChoice")

    // Limit zoom and extent
    map._layersMinZoom = 9;
    map.setMaxBounds([
        [46.63152171082673, 7.073822021484375],
        [45.744526980468436, 5.592041015625]
    ]);
});


function getToolTip(type) {
    $(type).each(function(index, element) {
        var text
        switch ($(element).attr("alt")) {
            case "images-ronde_2":
                text = "crapaud commun"
                break;
            case "images-ronde_3":
                text = "triton alpestre"
                break;
            case "images-ronde_1":
                text = "grenouille rousse"
                break;
        }
        console.log($(element).attr("alt"));
        var parent = $(element).parent('.imageType');
        //ToolTip 1

        parent.simpletip({
            fixed: true,
            position: top,
            content: text
        });
    })
}

function sliderSetUp(sliderName) {
    table = ["Très faible", "Faible", "Moyenne", "Forte", "Très forte"]
    $('#' + sliderName).slider({
        value: 2,
        min: 0,
        max: table.length - 1,
        step: 1,
        change: function(event, ui) {
            $('#' + sliderName + ' a.ui-slider-handle').css({
                "background": "#e6e6e6 url(images/ui-bg_glass_75_e6e6e6_1x400.png"
            })
            $(this).addClass("changed")
        }

    });
    $('#' + sliderName + ' a.ui-slider-handle').css({
        "background-color": "white",
        "background-image": "none"
    })
}

function checkboxChange() {
    $("input[name='imageType']").change(function() {
        var source = $(this).siblings('img').attr("src");
        if (!$(this).prop('checked')) {
            source = source.substring(0, 16)
            source = source + 'off.png'
        } else {
            source = source.substring(0, 16)
            source = source + 'on.png'
        }
        $(this).siblings('img').attr("src", source)
    })
}

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
    //display contact form if ownership is true
    $("#ownership #ownershipSelect").change(function() {
        var oldScrollTop;
        if ($("#ownership #ownershipSelect option:selected").val() == "a") {
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

function hideShowOwnership() {
    //display contact form if ownership is true
    $("#ownership #ownershipSelect").change(function() {
        var oldScrollTop;
        if ($("#ownership #ownershipSelect option:selected").val() == "a") {
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

function hideShowBiodiversite() {
    //display biodiversity questions if user chooses too.
    $("#questions input[name='questionsTT']").change(function() {
        console.log($("#personalData").is(":visible"))
        if ($(this).val() == "false") {
            if ($("#personalData").is(":visible")) {
                $('#sideContent').animate({
                    scrollTop: $("#sideContent").scrollTop() - 300
                }, 400);
                $("#personalData").slideUp({
                    duration: 400,
                    easing: 'easeInOutQuad'
                }).fadeTo(400, 0);
            }
        } else if ($(this).val() == "true") {
            $("#expandArrow").addClass('deployed');
            $('#sideContent').delay(200).animate({
                scrollTop: $("#sideContent").scrollTop() + 300
            }, 400);
            $("#personalData").fadeTo(400, 1).slideDown({
                duration: 400,
                easing: 'easeInOutQuad'
            });
        }
    })
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

function mapZoomDisplay(zoom1) {
    //replace base layers if zoom is bigger or equal to 17 AND if previous zoom was under 17. same for oposite.
    if (map.getZoom() >= 17 && zoom1 < 17) {
        removeOldLayers()
        map.addLayer(ggl2);
        map.addControl(new L.Control.Layers({
            'Hybrid': ggl2,
            'Satellite': ggl
        }, {}));
    } else if ((map.getZoom() <= 16 && zoom1 > 16)) {
        removeOldLayers()
        map.addLayer(baseLayer);
        map.addControl(new L.Control.Layers({
            'Carte': baseLayer,
            'Hybrid': ggl2,
            'Satellite': ggl
        }, {}));
    }
}

function removeOldLayers() {
    //remove old layer controller and layers
    $('.leaflet-control-layers').remove();
    if (map.hasLayer(baseLayer)) {
        map.removeLayer(baseLayer)
    }
    if (map.hasLayer(ggl)) {
        map.removeLayer(ggl)
    }
    if (map.hasLayer(ggl2)) {
        map.removeLayer(ggl2)
    }
}

function showSearch() {
    var input = $(".leaflet-container .leaflet-control-googleautocomplete input");
    input.animate({
        width: "300px",
        height: "28px",
        paddingLeft: "22px"
    })
    input.attr("placeholder", "Recherche lieu, adresse, commune, ...")
    input.focus();
}

function hideSearch() {
    var input = $(".leaflet-container .leaflet-control-googleautocomplete input");
    input.animate({
        width: "25px",
        height: "25px",
        paddingLeft: "0px"
    })
    input.attr("placeholder", "")
}


function onClick(button) {
    $(button).click(function() {
        switch (button) {
            case ".nextButton":
            case "#hideShowBar":
                $('#sidebar').toggleClass('full-width').toggleClass('small-width');
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
                        borderLeftColor: "transparent",
                        borderRightColor: "#8f8f8f",
                        borderLeftWidth: "0px",
                        borderRightWidth: "10px"
                    });
                } else {
                    $("#introduction").delay(500).fadeIn(500);
                    $("#addPoint").fadeOut(500);
                    percent = 0.90;
                    add_width = (percent * $('body').width());
                    setSidebarSize(add_width);

                    $('#hideShowArrow').animate({
                        borderLeftColor: "#8f8f8f",
                        borderRightColor: "transparent",
                        borderLeftWidth: "10px",
                        borderRightWidth: "0px"
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
                } else {
                    valid = false;
                }
                var aeNom, aeSource
                if ($("#prop input:radio[name='prop']").is(':checked')) {
                    if ($("#prop input:radio[name='prop']:checked").val() == "true") {
                        if (!$("input[name='speciesName']").val().length == 0) {
                            aeNom = $("input[name='speciesName']").val();
                        } else {
                            valid = false;
                        }
                        if (tpl != null) {
                            aeSource = $("input[name='image']").val();
                        } else {
                            valid = false;
                        }
                    }

                } else {
                    valid = false;

                }

                var ownership, email, prop, contact;
                //if ownership answered
                if ($("#ownership #ownershipSelect option:selected").val() != "x") {
                    ownership = $("#ownership #ownershipSelect option:selected").val();
                    //if ownership = a
                    if ($("#ownership #ownershipSelect option:selected").val() == "a") {
                        //if contact answered
                        if ($("#contact input:radio[name='contact']").is(':checked')) {
                            contact = $("#contact input:radio[name='contact']").val()
                            //if contact = yes AND the email form is displayed
                            if ($("#contact input:radio[name='contact']:checked").val() == "true" && $("#contactEmail").css('display') != 'none') {
                                if ($("#contact input[name='email']").val().length != 0) {
                                    email = $("#contact input[name='email']").val();
                                } else {
                                    valid = false;
                                }
                            }
                        } else {
                            contact = false;
                            valid = false;
                        }
                    } else {
                        //contact set to false to not make a error in the db
                        contact = false;
                    }
                } else {
                    valid = false;
                }

                var distance;
                if ($("#distance input:radio[name='distance']").is(':checked')) {
                    distance = $("#distance input:radio[name='distance']:checked").val()
                } else {
                    valid = false;
                }

                var presence;
                if ($("#presence input:radio[name='presence']").is(':checked')) {
                    presence = $("#presence input:radio[name='presence']:checked").val()
                } else {
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

                    })
                } else {
                    valid = false;
                }

                var quality
                if ($('#sliderQuality').hasClass("changed")) {
                    quality = $("#sliderQuality").slider("value");
                } else {
                    valid = false;
                }

                var life
                if ($('#sliderLife').hasClass("changed")) {
                    life = $("#sliderLife").slider("value");

                } else {
                    valid = false;
                }

                var health
                if ($('#sliderHealth').hasClass("changed")) {
                    health = $("#sliderHealth").slider("value");

                } else {
                    valid = false;
                }

                var extra
                if ($("#extra input:radio[name='extra']").is(':checked')) {
                    extra = $("#extra input:radio[name='extra']:checked").val()
                    $("#extra").removeClass("warning");
                    if ($("#extra input:radio[name='extra']:checked").val() == "true" && $("#contactEmail2").css('display') != 'none') {
                        if ($("#extra input[name='email']").val().length != 0) {
                            email = $("#extra input[name='email']").val();
                        } else {
                            valid = false;
                        }
                    }
                } else {
                    valid = false;
                }

                var pseudo;
                if ($("input[name='speciesName']").val() != null) {
                    pseudo = $("input[name='pseudo']").val();
                }
                //Add point to database
                //isError(false);
                var parametres = {
                    lng: points.lng,
                    lat: points.lat,
                    pseudo: pseudo,
                    typelocation: ownership,
                    autorisation: contact,
                    mail: email,
                    types: imageTypes,
                    aeNom: aeNom,
                    aeSource: globName,
                    distance: distance,
                    presence: presence,
                    qualite: quality,
                    sante: health,
                    qualitevie: life,
                    zoom: zoom,
                    preservation: biodiversity,
                    questionsup: extra,
                    utilisateur: user,
                    controller: 'point',
                    action: 'add'
                };
                //console.log(parametres)

                $.getJSON(APP_URL + DISPATCHER, parametres, function(data) {
                    var receivedData = data
                    user = data.idUser;

                    //reset in case questions were expanded
                    $("#otherSpecies").fadeOut();
                    $("#contact").fadeOut();

                    //Reset all entered data from
                    $("input[name='prop']").prop('checked', false);
                    $("input[name='imageType']").prop('checked', false);
                    $("input[name='image']").val("");
                    $("input[name='speciesName']").val("");
                    $("#ownershipSelect").val('x');
                    $("input[name='contact']").prop('checked', false);
                    $("input[name='imageType']").each(function() {
                        var source = $(this).siblings('img').attr("src");
                        source = source.substring(0, 16)
                        source = source + 'off.png'
                        $(this).siblings('img').attr("src", source)
                    })
                    if (tpl != null) {
                        tpl.remove();
                        $("#upload a").parent().find('input').attr("disabled", false);
                    }

                    //fadeout data fields
                    $("#dataForm").fadeOut();

                    //set sidebar back to 200px;
                    setSidebarSize(200);

                    //remover marker from map and add it to marker cluster
                    map.removeLayer(marker)
                    //marker.addTo(markers)
                    addfinalPoint(receivedData.point, receivedData.types)

                    //lock point after saved
                    marker.dragging.disable();

                    //dissable delete button
                    $("#delete").fadeOut();
                    //$("#delete").attr("disabled", true);
                    $("#accept").attr("disabled", true);

                    //reactivate marker on sidebar
                    $('#addPoint .drag, #dndtext').animate({
                        opacity: 1
                    });
                    $('.dragDummy').fadeOut();
                    $('#notification').fadeIn().delay(2300).fadeOut();
                    $('.drag').delay(1000).fadeIn();

                    //the form is taken away
                    isActive = false;
                })
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

                //Reset all entered data from
                $("input[name='prop']").prop('checked', false);
                $("input[name='imageType']").prop('checked', false);
                $("input[name='image']").val("");
                $("input[name='speciesName']").val("");
                $("#ownershipSelect").val('x');
                $("input[name='contact']").prop('checked', false);
                $("input[name='imageType']").each(function() {
                    var source = $(this).siblings('img').attr("src");
                    source = source.substring(0, 16)
                    source = source + 'off.png'
                    $(this).siblings('img').attr("src", source)
                })
                if (tpl != null) {
                    tpl.remove();
                    $("#upload a").parent().find('input').attr("disabled", false);
                }
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
                $("#delete").fadeOut();
                //$("#delete").attr("disabled", true);
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

function addfinalPoint(point, types) {
    var options = {
        'closeButton': true
    };
    var pointData = getMarkerData(types);
    var markerOptions = {
        title: 'point',
        alt: 'mare',
        icon: pointData[0]
    }
    var point = L.marker([point.lat, point.lng], markerOptions).bindPopup(pointData[1], options).addTo(markers);
}

function setSidebarSize(size) {
    sidebarWidth = size;
    $('#sidebar').animate({
        width: size + 30 + "px"
    });
    $('#sideContent').animate({
        width: size + "px"
    });
    if (size > 199) {
        $('#markerSection').animate({
            width: size + "px"
        })
        $("#dndtext").animate({
            width: size + "px"
        })
        $("#smallText").animate({
            width: size + "px"
        })
        $(".poi-type").animate({
            width: size + "px"
        })
        $("#buttons").animate({
            width: size + "px"
        })
    }
    $(".leaflet-bottom").animate({
        marginRight: size + 30 + "px"
    })
    $(".leaflet-right").animate({
        marginRight: size + 30 + "px"
    })

    if (size > 400) {
        hideSearch();
    } else {
        showSearch();
    }
}

function getPoints() {
    $.getJSON(APP_URL + DISPATCHER, {
        controller: 'point',
        action: 'getPoints'
    }, function(data) {
        if (data.length > 0) {
            $(data).each(function(index, feat) {
                addfinalPoint(feat.pointdata, feat.type)
            });
        }
    })
}

function addControl() {
    map.addLayer(markers);
}



function getMarkerData(types) {
    var icon, output
        icon = new poiIcon({
            iconUrl: 'css/img/icones/marker_saved.png',
            shadowUrl: 'css/img/icones/marker_shadow.png'
        });
    //check if array first
    if (types == "new") {
        icon = new poiIcon({
            iconUrl: 'css/img/icones/marker_new.png',
            shadowUrl: 'css/img/icones/marker_shadow.png'
        });
    } else if (types == null || types.length <= 0) {
        output = "<div class='popupMap'>Aucun batracien n'a été identifié dans cette mare</div>"
    } else if (types.length == 1) {
        switch (types[0]) {
            case "Crapaud commun":
                output = "<div class='popupMap'>Dans cette mare des crapauds communs ont été détectés</div>"
                break;
            case "Triton alpestre":
                output = "<div class='popupMap'>Dans cette mare des tritons alpestres ont été détectés</div>"
                break;
            case "Grenouille rousse":
                output = "<div class='popupMap'>Dans cette mare des grenouilles rousses ont été détectés</div>"
                break;
        }
    } else if (types.length == 2) {
        switch (types[0] + "|" + types[1]) {
            case "Crapaud commun|Triton alpestre":
            case "Triton alpestre|Crapaud commun":
                output = "<div class='popupMap'>Dans cette mare des crapauds communs et des tritons alpestres ont été détectés</div>"
                break;
            case "Triton alpestre|Grenouille rousse":
            case "Grenouille rousse|Triton alpestre":
                output = "<div class='popupMap'>Dans cette mare des tritons alpestres et des grenouilles rousses ont été détectés</div>"
                break;
            case "Grenouille rousse|Crapaud commun":
            case "Crapaud commun|Grenouille rousse":
                output = "<div class='popupMap'>Dans cette mare des grenouilles rousses et des crapauds communs ont été détectés</div>"
                break;
        }
    } else if (types.length == 3) {
        output = "<div class='popupMap'>Dans cette mare des grenouilles rousses, des crapauds communs et des tritons alpestres ont été détectés</div>"
    } else {
        output = "<div class='popupMap'>Zoomer, puis déplacer l'icône pour affiner sa position</div>"
    }
    var a = [];
    a.push(icon);
    a.push(output);
    return a;
}

// Drag & Drop
$(".drag").draggable({
    helper: "clone",
    appendTo: "body",
    containment: 'map',
    start: function(evt, ui) {

        setSidebarSize(0)
        $("#delete").delay(500).fadeIn();
        $("#accept").delay(500).attr("disabled", false);
    },
    stop: function(evt, ui) {

        setSidebarSize(400);
        $("#pointData").fadeIn();


        var data = getMarkerData("new");


        var options = {
            pid: guid(),
            type: ui.helper.attr('type'),
            icon: data[0],
            zIndexOffset: 999999,
            draggable: true
        };

        //switch the icon with a dummy
        $('.drag').hide();
        $('.dragDummy').show();


        //show data fiels
        $("#dataForm").fadeIn();
        $("#imageRadio").fadeIn();

        isActive = true;

        insertPointLocaly([ui.offset.left, ui.offset.top], options);
        offset = offsetCenter(points);
        zoom = map.getZoom();
        map.panTo(new L.LatLng(offset.lat, offset.lng));
    }
});

//insert point on map (not db)
function insertPointLocaly(position, options) {

    //add the popup data
    points = map.containerPointToLatLng(position);
    var data = getMarkerData("normal");
    var output = "<div class='popupMap'><span>Zoomer, puis déplacer l'icône pour affiner sa position</span></div>";
    var markerOptions = {
        'height': 100,
        icon: data[0],
    }
    //marker is added to map and not markers(cluster) because cluster can cause problems if point is deleted
    marker = L.marker([points.lat, points.lng], options).bindPopup(output, markerOptions).addTo(map);
    if (map.getZoom() <= 16) {
        marker.openPopup();
    }
    marker.on('dragend', setNewLngLat);
}

function setNewLngLat(e) {
    points.lat = e.target._latlng.lat;
    points.lng = e.target._latlng.lng;
    if (map.getZoom() <= 16) {
        marker.openPopup();
    }

    offset = offsetCenter(points)
    zoom = map.getZoom();
    map.panTo(new L.LatLng(offset.lat, offset.lng));
}

function offsetCenter(point) {
    var boundsCOO = map.getBounds()
    var widthCOO = boundsCOO._northEast.lng - boundsCOO._southWest.lng;
    var widthPX = map.getSize().x;
    var widthSidebarCOO = ((sidebarWidth / 2) * widthCOO) / widthPX;
    var p = new L.LatLng(point.lat, (point.lng + widthSidebarCOO));

    return p
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