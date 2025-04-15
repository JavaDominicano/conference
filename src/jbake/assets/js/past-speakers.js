import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "../json/past-speakers");

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

      var speakerHtml = "<div class=\"col-lg-3 col-sm-6\">" +
      "<div class=\"single-speaker\">" +
      "<div class=\"speaker-image\">" +
      "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" />"+
      "</div>"+
      "<div class=\"speaker-content\">"+
      "<div class=\"speaker-content-box\">"+
         "<h4 class=\"speaker-name\">"+ speakerJson.name +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></h4>"+
          "<p class=\"speaker-designation\">"+speakerJson.company +"<br>"+ speakerJson.year +"</p>" +
      "</div>"+
      "<img class=\"speaker-shape-1\" src=\"/img/meeta/shape/shape-8.png\">"+
      "<div class=\"speaker-shape-2\"></div>"+
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>";
  
          return speakerHtml;
  }