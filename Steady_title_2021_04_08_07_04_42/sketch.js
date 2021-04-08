var car,carImg;
var groundImage;
var ground;
var obstace,obstacleImg,obstacleGroup;
var fuel,fuelImg,fuelGroup;
var Fuel;
var gameOver,gameOverImg;


function preload(){
 carImg=loadImage("car.jpg");
  obstacleImg=loadImage("stone.JPG");
  fuelImg=loadImage("fuel.JPG");
  gameOverImg=loadImage("gameover.png")
  
} 
function setup(){
  createCanvas(600,200);
  
  
  gameOver=createSprite(300,100,20,100);
  gameOver.addImage(gameOverImg);
gameOver.visible=false;
  
  // creating car
  car= createSprite(50,160,20,50);
  car.addImage(carImg);
  
  
  //adding scale and position to car
  car.scale = 0.5;
  car.x = 50
  //creating ground
  ground=createSprite(300,200,1200,10);
  ground.velocityX=-10;

  Fuel=25;
  
   
  
  fuelGroup= new Group();
  obstacleGroup= new Group();
  
  
}



function draw(){
  //set background color 
  background("white");
   text("Fuel: "+ Fuel, 500,50);
  
  //logging the y position of the trex
  console.log(ground.x)
  
  //jump when space key is pressed
  
 //jump when the space key is pressed
    if(keyDown("space")&& car.y >= 161) {
        car.velocityY = -10;
     
    }
  
  car.velocityY = car.velocityY + 0.5;
  
 if(ground.x<200){
 ground.x=ground.width/2;  
 }
  //stop car from falling down
  car.collide(ground); 
  //spawning obstacles
  obstacles();
  //spawning fuel
  fuel();
 
  ground.velocityX = -(4 + 3* Fuel/50)
  
  
  if(frameCount% 25 === 0){
    Fuel=Fuel-1;
  }

  if(car.isTouching(fuelGroup)){
    Fuel=Fuel+5;
    fuelGroup.destroyEach();
  }
  if(car.isTouching(obstacleGroup)){
car.destroy();
  obstacleGroup.destroyEach();
  fuelGroup.destroyEach();
    gameOver.visible=true;
  
  }
  drawSprites();
}
function obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,180,10,10);
   obstacle.velocityX =-3;
   obstacle.addImage(obstacleImg);

    
    
    //adding liftime to prevent from memory leakage
  obstacle.lifetime = 300;
    obstacle.scale=0.1;
   obstacleGroup.add(obstacle);
  }
}
function fuel(){
if (frameCount % 200 === 0) {
    var fuel = createSprite(600,120,10,10);
    fuel.y = Math.round(random(50,200));
    fuel.addImage(fuelImg);
    fuel.scale = 0.1;
    fuel.velocityX = -3;
    
    //adding liftime to prevent from memory leakage
  fuel.lifetime=200;
fuelGroup.add(fuel);

}}