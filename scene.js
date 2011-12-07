enchant();

(function() {
    enchant.GameOver =  Class.create(enchant.Scene, {
        initialize:function() {
            enchant.Scene.call(this);
            /*this.overLogo = new Sprite(189, 97, enchant.game.assets['gameover.png']);
            this.overLogo.x = 0;
            this.overLogo.y = 0;
            var o = this.overLogo;
            this.addChild(o);*/
            var o = new Sprite(189, 97, enchant.game.assets['gameover.png']);
            o.image = enchant.game.assets['gameover.png'];// Ç±Ç±Ç≈ÇÊÇ§Ç‚Ç≠ì¸ÇÈÇ∆Ç¢Ç§...
            o.x = 160 - 189 / 2;
            o.y = 160 - 89 / 2;
            console.log(o.image);
            this.addChild(o);//imageÅ@Ç™ nullÇ…Ç»Ç¡ÇƒÇÈ
            this.timer = new Timer(120);
            this.timer.play();
            this.backgroundColor = 'rgb(182, 255, 255)';//'rgb(182, 255, 255)';
            
            this.addEventListener('enterframe', function() {
                this.update();
                //console.log(this.overLogo);
            });
        },
        update:function() {
            if (this.timer.isOver()) {
                enchant.game.popScene();
                enchant.game.popScene();
                enchant.game.onload();/**/
            }
            
            this.timer.count();
        }
    });
    
    enchant.ClearScene = Class.create(enchant.Scene, {
        initialize:function() {
            enchant.Scene.call(this);
            var o = new Sprite(267, 48, enchant.game.assets['clear.png']);
            o.image = enchant.game.assets['clear.png'];// Ç±Ç±Ç≈ÇÊÇ§Ç‚Ç≠ì¸ÇÈÇ∆Ç¢Ç§...
            o.x = 160 - 267 / 2;
            o.y = 160 - 48 / 2;
            this.addChild(o);//imageÅ@Ç™ nullÇ…Ç»Ç¡ÇƒÇÈ
            this.timer = new Timer(120);
            this.timer.play();
            this.backgroundColor = 'rgb(182, 255, 255)';
            
            this.addEventListener('enterframe', function() {
                this.update();
                //console.log(this.overLogo);
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