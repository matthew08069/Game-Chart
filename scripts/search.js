var matched_listings = [];
var games_after_filter = [];

// the following line is an HTML command
const params = (new URL(document.location)).searchParams;
// the argument for the following line is dependent on the 'name' property of the search textbox on home page
const searchInput = params.get("game");

$(document).ready(function () {

    // Setting the search bar text to what the user searched for
    document.getElementById("search").value = searchInput;

    document.getElementById("filterApplyBtn").onclick = function () {
        model.style.display = "none";
        getFilterChoices();
    }

    var model = document.getElementById("filterModel");
    var btn = document.getElementById("filter");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        model.style.display = "flex";
    }

    span.onclick = function () {
        model.style.display = "none";
    }


    document.getElementById('genre').onchange = function() {
        document.getElementById('genreList').disabled = !this.checked;
    };

    document.getElementById('year').onchange = function() {
        document.getElementById('minY').disabled = !this.checked;
        document.getElementById('maxY').disabled = !this.checked;
    };

    document.getElementById('platform').onchange = function() {
        document.getElementById('platList').disabled = !this.checked;
    };

    document.getElementById('publisher').onchange = function() {
        document.getElementById('pubT').disabled = !this.checked;
    };

    document.getElementById('developer').onchange = function() {
        document.getElementById('devT').disabled = !this.checked;
    };

    // printing the user search input.
    var input = document.getElementById("infoHeader");
    input.innerHTML = ("<h1>" + "Search results for " + "<em>" + searchInput + "</em>" + "</h1>" + "<br>" +
                        "<h3>" + "Click on the image for more game information"+ "</h3>");

    fetchingJSON();
});

function seeIfChecked(checkboxID) {
    return document.getElementById(checkboxID).checked;
}

function getFilterChoices () {
    // selected genres
    var genre_selected = [];
    // selected platforms
    var platform_selected = [];
    // inputted min year
    var year_min = "";
    // inputted max year
    var year_max = "";
    // inputted publisher name
    var publisher = "";
    // inputted developer name
    var developer = "";

    // Booleans to see if we use the different filter sections to actually do the filtering.
    // For example, user might have checked the Year checkbox but had not entered any data in the text boxes. ValidYear would stay as false.
    var checkForGenre = false;
    var checkForPlatform = false;
    var checkForYear = false;
    var checkForDeveloper = false;
    var checkForPublisher = false;


    if (seeIfChecked("genre")) {
        for (var option of document.getElementById('genreList').options) {
            if (option.selected) {
                if (option.value.toString().length > 0) {
                    genre_selected.push(option.value);
                }
            }
        }
        if (genre_selected.length > 0) {
            checkForGenre = true;
        }
    }

    if (seeIfChecked("platform")) {
        for (var option of document.getElementById('platList').options) {
            if (option.selected) {
                if (option.value.toString().length > 0){
                    platform_selected.push(option.value);
                }
            }
        }
        if (platform_selected.length > 0) {
            checkForPlatform = true;
        }
    }
    if (seeIfChecked("year")) {
        year_min = document.getElementById("minY").value;
        year_max = document.getElementById("maxY").value;
        // year text boxes contain values?
        if (year_min.length > 0 && year_max.length > 0) {
            if (!isNaN(year_min) && !isNaN(year_max) && year_max > year_min) {
                checkForYear = true;
            }
        }
    }

    if (seeIfChecked("developer")) {
        developer = document.getElementById("devT").value;
        // text box contains a value?
        if (developer.length > 0) {
            checkForDeveloper = true;
        }
    }
    if (seeIfChecked("publisher")) {
        publisher = document.getElementById("pubT").value;
        // text box contains a value?
        if (publisher.length > 0) {
            checkForPublisher = true;
        }
    }

    filterGames(checkForGenre, checkForPlatform, checkForYear, checkForDeveloper, checkForPublisher, genre_selected, platform_selected, year_min,
        year_max, developer, publisher)
}



function  filterGames(checkForGenre, checkForPlatform, checkForYear, checkForDeveloper, checkForPublisher, genre_selected,
                      platform_selected, year_min, year_max, developer, publisher) {

    /*
    if (!checkForGenre && !checkForPlatform && !checkForYear && !checkForDeveloper && !checkForPublisher && games_after_filter.length == 0) {
        alert("Filter did not include any options");
        games_after_filter = []

        return;
    }
     */


    // clearing the games_after_filter if this is not the first time we are filtering
    games_after_filter = []
    console.log("Initial games_after_filter size: ", games_after_filter.length);

    // looping through the games in matched_listings to see which ones fit the filter applied

    //matched_listings.length
    for (let i = 0; i < matched_listings.length; i++) {

        let aGame = matched_listings[i];
        // These values are checked at the end to see if a game is valid to be displayed after applying the filter
        let valid_by_genre = !checkForGenre;
        let valid_by_platform = !checkForPlatform;
        let valid_by_year = !checkForYear;
        let valid_by_developer = !checkForDeveloper;
        let valid_by_publisher = !checkForPublisher;


        if (checkForGenre) {
            console.log("CHECKING GENRE");
            for (var genre of genre_selected) {
                console.log("aGame --> ");
                console.log(aGame);
                console.log("Comparing");
                console.log(aGame.Genre.toString().toLowerCase());
                console.log("TO");
                console.log(genre.toString().toLowerCase());
                if (aGame.Genre.toString().toLowerCase().includes(genre.toString().toLowerCase())) {
                    valid_by_genre = true;
                    break;
                }
            }
        }
        if (checkForPlatform) {
            console.log("CHECKING PLATFORM");
            for (var platform of platform_selected) {
                if (aGame.Platform.toString().toLowerCase().includes(platform.toString().toLowerCase())) {
                    valid_by_platform = true;
                    break;
                }
            }
        }
        if (checkForYear) {
            console.log("CHECKING YEAR");
            let g_year = aGame.Year.toString();
            if ( g_year > year_min && g_year < year_max) {
                valid_by_year = true;
            }
        }
        if (checkForDeveloper) {
            console.log("CHECKING DEVELOPER");
            let g_developer = aGame.Developer.toString().toLowerCase();
            if (g_developer.includes(developer.toString().toLowerCase())) {
                valid_by_developer = true;
            }
        }
        if (checkForPublisher) {
            console.log("CHECKING PUBLISHER");
            let g_pubisher = aGame.Publisher.toString().toLowerCase();
            if (g_pubisher.includes(publisher.toString().toLowerCase())) {
                valid_by_publisher = true;
            }
        }

        // does the match match every filter option chosen? add it to games_after_filter
        if (valid_by_genre && valid_by_platform && valid_by_year && valid_by_developer && valid_by_publisher) {
            games_after_filter.push(aGame);
        }
    }
    if (games_after_filter.length > 0) {
        console.log("Redisplaying with Filter with SIZE OF: " + games_after_filter.length);
        displayGames(games_after_filter);
    } else {
        alert("No game matches found");
    }
}

function displayGames(array_to_display) {
    // printing the user search input.
    var input = document.getElementById("infoHeader");
    input.innerHTML = ("<h1>" + "Search results for " + "<em>" + searchInput + "</em>" + "</h1>"
        + "<br>" +
        "<h3>" + "Click on the image for more game information"+ "</h3>" +
        "<h3>Diplaying a total of " + array_to_display.length + " results</h3>" );


    document.getElementById("listings").innerHTML = "";
    for (var aGame of array_to_display) {
        // create a div element to house the game
        var aListing = document.createElement("div");
        aListing.id = "anElement";
        if (aGame.URL.toString().toLowerCase().includes("notfound")) {
            var image = "../images/default.png";
        } else {
            var image = aGame.URL;
        }
        aListing.innerHTML = (
            "<div class='flex-container' id='individualGame'>" +
                "<div class='box1' id='listingThumbnailContainer'>" +
                    "<a href=game.html?game="+ aGame.ID + ">" +
                    "<img id='thumbnail' src=" + image + ">" +
                    "</a>" +
                "</div>" +
                "<div class='box2'>" +
                    "<p>" + aGame.Name + "</p>" +
                    "<p> Genre: " + aGame.Genre + "</p>" +
                    "<p> Platform: " + aGame.Platform + "</p>" +
                    "<p> Developer: " + aGame.Developer + "</p>" +
                    "<p> Publisher: " + aGame.Publisher + "</p>" +
                    "<p> Year: " + aGame.Year + "</p>" +
                "</div>" +
            "</div>");
        $("#listings").append(aListing);
    }
}


function fetchingJSON () {
    $.getJSON("../data/games.json", function (myData) {
        for (let i = 0; i < myData.length; i++) {
            var game_name = myData[i].Name.toString().toLowerCase();
            var search_input_lower = searchInput.toString().toLowerCase();
            if (game_name.includes(search_input_lower)) {
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
                matched_listings.push(aGame);

                // create a div element to house the game
                var aListing = document.createElement("div");
                aListing.id = "anElement";
                if (aGame.URL.toString().toLowerCase().includes("notfound")) {
                    var image = "../images/default.png";
                } else {
                    var image = aGame.URL;
                }
                aListing.innerHTML = (
                    "<div class='flex-container' id='individualGame'>" +
                        "<div class='box1' id='listingThumbnailContainer'>" +
                            "<a href=game.html?game="+ aGame.ID + ">" +
                            "<img id='thumbnail' src=" + image + ">" +
                            "</a>" +
                        "</div>" +
                        "<div class='box2'>" +
                            "<p>" + aGame.Name + "</p>" +
                            "<p> Genre: " + aGame.Genre + "</p>" +
                            "<p> Platform: " + aGame.Platform + "</p>" +
                            "<p> Developer: " + aGame.Developer + "</p>" +
                            "<p> Publisher: " + aGame.Publisher + "</p>" +
                            "<p> Year: " + aGame.Year + "</p>" +
                        "</div>" +
                    "</div>");
                $("#listings").append(aListing);
            }
        }
    }).done(function() {
        // printing the user search input.
        var input = document.getElementById("infoHeader");
        input.innerHTML = ("<h1>" + "Search results for " + "<em>" + searchInput + "</em>" + "</h1>"
            + "<br>" +
            "<h3>" + "Click on the image for more game information"+ "</h3> " +
            "<h3>Diplaying a total of " + matched_listings.length + " results</h3>" );


        console.log("JSON Data Loaded:");
        console.log(matched_listings)
    });
}