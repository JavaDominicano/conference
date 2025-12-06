import { getUsefulContents, getUsefulLink } from '/js/util-url.js';
import {fetchData} from '/js/fetch-util.js';

let pastSpeakersUrl = getUsefulContents("lang", "../json/past-speakers");

function createSpeakerCard(speakerJson) {
      let speakerHtml = "<div class=\"col-lg-3 col-sm-6\">" +
      "<div class=\"single-speaker\">" +
      "<div class=\"speaker-image\">" +
      "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" />"+
      "</div>"+
      "<div class=\"speaker-content\">"+
      "<div class=\"speaker-content-box\">"+
         "<h4 class=\"speaker-name\">"+ speakerJson.name +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></h4>"+
          "<p class=\"speaker-designation\">"+speakerJson.company +"<br>"+ speakerJson.latestYear +"</p>" +
      "</div>"+
      "<img class=\"speaker-shape-1\" src=\"/img/meeta/shape/shape-8.png\">"+
      "<div class=\"speaker-shape-2\"></div>"+
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>";

      return speakerHtml;
  }

let renderPastSpeakerList = function(speakersList){
    let speakers = document.getElementById('listSpeakers');
    speakersList.forEach(speakerJson => speakers.innerHTML += createSpeakerCard(speakerJson));
}

let sortSpeakerList = function(speakerJson) {
    let speakersList = [];
    speakerJson.forEach(speakerObj => speakersList.push(speakerObj));
    speakersList.sort(function(a, b){return b.latestYear-a.latestYear});

    return speakersList;
}

let jsonData = await fetchData(pastSpeakersUrl);

renderPastSpeakerList(sortSpeakerList(jsonData));