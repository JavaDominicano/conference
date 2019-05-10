function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

var speakerId = getURLParameter("id");

fetch('../json/speakers/'+speakerId+'.json')
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

        findSessionBySpeakerId(speaker.id);

});


function createSpeakerDetailsCard(speakerJson) {

    var speakerHtml = "<div class=\"col-md-6\">" +
        "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\" class=\"img-fluid\"/>" +
        "</div>" +
        "<div class=\"col-md-6\">" +
        "<div class=\"details\">" +
        "<h2>"+speakerJson.name +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></h2>"+
        "<div class=\"social\">" ;

        for(i in speakerJson.socials){
             speakerHtml += " <a href=\""+speakerJson.socials[i].link+"\" target=\"_blank\"><i class=\"fa fa-"+speakerJson.socials[i].icon+"\"></i></a> ";
        }

    speakerHtml +=  "</div>" +
        "<p> "+speakerJson.bio+"</p>"+
        "</div>" +
        "<hr/>"+
        "<h2>Sessions</h2>"+
        "<div class=\"details\" id=\"sessions\"></div>"+
        "</div>";

        return speakerHtml;
}


function findSessionBySpeakerId(speakerId){
   fetch('../json/sessions.json')
      .then(function (response) {
          if (!response.ok) {
              throw Error(response.statusText);
          }

          return response.json();
      }).then(function (sessionsJson) {
        var sessions = document.getElementById('sessions');

          for (i in sessionsJson) {
              let speakerSession = sessionsJson[i].speakers[0];
              let title = sessionsJson[i].title;
              let id = sessionsJson[i].id;
              let description = sessionsJson[i].description;
              let language = sessionsJson[i].language;
              let tags = sessionsJson[i].tags;
              let audienceLevel  = sessionsJson[i].audience_level;

              if(speakerId===speakerSession){
                 sessions.innerHTML += createSessionCard(id,title,description,tags,language,audienceLevel);
              }
          }

      });
}


function createSessionCard(id, title, description, tags, language,audienceLevel) {
    var sessionHtml = "<div class=\"row schedule-item\">" +
        "<div class=\"col\">" +

        "<h4>"+title +"</span></h4>"+
        "<p>"+ description +".</p>"+
        "<p><strong>Tags:</strong> ";

        var tagsHtml="";

        for(i in tags){
             tagsHtml += tags[i]+",";
        }

        var tagsFormatted = tagsHtml.substring(0, tagsHtml.length-1);
        var lang = language==='es'? "Spanish" : "English";

        sessionHtml += tagsFormatted+ "</p>"+
        "<p><strong>Language:</strong> "+lang +"</p>"+
        "<p><strong>Audience Level:</strong> "+audienceLevel +"</p>"+
        "</div>" +
        "</div>";

        return sessionHtml;
}
