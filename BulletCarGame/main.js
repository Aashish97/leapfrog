var FRAME_INTERVAL = 10;
var keyPressed = false;
var gamePaused = true;

start(false);

function Car(parentElem, backgroundUrl, left, bottom){
    this.parentElem = parentElem;
    this.element;
    this.backgroundUrl = backgroundUrl;
    this.WIDTH = 50;
    this.HEIGHT = 90;
    this.leftPos = left;
    this.bottomPos = bottom;
    this.LANE_WIDTH = 100;
    this.LEFT_LANE_POS = 245;
    this.RIGHT_LANE_POS = 445;
    this.bullets = [];
    this.isFiring = false;
    this.bulletLimit = 10;

    this.init = function(){
        this.create();
    }

    this.create = function(){
        this.element = document.createElement('div');
        this.element.style.background = this.backgroundUrl;
        this.element.style.backgroundSize = 'contain';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.left = this.leftPos + 'px';
        this.element.style.width = this.WIDTH + 'px';
        this.element.style.height = this.HEIGHT + 'px';
        this.element.style.position = 'absolute';
        
        this.draw();
        
        this.parentElem.appendChild(this.element);
    }

    this.destroy = function(){
        this.parentElem.removeChild(this.element);
    }

    this.draw = function(){
        this.element.style.bottom = this.bottomPos + 'px';
    }

    // ANIMATE MOVE LEFT
    this.moveLeft = function(){
        if (this.leftPos > this.LEFT_LANE_POS){

            keyPressed = true;

            var id = setInterval(frame.bind(this), FRAME_INTERVAL);
            
            var nextLeft = this.leftPos - this.LANE_WIDTH;

            function frame(){
                if(this.leftPos <= nextLeft){
                    this.leftPos = nextLeft;
                    this.element.style.left = this.leftPos + 'px';

                    keyPressed = false;
                    clearInterval(id);
                }
                else{
                    this.leftPos -= 10; 
                    this.element.style.left = this.leftPos + 'px';
                }
            }
        }
    }
    
    // ANIMATE MOVE RIGHT
    this.moveRight = function(){
        if (this.leftPos < this.RIGHT_LANE_POS){

            keyPressed = true;

            var id = setInterval(frame.bind(this), FRAME_INTERVAL);
            
            var nextLeft = this.leftPos + this.LANE_WIDTH;

            function frame(){

                if(this.leftPos >= nextLeft){
                    this.leftPos = nextLeft;
                    this.element.style.left = this.leftPos + 'px';

                    keyPressed = false;
                    clearInterval(id);
                }
                else{
                    this.leftPos += 10; 
                    this.element.style.left = this.leftPos + 'px';
                }
            }
        }
    }

    // FIRE BULLET
    this.fire = function(){
        var bullet = document.createElement('div');
        bullet.style.width = '10px';
        bullet.style.height = '10px';
        bullet.style.borderRadius = '50%';
        bullet.style.backgroundColor = 'yellow';
        bullet.style.position = 'absolute';
        bullet.style.left = this.leftPos + 15 + 'px';
        
        var bulletStart = this.bottomPos + this.HEIGHT;
        bullet.style.bottom = bulletStart + 'px';

        this.parentElem.appendChild(bullet);

        this.bullets.push(bullet);
    }
}


function Game(){
    this.container;
    this.containerWidth;
    this.containerHeight;
    this.wrapper;
    this.myCar;
    this.wrapperHeight = 1800;
    this.wrapperTop = -600;
    this.wrapperMinTop = -600;
    this.addCarCounter = 1;
    this.obstacleCars = [];
    this.obstacleCarBottomInit = 550;
    this.obstacleSpeed = 5;
    this.addCarCounterLimit = 70;
    this.updateLevelCounter = 1;
    this.updateLevelLimit = 500;
    this.carsPassedScore = 0;
    this.gameId;
    this.scoreElement;
    this.levelElement;
    this.highScoreElement;
    this.highScore;
    this.level = 1;
    this.carsDestroyedElement;
    this.carsDestroyedScore = 0;
    this.totalScoreElement;
    this.totalScore = 0;
    this.bulletCounter = 1;
    this.bulletCounterLimit = 20;
    this.ammoLive = true;
    this.ammoLiveCounter = 1;
    this.ammoLiveLimit = 1000;
    this.ammunitionElement;
    
    this.init = function(){
        this.container = document.getElementsByClassName('game-container')[0];
        
        var containerStyle = getComputedStyle(this.container);
        this.containerWidth = parseInt(containerStyle.width);
        this.containerHeight = parseInt(containerStyle.height);

        this.levelElement = document.getElementById('level');
        this.levelElement.innerHTML = this.level;

        this.scoreElement = document.getElementById('cars-passed');
        this.scoreElement.innerHTML = this.carsPassedScore;

        this.carsDestroyedElement = document.getElementById('cars-destroyed');
        this.carsDestroyedElement.innerHTML = this.carsDestroyedScore;

        this.totalScoreElement = document.getElementById('total-score');
        this.totalScoreElement.innerHTML = this.totalScore;

        this.highScoreElement = document.getElementById('highest-score');
        this.highScore = this.highScoreElement.innerHTML;

        this.ammunitionElement = document.getElementById('ammo');
        this.ammunitionElement.innerHTML = 'Live';
        
        this.addRoadWrapper();
        this.createCar(true, 245, 50);

        document.onkeydown = this.keyPressEvents.bind(this);

        this.gameId = setInterval(this.moveBackground.bind(this), FRAME_INTERVAL);

    }

    this.moveBackground = function(){
        
        // MOVE ROAD
        if(this.level < 5){
            this.updateLevelCounter = (this.updateLevelCounter + 1) % this.updateLevelLimit;
        }
        else{
            this.updateLevelCounter = 1;
        }

        if(this.updateLevelCounter == 0){
            this.level += 1;
            this.obstacleSpeed += 1;
            this.levelElement.innerHTML = this.level;
            this.addCarCounterLimit -= 10;
        }

        if(this.wrapperTop < 0){
            this.wrapperTop += this.obstacleSpeed;
        }
        else{
            this.wrapperTop = this.wrapperMinTop;
        }
        this.wrapper.style.top = this.wrapperTop + 'px';


        // MOVE BULLETS
        this.bulletCounter = (this.bulletCounter + 1) % this.bulletCounterLimit;

        if(this.myCar.isFiring){
            if(this.myCar.bullets.length < this.myCar.bulletLimit && this.bulletCounter == 0){
                this.myCar.fire();
            }

            for(var x = 0; x < this.myCar.bullets.length; x++){
                this.myCar.bullets[x].style.bottom = parseInt(this.myCar.bullets[x].style.bottom) + this.obstacleSpeed + 'px';            
            }
            
            if(this.myCar.bullets.length > 0){
                if(parseInt(this.myCar.bullets[this.myCar.bullets.length - 1].style.bottom) > 700){
                    this.myCar.isFiring = false;
                    this.myCar.bullets = [];
                }
            }
        }

        // MOVE OBSTACLE CARS AND CHECK COLLISION
        for(var i = 0; i < this.obstacleCars.length; i++){

            var breakFlag = false;

            // MOVE OBSTACLE CARS
            this.obstacleCars[i].bottomPos -= this.obstacleSpeed;
            this.obstacleCars[i].draw(); 

            // CHECK COLLISION WITH CAR
            if (this.myCar.leftPos < this.obstacleCars[i].leftPos + this.obstacleCars[i].WIDTH &&
                this.myCar.leftPos + this.myCar.WIDTH > this.obstacleCars[i].leftPos &&
                this.myCar.bottomPos  < this.obstacleCars[i].bottomPos + this.obstacleCars[i].HEIGHT &&
                this.myCar.bottomPos + this.myCar.HEIGHT > this.obstacleCars[i].bottomPos) {

                 // collision detected!
                 gamePaused = true;

                 if(this.totalScore > this.highScore){
                    this.highScoreElement.innerHTML = this.totalScore;
                 }

                 clearInterval(this.gameId);

                 start(true);
             }
             
             // CHECK COLLISION WITH BULLET
             for(var y = 0; y < this.myCar.bullets.length; y++){
                if (parseInt(this.myCar.bullets[y].style.left) < this.obstacleCars[i].leftPos + this.obstacleCars[i].WIDTH &&
                    parseInt(this.myCar.bullets[y].style.left)  + 10 > this.obstacleCars[i].leftPos &&
                    parseInt(this.myCar.bullets[y].style.bottom)  < this.obstacleCars[i].bottomPos + this.obstacleCars[i].HEIGHT &&
                    parseInt(this.myCar.bullets[y].style.bottom)  + 10 > this.obstacleCars[i].bottomPos) {

                        this.obstacleCars[i].destroy();
                        this.obstacleCars.splice(i, 1);

                        // UPDATE SCORE
                        this.carsDestroyedScore += 1;
                        this.totalScore += 1;
        
                        this.carsDestroyedElement.innerHTML = this.carsDestroyedScore;
                        this.totalScoreElement.innerHTML = this.totalScore;

                        breakFlag = true;

                        break;
                }
            }

            // GARBAGE COLLECTION AND UPDATE SCORE
            if(!breakFlag){
                if(this.obstacleCars[i].bottomPos < -this.obstacleCars[i].HEIGHT){
                    this.obstacleCars[i].destroy();
                    this.obstacleCars.splice(i, 1);

                    this.carsPassedScore += 1;
                    this.totalScore += 1;

                    this.scoreElement.innerHTML = this.carsPassedScore;
                    this.totalScoreElement.innerHTML = this.totalScore;
                }
            }
        }

        // ADD OBSTACLE CARS
        this.addCarCounter = (this.addCarCounter + 1) % this.addCarCounterLimit;

        if(this.addCarCounter == 0){
            var carLeft = getCarLeftFromLane(getRandomLane());
            this.createCar(false, carLeft, this.obstacleCarBottomInit);
        }

        this.ammoLiveCounter = (this.ammoLiveCounter + 1) % this.ammoLiveLimit;

        if(this.ammoLiveCounter == 0){
            this.ammoLive = true;
            this.ammunitionElement.innerHTML = 'Live';
        }
    
    }

    function getCarLeftFromLane(lane){
        var leftPos;

        if(lane == 1){
            leftPos = 245;
        }
        else if(lane == 2){
            leftPos = 345;
        }
        else{
            leftPos = 445;
        }

        return leftPos;
    }

    function getRandomLane(){
        var minLanePos = 1;
        var maxLanePos = 3;
        var lane = Math.round(Math.random() * (maxLanePos - minLanePos) + minLanePos);

        return lane;
    }

    this.addRoadWrapper = function(){
        this.wrapper = document.createElement('div');
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.width = this.containerWidth + 'px';
        this.wrapper.style.height =  this.wrapperHeight + 'px';
        this.wrapper.style.top = this.wrapperTop + 'px';
        
        this.container.appendChild(this.wrapper);

        this.addRoadImage('images/road.png');
        this.addRoadImage('images/road.png');
        this.addRoadImage('images/road.png');

    }

    this.addRoadImage = function(imageSource){

        var img = document.createElement('img');
        img.setAttribute('src', imageSource);
        img.style.width = this.containerWidth + 'px';
        img.style.height = this.containerHeight + 'px';
        img.style.objectFit = 'cover';
        img.style.display = 'block';

        this.wrapper.appendChild(img);
    }

    this.createCar = function(isMyCar, leftPos, bottomPos){

        if(isMyCar){
            this.myCar = new Car(this.container, 'url(images/car.png)', leftPos, bottomPos);
            this.myCar.init();
        }
        else{
            var car1 = new Car(this.container, 'url(images/obstacle_car.png)', leftPos, bottomPos);
            car1.init();
            this.obstacleCars.push(car1);
        }
    }

    this.keyPressEvents = function(){
        var keyNumber = event.keyCode;

        switch (keyNumber) {

            case 37:
                //left arrow
                if(!keyPressed && !gamePaused){
                    this.myCar.moveLeft();
                }
                break;

            case 39:
                //right arrow
                if(!keyPressed && !gamePaused){
                    this.myCar.moveRight();
                }
                break;

            case 38:
                //up arrow
                if(!keyPressed && !gamePaused && this.ammoLive){
                    this.myCar.isFiring = true;
                    this.ammoLive = false;
                    this.ammunitionElement.innerHTML = 'Charging..'
                }
        }
    }

}

function start(gameOver){

    if(!gameOver){
        var firstScreen = document.getElementsByClassName('game-container')[0];

        firstScreen.innerHTML = '';

        firstScreen.style.backgroundColor = 'rgb(8, 140, 192)';

        var title = document.createElement('h1');
        title.innerHTML = 'Bullet Car Game';
        title.style.marginTop = '200px';       
        title.style.fontSize = '40px';
        title.style.textAlign = 'center';
        title.style.color = 'white';
        firstScreen.appendChild(title);

        var over = document.createElement('h2');
        over.innerHTML = 'Press UP_ARROW to shoot bullets';
        over.style.marginTop = '20px';
        over.style.fontSize = '25px';
        over.style.textAlign = 'center';
        over.style.color = 'pink'
        firstScreen.appendChild(over);

        var playButton = document.createElement('button');
        playButton.innerHTML = 'PLAY';
        playButton.style.marginTop = '50px';
        playButton.style.display = 'block';
        playButton.style.marginLeft = 'auto';
        playButton.style.marginRight = 'auto';
        playButton.style.fontSize = '20px';
        playButton.style.padding = '5px';
        playButton.style.cursor = 'pointer';
        firstScreen.appendChild(playButton);

        playButton.onclick = function(e){
            gamePaused = false;

            firstScreen.removeChild(playButton);
            firstScreen.removeChild(title);
            firstScreen.style.backgroundColor = 'none';

            var game = new Game().init();
        };
    }
    else{
        var firstScreen = document.getElementsByClassName('game-container')[0];

        firstScreen.innerHTML = '';

        firstScreen.style.backgroundColor = 'rgb(8, 140, 192)';
      
        var title = document.createElement('h1');
        title.innerHTML = 'Bullet Car Game';
        title.style.marginTop = '200px';
        title.style.fontSize = '40px';
        title.style.textAlign = 'center';
        title.style.color = 'white';
        firstScreen.appendChild(title);

        var over = document.createElement('h2');
        over.innerHTML = 'GAME OVER';
        over.style.marginTop = '20px';
        over.style.fontSize = '50px';
        over.style.textAlign = 'center';
        over.style.color = 'red'
        firstScreen.appendChild(over);

        var playButton = document.createElement('button');
        playButton.innerHTML = 'PLAY AGAIN';
        playButton.style.marginTop = '50px';
        playButton.style.display = 'block';
        playButton.style.marginLeft = 'auto';
        playButton.style.marginRight = 'auto';
        playButton.style.fontSize = '20px';
        playButton.style.padding = '5px';
        playButton.style.cursor = 'pointer';
        firstScreen.appendChild(playButton);

        playButton.onclick = function(e){
            gamePaused = false;

            firstScreen.removeChild(playButton);
            firstScreen.removeChild(title);
            firstScreen.style.backgroundColor = 'none';

            var game = new Game().init();
        };

    }
}
