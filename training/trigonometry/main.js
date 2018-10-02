window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var centerY = height * .5,
        centerX = width * .5,
        baseRadius = 100,
        baseAlpha = 0.05,
        radiusOffset = 50,
        offset = height * .4,
        speed = 0.01,
        angle = 0;

        ready();
        
    function render() {
        var y = centerY + Math.sin(angle) * offset;

        context.beginPath();
        context.arc(centerX, y, 50, 0, Math.PI*2, false);
        context.fill();

        angle += speed;
    }

    function renderRadius(){
        var radius = baseRadius + Math.sin(angle) * radiusOffset;

        context.beginPath();
        context.arc(200, 200, radius, 0, Math.PI*2, false);
        context.fill();       
        angle += speed;
    }

    function renderAlpha(){
        var alpha = baseAlpha + Math.sin(angle);

        context.fillStyle='rgba(0, 0, 0,'+alpha+')';
        context.beginPath();
        context.arc(1000, 200, 100, 0, Math.PI*2, false);
        context.fill();       
        angle += speed;
    }

    function ready(){
        context.clearRect(0, 0, width, height);
        render();
        renderRadius();
        renderAlpha();
        requestAnimationFrame(ready);
    }


    
};