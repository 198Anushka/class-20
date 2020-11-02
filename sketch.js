var monkey,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,j;
var ground, invisibleGround, groundImage;
var PLAY=1;
var END=0;
var gameState=PLAY;


var bannanaGroup, bannanaImage;
var obstacleGroup, obstacleImage;

var score;


function preload(){
  
  bannanaImage = loadImage("banana.png");
  obstacleImage=loadImage("stone.png")
  
  m1 = loadImage("Monkey_01.png");
  m2 = loadImage("Monkey_02.png");
   m3 = loadImage("Monkey_03.png");
   m4 = loadImage("Monkey_04.png");
   m5 = loadImage("Monkey_05.png");
   m6 = loadImage("Monkey_06.png");
   m7 = loadImage("Monkey_07.png");
   m8 = loadImage("Monkey_08.png");
   m9 = loadImage("Monkey_09.png");
   m10 = loadImage("Monkey_10.png");
  
  
  
  j=loadImage("jungle.jpg");
  groundImage=loadImage("ground2.png");
}

function setup() {
  createCanvas(600, 200);
  
 monkey=createSprite(200,200);
    monkey.scale = 0.5;

  var rand = Math.round(random(1,10));
    switch(rand) {
      case 1: monkey.addImage(m1);
              break;
      case 2: monkey.addImage(m2);
              break;
      case 3: monkey.addImage(m3);
              break;
      case 4: monkey.addImage(m4);
              break;
      case 5: monkey.addImage(m5);
              break;
      case 6: monkey.addImage(m6);
              break;
      case 7: monkey.addImage(m7);
              break;
      case 8: monkey.addImage(m8);
              break;
      case 9: monkey.addImage(m9);
              break;
      case 10:monkey.addImage(m10);
             break;
         default: break;
        
    }   


  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bannanaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  jungle=createSprite(600,200)
  jungle.addImage(j);
}

function draw() {
  background(180);
if (gameState===PLAY){
  
  if(keyDown("space")) {
    monkey.velocityY = -10;
    s3.play();
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(invisibleGround); 
  
  spawnBannanas();
  spawnObstacles();
  if (obstacleGroup.isTouching(monkey)){
   gameState=END;
 } 
    }  
 else if(gameState===END){
 ground.velocityX=0;
   monkey.velocityY=0;
   monkey.changeAnimation("c", trex_collided );
   obstacleGroup.setVelocityXEach(0);
   bannanaGroup.setVelocityXEach(0);
      
             
         } 
  
  
  
  
  
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
 
  drawSprites();
}

function spawnBannanas() {
  
  if (frameCount % 60 === 0) {
    var bannana= createSprite(600,120,40,10);
    bannana.y = Math.round(random(80,120));
    bannana.addImage(bannanaImage);
    bannana.scale = 0.5;
    bannana.velocityX = -3;
    
     
    bannana.lifetime = 200;
    
  
    bannana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    bannanaGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
    
           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}