jQuery('.ozy-chart').each(function(index, element) {

	var $this = jQuery(this);
	var ctx = $this[0].getContext('2d');
	var labels = [];
	var backgroundColor = [];
	var dataValues = [];

	jQuery.each(jQuery.parseJSON(ozyChartData[jQuery(this).data('chartid')]), function(i, row) {
		labels.push(row[0]);
		dataValues.push(row[1]);
		backgroundColor.push(row[2]);
	});

	var data = {
		labels: labels,
		datasets: [{
		  backgroundColor: backgroundColor,
		  data: dataValues
		}]
	  };
	var myChart = new Chart(ctx, {
	  type: $this.data('type'),
	  data: data,
	  options: {
		legend: {
		  display: $this.data('legends'),
		  position: $this.data('legends_position'),
		  labels: {
			padding:8,
			usePointStyle:true,
			fontColor: $this.data('fncolor'),
		  }
		},
		title: {
			display: true,
			text: $this.data('title'),
			position: $this.data('titleposition'),
			fontColor: $this.data('fncolor'),
		},
		tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						var allData = data.datasets[tooltipItem.datasetIndex].data;
						var tooltipLabel = data.labels[tooltipItem.index];
						var tooltipData = allData[tooltipItem.index];
						var total = 0;
						for (var i in allData) {
							total += parseInt(allData[i]);
						}
						var tooltipPercentage = Math.round((tooltipData / total) * 100);
						return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
					}
				}
			}
	  }
	});
});