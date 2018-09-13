var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var btnCurrentAction = "none";



function onDown(e){

    var cx = event.clientX - canvas.offsetLeft;
    var cy = event.clientY - canvas.offsetTop;

    
    switch (btnCurrentAction) {
        case "Point":
            point.draw(cx, cy);
            break;
        case "Line":
            line.draw(cx, cy);
            break;
        case "Circle":
            circle.draw(cx, cy);
        default:
            break;
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

canvas.addEventListener("click", onDown);


