
var APIProjects = [];
var usefulArray = [];
var memberInfo = [];


statusAPI = ["on schedule", "falling behind", "overdue"];
priority = ["high", "medium", "low"];

var accountID = "3736340";
var clientID = "f83106024123731e9dd7114e6a6361bd81ba241f";
var clientSecret = "0a18b9b736b153a492513183f1992346f094b8c7";

var redirectURI = "https://jonathynlee.github.io/CDSBusinessHealthApp/ProjectView/index.html";
var token;

var queryURL = "https://3.basecampapi.com/";
var code;
var globalData;

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
    console.log("getting code ...")
    code = getUrlParameter('code');
    console.log(code)
}
///////////////////////

//////////////////////
function getToken() {
    $.ajax({
        type: "POST",
        url: "https://launchpad.37signals.com/authorization/token?type=web_server&client_id=" + clientID + "&redirect_uri=" + redirectURI + "&client_secret=" + clientSecret + "&code=" + code,
        success: function (response) {
            //console.log(response)
            token = response.access_token;
            localStorage.setItem("token", token);
            // console.log(token)
            //createProject();
            getAllProjects();



        }
    })
}



/////////////////////////////////////////////////////////////////////

function getToDoSets() {

    for (var i = 0; i < APIProjects.length; i++) {//APIProjects.length;
        var u = APIProjects[i].url;
        //console.log(u);
        $.ajax({
            contentType: 'application/json;charset=utf-8',

            //processData:false, 

            type: "GET",
            headers: {
                "Authorization": "Bearer " + token
            },
            url: u,
            datatype: 'json',

            error: function (request, textStatus, errorThrown) {
                alert(errorThrown);

            },
            success: function (response) {
                r = JSON.stringify(response);
                //console.log(r);

                toDoSets = JSON.parse(r);
                var id = toDoSets.id
                var completed = toDoSets.completed;
                var ratio = toDoSets.completed_ratio;
                var listCount = toDoSets.todolists_count;
                var todolistsUrl = toDoSets.todolists_url;
                //console.log(todolistsUrl); 

                var entry = {
                    id: id,
                    completed: completed,
                    ratio: ratio,
                    listCount: listCount,
                    todolistsUrl: todolistsUrl
                }
                usefulArray.push(entry);


            }
        });
        getProjectMembers(i);//get project members
    }


}
/////////////////////////////////////////////////////////////////////

function getProjectMembers(i) {
    var pID = APIProjects[i].ID;
    var u = queryURL + accountID + "/projects/" + pID + "/people.json";
    //console.log(pID);
    $.ajax({
        contentType: 'application/json;charset=utf-8',

        //processData:false, 

        type: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
        url: u,
        datatype: 'json',

        error: function (request, textStatus, errorThrown) {
            alert(errorThrown);

        },
        success: function (response) {
            // console.log(response);
            for (var k = 0; k < response.length; k++) {
                var employee = {
                    id: response[k].id,
                    name: response[k].name,
                    emailAddress: response[k].email_address,
                    title: response[k].title,
                    personableType: response[k].personable_type

                }
                memberInfo.push(employee);
            }
            APIProjects[i].members.push(memberInfo);
            memberInfo = [];
            //console.log("Project:"+i+":"+JSON.stringify(APIProjects[i].members));

        }
    });


}
/////////////////////////////////////////////////////////////////////
function getAllProjects() {

    $.ajax({
        contentType: 'application/json;charset=utf-8',

        //processData:false, 

        type: "GET",
        headers: {
            "Authorization": "Bearer " + token
        },
        url: queryURL + accountID + "/projects.json",
        datatype: 'json',

        error: function (request, textStatus, errorThrown) {
            alert(errorThrown);

        },
        success: function (response) {

            for (var i = 0; i < response.length; i++) {
                projectAPI = new Object();
                projectAPI.ID = response[i].id;
                projectAPI.name = response[i].name;
                projectAPI.startDate=response[i].created_at;
                projectAPI.url = response[i].dock[2].url;
                projectAPI.status = statusAPI[randomNumberGenerator()];
                projectAPI.priority = priority[randomNumberGenerator()];
                projectAPI.pinned = false;
                projectAPI.members = [];//////////////////////////////////////////
                APIProjects.push(projectAPI);

            }
            //console.log(APIProjects);
            viewProjects();
            getToDoSets();

        }
    });


}
////////////////////////////////////////////////////////////////////
var localToken = localStorage.token;
if (localToken != null && localToken != undefined) {

    token = localToken;
    getAllProjects();
} else {
    getCode();
    if (!code) {
        authorize();
    } else {

        getToken();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function randomNumberGenerator() {
    return Math.floor(Math.random() * 3);
}

///VIEW MEMBER INFO OF A PROJECT//////////
function viewMember(index) {
    var project = APIProjects[index];
    $("#mbody").empty();
    var r = JSON.stringify(project.members);
    var o = JSON.parse(r)
    for (var v = 0; v < o[0].length; v++) {
        var memberID = o[0][v].id;
        var memberName = o[0][v].name;
        var memberEmail = o[0][v].emailAddress;
        var memberPersonableType = o[0][v].personableType;
        var memberTitle = o[0][v].title;

        var row = $("<tr>");
        var data1 = $("<th scope='row'>" + memberID + "</th>");
        row.append(data1);

        var data1 = $("<td>");
        data1.append("<span>" + memberName + "</span>");
        $(row).append(data1);

        data1 = $("<td>");
        data1.append("<span>" + memberEmail + "</span>");
        $(row).append(data1);

        data1 = $("<td>");
        data1.append("<span>" + memberPersonableType + "</span>");
        $(row).append(data1);

        data1 = $("<td>");
        data1.append("<span>" + memberTitle + "</span>");
        $(row).append(data1);

        $("#mbody").append(row);
    }

}

/////////////resize modal////////////
$('#myModal2').on('show', function () {
    $(this).find('.modal-body').css({
        width: 'auto', //probably not needed
        height: 'auto', //probably not needed 
        'max-height': '100%'
    });
});
//////////////////
function viewTasks(index) { //index

    var project = usefulArray[index];
    $("#tbody").empty();

    var id = project.id;
    var completed = project.completed;
    var ratio = project.ratio;
    var listCount = project.listCount;

    var row = $("<tr>");
    var index = $("<th scope='row'>" + id + "</th>");
    row.append(index);
    var data1 = $("<td>");
    data1.append("<span>" + completed + "</span>");
    $(row).append(data1);

    data1 = $("<td>");
    data1.append("<span>" + ratio + "</span>");
    $(row).append(data1);

    data1 = $("<td>");
    data1.append("<span>" + listCount + "</span>");
    $(row).append(data1);

    $("#tbody").append(row);

}
////////////////////////////////////////////////////////////////
// LOOK FOR GLOBAL DATA

var globalData = JSON.parse(localStorage.getItem("globalData"));
var numProjectData = 0;
console.log(globalData);
if (globalData != null){
}else{
    console.log("2");
    
    globalData = {"projectData":{}};
}

//VIEW PROJECTS,THEIR STATUS AND PRIORITY
function viewProjects() {

    for (var i = 0; i < APIProjects.length; i++) {
        numProjectData++;
        var row = $("<tr>");
        var index = $("<th scope='row'>" + APIProjects[i].ID + "</th>");
        //ADD PINS AND DATA
        if(globalData["projectData"][JSON.stringify(APIProjects[i].ID)] != undefined ){
            var pinned = globalData["projectData"][JSON.stringify(APIProjects[i].ID)].pinned;

        }else{
            
            var pinned = false;
            globalData["projectData"][JSON.stringify(APIProjects[i].ID)] = {}
            globalData["projectData"][JSON.stringify(APIProjects[i].ID)]["pinned"] = false;
            globalData["projectData"][JSON.stringify(APIProjects[i].ID)]["id"] = APIProjects[i].ID;
            globalData["projectData"][JSON.stringify(APIProjects[i].ID)]["title"] = APIProjects[i].name;
            globalData["projectData"][JSON.stringify(APIProjects[i].ID)]["status"] = APIProjects[i].status;
            globalData["projectData"][JSON.stringify(APIProjects[i].ID)]["startDate"] = APIProjects[i].startDate;
            
        }
        if (pinned){
            var pinImage = "../assets/images/unpin.png";
        }else{
            var pinImage = "../assets/images/pin.png";
        }
        var pinButton = $("<button class = \"pinButton\" pinned = \""+pinned+"\" project = \""+APIProjects[i].ID+"\"><img class  = \"pinImage\" src =\"" +pinImage+"\"></button>");
        pinButton.on("click",switchPin);
        index.append(pinButton);

        row.append(index);
        var str = "viewTasks(" + i + ")";

        var button = $("<button class='btn btn-info btn-block' data-toggle='modal' data-target='#myModal' onclick='" + str + "'" + "id='titleButton" + i + "'>" + APIProjects[i].name + "</button>");
        var data1 = $("<td>");
        data1.append(button);
        $(row).append(data1);

        str = "viewMember(" + i + ")";
        button = $("<button class='btn btn-info btn-block' data-toggle='modal' data-target='#myModal2' onclick='" + str + "'" + "id='memberButton" + i + "'>" + "Members" + "</button>");
        data1 = $("<td>");
        data1.append(button);
        $(row).append(data1);
        ///////////////////////////////////////////////
        if (APIProjects[i].status == "on schedule") {
            button = $("<button class='btn btn-success btn-block' id='statusButton" + i + "'>" + APIProjects[i].status + "</button>");
        }
        else if (APIProjects[i].status == "falling behind") {
            button = $("<button class='btn btn-warning btn-block' id='statusButton" + i + "'>" + APIProjects[i].status + "</button>");
        }
        else if (APIProjects[i].status == "overdue") {
            button = $("<button class='btn btn-danger btn-block' id='statusButton" + i + "'>" + APIProjects[i].status + "</button>");
        }
        data1 = $("<td>");
        data1.append(button);
        $(row).append(data1);
        ///////////////////////////////////////////////
        if (APIProjects[i].priority == "low") {
            button = $("<button class='btn btn-success btn-block' id='priorityButton" + i + "'>" + APIProjects[i].priority + "</button>");
        }
        else if (APIProjects[i].priority == "medium") {
            button = $("<button class='btn btn-warning btn-block' id='priorityButton" + i + "'>" + APIProjects[i].priority + "</button>");
        }
        else if (APIProjects[i].priority == "high") {
            button = $("<button class='btn btn-danger btn-block' id='priorityButton" + i + "'>" + APIProjects[i].priority + "</button>");
        }
        data1 = $("<td>");
        data1.append(button);
        $(row).append(data1);
        ///////////////////////////////////////////////

        $("#pbody").append(row);




    }
    globalData.numProjects = numProjectData;
    localStorage.setItem("globalData",JSON.stringify(globalData));
}



/////////////// PIN SWITCH EVENT ////////////////
function switchPin(event){
    console.log("switching");
    var pinButton = event.target;
    var pinStatus = pinButton.getAttribute("pinned");
    var projectID = pinButton.getAttribute("project");
    console.log(pinStatus);
var pinImg = pinButton.querySelector("img")
var project  = pinButton.getAttribute("project")
console.log(project);

if (pinStatus == "true"){
    pinButton.setAttribute("pinned","false");
    globalData["projectData"][project]["pinned"] = false;
    var pinImage = "../assets/images/pin.png";
}else{
    pinButton.setAttribute("pinned","true");
    globalData["projectData"][project]["pinned"] = true;
    var pinImage = "../assets/images/unpin.png";
}
pinImg.setAttribute("src",pinImage);
localStorage.setItem("globalData",JSON.stringify(globalData));
}




