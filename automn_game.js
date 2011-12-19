enchant();

window.onload = function() {
    var game = new Game(320, 320);
    enchant.game = game;
    game.fps = 24;
    game.preload('chara1.gif', 'map2.gif', 'bear.gif', 'bullet.png','map.gif', 'effect0.gif'
    ,'gameover.png', 'clear.png', 'blast_small.wav', 'bullet.wav', 'bullet2.mp3');
    game.keybind(90, 'a');// Zキー
    game.keybind(88, 'b');// Xキー
    game.keybind(80, 'start');// Xキー
    game.maxLevel = 2;
    game.onload = function() {
        this.isOvered = false;
        this.isCleared = false;
        this.isPaused = false;
        this.gameScene = new Scene();
        
        enchant.world = new World();
        this.gameScene.addChild(enchant.world);
        enchant.world.addChild(enchant.world.levels[enchant.world.levelNum]);
        //enchant.world.levelNum = (levelNum == undefined ? 0 : levelNum);
        console.log("num");
        console.log(enchant.world.levelNum);

        enchant.game.score = 0;
        this.p = new Label();
        this.p.font = "12px 'Arial Black'";  
        this.p.x = 160;
        this.p.y = 160; 
        this.p.text = "";
        /*pause.addEventListener('enterframe', function() {
            if (enchant.game.isPaused) {
                this.text = "PAUSED";
                console.log("p");
            } else {
                this.text = "";
            }
        });*/

        var score = new Label();
        score.font = "12px 'Arial Black'";                      
        score.addEventListener('enterframe', function() {
            this.text = "Score : " + enchant.game.score;
        });
        var UI = new Label();
        UI.font = "12px 'Arial Balck'";
        UI.addEventListener('enterframe', function() {
            this.text = "HP : " + enchant.world.levels[enchant.world.levelNum].bear.HP;
        });
        UI.x = 280;
        this.gameScene.addChild(this.p);
        this.gameScene.addChild(score);
        this.gameScene.addChild(UI);

        var pad = new Pad();
        pad.x = 0;
        pad.y = 224;
        var apad = new APad();
        apad.x = 224;
        apad.y = 224;
        this.gameScene.addChild(pad);
        this.gameScene.addChild(apad);
        this.gameScene.backgroundColor = 'rgb(182, 255, 255)';
        this.pushScene(this.gameScene);
        enchant.level = enchant.world.levels[enchant.world.levelNum];
        
        this.addEventListener('enterframe', function() {
            //enchant.level = enchant.world.levels[enchant.world.levelNum];     // ClearSceneでやるか！
            
            if (this.isOvered) {
                var overScene = new GameOver();
                this.pushScene(overScene);
                this.isOvered = false;
            } else if (this.isCleared) {
                var clearScene = new ClearScene();
                this.pushScene(clearScene);
                this.isCleared= false;
                //enchant.world.levelNum++;
                //enchant.level = enchant.world.levels[enchant.world.levelNum];
            }
        });
    };
    game.ini = function(curNum) {
        this.gameScene = new Scene();
        enchant.world = new World();
        this.gameScene.addChild(enchant.world);
        enchant.world.levelNum = curNum;//+1;
        enchant.world.addChild(enchant.world.levels[enchant.world.levelNum]);
        this.p = new Label();
        this.p.font = "12px 'Arial Black'";
        this.p.x = 160;
        this.p.y = 160;
        this.p.text = "";
        var score = new Label();
        score.font = "12px 'Arial Black'";                      
        score.addEventListener('enterframe', function() {
            this.text = "Score : " + enchant.game.score;
        });
        var UI = new Label();
        UI.font = "12px 'Arial Balck'";
        UI.addEventListener('enterframe', function() {
            this.text = "HP : " + enchant.world.levels[enchant.world.levelNum].bear.HP;
        });
        UI.x = 280;
        this.gameScene.addChild(this.p);
        this.gameScene.addChild(score);
        this.gameScene.addChild(UI);
        var pad = new Pad();
        pad.x = 0;
        pad.y = 224;
        var apad = new APad();
        apad.x = 224;
        apad.y = 224;
        this.gameScene.addChild(pad);
        this.gameScene.addChild(apad);
        this.gameScene.backgroundColor = 'rgb(182, 255, 255)';
        this.pushScene(this.gameScene);
    };
    game.start();
};
