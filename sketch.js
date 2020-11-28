var tower,towerImage;
var ghost,ghostImage,ghostImage1;
var gameState="play";

var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invisibleBlock,invisibelBlockGroup;

var spookySound; 






function preload(){
towerImage=loadImage("tower.png");
ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png");
ghostImage1=loadAnimation("ghost-standing.png");
spookySound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600)

tower=createSprite(300,600,100,100);
tower.addImage("tower",towerImage);
tower.velocityY=5;
//tower.y= tower.height/2;

ghost=createSprite(300,300);
ghost.addAnimation("ghost",ghostImage);
ghost.scale=0.4; 

doorGroup=createGroup();
climberGroup=createGroup();
invisibelBlockGroup=createGroup();

spookySound.loop();

}

function draw (){
background('black');
if(gameState==="play"){
    
    if(tower.y>350){
        tower.y=300/2;
    
    }
    
    if(keyDown("space")){
        ghost.velocityY=-5;
        ghost.addAnimation("jumping",ghostImage);
    }
    ghost.velocityY=ghost.velocityY+0.5;
    
    
    if(keyDown("left")){
        ghost.x=ghost.x-10;
    }
    
    if(keyDown("right")){
        ghost.x=ghost.x+10;
    }
    
  if(ghost.y>600 || invisibelBlockGroup.isTouching(ghost) ){
      gameState="end"
      ghost.destroy();

  }  

if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    ghost.addAnimation("standing",ghostImage1);
}

  spawnDoors();


    
    
    
    
    drawSprites();
    
}

else 
if(gameState==="end"){
    textSize(30);
    fill("yellow");
    text("GAME OVER",270,300);



}

}

function spawnDoors(){
    if(frameCount% 240===0){
door=createSprite(200,-50);
door.addImage("door",doorImage);
door.velocityY=1;
door.lifetime=600;
door.x=Math.round(random(100,450));
doorGroup.add(door);

climber=createSprite(200,15);
climber.x=door.x;
climber.velocityY=1;
climber.lifetime=600;
climber.addImage("climber",climberImage);
climberGroup.add(climber);


invisibleBlock=createSprite(200,15);
invisibleBlock.width=climber.width;
invisibleBlock.height=2;
invisibleBlock.x=door.x;
invisibleBlock.velocityY=1;
invisibleBlock.lifetime=600;
invisibleBlock.debug=true;
invisibelBlockGroup.add(invisibleBlock);
//invisibleBlock.visible=false;

ghost.depth=door.depth;
ghost.depth=ghost.depth+1;




    }
    
}