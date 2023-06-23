fetch("../json/sponsors.json")
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (sponsorsJson) {
        var sponsors = document.getElementById('sponsorsList');
        // traitement de l'objet
        for (let i in sponsorsJson) {
            sponsors.innerHTML += createSponsorCard(sponsorsJson[i]);
        }
});


function createSponsorCard(sponsorJson) {

         var sponsorHtml = "<div class=\"col-lg-3 col-sm-6\">"+
                            "<div class=\"meeta-sponsor-logo\">"+
                            "<a href=\"" + sponsorJson.url+ "\" target=\"_blank\" title=\""+sponsorJson.name+"\"><img src=\""+sponsorJson.logoUrl+"\" alt=\""+sponsorJson.name+"\"></a>"+
                            "</div>"+
                            "</div>";

  
          return sponsorHtml;
  }