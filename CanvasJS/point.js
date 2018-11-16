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

    rotatePlus(){

        let sen = 0.087; //sen 5
        let cos = 0.996; //cos 5
        let matrix1 = [[cos, -sen, 0],
                        [sen, cos, 0],
                        [0,0,1]];

        let matrix2 = [[this.x],
                        [this.y],
                        [1]];

        let newPositions = multiplyMatriz(matrix1,matrix2);
        this.x = newPositions.x;
        this.y = newPositions.y;
    }


}