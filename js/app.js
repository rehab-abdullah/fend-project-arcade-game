
var liveNum = document.querySelector('#liveNum');
var livenums=1 ;
var gameState =document.querySelector('.Game-state');
var state ='Start Game';
liveNum.innerText = livenums;
gameState.innerText = state;
// Lives our player To increase attempts
var Live = function() {
   
    this.x = Math.floor((Math.random() * 220) + 25);
    this.y =Math.floor((Math.random() * 275) + 25);
    
    this.sprite = 'images/Heart.png';
}
// check for collision plyer with hearts ,
Live.prototype.chickCollied =function(live) {
    if( player.x < this.x +80 && player.x +80 >this.x ){
       if ( player.y < this.y +60 && player.y +60 >  this.y ) 
            
     return true   
    }
    else {
        return false
    }
}
// Update the heart's position,
Live.prototype.update = function(dt) {            
// If the player collided with hearts, add 1 to lives and remove heart
          
        for (var i = 0; i < allLives.length; i++) {
          if (this.chickCollied( allLives[i] )) {
            allLives.splice(i,1);
            livenums =livenums+1;
           
        }
        liveNum.innerText = livenums;
    }
};
Live.generateLives = function() {
    var lives = [];
    for ( var i = 0; i < 2; i++) {
        lives[i] = new Live();
    }
    return lives;
};
// Draw the hrart on the screen, 
Live.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Live.prototype.reset = ()=>{
};

class MyCharacter {
    constructor (x,y){
    this.sprite = null;
    this.x = x;
    this.y = y;   
    }
    update(dt){

    }
    render(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
    }
    chickCollied () {
    if( player.x < this.x +80 && player.x +80 >this.x ){
       if ( player.y < this.y +60 && player.y +60 >  this.y ) 
            
     return true   
    }
    else {
     return false
    }
    }
    reset(){
        
        livenums=1;
        state ='Start Game';
        liveNum.innerText = livenums;
        gameState.innerText = state;
        allLives = Live.generateLives(); 
    }
}
const character = new MyCharacter();

class Enemy extends MyCharacter{
    constructor(x,y,speed){
 // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    super(x,y);
    this.argx=x;
    this.argy=y;
    this.step=101;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
   }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    super.chickCollied();
    this.x = this.x+(this.speed*dt);
    if(this.x>510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 220);
    }
        for (var i = 0; i < allEnemies.length; i++) {
        if (this.chickCollied(allEnemies[i])) {
            // If player collided with enemies, set them back to the start and drop score by 50 points
            player.x = 200;
            player.y = 400;
            livenums --;
            liveNum.innerText = livenums;
            if (livenums ==0) {
                state ='Game Over!';
                gameState.innerText = state;
                var that =this;
                setTimeout(function() {
                alert(`${state}!!`);
                that.reset();
            },500);
        }
    }
    }
   }
   rander(){
    super.render();
   }
   reset(){
    super.reset();
    this.x = this.argx;
    this.y = this.argy;
  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends MyCharacter {
    constructor(x,y){
    super(x,y);
     this.sprite =  'images/char-boy.png';    
    }
    update(dt){
    }
    
    render (){
        super.render();
    }
    handleInput(keyp) {
        if( keyp === 'left' && this.x > 0 ) { 
             this.x -= 100;
        }
        if( keyp === 'right' && this.x < 400){
             this.x += 100;
        }
        if( keyp === 'up' && this.y > 0){
             this.y -= 80;
        }
        if( keyp === 'down' && this.y < 400){
             this.y += 80;
        }
        if(this.y <= 50){
            var that = this;
            state ="End Game";
            gameState.innerText = state;
            setTimeout(function() {
              alert(`you are winner! \n lives=${livenums}`); 
              that.reset();
            },500);     
        }
    }
   reset(){
     super.reset();
     this.x = 200;
     this.y = 400;
   }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemies = [60,140,230];
enemies.forEach( (locationY) =>{
    var enemy = new Enemy(0 , locationY , 200);
    allEnemies.push(enemy);
});
let allLives = Live.generateLives();
var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});