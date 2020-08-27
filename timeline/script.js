$(document).ready(function () {

  $('[data-toggle="popover"]').popover({

    'container': '#pf-timeline',

    'placement': 'top'
  });
});

$(document).on('click', '.drop', function () { $(this).popover('show'); });

$(document).on('click', '.grid', function () { $('[data-toggle="popover"]').popover('hide'); });

const ONE_HOUR = 60 * 60 * 1000,ONE_DAY = 24 * ONE_HOUR,ONE_WEEK = 7 * ONE_DAY,ONE_MONTH = 30 * ONE_DAY,SIX_MONTHS = 6 * ONE_MONTH;

var data = [], start = new Date('2016-04-02T20:14:22.691Z'), today = new Date('2016-05-02T17:59:06.134Z');

var timeline = d3.chart.timeline().end(today).start(today - ONE_WEEK).minScale(ONE_WEEK / ONE_MONTH).maxScale(ONE_WEEK / ONE_HOUR).eventClick(function (el) {

  var table = '<table class="table table-striped table-bordered">';

  if (el.hasOwnProperty("events")) {

    table = table + '<thead>This is a group of ' + el.events.length + ' events starting on ' + el.date + '</thead><tbody>';

    table = table + '<tr><th>Date</th><th>Event</th><th>Object</th></tr>';

    for (var i = 0; i < el.events.length; i++) {

      table = table + '<tr><td>' + el.events[i].date + ' </td> ';

      for (var j in el.events[i].details) {

        table = table + '<td> ' + el.events[i].details[j] + ' </td> ';
      }

      table = table + '</tr>';
    }
    table = table + '</tbody>';

  } else {

    table = table + 'Date: ' + el.date + '<br>';

    for (i in el.details) {

      table = table + i.charAt(0).toUpperCase() + i.slice(1) + ': ' + el.details[i] + '<br>';
    }
  }
  $('#legend').html(table);
});

$('#timeline-selectpicker').on('changed.bs.select', function (event, clickedIndex, newValue, oldValue) {
  data[clickedIndex].display = !data[clickedIndex].display;
  element.datum(data.filter(function (eventGroup) {
    return eventGroup.display === true;
  }));
  timeline(element);
  $('[data-toggle="popover"]').popover({
    'container': '#pf-timeline',
    'placement': 'top'
  });
});

$('#datepicker').datepicker({
  autoclose: true,
  todayBtn: "linked",
  todayHighlight: true
});

$('#datepicker').datepicker('setDate', today);

$('#datepicker').on('changeDate', zoomFilter);

$(document.body).on('click', '.dropdown-menu li', function (event) {
  var $target = $(event.currentTarget);
  $target.closest('.dropdown')
    .find('[data-bind="label"]').text($target.text())
    .end()
    .children('.dropdown-toggle').dropdown('toggle');

  zoomFilter();

  return false;
});

function countNames(data) {
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].name !== undefined && data[i].name !== '') {
      count++;
    }
  }
  return count;
}

function zoomFilter() {
  var range = $('#range-dropdown').find('[data-bind="label"]').text(),
    position = $('#position-dropdown').find('[data-bind="label"]').text(),
    date = $('#datepicker').datepicker('getDate'),
    startDate,
    endDate;

  switch (range) {
    case '1 hour':
      range = ONE_HOUR;
      break;

    case '1 day':
      range = ONE_DAY;
      break;

    case '1 week':
      range = ONE_WEEK;
      break;

    case '1 month':
      range = ONE_MONTH;
      break;
  }
  switch (position) {
    case 'centered on':
      startDate = new Date(date.getTime() - range / 2);
      endDate = new Date(date.getTime() + range / 2);
      break;

    case 'starting':
      startDate = date;
      endDate = new Date(date.getTime() + range);
      break;

    case 'ending':
      startDate = new Date(date.getTime() - range);
      endDate = date;
      break;
  }
  timeline.Zoom.zoomFilter(startDate, endDate);
}


function getData(){

  $("#pf-timeline").empty();

  $.getJSON("./timeline/data.json", function(res){
    
    var json = [
      {
        "name": "Power Activity",
        "data": [
          { "date": "2016-04-08T15:07:37.374Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-08T15:07:37.374Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-15T21:04:16.247Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-22T09:39:26.155Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-06T09:56:00.311Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-28T02:49:19.957Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
        ]
      },
      {
        "name": "Alarm/Error",
        "data": [
          { "date": "2016-04-21T01:06:19.126Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-16T13:07:15.205Z", "details": { "event": "<a href='google.com'>This is a link</a>", "object": "hostName" } },
          { "date": "2016-04-30T20:02:25.693Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-30T20:02:26.664Z", "details": { "event": "vmPowerUp", "object": "vmNorm" } },
          { "date": "2016-04-30T20:02:27.627Z", "details": { "event": "vmPowerDown", "object": "vmGnome" } },
          { "date": "2016-04-30T20:02:28.694Z", "details": { "event": "vmPowerIn", "object": "vmNone" } },
          { "date": "2016-04-30T20:02:28.628Z", "details": { "event": "vmPowerOut", "object": "vmNoon" } },
          { "date": "2016-04-30T20:02:29.618Z", "details": { "event": "vmPowerOutage", "object": "vmName" } },
          { "date": "2016-04-30T20:02:25.693Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-07T22:35:41.145Z", "details": { "event": "vmPowerOff", "object": "hostName" } }
        ]
      },
      {
        "name": "Storage",
        "data": [
          { "date": "2016-04-13T21:06:27.205Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-13T05:48:37.174Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-12T01:13:02.594Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-03T12:30:24.813Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-28T02:56:16.627Z", "details": { "event": "vmPowerOff", "object": "hostName" } },
          { "date": "2016-04-03T20:42:55.008Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-28T21:18:16.319Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-24T00:49:22.314Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-05-02T15:56:59.659Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
        ]
      },
      {
        "name": "Network",
        "data": [
          { "date": "2016-04-09T06:42:50.582Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-22T21:02:05.862Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-26T14:12:57.818Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-04T05:50:13.526Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-23T12:24:32.260Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-23T19:50:49.191Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-15T15:46:03.502Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-11T03:38:07.292Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-06T07:02:24.391Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
        ]
      },
      {
        "name": "Deletion/Removal",
        "data": [
          { "date": "2016-04-10T02:47:22.214Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-05-02T01:55:40.478Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-10T15:23:35.542Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-15T17:18:05.597Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-09T17:03:28.422Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-05T06:32:38.593Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-03T22:53:24.855Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-29T02:11:24.694Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-16T11:10:06.399Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
        ]
      }
      ,
      {
        "name": "Creation/Addition",
        "data": [
          { "date": "2016-04-10T02:47:22.214Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-05-02T01:55:40.478Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-10T15:23:35.542Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-15T17:18:05.597Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-09T17:03:28.422Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-05T06:32:38.593Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-03T22:53:24.855Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-29T02:11:24.694Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-16T11:10:06.399Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-08T17:55:53.148Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
        ]
      },
      {
        "name": "Migration/VMotion",
        "data": [
          { "date": "2016-04-10T02:47:22.214Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-05-02T01:55:40.478Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-10T15:23:35.542Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-15T17:18:05.597Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-09T17:03:28.422Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-05T06:32:38.593Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-03T22:53:24.855Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-29T02:11:24.694Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
          { "date": "2016-04-16T11:10:06.399Z", "details": { "event": "vmPowerOn", "object": "vmName" } },
        ]
      }
    ];
    
    
    for (var x in json) { //json lives in external file for testing
      data[x] = {};
      data[x].name = json[x].name;
      data[x].data = [];
      for (var y in json[x].data) {
        data[x].data.push({});
        data[x].data[y].date = new Date(json[x].data[y].date);
        data[x].data[y].details = json[x].data[y].details;
      }
      $('#timeline-selectpicker').append("<option>" + data[x].name + "</option>");
      data[x].display = true;
    }
    
    $('#timeline-selectpicker').selectpicker('selectAll');
    
    
    if (countNames(data) <= 0) {
    
      timeline.labelWidth(60);
    }
    
    
    
    var element = d3.select('#pf-timeline').append('div').datum(data.filter(function (eventGroup) {
      return eventGroup.display === true;
    }));
    
    timeline(element);
    
    $(window).on('resize', function () {
      timeline(element);
      $('[data-toggle="popover"]').popover({
        'container': '#pf-timeline',
        'placement': 'top'
      });
    });
    
    $('#reset-button').click(function () {
      timeline(element);
      $('[data-toggle="popover"]').popover({
        'container': '#pf-timeline',
        'placement': 'top'
      });
    });
  });
}













