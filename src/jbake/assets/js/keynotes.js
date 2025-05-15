import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

import {fetchData, filterSpeakerById} from '/js/fetch-util.js';

let filterConfirmedKeynote = function(sessionsJson) {

      let keynoteList = [];

      sessionsJson.forEach(sessionObj => keynoteList.push(sessionObj));

      keynoteList.sort(function(a, b){return a.id-b.id});

      let filteredKeynotes = keynoteList.filter((session) => {
            return session.talk_format.indexOf("Talk")==-1 && session.talk_format.indexOf("Workshop")==-1;
      });

    return filteredKeynotes.filter(item => item.display === true);
}


let renderKeynotesList = function(sessionJson) {
      let keynotes = document.getElementById('keynotesList');

     sessionJson.forEach((keynote) => keynotes.innerHTML += createKeynoteCard(keynote));

}


let sessionUrl = getUsefulContents("lang", "../json/sessions");
let jsonData = await fetchData(sessionUrl);

let filteredKeynoteList = filterConfirmedKeynote(jsonData);
renderKeynotesList(filteredKeynoteList);


$(document).on('click', '#keynotesList li.meeta-event-accordion-item > .meeta-event-accordion-toggle', function(){
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

function createKeynoteCard(keynote) {

  let keynoteId = keynote.id;
  let title = keynote.title;
  let description = keynote.description;
  let speakers = keynote.speakers; 


  var sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
     "<h3 class=\"meeta-event-accordion-toggle\">"+
     "<span class=\"title\">"+ title +"</span>"+
     "</div>"+
     " </h3>"+
     "<div class=\"meeta-event-accordion-body\" style=\"padding-left: 0px;\">"+
     "<p>"+description+"</p>"+
     "<br><br><h3>Instructor(s)</h3>"+
     "<div id=\"instructors-"+ keynoteId  +"\"></div>"+
      "</div>"+
      "</li>";

      for (let i in speakers) {
         renderKeynoteInstructors(getUsefulContents("lang", "../json/speakers"),speakers[i],keynoteId)
     }

        return sessionHtml;
}

async function renderKeynoteInstructors(fetchUrlSpeaker,speakerId, keynoteId){

        let speakersData = await fetchData(fetchUrlSpeaker);
        let speakerDetailsList = filterSpeakerById(speakersData,speakerId);
        let speaker = speakerDetailsList[0];

        let speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.id);
         
        let instructors = document.getElementById("instructors"+"-"+keynoteId);

        instructors.innerHTML +=  "<div class=\"col-lg-3\"><a href=\"" + speakerUrlDetail + "\"><img src=\"" + speaker.photoUrl +"\" style=\"border-radius: 5px;\"  alt=\""+speaker.name+"\"></a></div><h3 class=\"speaker-name\">" + speaker.name + " <span class=\"flag-icon " + speaker.countryFlag + "\"></span></h3>" +
        "<p class=\"speaker-designation\">" + speaker.title + "</p>" ;

}
