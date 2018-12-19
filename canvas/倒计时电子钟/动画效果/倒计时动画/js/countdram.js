var WINDOW_WIDTH = 1024,
	WINDOW_HEIGHT = 600,
	CANVAS_COLOR = "rgb(0, 102, 153)",
	CANVAS_RADIUS = 5,
	CANVAS_x = 350,
	CANVAS_X = 150,
	CANVAS_y = 50,
	CANVAS_Y = 200;

const endTime = new Date(2019, 0, 0, 0, 5, 0);
var curShow = 0;
var balls = [];

const colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', 'FF8800', '#FF4444',
	'#CC0000'
]

window.onload = function() {
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext("2d");
	
	var h1EleHeight = document.getElementById('title').offsetHeight;
		
	WINDOW_WIDTH = document.body.clientWidth;
	
	if(WINDOW_WIDTH > 1000) {
		WINDOW_HEIGHT = document.body.clientHeight - h1EleHeight
	}else {
		WINDOW_HEIGHT = (document.body.clientHeight - h1EleHeight) / 2;
	}
	
    CANVAS_RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1
	
	CANVAS_x = Math.round(WINDOW_WIDTH * 5 / 16)
	CANVAS_y = CANVAS_RADIUS * 2
	
	CANVAS_X = Math.round(WINDOW_WIDTH /10);
	CANVAS_Y = 13 * (CANVAS_RADIUS + 1) * 2;

    

   

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShow = getShowTime();

	setInterval(function() {
		render(context);
		upDate();
	}, 50)

}

function getShowTime() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret / 1000);
	return ret >= 0 ? ret : 0;
}

function upDate() {
	var nextShowTime = getShowTime();

	var x = CANVAS_X,
		y = CANVAS_Y,
		r = CANVAS_RADIUS;

	var nextHours = parseInt(nextShowTime / 3600) % 24,
		nextMinutes = parseInt((nextShowTime - nextHours * 3600) / 60),
		nextSecinds = nextShowTime % 60;

	var curHours = parseInt(curShow / 3600) % 24,
		curMinutes = parseInt((curShow - curHours * 3600) / 60),
		curSecinds = curShow % 60;


	if (nextSecinds != curSecinds) {
		if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
			addBalls(x + 0, y, parseInt(curHours / 10));
		}
		if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
			addBalls(x + 15 * (r + 1), y, parseInt(curHours % 10));
		}
		if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(x + 39 * (r + 1), y, parseInt(curMinutes / 10));
		}
		if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(x + 54 * (r + 1), y, parseInt(curMinutes % 10));
		}
		if (parseInt(curSecinds / 10) != parseInt(nextSecinds / 10)) {
			addBalls(x + 78 * (r + 1), y, parseInt(curSecinds / 10));
		}
		if (parseInt(curSecinds % 10) != parseInt(nextSecinds % 10)) {
			addBalls(x + 93 * (r + 1), y, parseInt(curSecinds % 10));
		}
		curShow = nextShowTime;
	}
	updateBallls();
}

function addBalls(x, y, num) {
	var r = CANVAS_RADIUS;
	if (digit[num] instanceof Array) {
		for (var i = 0; i < digit[num].length; i++) {
			if (digit[num][i] instanceof Array) {
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

	var cnt = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x + CANVAS_RADIUS > 0 && balls[i].x - CANVAS_RADIUS < WINDOW_WIDTH) {
			balls[cnt++] = balls[i];
		}
	}

	while (balls.length > Math.min(300, cnt)) {
		balls.pop();
	}

}

function render(cxt) {
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	var dayX = CANVAS_x,
		dayY = CANVAS_y;

	var x = CANVAS_X,
		y = CANVAS_Y,
		r = CANVAS_RADIUS;

	var hours = parseInt(curShow / 3600),
		day = parseInt(hours / 24),
		minutes = parseInt((curShow - hours * 3600) / 60),
		secinds = curShow % 60;

	if (day > 10) {
		drawing(dayX, dayY, parseInt(day / 10), cxt)
	}
	drawing(dayX + 15 * (r + 1), dayY, parseInt(day % 10), cxt);
	drawing(dayX + 35 * (r + 1), dayY, 11, cxt);

	drawing(x, y, parseInt(hours % 24 / 10), cxt);
	drawing(x + 15 * (r + 1), y, parseInt(hours % 24 % 10), cxt);
	drawing(x + 30 * (r + 1), y, 10, cxt);
	drawing(x + 39 * (r + 1), y, parseInt(minutes / 10), cxt);
	drawing(x + 54 * (r + 1), y, parseInt(minutes % 10), cxt);
	drawing(x + 69 * (r + 1), y, 10, cxt);
	drawing(x + 78 * (r + 1), y, parseInt(secinds / 10), cxt);
	drawing(x + 93 * (r + 1), y, parseInt(secinds % 10), cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, CANVAS_RADIUS, 0, 2 * Math.PI, true);
		cxt.closePath();
		cxt.fill();

	}

}


function drawing(starX, starY, sum, ctx, ) {
	var x = starX,
		y = starY,
		r = CANVAS_RADIUS;

	ctx.fillStyle = CANVAS_COLOR;

	if (digit[sum] instanceof Array) {
		for (var j = 0; j < digit[sum].length; j++) {
			x = starX;
			if (digit[sum][j] instanceof Array) {
				for (var i = 0; i < digit[sum][j].length; i++) {
					if (digit[sum][j][i]) {
						ctx.beginPath();
						ctx.arc(x, y, r, 0, 2 * Math.PI)
						ctx.fill();
					}
					x += 2 * (r + 1);
				}
				y += 2 * (r + 1);
			}
		}
	}
}
