fetch('/archive/jconf2024/json/gallery.json')
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response.json();
    })
    .then(function (galleryJson) {
        var gallery = document.getElementById('homeGallery');
        // traitement de l'objet
        for (let i in galleryJson.images) {
            gallery.innerHTML += createSingleGallery(galleryJson.event_name,galleryJson.event_url, galleryJson.images[i]);
        }

       enableGallery();
    });   
  
  

function createSingleGallery(event_name,event_url,image) {
  
    let galleryHtml = "<div class=\"col-xl-3 col-lg-4 col-sm-6\">" +
        "<div class=\"single-gallery\">" +
        "<div class=\"gallery-image\">" +
        "<img src=\"" + image.image_url + "\" alt=\"" + image.title + "\">" +
        "</div><div class=\"gallery-content\">" +
        "<div class=\"gallery-content-wrap\">" +
        "<a href=\"" + image.image_url + "\" class=\"gallery-plus image-popup\"><span></span></a>" +
        "<h4 class=\"gallery-title\"><a href=\"" + event_url + "\">" + event_name +" <br> "+ image.title + "</a></h4>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    return galleryHtml;
}

function enableGallery(){
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery:{
          enabled:true
        }
    });
}