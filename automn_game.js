enchant();

window.onload = function() {
    var game = new Game(320, 320);
    enchant.game = game;
    game.fps = 24;
    game.preload('chara1.gif', 'map2.gif', 'bear.gif', 'bullet.png','map.gif', 'effect0.gif'
    ,'gameover.png', 'clear.png', 'blast_small.wav', 'bullet.wav');
    game.keybind(90, 'a');// Zキー
    game.keybind(88, 'b');// Xキー
    game.onload = function() {
        this.isOvered = false;
        this.isCleared = false;
        this.gameScene = new Scene();
        enchant.world = new World();
        this.gameScene.addChild(enchant.world);

        enchant.game.score = 0;
        var score = new Label();
        score.font = "12px 'Arial Black'";                      
        score.addEventListener('enterframe', function() {
            this.text = "Score : " + enchant.game.score;
        });
        var UI = new Label();
        UI.font = "12px 'Arial Balck'";
        UI.addEventListener('enterframe', function() {
            this.text = "HP : " + enchant.world.bear.HP;
        });
        UI.x = 280;
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
        
        
        this.clearLogo = new Sprite(267, 48, game.assets['clear.png']);
        //this.overScene.addChild(this.overLogo);
        
        /*this.overLogo.visible = false;
        this.clearLogo.visible = false;
        this.gameScene.addChild(this.clearLogo);
        this.gameScene.addChild(this.overLogo);*/
        this.gameScene.backgroundColor = 'rgb(182, 255, 255)';
        this.pushScene(this.gameScene);
        
        this.addEventListener('enterframe', function() {
            //console.log(this._scenes.length);
            if (this.isOvered) {
                var overScene = new GameOver();
                this.pushScene(overScene);
                this.isOvered = false;
            } else if (this.isCleared) {
                var clearScene = new ClearScene();
                this.pushScene(clearScene);
                this.isCleared= false;
            }
        });
    };
    game.start();
};
