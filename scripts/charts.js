var ALLGAMES = [];
var displayedGames = []
var games_after_filter = []

var pieChart = null;
var doughnutChart = null;
var multiBarChart = null;

var starting_index_multiBarChart= 0;
var starting_index_pieChart = 0;
var starting_index_doughnutChart = 0;


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


$(document).ready(function () {
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

    document.getElementById('gNameCheckbox').onchange = function() {
        document.getElementById('gNameTextbox').disabled = !this.checked;
    };

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


    // Bar navigation (next and previous buttons)
    document.getElementById("nextBtn").onclick = function (){
        goForward();
    };
    document.getElementById("previousBtn").onclick = function (){
        goBackward();
    };


    // Pie mini chart -- 5 mode buttons
    document.getElementById("miniPieGlobal").onclick = function (){
        UpdateMiniChartMode(displayedGames, "pie", "Global");
    };
    document.getElementById("miniPieNA").onclick = function (){
        UpdateMiniChartMode(displayedGames, "pie", "NA");
    };
    document.getElementById("miniPiePAL").onclick = function (){
        UpdateMiniChartMode(displayedGames, "pie", "PAL");
    };
    document.getElementById("miniPieJapan").onclick = function (){
        UpdateMiniChartMode(displayedGames, "pie", "Japan");
    };
    document.getElementById("miniPieOther").onclick = function (){
        UpdateMiniChartMode(displayedGames, "pie", "Other");
    };


    // Doughnut mini chart -- 5 mode buttons
    document.getElementById("miniDoughnutGlobal").onclick = function (){
        UpdateMiniChartMode(displayedGames, "doughnut", "Global");
    };
    document.getElementById("miniDoughnutNA").onclick = function (){
        UpdateMiniChartMode(displayedGames, "doughnut", "NA");
    };
    document.getElementById("miniDoughnutPAL").onclick = function (){
        UpdateMiniChartMode(displayedGames, "doughnut", "PAL");
    };
    document.getElementById("miniDoughnutJapan").onclick = function (){
        UpdateMiniChartMode(displayedGames, "doughnut", "Japan");
    };
    document.getElementById("miniDoughnutOther").onclick = function (){
        UpdateMiniChartMode(displayedGames, "doughnut", "Other");
    };

    // Get the Json Data!
    fetchingJSON();
});


function fetchingJSON () {
    $.getJSON("../data/games.json", function (myData) {
        //        for (let i = 0; i < myData.length; i++) {
        for (let i = 0; i < myData.length; i++) {
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
            }
            ALLGAMES.push(aGame);
        }
    }).done(function() {
        console.log("getJson() Finished | The following is the ALLGAMES array:");
        console.log(ALLGAMES)
        // the following has to be called here, since it needs to wait until the ALLGAMES array is filled before executing.
        displayedGames = ALLGAMES;
        SetupMainChart(displayedGames);
        SetupSecondaryChart_Pie();
        SetupSecondaryChart_Doughnut();


    });
}


function getInitialChartData(array){
    all_games = [];
    color_i = 0;
    for (var i = starting_index_multiBarChart; i < starting_index_multiBarChart +10; i++){
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
    starting_index_multiBarChart += 10;
    return all_games;
}

function SetupSecondaryChart_Pie() {
    data_ = [];
    labels_ = [];
    for (var i = starting_index_pieChart; i < starting_index_pieChart+10; i++){
        data_.push(displayedGames[i].Global_Sales);
        labels_.push(displayedGames[i].Name + " ("+  displayedGames[i].Platform.toString() + ")");
    }
    starting_index_pieChart += 10;

    var data = {
        labels: labels_,
        datasets: [{
            label: 'My First dataset',
            data: data_,
            backgroundColor:[
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
            ],
        }]
    };

    var config = {
        type: 'pie',
        data: data,
        options: {
            onClick: graphClickEvent2,
            plugins: {
                title:{
                    display:true,
                    text:'Global Sales',
                    fontSize:25
                },
                legend: {
                    display: true,
                    maxWidth: 200,
                    position:'bottom',
                    labels: {
                        color: 'rgb(105, 199, 102)'
                    }
                },
                tooltip:{
                    enabled:true
                }
            },
            indexAxis: 'x',
            responsive:true,
            layout:{
                padding:{
                    left:50,
                    right:0,
                    bottom:0,
                    top:0
                }
            }
        }
    };
    pieChart = new Chart(
        document.getElementById('myChart_Second'),
        config
    );
}

function SetupSecondaryChart_Doughnut() {
    data_ = [];
    labels_ = [];
    for (var i = starting_index_doughnutChart; i < starting_index_doughnutChart+10; i++){
        data_.push(displayedGames[i].Global_Sales);
        labels_.push(displayedGames[i].Name + " ("+  displayedGames[i].Platform.toString() + ")");
    }
    starting_index_doughnutChart += 10;

    var data = {
        labels: labels_,
        datasets: [{
            label: 'My First dataset',
            data: data_,
            backgroundColor:[
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
            ],
        }]
    };

    var config = {
        type: 'doughnut',
        data: data,
        options: {
            onClick: graphClickEvent2,
            plugins: {
                title:{
                    display:true,
                    text:'Global Sales',
                    fontSize:25
                },
                legend: {
                    display: true,
                    maxWidth: 200,
                    position:'bottom',
                    labels: {
                        color: 'rgb(105, 199, 102)'
                    }
                },
                tooltip:{
                    enabled:true
                }
            },
            indexAxis: 'x',
            responsive:true,
            layout:{
                padding:{
                    left:50,
                    right:0,
                    bottom:0,
                    top:0
                }
            }
        }
    };
    doughnutChart = new Chart(
        document.getElementById('myChart_Third'),
        config
    );
}


// only for a bar chart. (not pie chart)
function graphClickEvent(event, array){
    if(array[0]){
        // array[0].Index --> The sub-graph section clicked on
        // array[0].datasetIndex --> The bar clicked on in the sub-graph.
        console.log("index clicked on ", array[0].datasetIndex);
        var index = array[0].datasetIndex;
        // entire label that includes both the game name and platform
        var entire_label = multiBarChart.data.datasets[index].label;
        // slices off the platform from the entire label and saves it to label variable
        var label = entire_label.slice(0,entire_label.lastIndexOf(' '));
        // gets the last word of the entire label, which is the platform
        var gamePlat = entire_label.slice(entire_label.lastIndexOf(' ')+1, entire_label.length);
        // removes the paranthesis '(' and ')' from around the platform
        var gamePlat = gamePlat.slice(1,gamePlat.length-1);
        // logging the clean up variables
        console.log(entire_label.slice(0,entire_label.lastIndexOf(' ') ) + "  ---> for platform:  " + gamePlat);
        for (var game of displayedGames) {
            if (game.Name == label && game.Platform == gamePlat) {
                // open in new tab.
                window.open('game.html?game=' + game.ID, '_blank').focus();
                break; // prevents opening more that one tab because of duplicate games in the dataset.
            }
        }
    }
}


// only for a pie chart or doughnut chart (not for bar chart)
function graphClickEvent2(event, array){
    if(array[0]){
        var myIndex = array[0].index;
        // entire label that includes both the game name and platform
        var entire_label = multiBarChart.data.datasets[myIndex].label;
        // slices off the platform from the entire label and saves it to label variable
        var label = entire_label.slice(0,entire_label.lastIndexOf(' '));
        // gets the last word of the entire label, which is the platform
        var gamePlat = entire_label.slice(entire_label.lastIndexOf(' ')+1, entire_label.length);
        // removes the paranthesis '(' and ')' from around the platform
        var gamePlat = gamePlat.slice(1,gamePlat.length-1);
        console.log(entire_label.slice(0,entire_label.lastIndexOf(' ') ) + "  ---> for platform:  " + gamePlat);
        for (var game of displayedGames) {
            if (game.Name == label && game.Platform == gamePlat) {
                // open in new tab.
                window.open('game.html?game=' + game.ID, '_blank').focus();
                break; // prevents opening more that one tab because of duplicate games in the dataset.
            }
        }
    }
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
            onClick: graphClickEvent,
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
                        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                        /*callback: function(val, index) {
                            // Hide the label of every 2nd dataset
                            // Remove the following line to hide ALL Lables
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        },*/
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
                    position:'right',
                    labels: {
                        color: 'rgb(105, 199, 102)',
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
        document.getElementById('myChart_First'),
        config2
    );
    DisablePrevOrNext(starting_index_multiBarChart, 10, array, "previousBtn", "nextBtn");
}


// if forward = true --> Get Next 10 games
// if forward = false --> Get previous 10 games
function UpdateMultiBarChart(array, forward){
    console.log("ARRAY in UpdateMuliBarChart");
    console.log(array);
    var index = null;
    if (forward){
        index = starting_index_multiBarChart;
    } else {
        // subtracting 20 instead of 10, since we need to go back 20 digits to display the correct previous 10 array elements.
        if ((starting_index_multiBarChart - 20) > -1) {
            index = starting_index_multiBarChart - 20;
        }
    }
    all_games = [];
    color_i = 0;
    for (var i = 0; i < 10; i++){
        if (array[index]!=null) {
            var newObj = {
                label: array[index].Name + " ("+  array[index].Platform.toString() + ")",
                backgroundColor: BACKGROUND_COLOR[color_i],
                data: [
                    array[index].Global_Sales,
                    array[index].NA_Sales,
                    array[index].PAL_Sales,
                    array[index].JP_Sales,
                    array[index].Other_Sales
                ],
                borderRadius: 3,   // gives the bars a curved corner
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            }
            all_games.push(newObj);
            color_i++;
            index++;
        }
    }
    if (forward){
        starting_index_multiBarChart += 10;
    } else {
        if ((starting_index_multiBarChart - 10) > -1) {
            starting_index_multiBarChart -= 10;
        }
    }
    multiBarChart.data.datasets = all_games;
    multiBarChart.update();
    DisablePrevOrNext(starting_index_multiBarChart, 10, array, "previousBtn", "nextBtn");
}

function DisablePrevOrNext(index, amount, displayedArray, prevBtnID, nextBtnID){
    // Disable ot Enable Previous Button
    if (index - amount <= 0){
        document.getElementById(prevBtnID).disabled = true;
    } else {
        document.getElementById(prevBtnID).disabled = false;
    }

    // Disable or Enable Next Button
    if (index + amount > displayedArray.length){
        document.getElementById(nextBtnID).disabled = true;
    } else {
        document.getElementById(nextBtnID).disabled = false;
    }
}


function UpdatePieChart(array, forward) {
    var index = null;
    if (forward){
        index = starting_index_pieChart;
        starting_index_pieChart += 10;
    } else {
        index = starting_index_pieChart - 20;
        starting_index_pieChart -= 10;
    }

    data_ = [];
    labels_ = [];
    for (var i = 0; i < 10; i++) {
        if (displayedGames[index]!=null) {
            data_.push(displayedGames[index].Global_Sales);
            labels_.push(displayedGames[index].Name + " ("+  displayedGames[index].Platform.toString() + ")");
            index++;
        }
    }

    var data = {
        labels: labels_,
        datasets: [{
            label: 'My First dataset',
            data: data_,
            backgroundColor: [
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
            ],
        }]
    };
    pieChart.data = data;
    pieChart.options.plugins.title.text = "Global Sales";
    pieChart.update();
}


// updates the mini chart based on one of the five buttons clicked (Global, NA, PAL, Japan, or Other).
function UpdateMiniChartMode(array, chartName, mode) {
    var chart = null;
    if (chartName.toLowerCase() == "pie"){
        chart = pieChart;
    } else if (chartName.toLowerCase() == "doughnut"){
        chart = doughnutChart;
    }
    if (starting_index_pieChart - 10 >= 0) {
        var index = starting_index_pieChart - 10;
    } else {
        var index = 0;
    }
    data_ = [];
    labels_ = [];
    for (var i = 0; i < 10; i++) {
        if (displayedGames[index]!=null) {
            if (mode.toLowerCase() == "global"){
                data_.push(displayedGames[index].Global_Sales);
            } else if (mode.toLowerCase()  == "na"){
                data_.push(displayedGames[index].NA_Sales);
            }else if (mode.toLowerCase()  == "japan"){
                data_.push(displayedGames[index].JP_Sales);
            }else if (mode.toLowerCase()  == "pal"){
                data_.push(displayedGames[index].PAL_Sales);
            }else if (mode.toLowerCase()  == "other"){
                data_.push(displayedGames[index].Other_Sales);
            }
            labels_.push(displayedGames[index].Name + " ("+  displayedGames[index].Platform.toString() + ")");
            index++;
        }
    }

    var data = {
        labels: labels_,
        datasets: [{
            label: 'My First dataset',
            data: data_,
            backgroundColor: [
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
            ],
        }]
    };
    chart.data = data;
    chart.options.plugins.title.text = mode + " Sales";
    chart.update();
}


function UpdateDoughnutChart(array, forward) {
    var index = null;
    if (forward){
        index = starting_index_doughnutChart;
        starting_index_doughnutChart += 10;
    } else {
        index = starting_index_doughnutChart - 20;
        starting_index_doughnutChart -= 10;
    }

    data_ = [];
    labels_ = [];
    for (var i = 0; i < 10; i++) {
        if (displayedGames[index]!=null) {
            data_.push(displayedGames[index].Global_Sales);
            labels_.push(displayedGames[index].Name + " ("+  displayedGames[index].Platform.toString() + ")");
            index++;
        }
    }

    var data = {
        labels: labels_,
        datasets: [{
            label: 'My First dataset',
            data: data_,
            backgroundColor: [
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
            ],
        }]
    };
    doughnutChart.data = data;
    doughnutChart.options.plugins.title.text = "Global Sales";
    doughnutChart.update();
}

function seeIfChecked(checkboxID) {
    return document.getElementById(checkboxID).checked;
}

function getFilterChoices () {
    // inputted game name
    var gName = "";
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
    var checkForName = false;
    var checkForGenre = false;
    var checkForPlatform = false;
    var checkForYear = false;
    var checkForDeveloper = false;
    var checkForPublisher = false;

    if (seeIfChecked("gNameCheckbox")) {
        gName = document.getElementById("gNameTextbox").value;
        // text box contains a value?
        if (gName.length > 0) {
            checkForName = true;
        }
    }

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

    filterGames(checkForName, checkForGenre, checkForPlatform, checkForYear, checkForDeveloper, checkForPublisher, gName, genre_selected, platform_selected, year_min,
        year_max, developer, publisher)
}



function  filterGames(checkForName, checkForGenre, checkForPlatform, checkForYear, checkForDeveloper, checkForPublisher, gName, genre_selected,
                      platform_selected, year_min, year_max, developer, publisher) {

    // clearing the games_after_filter if this is not the first time we are filtering
    games_after_filter = []
    console.log("Initial games_after_filter size: ", games_after_filter.length);

    // looping through the games in ALLGAMES to see which ones fit the filter applied
    for (let i = 0; i < ALLGAMES.length; i++) {

        let aGame = ALLGAMES[i];
        // These values are checked at the end to see if a game is valid to be displayed after applying the filter
        let valid_by_name = !checkForName;
        let valid_by_genre = !checkForGenre;
        let valid_by_platform = !checkForPlatform;
        let valid_by_year = !checkForYear;
        let valid_by_developer = !checkForDeveloper;
        let valid_by_publisher = !checkForPublisher;


        if (checkForName) {
            console.log("CHECKING GAME NAME");
            let g_name = aGame.Name.toString().toLowerCase();
            if (g_name.includes(gName.toString().toLowerCase())) {
                valid_by_name = true;
            }
        }

        if (checkForGenre) {
            console.log("CHECKING GENRE");
            for (var genre of genre_selected) {
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
        if (valid_by_name && valid_by_genre && valid_by_platform && valid_by_year && valid_by_developer && valid_by_publisher) {
            games_after_filter.push(aGame);
        }
    }
    if (games_after_filter.length > 0) {
        console.log("Redisplaying with Filter with SIZE OF: " + games_after_filter.length);
        displayedGames = games_after_filter;
        RefreshCharts(displayedGames);
    } else {
        alert("No game matches found");
    }
}

function RefreshCharts(arrayToDisplay){
    starting_index_pieChart = 0;
    starting_index_multiBarChart = 0;
    starting_index_doughnutChart = 0;
    UpdateMultiBarChart(arrayToDisplay, true);
    UpdatePieChart(arrayToDisplay, true);
    UpdateDoughnutChart(arrayToDisplay, true);
    console.log("Refreshed the charts based on the filter. The new array displayed has a length of : ", arrayToDisplay.length);
}


function goForward(){
    UpdateMultiBarChart(displayedGames, true);
    UpdatePieChart(displayedGames, true);
    UpdateDoughnutChart(displayedGames, true);
}

function goBackward() {
    UpdateMultiBarChart(displayedGames, false);
    UpdatePieChart(displayedGames, false);
    UpdateDoughnutChart(displayedGames, false);
}