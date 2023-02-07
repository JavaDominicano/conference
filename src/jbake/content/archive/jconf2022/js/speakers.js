import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "/archive/jconf2022/json/speakers");

fetch(fetchUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (speakersJson) {
        var speakers = document.getElementById('listSpeakers');
        // traitement de l'objet
        for (let i in speakersJson) {
            speakers.innerHTML += createSpeakerCard(speakersJson[i]);
        }
});


function createSpeakerCard(speakerJson) {

  var speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speakerJson.id);

    var speakerHtml = "<div class=\"col-lg-4 col-md-6\">" +
        "<div class=\"speaker\">" +
        "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" class=\"img-fluid\"/>" +
        "<div class=\"details\">" +
        "<h3><a href=\"" + speakerUrlDetail + "\">" +speakerJson.name +"</a></h3>"+
        "<p>" +speakerJson.badges[0].description +" @ " +speakerJson.company +" - " +speakerJson.country +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></p>" +
        "<div class=\"social\">" ;

        for(let i in speakerJson.socials){
             speakerHtml += " <a href=\""+speakerJson.socials[i].link+"\" target=\"_blank\"><i class=\"fa fa-"+speakerJson.socials[i].icon+"\"></i></a> ";
        }

    speakerHtml += "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

        return speakerHtml;
}
