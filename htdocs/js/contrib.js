$(document).ready(function() {  
	getData();
});

function getData() {
    $.getJSON(APP_URL + DISPATCHER, {
        controller: 'point',
        action: 'getPoints'
    }, function(data) {
        if (data.length > 0) {
            console.log(data);
            $(data).each(function(index, element){
	            tr = $("<tr />")
	            tdID = $("<td />")
	            tdUser = $("<td />")
	            tdDate = $("<td />")
	            tdBat = $("<td />")
	            tdZoom = $("<td />")
	            
	            date = element.pointdata.date;
	            dateArray = date.split("/")
	            
	            date = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	            
	            tdID.text(element.pointdata.id);
	            tdUser.text(element.username);
	            tdDate.text(date);
	            for (var i = 0, limit = element.type.length; i < limit; i++){
	            	p = $("<p />");
	            	p.text(element.type[i]);
	            	p.appendTo(tdBat);
				}
				tdZoom.text(element.pointdata.zoom)
	            tr.append(tdID).append(tdUser).append(tdDate).append(tdBat).append(tdZoom).appendTo($("#contrib tbody"));
	            
            })
        }
        $("#contrib").tablesorter();
    })
}
