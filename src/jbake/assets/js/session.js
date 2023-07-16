import { getUsefulContents, getUsefulLink } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "../json/sessions");

fetch(fetchUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (sessionsJson) {

      var sessionList = [];
      for(let y in sessionsJson){
        sessionList.push(sessionsJson[y]);
      }

      sessionList.sort(function(a, b){return a.id-b.id});

      let sessions = document.getElementById('sessionsList');

      sessionList.forEach((session) => {
           let title = session.title;
           let abstract = session.abstract;
           let speakerId = session.speakers[0];

           let time = session.time;

         let speakerPromise = getSpeakerById(getUsefulContents("lang", "../json/speakers/"+speakerId));

           speakerPromise.then(function(speaker){
              sessions.innerHTML += createSessionCard(title,abstract,speaker, time);
           });
         });


});

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


function createSessionCard(title,abstract, speaker,time) {

  var speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.id);

     var sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
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
  return await response.json();
      
}
