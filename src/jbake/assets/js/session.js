fetch('../json/sessions.json')
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
            sessions.innerHTML += createSessionCard(sessionsJson[i]);
        }
});

function createSessionCard(sessionJson) {

  speakerJson = getSpeakerById(sessionJson.speakers[0]);

  var photoUrl;
  var speakerName;
  speakerJson.then(function(speaker){
    photoUrl = speaker.photoUrl;
    speakerName = speaker.name;
  });

    var sessionHtml = "<div class=\"row schedule-item\">" +
        "<div class=\"col-md-2\"><time></time></div>" +
        "<div class=\"col-md-10\">" +
        "<div class=\"speaker\">" +
        "  <img src=\"" +photoUrl +"\" alt=\""+speakerName+"\">"+
        "</div>" +
        "<h4>"+sessionJson.title +". <span>"+speakerName+"</span></h4>"+
        "<p>"+ sessionJson.abstract +".</p>"+
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
