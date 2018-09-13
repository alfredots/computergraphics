class Point{
    constructor(){
    }

    draw(cx, cy){
        context.beginPath();
        context.fillRect(cx, cy, 4, 4);
        context.closePath();
    }

}
var point = new Point();
