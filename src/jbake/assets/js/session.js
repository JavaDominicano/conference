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

      sessionList.forEach((session, index) => {
           let title = session.title;
           let id = session.id;
           let abstract = session.abstract;
           let speakerId = session.speakers[0];
           let language = session.language;
           let tags = session.tags;
           let audienceLevel  = session.audience_level;
           let talkFormat = session.talk_format;
           let time = session.time;

         let speakerPromise = getSpeakerById(getUsefulContents("lang", "../json/speakers/"+speakerId));

           speakerPromise.then(function(speaker){
              sessions.innerHTML += createSessionCard(id,title,abstract,speaker, tags,language,audienceLevel,talkFormat, time, index);
           });
         });


});

function createSessionCard(id, title,abstract, speaker, tags, language,audienceLevel, talkFormat, time, index) {

  var speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.id);

  let  firstItem = index==0?"open": "";
     var sessionHtml = "<li class=\"meeta-event-accordion-item\">"+
     "<h3 class=\"meeta-event-accordion-toggle\">"+
     "<div class=\"image\">"+
     "<img src=\"" +speaker.photoUrl +"\" alt=\""+speaker.name+"\">"+
     "</div>"+
     "<div class=\"event-title\">"+
     "<span class=\"time\">"+time+"</span>"+
     "<span class=\"title\">"+ title +"</span>"+
     "</div>"+
     " </h3>"+
     "<div class=\"meeta-event-accordion-body "+ firstItem+"\">"+
     "<p>"+abstract+"</p>";

     let colorCount = 1;

     for (let i in tags) {
         sessionHtml += "<span class=\"category color-" + colorCount + "\">" + tags[i] + "</span>";
         colorCount++;
     }

    var lang = language==='es'? "Spanish" : "English";

     sessionHtml +="<p><strong>Language:</strong>"+lang +"</p>"+
     "<p><strong>Audience Level:</strong>"+audienceLevel +"</p>"+
     "<p><strong>Talk Format:</strong>"+talkFormat +"</p>"+

      "</div>"+
      "</li>";


        return sessionHtml;
}

function getSpeakerById(fetchUrlSpeaker){
 return fetch(fetchUrlSpeaker)
      .then(function (response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }

          return response.json();
      });
}
