class Line{
    constructor(){
        this.drawning = false;
    }

    draw(cx, cy){
        console.log("teste")
        if(!this.drawning){
            console.log("teste2")
            context.beginPath();
            context.moveTo(cx, cy);
            this.drawning = true; 
        }else{
            console.log("teste3")
            context.lineTo(cx, cy);
            context.stroke();
            context.closePath();
            this.drawning = false;
        }
    }
}

var line = new Line();
