window.addEventListener('load', function() {

    var availableLanguages = ['es','es-ar','es-bo','es-cl','es-co','es-cr','es-do','es-ec','es-sv','es-gt','es-hn','es-mx','es-ni','es-pa','es-py','es-pe','es-pr','es-es','es-uy','es-ve'];
    var ln = getFirstBrowserLanguage() || 'en'; //If no locale is detected, fallback to 'en'

  //  window.navigator.language||navigator.browserLanguage||navigator.userLanguage;

    console.log("The language is: " + ln);

    var myApp = {}

    /**
     * Gets cookie value by name
     * @param  {string} name Name of cookie to retrieve
     * @return {string}      Value of cookie if found
     */
    myApp.ReadCookie = function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    /**
    * Removes cookie value
    * @param  {string} name Name of cookie
    */
    myApp.EraseCookie = function(name) {
        if ( myApp.ReadCookie(name) )
        document.cookie = name+'=';
        console.log(name+' erased.');
    };

    /**
    * Deletes cookie reference
    * @param  {string} name Name of cookie
    */
    myApp.DeleteCookie = function(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        console.log(name+' deleted.');
    };

    /**
    * Set cookie value
    * @param  {string} name Name of cookie
    */
    myApp.SetCookie = function(name, value, expires) {

        var cookiestring = [[name, '=', encodeURIComponent( value )].join('')];
        var expire_time = '';

        if ( expires ) {
            expire_time = new Date();
            expire_time.setTime( expire_time.getTime() + expires );
            expire_time = expire_time.toGMTString();
            cookiestring.push( ['expires=', expire_time ].join('') );
        }
        cookiestring = cookiestring.join(';')+';';
        document.cookie = cookiestring;
        console.log( 'SetCookie: '+ name +' set to "'+ value +'"', 'Expires?', expire_time );
    };

    if(myApp.ReadCookie('lang_redirect')) {
        return;
    }

    myApp.SetCookie('lang_redirect', ln);

    if(availableLanguages.includes(ln)){
        window.location.href = 'index.html?lang=es';
    }

});


var getFirstBrowserLanguage = function () {
    var nav = window.navigator,
    browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
    i,
    language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };
