class Point{
    constructor(cx, cy){
        this.x = cx;
        this.y = cy;
        this.color = "black";
    }

    setColor(color){
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.fillRect(this.x, this.y, 4, 4);
        context.closePath();
    }

    pick(mx, my, t){

        if(((this.x-t) <= mx) && (mx <= (this.x+t))){
            if(((this.y-t) <= my) && (my <= (this.y+t))){
                return true;
            }
        }
        return false;

    }

    translate(dx, dy){
        let tx = dx;
        let ty = dy;


        let matrix1 = [[1,0,dx],
                        [0,1,dy],
                        [0,0,1]
                        ];
        let matrix2 = [[this.x],
                        [this.y],
                            [1]];


        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;
    }

    rotate(dx, dy){

        let sen = 0.173; //sen 10
        let cos = 0.984; //cos 10
        let matrix1 = [[cos, -sen, 0],
                        [sen, cos, 0],
                        [0,0,1]];

        this.translate(-dx, -dy);

        let matrix2 = [[this.x],
                        [this.y],
                        [1]];

        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;

        this.translate(dx, dy);
    }

    scale(dx, dy){

        let matrix1 = [[2, 0, 0,],
                        [0, 2, 0],
                        [0, 0, 1]];

        let matrix2 = [[this.x],
            [this.y],
            [1]];

        this.translate(-dx, -dy);
        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;
        this.translate(dx, dy);
    }

}