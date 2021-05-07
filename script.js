var main=document.getElementById("main");
var fail=document.getElementById("fail");
var icn=document.getElementById("icn");
var rules=document.getElementById("rules");

main.style.display="none";
fail.style.display="none";


icn.addEventListener('click',function(){
    main.style.display="block";
    fail.style.display="none";
    rules.style.display="none";

    function initial(){
        console.log("i m here");
        canvas=document.getElementById('gamecanvas');
        scoretxt=document.getElementById('scoretxt');
        ftxt=document.getElementById('ftxt');
        scoret=document.getElementById('scoret');
        ft=document.getElementById('ft');
        w=h=canvas.width=canvas.height=500;
        height=20;
        pen=canvas.getContext('2d');
        food=RandomFood();
        play= "true";
        score=0; foodeat=0;
    
       foodimg=new Image();
       foodimg.src="img/apple_00.png";
    
        snake={
            color:"blue",
            direction: "right" ,
            length: 3,
            x:0, y:0,
            cells: [],
    
            initialSnake:function(){
                for(var i=this.length;i>0;i--){
                   this.cells.push({x:i,y:0});
                }
            },
            initialDraw:function(){
                for(var i=0;i<this.cells.length;i++){
                    pen.fillStyle=this.color;
                    pen.fillRect(this.cells[i].x*height,this.cells[i].y*height,height-1,height-1);
                }
            },
            initialUpdate:function(){
                var headx=this.cells[0].x;
                var heady=this.cells[0].y;
    
                if(headx==food.x && heady==food.y){
                    food=RandomFood();
                    score+=10;
                }
                else{
                    this.cells.pop();
                }
                var nY; var nX;
                if(this.direction=="right"){
                    nX=headx+1; nY=heady;
                }
                else if(this.direction=="left"){
                    nX=headx-1; nY=heady;
                }
                else if(this.direction=="up"){
                    nX=headx; nY=heady-1;
                }
                else if(this.direction=="down"){
                    nX=headx; nY=heady+1;
                }
    
                this.cells.unshift({x: nX,y: nY});
    
                var lastx=Math.round(w/height);
                var lasty=Math.round(h/height);
    
                if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x+1>lastx || this.cells[0].y+1>lasty){
                    play="false";
                }
            },
    
        };
        snake.initialSnake();
        
        function PressedKey(e){
            
            if(e.key=="ArrowUp"){
                snake.direction="up";
            }
            else if(e.key=="ArrowDown"){
                snake.direction="down";
            }
            else if(e.key=="ArrowRight"){
                snake.direction="right";
            }
            else if(e.key=="ArrowLeft"){
                snake.direction="left";
            }
            console.log(snake.direction);
        }
        document.addEventListener('keydown',PressedKey)
    }
    
    function draw(){
        pen.clearRect(0,0,h,w);
        snake.initialDraw();
        pen.fillStyle=food.color;
        pen.drawImage(foodimg,food.x*height,food.y*height,height,height);
    }
    
    
    function update(){
        snake.initialUpdate();
    }
    
    function RandomFood(){
        var foodx=Math.round(Math.random()*(h-height)/height);
        var foody=Math.round(Math.random()*(w-height)/height);
    
        var food={
            x: foodx,
            y: foody,
            color:"red",
        }
        return food;
    }
    
    
    function loop(){
        if(play=="false"){
        clearInterval(f);
        clearInterval(t);
        fail.style.display="block";
        return;
        };
        draw();
        update();
    }
    initial();
     var f=setInterval(loop,100);
     function setscore(){
        scoretxt.innerText=score;
        ftxt.innerText=score/10;
        scoret.innerText=score;
        ft.innerText=score/10;
     }
     var t=setInterval(setscore,10);

})

