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

    var speakerHtml ="<div class=\"col-lg-4\">"+
     "<div class=\"speaker-image-box text-center\">"+
     "<div class=\"speaker-image\">"+
     "<img src=\"" +speakerJson.photoUrl +"\" alt=\"" +speakerJson.name +"\"/>" +
     "</div>"+
     "<div class=\"speaker-content\">"+
     "<h3 class=\"speaker-name\">"+speakerJson.name +" <span class=\"flag-icon "+speakerJson.countryFlag+"\"></span></h3>"+
     "<p class=\"speaker-designation\">"+speakerJson.title +"</p>"+
     "<div class=\"speaker-social\">"+
     "<ul>";
 
     for(let i in speakerJson.socials){
        let icontype = "";
        switch (speakerJson.socials[i].icon) {
          case 'twitter':
            icontype = "fab fa-twitter";
            break;
          case 'facebook':
            icontype = "fab fa-facebook-f";
            break;
          case 'pinterest':
            icontype = "fab fa-pinterest-p";
            break;
          case 'link':
            icontype = "fa fa-link";
            break;  
          default:
           icontype = "fa fa-link"; 
        }
  
        speakerHtml += "<li> <a class=\"share-"+speakerJson.socials[i].icon+"\"  href=\""+speakerJson.socials[i].link+"\" target=\"_blank\"><i class=\""+icontype+"\"></i></a> </li>";
  
     }
   
     speakerHtml +="</ul>"+
                 "</div>"+
             "</div>"+
         "</div>"+
   "</div>"+
  "<div class=\"col-lg-8\">"+
  "<div class=\"speaker-single-right\">"+
  "<div class=\"speaker-single-info-wrap\">"+
  "<div class=\"speaker-biography\">"+
  "<h3 class=\"main-title\">Biography</h3>"+
  "<p>"+speakerJson.bio+"</p>"+
  "</div>"+         
  "</div>"+
  "<div class=\"meeta-event-featured\">"+
  "<h3 class=\"main-title\">Sessions</h3>"+
  "<div class=\"row\" id=\"sessions\"></div>"+
  "</div>"
  "</div>"
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
 
       let title = sessionsJson[i].title;
       let id = sessionsJson[i].id;
       let description = sessionsJson[i].description;
       let language = sessionsJson[i].language;
       let tags = sessionsJson[i].tags;
       let audienceLevel  = sessionsJson[i].audience_level;
       let talkFormat = sessionsJson[i].talk_format;
 
       if(sessionsJson[i].speakers.includes(speakerId)){
         sessions.innerHTML += createSessionCard(id,title,description,tags,language,audienceLevel,talkFormat);
       }
     }
 
   });
 }
 
 
 function createSessionCard(id, title, description, tags, language,audienceLevel,talkFormat) {
   var sessionHtml = "<div class=\"col-md-12\">"+
   "<div class=\"single-item\">"+   
       "<div class=\"featured-content\">";
       let colorCount = 1;
 
       for(let i in tags){
         sessionHtml += "<span class=\"category color-"+colorCount+"\">"+tags[i]+"</span>";
         colorCount++;
       }
 
       sessionHtml += "<h3>"+title+"</h3>"+
        "<p>"+description+"</p>";
 
       var lang = language==='es'? "Spanish" : "English";
 
      sessionHtml += "<p><strong>Language:</strong>"+lang +"</p>"+
      "<p><strong>Audience Level:</strong>"+audienceLevel +"</p>"+
      "<p><strong>Talk Format:</strong>"+talkFormat +"</p>"+
      "</div>"+
      "</div>"+
      "</div>";
 
   return sessionHtml;
 }
 