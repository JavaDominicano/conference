import { getUsefulContents, getUsefulLink } from '/js/util-url.js';
import {fetchData} from '/js/fetch-util.js';


function createSessionCard(title,abstract, speaker,time) {

   let speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.speakerId);

     let sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
     "<h3 class=\"meeta-event-accordion-toggle\">"+
     "<div class=\"image\">"+
     "<a href=\"" + speakerUrlDetail + "\"><img src=\"" +speaker.photoUrl +"\" alt=\""+speaker.name+"\"></a>"+
     "</div>"+
     "<div class=\"event-title\">"+
     "<span class=\"time\">"+time+"</span>"+
     "<span class=\"title\">"+ title +"</span>"+
     "</div>"+
     " </h3>"+
     "<div class=\"meeta-event-accordion-body\">"+
     "<p>"+abstract+"</p>"+
      "</div>"+
      "</li>";

        return sessionHtml;
}

async function getSpeakerById(fetchUrlSpeaker){
 const response = await fetch(fetchUrlSpeaker);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

async function processSession(session, sessions){
    let title = session.title;
    let abstract = session.abstract;
    let speakerId = session.speakers[0];

    let time = session.time;

    let speaker = await getSpeakerById(getUsefulContents("lang", "../json/speakers/"+speakerId));

    sessions.innerHTML += createSessionCard(title,abstract,speaker, time);
}


let filterConfirmedSessions = function(sessionsJson) {

      let sessionList = [];

      sessionsJson.forEach(sessionObj => sessionList.push(sessionObj));

      sessionList.sort(function(a, b){return a.id-b.id});

      let filteredSessions = sessionList.filter((session) => {
            return session.talk_format.indexOf("Workshop")==-1;
      });

      return filteredSessions;
}

let renderSessionList = function(sessionJson) {
      let sessions = document.getElementById('sessionsList');

      sessionJson.forEach((session) => processSession(session, sessions));
}

let sessionUrl = getUsefulContents("lang", "../json/sessions");
let jsonData = await fetchData(sessionUrl);
let filteredSessionsList = filterConfirmedSessions(jsonData);
renderSessionList(filteredSessionsList);

$(document).on('click', '#sessionsList li.meeta-event-accordion-item > .meeta-event-accordion-toggle', function(){
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).siblings(".meeta-event-accordion-body").slideUp(200);
} else {           
    $(".meeta-event-accordion-item > .meeta-event-accordion-toggle").removeClass("active");
    $(this).addClass("active");
    $(".meeta-event-accordion-body").slideUp(200);
    $(this).siblings(".meeta-event-accordion-body").slideDown(200);
}
});