function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var speakerId = getURLParameter("id");

import { getUsefulContents } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "/archive/jconf2022/json/speakers/"+speakerId);

fetch(fetchUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (speakerJson) {
        var speakerDetails = document.getElementById('speakeDetails');
        // traitement de l'objet

        let speaker = speakerJson;

        speakerDetails.innerHTML += createSpeakerDetailsCard(speaker);

        findSessionBySpeakerId(getUsefulContents("lang", "/archive/jconf2022/json/sessions"), speaker.id);

});


function createSpeakerDetailsCard(speakerJson) {

    var speakerHtml = "<div class=\"col-md-6\">" +
        "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" class=\"img-fluid\"/>" +
        "</div>" +
        "<div class=\"col-md-6\">" +
        "<div class=\"details\">" +
        "<h2>"+speakerJson.name +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></h2>"+
        "<div class=\"social\">" ;

        for(let i in speakerJson.socials){
             speakerHtml += " <a href=\""+speakerJson.socials[i].link+"\" target=\"_blank\"><i class=\"fa fa-"+speakerJson.socials[i].icon+"\"></i></a> ";
        }

    speakerHtml +=  "</div>" +
        "<p>"+speakerJson.bio+"</p>"+
        "</div><br/>" +
        "<div class=\"details\" id=\"sessions\">"+
        "<h2>Sessions</h2>"+
        "<hr/>"+
        "</div>"+
        "</div>";

        return speakerHtml;
}


function findSessionBySpeakerId(fetchUrlSpeaker,speakerId){
   fetch(fetchUrlSpeaker)
      .then(function (response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }

          return response.json();
      }).then(function (sessionsJson) {
        var sessions = document.getElementById('sessions');

          for (let i in sessionsJson) {
              let speakerSession = sessionsJson[i].speakers[0];
              let title = sessionsJson[i].title;
              let id = sessionsJson[i].id;
              let description = sessionsJson[i].description;
              let language = sessionsJson[i].language;
              let tags = sessionsJson[i].tags;
              let audienceLevel  = sessionsJson[i].audience_level;
              let talkFormat = sessionsJson[i].talk_format;

              if(speakerId===speakerSession){
                 sessions.innerHTML += createSessionCard(id,title,description,tags,language,audienceLevel,talkFormat);
              }
          }

      });
}


function createSessionCard(id, title, description, tags, language,audienceLevel,talkFormat) {
    var sessionHtml = "<div class=\"row schedule-item\">" +
        "<div class=\"col\">" +
        "<h2>"+title+"</span></h2>"+
        "<p>"+description+"</p>"+
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
