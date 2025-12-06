fetch("../json/supporters.json")
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (supportersJson) {
        let supportersHtml = document.getElementById('supportersList');

        supportersJson.filter(item => item.display === true).forEach(supporter => supportersHtml.innerHTML += createSupporterCard(supporter));

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