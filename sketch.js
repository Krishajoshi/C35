var ball;
var database;

function setup(){
    database= firebase.database();

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


   //READING VALUES FROM DATABASE

    //1. reference: .ref function => what is the path to read the values the tree structure
     var ballPosition=database.ref('ball/position');
     //2. create a listener to read the values coming from DB: .on function
     
     ballPosition.on("value",readPosition);
}

function readPosition(data)
{
   position=data.val();
   console.log(position);

   ball.x=position.x;
   ball.y=position.y;

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
     //WRITTING TO THE DATABASE
    //create the reference again, without variable

    database.ref('ball/position').set(
    {
        'x':position.x+x,
        'y':position.y+y,
    }

    )
   
}
