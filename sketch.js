var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover;
var gameoverImage;
var Play=1;
var End=0;
var gameState=1;



function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameoverImage= loadImage("gameOver.png");
  startImage= loadImage("space.png");
  
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameover= createSprite(200,200,20,20);
  gameover.addImage(gameoverImage);
  gameover.scale=0.5;
  
      
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background(0);
   
  edges= createEdgeSprites();
  boy.collide(edges);
             
    if (gameState===Play)
 {
    gameover.visible=false;
   path.velocityY = (4+1*treasureCollection/15);
    boy.x = World.mouseX;
   
   if(path.y > 400 ){
    path.y = height/2;
  }
               
   var rand=Math.round(random(1,4));
  switch(rand)
  {
    case 1:createCash();
       break;
    case 2:createDiamonds();
       break;
    case 3:createJwellery();
       break;
    case 4:createSword();
       break;
       default: break;
   
 }
         
    if (cashG.isTouching(boy)&& gameState===Play) {
      cashG.destroyEach();
      treasureCollection= treasureCollection+10;
    }
    else if (diamondsG.isTouching(boy)&& gameState===Play) {
      diamondsG.destroyEach();
      treasureCollection= treasureCollection+5;
      
    }else if(jwelleryG.isTouching(boy)&& gameState===Play) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection+1;
    }
      
           if(swordGroup.isTouching(boy)) {
          swordGroup.destroyEach();
         gameState=End;               
        }
   
 }
  else if(gameState===End)
 {
    
     path.velocityY=0;
   
   cashG.setVelocityYEach(0);
   diamondsG.setVelocityYEach(0);
  jwelleryG.setVelocityYEach(0);
   swordGroup.setVelocityYEach(0);
        
   cashG.setLifetimeEach(-1);
   diamondsG.setLifetimeEach(-1);
   jwelleryG.setLifetimeEach(-1);
   swordGroup.setLifetimeEach(-1);
   
   gameover.visible=true;
   
    
  }
  
  if(keyDown("Q")&& gameState===End)
  {
    cashG.destroyEach();
   diamondsG.destroyEach();
  jwelleryG.destroyEach();
                      
    treasureCollection=0;
    gameState=Play;
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
                    
}



function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (3+treasureCollection/15);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (3+treasureCollection/15);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (3+treasureCollection/15);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (3+treasureCollection/15);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
 
