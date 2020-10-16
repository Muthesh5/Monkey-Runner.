var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;
var monkey,monkey_running;
var obstacleGroup,obstacleImage;
var bananaGroup,bananaImage;
var score;
var score2;

function preload(){
  
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png")
}

function setup(){
  createCanvas(500,300);
  
  ground=createSprite(250,270,1000,10);
  ground.velocityX = -4;
  
  monkey=createSprite(30,240,20,20);
  monkey.addAnimation("monkey",monkey_running)
  monkey.scale = 0.1;
  
  obstacleGroup= new Group();
  bananaGroup = new Group(); 
  
  score = 0
  score2 = 0
}

function draw(){
  background("lightgreen")
  textSize (20)
  stroke("white")
  text("Survival Time :"+score,20,50);
  text("Score :"+score2,300,50)
  
  if(gameState===PLAY){
  
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
    console .log (gameState)

    monkey.collide(ground);

    if(keyDown("space") && monkey.y >= 231){
      monkey.velocityY = -8
    }

    monkey.velocityY = monkey.velocityY+0.4

    obstacles();
    
    bananas();
    
    score = score + Math.round(getFrameRate()/60);
    
    if(monkey.isTouching(bananaGroup)){
      score2 = score2 + 1;
      bananaGroup.destroyEach();
    }

    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    if(keyDown("r") && gameState === END){
      reset();
    }
    
  }
  
  drawSprites();
}
  function obstacles(){
      if(frameCount % 100 === 0) {
      var obstacle = createSprite(600,247,10,40);
      obstacle.velocityX = -(5+score/200);  
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1
      obstacle.lifetime = 125;
      obstacleGroup.add(obstacle);
    }
}
function bananas(){
      if(frameCount % 100 === 0) {
      var banana = createSprite(600,Math.round(random(160,180)),10,40);
      banana.velocityX = -(5+score/200);  
      banana.addImage(bananaImage);
      banana.scale = 0.1
      banana.lifetime = 125;
      bananaGroup.add(banana);
    }
}
function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score = 0
  score2 = 0
}