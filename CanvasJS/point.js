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

}