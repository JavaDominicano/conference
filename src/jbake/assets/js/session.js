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
          let title = sessionsJson[i].title;
          let id = sessionsJson[i].id;
          let abstract = sessionsJson[i].abstract;
          let speakerId = sessionsJson[i].speakers[0];

          speakerPromise = getSpeakerById(speakerId);

          speakerPromise.then(function(speaker){
             sessions.innerHTML += createSessionCard(id,title,abstract,speaker);
          });
        }
});

function createSessionCard(id, title,abstract, speaker) {
    var sessionHtml = "<div class=\"row schedule-item\">" +
        "<div class=\"col-md-2\"><time></time></div>" +
        "<div class=\"col-md-10\">" +
        "<div class=\"speaker\">" +
        "  <img src=\"" +speaker.photoUrl +"\" alt=\""+speaker.name+"\">"+
        "</div>" +
        "<h4>"+title +". <span><a href=\"speaker-details.html?id=" + speaker.id + "\">"+speaker.name+"</a></span></h4>"+
        "<p>"+ abstract +".</p>"+
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
