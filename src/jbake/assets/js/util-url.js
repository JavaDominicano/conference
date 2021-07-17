function getQuerystring (key) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
            return pair[1];
        }
    }
}

export function getUsefulContents(key, fetchUrl) {
    var lang = getQuerystring(key);

    if(lang==='es'){
      fetchUrl = fetchUrl+'_es';
    }
    return fetchUrl+".json";
}
