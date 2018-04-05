var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT = document.body.clientHeight;
var RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
var MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
var MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);

var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);
var showSeconds;

var balls=[];
const colors=['#BC0A2C','#DEEA21','#58D364','#58D3D1','#5864D3','#523E52','#36F51A','#F53B1A',
              '#ADCFEF','#FFBC34'];

window.onload = function(){

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

    showSeconds = getShowSeconds();

	setInterval(function(){
		render(context);
		update();
	},50);
    
}

function getShowSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);

	return ret>=0?ret:0;
}

function update(){
    var nextshowSeconds = getShowSeconds();

    var nexthours = parseInt(nextshowSeconds/3600);
	var nextminutes = parseInt((nextshowSeconds-nexthours*3600)/60);
	var nextseconds = nextshowSeconds%60;

	var curhours = parseInt(showSeconds/3600);
	var curminutes = parseInt((showSeconds-nexthours*3600)/60);
	var curseconds = showSeconds%60;

	if(nextseconds!=curseconds){
        if(parseInt(curhours/10)!=parseInt(nexthours/10)){
        	addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curhours/10));
        }
        if(parseInt(curhours%10)!=parseInt(nexthours%10)){
        	addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhours%10));
        }

        if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
        	addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminutes/10));
        }
        if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
        	addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curminutes%10));
        }

        if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){
        	addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
        }
        if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
        	addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
        }

		showSeconds = nextshowSeconds;
	}

	updateBalls();
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}

	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH)
			balls[cnt++]=balls[i];
	}

	while(balls.length>cnt){
		balls.pop();
	}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]===1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
				
			}
		}
	}
}

function render(cxt){
    
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	var hours = parseInt(showSeconds/3600);
	var minutes = parseInt((showSeconds-hours*3600)/60);
	var seconds = showSeconds%60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    for(var i=0;i<balls.length;i++){
    	cxt.fillStyle=balls[i].color;
    	cxt.beginPath();
    	cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
    	cxt.closePath();

    	cxt.fill();
    }
}

function renderDigit(x,y,num,cxt){

	cxt.fillStyle = "rgb(0,102,153)";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] === 1){
				cxt.beginPath();
				cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI );
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}