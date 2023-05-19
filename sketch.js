var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;



var gameState = "início"

var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  //Faça o mesmo com o 'heart2Img' e 'heart3Img'
//???
//???
  heart2Img = loadImage("assets/heart_2.png")
    heart3Img = loadImage("assets/heart_3.png")
//Utilize o código que carrega uma imagem
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")
//Utilize o código que carrega um som
  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

}

function setup() {
createCanvas(windowWidth,windowHeight)
  

  //Crie um sprite
  bg = createSprite(displayWidth/2-40,displayHeight/2-40,20,20)
  //Esse sprite guardará sua imagem de fundo, utilize 'addImage' para adicionar uma imagem
bg.addImage(bgImg)
//Defina o tamanho da imagem de fundo para 1.1
///???   
bg.scale=1.1
//crie o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
//Adicione a imagem do jogador
 player.addImage(shooterImg)
 //Defina o tamanho do jogador para 0.3
   ///???
   player.scale=0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
heart1=createSprite(displayWidth-150,40,20,20)
heart1.visible=false
heart1.addImage("heart1",heart1Img)
heart1.scale=0.4

heart2=createSprite(displayWidth-100,40,20,20)
heart2.visible=false
heart2.addImage("heart1",heart2Img)
heart2.scale=0.4


heart3=createSprite(displayWidth-150,40,20,20)
heart3.visible=false
heart3.addImage("heart1",heart3Img)
bulletsGroup=new Group()
zombieGroup=new Group()
heart3.scale=0.4
}
function draw(){
background(0)
if(gameState==="início"){

  if(life===3){
heart3.visible=true
heart2.visible=false
heart1.visible=false
  }
  if(life===2){
    heart2.visible=true
    heart3.visible=false
    heart1.visible=false
      }
      if(life===1){
        heart1.visible=true
        heart2.visible=false
        heart3.visible=false
          }
          if(life===0){
            gameState="fim"
          }
          if(score===15){
            gameState="conquista"
          }
          if(keyDown("up_arrow")){
          player.y=player.y-20

          }
          if(keyDown("down_arrow")){
            player.y=player.y+20
  
            } 
            if(keyDown("space")){
              
            bala=createSprite(displayWidth-1150,player.y-30,10,5)
            bala.velocityX=20
            bulletsGroup.add(bala)
            player.depth=bala.depth
            bullets=bullets-1
            player.addImage(shooter_shooting)
            explosionSound.play()


              }
              else if(keyWentUp("space")){
            player.addImage(shooterImg)


              }
              if(bullets==0){
              
                gameState="fim"
                lose.play()
              }
              if(bulletsGroup.isTouching(zombieGroup)){

                for(var i=0;i<zombieGroup.length;i++){
                  if(zombieGroup[i].isTouching(bulletsGroup)){
                    zombieGroup[i].destroy()
                    bulletsGroup[i].destroy()
                    lose.play()
                    score=score+1

                  }
                }
              
              }
              if(zombieGroup.isTouching(player)){
              lose.play()
              for (var i=0;i<zombieGroup.length;i++){
                if(zombieGroup[i].isTouching(player)){

                  zombieGroup[i].destroy()
                  life=life-1
                }

              }
}
zombie1()
}
drawSprites()
textSize(20)
fill("black")
text("balas="+bullets,displayWidth-210,displayHeight/2-250)
text("pontuação="+score,displayWidth-200,displayHeight/2-220)
text("vidas="+life,displayWidth-200,displayHeight/2-280)
if(gameState==="fim"){
textSize(100)
fill("red")
text("game over",400,400)
player.destroy();
zombieGroup.destroyEach()
}
if(gameState==="conquista"){
  textSize(100)
  fill("red")
  text("você ganhou",400,400)
  player.destroy();
  zombieGroup.destroyEach()
  }
}
  function zombie1(){
if(frameCount%50===0){
zombie=createSprite(random(500,1100),random(100,500),40,40)
zombie.addImage(zombieImg)
zombie.scale=0.15
zombie.velocityX=-6
zombie.setCollider("rectangle",0,0,400,400)
zombie.lifetime=400
zombieGroup.add(zombie)



  }

}