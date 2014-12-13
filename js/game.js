window.addEventListener("load", function(event) {
	 var x = document.getElementById("x");
     var y = document.getElementById("y");
     var text = document.getElementById("text");
     var status = document.getElementById("status");


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

var biereReady = false;
var biereImage = new Image();
biereImage.onload = function () {
	biereReady = true;
};
biereImage.src = "images/biere.png";

var redReady = false;
var redImage = new Image();
redImage.onload = function () {
	redReady = true;
};
redImage.src = "images/red.png";

var malusReady = false;
var malusImage = new Image();
malusImage.onload = function () {
	malusReady = true;
};
malusImage.src = "images/malus.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var malus = {};
var biere = {};
var score = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));

	if(Math.random() > 0.5) {
		malus.x = 32 + (Math.random() * (canvas.width - 64));
		malus.y = 32 + (Math.random() * (canvas.height - 64));
	}

	if(Math.random() > 0.5) {
		biere.x = 32 + (Math.random() * (canvas.width - 64));
		biere.y = 32 + (Math.random() * (canvas.height - 64));

	}
};

var start = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	if(status.innerHTML == "Connected") {
	hero.y += vitesse * parseFloat(y.value);
	hero.x -= vitesse * parseFloat(x.value);
	}

	if(hero.x > 512-32)
		hero.x = 512 -32;
	if(hero.x < 0)
		hero.x =  0;
	if(hero.y > 480-32)
		hero.y = 480 -32;
	if(hero.y < 0)
		hero.y = 0;

	text.value = hero.x.toString() + " " + hero.y.toString();

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++score;
		hp+=1;
		if(hp>10)
			hp=10;
		reset();
	}
	if (
		hero.x <= (malus.x + 32)
		&& malus.x <= (hero.x + 32)
		&& hero.y <= (malus.y + 32)
		&& malus.y <= (hero.y + 32)
	) {
		hp-=3;
		malus.x =-100;
		malus.y =-100;

	}

	if (
		hero.x <= (biere.x + 32)
		&& biere.x <= (hero.x + 32)
		&& hero.y <= (biere.y + 32)
		&& biere.y <= (hero.y + 32)
	) {
		vitesse +=0.1;
		hero.speed+= 10;
		biere.x =-100;
		biere.y =-100;
	}
};

var vitesse = 0.5;
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (malusReady) {
		ctx.drawImage(malusImage, malus.x, malus.y);
	}

	if (biereReady) {
		ctx.drawImage(biereImage, biere.x, biere.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score , 32, 32);

	ctx.fillStyle="red";
	ctx.fillRect(250,20,hp*15,20);
};


var hp = 10;
var gameOver = false;
function baisseHp() {
	hp -=0.1;
	if(hp <=0) {
		hp="GAME OVER"
		gameOver = true;
	}
	document.getElementById('hp').innerHTML = hp;
}

var time = Date.now();
var time2 = Date.now();

// The main game loop
var main = function () {
	if(gameOver) {
		ctx.font = "30px Helvetica";
		ctx.fillText("GAME OVER", 170, 200);
		return;
	}
		
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;


	time = Date.now();
	if(time - time2 > 100) {
		time2 = Date.now();
		baisseHp();
	}

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
start();
main();


 });