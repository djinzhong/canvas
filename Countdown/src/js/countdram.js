var WINDOW_WIDTH = 1024,
	WINDOW_HEIGHT = 768,
	CANVAS_COLOR = "rgb(0, 102, 153)",
	CANVAS_RADIUS = 5,
	CANVAS_INTERVAL = 1,
	CANVAS_X = 50,
	CANVAS_Y = 50;

const endTime = new Date(2019, 0, 1, 0, 0, 0);
var curShow = 0;

window.onload = function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext("2d");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShow = getShowTime();
	render(context);
}

function getShowTime() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret / 1000);
	return ret >= 0 ? ret : 0;
}

function render(cxt) {
	var hours = parseInt(curShow / 3600),
		hoursEnd = hours % 10,
		hoursStar = parseInt(hours / 10),
		minutes = parseInt((curShow - hours * 3600) /60),
		minutesEnd = minutes % 10,
		minutesStar = parseInt(minutes / 10),
		secinds = curShow % 60,
		secindsEnd = secinds % 10,
		secindsStar = parseInt(secinds / 10),
		x = CANVAS_X,
		y = CANVAS_Y,
		timeArray = [hoursStar, hoursEnd, 10, minutesStar, minutesEnd, 10, secindsStar, secindsEnd];
    if(hours > 100) {
		var hoursMiddle =  parseInt(hours / 10) % 10;
		hoursStar = parseInt(hours / 100);
		timeArray.splice(0, 1, hoursStar, hoursMiddle);
	}
	for (var i = 0; i < timeArray.length; i++) {
		drawing(timeArray[i], cxt, x, y);
		if (timeArray[i] === 10) {
			x += 64;
		} else {
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
