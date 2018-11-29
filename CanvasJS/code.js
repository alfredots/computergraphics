
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
var shapeSelected = null;
var previousX = 0;
var previousY = 0;

function reDraw(){
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw();
    }
}

function restoreDraw(){
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].restore();
    }
    reDraw();
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
                shapes.push(shape);
                numberOfClicks++;
            }else{
                // if(shape.checkEnd(cx,cy)){
                //     shape.draw(0);
                //     numberOfClicks = 0;
                // }else{
                //     shape.addPoint(cx,cy);
                //     shape.draw(numberOfClicks);
                //     numberOfClicks++;     
                // }
                shape.addPoint(cx,cy);

                numberOfClicks++;
                shape.drawning(); 
            }
            break;
        //PICK BUTTON
        case "pick":
            for (let i = 0; i < shapes.length; i++) {
                //POINT
                if(shapes[i] instanceof Point){
                    if(shapes[i].pick(cx, cy, 5)){
                        
                        if(shapeSelected != null)
                        shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
                        console.log(shapeSelected);
                        
                        previousX = cx;
                        previousY = cy;
                    }
                }
                //LINE
                if(shapes[i] instanceof  Line){
                    if(shapes[i].pick(cx, cy, 20)){
                        if(shapeSelected != null)
                            shapeSelected.restore();
                        console.log("add linha");
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
                        previousX = cx;
                        previousY = cy;
                        console.log(shapeSelected);
                    }
                }

                //POLYGON
                if(shapes[i] instanceof  Polygon){
                    if(shapes[i].pick(cx, cy)){
                        if(shapeSelected != null)
                            shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
                        previousX = cx;
                        previousY = cy;
                    }
                }
                //CIRCLES
                if(shapes[i] instanceof Circle){
                    if(shapes[i].pick(cx, cy, 20)){
                        if(shapeSelected != null)
                            shapeSelected.restore();
                        shapeSelected = shapes[i];
                        shapeSelected.selected();
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
    shapeDragging = false;
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
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                    //LINE
                    if(shapes[i] instanceof  Line){
                        console.log(shapes[i].pick(cx, cy, 20));
                        if(shapes[i].pick(cx, cy, 5)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                    //CIRCLE
                    if(shapes[i] instanceof  Circle){
                        console.log(shapes[i].pick(cx, cy, 20));
                        if(shapes[i].pick(cx, cy, 5)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                    //POLYGON
                    if(shapes[i] instanceof  Polygon){
                        if(shapes[i].pick(cx, cy)){
                            shapeSelected = shapes[i];
                            shapeDragging = true;
                        }
                    }
                }

                if(shapeDragging){
                    shapeSelected.translate(x, y);
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

    if(shapes.length > 0){
        restoreDraw();
    }
})

document.getElementById('btnLine').addEventListener('click', function(){
    btnCurrentAction = "Line";

    if(shapes.length > 0){
        restoreDraw();
    }
})

document.getElementById('btnCircle').addEventListener('click', function(){
    btnCurrentAction = "Circle";
})

document.getElementById('btnPolygon').addEventListener('click', function(){
    btnCurrentAction = "Polygon";

    if(shapes.length > 0){
        restoreDraw();
    }
})

document.getElementById('btnPick').addEventListener('click', function(){
    btnCurrentAction = "pick";

    if(shapes.length > 0){
        restoreDraw();
    }
})

document.getElementById('btnTranslate').addEventListener('click', function(){
    btnCurrentAction = "translate";
    restoreDraw();
})

document.getElementById('btnRotate').addEventListener('click', function(event){
    if(shapeSelected == null)
        alert("você não selecionou nenhum objeto.")
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
    if(shapeSelected == null)
        alert("você não selecionou nenhum objeto.")
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

canvas.addEventListener('dblclick', function(){
    
    if(btnCurrentAction == "Polygon"){
        numberOfClicks = 0;
        shape.draw();
    }
}, false);


