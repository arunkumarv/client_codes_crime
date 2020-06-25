let params = {};

let keysToFilter = [ "addressNew", "rank", "id", "groupId", "ageGroup"];

function accusedSearch() {

    params = getUrlVars();

    if (!checkForRequiredParams(params)) return;

    document.getElementById('name-param').value = params.nameParam;

    document.getElementById('parent-param').value = params.parentParam;

    document.getElementById('lower-age').value = params.lowerAge;

    document.getElementById('upper-age').value = params.upperAge;

    // $.getJSON ( getApiUrl ( ip, port, endpoints.criminalSearch ), params, function (r) {

    $.get('./test/ageGroup.json', function (r) {

        // console.log (r);

        console.log(r);

        let gbAgeGroup = gbreduce(r, (c) => c.ageGroup);

        let gbCaseSubType = gbreduce(r, (c) => c.caseSubtype);

        let gbAddress = gbreduce(r, (c) => c.groupId);

        for (let key in gbCaseSubType) addToColumn('caseSubtype', key, gbCaseSubType[key], 'case-sub-type');

        for (let key in gbAgeGroup) addToColumn('ageGroup', key, gbAgeGroup[key], 'age-group');

        for (let key in gbAddress) addToColumn('address', key, gbAddress[key], 'address');

    })/*
        .done (  () => { console.log("Second Success"); })

        .fail (  () => { alert("error> Please check the console: Command + Option + j"); })

        .always (  () => { console.log("Finished"); });*/
}

function addToColumn(titleKey, key, arr, divid) {

    console.log(arr);

    var column = document.getElementById(divid);

    var subTitle = document.createElement("div");

    subTitle.className = "ak-col-subtitle";

    subTitle.appendChild(document.createTextNode(arr[0][titleKey]));

    column.appendChild(subTitle)

    $.each(arr, function (position, value) {

        let entryDiv = document.createElement("a");

        $(entryDiv).on('click', function () {

            showDetailsModal(value);
        });

        entryDiv.classList.add("list-group-item");

        let titleDiv = document.createElement("h4");

        titleDiv.classList.add("list-group-item-heading");

        titleDiv.appendChild(document.createTextNode(''.concat(value.name)));

        let descDiv = document.createElement("p");

        descDiv.classList.add("list-group-item-text");

        descDiv.appendChild(document.createTextNode(''.concat('Case Type:', value.caseType, ', '.concat('Age: ', value.age), ', '.concat('Parent: ', value.parent ))));

        entryDiv.appendChild(titleDiv);

        entryDiv.appendChild(descDiv);

        column.appendChild(entryDiv);

    });
}

function checkForRequiredParams(params) {

    console.log(params)

    let keys = Object.keys(params);

    if (keys.includes('nameParam') && keys.includes('parentParam') && keys.includes('pageNo') && keys.includes('noOfRecordsPerPage')) {

        return true;

    } else {

        console.log('search parameter is missing');

        return false;
    }
}

function prevButtonPressed() {

    params.pageNo = parseInt(params.pageNo) - 1 > 0 ? parseInt(params.pageNo) - 1 : 1;

    window.location.href = getNewUrl(params);
}

function nextButtonPressed() {

    params.pageNo = parseInt(params.pageNo) + 1;

    window.location.href = getNewUrl(params);
}

function getNewUrl(params) {

    return document.location.origin + document.location.pathname + '?' + $.param(params);
}

function showDetailsModal(obj) {

    $("#adm-table tr").remove();

    $("#adm-title").empty();

    $("#adm-title").append("".concat(obj.name, " ", obj.parent));

    for (let key in obj) {

        if ( keysToFilter.includes(key) ) { continue; }

        var $tr = $('<tr>').append (

            $('<td>').text( camelToWords(key) ),

            $('<td>').text(obj[key])

        ).appendTo('#adm-table');

    }

    $('#accuseDetailsModal').modal('show');
}


$(function () {

    accusedSearch();
});





