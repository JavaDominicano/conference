import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

import {fetchData, filterSpeakerById} from '/js/fetch-util.js';

let filterConfirmedWorkshop = function(sessionsJson) {

      let workshopList = [];

      sessionsJson.forEach(sessionObj => workshopList.push(sessionObj));

      workshopList.sort(function(a, b){return a.id-b.id});

    let filteredWorkshops = workshopList.filter((session) => {
           return session.talk_format.indexOf("Workshop") !== -1;
    });

    return filteredWorkshops.filter(item => item.display === true);
}


let renderWorkshopsList = function(sessionJson) {
      let workshops = document.getElementById('workshopsList');

     sessionJson.forEach((workshop) => workshops.innerHTML += createWorkshopCard(workshop));

}


let sessionUrl = getUsefulContents("lang", "../json/sessions");
let jsonData = await fetchData(sessionUrl);

let filteredWorkshopList = filterConfirmedWorkshop(jsonData);
renderWorkshopsList(filteredWorkshopList);


$(document).on('click', '#workshopsList li.meeta-event-accordion-item > .meeta-event-accordion-toggle', function(){
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

function createWorkshopCard(workshop) {

  let workshopId = workshop.id;
  let title = workshop.title;
  let description = workshop.description;
  let speakers = workshop.speakers; 


  var sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
     "<h3 class=\"meeta-event-accordion-toggle\">"+
     "<div class=\"event-title\">"+
     "<span class=\"title\">"+ title +"</span>"+
     "<div id=\"instructors-"+ workshopId +"\"></div>"+
     "</div>"+
     " </h3>"+
     "<div class=\"meeta-event-accordion-body\" style=\"padding-left: 0px;\">"+
     "<p>"+description+"</p>"+
     "</div>"+
      "</li>";

      for (let i in speakers) {
         renderWorkshopInstructors(getUsefulContents("lang", "../json/speakers"),speakers[i],workshopId)
     }

        return sessionHtml;
}

async function renderWorkshopInstructors(fetchUrlSpeaker,speakerId, workshopId){

        let speakersData = await fetchData(fetchUrlSpeaker);
        let speakerDetailsList = filterSpeakerById(speakersData,speakerId);
        let speaker = speakerDetailsList[0];

        let speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.speakerId);
         
        let instructors = document.getElementById("instructors"+"-"+workshopId);

        instructors.innerHTML +=  "<a href=\"" + speakerUrlDetail + "\" title=\"See speaker details\">" + speaker.name + "</a> <span class=\"flag-icon " + speaker.countryFlag + "\"></span>";

}
