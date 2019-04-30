function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var speakerId = getURLParameter("id");

fetch('../json/speakers/'+speakerId+'.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (speakerJson) {
        var speakerDetails = document.getElementById('speakeDetails');
        // traitement de l'objet

        speakerDetails.innerHTML += createSpeakerDetailsCard(speakerJson);

});


function createSpeakerDetailsCard(speakerJson) {

    var speakerHtml = "<div class=\"col-md-6\">" +
        "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" class=\"img-fluid\"/>" +
        "</div>" +
        "<div class=\"col-md-6\">" +
        "<div class=\"details\">" +
        "<h2>"+speakerJson.name +"</h2>"+
        "<div class=\"social\">" ;

        for(i in speakerJson.socials){
             speakerHtml += " <a href=\""+speakerJson.socials[i].link+"\" target=\"_blank\"><i class=\"fa fa-"+speakerJson.socials[i].icon+"\"></i></a> ";
        }

    speakerHtml +=  "</div>" +
        "<p> "+speakerJson.bio+"</p>"+
        "</div>" +
        "</div>";

        return speakerHtml;
}
