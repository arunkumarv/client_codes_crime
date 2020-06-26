let name = null;

let fromdate = null;

let todate = null;

let district = null;





function getDistricts() {

    name = document.getElementById('name').value;

    fromdate = document.getElementById('fromdate').value;

    todate = document.getElementById('todate').value;

    console.log(name, fromdate, todate);

    $.getJSON(getApiUrl(ip, port, endpoints.getDistricts), { fromdate, todate, name }, function (response) {

        console.log(response);

        $("#districts-count").empty();

        response.forEach(function (item, index) {

            $("#districts-count").append(`<li onclick="getTaluks('${item.district}')">${item.district}: ${item.count}</li>`)

        });

    })
        .done(() => { console.log("API - 1 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [{ "count": 11, "district": "coimbatore" }, { "count": 16, "district": "cuddalore" }, { "count": 3, "district": "dharmapuri" }, { "count": 2, "district": "dindigul" }, { "count": 6, "district": "erode" }, { "count": 4, "district": "kancheepuram" }, { "count": 1, "district": "kanniyakumari" }, { "count": 4, "district": "karur" }, { "count": 1, "district": "krishnagiri" }, { "count": 19, "district": "madurai" }, { "count": 4, "district": "nagapattinam" }, { "count": 3, "district": "namakkal" }, { "count": 3, "district": "nilgiris" }, { "count": 303, "district": "null" }, { "count": 3, "district": "pudukkottai" }, { "count": 14, "district": "salem" }, { "count": 2, "district": "sivaganga" }, { "count": 11, "district": "thanjavur" }, { "count": 2, "district": "theni" }, { "count": 1, "district": "thiruvallur" }, { "count": 1, "district": "thiruvarur" }, { "count": 2, "district": "thoothukkudi" }, { "count": 5, "district": "tiruchirappalli" }, { "count": 1, "district": "tirunelveli" }, { "count": 2, "district": "tiruvannamalai" }, { "count": 21, "district": "vellore" }, { "count": 10, "district": "viluppuram" }, { "count": 1, "district": "virudhunagar" }];

            $("#districts-count").empty();

            response.forEach(function (item, index) {

                $("#districts-count").append(`<li onclick="getTaluks('${item.district}')">${item.district}: ${item.count}</li>`)

            });

            var $li = $('#districts-count li').click(function() {

                $li.removeClass('selected');
                
                $(this).addClass('selected');
            });
        })

        .always(() => { console.log("1 Finished"); });
}

function getTaluks(district) {

    console.log(district);

    district = district;

    $.getJSON(getApiUrl(ip, port, endpoints.getTaluks), { fromdate, todate, name, district }, function (response) {

        console.log(response);

        $("#taluks-count").empty();

        response.forEach(function (item, index) {

            $("#taluks-count").append(`<li onclick="getAnony('${item.taluk}')">${item.taluk}: ${item.count}</li>`)

        });

        var $li = $('#taluks-count li').click(function() {

            $li.removeClass('selected');
            
            $(this).addClass('selected');
        });

    })
        .done(() => { console.log("API - 1 Done"); })

        .fail(() => {

            // alert("error> Please check the console: Command + Option + j"); 

            let response = [{ "taluk": "mettupalayam", "count": 1 }, { "taluk": "null", "count": 2 }, { "taluk": "pollachi", "count": 4 }]

            $("#taluks-count").empty();

            response.forEach(function (item, index) {

                $("#taluks-count").append(`<li onclick="getAnony('${item.taluk}')">${item.taluk}: ${item.count}</li>`)

            });
            
            var $li = $('#taluks-count li').click(function() {

                $li.removeClass('selected');
                
                $(this).addClass('selected');
            });
            
        })

        .always(() => { console.log("1 Finished"); });
}

function getAnony(taluk) {

    console.log(taluk);
}