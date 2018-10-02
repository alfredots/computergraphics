class Circle{
    constructor(cx, cy) {
        this.x1 = cx;
        this.x2 = null;
        this.y1 = cy;
        this.y2 = null;    
    }

    addSecondPoint(cx, cy){
        this.x2 = cx;
        this.y2 = cy;
    }

    draw(){
        var dx = this.x1 - this.x2;
        var dy = this.y1 - this.y2;
        var dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));

        context.beginPath();
        context.arc(this.x1, this.y1, dist, 0, Math.PI*2);
        context.stroke();
        context.closePath();
    }

}