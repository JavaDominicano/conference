fetch("../json/sponsors.json")
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (sponsorsJson) {
        let sponsors = document.getElementById('sponsorsList');
        // traitement de l'objet
        for (let i in sponsorsJson) {
            sponsors.innerHTML += createSponsorCard(sponsorsJson[i]);
        }
    }).catch((error) => {
    console.error(error);
});


function createSponsorCard(sponsorJson) {

    return "<div class=\"col-lg-3 col-sm-6\">" +
        "<div class=\"meeta-sponsor-logo\">" +
        "<a href=\"" + sponsorJson.url + "\" target=\"_blank\" title=\"" + sponsorJson.name + "\"><img src=\"" + sponsorJson.logoUrl + "\" alt=\"" + sponsorJson.name + "\"></a>" +
        "</div>" +
        "</div>";
}