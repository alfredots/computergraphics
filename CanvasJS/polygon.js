class Polygon {

    constructor(){
        this.coord = [];
        this.start = false;
    }
    
    getTotalCoords(){
        return this.coord.length;
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

        console.log("draw "+i);
        console.log("start "+this.start);
        if(i == 0 && !this.start) {
            context.beginPath();
            context.moveTo(this.coord[0].x, this.coord[0].y);
            this.start = true;
        }else if(this.checkEnd(this.coord[i].x, this.coord[i].y)){
            context.lineTo(this.coord[0].x, this.coord[0].y);
            context.closePath();
            this.start = false;
        }
        else{
            console.log("teste");
            context.lineTo(this.coord[i].x, this.coord[i].y);

        }
        context.stroke();
    }

    drawMe() {

        for(let i = 0; i < this.coord.length; i++){
            if(i == 0)
                context.beginPath();
            context.moveTo(this.coord[i].x, this.coord[i].y);
            context.lineTo(this.coord[i].x, this.coord[i].y);
            if(i == (this.coord.length - 1))
                context.closePath();

        }
    }

    translate(cx, cy){
        let tx = cx;
        let ty = cy;

        for(let i = 0; i < this.coord.length; i++){
            let matrix1 = [[1,0,tx],
                            [0,1,ty],
                            [0,0,1]];
            let matrix2 = [[this.coord[i].x],
                            [this.coord[i].y],
                            [1]];

            var newPositions = multiplyMatriz(matrix1, matrix2);
            this.coord[i].x = newPositions.x;
            this.coord[i].y = newPositions.y;
        }

        this.drawMe();
    }

    rotatePlus(){
        let sen = 0.087; //sen 5
        let cos = 0.996; //cos 5
        let matrix1 = [[cos, -sen, 0],
            [sen, cos, 0],
            [0,0,1]];

        for(let i = 0; i < this.coord.length; i++){
            let matrix2 = [[this.coord[i].x],
                [this.coord[i].y],
                [1]];

            let newPositions = multiplyMatriz(matrix1,matrix2);
            this.coord[i].x = newPositions.x;
            this.coord[i].y = newPositions.y;
        }

        this.drawMe();
    }

    pick(mx, my){

        let ni = 0;
        let fst = this.coord.length -1;
        let xc
        let p1, p2

        for(let i =0; i < this.coord.length; i++){
            p1 = this.coord[i];
            p2 = this.coord[fst];

            if(!(p1.y == p2.y) && !((p1.y > my) && (p2.y > my)) &&
                !((p1.y < my) && (p2.y < my)) && !((p1.x < mx) && (p2.x < mx))){
                if(p1.y == my){
                    if((p1.x > mx) && (p2.y > my))
                        ni++;
                }else{
                    if(p2.y == my){
                        if((p2.x > mx) && (p1.y > my))
                            ni++;
                    }else{
                        if((p1.x > mx) && (p2.x > mx)) {
                            ni++;
                        }else{
                            let dx = p1.x - p2.x;
                            xc = p1.x;
                            if( dx != 0){
                                xc += (my - p1.y) * dx / (p1.y - p2.y);
                                if(xc > mx)
                                    ni++;
                            }
                        }
                    }
                }
            }
            fst = i;
        }
        return(ni%2);
    }

}