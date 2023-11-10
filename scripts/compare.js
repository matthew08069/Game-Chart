var matched = [];

const BACKGROUND_COLOR = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 145, 191,0.6)',
    'rgba(152, 226, 247, 0.6)',
    'rgba(205, 241, 174, 0.6)',
    'rgba(200, 150, 145, 0.6)',
    'rgba(200, 150, 145, 0.6)'
]

const params = (new URL(document.location)).searchParams;
const searchInput = params.get("game");

console.log(searchInput);

var firstGameID = parseInt(searchInput.slice(0, searchInput.indexOf(',')));
var secondGameID = parseInt(searchInput.slice(searchInput.indexOf(',') + 1, searchInput.length));

console.log(firstGameID);
console.log(secondGameID);

$(document).ready(function () {
    fetchingJSON();
});

function fetchingJSON () {
    $.getJSON("../data/games.json", function (myData) {
        for (let i = 0; i < myData.length; i++) {
            var game_id = parseInt(myData[i].ID);
            if (game_id == firstGameID || game_id == secondGameID) {
                var aGame = {
                    ID: myData[i].ID.toString(),
                    Name: myData[i].Name.toString(),
                    Platform: myData[i].Platform.toString(),
                    Year: myData[i].Year.toString(),
                    Genre: myData[i].Genre.toString(),
                    Publisher: myData[i].Publisher.toString(),
                    Developer: myData[i].Developer.toString(),
                    Critic_Score: myData[i].Critic_Score.toString(),
                    User_Score: myData[i].User_Score.toString(),
                    NA_Sales: myData[i].NA_Sales.toString(),
                    PAL_Sales: myData[i].PAL_Sales.toString(),
                    JP_Sales: myData[i].JP_Sales.toString(),
                    Other_Sales: myData[i].Other_Sales.toString(),
                    Global_Sales: myData[i].Global_Sales.toString(),
                    URL: myData[i].URL.toString()
                }
                // add game to array
                matched.push(aGame);
            }
        }
    }).done(function() {
        console.log("Finished fetching JSON");
        console.log(matched);
        displayLeftGame(matched);
        displayRightGame(matched);
        SetupMainChart(matched);
    });
}


function displayLeftGame(array_to_display) {
    document.getElementById("leftGameContainer").innerHTML = "";
    aGame = array_to_display[0];
    // create a div element to house the game
    var aListing = document.createElement("div");
    aListing.id = "anElement";
    if (aGame.URL.toString().toLowerCase().includes("notfound")) {
        var image = "../images/default.png";
    } else {
        var image = aGame.URL;
    }
    aListing.innerHTML = (
        "<div id='leftGameImage'>" +
        "<img id='thumbnail' src=" + image + ">" +
        "</div>" +
        "<div id='leftInfo'>" +
        "<p>" + aGame.Name + "</p>" +
        "<p> Year: " + aGame.Year + "</p>" +
        "<p> Genre: " + aGame.Genre + "</p>" +
        "<p> Platform: " + aGame.Platform + "</p>" +
        "<p> Developer: " + aGame.Developer + "</p>" +
        "<p> Publisher: " + aGame.Publisher + "</p>" +
        "<p> Global Sales: " + aGame.Global_Sales + " million</p>" +
        "<p> NA Sales: " + aGame.NA_Sales +  " million</p>" +
        "<p> PAL Sales: " + aGame.PAL_Sales + " million</p>" +
        "<p> Japan Sales: " + aGame.JP_Sales + " million</p>" +
        "<p> Other Sales: " + aGame.Other_Sales + " million</p>" +
        "</div>");
    $("#leftGameContainer").append(aListing);
}


function displayRightGame(array_to_display) {
    document.getElementById("rightGameContainer").innerHTML = "";
    aGame = array_to_display[1];
    // create a div element to house the game
    var aListing = document.createElement("div");
    aListing.id = "anElement";
    if (aGame.URL.toString().toLowerCase().includes("notfound")) {
        var image = "../images/default.png";
    } else {
        var image = aGame.URL;
    }
    aListing.innerHTML = (
        "<div id='rightGameImage'>" +
        "<img id='thumbnail' src=" + image + ">" +
        "</div>" +
        "<div id='rightInfo'>" +
        "<p>" + aGame.Name + "</p>" +
        "<p> Year: " + aGame.Year + "</p>" +
        "<p> Genre: " + aGame.Genre + "</p>" +
        "<p> Platform: " + aGame.Platform + "</p>" +
        "<p> Developer: " + aGame.Developer + "</p>" +
        "<p> Publisher: " + aGame.Publisher + "</p>" +
        "<p> Global Sales: " + aGame.Global_Sales + " million</p>" +
        "<p> NA Sales: " + aGame.NA_Sales +  " million</p>" +
        "<p> PAL Sales: " + aGame.PAL_Sales + " million</p>" +
        "<p> Japan Sales: " + aGame.JP_Sales + " million</p>" +
        "<p> Other Sales: " + aGame.Other_Sales + " million</p>" +
        "</div>");
    $("#rightGameContainer").append(aListing);
}





function SetupMainChart(array) {
    var labels2 = ["Global Sales", "NA Sales","PAL Sales", "Japan Sales", "Other Sales"];
    var datasets2 = getInitialChartData(array);
    var data2 = {
        labels: labels2,
        datasets: datasets2
    };
    var config2 = {
        type: 'bar',
        data: data2,
        options: {
            scales: {
                x: {
                    grid:{
                        display:false
                    },
                    ticks: {
                        color: 'blue',
                        //padding: 30,
                        font: {
                            size:20
                        }
                    }
                },
                y: {
                    title:{
                        display:true,
                        text:'Units Sold (in millions)',
                        fontSize: 25,
                        padding: 20,
                        font: {
                            size:20
                        }
                    },
                    // grid
                    grid:{
                        display:true
                    },ticks: {
                        color: 'blue',
                        font: {
                            size:15,
                        }
                    }
                }
            },
            plugins: {
                title:{
                    display:true,
                    text:'Game Sales',
                    font: {
                        size:25
                    },
                    padding: 30,
                },
                legend: {
                    display: true,
                    position:'bottom',
                    labels: {
                        color: 'rgb(0, 0, 0)',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'rectRounded',

                        font: {
                            weight: '600', // bold font
                            //size:15,
                        }
                    },
                    title: {
                        display: true,
                        text: 'Games',
                        font: {
                            size: 15,
                            weight: '600', // bold font
                        }
                    },
                },
                tooltip:{
                    enabled:true
                }
            },
            indexAxis: 'x',
            responsive:true,
            layout:{
                padding:{
                    left:0,
                    right:0,
                    bottom:0,
                    top:0
                }
            }
        }
    };

    multiBarChart = new Chart(
        document.getElementById('myChart'),
        config2
    );
}




function getInitialChartData(array){
    all_games = [];
    color_i = 0;
    for (var i = 0; i < array.length; i++){
        var newObj = {
            label: array[i].Name+ " ("+  array[i].Platform.toString() + ")",
            backgroundColor: BACKGROUND_COLOR[color_i],
            data: [
                array[i].Global_Sales,
                array[i].NA_Sales,
                array[i].PAL_Sales,
                array[i].JP_Sales,
                array[i].Other_Sales
            ],
            borderRadius: 3,   // gives the bars a curved corner
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        }
        all_games.push(newObj);
        color_i++;
    }
    return all_games;
}