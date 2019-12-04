function Pipe(parentElem, left, top, height , src){
    this.parentElem = parentElem;
    this.element;
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = 80;
    this.src = src;
    this.hasPassed = false;

    this.init = function(){
        this.element = document.createElement('div');
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.top = this.top + 'px';
        this.element.style.background = this.src;

        if(this.top == 0){
            this.element.style.backgroundPosition = 'bottom';
        }

        this.element.style.position = 'absolute';

        this.draw();

        this.parentElem.appendChild(this.element);
    }

    this.draw = function(){
        this.element.style.left = this.left + 'px';
    }

    this.destroy = function(){
        this.parentElem.removeChild(this.element);
    }
}