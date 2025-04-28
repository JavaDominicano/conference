import { getUsefulContents, getUsefulLink } from '/js/util-url.js';
import {fetchData} from '/js/fetch-util.js';

let fetchUrl = getUsefulContents("lang", "../json/speakers");

let createSpeakerCard = function(speakerJson) {

    var speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speakerJson.speakerId);

      var speakerHtml = "<div class=\"col-lg-3\">" +
      "<div class=\"single-speker-3\">" +
      "<div class=\"speker-img\">" +
      "<a href=\"" + speakerUrlDetail + "\"><img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" /></a>"+
      "<div class=\"speker-content text-center\">"+
         "<h3 class=\"name\">" +speakerJson.name +"</h3>"+
             "<p class=\"designation\">" +speakerJson.title +" @ " +speakerJson.company +" - " +speakerJson.country +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></p>" +
      "</div>"+
      "</div>"+
      "</div>"+
      "</div>";

     return speakerHtml;
}

let renderSpeakerList = function(speakersList){
         let speakers = document.getElementById('listSpeakers');
         speakersList.sort(function(a, b){return a.numOrder-b.numOrder});
         speakersList.forEach(speakerJson => speakers.innerHTML += createSpeakerCard(speakerJson));
}

let filterConfirmedSpeakers = function(speakersJson) {
  let speakersList = [];
  speakersJson.forEach(speakerObj => speakersList.push(speakerObj));
  return speakersList.filter(item => item.display === true);
}

let jsonData = await fetchData(fetchUrl);
let filteredSpeakersList = filterConfirmedSpeakers(jsonData);

renderSpeakerList(filteredSpeakersList);