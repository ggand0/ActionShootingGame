enchant();

window.onload = function() {

    var game = new Game(320, 320);
    enchant.game = game;
    game.fps = 24;
    game.preload('chara1.gif', 'map2.gif', 'bear.gif', 'bullet.png');
    game.keybind(90, 'a');
    game.onload = function() {
        var gameScene = new Scene();
        enchant.world = new World();
        gameScene.addChild(enchant.world);
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
