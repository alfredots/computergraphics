window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    // context.fillStyle='red';
    // context.fillRect(100, 100, 200, 200);
    // context.strokeStyle='blue';
    // context.strokeRect(300, 300, 200, 200);
    
    //desenhando um path
    // context.beginPath();
    
    // context.moveTo(75,250);
    // context.lineTo(150,50);
    // context.lineTo(225, 250);
    // context.lineTo(50, 120);
    // context.lineTo(250, 120);
    // context.lineTo(75, 250);

    // //Configurar a linha
    // context.lineWidth=2;
    // context.strokeStyle='red';
    
    // context.stroke();

    //arcos
    context.fillStyle='gray';
    context.strokeStyle='black';
    context.lineWidth= 2;
    
    
    context.beginPath();
    //primeiro arco
    context.arc(50, 50, 40, 90*Math.PI/180, 270*Math.PI/180, false);
    context.fill();
    context.stroke();
    
    //segundo arco
    context.beginPath();
    context.arc(150, 50, 40, 90*Math.PI/180, 270*Math.PI/180, true);
    context.fill();
    context.stroke();

    
};