enchant();

(function() {
    enchant.GameOver =  Class.create(enchant.Scene, {
        initialize:function() {
            enchant.Scene.call(this);
            var o = new Sprite(189, 97, enchant.game.assets['gameover.png']);
            o.image = enchant.game.assets['gameover.png'];// imageが何故かコンストラクタで入らずここでようやく入る
            o.x = 160 - 189 / 2;
            o.y = 160 - 89 / 2;
            this.addChild(o);
            this.timer = new Timer(120);
            this.timer.play();
            this.backgroundColor = 'rgb(182, 255, 255)';
            this.curNum = enchant.world.levelNum;
            this.addEventListener('enterframe', function() {
                this.update();
            });
        },
        update:function() {
            if (this.timer.isOver()) {
                if (this.curNum < enchant.game.maxLevel) {
                    enchant.game.popScene();
                    enchant.game.popScene();
                    //enchant.game.onload();
                    enchant.game.ini(this.curNum);
                    enchant.level = enchant.world.levels[0];//[enchant.world.levelNum];// 入れないとスクロールされない...?
                }
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
            this.curNum = enchant.world.levelNum;
            this.addEventListener('enterframe', function() {
                this.update();
            });
        },
        update:function() {
            if (this.timer.isOver()) {
                if (this.curNum < enchant.game.maxLevel) {
                    console.log("cls over");
                    enchant.game.popScene();
                    enchant.game.popScene();
                    //enchant.game.onload(1);//++enchant.world.levelNum);
                    //enchant.world = new World();
                    //enchant.world.levelNum = this.curNum;
                    enchant.game.ini(this.curNum+1);
                    //enchant.world.levelNum = this.curNum+1;
                    enchant.level = enchant.world.levels[0];//enchant.world.levelNum];
                }
            }
            
            this.timer.count();
        }
    });
})();