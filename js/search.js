(function () {
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + window.googleSearchContext;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
})();
function parseParamsFromUrl() {
    var params = {};
    var parts = window.location.search.substr(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var keyValuePair = parts[i].split('=');
        var key = decodeURIComponent(keyValuePair[0]);
        params[key] = keyValuePair[1] ?
            decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) :
            keyValuePair[1];
    }
    return params;
}
var urlParams = parseParamsFromUrl();
var queryParamName = 'q';
if (urlParams[queryParamName]) {
    var langLink = $(".language-link").attr("href");
    $(".language-link").attr("href", langLink + window.location.search);
    $("#searchInput").val(urlParams[queryParamName]);
}