import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "../json/workshops");

fetch(fetchUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (workshopJson) {

      var workshopList = [];
      for(let y in workshopJson){
        workshopList.push(workshopJson[y]);
      }

      workshopList.sort(function(a, b){return a.id-b.id});

      let workshops = document.getElementById('workshopsList');

      workshopList.forEach((workshop) => {
            workshops.innerHTML += createWorkshopCard(workshop);
     });


});

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
  let time = workshop.time;

  var sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
     "<h3 class=\"meeta-event-accordion-toggle\">"+
     "<div class=\"event-title\"><span class=\"time\">"+time+"</span>"+
     "<span class=\"title\">"+ title +"</span>"+
     "</div>"+
     " </h3>"+
     "<div class=\"meeta-event-accordion-body\" style=\"padding-left: 0px;\">"+
     "<p>"+description+"</p>"+
     "<br><br><h3>Instructor(s)</h3>"+
     "<div id=\"instructors-"+ workshopId  +"\"></div>"+
      "</div>"+
      "</li>";

      for (let i in speakers) {
         getSpeakerById(getUsefulContents("lang", "../json/speakers/"+speakers[i]),workshopId);                
     }

        return sessionHtml;
}

function getSpeakerById(fetchUrlSpeaker, workshopId){
 return fetch(fetchUrlSpeaker)
      .then(function (response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }

          return response.json();
      }).then(function(speaker){
             
        let speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.id);
         
        let instructors = document.getElementById("instructors"+"-"+workshopId);

        instructors.innerHTML +=  "<div class=\"image\"><a href=\"" + speakerUrlDetail + "\"><img src=\"" + speaker.photoUrl +"\" alt=\""+speaker.name+"\"></a></div><h3 class=\"speaker-name\">" + speaker.name + " <span class=\"flag-icon " + speaker.countryFlag + "\"></span></h3>" +
        "<p class=\"speaker-designation\">" + speaker.title + "</p>" ;
         
    });
      
}
