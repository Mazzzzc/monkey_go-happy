
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var background1, backgroundImage, invisibleGround;
var score
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backgroundImage = loadImage("jungle.jpg")
 
}



function setup() {
  
  background1=createSprite(300, 300);
  background1.addImage("background",backgroundImage);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
  //ground.VelocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.visible=false;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0;
}


function draw() {
  
  if(keyDown("space")&& monkey.y >= 300) {
    monkey.velocityY = -12;
  }
  
  //background1.velocityX=-5;
 // monkey.velocityX=3;

  camera.position.x=monkey.x;
  
  
   if (background1.x < 0){
      background1.x = background1.width/2;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  food();
  
  obstacles();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100,50);
  
  switch(score){
    case 10: monkey.scale=0.12;
            break;
    case 20: monkey.scale=0.14;
            break;
    case 30: monkey.scale=0.16;
            break;
    case 40: monkey.scale=0.18;
            break;
    default: break;
  }   
  
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    
    score=score+2;          
  }
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
    obstacle.velocityX=0;          
  }
  
  drawSprites();
  
  text("Score: "+ score, 130,80);
}

function food(){
  
  if (frameCount % 80 === 0){
    var banana = createSprite(200,Math.round(random(170,290)),40,40);
    banana.addImage("food",bananaImage);
    
    banana.velocityX=-4;
    
    banana.lifetime=150;
    
    banana.scale=0.1;
    
    foodGroup.add(banana);
  }
}

function obstacles(){
  
  if (frameCount % 300 === 0){
    var obstacle = createSprite(200,330,10,40);
    obstacle.addImage("rock",obstacleImage);
    
    obstacle.velocityX =-4;
    
    obstacle.scale=0.1;
    
    obstacle.lifetime=150; 
    
    obstacleGroup.add(obstacle);
  } 
}






