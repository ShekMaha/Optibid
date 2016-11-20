$(function(){
	var ctx = document.getElementById("canvas").getContext("2d");
	var myMixedChart;
	var performedOnce = false;
	var dataPoints = []
	function gatherData(){
		$.ajax(
			{
				url: 'http://localhost:8000/impressions?dc=NA',
				type: 'GET',
				dataType: 'json',
				success: function(data){					
					counter = 0;
					
					data.data.forEach(function(data){
						if (counter % 100 == 0){

							if (performedOnce){
								//console.log(dataPoints[0]);
								dataPoints.splice(0, 1);
								//console.log(dataPoints[0]);
								//dataPoints.push(dataPoint);
								//update(dataPoints, {
								//	x: counter,
								//	y: data.impressions
								//});
							}	
							//}else{
								dataPoints.push({
									x: counter,
									y: data.impressions
								});						
							//}					
						}
						counter++;
					});
					//if (!performedOnce){
						plot(dataPoints);
						performedOnce = true;
					//}
					
				}
			}
		)
	}
	gatherData();	
	setInterval(gatherData, 5000);
	function update(dataPoints, dataPoint){
		dataPoints.splice(0, 1);
		dataPoints.push(dataPoint);
		plot(dataPoints);
	}
	
	function plot(dataPoints){
		 ctx = document.getElementById("canvas").getContext("2d");
		 var chartData = { 
		 	datasets: [{
                type: 'line',
                borderColor: window.chartColors.blue,
                borderWidth: 2,
                fill: false,
                data: dataPoints
            }]
        }
        window.myMixedChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                  scales: {
                      xAxes: [{
                          type: 'linear',
                          position: 'bottom'
                      }]
                  }
              }
        });
        window.myMixedChart.update();
        //update(chartData);
	}
//         window.onload = function() {
            
//             for (var i=0; i < 100; i++){
//             window.myMixedChart = new Chart(ctx, {
//                 type: 'line',
//                 data: chartData,
//                 options: {
//                   scales: {
//                       xAxes: [{
//                           type: 'linear',
//                           position: 'bottom'
//                       }]
//                   }
//               }
//             });
//             randomize();
//     		}
//         };
//         function randomize(){
//         	chartData = {
//             datasets: [{
//                 type: 'line',
//                 borderColor: window.chartColors.blue,
//                 borderWidth: 2,
//                 fill: false,
//                 data: [{
//                     x: 0,
//                     y: randomScalingFactor()
//                 }, {
//                   x: 1,
//                   y: randomScalingFactor()
//                 }, {
//                   x: 2,
//                   y: randomScalingFactor()
//                 }, {
//                   x: 3,
//                   y: randomScalingFactor()
//                 }, {
//                   x: 4,
//                   y: randomScalingFactor()
//                 },{
//                   x: 5,
//                   y: randomScalingFactor()
//                 },{
//                   x: 6,
//                   y: randomScalingFactor()
//                 }]
//             }]

//         };
//             window.myMixedChart.update();
//         }
});
