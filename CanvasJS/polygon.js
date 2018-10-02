class Polygon {

    constructor(){
        this.coord = [];
        this.start = false;
    }

    addPoint(x,y){
        this.coord.push({'x':x,'y':y});
    }

    checkEnd(mx, my){
        let t = 10;

        if(((this.coord[0].x-t) <= mx) && (mx <= (this.coord[0].x+t))){
            if(((this.coord[0].y-t) <= my) && (my <= (this.coord[0].y+t))){
                console.log("fechou poly");
                return true;

            }
        }
        return false;
    }

    draw(i){


        if(i == 0) {
            context.beginPath();
            context.moveTo(this.coord[0].x, this.coord[0].y);
            this.start = true;
        }else if((i == 0) && this.start){
            context.lineTo(this.coord[0].x, this.coord[0].y);
            context.closePath();
        }
        else
            context.lineTo(this.coord[i].x, this.coord[i].y);

        context.stroke();
    }

}