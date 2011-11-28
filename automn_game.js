enchant();

window.onload = function() {
    var game = new Game(320, 320);
    enchant.game = game;
    game.fps = 24;
    game.preload('chara1.gif', 'map2.gif', 'bear.gif', 'bullet.png','map.gif', 'effect0.gif'
    , 'blast_small.wav', 'bullet.wav');
    game.keybind(90, 'a');// Zキー
    game.keybind(88, 'b');// Xキー
    game.onload = function() {
        var gameScene = new Scene();
        enchant.world = new World();
        gameScene.addChild(enchant.world);
        //game.WIDTH = 640;
        //game.HEIGHT = 480;
        
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
        gameScene.addChild(score);
        gameScene.addChild(UI);
        var pad = new Pad();
        pad.x = 0;
        pad.y = 224;
        var apad = new APad();
        apad.x = 224;
        apad.y = 224;
        gameScene.addChild(pad);
        gameScene.addChild(apad);
        gameScene.backgroundColor = 'rgb(182, 255, 255)';
        game.pushScene(gameScene);
    };
    game.start();
};
