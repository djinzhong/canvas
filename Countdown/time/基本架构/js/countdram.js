var WINDOW_WIDTH = 1024,
	WINDOW_HEIGHT = 768,
	CANVAS_COLOR = "rgb(0, 102, 153)",
	CANVAS_RADIUS = 5,
	CANVAS_INTERVAL = 1,
	CANVAS_X = 50,
	CANVAS_Y = 50;


window.onload = function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;





	render(context);
}

function render(cxt) {
	var data = new Date(),
		hours = data.getHours(),
		hoursEnd = hours % 10,
		hoursStar = parseInt(hours / 10),
		minutes = data.getMinutes(),
		minutesEnd = minutes % 10,
		minutesStar = parseInt(minutes / 10),
		secinds = data.getSeconds(),
		secindsEnd =  secinds % 10,
		secindsStar = parseInt(secinds / 10),
		x = CANVAS_X, y = CANVAS_Y,
		timeArray = [hoursStar, hoursEnd, 10, minutesStar, minutesEnd, 10, secindsStar, secindsEnd];
			
		for (var i = 0; i < timeArray.length; i++) {
			drawing(timeArray[i], cxt, x, y);
			if(timeArray[i] === 10) {
				x += 64;
			}else {
				x += 100;
			}
		}
}


function drawing(sum, ctx, starX, starY) {
	var x = starX,
		y = starY,
		r = CANVAS_RADIUS,
		interval = CANVAS_INTERVAL;
	ctx.fillStyle = CANVAS_COLOR;
	for (var j = 0; j < digit[sum].length; j++) {
		x = starX;
		for (var i = 0; i < digit[sum][j].length; i++) {
			if (digit[sum][j][i]) {
				ctx.beginPath();
				ctx.arc(x, y, r, 0, 2 * Math.PI)
				ctx.fill();
			}
			x += 2 * (r + interval);
		}
		y += 2 * (r + interval);
	}
}
