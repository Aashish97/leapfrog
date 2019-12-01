var antsNumber = 10;
var minSize = 20;
var maxSize = 30;
var minSpeed = 1;
var maxSpeed = 4;

var game = new Game(antsNumber, minSize, maxSize, minSpeed, maxSpeed).init();


function Ball(parentElem, radius, top, left, speed, angle){

    this.parentElem = parentElem;
    this.element;
    this.top = top;
    this.left = left;
    this.radius = radius;
    this.centerX = left + radius;
    this.centerY = top + radius;
    this.speed = speed;
    this.angle = angle;
    this.isActive = true; 
    
    this.init = function(){
        this.create();
    }

    this.create = function(){
        this.element = document.createElement('div');

        this.element.style.position = 'absolute';
        this.element.style.width = this.radius * 2 + 'px';
        this.element.style.height = this.radius * 2 + 'px';
        this.element.style.background = 'url(images/ant.gif)';
        this.element.style.backgroundSize = 'contain';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.borderRadius = '50%';
        
        this.draw();

        this.parentElem.appendChild(this.element);

    }

    this.draw = function(){

        var bg_angle = this.angle + 90;

        this.element.style.transform = 'rotate(' + bg_angle +'deg)';

        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';

    }

    this.move = function(){
    
        this.left += this.speed * Math.cos(convertToRadian(this.angle));
        this.top += this.speed * Math.sin(convertToRadian(this.angle));

        this.centerX = this.left + this.radius;
        this.centerY = this.top + this.radius;

        this.draw();

        function convertToRadian(angle){
            var rad = angle / 180 * Math.PI;
            return rad;
        }
    }

}



function Game(n, minSize, maxSize, minSpeed, maxSpeed){

    this.containerHeight;
    this.containerWidth;
    this.numberOfBalls = n;
    this.container;
    this.balls = [];
    this.MIN_RADIUS = minSize;
    this.MAX_RADIUS = maxSize;
    this.MIN_SPEED = minSpeed;
    this.MAX_SPEED = maxSpeed;
    this.MIN_ANGLE = 0;
    this.MAX_ANGLE = 360;
    this.score = 0;
    this.scoreElement;

    this.init = function(){
        this.createBox();
        this.createBalls();
        setInterval(this.moveBalls.bind(this), 1000/60);

        this.container.onclick = calculateScore.bind(this);

    }

    this.createBox = function(){
        this.container = document.createElement('div');
        this.container.classList.add('box-container');

        document.body.appendChild(this.container);
        this.container.style.width = '80%';
        this.container.style.height = '600px';
        this.container.style.marginLeft = '10%';
        this.container.style.marginButtom = '50%';
        this.container.style.position = 'relative';

        var containerStyle = getComputedStyle(this.container);
        this.containerWidth = parseInt(containerStyle.width)
        this.containerHeight = parseInt(containerStyle.height);

        this.scoreElement = document.getElementById('scoreCount');
    }

    this.createBalls = function(){
        for(var i = 0; i < this.numberOfBalls; i++){

            var ballRadius = Math.round(Math.random() * (this.MAX_RADIUS - this.MIN_RADIUS) + this.MIN_RADIUS);
     
            var ballTop = Math.round(Math.random() * (this.containerHeight - ballRadius * 2 - 5) + 5);
            var ballLeft = Math.round(Math.random() * (this.containerWidth - ballRadius * 2 - 5) + 5);
            

            // check that no two balls spawn together until there is space
            for(var i = 0; i < this.balls.length; i++){
                if (ballTop >= this.balls[i].top && ballTop <= (this.balls[i].top + this.balls[i].radius)){
                    if (ballLeft >= this.balls[i].left && ballLeft <= (this.balls[i].left + this.balls[i].radius)){
                        var ballTop = Math.round(Math.random() * (this.containerHeight - ballRadius * 2 - 5) + 5);
                        var ballLeft = Math.round(Math.random() * (this.containerHeight - ballRadius * 2 - 5) + 5);
                    }
                }

            }

            var init_speed = Math.round(Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED);
            var init_angle = Math.round(Math.random() * (this.MAX_ANGLE - this.MIN_ANGLE) + this.MIN_ANGLE);
            
            var ball = new Ball(this.container, ballRadius, ballTop, ballLeft, init_speed, init_angle);
            ball.init();

            this.balls.push(ball);
        }

    }

    this.moveBalls = function(){
        for(var i = 0; i < this.balls.length; i++){

            if(this.balls[i].isActive){
            
                // checking collision with container
                if(this.balls[i].top < 0 || this.balls[i].left <= 0 || 
                    this.balls[i].left > (this.containerWidth - this.balls[i].radius * 2) || 
                    this.balls[i].top > (this.containerHeight - this.balls[i].radius * 2))
                {
                    this.balls[i].angle = Math.abs((this.balls[i].angle + 90) % 360);
                }

                // checking collision with other balls
                for(var j = 0; j < this.balls.length; j++){
                    if(this.balls[i] != this.balls[j] && this.balls[j].isActive){

                        var dx = this.balls[i].centerX - this.balls[j].centerX;
                        var dy = this.balls[i].centerY - this.balls[j].centerY;

                        var dist = Math.sqrt( dx * dx + dy * dy);

                        if(dist < (this.balls[i].radius + this.balls[j].radius)){

                            this.balls[i].angle = Math.abs((this.balls[i].angle + 90) % 360);

                            this.balls[j].angle = Math.abs((this.balls[j].angle + 90) % 360);
                        }

                    }
                }

                this.balls[i].move();

            }
        }
    }

    function calculateScore(e){

        for(var i = 0; i < this.numberOfBalls; i++){

            if(!this.balls[i].isActive){
                this.balls[i].element.style.background = 'none';
            }

            if(this.balls[i].element == e.target && this.balls[i].isActive)
            {
                this.balls[i].isActive = false;

                this.balls[i].element.style.background = 'url(images/smashed.jpeg) center';
                this.balls[i].element.style.backgroundSize = 'contain';
                
                this.score += 1;
                this.scoreElement.innerHTML = this.score;
            }
        }
    }
}