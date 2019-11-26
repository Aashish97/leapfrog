var wrapper = document.getElementById("wrapper");
wrapper.style.height = '350px';
wrapper.style.width = '350px';
wrapper.style.border = '1px solid grey';

var ball = document.getElementById('ball')
ball.style.height = '50px';
ball.style.width = '50px';
ball.style.backgroundColor = 'grey';
ball.style.margin = '0 140px';
ball.style.position = 'absolute';
ball.style.borderRadius = '50%';

(function myMove() { 
    var pos = 10;
    var nextPos = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos >= 308) {
        nextPos--;
      } else if (pos <=10){
        nextPos++;
      }
      pos = pos + nextPos;
      ball.style.top = pos + "px";
    }
  })();

