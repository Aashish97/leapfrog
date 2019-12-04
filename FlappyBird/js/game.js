function Game(){
    this.container;
    this.containerWidth;
    this.containerHeight;
    this.groundHeight = 70;
    this.backgroundWrapper;
    this.backgroundWrapperLeft = 0;
    this.backgroundSpeed = 1;
    this.foregroundWrapper;
    this.foregroundWrapperLeft = 0;
    this.foregroundSpeed = 4;
    this.bird = null;
    this.gameId;
    this.pipeCounter = 1;
    this.pipeCounterLimit = 70;
    this.FPS = 60;
    this.FRAME_INTERVAL = 1000 / this.FPS; 
    this.gamePaused = true;
    this.upperPipes = [];
    this.lowerPipes = [];
    this.score = 0;
    this.scoreElement;
    this.getReady;
    this.tap;
    this.initialStart = true;
    this.highScore = 0;

    this.init = function(){

        this.addContainer();
        this.addBackgroundWrapper();
        this.addForegroundWrapper();

        this.firstScreen();
    }

    this.addContainer = function(){
        this.container = document.createElement('div');
        this.container.classList.add('game-container');

        document.body.appendChild(this.container);
        
        var containerStyle = getComputedStyle(this.container);
        this.containerWidth = parseInt(containerStyle.width);
        this.containerHeight = parseInt(containerStyle.height);
    }

    this.firstScreen = function(){
        var title = document.createElement('div');
        title.style.position = 'absolute';
        title.style.background = 'url(images/title.png)';
        title.style.backgroundSize = 'cover';
        title.style.width = '300px';
        title.style.height = '80px';
        title.style.left = '95px';
        title.style.top = '100px';
        this.container.appendChild(title);

        var bird = new Bird(this.container, 250, 200);
        bird.init();

        // animate bird

        var playButton = document.createElement('div');
        playButton.style.background = 'url(images/play-button.png)';
        playButton.style.position = 'absolute';
        playButton.style.top = '375px';
        playButton.style.left = '170px';
        playButton.style.width = '126px';
        playButton.style.height = '70px';
        playButton.style.backgroundSize = 'cover';
        playButton.style.cursor = 'pointer';
        this.container.appendChild(playButton);

        playButton.onclick = function(e){
            this.container.removeChild(title);
            this.container.removeChild(bird.element);
            this.container.removeChild(playButton);

            this.secondScreen();
        }.bind(this);
    }

    this.secondScreen = function(){      
        this.addScoreElement();

        this.getReady = document.createElement('div');
        this.getReady.style.position = 'absolute';
        this.getReady.style.width = '250px';
        this.getReady.style.height = '68px';
        this.getReady.style.background = 'url(images/get-ready.png)';
        this.getReady.style.backgroundSize = 'cover';
        this.getReady.style.top = '175px';
        this.getReady.style.left = '122px';
        this.container.appendChild(this.getReady);

        this.createBird();

        this.tap = document.createElement('div');
        this.tap.innerHTML = 'Press SPACE';
        this.tap.style.position = 'absolute';
        this.tap.style.top = '400px';
        this.tap.style.left = '155px';
        this.tap.style.fontSize = '30px';
        this.container.appendChild(this.tap);

        document.onkeydown = this.keyPressEvents.bind(this);
    }


    this.start = function(){

        this.gamePaused = false;

        this.gameId = setInterval(this.play.bind(this), this.FRAME_INTERVAL);   
    }


    this.play = function(){

        // check collision with ground
        if(this.bird.top > this.containerHeight - this.groundHeight - this.bird.HEIGHT){
            this.bird.angle = 90;
            this.bird.setAngle();
            this.gamePaused = true;
            clearInterval(this.gameId);

            this.container.removeChild(this.scoreElement);
            this.upperPipes = [];
            this.lowerPipes = [];

            if(this.score > this.highScore){
                this.highScore = this.score;
            }
            
            this.gameOver();
        }

        this.bird.dropDown();
       
        if(!this.gamePaused){
            this.moveBackground();
            this.moveForeground();

            // MOVE PIPES, CHECK COLLISION, GARBAGE COLLECTION AND UPDATE SCORE
            for(var i = 0; i < this.upperPipes.length; i++){
                
                this.movePipes(i);
                this.checkCollisionPipes(i);
                this.removePipes(i);

                if(this.upperPipes[i].left < (this.bird.left - this.bird.WIDTH / 2) && !this.upperPipes[i].hasPassed){
                    this.upperPipes[i].hasPassed = true;
                    this.score += 1;
                    this.scoreElement.innerHTML = this.score;
                }
            }

            this.addPipes();
        }
    }

    this.gameOver = function(){
        
        var over = document.createElement('div');
        over.style.position = 'absolute';
        over.style.background = 'url(images/game-over.png)';
        over.style.backgroundSize = 'cover';
        over.style.width = '300px';
        over.style.height = '65px';
        over.style.left = '95px';
        over.style.top = '100px';
        this.container.appendChild(over);

        var overScore = document.createElement('div');
        overScore.style.position = 'absolute';
        overScore.style.background = 'url(images/score-bg.png)';
        overScore.style.backgroundSize = 'cover';
        overScore.style.width = '300px';
        overScore.style.height = '151px';
        overScore.style.left = '95px';
        overScore.style.top = '215px';
        this.container.appendChild(overScore);

        var score = document.createElement('div');
        score.innerHTML = this.score;
        score.style.position = 'absolute';
        score.style.top = '255px';
        score.style.left = '325px';
        score.style.fontSize = '30px';
        score.style.color = 'white';
        this.container.appendChild(score);

        var high = document.createElement('div');
        high.innerHTML = this.highScore;
        high.style.position = 'absolute';
        high.style.top = '312px';
        high.style.left = '325px';
        high.style.fontSize = '30px';        
        high.style.color = 'white';
        this.container.appendChild(high);

        var playButton = document.createElement('div');
        playButton.style.background = 'url(images/play-button.png)';
        playButton.style.position = 'absolute';
        playButton.style.top = '430px';
        playButton.style.left = '170px';
        playButton.style.width = '126px';
        playButton.style.height = '70px';
        playButton.style.backgroundSize = 'cover';
        playButton.style.cursor = 'pointer';
        this.container.appendChild(playButton);

        playButton.onclick = function(e){
            this.container.removeChild(over);
            this.container.removeChild(playButton);
            this.container.removeChild(overScore);
            this.container.removeChild(score);
            this.container.removeChild(high);

            this.container.innerHTML = '';
            this.addBackgroundWrapper();
            this.addForegroundWrapper();
            this.secondScreen();
        }.bind(this);
    }

    this.checkCollisionPipes = function(i){
        if ((this.bird.left < this.upperPipes[i].left + this.upperPipes[i].width &&
            this.bird.left + this.bird.WIDTH > this.upperPipes[i].left &&
            this.bird.top < this.upperPipes[i].top + this.upperPipes[i].height &&
            this.bird.top + this.bird.HEIGHT > this.upperPipes[i].top) || 
            (this.bird.left < this.lowerPipes[i].left + this.lowerPipes[i].width &&
            this.bird.left + this.bird.WIDTH > this.lowerPipes[i].left &&
            this.bird.top < this.lowerPipes[i].top + this.lowerPipes[i].height &&
            this.bird.top + this.bird.HEIGHT > this.lowerPipes[i].top)) {

                this.bird.angle = 90;
                this.bird.setAngle();
                this.gamePaused = true;
         }
    }

    this.movePipes = function(i){
        this.upperPipes[i].left -= this.foregroundSpeed;
        this.upperPipes[i].draw(); 
        
        this.lowerPipes[i].left -= this.foregroundSpeed;
        this.lowerPipes[i].draw(); 
    }

    this.removePipes = function(i){
        if(this.upperPipes[i].left <= -this.upperPipes[i].width){
            this.upperPipes[i].destroy();
            this.upperPipes.splice(i, 1);

            this.lowerPipes[i].destroy();
            this.lowerPipes.splice(i, 1);
        }
    }

    this.addPipes = function(){
        
        this.pipeCounter = (this.pipeCounter + 1) % this.pipeCounterLimit;

        if(this.pipeCounter == 0){

            var upperPipeHeight = getPipeHeight();
            var upperPipeTop = 0;
            var upperPipeSrc = 'url(images/upper-pipe.png)';
            var upperPipe = new Pipe(this.container, this.containerWidth, upperPipeTop, upperPipeHeight, upperPipeSrc);
            upperPipe.init();

            var lowerPipeHeight = 400 - upperPipeHeight;
            var lowerPipeTop = this.containerHeight - this.groundHeight - lowerPipeHeight;
            var lowerPipeSrc = 'url(images/lower-pipe.png)';
            var lowerPipe = new Pipe(this.container, this.containerWidth, lowerPipeTop, lowerPipeHeight, lowerPipeSrc);
            lowerPipe.init();

            this.upperPipes.push(upperPipe);
            this.lowerPipes.push(lowerPipe);

        }
    }

    function getPipeHeight(){
        var minHeight = 80;
        var maxHeight = 320;
        var height = Math.round(Math.random() * (maxHeight - minHeight) + minHeight);

        return height;
    }

    this.moveBackground = function(){

        if(this.backgroundWrapperLeft <= -500){
            this.backgroundWrapperLeft = 0;
        }
        else{
            this.backgroundWrapperLeft -= this.backgroundSpeed;
        }

        this.backgroundWrapper.style.left = this.backgroundWrapperLeft + 'px'; 

    }

    this.moveForeground = function(){

        if(this.foregroundWrapperLeft <= -500){
            this.foregroundWrapperLeft = 0;
        }
        else{
            this.foregroundWrapperLeft -= this.foregroundSpeed;
        }

        this.foregroundWrapper.style.left = this.foregroundWrapperLeft + 'px'; 
        
    }

    this.addScoreElement = function(){
        this.score = 0;

        this.scoreElement = document.createElement('div');
        this.scoreElement.style.color = 'white';
        this.scoreElement.style.position = 'absolute';
        this.scoreElement.style.top = '50px';
        this.scoreElement.style.left = '235px';
        this.scoreElement.style.zIndex = '1';
        this.scoreElement.style.fontSize = '60px';
        this.scoreElement.innerHTML = this.score;

        this.container.appendChild(this.scoreElement);
    }

    this.addBackgroundWrapper = function(){
        this.backgroundWrapper = document.createElement('div');
        this.backgroundWrapper.style.position = 'relative';
        this.backgroundWrapper.style.left = this.backgroundWrapperLeft + 'px';
        this.backgroundWrapper.style.width = this.containerWidth * 2 + 'px';
        this.backgroundWrapper.style.height = this.containerHeight - this.groundHeight + 'px';

        this.container.appendChild(this.backgroundWrapper);

        var imgSrc = ['images/background.png'];

        this.backgroundWrapper.appendChild(this.getImage(this.containerWidth, this.backgroundWrapper.style.height, 
                                            imgSrc[0]));
                                            
        this.backgroundWrapper.appendChild(this.getImage(this.containerWidth, this.backgroundWrapper.style.height, 
            imgSrc[0]));
    }
    
    this.addForegroundWrapper = function(){
        this.foregroundWrapper = document.createElement('div');
        this.foregroundWrapper.style.position = 'relative';
        this.foregroundWrapper.style.left = this.foregroundWrapperLeft + 'px';
        this.foregroundWrapper.style.width = this.containerWidth * 2 + 'px';
        this.foregroundWrapper.style.height = this.groundHeight + 'px';

        this.container.appendChild(this.foregroundWrapper);

        var imgSrc = ['images/ground.png'];

        this.foregroundWrapper.appendChild(this.getImage(this.containerWidth, this.foregroundWrapper.style.height, 
                                            imgSrc[0]));
                                            
        this.foregroundWrapper.appendChild(this.getImage(this.containerWidth, this.foregroundWrapper.style.height, 
            imgSrc[0]));
    }

    this.getImage = function(width, height, src){
        var img = document.createElement('img');
        img.style.cssFloat = 'left';
        img.style.width = width + 'px';
        img.style.height = height;
        
        img.setAttribute('src', src);

        return img;
    }

    this.createBird = function(){
        this.bird = new Bird(this.container);
        this.bird.init();
    }
    
    this.keyPressEvents = function(){
        var keyNumber = event.keyCode;

        switch (keyNumber) {

            case 32:
                //space bar 
                if(this.gamePaused){
                    this.container.removeChild(this.getReady);
                    this.container.removeChild(this.tap);
                    this.start();
                }
                else if(!this.bird.flying && !this.gamePaused){
                    this.bird.flyUp();
                }
        }
    }
}

var game = new Game().init();
var game1 = new Game().init();