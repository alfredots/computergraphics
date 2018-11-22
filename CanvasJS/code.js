
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var btnCurrentAction = "none";
var numberOfClicks = 0;
var cx;
var cy;
var mousePressed = false;
var shapeDragging = false;
var shapes = [];
var shape = 0;
var previousX = 0;
var previousY = 0;

function reDraw(){
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
}

function reset(){
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].resetColor();
    }
}

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
        case "pick":
            for (let i = 0; i < shapes.length; i++) {
                //POINT
                if(shapes[i] instanceof Point){
                    if(shapes[i].pick(cx, cy, 5)){
                        shapeSelected = shapes[i];
                        console.log(shapeSelected);
                        alert("ponto selecionado");
                        previousX = cx;
                        previousY = cy;
                    }
                }
                //LINE
                if(shapes[i] instanceof  Line){
                    if(shapes[i].pick(cx, cy, 20)){
                        console.log("add linha");
                        shapeSelected = shapes[i];
                        alert("reta selecionada");
                        previousX = cx;
                        previousY = cy;
                        console.log(shapeSelected);
                    }
                }

                //POLYGON
                if(shapes[i] instanceof  Polygon){
                    if(shapes[i].pick(cx, cy)){
                        shapeSelected = shapes[i];
                        alert("polígono selecionado");
                        previousX = cx;
                        previousY = cy;
                    }
                }
            }
            reDraw();
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
                reDraw();

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

document.getElementById('btnPick').addEventListener('click', function(){
    btnCurrentAction = "pick";
})

document.getElementById('btnTranslate').addEventListener('click', function(){
    btnCurrentAction = "translate";
})

document.getElementById('btnRotate').addEventListener('click', function(event){
    console.log(shapeSelected);

    var x = (event.clientX - context.canvas.offsetLeft)-cx;
    var y = (event.clientY - context.canvas.offsetTop)-cy;
    context.save();

    var backCanvas = document.createElement('canvas');
    backCanvas.width = canvas.width;
    backCanvas.height = canvas.height;
    var backContext = backCanvas.getContext('2d');
    backContext.drawImage(canvas,0,0);

    console.log("previousX: "+ previousX);
    console.log("previousY: "+ previousY);
    shapeSelected.rotate(previousX, previousY);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    reDraw();

    cx = event.clientX - context.canvas.offsetLeft;
    cy = event.clientY - context.canvas.offsetTop;
})

document.getElementById('btnScale').addEventListener('click', function(){
    console.log(shapeSelected);

    context.save();

    var backCanvas = document.createElement('canvas');
    backCanvas.width = canvas.width;
    backCanvas.height = canvas.height;
    var backContext = backCanvas.getContext('2d');
    backContext.drawImage(canvas,0,0);

    console.log("previousX: "+ previousX);
    console.log("previousY: "+ previousY);

    shapeSelected.scale(previousX, previousY);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();

    reDraw();
})


document.getElementById('btnClear').addEventListener('click', function (){
    btnCurrentAction = "clear";
    context.clearRect(0, 0, canvas.width, canvas.height);
    shapes = [];
})

canvas.addEventListener("mousedown", onDown);
canvas.addEventListener("mouseup", onUp);
canvas.addEventListener("mousemove", onMove);


