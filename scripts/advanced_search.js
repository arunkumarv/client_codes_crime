/* Developer: by Arunkumar V{ @link https://arunkumarv.github.io } */

let name = null;

let fromdate = null;

let todate = null;

let district = null;

let taluk = null;

let casetype = null;

function search() {

    name = document.getElementById('name').value;

    fromdate = document.getElementById('fromdate').value;

    todate = document.getElementById('todate').value;

    getDistricts();

    getAgeCount();

    getCaseType();
}
/* getDistricts */
function getDistricts() {

    $.getJSON(getApiUrl(ip, port, endpoints.getDistricts), { fromdate, todate, name }, function (response) {

        processGetDistricts(response);
    })
        .done(() => { console.log("getDistricts Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [{ "count": 11, "district": "coimbatore" }, { "count": 16, "district": "cuddalore" }, { "count": 3, "district": "dharmapuri" }, { "count": 2, "district": "dindigul" }, { "count": 6, "district": "erode" }, { "count": 4, "district": "kancheepuram" }, { "count": 1, "district": "kanniyakumari" }, { "count": 4, "district": "karur" }, { "count": 1, "district": "krishnagiri" }, { "count": 19, "district": "madurai" }, { "count": 4, "district": "nagapattinam" }, { "count": 3, "district": "namakkal" }, { "count": 3, "district": "nilgiris" }, { "count": 303, "district": "null" }, { "count": 3, "district": "pudukkottai" }, { "count": 14, "district": "salem" }, { "count": 2, "district": "sivaganga" }, { "count": 11, "district": "thanjavur" }, { "count": 2, "district": "theni" }, { "count": 1, "district": "thiruvallur" }, { "count": 1, "district": "thiruvarur" }, { "count": 2, "district": "thoothukkudi" }, { "count": 5, "district": "tiruchirappalli" }, { "count": 1, "district": "tirunelveli" }, { "count": 2, "district": "tiruvannamalai" }, { "count": 21, "district": "vellore" }, { "count": 10, "district": "viluppuram" }, { "count": 1, "district": "virudhunagar" }];

            processGetDistricts(response);
        })

        .always(() => { console.log("getDistricts Always"); });
}

function processGetDistricts(response) {

    $("#districts-count").empty();

    response.forEach(function (item, index) {

        $("#districts-count").append(`<li onclick="getTaluks('${item.district}')">${item.district}: ${item.count}</li>`)
    });

    var $li = $('#districts-count li').click(function () {

        $li.removeClass('selected');

        $(this).addClass('selected');
    });
}
/* getAgeCount */
function getAgeCount() {

    $.getJSON(getApiUrl(ip, port, endpoints.getAgeGroup), { fromdate, todate, name }, function (response) {

        processGetAgeCount(response);
    })
        .done(() => { console.log("getAgeCount Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [{ "age_group": "15-19", "count": 1 }, { "age_group": "20-24", "count": 1 }, { "age_group": "25-29", "count": 15 }, { "age_group": "30-34", "count": 45 }, { "age_group": "35-39", "count": 68 }, { "age_group": "40-44", "count": 64 }, { "age_group": "45-49", "count": 83 }, { "age_group": "50-54", "count": 56 }, { "age_group": "55-59", "count": 25 }, { "age_group": "60-64", "count": 11 }, { "age_group": "65-69", "count": 5 }, { "age_group": "70-74", "count": 1 }, { "age_group": "95-99", "count": 1 }, { "age_group": "null", "count": 80 }];

            processGetAgeCount(response);

        })

        .always(() => { console.log("getAgeCount Always"); });
}

function processGetAgeCount(response) {

    $("#age-group-count").empty();

    response.forEach(function (item, index) {

        $("#age-group-count").append(`<li>${item.age_group}: ${item.count}</li>`)

    });
}
/* getCaseType */
function getCaseType() {

    $.getJSON(getApiUrl(ip, port, endpoints.getCastTypeAdvSearch), { fromdate, todate, name }, function (response) {

        processGetCaseType(response);
    })
        .done(() => { console.log("getCaseType Done"); })

        .fail(() => {

            let response = [{ "case_type": "CRIME", "count": 131 }, { "case_type": "L&O", "count": 55 }, { "case_type": "OTHER ACTS", "count": 30 }, { "case_type": "PROHIBITION", "count": 63 }, { "case_type": "ROAD ACCIDENT", "count": 177 }];

            processGetCaseType(response);

        })

        .always(() => { console.log("getCaseType Always"); });
}

function processGetCaseType(response) {

    $("#case-type").empty();

    response.forEach(function (item, index) {

        $("#case-type").append(`<li onclick="getDetailedInformation('${item.case_type}')">${item.case_type}: ${item.count}</li>`)

    });

    var $li = $('#case-type li').click(function () {

        $li.removeClass('selected');

        $(this).addClass('selected');
    });
}
/* getTaluks */
function getTaluks(district) {

    console.log(district);

    district = district;

    $.getJSON(getApiUrl(ip, port, endpoints.getTaluks), { fromdate, todate, name, district }, function (response) {

        processGetTaluks(response);
    })
        .done(() => { console.log("getTaluks Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [{ "taluk": "mettupalayam", "count": 1 }, { "taluk": "null", "count": 2 }, { "taluk": "pollachi", "count": 4 }]

            processGetTaluks(response);

        })

        .always(() => { console.log("getTaluks Always"); });
}

function processGetTaluks(response) {

    $("#taluks-count").empty();

    response.forEach(function (item, index) {

        $("#taluks-count").append(`<li onclick="getFullResult('${item.taluk}')">${item.taluk}: ${item.count}</li>`)

    });

    var $li = $('#taluks-count li').click(function () {

        $li.removeClass('selected');

        $(this).addClass('selected');
    });
}
/* getFullResult */
function getFullResult(taluk) {

    console.log(taluk);

    taluk = taluk;

    $.getJSON(getApiUrl(ip, port, endpoints.getFullResult), { fromdate, todate, name, district, taluk }, function (response) {

        processGetFullResult(response);
    })
        .done(() => { console.log("getFullResult Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [{
                "name": "RAVI",
                "marital": "MARRIED",
                "age": 45,
                "address": "28,MANGARAI PUDUR KARAMADAI COIMBATORE ",
                "fir_no": "20090265",
                "case_type": "CRIME",
                "case_subtype": "THEFT",
                "property_srno": "{175}"
            }, {
                "name": "RAVI",
                "marital": "SINGLE",
                "age": 33,
                "address": "GANESANPURAM POTHANUR COIMBATORE  ",
                "fir_no": "20090049",
                "case_type": "CRIME",
                "case_subtype": "ROBBERY",
                "property_srno": "{481,483,482}"
            }];

            processGetFullResult(response);

        })

        .always(() => { console.log("getFullResult Always"); });
}

function processGetFullResult(response) {

    $("#tfr").remove();

    let tbl = $("<table/>").attr("id", "tfr");

    tbl.addClass('table table-bordered');

    $("#full-result").append(tbl);

    $("#tfr").append(`
                <tr>
                    <th>name</th>
                    <th>marital</th>
                    <th>age</th>
                    <th>address</th>
                    <th>fir_no</th>
                    <th>case_type</th>
                    <th>case_subtype</th>
                    <th>property_srno</th>
                </tr>
            ` );

    for (var i = 0; i < response.length; i++) {

        var tr = "<tr>";

        var td1 = "<td>" + response[i]["name"] + "</td>";
        var td2 = "<td>" + response[i]["marital"] + "</td>";
        var td3 = "<td>" + response[i]["age"] + "</td>";
        var td4 = "<td>" + response[i]["address"] + "</td>";
        var td5 = "<td>" + response[i]["fir_no"] + "</td>";
        var td6 = "<td>" + response[i]["case_type"] + "</td>";
        var td7 = "<td>" + response[i]["case_subtype"] + "</td>";
        var td8 = "<td>" + response[i]["property_srno"] + "</td></tr>";

        $("#tfr").append(tr + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8);
    }
}

function getDetailedInformation(casetype) {

    $.getJSON(getApiUrl(ip, port, endpoints.getPersonAdvSearch), { fromdate, todate, name, casetype }, function (response) {

        processGetFullResult(response);
    })
        .done(() => { console.log("API - 1 Done"); })

        .fail(() => {

            let response = [{
                "name": "RAVI",
                "marital": "SINGLE",
                "age": 39,
                "address": "PERUMAL KOIL ST AZHUSUR VILLAGE ",
                "fir_no": "20090050",
                "case_type": "CRIME",
                "case_subtype": "THEFT",
                "property_srno": "{758}"
            }, { "name": "RAVI", "marital": "SINGLE", "age": 44, "address": "VETTUVA STREET, KALAPPA NAIKKAN PATTY PUDUR, SENDAMANGALAM. ", "fir_no": "20090129", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{50,53}" }, { "name": "RAVI", "marital": "SINGLE", "age": 31, "address": "BACK WARD COLONY RASIPURAM ", "fir_no": "20090290", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{387,385,386}" }, { "name": "RAVI", "marital": "SINGLE", "age": 39, "address": "36 ESWARAN KOVIL STREET EKKOOR(PO) TIRUPPATHOOR", "fir_no": "20090067", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{72}" }, { "name": "RAVINDRA NAICK", "marital": "SINGLE", "age": 37, "address": "MITTIPIDIKKI RAYCHOTTI TK KADAPPA DT ANDRAPRADESH STATE", "fir_no": "20090071", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{54,53,75,51,76}" }, { "name": "RAVI", "marital": "SINGLE", "age": 39, "address": "CHETTYMEDU COLONY PADALAM PS H MKM TK ", "fir_no": "20090109", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{182,183,185,187,186,181}" }, { "name": "RAVI", "marital": "SINGLE", "age": 33, "address": "VEPPANCHERRY VILLAGE, CHEYYUR TK ", "fir_no": "20090127", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{308}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "28 THARUSUKADU THOTTAM MANGALAKARAIPUDUR KARAMADAI CBE", "fir_no": "20090801", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{117,118}" }, { "name": "RAVI", "marital": "SINGLE", "age": 26, "address": "39,PALANI GOUNDER ST POLLACHI ", "fir_no": "20090523", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{269,266}" }, { "name": "RAVINDRAN", "marital": "SINGLE", "age": 33, "address": "31 AMMAN KOIL ST ALAPAKKAM ", "fir_no": "20090138", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{249,244,245,237,247,246,250}" }, { "name": "RAVIKUMAR", "marital": "SINGLE", "age": 36, "address": "SUBURAI NAGAR MEENACHIPURAM ", "fir_no": "20090044", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{80,81}" }, { "name": "RAVI", "marital": "MARRIED", "age": 45, "address": "28,MANGARAI PUDUR KARAMADAI COIMBATORE ", "fir_no": "20090265", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{175}" }, { "name": "RAVI", "marital": "SINGLE", "age": 29, "address": "39, PALANI GOUNDER STREET POLLACHI ", "fir_no": "20090271", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{30}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "28 THARUSUKADU THOTTAM MANGALAKARAI PUDUR KARAMADAI CBE", "fir_no": "20090809", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{97,94}" }, { "name": "RAVINDRAN", "marital": "SINGLE", "age": 31, "address": "76 THANJATHUR, ILAYANKUDI SIVAGANGAI ", "fir_no": "20090631", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{337,333}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "28 THARUSUKADU THOTTAM MANGALAKARAIPUDUR KARAMADAI CBE", "fir_no": "20090803", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{120,119}" }, { "name": "DRAVIN JET", "marital": "SINGLE", "age": 38, "address": "232B, RAJAKA MANGALAM ROAD KARMAL SCHOOL OPP RAMAN PUDUR NAGARKOVIL KANYAKUMARI", "fir_no": "20090396", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{981,983}" }, { "name": "RAVI", "marital": "SINGLE", "age": 35, "address": "72 MARIYAMMAN KOIL ST KEELAVATHY RAILWAY STATION VIRUTHANAM ", "fir_no": "20090420", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{272}" }, { "name": "RAVI", "marital": "SINGLE", "age": 35, "address": "KEELAVATHI RAILWAY STATION NEAR VIRUTHACHALAM ", "fir_no": "20090153", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{309}" }, { "name": "RAVI R C", "marital": "MARRIED", "age": null, "address": "NO.32 KAMARAJ COLONY STREET VEERAPPAN CHATRAM ERUVENI ", "fir_no": "20090001", "case_type": "CRIME", "case_subtype": "CHEATING", "property_srno": "{11,15,14,10,12,13}" }, { "name": "RAVI KUMAR", "marital": "SINGLE", "age": 34, "address": "71/120C,KATHAI AMMAL NAGAR MANIYAUNUR SELAM ", "fir_no": "20090184", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{193}" }, { "name": "RAVI", "marital": "SINGLE", "age": 38, "address": "NO 112 S RAMASAMY NAGAR BNAGAJ MILL ROAD PULIYAKULAM ", "fir_no": "20090057", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{2053}" }, { "name": "RAVI", "marital": "SINGLE", "age": 35, "address": "72 MARIAMMAN KOVIL STREET DOWN HALF NEAR RAILWAY JUN VIRUTHACHALAM VILUPURAM", "fir_no": "20090069", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{216}" }, { "name": "RAVI M", "marital": "SINGLE", "age": 35, "address": "72 MAARIAMMAN TEMPLE BELOW HALF NEAR RAILWAY JUNCTION VIRUDHACHALAM VILUPURAM", "fir_no": "20090280", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{207}" }, { "name": "RAVI", "marital": "SINGLE", "age": 36, "address": "72 MARIAMMAN KOVIL STREET DOWN HALF NEAR RAILWAY JUN VIRUTHACHALAM VILUPURAM", "fir_no": "20090175", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{223}" }, { "name": "RAVI T", "marital": "SINGLE", "age": 60, "address": "LAKSHMI PURAM,GOUNDER THOTTAM ARUL PURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090164", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{337,341}" }, { "name": "RAVI T", "marital": "SINGLE", "age": 64, "address": "LAKSHMI PURAM,GOUNDER THOTTAM ARUL PURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090398", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{386,387}" }, { "name": "RAVI T", "marital": "SINGLE", "age": 62, "address": "LAKSHMI PURAM,GOUNDER THOTTAM ARUL PURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090386", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{351,353}" }, { "name": "RAVI T", "marital": "SINGLE", "age": 66, "address": "LAKSHMI PURAM,GOUNDER THOTTAM ARUL PURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090011", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{410,414,408,413,411,412,409}" }, { "name": "RAVI T", "marital": "SINGLE", "age": 67, "address": "LAKSHMI PURAM,GOUNDER THOTTAM ARUL PURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090412", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{422,421,420,419,418,417,416}" }, { "name": "RAVI T", "marital": "SINGLE", "age": 72, "address": "LAKSHMI PURAM,GOUNDER THOTTAM ARUL PURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090028", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{898,903,904,905,899,900,901,902}" }, { "name": "RAVI R", "marital": "SINGLE", "age": 59, "address": "LAKSHMI NAGAR,GOUNDER THOTTAM ARULPURAM KARAIPUDHUR TRIPPUR", "fir_no": "20090304", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{860}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "GROWN STREET VATHIYAR VILAI NAGERCOIL ", "fir_no": "20090027", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{2666,2295}" }, { "name": "RAVI", "marital": "SINGLE", "age": 46, "address": "NORTH STREET PATTUKOTTAI THANJAVOOR ", "fir_no": "20090053", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{32,31,33,34}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "NORTH STREET KOLLUKADU PATHIRY KOTTAI,PATTU KOTTAI ", "fir_no": "20090147", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{41,36,37,35}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "VATHIYAR VILAI NAGER COIL ", "fir_no": "20090110", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{2417,2407}" }, { "name": "RAVI", "marital": "SINGLE", "age": 32, "address": "M G R NAGER AR4ALVAIMOZHI ", "fir_no": "20090180", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{2460,2439,2441,2459}" }, { "name": "RAVI", "marital": "SINGLE", "age": 34, "address": "MGR NAGER ARALVAIMOZHI ", "fir_no": "20090090", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{2337,2343}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "KOLLU KADU PATTUKOTTAI ", "fir_no": "20090121", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{573,574}" }, { "name": "RAVI", "marital": "SINGLE", "age": 45, "address": "VADAKKU ST PATHRI KOTTAI PATTU KOTTAI THANJAVOOR ", "fir_no": "20090087", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{15,13}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "PAKIRA KOTTAI PATTUKOTTAI ", "fir_no": "20090100", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{586}" }, { "name": "RAVI", "marital": "SINGLE", "age": 46, "address": "NORTH STREET PATHIRIKOTTAI PATTUKOTTAI ", "fir_no": "20090070", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{22,21,24}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "BHATHRI KOTTAI PATTU KOTTAI ", "fir_no": "20090146", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{34,33,39}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "NORTH STREET KOLLUKADU PATHIRI KOTTAI PATTU KOTTAI", "fir_no": "20090145", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{32,38,31}" }, { "name": "RAVI", "marital": "SINGLE", "age": 34, "address": "PERIYATHALLAVADI SINGARAPURAM KRISHNAN ", "fir_no": "20090179", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{85,88}" }, { "name": "RAVI", "marital": "SINGLE", "age": 35, "address": "NORTH STREET THANJAVOOR ", "fir_no": "20090033", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY DAY", "property_srno": "{6,3}" }, { "name": "RAVI", "marital": "SINGLE", "age": 35, "address": "NORTH STREET THANJAVOOR ", "fir_no": "20090032", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{2,5}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "KELA GONTA KADU BATTUKOTTAI ", "fir_no": "20090063", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{3,4,5,6}" }, { "name": "RAVI", "marital": "SINGLE", "age": 37, "address": "MUNIYAPPAN KOIL OPPOSITE VIRUDHACHALAM ", "fir_no": "20090011", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{484,489}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "VADAKAL ST MURARPAKKAM SANKARAPURAM TK ", "fir_no": "20090221", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{101}" }, { "name": "RAVI", "marital": "SINGLE", "age": 36, "address": "AYYANAR KULAM USILAMPATTI ", "fir_no": "20090138", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{366,380}" }, { "name": "RAVI", "marital": "SINGLE", "age": 50, "address": "NAGAMALAI PUDUKOTTAI MADURAI ", "fir_no": "20090012", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{372,371}" }, { "name": "RAVI CHANDRAN", "marital": "MARRIED", "age": 48, "address": "CHIKKANDHAR SAVADI MDU ", "fir_no": "20090222", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{473,468}" }, { "name": "RAVI", "marital": "SINGLE", "age": 38, "address": "SIKKANTHAR CHAVADI ", "fir_no": "20090270", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{201,208}" }, { "name": "RAVI CHANDRAN", "marital": "MARRIED", "age": 40, "address": "SOLAI COMPOUND CHIKKANDAR CHAVADI ", "fir_no": "20090169", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{500,502}" }, { "name": "RAVI CHANDRAN", "marital": "SINGLE", "age": 43, "address": "SOLAI COMPOUND SIKKANTHAR CHAVADI KOODAL PUDUR MADURAI 18", "fir_no": "20090134", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{1052,1051}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "SRVAISOLAIKULAM SIKKANDAR SAWADI ADURAI ", "fir_no": "20090187", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{2646,2647}" }, { "name": "RAVI", "marital": "SINGLE", "age": 39, "address": "SIKKANTHAR SAVADI ", "fir_no": "20090233", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{1039,1042}" }, { "name": "RAVI", "marital": "SINGLE", "age": 52, "address": "163- MEENAMBIGAI NAGAR 5TH ST MADURAI ", "fir_no": "20090277", "case_type": "CRIME", "case_subtype": "OTHERS", "property_srno": "{378,377}" }, { "name": "RAVI SANKAR", "marital": "SINGLE", "age": 38, "address": "5/225, MAAMARATHU KULAAIY ST GANAGAVEL NAGAR AATHIKULAM K.PUDUR. MADURAI", "fir_no": "20090257", "case_type": "CRIME", "case_subtype": "RECEIVER OF STOLEN PROPERTY", "property_srno": "{885,884,878,879,882,887}" }, { "name": "RAVI", "marital": "SINGLE", "age": 27, "address": "3/27,ANUMAR KOVIL STREET SRIRANGAM TRICHY DT ", "fir_no": "20090457", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{182,181}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "163- MEENAMBIGAI NAGAR 5TH ST MADURAI ", "fir_no": "20090265", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{320,312}" }, { "name": "RAVI", "marital": "SINGLE", "age": 51, "address": "163- MEENAMBIGAI NAGAR 5TH ST MADURAI ", "fir_no": "20090276", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{333,341}" }, { "name": "RAVI CHANDRAN", "marital": "MARRIED", "age": 42, "address": "CHIKKANDHAR SAVADI PUTHUMBU MADURAI ", "fir_no": "20090184", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{240,241}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "SOLAI COMPOUND SIKKANTHAR SAVADI POTHUMPU MADURAI", "fir_no": "20090320", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{257,261}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "SOLAI COMPOUND SIKKANTHAR SAVADI MADURAI ", "fir_no": "20090526", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{1636,1641}" }, { "name": "RAVI", "marital": "SINGLE", "age": 29, "address": "1/113 NARMATHA ST ATHIKULAM MADURAI 7 ", "fir_no": "20090450", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{449,453}" }, { "name": "RAVICHANDRAN M", "marital": "SINGLE", "age": 49, "address": "VINAYAGAR THOPPU SEMBIYAN MAHA DEVI ", "fir_no": "20090100", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{51}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "SOLAI COMPOUND SIKKANDHAR SAVADI POTHUMBU MADURAI", "fir_no": "20090548", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{340,329}" }, { "name": "RAVI", "marital": "SINGLE", "age": 49, "address": "ATHU ST , ARCOT TK VELLORE ", "fir_no": "20090053", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{544}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "ODUKATHUR VELLORE TK VELLORE DT ", "fir_no": "20090079", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{145,142}" }, { "name": "RAVIKUMAR", "marital": "SINGLE", "age": 33, "address": "71/120 THAYHAYAMMAN NAGAR MAINYANUR ", "fir_no": "20090072", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{510,511,512}" }, { "name": "RAVICHANDIRAN", "marital": "SINGLE", "age": 49, "address": "VELAR STREET PARUKAIKUDI ", "fir_no": "20090090", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{74,181}" }, { "name": "RAVI", "marital": "SINGLE", "age": 29, "address": "JEGANATHA KOIL STREET ARCOT ", "fir_no": "20090579", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{295,296,289}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "T NAGAR MANDAPAM ", "fir_no": "20090022", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{35}" }, { "name": "RAVI KUMAR", "marital": "SINGLE", "age": null, "address": "ETHAPUR SALEM DT ", "fir_no": "20090141", "case_type": "CRIME", "case_subtype": "CHEATING", "property_srno": "{97}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": 38, "address": "VAKARA MARIYAMMAN KOIL STREET NANCHALORE PO CHIDAMBARAM ", "fir_no": "20090021", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{665,666}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": 48, "address": "VAKKARAMARI CHIDAMBARAM TK ", "fir_no": "20090019", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{686,682,678,680,683,679}" }, { "name": "RAVICHANDHIRAN", "marital": "SINGLE", "age": 40, "address": "SALEM CAMP ", "fir_no": "20090015", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{129,128}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": 45, "address": "AMMA PETTAI THANJAVUR ", "fir_no": "20090115", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{45,47}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": null, "address": "VAKKARAMARI ", "fir_no": "20090017", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{692,690}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": 48, "address": "VAKKARAMARI NANJALUR ", "fir_no": "20090016", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{701,696}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": 52, "address": "EB OFF READ SIDE THIRUKATTUPALLI ", "fir_no": "20090024", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{247}" }, { "name": "THIRAVIYAM", "marital": "SINGLE", "age": 50, "address": "THATCHANVILAI ", "fir_no": "20090026", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{15,18}" }, { "name": "RAVI", "marital": "SINGLE", "age": 44, "address": "SANTHIYA KINATTHU THERU SVPR ", "fir_no": "20090334", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{322,339,340,320}" }, { "name": "RAVI", "marital": "SINGLE", "age": 36, "address": "SEKKI PILLAIYAR KOVIL STREET THURAIYUR ", "fir_no": "20090187", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{51}" }, { "name": "RAVI", "marital": "SINGLE", "age": 33, "address": "GANESANPURAM POTHANUR COIMBATORE ", "fir_no": "20090049", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{481,483,482}" }, { "name": "RAVI", "marital": "MARRIED", "age": 65, "address": "PATTU STREET VIRUDHUNAGAR ", "fir_no": "20090110", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{769,768}" }, { "name": "RAVI", "marital": "SINGLE", "age": 46, "address": "TIPPO ROAD BHARATHIPURAM DINDIGUL ", "fir_no": "20090057", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{17}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "SANTHAI KINARIU ST. SRIVILLIPUTHUR ", "fir_no": "20090026", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{10,9,8,7}" }, { "name": "RAVI", "marital": "SINGLE", "age": 52, "address": "THAIKKAL STREET CHETTIYAR THOPPU MADURAI ", "fir_no": "20090130", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{219}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "BHARATHIPURAM DIPPO ROAD DINIDGUL ", "fir_no": "20090082", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{39,41}" }, { "name": "RAVI", "marital": "SINGLE", "age": 33, "address": "KANJAMPATTU VILLAGE MADDHUR POST ARAKKONAM TK ", "fir_no": "20090068", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{171,172}" }, { "name": "RAVI", "marital": "MARRIED", "age": 50, "address": "KALLAMBEDU ", "fir_no": "20090075", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{209}" }, { "name": "RAVI", "marital": "MARRIED", "age": 47, "address": "KALLAMBEDU ", "fir_no": "20090074", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{160}" }, { "name": "RAVIKRISHNAN B", "marital": "SINGLE", "age": null, "address": "SANDAVELIPETTAI PANRUTI CUDDALORE ", "fir_no": "20090002", "case_type": "CRIME", "case_subtype": "MISAPPROPRIATION", "property_srno": "{1}" }, { "name": "RAVICHANDRAN R", "marital": "SINGLE", "age": null, "address": "KADAPAKKAM ", "fir_no": "20090002", "case_type": "CRIME", "case_subtype": "MISAPPROPRIATION", "property_srno": "{36}" }, { "name": "RAVIKUMAR V", "marital": "SINGLE", "age": null, "address": "KAPPIVAKKAM VEDAL POST ", "fir_no": "20090002", "case_type": "CRIME", "case_subtype": "MISAPPROPRIATION", "property_srno": "{36}" }, { "name": "RAVIRAJ", "marital": "SINGLE", "age": 58, "address": "KUZHITHURAI POST KANNIYAKUMARI ", "fir_no": "20090001", "case_type": "CRIME", "case_subtype": "MISAPPROPRIATION", "property_srno": "{16}" }, { "name": "RAVIKUMAR", "marital": "SINGLE", "age": 42, "address": "NO.37/57 BHARATHI NAGAR CHINNA KARAKUTTY MANDAVELI CHENNAI 28", "fir_no": "20090025", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{262,263}" }, { "name": "L RAVI", "marital": "SINGLE", "age": null, "address": "30, BHARATHIYAR STREET PICHANUR, GUDIYATHAM ", "fir_no": "20090003", "case_type": "CRIME", "case_subtype": "MISAPPROPRIATION", "property_srno": "{6}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "KOTTUR THENI ", "fir_no": "20090002", "case_type": "CRIME", "case_subtype": "MISAPPROPRIATION", "property_srno": "{26}" }, { "name": "RAVICHANTHIRAN", "marital": "SINGLE", "age": 42, "address": "NO. 63. SANJAIGANTHI NAGAR, FIRST ST, CHORMEPET CHENNAI-44 ", "fir_no": "20090048", "case_type": "CRIME", "case_subtype": "CHEATING", "property_srno": "{2108}" }, { "name": "RAVI", "marital": "MARRIED", "age": 52, "address": "KUZHIYAN VIZHAI SEVARA POST, KOTTUKAAL VILLAGE, BALA RAMA PURAM ( VIA ) THIRUVANANTHAPURAM, KEALA", "fir_no": "20090001", "case_type": "CRIME", "case_subtype": "COUNTERFEITING", "property_srno": "{193,235,100,54,98,99,192,194,106,105,104,103,155,156,159,157,102,158,101,160}" }, { "name": "RAVI", "marital": "SINGLE", "age": 47, "address": "NO.2/591 , BHAVANI AMMAN KOIL ST , KANNAIPALANI , THIRUENDRAYUR , CHENNAI ", "fir_no": "20090087", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{526,524}" }, { "name": "RAVI", "marital": "SINGLE", "age": 42, "address": "NO.2/591, BHAVANI AMMAN KOIL ST KANDAI PALAYAM TIRUNINDRAVUR TIRUVALLUR DIST", "fir_no": "20090278", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{141,144,142,143}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "212, G BLOCK SVM NAGAR CHENNAI-12 ", "fir_no": "20090104", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{91}" }, { "name": "RAVI", "marital": "SINGLE", "age": 33, "address": "NO.17 ARAMPUNDY VILLEGE SANGARAPURAM TK VILUPPURAM DIST", "fir_no": "20090077", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{113,114}" }, { "name": "RAVI", "marital": "SINGLE", "age": 57, "address": "NO:2, KANAKKAR ST THIRUVOTTIYUR CH-19 ", "fir_no": "20090016", "case_type": "CRIME", "case_subtype": "CHEATING", "property_srno": "{492,497}" }, { "name": "RAVINDRANATH", "marital": "SINGLE", "age": 64, "address": "NO. E MAMIRAJVAL GARDEN, NO.23, 5TH MAIN ROAD, NATESA N VIRUGAMBAKKAM, CH- 92.", "fir_no": "20090068", "case_type": "CRIME", "case_subtype": "OTHERS", "property_srno": "{101,100}" }, { "name": "RAVI KUMAR", "marital": "SINGLE", "age": 36, "address": "NO.5 SENTHIL NAGAR TALUK AARIS ROAD , RAM NAGAR DEVAKOTTAI SIVA GANGAI DISTRICT", "fir_no": "20090349", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{1452,1451,1450,1453}" }, { "name": "RAVINTHIRAN", "marital": "SINGLE", "age": 31, "address": "NO.84 BHARATHI NAGAR 2TH ST VILLIVAKKAM CH-49 ", "fir_no": "20090289", "case_type": "CRIME", "case_subtype": "OTHERS", "property_srno": "{987,988,985,986}" }, { "name": "RAVI", "marital": "SINGLE", "age": 31, "address": "NO 18/22 2ND ST JAINAGAR CHENNAI 106 ", "fir_no": "20090283", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{81,74}" }, { "name": "RAVI SHANKAR BABU", "marital": "SINGLE", "age": 17, "address": "11/15 SAMIYAR MADAM CHENNAI 600103 ", "fir_no": "20090091", "case_type": "CRIME", "case_subtype": "OTHERS", "property_srno": "{3}" }, { "name": "RAVI", "marital": "SINGLE", "age": 35, "address": "NO 257 CORPARESAN LAIE THANDIYARPET CH 21 ", "fir_no": "20090322", "case_type": "CRIME", "case_subtype": "DACOITY", "property_srno": "{385}" }, { "name": "RAVINRDAN", "marital": "SINGLE", "age": null, "address": "TASMAC(SHOP NO - 9175 - VADAKARAI REDHILLS CHENNAI", "fir_no": "20090312", "case_type": "CRIME", "case_subtype": "CHEATING", "property_srno": "{142}" }, { "name": "RAVI", "marital": "SINGLE", "age": 41, "address": "NO 7F, CHANDIRA PLOTS KARUKU AMBATTUR CHENNAI ", "fir_no": "20090194", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{765,767}" }, { "name": "RAVICHANDRAN", "marital": "SINGLE", "age": 29, "address": "NO:22,3RD STREET, RADHAKRISHNAN NAGAR, THIRUVOTTIYUR, CHENNAI 600019.", "fir_no": "20090197", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{152,151}" }, { "name": "ARAVINTH KUMAR", "marital": "SINGLE", "age": 35, "address": "57,ALATCHI NGAGAR 4TH STREET GUINDY ", "fir_no": "20090184", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY DAY", "property_srno": "{91,89,90,85,84,88,87,86}" }, { "name": "RAVI", "marital": "SINGLE", "age": 30, "address": "NO. 2/72 KEEL ST AMSA NATHAM OSSUR KRISHNAGIRI - DIRST", "fir_no": "20090081", "case_type": "CRIME", "case_subtype": "OTHERS", "property_srno": "{1185,1193,1194}" }, { "name": "RAVI", "marital": "SINGLE", "age": 44, "address": "NO. 7F. CHANDRA FLOTS KARUKKU AMBATTUR CHENNAI-53 ", "fir_no": "20090301", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{716,713}" }, { "name": "RAVI", "marital": "SINGLE", "age": 46, "address": "NO. 7F. CHANDRA FLOTS KARUKKU AMBATTUR CHENNAI-53 ", "fir_no": "20090317", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{719,720}" }, { "name": "RAVI", "marital": "SINGLE", "age": 44, "address": "NO 16 PERUMAL KOIL STREET NEERKUNDRAM CHENNAI", "fir_no": "20090034", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{864,871,872,873,862,874}" }, { "name": "RAVI", "marital": "SINGLE", "age": 46, "address": "MANGALA KARAIPUDUR ", "fir_no": "20090070", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{208,209,211}" }, { "name": "RAVI", "marital": "SINGLE", "age": 45, "address": "MANGALA KARAIPUDUR ", "fir_no": "20090272", "case_type": "CRIME", "case_subtype": "HOUSE BURGLARY NIGHT", "property_srno": "{154,155}" }, { "name": "RAVISANKAR", "marital": "SINGLE", "age": 41, "address": "5,PALAKKAD RD,NALLUR,POLLACHI ", "fir_no": "20090015", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{4,5}" }, { "name": "RAVI", "marital": "SINGLE", "age": null, "address": "MANGALA KARAI PUDUR KARAMADAI CBE ", "fir_no": "20090116", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{254,253}" }, { "name": "ARAVINDHAN S", "marital": "SINGLE", "age": 33, "address": "4 MEENA NAGAR SOLIPALAYAM AVALPOONTHURAI PALANI ROAD, ERODE", "fir_no": "20091296", "case_type": "CRIME", "case_subtype": "DACOITY", "property_srno": "{216}" }, { "name": "RAVIKUMAR", "marital": "SINGLE", "age": 27, "address": "4/177, MAIN ROAD BODIPATTI- ", "fir_no": "20090659", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{67,68}" }, { "name": "RAVI SANKAR", "marital": "SINGLE", "age": 39, "address": "5, PALAKKAD MAIN ROAD NALLUR POLLACHI TK ", "fir_no": "20090135", "case_type": "CRIME", "case_subtype": "ROBBERY", "property_srno": "{245,243}" }, { "name": "RAVISHANGAR", "marital": "SINGLE", "age": 39, "address": "5 PALAKKADU MAIN ROAD POLLACHI ", "fir_no": "20090134", "case_type": "CRIME", "case_subtype": "THEFT", "property_srno": "{44,43}" }];

            processGetFullResult(response);

        })

        .always(() => { console.log("1 Finished"); });

}
/* * * * * * */

