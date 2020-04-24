//script

var clientID = "AB6Ss4YTrwuhkywv8RR1mF6odU3yQqDThZ5hutPqXRLq7xxn2F";
var clientSecret = "UXNg2qhxPyrFYHXzYd1Q4DmISm0BUki3Z7GxqIVu";
var redirectURI = "https://jonathynlee.github.io/CDSBusinessHealthApp/finance/finance.html";
var scope = "com.intuit.quickbooks.accounting"
var queryUrl = "https://appcenter.intuit.com/connect/oauth2";
var responseType = "code"
var realmid;
var authCode;
var authToken;
authToken = localStorage.financeToken;


jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
////////// Get Query Parameter Upon Return ///////////////
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
console.log("Authorization URL: " + queryUrl + "?client_id=" + clientID + "&response_type=" + responseType + "&scope=" + scope + "&redirect_uri=" + redirectURI + "&state=security_token");

function authorize() {
    window.location = queryUrl + "?client_id=" + clientID + "&response_type=" + responseType + "&scope=" + scope + "&redirect_uri=" + redirectURI + "&state=security_token";
}

function setAuth() {
    realmid = getUrlParameter("realmid");
    authCode = getUrlParameter("code");
    var state = getUrlParameter("state");
    getAuthToken();
}

function getAuthToken() {
    $.ajax({
        type: "POST",
        url: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer?code=" + authCode + "&redirect_uri=" + redirectURI + "&grant_type=authorization_code",
        success: function (response) {
            //console.log(response)
            authToken = response.access_token;
            localStorage.setItem("financeToken", authToken);
            // console.log(token)
            //createProject();




        }
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////    Will add this functionality back once we know Node.js  ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

if (authToken == undefined) {
    if (getUrlParameter("code") === "") {
      //  authorize();
    } else {
        //setAuth();
    }
} else {
    localStorage.setItem("financeToken", authToken);
}