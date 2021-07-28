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

      let sessions = document.getElementById('sessions');

      sessionList.forEach((session) => {
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
              sessions.innerHTML += createSessionCard(id,title,abstract,speaker, tags,language,audienceLevel,talkFormat, time);
           });
         });


});

function createSessionCard(id, title,abstract, speaker, tags, language,audienceLevel, talkFormat, time) {

  var speakerUrlDetail =  getUsefulLink("lang", "speaker-details.html?id=" + speaker.id);

    var sessionHtml = "<div class=\"row schedule-item\">" +
        "<div class=\"col-md-2\"><time>"+time+"</time></div>" +
        "<div class=\"col-md-10\">" +
        "<div class=\"speaker\">" +
        "  <img src=\"" +speaker.photoUrl +"\" alt=\""+speaker.name+"\">"+
        "</div>" +
        "<h4>"+title +"<span><a href=\"" + speakerUrlDetail + "\"> "+speaker.name+"</a></span></h4>"+
        "<p>"+abstract+"</p>"+
        "<p><strong>Tags:</strong>";

        var tagsHtml="";

        for(let i in tags){
             tagsHtml += tags[i]+",";
        }

        var tagsFormatted = tagsHtml.substring(0, tagsHtml.length-1);
        var lang = language==='es'? "Spanish" : "English";

        sessionHtml += tagsFormatted+ "</p>"+
        "<p><strong>Language:</strong>"+lang +"</p>"+
        "<p><strong>Audience Level:</strong>"+audienceLevel +"</p>"+
        "<p><strong>Talk Format:</strong>"+talkFormat +"</p>"+
        "</div>" +
        "</div>";

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
