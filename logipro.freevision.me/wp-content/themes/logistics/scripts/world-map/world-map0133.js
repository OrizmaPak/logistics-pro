google.load('visualization', '1', {
  'packages': ['geochart']
});
google.setOnLoadCallback(drawVisualization);

function drawVisualization() {

var map_data = jQuery.parseJSON(ozyLocationsMapData.mapData);
//console.log(map_data);
  var urlArray = Array();
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Country');
  data.addColumn('number', 'Value');
  data.addColumn({
    type: 'string',
    role: 'tooltip'
  });
  var ivalue = new Array();
  var name = new Array();
  for(i = 0;i<map_data.length;i++) {
	data.addRows([
	[{
		v: map_data[i][0],
		f: map_data[i][1],
		u: map_data[i][3]
	  },
	  0,
	  map_data[i][2]
	]
	]);
	ivalue[map_data[i][0]] = '';
	urlArray[i] = map_data[i][3];
  }

  var options = {
    colorAxis: {
      minValue: 0,
      maxValue: 1,
      colors: [
        '#002242',
        '#002242',
      ]
    },
    legend: 'none',
    backgroundColor: '#e8eaeb',
    datalessRegionColor: '#bfc8d0',
    displayMode: 'regions',
    enableRegionInteractivity: 'true',
    resolution: 'countries',
    sizeAxis: {
      minValue: 0,
      maxValue: 1,
    },
    projection: 'kavrayskiy-vii',
    region: 'world',
    keepAspectRatio: true,
    width: 100 + '%',
    height: 100 + '%',
    tooltip: {
      isHtml: true,
      textStyle: {
        color: '#002242'
      },
      trigger: 'focus',

    }
  };
  var chart = new google.visualization.GeoChart(document.getElementById('visualization'));
  google.visualization.events.addListener(chart, 'select', function() {
    var selection = chart.getSelection();
    if (selection.length == 1) {
      var selectedRow = selection[0].row;
      var selectedRegion = data.getValue(selectedRow, 0);
      if (ivalue[selectedRegion] != '') {
        document.getElementById('message').innerHTML = ivalue[selectedRegion];
      }
      if (name[selectedRegion] != '') {
        document.getElementById('name').innerHTML = name[selectedRegion];
      }
    }
  });
  var chart = new google.visualization.GeoChart(document.getElementById('visualization'));
  google.visualization.events.addListener(chart, 'select', function() {
    var selection = chart.getSelection();
    if ((selection.length == 1) && (((data.getValue(chart.getSelection()[0]['row'], 1) == 0)))) {
      var selectedRow = selection[0].row;
      var selectedRegion = data.getFormattedValue(selectedRow, 0);
	  if(urlArray[selectedRow] != '#') { window.location = urlArray[selectedRow]; }
    }
  });
  chart.draw(data, options);
  go();
  window.addEventListener('resize', go);

  function go() {
    chart.draw(data, options);
  }
}