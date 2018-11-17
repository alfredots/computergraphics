
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var btnCurrentAction = "none";
var numberOfClicks = 0;
var cx;
var cy;
var mousePressed = false;
var shapeDragging = false;
var shapes = [];
var shape;


function onDown(event){

    cx = event.clientX - context.canvas.offsetLeft;
    cy = event.clientY - context.canvas.offsetTop;

    mousePressed = true;
    switch (btnCurrentAction) {
        case "Point":
            if(numberOfClicks == 0){
                shape = new Point(cx, cy);
                shapes.push(shape);
                shape.draw();
                numberOfClicks = 0;
            }
            break;
        case "Line":
            if(numberOfClicks == 0){
                shape = new Line(cx, cy);
                shapes.push(shape); 
                numberOfClicks++;       
            }else if(numberOfClicks == 1){
                shape.addSecondPoint(cx,cy);
                shape.draw();
                numberOfClicks = 0;
            }
            break;
        case "Circle":
            if(numberOfClicks == 0){
                shape = new Circle(cx, cy);
                shapes.push(shape);
                numberOfClicks++;       
            }else if(numberOfClicks == 1){
                shape.addSecondPoint(cx,cy);
                shape.draw();
                numberOfClicks = 0;
            }
            break;
        case "Polygon":
            console.log("poly");
            if(numberOfClicks == 0){
                console.log("criei poligono")
                shape = new Polygon();
                shape.addPoint(cx,cy);
                shape.draw(numberOfClicks);
                shapes.push(shape);
                numberOfClicks++;
            }else{
                if(shape.checkEnd(cx,cy)){
                    shape.draw(0);
                    numberOfClicks = 0;
                }else{
                    shape.addPoint(cx,cy);
                    shape.draw(numberOfClicks);
                    numberOfClicks++;     
                }
            }
            break;
    }
}

function onUp(){
    mousePressed = false;
}

function onMove(event){
    if(mousePressed){

        switch (btnCurrentAction) {
            case "translate":
                console.log("translate");
                var x = (event.clientX - context.canvas.offsetLeft)-cx;
                var y = (event.clientY - context.canvas.offsetTop)-cy;
                context.save();

                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                var backContext = backCanvas.getContext('2d');
                backContext.drawImage(canvas,0,0);

                for (let i = 0; i < shapes.length; i++) {
                    //POINT
                    if(shapes[i] instanceof Point){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].translate(x, y);
                        }
                    }
                    //LINE
                    if(shapes[i] instanceof  Line){
                        console.log(shapes[i].pick(cx, cy, 20));
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].translate(x,y);
                        }
                    }

                    //POLYGON
                    if(shapes[i] instanceof  Polygon){
                        if(shapes[i].pick(cx, cy)){
                            shapes[i].translate(x, y);
                        }
                    }
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.restore();
                for (let i = 0; i < shapes.length; i++) {
                    if(shapes[i] instanceof Polygon){
                        var totalCoords = shapes[i].getTotalCoords();
                        for (let j = 0; j < totalCoords; j++) {
                            shapes[i].draw(j);
                        }
                        shapes[i].draw(0);
                    }else{
                        shapes[i].draw();
                    }
                }

                cx = event.clientX - context.canvas.offsetLeft;
                cy = event.clientY - context.canvas.offsetTop;
                break;
            //ROTATION PLUS
            case "rotate":
                console.log("rotate plus");
                var x = (event.clientX - context.canvas.offsetLeft)-cx;
                var y = (event.clientY - context.canvas.offsetTop)-cy;
                context.save();

                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                var backContext = backCanvas.getContext('2d');
                backContext.drawImage(canvas,0,0);

                for (let i = 0; i < shapes.length; i++) {
                    //POINT
                    if(shapes[i] instanceof Point){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].rotate(cx,cy);
                        }
                    }
                    //LINE
                    if(shapes[i] instanceof  Line){
                        console.log(shapes[i].pick(cx, cy, 20));
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].rotate(cx, cy);
                        }
                    }

                    //POLYGON
                    if(shapes[i] instanceof  Polygon){
                        if(shapes[i].pick(cx, cy)){
                            shapes[i].rotate(cx, cy);
                        }
                    }
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.restore();
                for (let i = 0; i < shapes.length; i++) {
                    if(shapes[i] instanceof Polygon){
                        var totalCoords = shapes[i].getTotalCoords();
                        for (let j = 0; j < totalCoords; j++) {
                            shapes[i].draw(j);
                        }
                        shapes[i].draw(0);
                    }else{
                        shapes[i].draw();
                    }
                }

                cx = event.clientX - context.canvas.offsetLeft;
                cy = event.clientY - context.canvas.offsetTop;
                break;
                //
            case "scale":
                console.log("scale");
                var x = (event.clientX - context.canvas.offsetLeft)-cx;
                var y = (event.clientY - context.canvas.offsetTop)-cy;
                context.save();

                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                var backContext = backCanvas.getContext('2d');
                backContext.drawImage(canvas,0,0);

                for (let i = 0; i < shapes.length; i++) {
                    //POINT
                    if(shapes[i] instanceof Point){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].scale(cx,cy);
                        }
                    }
                    //LINE
                    if(shapes[i] instanceof  Line){
                        console.log(shapes[i].pick(cx, cy, 20));
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].scale(cx, cy);
                        }
                    }

                    //POLYGON
                    if(shapes[i] instanceof  Polygon){
                        if(shapes[i].pick(cx, cy)){
                            shapes[i].scale(cx, cy);
                        }
                    }
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.restore();
                for (let i = 0; i < shapes.length; i++) {
                    if(shapes[i] instanceof Polygon){
                        var totalCoords = shapes[i].getTotalCoords();
                        for (let j = 0; j < totalCoords; j++) {
                            shapes[i].draw(j);
                        }
                        shapes[i].draw(0);
                    }else{
                        shapes[i].draw();
                    }
                }

                cx = event.clientX - context.canvas.offsetLeft;
                cy = event.clientY - context.canvas.offsetTop;
                break;
        }
    }
}

document.getElementById('btnPoint').addEventListener('click', function(){
    btnCurrentAction = "Point";
})

document.getElementById('btnLine').addEventListener('click', function(){
    btnCurrentAction = "Line";
})

document.getElementById('btnCircle').addEventListener('click', function(){
    btnCurrentAction = "Circle";
})

document.getElementById('btnPolygon').addEventListener('click', function(){
    btnCurrentAction = "Polygon";
})

document.getElementById('btnTranslate').addEventListener('click', function(){
    btnCurrentAction = "translate";
})

document.getElementById('btnRotate').addEventListener('click', function(){
    btnCurrentAction = "rotate";
})

document.getElementById('btnScale').addEventListener('click', function(){
    btnCurrentAction = "scale";
})


document.getElementById('btnClear').addEventListener('click', function (){
    btnCurrentAction = "clear";
    context.clearRect(0, 0, canvas.width, canvas.height);
    shapes = [];
})

canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);


