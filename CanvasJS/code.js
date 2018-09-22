var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var btnCurrentAction = "none";
var numberOfClicks = 0;
var cx;
var cy;
var mousePressed = false;
var shapes = [];
var shape;


function onDown(event){

    cx = event.clientX - canvas.offsetLeft;
    cy = event.clientY - canvas.offsetTop;

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
    }
    console.log(shapes);
}

function onUp(){
    mousePressed = false;
}

function onMove(event){

    if(mousePressed){
        switch (btnCurrentAction) {
            case "translate":
                let x = (event.clientX - context.canvas.offsetLeft)-cy;
                let y = (event.clientY - context.canvas.offsetTop)-cx;

                var backCanvas = document.createElement('canvas');
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                var backContext = backCanvas.getContext('2d');
                backContext.drawImage(canvas,0,0);

                let id = 0;
                for (let i = 0; i < shapes.length; i++) {
                    if(shapes[i] instanceof Point){
                        if(shapes[i].pick(cx, cy, 5)){
                            shapes[i].translate(x, y);
                            id = i;
                        }
                    }
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(backCanvas, 0, 0);
                shapes[id].draw();
                context.restore();

                cx = event.clientX - context.canvas.offsetLeft;
                cy = event.clientY - context.canvas.offsetTop;

                /*                var x = (event.clientX - context.canvas.offsetLeft) - cx;
                                var y = (event.clientY - context.canvas.offsetTop) - cy;
                                context.save();

                                var backCanvas = document.createElement('canvas');
                                backCanvas.width = canvas.width;
                                backCanvas.height = canvas.height;
                                var backContext = backCanvas.getContext('2d');
                                backContext.drawImage(canvas,0,0);

                                context.transform(1,0,
                                                  0,1,
                                                  x,y);

                                context.clearRect(0, 0, canvas.width, canvas.height);
                                context.drawImage(backCanvas, 0, 0);
                                context.restore();

                                cx = event.clientX - context.canvas.offsetLeft;
                                cy = event.clientY - context.canvas.offsetTop;
                                console.log("rodei tudo");*/
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

document.getElementById('btnTranslate').addEventListener('click', function(){
    btnCurrentAction = "translate";
})

document.getElementById('btnClear').addEventListener('click', function (){
    btnCurrentAction = "clear";
    context.clearRect(0, 0, canvas.width, canvas.height);
})

canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);


