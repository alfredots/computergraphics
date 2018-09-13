class Circle{
    constructor() {
        this.drawning = false;
        this.x1 = null;
        this.x2 = null;
        this.y1 = null;
        this.y2 = null;    
    }

    draw(cx, cy){
        if(!this.drawning){
            this.x1 = cx;
            this.y1 = cy;
            this.drawning = true;
        }else{
            this.x2 = cx;
            this.y2 = cy;

            var dx = this.x1 - this.x2;
            var dy = this.y1 - this.y2;
            var dist = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));

            context.beginPath();
            context.arc(this.x1, this.y1, dist, 0, Math.PI*2);
            context.stroke();
            context.closePath();
            this.drawning = false;
        }
    }

}
var circle = new Circle();