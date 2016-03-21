// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

    //My initializations
	var stage,notifications;
	var ground;
	var preload;
	var minu;
	var w, h, groundshape;
	var tom, slayer, cake, girl;
	var level, progres,levelO;
	var score = 0;
	var health = 100;
	var caught = 0;
	var slayeg = 0;
	var scored, healthd;
	var healthConst, healthDeduct, birdtweenConst, tomTweenConst, message, message2, message3, mycancel, myplay, myfailure, myrefresh, mysuccess;
	var message4, message5, message6, mycancel2, popup;
	var hill, tulips, tree;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());

		    //My code		

			var myPlayGame = document.getElementById("playGame");
			myPlayGame.addEventListener("click", init, false);

			//document.getElementById("game").style.visibility = "hidden";
            //END OF MY CODE
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

    //GAME CODE HERE

	function init() {
	    //Hide the preview
	    document.getElementById("game").style.visibility = "visible";
	    document.getElementById("notices").style.visibility = "hidden";

	    var canvas = document.getElementById("canvasd");
	    canvas.requestFullscreen();
	    createjs.Ticker.paused = false;
	    //document.getElementById("preview").style.display = "none";

	    stage = new createjs.Stage("canvasd");    

	    preload = new createjs.LoadQueue(true);
	    var manifest = [
            { src: "img/ground_inscene.png",    id: "ground" },
            { src: "img/background.png",        id: "back" },
            { src: "img/scottpilgrim_multiple.png", id: "tom" },
            { src: "img/ghost.png",             id: "ghost" },
            { src: "img/bird.png",              id: "girl" },
            { src: "img/foods/cake_strawberry.png", id: "cake" },
            { src: "img/progress/health.png",   id: "health" },
            { src: "img/progress/trophy.png",   id: "trophy" },
            { src: "img/progress/dollar.png",   id: "score" },
            { src: "img/hill.png",              id: "hill" },
            { src: "img/tree.png",              id: "tree" },
            { src: "img/tulips.png",            id: "tulips" },
            { src: "img/next/play.png",         id: "play" },
            { src: "img/next/cancel.png",       id: "exit" },
            { src: "img/next/refresh.png",      id: "refresh" },
            { src: "img/next/failure.png",      id: "failure" },
            { src: "img/next/success.png",      id: "success" },
	    ];
	    //preload.addEventListener('fileload', handleFileLoad);
	    preload.addEventListener("complete", handleComplete);
	    //preload.loadFile("img/ground_inscene.png");
	    preload.loadManifest(manifest);
	    h = stage.canvas.height;
	    w = stage.canvas.width;
	    //console.log(localStorage);

	    //localStorage.setItem('birdtweenConst', 19);
	    //localStorage.setItem('level',2);
	    //localStorage.setItem('score',2);
	    //READ FROM LOCAL STORAGE THE LEVEL CONSTANTS	    
	}

	function handleComplete(event) {
	    if (localStorage.getItem('level') === null) {
	        localStorage.setItem('level', 1);
	        level = parseInt(localStorage.getItem('level'));
	    } else {
	        level = parseInt(localStorage.getItem('level'));
	    }

	    if (localStorage.getItem('birdtweenConst') === null) {
	        birdtweenConst = 2500;
	        localStorage.setItem('birdtweenConst', parseInt(birdtweenConst));
	    } else {
	        birdtweenConst = parseInt(localStorage.getItem('birdtweenConst'));
	    }

	    if (localStorage.getItem('score') === null) {
	        localStorage.setItem('score', 0);
	    } else {
	        score = parseInt(localStorage.getItem('score'));
	    }

	    if (localStorage.getItem('healthDeduct') === null) {
	        localStorage.setItem('healthDeduct', 1);
	        healthDeduct = parseInt(localStorage.getItem('healthDeduct'));
	    } else {
	        healthDeduct = parseInt(localStorage.getItem('healthDeduct'));
	    }

	    if (localStorage.getItem('healthConst') === null) {
	        localStorage.setItem('healthConst', 10);
	    } else {
	        healthConst = parseInt(localStorage.getItem('healthConst'));
	    }	    
	    console.log(localStorage);

	    var c = preload.getResult("cake");
	    cake = new createjs.Bitmap(c);
	    cake.x = 600;
	    cake.y = 72;

	    var hillvar = preload.getResult('hill');
	    hill = new createjs.Bitmap(hillvar);
	    hill.x = 500;
	    hill.y = 165;

	    var treevar = preload.getResult('tree');
	    tree = new createjs.Bitmap(treevar);
	    tree.x = 1000;
	    tree.y = 42;

	    var tulipsvar = preload.getResult('tulips');
	    tulips = new createjs.Bitmap(tulipsvar);
	    tulips.x = 1600;
	    tulips.y = 220;

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

	    levelO = new createjs.Text(level, "20px Arial bold", "#F3FFEA");
	    levelO.x = 260;
	    levelO.y = 10;

	    var bg = preload.getResult("back");
	    var myGround = new createjs.Bitmap(bg);
	    stage.addChild(myGround);

	    var ground = preload.getResult("ground");
	    groundshape = new createjs.Shape();

	    var g = groundshape.graphics;
	    g.beginBitmapFill(ground, 'repeat-x');
	    g.setStrokeStyle(1).beginStroke(createjs.Graphics.getRGB(0, 0, 0));
	    g.drawRect(0, 0, w + ground.width, ground.height);

	    groundshape.tileW = ground.width;
	    groundshape.y = h - ground.height;

	    groundshape.x = 0;
	    groundshape.y = 280;
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
	        frames: { width: 32, height: 48, regX: 40, regY: 0, spacing: 0, margin: 0 },
	        animations: {
	            run: {
	                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
	        frames: { width: 64, height: 64, regX: 40, regY: 0, spacing: 0, margin: 0, count: 16 },
	        animations: {
	            run: {
	                frames: [4, 5, 6, 7],
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
	        frames: { width: 108, height: 140, regX: 60, regY: 0, spacing: 0, margin: 0, count: 12 },
	        animations: {
	            run: {
	                frames: [0, 1, 2, 3, 4, 5, 6, 7],
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
	    stage.addChild(circle, cake, tree, tulips, tom, slayer, progres, progressive, scoreImg, healthImg, healthd, levelO, girl);

	    //The sweet Tween
	    createjs.Tween.get(girl, { loop: true })
        //.to({ x: 310 }, parseInt(localStorage.getItem('birdtweenConst')),createjs.Ease.getPowInOut(1))
        .to({ x: 320, y: 140 }, parseInt(localStorage.getItem('birdtweenConst')), createjs.Ease.getPowInOut(3))
        .to({ x: 230,y:160 }, 2500, createjs.Ease.getPowInOut(1))
        .to({ x: 290, y: 200 }, 4500, createjs.Ease.getPowInOut(1));

	    //Tween Tom
	    createjs.Tween.get(tom, { loop: true })
        .to({ x: 160 }, 3000, createjs.Ease.getPowInOut(1))
        .to({ x: 120 }, 2000, createjs.Ease.getPowInOut(2))
        .to({ x: 130 }, 1500, createjs.Ease.getPowInOut(2));

	    //Tween cake
	    createjs.Tween.get(cake, { loop: true })
        .to({ x: Math.floor(Math.random()) }, 1500, createjs.Ease.getPowInOut(2));

	    //Tween Slayer
	    createjs.Tween.get(slayer, { loop: true })
        .to({ x: Math.floor(Math.random()) }, 2000, createjs.Ease.getPowInOut(2));

	    //TWEEN TREE
	    createjs.Tween.get(tree, { loop: true })
        .to({ x: Math.floor(Math.random()) }, 13000, createjs.Ease.getPowInOut(1))
	    .to({ x: -200}, 3000, createjs.Ease.getPowInOut(1));
	    //TWEEN TULIPS
	    createjs.Tween.get(tulips, { loop: true })
        .to({ x: Math.floor(Math.random()) }, 12000, createjs.Ease.getPowInOut(1))
	    .to({ x: -200}, 3000, createjs.Ease.getPowInOut(1));

	    //TWEEN HILL
	    createjs.Tween.get(hill, { loop: true })
        .to({ x: Math.floor(Math.random()) }, 3500, createjs.Ease.getPowInOut(1));

	    //Events Listeners 
	    stage.on("click", function (event) {
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
	    mycancel.x = 260;
	    mycancel.y = 180;

	    var failure = preload.getResult("failure");
	    myfailure = new createjs.Bitmap(failure);
	    myfailure.x = 70;
	    myfailure.y = 10;

	    var cancel = preload.getResult("exit");
	    mycancel = new createjs.Bitmap(cancel);
	    mycancel.x = 260;
	    mycancel.y = 190;

	    var refresh = preload.getResult("refresh");
	    myrefresh = new createjs.Bitmap(refresh);
	    myrefresh.x = 90;
	    myrefresh.y = 190;

	    var play = preload.getResult("play");
	    myplay = new createjs.Bitmap(play);
	    myplay.x = 90;
	    myplay.y = 180;	    

	    //EVENTS
	    myplay.addEventListener("click", function (event) {
	        createjs.Ticker.paused = false;
	        document.getElementById("game").style.visibility = "visible";
	        stage.addChild(girl);
	        init();
	        //document.getElementById("notices").style.visibility = "hidden";	        
	    });

	    myrefresh.addEventListener("click", function (event) {
	        createjs.Ticker.paused = false;
	        document.getElementById("game").style.visibility = "visible";
	        //document.getElementById("notices").style.visibility = "hidden";
	        init();
	    });

	    createjs.Ticker.setFPS(55);
	    createjs.Ticker.addEventListener("tick", tick);
	}
	function tick(event) {

	    if (!createjs.Ticker.paused) {
	        var deltaS = event.delta / 1000;
	        groundshape.x = (groundshape.x - deltaS * 150) % groundshape.tileW;
	        //Tom and Bird
	        var intersection = ndgmr.checkRectCollision(tom, girl);
	        if (intersection != null) {
	            caught = caught + 1;
	            //healthConst
	            if (caught > 7 && health > parseInt(localStorage.getItem('healthConst'))) {
	                //console.log("Congratulations!! You Caught the Bird");
	                
	                setTimeout(function () {
	                    document.exitFullscreen();
	                    document.getElementById("game").style.visibility = "hidden";
	                    document.getElementById("notices").style.visibility = "visible";
	                }, 500);
	                health = 100;	                
	                nextStage();
	                

	                var textOne = document.getElementById("firsth2");
	                textOne.innerHTML = "YOU WON!!";
	                var additions = document.getElementById("additions");
	                additions.innerHTML = "<img src=img/next/success.png width='250px'>";
	                var textTwo = document.getElementById("secondh2");
	                textTwo.innerHTML = "NEXT LEVEL";

	                var shesays = document.getElementById("shesays");
	                shesays.innerHTML = "Cate 'Thanks bae. I love you so much!!'<hr>You need " + localStorage.getItem('healthConst')+" of health and the gennie is on some more steroids in";

	                var controls = document.getElementById("controls");
	                controls.innerHTML = '<button id="cancelGame" class="btn btn-default"><img src="img/next/cancel.png" width="70px" /></button>';
	                stage.update();
	                
	                //Place the Ad
                    /*
	                if (navigator.onLine) {
	                    window.mmAPI.placeAd({
	                        containerElementId: "adContainer",
	                        apid: "220060",
	                        placementType: "interstitial",
	                        allowLocation: true
	                    });
	                }*/
                    //End of Ad
	            }
	        } else {
	            caught = 0;
	        }

	        //Tom and Cake
	        var intersection = ndgmr.checkRectCollision(tom, cake);
	        if (intersection != null) {
	            score = (score + 0.03125);
	            //console.log(score);
	            stage.removeChild(scored);
	            scored = new createjs.Text(score, "20px Arial bold", "#F3FFEA");
	            scored.x = 380;
	            scored.y = 10;
	            stage.addChild(scored);

	            //Tom ate a cake. Increase life
	            if (health <= 999) {
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
	    var intersection = ndgmr.checkRectCollision(tom, slayer);
	    if (intersection != null) {
	        //Reduce life from tom
	        slayeg = slayeg + 1;
	        if (slayeg >= 10) {
	            //console.log(slayeg+"tom collided with slayer!!");
	            if (health >= 0) {
	                health = (health - parseInt(localStorage.getItem('healthDeduct')));
	                stage.removeChild(healthd);
	                healthd = new createjs.Text(health, "20px Arial bold", "#F3FFEA");
	                healthd.x = 40;
	                healthd.y = 10;
	                stage.addChild(healthd);
	            } else {
	                var textOne = document.getElementById("firsth2");
	                textOne.innerHTML = "YOU LOST";
	                health = 100;
	                var additions = document.getElementById("additions");
	                additions.innerHTML = "<img src=img/next/failure.png>";

	                var textTwo = document.getElementById("secondh2");
	                textTwo.innerHTML = "Try Again";

	                var shesays = document.getElementById("shesays");
	                shesays.innerHTML = "Cate 'But... Tom I wanted the twitter bird'<hr>You need " + localStorage.getItem('healthConst') + " of health in ";

	                var controls = document.getElementById("playGame");
	                controls.innerHTML = '<button id="playGame" class="btn btn-default"><img src="img/next/refresh.png"  width="70px" /></button>';

	                var controls = document.getElementById("controls");
	                controls.innerHTML = '<button id="cancelGame" class="btn btn-default"><img src="img/next/cancel.png"  width="70px" /></button>';
	                
	                createjs.Ticker.paused = true;
	                document.getElementById("game").style.visibility = "hidden";
	                document.exitFullscreen();
	                document.getElementById("notices").style.visibility = "visible";
	                stage.update();
	                //Place the Ad
                    /*
	                if(navigator.onLine){
	                    window.mmAPI.placeAd({
	                        containerElementId: "adContainer",
	                        apid: "220060",
	                        placementType: "interstitial",
	                        allowLocation: true
	                    });
	                }  
                    */
	                //End of Ad
	            }
	        }
	    } else {
	        slayeg = 0;
	    }
	    stage.update();
	    //Events
	}
    //Function to set the next level parameters
	function nextStage() {
	    if (!createjs.Ticker.paused) {
	        if (localStorage.getItem('level') === null) {
	            var lvlr = 2;
	            localStorage.setItem('level', lvlr);
	        } else {
	            var lvlr = parseInt(localStorage.getItem('level')) + 1;
	            localStorage.setItem('level', lvlr);
	        }

	        level = localStorage.getItem('level');

	        //Health to Deduct
	        if (localStorage.getItem('healthDeduct') === null) {
	            localStorage.setItem('healthDeduct', 3);
	        } else {
	            var lvld = parseInt(localStorage.getItem('healthDeduct')) + 1;
	            localStorage.setItem('healthDeduct', lvld);
	        }

	        if (localStorage.getItem('birdtweenConst') === null) {
	            localStorage.setItem('birdtweenConst', 1510);
	        } else {
	            var lvlg = parseInt(localStorage.getItem('birdtweenConst')) + 100;
	            localStorage.setItem('birdtweenConst', lvlg);
	        }

	        if (localStorage.getItem('healthConst') === null) {
	            localStorage.setItem('healthConst', 20);
	        } else {
	            var lvlee = parseInt(localStorage.getItem('healthConst')) + 20;
	            localStorage.setItem('healthConst', lvlee);
	        }
	        var lvls = parseInt(localStorage.getItem('score')) + parseInt(score);
	        localStorage.setItem('score', lvls);
	        createjs.Ticker.paused = true;
	        stage.update();
	    }
	    
	}
    //END OF GAME CODE HERE
	app.start();
})();
