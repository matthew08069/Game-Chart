//var all_listings = [];
var game_found = null;
const params = (new URL(document.location)).searchParams;
const searchInput = params.get("game");

$(document).ready(function () {
    findGame();
});

function findGame () {
    $.getJSON("../data/games.json", function (myData) {
        for (let i = 0; i < myData.length; i++) {
            if (myData[i].ID == parseInt(searchInput)) {
                game_found = {
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
            }
        }
        if (game_found!=null) {
            //all_listings.push(aGame);
            var aListing = document.createElement("div");
            aListing.id = "anElement";
            if (game_found.URL.toString().toLowerCase().includes("notfound")) {
                var image = "../images/default.png";
            } else {
                var image = game_found.URL;
            }

            aListing.innerHTML = (
                "<div id='individualGame' class='row'>" +
                    "<div id='listingThumbnailContainer' class='column'>" +
                        "<img id='thumbnail' src=" + image + " >" +
                    "</div>" +
                    "<div class='column'>" +
                        "<h3>" + game_found.Name + "</h3>" +
                        "<p>" + game_found.Genre + "</p>" +
                        "<p>" + game_found.Year + "<br><br></p>" +
                    "</div>" +
                    "<div class='column'>" +
                        "<p>" + "Platform: " + game_found.Platform + "</p>" +
                        "<p>" + "Developer: " + game_found.Developer + "</p>" +
                        "<p>" + "Publisher: " + game_found.Publisher + "</p>" +
                        "<p>" + "Global Sales: " +game_found.Global_Sales + " million"+ "</p>" +
                        "<p>" + "NA Sales: " +game_found.NA_Sales + " million"+ "</p>" +
                        "<p>" + "PAL Sales: " +game_found.PAL_Sales + " million"+ "</p>" +
                        "<p>" + "Japan Sales: " +game_found.JP_Sales + " million"+ "</p>" +
                        "<p>" + "Other Sales: " +game_found.Other_Sales + " million" + "</p>" +
                    "</div>" +
                "</div>");

            //I hate having to write this here but this was the only way to get game_found while it was not null
            let salesChart = document.getElementById("salesChart").getContext('2d');
            let singleGameChart = new Chart(salesChart, {
                type: 'bar',
                data: {
                    labels: ["Global Sales", "NA Sales", "PAL Sales", "Japan Sales", "Other Sales"],
                    datasets: [{
                        data: [
                            game_found.Global_Sales,
                            game_found.NA_Sales,
                            game_found.PAL_Sales,
                            game_found.JP_Sales,
                            game_found.Other_Sales
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'],
                        borderWidth:1,
                        borderColor:'#777',
                        hoverBorderWidth:3,
                        hoverBorderColor:'#000'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: {
                            title: {
                                display: true,
                                text: 'Region'
                            }
                        },
                        yAxes: {
                            title: {
                                display: true,
                                text: 'Units Sold (in millions)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Game Sales by Region',
                            font:{
                                size: 25
                            }
                        }
                    }
                }
            })

            let salesPieChart = document.getElementById("salesPieChart").getContext('2d');
            let singleGamePie = new Chart(salesPieChart, {
                type: 'pie',
                data: {
                    labels: ["NA Sales", "PAL Sales", "Japan Sales", "Other Sales"],
                    datasets: [{
                        label: 'Sales',
                        data: [
                            game_found.NA_Sales,
                            game_found.PAL_Sales,
                            game_found.JP_Sales,
                            game_found.Other_Sales
                        ],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'],
                        borderWidth:1,
                        borderColor:'#777',
                        hoverBorderWidth:3,
                        hoverBorderColor:'#000'
                    }]
                },
                options:{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Game Sales by Region',
                            font:{
                                size: 25
                            }
                        }
                    }
                }
            })

            $("#listings").append(aListing);
        }
    }).done(function() {
        console.log("Did we find a the game? " + (game_found!=null));
    });
}