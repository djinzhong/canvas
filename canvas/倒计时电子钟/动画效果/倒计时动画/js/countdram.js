var WINDOW_WIDTH = 1024,
	WINDOW_HEIGHT = 600,
	CANVAS_COLOR = "rgb(0, 102, 153)",
	CANVAS_RADIUS = 5,
	CANVAS_INTERVAL = 1,
	CANVAS_x = 350,
	CANVAS_X = 150,
	CANVAS_y = 50,
	CANVAS_Y = 200;

const endTime = new Date(2019, 0, 0, 0, 0, 0);
var curShow = 0;
var balls = [];

const colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', 'FF8800', '#FF4444',
	'#CC0000'
]

window.onload = function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext("2d");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShow = getShowTime();
	setInterval(function() {
		render(context);
		upDate();
	}, 50)
	render(context);
}

function getShowTime() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret / 1000);
	return ret >= 0 ? ret : 0;
}

function upDate() {
	var nextShowTime = getShowTime();
	var nextHours = parseInt(nextShowTime / 3600) % 24,
		nextMinutes = parseInt((nextShowTime - nextHours * 3600) / 60),
		nextSecinds = nextShowTime % 60,
		curHours = parseInt(curShow / 3600) % 24,
		curMinutes = parseInt((curShow - curHours * 3600) / 60),
		curSecinds = curShow % 60,
		distance = 0;
	if (curHours > 100) {
		distance = 100;
	}

	if (nextSecinds != curSecinds) {
		if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
			addBalls(CANVAS_X + distance, CANVAS_Y, parseInt(curHours / 10));
		}
		if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
			addBalls(CANVAS_X + distance + 100, CANVAS_Y, parseInt(curHours % 10));
		}
		if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(CANVAS_X + distance + 264, CANVAS_Y, parseInt(curMinutes / 10));
		}
		if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(CANVAS_X + distance + 364, CANVAS_Y, parseInt(curMinutes % 10));
		}
		if (parseInt(curSecinds / 10) != parseInt(nextSecinds / 10)) {
			addBalls(CANVAS_X + distance + 528, CANVAS_Y, parseInt(curSecinds / 10));
		}
		if (parseInt(curSecinds % 10) != parseInt(nextSecinds % 10)) {
			addBalls(CANVAS_X + distance + 628, CANVAS_Y, parseInt(curSecinds % 10));
		}
		curShow = nextShowTime;
	}
	updateBallls();
}

function addBalls(x, y, num) {
	var r = CANVAS_RADIUS;
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]) {
				var aBall = {
					x: x + j * 2 * (r + 1) + (r + 1),
					y: y + i * 2 * (r + 1) + (r + 1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy: -5,
					color: colors[Math.floor(Math.random() * colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function updateBallls() {
	for (var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if (balls[i].y >= WINDOW_HEIGHT - CANVAS_RADIUS) {
			balls[i].y = WINDOW_HEIGHT - CANVAS_RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}

}

function render(cxt) {
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
	var hours = parseInt(curShow / 3600),
		hoursEnd = hours % 24 % 10,
		hoursStar = parseInt(hours % 24 / 10),
		minutes = parseInt((curShow - hours * 3600) / 60),
		minutesEnd = minutes % 10,
		minutesStar = parseInt(minutes / 10),
		secinds = curShow % 60,
		secindsEnd = secinds % 10,
		secindsStar = parseInt(secinds / 10),
		drawIndex = 0,
		drawX = CANVAS_X,
		timeArray = [hoursStar, hoursEnd, 10, minutesStar, minutesEnd, 10, secindsStar, secindsEnd];
	// 	if (hours > 100) {
	// 		var hoursMiddle = parseInt(hours / 10) % 10;
	// 		hoursStar = parseInt(hours / 100);
	// 		timeArray.splice(0, 1, hoursStar, hoursMiddle);
	// 	}
	for (var i = 0; i < timeArray.length; i++) {
		drawIndex = drawing(timeArray[i], cxt, drawX, CANVAS_Y);
		drawX += (drawIndex + 1) * (CANVAS_RADIUS + 1) * 2
	}

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, CANVAS_RADIUS, 0, 2 * Math.PI, true);
		cxt.closePath();
		cxt.fill();

	}
	var day = parseInt(hours / 24),
		dayStar = parseInt(day / 10),
		dayEnd = day % 10,
		drawx = CANVAS_x;
	if (day > 10) {
		drawIndex = drawing(dayStar, cxt, drawx, CANVAS_y);
		drawx += (drawIndex + 1) * (CANVAS_RADIUS + 1) * 2
	}
	drawIndex = drawing(dayEnd, cxt, drawx, CANVAS_y);
	drawx += (drawIndex + 1) * (CANVAS_RADIUS + 1) * 2
	drawIndex = drawing(11, cxt, drawx, CANVAS_y);
	drawx += (drawIndex + 1) * (CANVAS_RADIUS + 1) * 2

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
	return i;
}
