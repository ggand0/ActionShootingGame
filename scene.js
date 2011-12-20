enchant();

(function() {
    enchant.GameOver =  Class.create(enchant.Scene, {
        initialize:function() {
            enchant.Scene.call(this);
            var o = new Sprite(189, 97, enchant.game.assets['gameover.png']);
            o.image = enchant.game.assets['gameover.png'];// image�����̂��R���X�g���N�^�œ��炸�����ł悤�₭����
            o.x = 160 - 189 / 2;
            o.y = 160 - 89 / 2;
            this.addChild(o);
            this.timer = new Timer(120);
            this.timer.play();
            switch (enchant.game.levelNum) {
                default :
                    this.backgroundColor = 'rgb(182, 255, 255)';
                    break;
                case 1:
                    this.backgroundColor = 'rgb(180, 30, 55)';
                    break;
                case 2:
                    this.backgroundColor = 'rgb(100, 100, 255)';
                    break;
            }
            this.curNum = enchant.world.levelNum;
            enchant.game.score /= 3;// �y�i���e�B
            this.addEventListener('enterframe', function() {
                this.update();
            });
        },
        update:function() {
            if (this.timer.isOver()) {
                if (this.curNum <= enchant.game.maxLevel) {
                    enchant.game.popScene();
                    enchant.game.popScene();
                    //enchant.game.onload();
                    enchant.game.ini(this.curNum);
                    enchant.level = enchant.world.levels[0];
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
            switch (enchant.game.levelNum) {
                default:
                    this.backgroundColor = 'rgb(182, 255, 255)';
                    break;
                case 1:
                    this.backgroundColor = 'rgb(180, 30, 55)';
                    break;
                case 2:
                    this.backgroundColor = 'rgb(100, 100, 255)';
                    break;
            }
            this.curNum = enchant.world.levelNum;
            this.addEventListener('enterframe', function() {
                this.update();
            });
            if (enchant.game.levelNum == enchant.game.maxLevel) {
                var logo = new Label();
                logo.x = 0;
                logo.y = 200;
                logo.font = "12px 'Arial Black'";
                logo.text = "Congrats! You've cleared all lvl. ty for playing!!";
                this.addChild(logo);
            }
        },
        update:function() {
            if (this.timer.isOver()) {
                if (this.curNum < enchant.game.maxLevel) {
                    console.log("cls over");
                    enchant.game.popScene();
                    enchant.game.popScene();
                    enchant.game.ini(this.curNum+1);
                    enchant.level = enchant.world.levels[0];
                }
            }
            
            this.timer.count();
        }
    });
})();