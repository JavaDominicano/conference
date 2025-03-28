fetch('/archive/jconf2019/json/sessions.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (sessionsJson) {
        var sessions = document.getElementById('sessions');

        // traitement de l'objet
        for (i in sessionsJson) {
          let title = sessionsJson[i].title;
          let id = sessionsJson[i].id;
          let abstract = sessionsJson[i].abstract;
          let speakerId = sessionsJson[i].speakers[0];
          let language = sessionsJson[i].language;
          let tags = sessionsJson[i].tags;
          let audienceLevel  = sessionsJson[i].audience_level;
          let talkFormat = sessionsJson[i].talk_format;
          let time = sessionsJson[i].time;

          speakerPromise = getSpeakerById(speakerId);

          speakerPromise.then(function(speaker){
             sessions.innerHTML += createSessionCard(id,title,abstract,speaker, tags,language,audienceLevel,talkFormat, time);
          });
        }
});

function createSessionCard(id, title,abstract, speaker, tags, language,audienceLevel, talkFormat, time) {
    var sessionHtml = "<div class=\"row schedule-item\">" +
        "<div class=\"col-md-2\"><time>"+time+"</time></div>" +
        "<div class=\"col-md-10\">" +
        "<div class=\"speaker\">" +
        "  <img src=\"" +speaker.photoUrl +"\" alt=\""+speaker.name+"\">"+
        "</div>" +
        "<h4>"+title +"<span><a href=\"speaker-details.html?id=" + speaker.id + "\"> "+speaker.name+"</a></span></h4>"+
        "<p>"+abstract+"</p>"+
        "<p><strong>Tags:</strong>";

        var tagsHtml="";

        for(i in tags){
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

function getSpeakerById(speakerId){
 return fetch('../json/speakers/'+speakerId+'.json')
      .then(function (response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }

          return response.json();
      });
}
