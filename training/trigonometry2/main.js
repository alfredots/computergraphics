window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    context.translate(0, height/2);

    for(var angle = 0; angle < Math.PI * 2; angle += .01 ) {
        console.log(Math.sin(angle));
        var x = angle * 200, //eixo x
            y = Math.sin(angle) * 200; //pontos sendo marcados no eixo y

        context.fillRect(x, y, 5, 5);
        
    }
    
};