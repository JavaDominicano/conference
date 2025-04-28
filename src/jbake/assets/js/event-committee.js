import { getUsefulContents } from '/js/util-url.js';
import {fetchData} from '/js/fetch-util.js';

let fetchEventCommitteeUrl = getUsefulContents("lang", "../json/event-committee");

function createMemberCard(memberJson) {

    let memberHtml = "<div class=\"col-lg-3\">" +
     "<div class=\"single-speker-3\">" +
     "<div class=\"speker-img\">" +
     "<a href=\""+memberJson.socials[0].link+"\" target=\"_blank\"><img src=\"" +memberJson.photoUrl +"\" alt=\"" +memberJson.name +"\" title=\""+memberJson.shortBio +"\"/></a>" +
     "<div class=\"speker-content text-center\">"+
     "<h3 class=\"speaker-name\">"+memberJson.name+"</h3>"+
     "<span class=\"speaker-designation\">" +memberJson.badges[0].description +" @ " +memberJson.company+"</span>" +
     "</div>"+
     "</div>"+
     "</div>"+
     "</div>";

     return memberHtml;
}

let renderEventCommittee = function(eventCommitteeJson){

      let members = document.getElementById('listMembers');

      eventCommitteeJson.forEach(membersJson => members.innerHTML += createMemberCard(membersJson));
}

let jsonData = await fetchData(fetchEventCommitteeUrl);

renderEventCommittee(jsonData);