function Bird(parentElem, top = 300, left = 150){
    this.parentElem = parentElem;
    this.element;
    this.HEIGHT = 48;
    this.WIDTH = 65;
    this.left = left;
    this.top = top;
    this.UP_DIFF = 80;
    this.upSpeed = 7;
    this.initialFallSpeed = 4;
    this.fallSpeed = 4;
    this.flying = false;
    this.FPS = 60;
    this.FLY_UP_INTERVAL = 1000 / this.FPS;
    this.backgroundPositions = ['0% 0%', '0% 50%', '0% 100%'];
    this.angle = 0;

    this.init = function(){
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';
        this.element.style.width = this.WIDTH + 'px';
        this.element.style.height = this.HEIGHT + 'px';
        this.element.style.background = 'url(images/bird.png)';
        this.element.style.backgroundPosition = this.backgroundPositions[0];
        this.element.style.backgroundSize = 'cover';
        this.element.style.zIndex = '1';
        this.draw();

        this.parentElem.appendChild(this.element);
    }

    this.draw = function(){
        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';
    }

    this.flyUp = function(){
        this.fallSpeed = this.initialFallSpeed;
        this.flying = true;
        var nextTop = this.top - this.UP_DIFF;
        
        var bgCounter = 0; 

        var id = setInterval(frame.bind(this), this.FLY_UP_INTERVAL);

        function frame(){

            if(this.top <= nextTop){
                this.top = nextTop;
                this.flying = false;
                clearInterval(id);
            }
            else{
                this.top -= this.upSpeed;
                bgCounter = (bgCounter + 1) % 9;
                
                var index;
                if(bgCounter < 3){
                    index = 1;
                }
                else if(bgCounter >= 3 && bgCounter < 6){
                    index = 2;
                }
                else{
                    index = 0;
                }
                
                this.element.style.backgroundPosition = this.backgroundPositions[index];
                this.angle = -30;
                this.setAngle();
                this.draw();
            }
        }
    }

    this.dropDown = function(){
        if(!this.flying){
            this.top += this.fallSpeed;
            this.fallSpeed += 0.1;
            if(this.angle < 90){
                this.angle += 2;
            }
            this.setAngle();
                     
            this.draw();
        }
    }

    this.setAngle = function(){
        this.element.style.transform = 'rotate(' + this.angle + 'deg)';   
    }
}