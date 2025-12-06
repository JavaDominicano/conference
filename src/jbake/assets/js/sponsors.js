
import { getUsefulContents, getUsefulLink } from '/js/util-url.js';
import {fetchData} from '/js/fetch-util.js';


function createSponsorCardRow(sponsorJson) {

    let rowHtml = "<h2>"+sponsorJson.packageName+"</h2>"+
            "<div class=\"row justify-content-center\">";

      sponsorJson.sponsors.filter(sponsor => sponsor.display === true).forEach((sponsor) => rowHtml += createSponsorCard(sponsor));

      rowHtml +=  "</div>";

      return rowHtml;
}

function createSponsorCard(sponsorJson) {

    return "<div class=\"col-lg-3 col-sm-6\">" +
        "<div class=\"meeta-sponsor-logo\">" +
        "<a href=\"" + sponsorJson.url + "\" target=\"_blank\" title=\"" + sponsorJson.name + "\"><img src=\"" + sponsorJson.logoUrl + "\" alt=\"" + sponsorJson.name + "\"></a>" +
        "</div>" +
        "</div>";
}


let sponsorList = function(sponsorsJson) {

      let sponsorsList = [];

      sponsorsJson.forEach(sponsorObj => sponsorsList.push(sponsorObj));


    return sponsorsList;
}

let renderSponsorList = function(sponsorsList) {
       let sponsorsHtml = document.getElementById('sponsorsList');

       sponsorsList.forEach(sponsor => sponsorsHtml.innerHTML += createSponsorCardRow(sponsor));

}


let sponsorUrl = "../json/sponsors.json";
let jsonData = await fetchData(sponsorUrl);
let geekSponsorList = sponsorList(jsonData);

renderSponsorList(geekSponsorList);

