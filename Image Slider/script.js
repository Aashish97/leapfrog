var images = ["images/image1.jpg","images/image2.jpg",
"images/image3.jpg","images/image4.jpg",
"images/image5.jpg","images/image3.jpg"]

function slider(imageSourceList = [], transitionTime, holdTime){

    this.container;
    this.wrapper;
    this.leftButton;
    this.rightButton;
    this.indicatorDiv;
    this.indicatorsList;
    this.currentSlide = 0;
    this.currentIndicator;
    this.currentSliderLeftPosition = 0;
    this.nextSliderLeftPosition = 0;
    this.containerWidth;
    this.containerHeight;
    this.numberOfImages;
    this.MAXIMUM_LEFT_POSITION = 0;
    this.MINIMUM_LEFT_POSITION;
    this.automaticTransition;
    this.transitionInterval;

    this.init = function(){
        this.addContainer();
        this.addWrapper();
        this.addImages();
        this.addLeftButton();
        this.addRightButton();
        this.addIndicators();

        this.transitionInterval =  (transitionTime * 2000) / this.containerWidth;

        this.leftButton.onclick = leftSlide.bind(this);
        this.rightButton.onclick = rightSlide.bind(this);
        this.indicatorDiv.onclick = changeImageToIndicatorPos.bind(this);
        
        this.automaticTransition = setInterval(rightSlide.bind(this), (holdTime * 1000 + transitionTime * 1000) );
    }


    this.addContainer = function(){
        this.container = document.createElement('div');
        this.container.classList.add('carousel-container');
        this.container.style.width = '600px';
        this.container.style.height = '400px';
        this.container.style.marginLeft = '40px';
        this.container.style.marginButtom = '20px';
        this.container.style.marginTop = '40px';

        document.body.appendChild(this.container);

        var containerStyle = getComputedStyle(this.container);
        this.containerWidth = parseInt(containerStyle.width)
        this.containerHeight = parseInt(containerStyle.height);
    }

    this.addWrapper = function(){
        this.wrapper = document.createElement('div');
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.left = '0px';
        this.wrapper.classList.add('carousel-image-wrapper');

        var totalSliderWidth;
        this.numberOfImages = imageSourceList.length;
        totalSliderWidth = this.containerWidth * this.numberOfImages;
        
        this.wrapper.style.height = this.containerHeight;
        this.wrapper.style.width = totalSliderWidth + 'px';

        this.container.appendChild(this.wrapper)

        this.MINIMUM_LEFT_POSITION = - (this.numberOfImages) * this.containerWidth;
    }

    this.addImages = function(){

        for(var i = 0; i < this.numberOfImages; i++){
            var img = document.createElement('img');
            img.setAttribute('src', imageSourceList[i]);
            img.style.width = this.containerWidth;
            img.style.height = this.containerHeight;
            img.style.cssFloat = 'left';
            img.style.objectFit = 'cover';
            this.wrapper.appendChild(img);

        }
    }

    this.addLeftButton = function(){
        this.leftButton = document.createElement('button');
        this.leftButton.style.width = '30px';
        this.leftButton.style.height = '40px';
        this.leftButton.style.borderRadius = '10%';
        this.leftButton.style.backgroundColor = 'white';
        this.leftButton.style.position = 'absolute';
        this.leftButton.style.border = 'none';
        this.leftButton.style.top = this.containerHeight / 2 + 'px';
        this.leftButton.style.cursor = 'pointer';

        var leftButtonPara = document.createElement('para');
        leftButtonPara.innerHTML = '&#10094;';
        this.leftButton.appendChild(leftButtonPara);
        this.container.appendChild(this.leftButton);
    }

    this.addRightButton = function(){
        this.rightButton = document.createElement('button');
        this.rightButton.style.width = '30px';
        this.rightButton.style.height = '40px';
        this.rightButton.style.borderRadius = '10%';
        this.rightButton.style.backgroundColor = 'white';
        this.rightButton.style.position = 'absolute';
        this.rightButton.style.right = '0px'
        this.rightButton.style.border = 'none';
        this.rightButton.style.top = this.containerHeight / 2 + 'px';
        this.rightButton.style.cursor = 'pointer';

        var rightButtonPara = document.createElement('para');
        rightButtonPara.innerHTML = '&#10095;';
        this.rightButton.appendChild(rightButtonPara);
        this.container.appendChild(this.rightButton);
    }   

    this.addIndicators = function(){

        this.indicatorDiv = document.createElement('div');

        this.indicatorDiv.classList.add('indicator-div')

        this.indicatorDiv.style.position = 'absolute';
        this.indicatorDiv.style.bottom = '5px';
        this.indicatorDiv.style.width = '100%';
        this.indicatorDiv.style.textAlign = 'center';

        this.activeIndicator = getIndividualIndicator();
        this.activeIndicator.style.backgroundColor = 'white';
        this.activeIndicator.style.width = '18px';
        this.activeIndicator.style.height = '18px';
        
        this.indicatorDiv.appendChild(this.activeIndicator);

        for(var i = 1; i<this.numberOfImages; i++){
            this.indicatorDiv.appendChild(getIndividualIndicator());
        }
        this.container.appendChild(this.indicatorDiv);

        this.indicatorsList = this.indicatorDiv.children;

        
        
        function getIndividualIndicator(){

            var indicator = document.createElement('button');
            indicator.style.width = '15px';
            indicator.style.height = '15px';
            indicator.style.borderRadius = '50%';
            indicator.style.backgroundColor = 'grey';
            indicator.style.border = 'none';
            indicator.style.marginRight= '10px';
            indicator.style.cursor = 'pointer';
            return indicator;
        }

    }

    function rightSlide(e){
        
        this.nextSliderLeftPosition = this.nextSliderLeftPosition - this.containerWidth;
    
        if (this.nextSliderLeftPosition <= this.MINIMUM_LEFT_POSITION){
            this.nextSliderLeftPosition = 0;

            var id1= setInterval(frame1.bind(this), this.transitionInterval);
            
            function frame1(){
            
                if(this.currentSliderLeftPosition >= this.nextSliderLeftPosition){
                    this.currentSliderLeftPosition = this.nextSliderLeftPosition;
                    this.wrapper.style.left = this.nextSliderLeftPosition + 'px';            
                    
                    this.currentSlide = Math.round(Math.abs(this.currentSliderLeftPosition / this.containerWidth));
                    
                    for(var i = 0; i < this.indicatorsList.length; i++)
                    {
                        if(i == this.currentSlide){
                            this.indicatorsList[i].style.width = '18px';
                            this.indicatorsList[i].style.height = '18px';
                            this.indicatorsList[i].style.backgroundColor = 'white';
                        }
                        else{
                            this.indicatorsList[i].style.width = '15px';
                            this.indicatorsList[i].style.height = '15px';
                            this.indicatorsList[i].style.backgroundColor = 'grey';
                        }
                    }
                    
                    this.leftButton.disabled = false;
                    this.rightButton.disabled = false;
                    this.indicatorDiv.disabled = false;
                        
                    clearInterval(id1);
                }
                else{
                    this.leftButton.disabled = true;
                    this.rightButton.disabled = true;
                    this.indicatorDiv.disabled = true;
                    
                    this.currentSliderLeftPosition = this.currentSliderLeftPosition + 100;
                    this.wrapper.style.left = this.currentSliderLeftPosition + 'px';
                
                }
            }
        }

        else{

            var id2 = setInterval(frame2.bind(this), this.transitionInterval);
            
            function frame2(){
            
                if(this.currentSliderLeftPosition <= this.nextSliderLeftPosition){
                    this.currentSliderLeftPosition = this.nextSliderLeftPosition;
                    this.wrapper.style.left = this.nextSliderLeftPosition + 'px';
                    
                    this.currentSlide = Math.round(Math.abs(this.currentSliderLeftPosition / this.containerWidth));
                    
                    for(var i = 0; i < this.indicatorsList.length; i++)
                    {
                        if(i == this.currentSlide){
                            this.indicatorsList[i].style.width = '18px';
                            this.indicatorsList[i].style.height = '18px';
                            this.indicatorsList[i].style.backgroundColor = 'white';
                        }
                        else{
                            this.indicatorsList[i].style.width = '15px';
                            this.indicatorsList[i].style.height = '15px';
                            this.indicatorsList[i].style.backgroundColor = 'grey';
                        }
                        }
                    
                    this.leftButton.disabled = false;
                    this.rightButton.disabled = false;
                    this.indicatorDiv.disabled = false;
                            
                    clearInterval(id2);
                }
                else{
                    this.leftButton.disabled = true;
                    this.rightButton.disabled = true;
                    this.indicatorDiv.disabled = true;
                    
                    this.currentSliderLeftPosition = this.currentSliderLeftPosition - 5;
                    this.wrapper.style.left = this.currentSliderLeftPosition + 'px';
                    
                }
            }
        }
    }

    function leftSlide(e){
        
        this.nextSliderLeftPosition = this.nextSliderLeftPosition + this.containerWidth;
    
        if (this.nextSliderLeftPosition > this.MAXIMUM_LEFT_POSITION){
            this.nextSliderLeftPosition = this.MINIMUM_LEFT_POSITION + this.containerWidth;

            var id3 = setInterval(frame3.bind(this), this.transitionInterval);
            
            function frame3(){
            
                if(this.currentSliderLeftPosition <= this.nextSliderLeftPosition){
                    this.currentSliderLeftPosition = this.nextSliderLeftPosition;
                    this.wrapper.style.left = this.nextSliderLeftPosition + 'px';      
                    
                    this.currentSlide = Math.round(Math.abs(this.currentSliderLeftPosition / this.containerWidth));
                    
                    for(var i = 0; i < this.indicatorsList.length; i++)
                    {
                        if(i == this.currentSlide){
                            this.indicatorsList[i].style.width = '18px';
                            this.indicatorsList[i].style.height = '18px';
                            this.indicatorsList[i].style.backgroundColor = 'white';
                        }
                        else{
                            this.indicatorsList[i].style.width = '15px';
                            this.indicatorsList[i].style.height = '15px';
                            this.indicatorsList[i].style.backgroundColor = 'grey';
                        }
                        }
                    
                    this.leftButton.disabled = false;
                    this.rightButton.disabled = false;
                    this.indicatorDiv.disabled = false;
                            
                    clearInterval(id3);
                }
                else{

                    this.leftButton.disabled = true;
                    this.rightButton.disabled = true;
                    this.indicatorDiv.disabled = true;

                    this.currentSliderLeftPosition = this.currentSliderLeftPosition - 100;
                    this.wrapper.style.left = this.currentSliderLeftPosition + 'px';
                
                }
            }
        }

        else{               
        
            var id4 = setInterval(frame4.bind(this), this.transitionInterval );
            
            function frame4(){
            
                if(this.currentSliderLeftPosition >= this.nextSliderLeftPosition){
                    this.currentSliderLeftPosition = this.nextSliderLeftPosition;
                    this.wrapper.style.left = this.nextSliderLeftPosition + 'px';
                    
                    this.currentSlide = Math.round(Math.abs(this.currentSliderLeftPosition / this.containerWidth));
                    
                    for(var i = 0; i < this.indicatorsList.length; i++)
                    {
                        if(i == this.currentSlide){
                            this.indicatorsList[i].style.width = '18px';
                            this.indicatorsList[i].style.height = '18px';
                            this.indicatorsList[i].style.backgroundColor = 'white';
                        }
                        else{
                            this.indicatorsList[i].style.width = '15px';
                            this.indicatorsList[i].style.height = '15px';
                            this.indicatorsList[i].style.backgroundColor = 'grey';
                        }
                        }
                    
                    this.leftButton.disabled = false;
                    this.rightButton.disabled = false;
                    this.indicatorDiv.disabled = false;                   

                    clearInterval(id4);
                }
                else{
                    this.leftButton.disabled = true;
                    this.rightButton.disabled = true;
                    this.indicatorDiv.disabled = true;
                    
                    this.currentSliderLeftPosition = this.currentSliderLeftPosition + 5;
                    this.wrapper.style.left = this.currentSliderLeftPosition + 'px';
                    
                }
            }
        }
    }
    

    function changeImageToIndicatorPos(e){

        for(var i = 0; i < this.indicatorsList.length; i++)
        {
            if(this.indicatorsList[i] == e.target)
            {
                // change currentLeft nextLeft and currentSlide values

                this.nextSliderLeftPosition = - i * this.containerWidth; 
                this.currentSlide = i;

                this.currentSliderLeftPosition = this.nextSliderLeftPosition;


                this.wrapper.style.left = this.nextSliderLeftPosition + 'px';
                
                this.indicatorsList[i].style.width = '18px';
                this.indicatorsList[i].style.height = '18px';
                this.indicatorsList[i].style.backgroundColor = 'white';
            }
            else{
                this.indicatorsList[i].style.width = '15px';
                this.indicatorsList[i].style.height = '15px';
                this.indicatorsList[i].style.backgroundColor = 'grey';
            }
        }
    }
}

new slider(images, 2, 2).init();
new slider(images, 4, 4).init();
new slider(images, 6, 4).init();
new slider(images, 10, 8).init();
