import { getUsefulContents, getUsefulLink } from '/js/util-url.js';
import {fetchData, filterSpeakerById} from '/js/fetch-util.js';


function createSessionCard(sessionId, title,description, speakers) {

     let sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
     "<h3 class=\"meeta-event-accordion-toggle\">"+
     "<div class=\"event-title\">"+
     "<span class=\"title\">"+ title +"</span>"+
     "<div id=\"speakers-"+sessionId+"\"></div>";

     for (let i in speakers) {
         renderSessionSpeakers(getUsefulContents("lang", "../json/speakers"), sessionId, speakers[i]);
     }

   sessionHtml +=  "</div>"+
     " </h3>"+
     "<div class=\"meeta-event-accordion-body\" style=\"padding-left: 0px;\">"+
     "<p>"+description+"</p>"+
      "</div>"+
      "</li>";

      return sessionHtml;
}

async function getSpeakerById(fetchUrlSpeaker,speakerId){
  let speakersData = await fetchData(fetchUrlSpeaker);
  let speakerDetailsList = filterSpeakerById(speakersData,speakerId);
  return speakerDetailsList;
}

async function processSession(session, sessions){
    let title = session.title;
    let sessionId = session.id;
    let description = session.description;

     sessions.innerHTML += createSessionCard(sessionId, title, description, session.speakers);
}

async function renderSessionSpeakers(fetchUrlSpeaker, sessionId, speakerId){

        let speakersData = await fetchData(fetchUrlSpeaker);
        let speakerDetailsList = filterSpeakerById(speakersData,speakerId);
        let speaker = speakerDetailsList[0];

        let speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speakerId);

        let speakers = document.getElementById("speakers-"+sessionId);
        speakers.innerHTML += "<a href=\"" + speakerUrlDetail + "\" title=\"See speaker details\">"+speaker.name+"</a> <span class=\"flag-icon " + speaker.countryFlag + "\"></span> ";
}

let filterConfirmedSessions = function(sessionsJson) {

      let sessionList = [];

      sessionsJson.forEach(sessionObj => sessionList.push(sessionObj));

      sessionList.sort(function(a, b){return a.id-b.id && b.featured - a.featured});

      let filteredSessions = sessionList.filter((session) => {
            return session.talk_format.indexOf("Talk") !== -1;
      });

    return filteredSessions.filter(item => item.display === true);
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