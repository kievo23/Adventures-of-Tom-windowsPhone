var stage;
var ground;
var preload;
var minu;
var w,h,groundshape;
var tom,slayer,cake,girl;
var level,progres;
var score = 0;
var health = 100;
var caught = 0;
var slayeg = 0;
var scored;
var healthConst,birdtweenConst, tomTweenConst,message,message2,message3,mycancel,myplay,myfailure,myrefresh,mysuccess;
var message4,message5,message6,mycancel2,popup;

function init() {
	//Hide the preview
	document.getElementById("preview").style.display = "none";
	alert("wewe");
	stage = new createjs.Stage("canvasd");
	preload = new createjs.LoadQueue(true);	
	var manifest = [
		{src: "img/ground_inscene.png",id: "ground"},
		{src: "img/background.png",id: "back"},
		{src: "img/scottpilgrim_multiple.png", id : "tom"},
		{src: "img/ghost.png", id: "ghost"},
		{src: "img/bird.png", id: "girl"},
		{src: "img/foods/cake_strawberry.png", id: "cake"},
		{src: "img/progress/health.png", id : "health"},
		{src: "img/progress/trophy.png", id: "trophy"},
		{src: "img/progress/dollar.png", id: "score"},

		{src: "img/next/play.png", id : "play"},
		{src: "img/next/cancel.png", id: "exit"},
		{src: "img/next/refresh.png", id: "refresh"},
		{src: "img/next/failure.jpg", id: "failure"},
		{src: "img/next/success.jpg", id: "success"},
	];
	//preload.addEventListener('fileload', handleFileLoad);
	preload.addEventListener("complete", handleComplete);
	//preload.loadFile("img/ground_inscene.png");
	preload.loadManifest(manifest);
	h = stage.canvas.height;
	w = stage.canvas.width;
	//console.log(localStorage);
}

function handleComplete(event) {

	var c = preload.getResult("cake");
	cake = new createjs.Bitmap(c);
	cake.x = 600;
	cake.y = 72;

	var progressive = new createjs.Text("Level : ", "20px Arial", "#F3FFEA");
	progressive.x = 200;
	progressive.y = 10;

	var healthimg = preload.getResult("health");
	var healthImg = new createjs.Bitmap(healthimg);
	healthImg.x = 10;
	healthImg.y = 10;

	var scoreimg = preload.getResult("score");
	var scoreImg = new createjs.Bitmap(scoreimg);
	scoreImg.x = 350;
	scoreImg.y = 10;

	healthd = new createjs.Text(health, "20px Arial", "#F3FFEA");
	healthd.x = 40;
	healthd.y = 10;

	//READ FROM LOCAL STORAGE THE LEVEL CONSTANTS
	if(typeof localStorage.getItem('level') === 'undefined' || typeof localStorage.getItem('level') === null){
		var lvl = 1;
	}else{
		var lvl = localStorage.getItem('level');
	}

	if(typeof localStorage.getItem('birdtweenConst') === 'undefined'||typeof localStorage.getItem('birdtweenConst') === null){
		birdtweenConst = 1500;
	}else{
		birdtweenConst = parseInt(localStorage.getItem('birdtweenConst'));
	}

	if(typeof localStorage.getItem('score') === 'undefined'||typeof localStorage.getItem('score') === null){
		score = 0;
	}else{
		score = parseInt(localStorage.getItem('score'));
	}

	level = new createjs.Text(lvl, "20px Arial bold", "#F3FFEA");
	level.x = 260;
	level.y = 10;
	
	var bg = preload.getResult("back");
	var myGround = new createjs.Bitmap(bg);
	stage.addChild(myGround);

	var ground 	= preload.getResult("ground");
	groundshape 	= new createjs.Shape();

	var g 		= groundshape.graphics;
	g.beginBitmapFill(ground,'repeat-x');
	g.setStrokeStyle(1).beginStroke(createjs.Graphics.getRGB(0,0,0));
	g.drawRect(0,0,w+ground.width,ground.height);

	groundshape.tileW = ground.width;
	groundshape.y 	= h - ground.height;

	groundshape.x 	= 0;
	groundshape.y 	= 280;
	stage.addChild(groundshape);

	//moving circle
	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;

	//Sprites for slayer Ghost
	slayer = preload.getResult("ghost");
        var data = {
		images: [slayer],
		frames: {width:32, height:48, regX: 40, regY:0,spacing:0, margin:0},
		animations: {
			run: {
			    frames: [0,1,2,3,4,5,6,7,8,9,10,11],
			    speed: 0.2
			},
		}
	    };
	    var spriteSheet = new createjs.SpriteSheet(data);
	    slayer = new createjs.Sprite(spriteSheet, "run");

	    slayer.x = 500;
	    slayer.y = 232;
	//bird spritesheet
	girl = preload.getResult("girl");
        var data = {
		images: [girl],
		frames: {width:64, height:64, regX: 40, regY:0,spacing:0, margin:0, count: 16},
		animations: {
			run: {
			    frames: [4,5,6,7],
			    speed: 0.2
			},
		}
	    };
	    var spriteSheet = new createjs.SpriteSheet(data);
	    girl = new createjs.Sprite(spriteSheet, "run");

	    girl.x = 300;
	    girl.y = 200;

	//Sprites for character.
	    tom = preload.getResult("tom");
	    var data = {
		images: [tom],
		frames: {width:108, height:140, regX: 60, regY:0,spacing:0, margin:0,count:12},
		animations: {
			run: {
			    frames: [0,1,2,3,4,5,6,7],
			    speed: 0.2
			},
		}
	    };
	var spriteSheet = new createjs.SpriteSheet(data);
	tom = new createjs.Sprite(spriteSheet, "run");
	    
	tom.x = 130;
	tom.y = 152;
	tom.onMouseOut = function () {
		//console.log('out');
		target.alpha = 0.5;
	};

	//Text in the game
	stage.addChild(circle,cake,tom,slayer,progres,progressive,scoreImg,healthImg,healthd,level,girl);

	//The sweet Tween
	createjs.Tween.get(girl, { loop: true })
  	//.to({ x: 310 }, parseInt(localStorage.getItem('birdtweenConst')),createjs.Ease.getPowInOut(1))
	.to({ x: 320 }, 2500,createjs.Ease.getPowInOut(1))
	.to({ x: 240 }, 1500,createjs.Ease.getPowInOut(2))
	.to({ x: 290 }, 4500,createjs.Ease.getPowInOut(2));

	//Tween Tom
	createjs.Tween.get(tom, { loop: true })
  	.to({ x: 160 }, 3000,createjs.Ease.getPowInOut(1))
	.to({ x: 120 }, 1000,createjs.Ease.getPowInOut(2))
	.to({ x: 130 }, 1500,createjs.Ease.getPowInOut(2));

	//Tween cake
	createjs.Tween.get(cake, { loop: true })
  	.to({ x: Math.floor(Math.random()) }, 1500,createjs.Ease.getPowInOut(2));
	
	//Tween Slayer
	createjs.Tween.get(slayer, { loop: true })
  	.to({ x: Math.floor(Math.random()) }, 2000,createjs.Ease.getPowInOut(2));

	//Events Listeners 
	stage.on("click", function(event) {
	     createjs.Tween.get(tom, { loop: false })
	  	.to({ y: 100 }, 100, 0)
		.to({ y: 50 }, 150, 0)
		.to({ y: 100 }, 200, 0)
		.to({ y: 152 }, 200, createjs.Ease.getPowInOut(2));
	 });		
	/*
	circle.addEventListener("click", function(event) { 
		createjs.Tween.get(circle, { loop: false })
	  	.to({ x: 500 }, 2000, 0)
		.to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
 	});
*/
	//score
	scored = new createjs.Text(score, "20px Arial bold", "#F3FFEA");
	scored.x = 380;
	scored.y = 10;
	
	stage.addChild(scored);

	var success = preload.getResult("success");
	mysuccess = new createjs.Bitmap(success);
	mysuccess.x = 85;
	mysuccess.y = 10;

	var cancel = preload.getResult("exit");
	mycancel = new createjs.Bitmap(cancel);
	mycancel.x =260;
	mycancel.y = 180;

	var failure = preload.getResult("failure");
	myfailure = new createjs.Bitmap(failure);
	myfailure.x = 70;
	myfailure.y = 10;

	var cancel = preload.getResult("exit");
	mycancel = new createjs.Bitmap(cancel);
	mycancel.x =260;
	mycancel.y = 190;

	var refresh = preload.getResult("refresh");
	myrefresh = new createjs.Bitmap(refresh);
	myrefresh.x =90;
	myrefresh.y = 190;

	var play = preload.getResult("play");
	myplay = new createjs.Bitmap(play);
	myplay.x =90;
	myplay.y = 180;	

	healthConst = fetchdeduct();

	//EVENTS
	myplay.addEventListener("click", function(event) {
		stage.removeChild(message,message2,message3,mycancel,mysuccess,myplay);
		createjs.Ticker.paused = false;
		health = 100;
		stage.update();
 	});

	myrefresh.addEventListener("click", function(event) {
		stage.removeChild(popup);
		stage.addChild(tom,slayer,cake);
		health = 100;
		createjs.Ticker.paused = false;
		stage.update();
 	});

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",tick);
	createjs.Ticker.addEventListener("tick", stage);
}
function tick(event){
	
	if (!createjs.Ticker.paused) {
		var deltaS = event.delta / 1000;
		groundshape.x = (groundshape.x - deltaS * 150) % groundshape.tileW;

		//Tom and Bird
		var intersection = ndgmr.checkRectCollision(tom,girl);
		if(intersection != null){
			caught = caught + 1;
			//parseInt(localStorage.getItem('healthDeduct'))
			if(caught > 7 && health > 20){			
				//console.log("Congratulations!! You Caught the Bird");
							
				message = new createjs.Text("YOU WON!!", "28px Arial bold", "#FBFBFB");
				message.x = 160;
				message.y = 20;
				stage.addChild(message);

				message2 = new createjs.Text("Cate 'Thanks bae. I love you so much!!'", "16px Arial bold", "#FBFBFB");
				message2.x = 110;
				message2.y = 60;
				stage.addChild(message2);

				message3 = new createjs.Text("NEXT LEVEL", "28px Arial bold", "#FBFBFB");
				message3.x = 140;
				message3.y = 120;
				stage.addChild(message3);
				
				stage.addChild(mysuccess,mycancel,myplay);
				
				nextStage();
				createjs.Ticker.paused = true;
			}
		}else{
			caught=0;
		}

		//Tom and Cake
		var intersection = ndgmr.checkRectCollision(tom,cake);
		if(intersection != null){
			score = (score + 0.03125);
			//console.log(score);
			stage.removeChild(scored);
			scored = new createjs.Text(score, "20px Arial bold", "#F3FFEA");
			scored.x = 380;
			scored.y = 10;
			stage.addChild(scored);

			//Tom ate a cake. Increase life
			if(health <= 999){
				health = (health + 1);
				stage.removeChild(healthd);
				healthd = new createjs.Text(health, "20px Arial bold", "#F3FFEA");
				healthd.x = 40;
				healthd.y = 10;
				stage.addChild(healthd);
			}
		}
	}
	//tom and slayer
	var intersection = ndgmr.checkRectCollision(tom,slayer);
	if(intersection != null){
		//Reduce life from tom
		slayeg = slayeg + 1;
		if(slayeg >= 10){
			//console.log(slayeg+"tom collided with slayer!!");
			if(health >=0){
				health = (health - 5);
				stage.removeChild(healthd);
				healthd = new createjs.Text(health, "20px Arial bold", "#F3FFEA");
				healthd.x = 40;
				healthd.y = 10;
				stage.addChild(healthd);
			}else{
				popup = new createjs.Container();				
				message4 = new createjs.Text("YOU LOST", "36px Arial bold", "#292828");
				message4.x = 150;
				message4.y = 20;
				popup.addChild(myfailure, mycancel, myrefresh, message4);
				message5 = new createjs.Text("Cate 'But... Tom I wanted the twittar bird'", "16px Arial bold", "#292828");			message5.x = 100;
				message5.y = 60;
				popup.addChild(message5);

				message6 = new createjs.Text("TRY AGAIN", "36px Arial bold", "#292828");
				message6.x = 140;
				message6.y = 120;
				popup.addChild(message6);

				stage.addChild(popup);	
				stage.removeChild(tom,slayer,cake);			
				
				createjs.Ticker.paused = true;
				stage.clear();
			}
		}
		
	}else{
		slayeg = 0;
	}

	//Events
}
//Function to set the next level parameters
function nextStage(){
	if(typeof localStorage.getItem('level') === 'undefined' || typeof localStorage.getItem('level') === null){
		var lvl = 2;
	}else{
		var lvl = parseInt(localStorage.getItem('level')) + 1;
	}
	localStorage.setItem('level',lvl);
	level = localStorage.getItem('level');

	//Health to Deduct
	if(typeof localStorage.getItem('healthDeduct') === 'undefined' || typeof localStorage.getItem('healthDeduct') === null){
		localStorage.setItem('healthDeduct',2);
	}else{
		var lvl = parseInt(localStorage.getItem('healthDeduct')) + 5;
		localStorage.setItem('healthDeduct',lvl);
	}

	if(typeof localStorage.getItem('birdtweenConst') === 'undefined'||typeof localStorage.getItem('birdtweenConst') === null){
		localStorage.setItem('birdtweenConst',1510);
	}else{
		var lvl = parseInt(localStorage.getItem('birdtweenConst')) + 10;
		localStorage.setItem('birdtweenConst',lvl);
	}

	var lvl = parseInt(localStorage.getItem('score')) + parseInt(score);
	stage.update();
}

function fetchdeduct(){
	if(typeof localStorage.getItem('healthDeduct') === 'undefined' || typeof localStorage.getItem('healthDeduct') === null){
		var lvl = 1;
	}else{
		var lvl = parseInt(localStorage.getItem('healthDeduct'));
	}
	return lvl;

}

