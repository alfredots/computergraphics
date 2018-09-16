var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var btnCurrentAction = "none";
var numberOfClicks = 0;
var shapes = [];
var shape;

function onDown(e){

    var cx = event.clientX - canvas.offsetLeft;
    var cy = event.clientY - canvas.offsetTop;

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
        case "translate":
            for (let index = 0; index < shapes.length; index++) {
                if(shapes[index] instanceof Line){
                    console.log("entrei aqui");
                    shapes[index].translate();
                    shapes[index].draw();
                }
            }
            break;
        default:
            break;
    }

    console.log(shapes);
    
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

canvas.addEventListener("click", onDown);


