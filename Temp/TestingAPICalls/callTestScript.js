console.log("test")
var accountID = "3736340";
var clientID = "6016c6aa882dfbed2b5349ef0cc816220eaf02c6";
var clientSecret = "b8e579f7c6bdc759b3016264dfcad65e1ae23ddb";
var redirectURI = "http://127.0.0.1:5500/callTest.html";
var token;
var queryURL = "https://3.basecampapi.com/";
var code;
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function authorize() {
   
    console.log("authorization")
    window.location = "https://launchpad.37signals.com/authorization/new?type=web_server&client_id=" + clientID + "&redirect_uri=" + redirectURI;


}
function getCode() {
    code = getUrlParameter('code');
    console.log(code)
}
function getToken() {
    $.ajax({

        type:"POST",
        url: "https://launchpad.37signals.com/authorization/token?type=web_server&client_id=" + clientID + "&redirect_uri=" + redirectURI + "&client_secret=" + clientSecret + "&code=" + code,
        success: function (response) {
            console.log(response)
            token = response.access_token;
            console.log(token)
        }
    })
}


function createProject() {
    project = {
        name: "test",
        description: "test"
    }



    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });


    $.ajax({
        contentType: 'application/json;charset=utf-8',
        
        //processData:false, 

        type: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
        url:"https://3.basecampapi.com/3736340/buckets/9310996/todosets/1331815655/todolists.json",
        //url: queryURL + accountID + "/projects.json",
        datatype: 'json',

        error: function (request, textStatus, errorThrown) {
            alert(errorThrown);

        },
        success: function (response) { 
            for(var i=0;i< response.length;i++){
                var div = $("<div>");
                var currentData = response[i];
                currentName = currentData.name;
                div.html("Project "+i +": "+ currentName);
                $("body").append(div);
            }
            console.log(response);
            console.log(response.length);
        
        }

    })
}