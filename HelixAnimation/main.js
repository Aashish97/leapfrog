class helix {
    constructor(columnNum, rowNum, radius, numStrands, speed){
        this.canvas = document.getElementById('myCanvas');
        this.canvas.style.marginTop = '10%';
        this.canvas.style.marginLeft = '20%';
        
        this.ctx = this.canvas.getContext('2d');
        this.frameCount = 0;
        this.phase = 0;
        this.speed = speed;
        this.strandNum = numStrands;
        this.rowNum = rowNum;
        this.columnNum = columnNum;
        this.circleRadius = radius;
        this.canvasWidth = this.ctx.canvas.width;
        this.canvasHeight = this.ctx.canvas.height;

    }

    drawHelix(){
        let x = 0;
        this.ctx.fillStyle = '#083b4c';
        this.ctx.fillRect(0,0,this.canvasWidth, this.canvasHeight);
        this.frameCount++;
        this.phase = this.frameCount * this.speed;

        //grid of Circles
        for(let strand = 0; strand < this.strandNum; strand++){
            let strandPhrase = this.phase + (Math.PI  * (strand/this.strandNum));

            for(let col = 0; col < this.columnNum; col++){

                let colOffset = (Math.PI *(col)/this.columnNum);
                //visibility of x-position
                x = (50 + (this.canvasWidth - 50 - 50)*col/(this.columnNum));

                for(let row = 0; row < this.rowNum; row++){

                    //visibility of y-position
                    let y = this.canvasHeight/4 + row * 10 + Math.sin(strandPhrase + colOffset) * 50 + 15;

                    let sizeOffset = (Math.cos(strandPhrase - (row/this.rowNum)+ colOffset)+1) *0.4;
                    let circleSize = sizeOffset * this.circleRadius;

                    this.ctx.beginPath();
                    this.ctx.fillStyle = '#ffa566';
                    this.ctx.ellipse(x, y, circleSize,circleSize, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

}

let wave = new helix(10, 15, 8, 2, 0.08);

setInterval( () =>{
    wave.drawHelix();
}, 50);

