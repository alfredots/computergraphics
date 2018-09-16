class Line{
    constructor(cx,cy){
        this.x1 = cx;
        this.x2 = null;
        this.y1 = cy;
        this.y2 = null;
    }

    addSecondPoint(cx, cy){
        this.x2 = cx;
        this.y2 = cy;
    }  

    translate(){
        console.log("function translate");
        
        let tx = -100;
        let ty = -100;
        let matrix1 = [[1,0,tx],
                       [0,1,ty],
                       [0,0,1]
                     ];

        let matrix2 = [[this.x1],
                       [this.x2],
                       [1]];

        var newPositions = multiplyMatriz(matrix1,matrix2);
        console.log(newPositions);
        this.x1 = newPositions.x;
        this.y1 = newPositions.y;
    }

    draw(){
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
        context.closePath();
    }
}
