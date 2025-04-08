fetch("../json/supporters.json")
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (supportersJson) {
        let supporters = document.getElementById('supportersList');
        // traitement de l'objet
        for (let i in supportersJson) {
            supporters.innerHTML += createSupporterCard(supportersJson[i]);
        }
    }).catch((error) => {
    console.error(error);
});


function createSupporterCard(supporterJson) {

    return "<div class=\"col-lg-3 col-sm-6\">" +
        "<div class=\"meeta-sponsor-logo\">" +
        "<a href=\"" + supporterJson.url + "\" target=\"_blank\" title=\"" + supporterJson.name + "\"><img src=\"" + supporterJson.logoUrl + "\" alt=\"" + supporterJson.name + "\"></a>" +
        "</div>" +
        "</div>";
}