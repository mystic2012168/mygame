var PLAY = 1;
var END = 0;
var gameState = PLAY


var ground, invisibleGround, groundImage

var cloudsGroup, cloudImage;
var obstacle1,obstacle2,obstacle3
var boy
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  
 
  groundImage = loadAnimation("ground2.png");
  desertImg = loadAnimation("desert/desert.jpg")
  snowImg = loadAnimation("snow/snowybackground.jpg")
  spaceImg = loadAnimation("space/space.jpg")

 
  elfImage = loadAnimation("snow/elf.gif")
  jeepImage = loadAnimation("desert/jeep.gif")
  astronautImage = loadAnimation("space/astronaut.gif")
  
  cloudImage = loadImage("cloud.png");
  //obstacles image load
  cactus = loadImage("desert/cactus.png");
  camel  = loadImage("desert/camel.png");
  vulture = loadImage("desert/vulture.png");
  xmasTree = loadImage("snow/Christmastree.png");
  moose = loadImage("snow/moose.png");
  snowball = loadImage("snow/snowball.png");
  meteor = loadImage("space/meteor.png")
  rocket = loadImage("space/rocket.png")
  ufo = loadImage('space/ufo.png')
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);``
  
  boy= createSprite(50,160,20,50);
  boy.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  boy.setCollider("rectangle",0,0,boy.width,boy.height);
 
  
  score = 0;
  
}

function draw() {
  
  background(snowImg);

  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)

    score = score + Math.round(getFrameRate()/60)
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    snow();
    gameState = SNOW
    boy.velocityY = boy.velocityY + 0.8
    if (score===2000){
      desert()
      background(desertImg)
    }
    if(score===6000){
      space()
      background(spaceImg)
    }
    spawnClouds();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(boy)){
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      ground.velocityX = 0;
      boy.velocityY = 0
      
      
     
      
    //obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
     
     //obstaclesGroup.setVelocityXEach(0);
     //cloudsGroup.setVelocityXEach(0);
     
     if(mousePressedOver(restart)) {
      reset();
    }

   }
  
 
  
  boy.collide(invisibleGround);
  
  

  drawSprites();
}

function reset(){
  gameState=PLAY
  gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle1);
              break;
      case 5: obstacle.addImage(obstacle2);
              break;
      case 6: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 200;
    
    
    cloud.depth = box.depth;
    boy.depth = box.depth + 1;
    
  
    cloudsGroup.add(cloud);
  }
}

function snow(){
  if (gameState === SNOW){
    //background.addImage(snowImg)
    boy.changeAnimation(elfImage)
    obstacle1.addImage(snowball)
    obstacle2.addImage(moose)
    obstacle3.addImage(xmasTree)
    //if(score==2000){
      //gameState=DESERT
    
  }
}
function desert(){ 
  if (gameState === DESERT){
 // background.addImage(desertImg)
  boy.changeAnimation(jeepImage)
  obstacle1.addImage(cactus)
  obstacle2.addImage(vulture)
  obstacle3.addImage(camel)
  if(score==5000){
    gameState=SPACE
  }
}}
 function space ()
 { if (gameState === SPACE){
  //background.addImage(spaceImg)
  boy.changeAnimation(astronautImage)
  obstacle1.addImage(rocket)
  obstacle2.addImage(meteor)
  obstacle3.addImage(ufo)
  if(score==8000){
    gameState=END
  }
}} 