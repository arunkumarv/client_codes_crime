let params = {};

let HTMLelements = {

    ageRangeElement: '<input class="form-control" type="number" name="lowerAge" id="lower-age" required>\
    <input class="form-control" type="number" name="upperAge" id="upper-age" required>'
};

$(function () {

    accusedSearch();
});

function accusedSearch() {

    params = getUrlVars();

    if (!checkForRequiredParams(params)) return;

    document.getElementById('name-param').value = params.nameParam;

    document.getElementById('parent-param').value = params.parentParam;

    if ( params.byAge )  { 
        
        document.getElementById('by-age').checked = true;
        
        var newInput = $(HTMLelements.ageRangeElement);

        $('#age-range').append(newInput);

        document.getElementById('lower-age').value = params.lowerAge;

        document.getElementById('upper-age').value = params.upperAge;
    }

    let endpoint = params.byAge ? endpoints.criminalSearchBasedOnAge : endpoints.criminalSearch;

    // $.getJSON ( getApiUrl ( ip, port, endpoint ), params, function (r) {

    $.get('./test/ageGroup.json', function (r) {

        // console.log (r);
        r = r.map(e => ({ ...e, ageGroup: parseInt(e.age / 10) * 10 + '-' + ((parseInt(e.age / 10) * 10) + 10) }));

        console.log(r);

        let gbAgeGroup = gbreduce(r, (c) => c.ageGroup);

        let gbCaseSubType = gbreduce(r, (c) => c.caseSubtype);

        let gbAddress = gbreduce(r, (c) => c.address);

        for (let key in gbCaseSubType) addToColumn(key, gbCaseSubType[key], 'case-sub-type');

        for (let key in gbAgeGroup) addToColumn(key, gbAgeGroup[key], 'age-group');

        for (let key in gbAddress) addToColumn(key, gbAddress[key], 'address');

    })/*
        .done (  () => { console.log("Second Success"); })

        .fail (  () => { alert("error> Please check the console: Command + Option + j"); })

        .always (  () => { console.log("Finished"); });*/
}

function addToColumn(key, arr, divid) {

    var column = document.getElementById(divid);

    column.appendChild(document.createTextNode(key))

    $.each(arr, function (position, value) {

        let entryDiv = document.createElement("a");

        entryDiv.classList.add("list-group-item")

        let titleDiv = document.createElement("h4");

        titleDiv.classList.add("list-group-item-heading");

        titleDiv.appendChild(document.createTextNode(''.concat(value.name, ' ', value.parent)));

        let descDiv = document.createElement("p");

        descDiv.classList.add("list-group-item-text");

        descDiv.appendChild(document.createTextNode(''.concat('Case Type:', value.caseType, ', '.concat('Age: ', value.age))));

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



$('#by-age').change(function () {

    var $this = $(this);

    if ($this.is(':checked')) {

        console.log(true)

        var newInput = $(HTMLelements.ageRangeElement);

        $('#age-range').append(newInput);

    } else {

        console.log(false);

        $('#age-range').empty();
    }
});


