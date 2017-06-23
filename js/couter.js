

var RADIUS;
var MARGIN_TOP;
var MARGIN_LEFT;

const endTime = new Date(2017,5,25,11,29,56)
var curShowTimeSeconds = 0

var balls = [];
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#cc0000"]

window.onload = function(){
  window_width = document.body.clientWidth;
  MARGIN_LEFT = Math.round(window_width/10);
  

if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window_height = document.body.clientHeight*2/3;
    MARGIN_TOP = Math.round(window_width);
    RADIUS = (Math.round(window_width*4/5/108)-1)*2.6;
    canvas.style.width=window_width+'px'
    canvas.style.height=window_height+'px'
} else {
   window_height = document.body.clientHeight;
   MARGIN_TOP = Math.round(window_width/3);
   RADIUS = (Math.round(window_width*4/5/108)-1)*2;
     canvas.style.width=window_width*4/5+'px'
  canvas.style.height=window_height*4/5+'px'
}
 canvas.setAttribute('width', window_width*2 );
 canvas.setAttribute('height', window_height*2);

  curShowTimeSeconds = getCurShowTimeSeconds()


 


  setInterval(
      function(){
          render(context);
          update();
      },50
  )
}
function getCurShowTimeSeconds(){
    var curTime = new Date()
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000)
    ret = ret >=0 ? ret : 0;
    return ret;
}

function update(){
    var nextShowTimeSeconds = getCurShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600)
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60)
    var nextSeconds = nextShowTimeSeconds%60

    var curHours = parseInt(curShowTimeSeconds/3600)
    var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60)
    var curSeconds = curShowTimeSeconds%60

    if(nextSeconds != curSeconds){
        if(parseInt(curHours/10)!=parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
        }
       if(parseInt(curHours%10)!=parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
        }
       if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds%10));
        }
         
        curShowTimeSeconds = nextShowTimeSeconds;
    }
updateBalls();
console.log(balls.length)

}
function updateBalls(){
      for(var i=0;i<balls.length;i++){
          balls[i].x+=balls[i].vx;
          balls[i].y+=balls[i].vy;
          balls[i].vy+=balls[i].g

          if(balls[i].y >= window_height*2-RADIUS){
              balls[i].y = window_height*2-RADIUS;
              balls[i].vy = -balls[i].vy*0.7;
          }
      }

       var cnt = 0
       for(var i=0;i<balls.length;i++)
       if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<window_width*2){
          balls[cnt++] = balls[i]
       }
       

       while(balls.length>cnt){
            balls.pop()
       }
    }

function addBalls(x,y,num){
      for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
        if(digit[num][i][j] ==1){
            var aBall = {
                x:x+j*2*(RADIUS+1)+(RADIUS+1),
                y:y+i*2*(RADIUS+1)+(RADIUS+1),
                g:1.5+Math.random(),
                vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                vy:-5,
                color:colors[Math.floor(Math.random()*colors.length)]
            }
            balls.push(aBall)
        }
}

function render( cxt ){
    cxt.clearRect(0,0,window_width*2,window_height*2);
    var hours = parseInt(curShowTimeSeconds/3600)
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60)
    var seconds = curShowTimeSeconds%60

    renderDigit( MARGIN_LEFT,MARGIN_TOP, parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt)
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

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
    
    for(var i=0;i<digit[num].length;i++)
      for(var j=0;j<digit[num][i].length;j++)
         if( digit[num][i][j] == 1 ){
                cxt.beginPath();
          cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
          cxt.closePath()
          cxt.fill()
      }
}