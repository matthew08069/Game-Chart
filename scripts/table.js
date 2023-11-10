var all_listings = [];

var gridOptions = null;

$(document).ready(function () {
    fetchingJSON();
    document.getElementById("compareBtn").onclick = getSelectedRowData;
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
            all_listings.push(aGame);
        }
    }).done(function() {
        showTable();
    });
}
function showTable() {
    let rowData = [];

    // specify the columns
    const columnDefs = [
            {
                checkboxSelection: true, field: ' ', sortable: false, filter: false, resizable: false,
            },
            {
                field: 'action',
                cellRenderer: 'btnCellRenderer',
                cellRendererParams: {
                    clicked: function(field) {
                        // alert(`${field} was clicked`);

                        // future: take user to the following page
                        //document.location = 'game.html?game=' + field
                        window.open('game.html?game=' + field, '_blank').focus();
                    }
                },
                minWidth: 150
            },
            {field: "name", sortable: true, filter: true, resizable: true},
            {field: "yearReleased",sortable: true, filter: true, resizable: true},
            {field: "genre",sortable: true, filter: true, resizable: true},
            {field: "platform",sortable: true, filter: true, resizable: true},
            {field: "developer",sortable: true, filter: true, resizable: true},
            {field: "publisher",sortable: true, filter: true, resizable: true},
            {field: "globalSales",sortable: true, filter: true, resizable: true},
            {field: "NASales",sortable: true, filter: true, resizable: true},
            {field: "PALSales",sortable: true, filter: true, resizable: true},
            {field: "JapanSales",sortable: true, filter: true, resizable: true},
            {field: "OtherSales",sortable: true, filter: true, resizable: true},
        ];

    // Adding all of the games to the rowData array to be used for rows in the table
    for (let i = 0; i < all_listings.length; i++) {
        // making sure an empty value is replaced with a zero for Japan sales.
        if (!all_listings[i].JP_Sales > 0) {
            all_listings[i].JP_Sales = 0;
        }
        var myObj = {
            action: all_listings[i].ID,
            name: all_listings[i].Name,
            yearReleased: all_listings[i].Year,
            genre : all_listings[i].Genre,
            platform: all_listings[i].Platform,
            developer: all_listings[i].Developer,
            publisher: all_listings[i].Publisher,
            globalSales: all_listings[i].Global_Sales + " million",
            NASales: all_listings[i].NA_Sales + " million",
            PALSales: all_listings[i].PAL_Sales + " million",
            JapanSales: all_listings[i].JP_Sales + " million",
            OtherSales: all_listings[i].Other_Sales + " million",
        }
        rowData.push(myObj);
    }


    // let the grid know which columns and what data to use
    gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        pagination: true,
        paginationPageSize: 100,
        rowSelection: 'multiple',
        components: {
            btnCellRenderer: ViewButton
        }
    };

    // lookup the container we want the Grid to use
    const eGridDiv = document.querySelector('#myGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions)
    //gridOptions.columnApi.autoSizeAllColumns();
    //gridOptions.api.sizeColumnsToFit();
    gridOptions.columnApi.autoSizeColumns([' ','action','name','yearReleased','genre','platform','developer','publisher','globalSales','naSales','palSales'], false);


}


function getSelectedRowData() {

    let selectedNodes = gridOptions.api.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);

    if (selectedData.length == 2) {
        console.log(selectedData);
        var gameID1 = selectedData[0].action;
        var gameID2 = selectedData[1].action;
        IDs = [gameID1, gameID2];
        console.log(gameID1 + " & " + gameID2);
        window.open('compare.html?game=' + IDs, '_blank').focus();
    }
    else if (selectedData.length == 1) {
        alert("Please select another game.");
    }
    else if (selectedData.length > 2 ) {
        alert("More than two games were selected. \nPlease select a maximum of two games.");
    } else {
        alert("No game has been selected.\nPlease select two games.");
    }
}




// btn-cell-renderer.js

function ViewButton() {}

ViewButton.prototype.init = function(params) {
    this.params = params;

    this.eGui = document.createElement('button');
    this.eGui.innerHTML = 'View';
    this.eGui.id = "ViewButton";

    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.eGui.addEventListener('click', this.btnClickedHandler);
}

ViewButton.prototype.getGui = function() {
    return this.eGui;
}

ViewButton.prototype.destroy = function() {
    this.eGui.removeEventListener('click', this.btnClickedHandler);
}

ViewButton.prototype.btnClickedHandler = function(event) {
    this.params.clicked(this.params.value);
}


