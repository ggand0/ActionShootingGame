enchant();

(function() {
    enchant.GameOver =  Class.create(enchant.Scene, {
        initialize:function() {
            enchant.Scene.call(this);
            var o = new Sprite(189, 97, enchant.game.assets['gameover.png']);
            o.image = enchant.game.assets['gameover.png'];// ‚±‚±‚Å‚æ‚¤‚â‚­“ü‚é‚Æ‚¢‚¤...
            o.x = 160 - 189 / 2;
            o.y = 160 - 89 / 2;
            this.addChild(o);
            this.timer = new Timer(120);
            this.timer.play();
            this.backgroundColor = 'rgb(182, 255, 255)';
            
            this.addEventListener('enterframe', function() {
                this.update();
            });
        },
        update:function() {
            if (this.timer.isOver()) {
                enchant.game.popScene();
                enchant.game.popScene();
                enchant.game.onload();
            }
            
            this.timer.count();
        }
    });
    
    enchant.ClearScene = Class.create(enchant.Scene, {
        initialize:function() {
            enchant.Scene.call(this);
            var o = new Sprite(267, 48, enchant.game.assets['clear.png']);
            o.image = enchant.game.assets['clear.png'];
            o.x = 160 - 267 / 2;
            o.y = 160 - 48 / 2;
            this.addChild(o);
            this.timer = new Timer(120);
            this.timer.play();
            this.backgroundColor = 'rgb(182, 255, 255)';
            
            this.addEventListener('enterframe', function() {
                this.update();
            });
        },
        update:function() {
            if (this.timer.isOver()) {
                enchant.game.popScene();
                enchant.game.popScene();
                enchant.game.onload();
            }
            
            this.timer.count();
        }
    });
})();