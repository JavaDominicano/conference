
import { getUsefulContents } from '/js/util-url.js';

var fetchUrl = getUsefulContents("lang", "/archive/jconf2021/json/event-committee");

fetch(fetchUrl)
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (membersJson) {
        var members = document.getElementById('listMembers');
        // traitement de l'objet
        for (let i in membersJson) {
            members.innerHTML += createMemberCard(membersJson[i]);
        }
});


function createMemberCard(memberJson) {

       var memberHtml = "<div class=\"col-lg-3\">" +
        "<div class=\"single-speker-3\">" +
        "<div class=\"speker-img\">" +
        "<a href=\""+memberJson.socials[0].link+"\" target=\"_blank\"><img src=\"" +memberJson.photoUrl +"\" alt=\"" +memberJson.name +"\" /></a>" +
        "<div class=\"speker-content text-center\">"+
        "<h3 class=\"speaker-name\">"+memberJson.name+"</h3>"+
        "<span class=\"speaker-designation\">" +memberJson.badges[0].description +" @ " +memberJson.company+"</span>" +
        "</div>"+
        "</div>"+
        "</div>"+
        "</div>";

        return memberHtml;
}
