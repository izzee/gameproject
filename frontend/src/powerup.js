let colorCodes = [0, 1, 2, 3, 4, 5, 6]
let colorWeights = [18, 18, 18, 18, 18, 5, 5]

class Powerup {
  constructor(x, y, size=20){
    this.x = x
    this.y = y
    this.size = size
    this.powerupSpeed = random(1,3)
    this.color = floor(random(7))
  }

  show(){
    if(this.color === 0){
      fill('white')
    }else if(this.color === 1){
      fill('black')
    }else if(this.color === 2){
      fill('brown')
    }else if(this.color === 3){
      fill('purple')
    }else if(this.color === 4){
      fill('orange')
    }else if(this.color === 5){
      fill('pink')
    }else if(this.color === 6){
      fill('grey')
    }
    ellipse(this.x, this.y, this.size, this.size);
  }

  update(){ this.y+=this.powerupSpeed }

  checkCollision(){
    let hit = collideCircleCircle(dude.x, dude.y, dude.size, this.x, this.y, this.size)
    if(hit){
      this.activatePowerup();
    }
    return hit
  }

  randomColor(things, weights) {
    let totalWeight = 0;
    for (let x in weights) {
        totalWeight += x;
    }
    let random = floor(random() * totalWeight);
    for (let i = 0; i < things.length; i++) {
      random -= weights[i];
      if (random < 0) {
          return things[i];
      }
    }
  }

  activatePowerup(){
    if(this.color === 0){
      this.fasterDude()
    } else if (this.color === 1){
      this.timeSlow()
    } else if (this.color === 2){
      this.rainbowDude()
    } else if (this.color === 3){
      this.miniDude()
    } else if (this.color === 4){
      this.fatDude()
    } else if (this.color === 5){
      this.gainLife()
    } else if (this.color === 6){
      this.mysteryBox()
    }
  }

  fasterDude(){
    dude.speed = 9;
    clearTimeout(speedTimeout);
    speedTimeout = setTimeout(function(){ dude.speed = 4 }, 10000);
    dude.updateScore(1);
  }

  timeSlow(){
    timeSlowState = true;
    clearTimeout(timeSlowTimeout);
    timeSlowTimeout = setTimeout(function(){ timeSlowState = false }, 5000);
    dude.updateScore(1);
  }

  gainLife(){
    dude.updateHp(1);
    dude.updateScore(1);
  }

  miniDude(){
    dude.sizeState = 2;
    clearTimeout(sizeStateTimeout);
    sizeStateTimeout = setTimeout(function(){ dude.sizeState = 1 }, 5000);
    dude.updateScore(1);
  }

  fatDude(){
    dude.sizeState = 3;
    clearTimeout(sizeStateTimeout);
    sizeStateTimeout = setTimeout(function(){ dude.sizeState = 1 }, 5000);
    dude.updateScore(1);
  }

  rainbowDude(){
    dude.rainbow = true;
    clearTimeout(rainbowTimeout);
    rainbowTimeout = setTimeout(function(){ dude.rainbow = false }, 10000);
    dude.updateScore(1);
  }

  mysteryBox(){
    this.color = floor(random(6))
    this.activatePowerup();
  }
}