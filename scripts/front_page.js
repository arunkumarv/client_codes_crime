//API - 1
function getTotalCrime() {

    $.get(getApiUrl(ip, port, endpoints.totalCrime), function (response) {

        console.log("Total Crime (API-1): ", response);

        $("#total-crime").html(response);
    })
        .done(() => { console.log("Total Crime API 1"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = 454545;

            $("#total-crime").html(response);
        })

        .always(() => { console.log("Total Crime API 1 Finished"); });
}

//API - 2
function getCaseType() {

    $.get(getApiUrl(ip, port, endpoints.caseType), function (response) {

        console.log("Case Type (API-2): ", response);

        $("#crime").html(response.filter(e => e.caseType == "CRIME")[0].count);

        $("#road-accident").html(response.filter(e => e.caseType == "ROAD ACCIDENT")[0].count);

        $("#prohibition").html(response.filter(e => e.caseType == "PROHIBITION")[0].count);
    })
        .done(() => { console.log("Case Type API - 2 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [
                { "id": "O", "caseType": "OTHER ACTS", "count": 4199675 },
                { "id": "L", "caseType": "L&O", "count": 1056050 },
                { "id": "P", "caseType": "PROHIBITION", "count": 939531 },
                { "id": "A", "caseType": "ROAD ACCIDENT", "count": 660821 },
                { "id": "C", "caseType": "CRIME", "count": 518887 }
            ];

            $("#crime").html(response.filter(e => e.caseType == "CRIME")[0].count);

            $("#road-accident").html(response.filter(e => e.caseType == "ROAD ACCIDENT")[0].count);

            $("#prohibition").html(response.filter(e => e.caseType == "PROHIBITION")[0].count);
        })

        .always(() => { console.log("2 Finished"); });
}

//API - 3
function getSubCaseType() {

    $.get(getApiUrl(ip, port, endpoints.subCaseType), function (response) {

        console.log("Sub Case Type (API-3): ", response);

        response.forEach ( e => $("#sub-case-type").append(`<li>${e.caseType}: ${e.count}</li>`));
    })
        .done(() => { console.log("API - 3 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j");  

            let response = [
                {"id":"43","caseType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","count":1736397},
                {"id":"98","caseType":"SPECIAL & LOCAL LAWS [ SLL ]","count":1270259},
                {"id":"99","caseType":"OTHERS","count":986702},
                {"id":"23","caseType":"IMFL BOTTLES","count":703350},
                {"id":"14","caseType":"NON FATAL","count":484618},
                {"id":"44","caseType":"SECURITY PROCEEDINGS [107 TO 110 CR.P.C.]","count":423551},
                {"id":"02","caseType":"THEFT","count":304525},
                {"id":"30","caseType":"HURT CASE","count":301720},
                {"id":"12","caseType":"174 CR.P.C. CASES","count":299661},
                {"id":"22","caseType":"ID ARRACK","count":145717},
                {"id":"13","caseType":"FATAL","count":137900},
                {"id":"11","caseType":"MISSING PERSON","count":100139},
                {"id":"03","caseType":"CHEATING","count":50093},
                {"id":"45","caseType":"PREVENTIVE ARREST [ 151 CR.P.C. ]","count":49302},
                {"id":"18","caseType":"HOUSE BURGLARY NIGHT","count":48912},
                {"id":"15","caseType":"RASH & NEGLIGENT ACT","count":33132},
                {"id":"20","caseType":"ROBBERY","count":32483},
                {"id":"28","caseType":"ATTEMPT TO MURDER","count":30297},
                {"id":"24","caseType":"NARCOTIC SUBSTANCES","count":30228},
                {"id":"08","caseType":"RIOTING","count":28841},
                {"id":"37","caseType":"TODDY","count":21443},
                {"id":"06","caseType":"MURDER","count":19452},
                {"id":"32","caseType":"CRUELTY BY HUSBAND & RELATIVES","count":19098},
                {"id":"17","caseType":"HOUSE BURGLARY DAY","count":14115},
                {"id":"07","caseType":"KIDNAPPING & ABDUCTION","count":13429},
                {"id":"35","caseType":"ASSAULT ON PUBLIC SERVANT","count":13250},
                {"id":"40","caseType":"EXTORTION","count":12416},
                {"id":"33","caseType":"MOLESTATION","count":7739},
                {"id":"05","caseType":"RAPE","count":7343},
                {"id":"21","caseType":"DISPERSAL OF UNLAWFUL ASSEMBLY","count":7304},
                {"id":"36","caseType":"RECTIFIED SPIRIT","count":6161},
                {"id":"31","caseType":"ARSON","count":4906},
                {"id":"34","caseType":"SEXUAL HARASSMENT","count":4002},
                {"id":"26","caseType":"CRIMINAL BREACH OF TRUST","count":3620},
                {"id":"38","caseType":"FERMENTED WASH","count":3073},
                {"id":"39","caseType":"MADHUKASHAYAM","count":2167},
                {"id":"16","caseType":"DACOITY","count":2039},
                {"id":"41","caseType":"MISAPPROPRIATION","count":1834},
                {"id":"04","caseType":"COUNTERFEITING","count":1732},
                {"id":"27","caseType":"PREPARATION FOR DACOITY","count":1491},
                {"id":"19","caseType":"MURDER FOR GAIN","count":1478},
                {"id":"25","caseType":"176 CR.P.C. CASES","count":1458},
                {"id":"46","caseType":"ABETMENT TO SUICIDE","count":1361},
                {"id":"47","caseType":"DEATH DUE TO NEGLIGENCE","count":1110},
                {"id":"09","caseType":"DOWRY DEATH","count":974},
                {"id":"29","caseType":"CH NOT AMOUNTING TO MURDER","count":815},
                {"id":"10","caseType":"CRIME AGAINST CHILDREN","count":559},
                {"id":"42","caseType":"RECEIVER OF STOLEN PROPERTY","count":225},
                {"id":"48","caseType":"SPURIOUS LIQUOR","count":114}
            ];

            response.forEach ( e => $("#sub-case-type").append(`<li>${e.caseType}: ${e.count}</li>`));
        })

        .always(() => { console.log("3 Finished"); });
}

//API - 4
function getStatusInLastThreeMonths() {

    $.get(getApiUrl(ip, port, endpoints.statusInLast3Months), function (response) {

        console.log("Status in last 3 months (API-4): ", response);

        for (let [k, v] of Object.entries(response)){

            $("#status-in-last-3-months").append(`<li>${camelToWords(k)}: ${v}</li>`)
        }
    })
        .done(() => { console.log("API - 4 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j");  

            let response = { "firstArrestCaseCount":0, "chargeSheetCount":0, "courtDisposalCount":0, "totalCount":0, "averageTimeBetweenOccurDateAndReceiveDate":"3 days 15:20:18.79729" };
            
            for (let [k, v] of Object.entries(response)){

                $("#status-in-last-3-months").append(`<li>${camelToWords(k)}: ${v}</li>`)
            }
        })

        .always(() => { console.log("4 Finished"); });
}

//API - 5
function topCrimesDistrict(){

    $.get ( getApiUrl ( ip, port, endpoints.topCrimesDistrict ), function (response) {

        console.log("Top Crimes Police Station (API-6): ", response);
    })
        .done(() => { console.log("API - 6 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j");  

            let response = [
                {"id":2292,"districtName":"ADYAR","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":103929,"rank":1},
                {"id":215,"districtName":"ADYAR","caseSubType":"SPECIAL & LOCAL LAWS [ SLL ]","crimeCount":85079,"rank":2},{"id":2368,"districtName":"ADYAR","caseSubType":"OTHERS","crimeCount":12712,"rank":3},{"id":903,"districtName":"AMBATTUR","caseSubType":"SPECIAL & LOCAL LAWS [ SLL ]","crimeCount":85554,"rank":1},{"id":1576,"districtName":"AMBATTUR","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":59140,"rank":2},{"id":1664,"districtName":"AMBATTUR","caseSubType":"OTHERS","crimeCount":13292,"rank":3},{"id":2069,"districtName":"ANNA NAGAR","caseSubType":"SPECIAL & LOCAL LAWS [ SLL ]","crimeCount":60429,"rank":1},{"id":107,"districtName":"ANNA NAGAR","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":36504,"rank":2},{"id":494,"districtName":"ANNA NAGAR","caseSubType":"OTHERS","crimeCount":8648,"rank":3},{"id":1722,"districtName":"ARIYALUR","caseSubType":"IMFL BOTTLES","crimeCount":13701,"rank":1},{"id":2428,"districtName":"ARIYALUR","caseSubType":"OTHERS","crimeCount":13324,"rank":2},{"id":2190,"districtName":"ARIYALUR","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":6517,"rank":3},{"id":1233,"districtName":"CBCID - CC WING","caseSubType":"COUNTERFEITING","crimeCount":147,"rank":1},{"id":594,"districtName":"CBCID - CC WING","caseSubType":"CHEATING","crimeCount":10,"rank":2},{"id":2072,"districtName":"CBCID - CC WING","caseSubType":"OTHERS","crimeCount":1,"rank":3},{"id":1467,"districtName":"CBCID - CYBER CELL","caseSubType":"CHEATING","crimeCount":56,"rank":1},{"id":1354,"districtName":"CBCID - CYBER CELL","caseSubType":"SPECIAL & LOCAL LAWS [ SLL ]","crimeCount":34,"rank":2},{"id":1163,"districtName":"CBCID - CYBER CELL","caseSubType":"OTHERS","crimeCount":5,"rank":3},{"id":1483,"districtName":"CBCID - HQRS","caseSubType":"CHEATING","crimeCount":166,"rank":1},{"id":1152,"districtName":"CBCID - HQRS","caseSubType":"OTHERS","crimeCount":82,"rank":2},{"id":1367,"districtName":"CBCID - HQRS","caseSubType":"SPECIAL & LOCAL LAWS [ SLL ]","crimeCount":44,"rank":3},{"id":1422,"districtName":"CBCID - NORTH","caseSubType":"CHEATING","crimeCount":109,"rank":1},{"id":596,"districtName":"CBCID - NORTH","caseSubType":"174 CR.P.C. CASES","crimeCount":32,"rank":2},{"id":1172,"districtName":"CBCID - NORTH","caseSubType":"OTHERS","crimeCount":30,"rank":3},{"id":1243,"districtName":"CBCID - OCU","caseSubType":"CHEATING","crimeCount":87,"rank":1},{"id":1384,"districtName":"CBCID - OCU","caseSubType":"OTHERS","crimeCount":37,"rank":2},{"id":2093,"districtName":"CBCID - OCU","caseSubType":"174 CR.P.C. CASES","crimeCount":16,"rank":3},{"id":1566,"districtName":"CBCID - SID","caseSubType":"OTHERS","crimeCount":31,"rank":1},{"id":2390,"districtName":"CBCID - SID","caseSubType":"MURDER","crimeCount":19,"rank":2},{"id":1838,"districtName":"CBCID - SID","caseSubType":"ATTEMPT TO MURDER","crimeCount":6,"rank":3}];

            $("#tcd").remove();

            let tbl = $("<table/>").attr("id", "tcd");

            tbl.addClass('table table-bordered');

            $("#top-crimes-district").append(tbl);

            $("#tcd").append(`
                <tr>
                    <th>District</th>
                    <th>Subcase Type</th>
                    <th>Count</th>
                </tr>
            ` );

            for (var i = 0; i < response.length; i++) {

                var tr = "<tr>";

                var td1 = "<td>" + response[i]["districtName"] + "</td>";

                var td2 = "<td>" + response[i]["caseSubType"] + "</td>";

                var td3 = "<td>" + response[i]["crimeCount"] + "</td></tr>";

                $("#tcd").append ( tr + td1 + td2 + td3 );
            }
            
            
        })

        .always(() => { console.log("5 Finished"); });
}

//API - 6
function getTopCrimesPoliceStation() {

    $.get(getApiUrl(ip, port, endpoints.topCrimesPoliceStation), function (response) {

        console.log("Top Crimes Police Station (API-6): ", response);
    })
        .done(() => { console.log("API - 6 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j");  

            let response = [
                {"id":27,"location":"2957803","policeStationName":"ARAVAKURICHI","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":1268,"rank":1},
                {"id":24,"location":"2957803","policeStationName":"ARAVAKURICHI","caseSubType":"NON FATAL","crimeCount":704,"rank":2},
                {"id":25,"location":"2957803","policeStationName":"ARAVAKURICHI","caseSubType":"OTHERS","crimeCount":649,"rank":3},
                {"id":55,"location":"2957810","policeStationName":"CHINNADHARAPURAM","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":1067,"rank":1},
                {"id":53,"location":"2957810","policeStationName":"CHINNADHARAPURAM","caseSubType":"OTHERS","crimeCount":263,"rank":2},
                {"id":47,"location":"2957810","policeStationName":"CHINNADHARAPURAM","caseSubType":"IMFL BOTTLES","crimeCount":242,"rank":3},{"id":84,"location":"2957811","policeStationName":"CHINTHAMANIPATTY","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":637,"rank":1},{"id":82,"location":"2957811","policeStationName":"CHINTHAMANIPATTY","caseSubType":"OTHERS","crimeCount":264,"rank":2},{"id":76,"location":"2957811","policeStationName":"CHINTHAMANIPATTY","caseSubType":"IMFL BOTTLES","crimeCount":259,"rank":3},{"id":94,"location":"2957816","policeStationName":"AWPS-KARUR","caseSubType":"CRUELTY BY HUSBAND & RELATIVES","crimeCount":170,"rank":1},{"id":100,"location":"2957816","policeStationName":"AWPS-KARUR","caseSubType":"OTHERS","crimeCount":35,"rank":2},{"id":91,"location":"2957816","policeStationName":"AWPS-KARUR","caseSubType":"174 CR.P.C. CASES","crimeCount":16,"rank":3},{"id":130,"location":"2957842","policeStationName":"KARUR TOWN","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":2901,"rank":1},{"id":138,"location":"2957842","policeStationName":"KARUR TOWN","caseSubType":"THEFT","crimeCount":1426,"rank":2},{"id":128,"location":"2957842","policeStationName":"KARUR TOWN","caseSubType":"OTHERS","crimeCount":1402,"rank":3},{"id":159,"location":"2957843","policeStationName":"K.PARAMATHI","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":862,"rank":1},{"id":156,"location":"2957843","policeStationName":"K.PARAMATHI","caseSubType":"NON FATAL","crimeCount":342,"rank":2},{"id":144,"location":"2957843","policeStationName":"K.PARAMATHI","caseSubType":"FATAL","crimeCount":167,"rank":3},{"id":193,"location":"2957844","policeStationName":"KULITHALAI","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":1563,"rank":1},{"id":190,"location":"2957844","policeStationName":"KULITHALAI","caseSubType":"OTHERS","crimeCount":851,"rank":2},{"id":189,"location":"2957844","policeStationName":"KULITHALAI","caseSubType":"NON FATAL","crimeCount":726,"rank":3},{"id":222,"location":"2957846","policeStationName":"LALAPET","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":794,"rank":1},{"id":214,"location":"2957846","policeStationName":"LALAPET","caseSubType":"IMFL BOTTLES","crimeCount":442,"rank":2},{"id":227,"location":"2957846","policeStationName":"LALAPET","caseSubType":"SECURITY PROCEEDINGS [107 TO 110 CR.P.C.]","crimeCount":359,"rank":3},{"id":257,"location":"2957849","policeStationName":"MAYANOOR","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":852,"rank":1},{"id":253,"location":"2957849","policeStationName":"MAYANOOR","caseSubType":"NON FATAL","crimeCount":550,"rank":2},{"id":262,"location":"2957849","policeStationName":"MAYANOOR","caseSubType":"SECURITY PROCEEDINGS [107 TO 110 CR.P.C.]","crimeCount":414,"rank":3},{"id":288,"location":"2957862","policeStationName":"PALAVIDUTHI","caseSubType":"PREVENTIVE ARREST [ 41 CR.P.C. ]","crimeCount":514,"rank":1},{"id":286,"location":"2957862","policeStationName":"PALAVIDUTHI","caseSubType":"OTHERS","crimeCount":318,"rank":2},{"id":279,"location":"2957862","policeStationName":"PALAVIDUTHI","caseSubType":"IMFL BOTTLES","crimeCount":237,"rank":3}];

            $("#tcps").remove();

            let tbl = $("<table/>").attr("id", "tcps");

            tbl.addClass('table table-bordered');

            $("#top-crimes-policestation").append(tbl);

            $("#tcps").append(`
                <tr>
                    <th>Police Station</th>
                    <th>Subcase Type</th>
                    <th>Count</th>
                </tr>
            ` );

            for (var i = 0; i < response.length; i++) {

                var tr = "<tr>";

                var td1 = "<td>" + response[i]["policeStationName"] + "</td>";

                var td2 = "<td>" + response[i]["caseSubType"] + "</td>";

                var td3 = "<td>" + response[i]["crimeCount"] + "</td></tr>";

                $("#tcps").append ( tr + td1 + td2 + td3 );
            }
            
        })

        .always(() => { console.log("6 Finished"); });

}


$(function () {

    getTotalCrime(); // API - 1

    getCaseType();// API - 2

    getSubCaseType(); // API - 3

    getStatusInLastThreeMonths(); // API - 4

    topCrimesDistrict(); // API - 5
    
    getTopCrimesPoliceStation(); // API - 6
});