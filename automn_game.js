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
        gameScene.addChild(pad);
        gameScene.backgroundColor = 'rgb(182, 255, 255)';
        
        game.pushScene(gameScene);
    };
    game.start();
};
