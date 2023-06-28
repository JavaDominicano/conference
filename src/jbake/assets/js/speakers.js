import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "../json/speakers");

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
  
      var speakerHtml = "<div class=\"col-lg-3\">" +
      "<div class=\"single-speker-3\">" +
      "<div class=\"speker-img\">" +
      "<a href=\"" + speakerUrlDetail + "\"><img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" /></a>"+
      "<div class=\"speker-content text-center\">"+
         "<h3 class=\"name\">" +speakerJson.name +"</h3>"+
             "<p class=\"designation\">" +speakerJson.badges[0].description +" @ " +speakerJson.company +" - " +speakerJson.country +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></p>" +        
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>";
  
          return speakerHtml;
  }