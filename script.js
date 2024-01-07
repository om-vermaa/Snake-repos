//variables
let InitialDirection={x:0,y:0};
const GameMusic=new Audio('bgm.mp3')
const EatMusic=new Audio('eating.mp3')
const GameOver=new Audio('gameover.mp3')
const MoveMusic=new Audio('moving.mp3')
let LastPaintTime=0;
let speed=12;
let score=0;
let snakeArr=[
    {x:14,y:14}
]
let food={x:13,y:15};




//functions of game
function main(ctime){
window.requestAnimationFrame(main)

// console.log(ctime);
if((ctime-LastPaintTime)/1000 < 1/speed){
    return;
}
LastPaintTime=ctime;
gameEngine();

}


function isCollide(snake){
     for(let i=1;i<snakeArr.length;i++)
     {
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y)
        {
          
            return true;
        }
       
     }
     if(snake[0].x>=28 || snake[0].x<=0 || snake[0].y>=28 || snake[0].y<=0 )
     {
        
         return true;
     }
}

function gameEngine(){
    //updating the position of snake and food after game over
    if(isCollide(snakeArr)){
        GameOver.play();
        GameMusic.pause();
         
        InitialDirection={x:0,y:0}
        alert("Game Over \nPress any key to restart the game");

        snakeArr=[{x:14,y:14}];
            
        
        GameMusic.play();
        score=0;
    }
        

        //updating the position of snake and food after the snake has eaten the food
        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
        
        {
            
            score += 1;
            scoreBox.innerHTML="Score:  " + score;
            EatMusic.play();
        snakeArr.unshift({x:snakeArr[0].x+InitialDirection.x, y:snakeArr[0].y + InitialDirection.y});
            let a=2;
            let b=26;
            food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random()) }
        }

    

    //updating the position of snake while moving
    for(let i=snakeArr.length -2 ; i>=0 ; i--)
    {
     
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += InitialDirection.x;
    snakeArr[0].y += InitialDirection.y;



    //position of snake
    board.innerHTML=" ";
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
        snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
        
    });
    //position of food
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
        


}


//main logic 
window.requestAnimationFrame(main);


window.addEventListener('keydown',e=>{
    InitialDirection={x:0,y:1}
    MoveMusic.play();
     GameMusic.play();
    switch(e.key){
        case "ArrowUp":
            
            InitialDirection.x=0;
            InitialDirection.y=-1;
            break;

        case "ArrowDown":
            
            InitialDirection.x=0;
            InitialDirection.y=1;
            break;

         case "ArrowRight":
            
            InitialDirection.x=1;
            InitialDirection.y=0;
            break;

         case "ArrowLeft":
            
            InitialDirection.x=-1;
            InitialDirection.y=0;
            break;
    }

})

