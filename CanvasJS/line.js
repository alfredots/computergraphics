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

    translate(cx, cy){
        let tx = cx;
        let ty = cy;
        let matrix1 = [[1,0,tx],
                       [0,1,ty],
                       [0,0,1]
                     ];

        let matrix2 = [[this.x1],
                       [this.y1],
                       [1]];                       

        var newPositions = multiplyMatriz(matrix1,matrix2);
        console.log(newPositions);
        this.x1 = newPositions.x;
        this.y1 = newPositions.y;

        let matrix3 = [[this.x2],
                       [this.y2],
                       [1]];
        
        var newPositions2 = multiplyMatriz(matrix1,matrix3);
        console.log(newPositions);
        this.x2 = newPositions2.x;
        this.y2 = newPositions2.y;
    }

    pickCode(x, y, xmin, xmax, ymin, ymax){
        var cod = [];
        cod[0] = x < xmin;
        cod[1] = x > xmax;
        cod[2] = y < ymin;
        cod[3] = y > ymax;

        return cod;
    }

    pick(mx,my,t){
        let cod0, cod1, j;
        let x0 = this.x1, x1 = this.x2;
        let y0 = this.y1, y1 = this.y2;
        let xmin,xmax,ymin,ymax;

        xmin = mx - t;
        xmax = mx + t;
        ymin = my - t;
        ymax = my + t;

        cod1 = this.pickCode(x1, y1, xmin, xmax, ymin, ymax);

        do{
            cod0 = this.pickCode(x0, y0, xmin, xmax, ymin, ymax);

            for(j = 0; j < 4; j++)
                if(cod1[j] && cod0[j]) break;
            if(j != 4) break;

            if(cod0[0]){
                y0 += (xmin - x0)*(y1-y0)/(x1-x0);
                x0 = xmin;
            }else if(cod0[1]){
                y0 += (xmax - x0)*(y1-y0)/(x1-x0);
                x0 = xmax;
            }else if(cod0[2]){
                x0 += (ymin - y0)*(x1-x0)/(y1-y0);
                y0 = ymin;
            }else if(cod0[3]){
                x0 += (ymax - y0)*(x1-x0)/(y1-y0);
            }else{
                return true;
            }
        }while(1);

        return false;
    }

    draw(){
        context.beginPath();
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.stroke();
        context.closePath();
    }
}
