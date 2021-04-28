var knife, fruits, fruitGroup, monsterGroup, monster
var knifeImg, fruit1, fruit2, fruit3, fruit4, monsterImg, gameOverImg
var knife, gameover
var score = 0

var PLAY = 1
var END = 0

var gameState = 1

function preload() {
  knifeImg = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterAnimation = loadAnimation("alien1.png", "alien2.png");
  gameOverImg = loadImage("gameover.png")
  overSound = loadSound("oversound.mp3")
  knifeSound = loadSound("knife.mp3")
}

function setup() {
  createCanvas(400, 400)
  knife = createSprite(200, 200)
  knife.addImage(knifeImg)
  knife.scale = 0.7

  fruitGroup = createGroup();
  monsterGroup = createGroup();

}

function draw() {
  background("lightblue")
  knife.y = World.mouseY;
  text("Score: ", 300, 50)
  text(score, 340, 50)
  if (gameState === END) {
    fruitGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    monsterGroup.destroyEach();

    monsterGroup.setVelocityXEach(0);
    knife.addImage(gameOverImg)
    knife.scale = 1;
    knife.x = 200;
    knife.y = 200;
  }

  if (gameState === PLAY) {

    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach()
      knifeSound.play();
      score = score + 2;

    }
    if (monsterGroup.isTouching(knife)) {
      monsterGroup.destroyEach();
      overSound.play();
      gameState = END;

    }
    if (gameState === END) {
      fruitGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      monsterGroup.destroyEach();

      monsterGroup.setVelocityXEach(0);
      knife.addImage(gameOverImg);
      knife.scale = 1;
      knife.x = 200;
      knife.y = 200;
    }

    spawnMonsters()
    spawnfruits();
    knife.y = World.mouseY;
    knife.x = World.mouseX;
  }
  drawSprites()

}

function spawnfruits() {
  if (frameCount % 60 === 0) {
    fruit = createSprite(10, 200, 10, 10)
    fruit.velocityX = 3;
    fruit.velocityX=(8+(score/4))
    fruit.y = Math.round(random(1, 350))
    fruit.lifetime = 100;
    fruit.depth = knife.depth;
    knife.depth = knife.depth + 1;
    var num = Math.round(random(1, 4))
    fruit.scale = 0.2
    switch (num) {
      case 1:
        fruit.addImage(fruit1);
        break
      case 2:
        fruit.addImage(fruit2);
        break
      case 3:
        fruit.addImage(fruit3);
        break
      case 4:
        fruit.addImage(fruit4);
        break;
      default:
        fruit.addImage(fruit3);
        break;
    }
    fruitGroup.add(fruit);
  }
}

function spawnMonsters() {
  if (frameCount % 75 === 0) {
    monster = createSprite(50, 200)
    monster.velocityX = 8;
    monster.velocityX = (8 + (score / 10))
    monster.addAnimation("ghosts", monsterAnimation)
    monster.y = Math.round(random(50, 350))
    monster.depth = knife.depth
    knife.depth = knife.depth + 1
    monsterGroup.add(monster)
  }
}