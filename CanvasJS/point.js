class Point{
    constructor(cx, cy){
        this.x = cx;
        this.y = cy;
        this.w = 4;
        this.h = 4;
    }

    draw(){
        context.beginPath();
        context.fillRect(this.x, this.y, this.w, this.h);
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

    rotate(cx, cy){

        let sen = Math.sin(0.1);
        let cos = Math.cos(0.1);
        let matrix1 = [[cos, -sen, 0],
                        [sen, cos, 0],
                        [0,0,1]];

        this.translate(-cx, -cy);

        let matrix2 = [[this.x],
                        [this.y],
                        [1]];

        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;

        this.translate(cx, cy);
    }

    scale(dx, dy){

        let matrix1 = [[2, 0, 0,],
                        [0, 2, 0],
                        [0, 0, 1]];

        let matrix2 = [[this.x],
            [this.y],
            [1]];

        this.w = this.w*1.5;
        this.h = this.h*1.5;

        this.translate(-dx, -dy);
        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;
        this.translate(dx, dy);
    }

}