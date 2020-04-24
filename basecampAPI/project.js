function createProject(){
    /*var queryURL="https://api.clubhouse.io/api/v2/projects?token=";
    var token="5db2beec-faf0-4652-a40f-0f0e22b27b46";
    

    project={
        name: "foo"
    }


    $.ajax({
        contentType: 'application/json;charset=utf-8',
        data :JSON.stringify(project),
        type:"POST",
        url: queryURL+token,
        datatype:'json',

        error: function (request, textStatus, errorThrown) {
            alert(errorThrown);
   
       },
        success: function(response){console.log(response);}
    
      })
      var queryURL2="https://api.clubhouse.io/api/v2/categories?token=";
    $.ajax({
       url:queryURL2+token,
       method:"GET"
    }).then(function(response){
        console.log("Categories:"+response);

    });*/

    project={
        name: "test",
        description: "test"
    }
    
   /* function getToken(){
        var OAuth = require('@zalando/oauth2-client-js');
        var basecamp = new OAuth.Provider({
            id: 'basecamp',   // required
            authorization_url: "https://launchpad.37signals.com/authorization/token "// required
        });

       // Create a new request
        var request = new OAuth.Request({
            client_id: 'my_client_id',  // required
            redirect_uri: 'http://my.server.com/auth-answer'
        });
        
        // Give it to the provider
        var uri = google.requestToken(request);
        
        // Later we need to check if the response was expected
        // so save the request
        google.remember(request);
        
        // Do the redirect
        window.location.href = uri;
    }*/
    var accountNo="4315479";
    //var accountNo2="4314062";
    
    var code="BAhbB0kiAbB7ImNsaWVudF9pZCI6IjlkMjFiODdiYjA5ZDRiMDI2OTc1YmFiYWFhYmVkYjMwYmE5ZTRmZTgiLCJleHBpcmVzX2F0IjoiMjAxOS0xMS0xMlQwODowMTo1NVoiLCJ1c2VyX2lkcyI6WzQwNjQwNTczXSwidmVyc2lvbiI6MSwiYXBpX2RlYWRib2x0IjoiM2I4NDY3YzVkNDg4M2VlNzhiMzc5NGI1ZDUwODkzNjMifQY6BkVUSXU6CVRpbWUNiOkdwNb3egcJOg1uYW5vX251bWl1Og1uYW5vX2RlbmkGOg1zdWJtaWNybyIHESA6CXpvbmVJIghVVEMGOwBG--d79b418fa4a2eab062d25bc09ac63747fb022d06";
    var queryURL="https://3.basecampapi.com/";
    
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    $.ajax({
        contentType: 'application/json;charset=utf-8',
        beforeSend: function(xhr) { 
            if(this.url.crossDomain&& jQuery.support.cors){
                this.url= 'https://cors-anywhere.herokuapp.com/'+this.url;
            }
            xhr.setRequestHeader("Authorization","Bearer "+btoa(code)); 
            //xhr.setRequestHeader("User-Agent"," CDS Business Health Project (aysenunlu@gmail.com)");
          },
        processData:false, 
        data : JSON.stringify(project),
        type:"POST",
        url: queryURL+accountNo+"/projects.json",
        datatype:'json',

        error: function (request, textStatus, errorThrown) {
            alert(errorThrown);
   
       },
        success: function(response){console.log(response);}
    
      })
}
createProject();