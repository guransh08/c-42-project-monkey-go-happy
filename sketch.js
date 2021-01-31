// assigning variables:
var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg=loadImage("back.jpg")
 
}



function setup() {
  canvasX = displayWidth ;
  canvasY = displayHeight-200 ;
  createCanvas(canvasX, canvasY);
  
  
  // creating sprites and giving animations or images:
  // monkey:
  monkey=createSprite(100,400,10,10);
  monkey.addAnimation("monkey running ",monkey_running);
  monkey.scale=0.1;
  monkey.velocityX=monkey.velocityX+0.3;
 
 
  ground = createSprite(canvasX,670, displayWidth+1300, 10);
  ground.x = ground.width /5;
  ground.velocityX = -5
  ground.x = ground.width /5;
  ground.visibile=false;
  
  //ground.x=ground.width/2;
  //console.log(ground.x);

  monkey.debug=false;
 //monkey.setCollider("circle",100,10,40)
  
  // creating groups:
  obstaclesGroup=createGroup();
  bananaGroup=createGroup();
  
}


function draw() {
  background(backgroundImg);
  
  // jumping monkey when space is pressed:
  if(keyDown("space") && monkey.y>=390){
    monkey.velocityY=-18;
    
  }
  // adding gravity to the monkey:
  monkey.velocityY=monkey.velocityY+0.8;
  
  camera.position.x=monkey.x

  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2
    monkey.scale+=0.05;
  }
  
  
  // holding monkey to the ground:
  monkey.collide(ground);
  
  obstacles();
  food();
  drawSprites();
  
  var survivalTime=0;
  stroke("black");
  textSize(20);
  fill("black")
  text("Score:"+score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil (frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50);
  
  if (ground.x < 10)
  {
   
    ground.x = ground.width/2;      
  }
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }if(gameState===END){
   obstaclesGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
   monkey.velocityX=0;
   monkey.scale=0.1;
   score=0;
   textSize(20);
   fill("black")
   text("Try Again! Refresh The Page",displayWidth/4,displayHeight/4)
  }
}

function food(){
// adding code for monkey's bananas:
if(World.frameCount%80 ===0){
   //generate random bananas:
    var rand = Math.round(random(120,200));
   console.log(rand);
  
  banana = createSprite(displayWidth,200,10,10);
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-10;
  banana.lifetime=460;
  
  banana.y=Math.round(random(600,400));
  bananaGroup.add(banana);
  
}


  
}

function obstacles(){
  
  if(World.frameCount%200===0){
 //   var rand=Math.round(random(300,500));
    obstacle=createSprite(displayWidth,645,10,10);
    obstacle.addImage("obstacles",obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX = -10;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle)
  }
}






