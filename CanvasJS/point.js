class Point{
    constructor(cx, cy){
        this.x = cx;
        this.y = cy;
    }

    draw(){
        context.beginPath();
        context.fillRect(this.x, this.y, 4, 4);
        context.closePath();
    }

}