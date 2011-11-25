enchant();

(function() {
    enchant.Rectangle = enchant.Class.create({
        initialize: function(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        },
        right: {
            get: function() {
                return this.x + this.width;
            }
        },
        bottom: {
            get: function() {
                return this.y + this.height;
            }
        }
    });

    enchant.World = Class.create(Group, {
        initialize:function(){
            Group.call(this);
            this.bullets = new Array();
            this.enemies = new Array();
            var blocks = [
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2, 2, 2, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 4, 4, 4, 4, 4, 4, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,-1,-1,-1,-1, 4, 4, 4, 4, 4, 4, 4,-1,-1, 2, 2,-1,-1, 2, 2,-1,-1, 2, 2,-1,-1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3,10,10,10,10, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,10,10,10,10, 3, 3, 3, 3, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
            ];
            this.map = new Map(16, 16);
            this.map.image = enchant.game.assets['map2.gif'];
            this.map.loadData(blocks);
            this.bear = new Player(32, 32, enchant.game.assets['chara1.gif'], this.map);//new Sprite(32, 32);
            var map = this.map;
            var bear = this.bear;
            this.addChild(bear);
            this.addChild(map);
            
            this.addEventListener('enterframe', function() {
                this.x = 64 - this.bear.x;
            });
            this.enemy = new Enemy(32, 32, enchant.game.assets['chara1.gif']);
            this.enemies.push(this.enemy);
            this.addChild(this.enemy);
            /*var background = new Sprite(640, 480);
            background.image = enchant.game.assets['background.png'];
            enchant.game.currentScene.addChild(background);
            this.player = new Player(320, 440, enchant.game.assets['player.png']);
            var player = this.player;
            enchant.game.currentScene.addChild(player);
            var boss = new Boss(280, 50);
            enchant.game.currentScene.addChild(boss);
            enchant.game.currentScene.addEventListener('enterframe', function(){
                for(i=0;i<enchant.world.bullets.length;++i){
                    b = enchant.world.bullets[i];
                    if(player.within(b, 5)){
                        player.x = 10000;
                    };
                    if(boss.within(b, 30)){
                        b.x = 10000;
                        boss.hp -= 1
                    }
                };
            });
            var bgm = enchant.Sound.load("bgm.mp3", 'audio/mp3');
            bgm.play();*/
        },
        popEnemy:function(){

        }
    });

    enchant.MapSprite = Class.create(Sprite, {
        initialize:function(x, y, image){
            Sprite.call(this, x, y);//image.width, image.height);
            this.image = image;
            this.x = x;
            this.y = y;
            this.v = new Vector(0, 0);
            this.addEventListener('enterframe', function(){
                this.update();
            });
        },
        update:function(){
            this.x += this.v.x;
            this.y += this.v.y;
        },
        isOutOfScreen:function(){
            return this.x < -this.image.width || this.x > 320
                || this.y < -this.image.height || this.y > 320;
        },
    });
    enchant.Character = Class.create(enchant.MapSprite, {
        initialize:function(x, y, image){
            MapSprite.call(this, x, y, image);
            this.image = image;
            this.speed = 1;
            this.offset = -30;
            this.HP = 0;
            this.addEventListener('enterframe', function(){
                this.update();
            });
        },
        shot: function(){
            var b = new Bullet(this.x + this.image.width/2, this.y + this.offset
                , new Vector(0, -1), 10);
            enchant.world.bullets.push(b);// worldとgameはグローバルにもたせておく
            enchant.game.currentScene.addChild(b);
        },
        update:function(){
            this.v.resize(this.speed);
            this.x += this.v.x;
            this.y += this.v.y;
        }
    });
    
    enchant.Player = Class.create(enchant.Character, {
        initialize:function(x, y, image, map) {
            Character.call(this, x, y, image);
            //console.log(x);
            this.ax = 0;
            this.ay = 0;
            this.pose = 0;
            //this.pose0 = 0;
            this.d = 0;
            this.jumping = true;
            this.jumpBoost = 0;
            //this.jumpCount = 0;
            this.map = map;
            this.addEventListener(enchant.Event.A_BUTTON_UP, function() {// konai
                console.log("abuttondown2");
                this.shot(1);
            });
            this.addEventListener('abuttonup', function() {// konai
                console.log("abuttondown");
                this.shot(1);
            });/**/
            this.addEventListener('touchstart', function() {// kr
                console.log("touchstart");
            });
            this.addEventListener(enchant.Event.TOUCH_START, function() {// kr
                console.log("touchstart2");
            });
            /*enchant.game.addEventListener('abuttondown', function() {// gameにイベントを追加しないとダメらしい abuttonupはきた
                enchant.world.bear.shot(1);
            });*/
            enchant.game.addEventListener('abuttonhasbeendown', function() {// gameにイベントを追加しないとダメらしい abuttonupはきた
                enchant.world.bear.shot(1);
                console.log('abuttonhasbeendown');
            });
            /*
            enchant.game.addEventListener(enchant.Event.A_BUTTON_DOWN, function(e) {// gameにイベントを追加しないとダメらしい
                enchant.world.bear.shot(1);
            });*/
            //this.type = 2;
            console.log(this);
        },
        shot: function(type){
            switch (type) {
                case 0:
                    var b = new Bullet(24, 24//this.x + 16, this.y + this.offset
                        , new Vector(1, 0), 10, this);
                    enchant.world.bullets.push(b);
                    enchant.game.currentScene.addChild(b);
                    break;
                case 1:
                    var speed = 5;	                                                                                        // 個々のbulletのスピード
                    var width = 60;                                                                                         // 射撃するbulletsの幅(degree)
                    //rad = Math.Atan2(targetObject.position.Y - position.Y, targetObject.position.X - position.X);     // 全体としての基準となる向き.
                    var rad = Math.atan2(this.y - this.y, this.x + 160 - this.x);
                    var rotation = 0.0;                                                                                     // 最終的な個々のbulletに与える角度(radian)

                    // 角度の割り振り
                    for (i = 0; i < 5; i++) {
                        var tmp = (4 - i) / 4.0;              // 0.0～1.0に丸める
                        tmp -= .5;	                // -0.5～0.5にする
                        //console.log(tmp);
                        var rot = tmp * width;	        // 角度を求める
                        rotation = rad + rot * Math.PI / 180.0//MathHelper.ToRadians(rot);
                        
                       
                        //bullets[i].rot = -(float)rotation;
                        //bullets[i].degree = MathHelper.ToDegrees((float)rotation);
                        //b.v.x = Math.cos(rotation) * speed;
                        //b.v.y = Math.sin(rotation) * speed;
                        var vx = Math.cos(rotation) * speed;
                        var vy = Math.sin(rotation) * speed;
                        var b = new Bullet(24, 24, new Vector(vx, vy), 10, this);
                        enchant.world.bullets.push(b);
                        enchant.game.currentScene.addChild(b);
                        //console.log(b.v);
                    }
                    break;
            }
            //b.x = this.x + 16;
            //b.y = this.y + this.offset;
            
            /*console.log(enchant.world.bullets.length);
            console.log(b.width);
            console.log(b.height);*/
        },
        update:function() {
            var friction = 0;
            if (this.v.x > 0.3) {
                friction = -0.3;
            } else if (this.v.x > 0) {
                friction = -this.v.x;
            }
            if (this.v.x < -0.3) {
                friction = 0.3;
            } else if (this.v.x < 0) {
                friction = -this.v.x;
            }
            if (this.jumping) {
                if (!enchant.game.input.up || --this.jumpBoost < 0) {
                    this.ay = 0;
                    //this.v.y = 0;
                }
            } else {
                if (enchant.game.input.up) {
                    this.jumpBoost = 5;
                    this.ay = -7;//-5;
                    //this.v.y = -5;
                }
            }
            //this.v = new Vector(0, 0);
            // 移動とアニメーション
            friction = 0.40;
            this.frame = 0;
            this.d++;
            
            //console.log(enchant.game.frame);
            //console.log(this.d);// こっちのカウンタのほうが速い
            if (enchant.game.input.left) this.v.x = -4;
            if (enchant.game.input.right) {
                this.v.x = 4;
                //console.log(enchant.game.frame);
                //console.log(enchant.game);
                if (this.d % 4 == 0) {//enchant.game.frameだと動かないッ...！！
                    this.pose++;
                    this.pose %= 2;
                }
                //console.log(this.pose);
                this.frame = this.pose + 1;
                //console.log(this.frame);
            }
            // ブレーキング
            if (this.v.x > 0) {
                this.v.x += -(.60 * friction);
                if (this.v.x < 0) this.v.x = 0;
            }
            if (this.v.x < 0) {
                this.v.x += (.60 * friction)
                if (this.v.x > 0) this.v.x = 0;
            }
            if (this.v.x > 0) this.scaleX = 1;
            if (this.v.x < 0) this.scaleX = -1;
            /*if (this.v.x != 0) {
                if (enchant.game.frame % 4 == 0) {
                    this.pose++;
                    this.pose %= 2;// 0, 1にする
                    //console.log(this.pose);
                }
                this.frame = this.pose + 1;// frame == 1, 2
                console.log(this.frame);
            } else {
                this.frame = 0;
            }*/

            this.v.y += this.ay + 1.5;/*+ 2*/ // 2 is gravity
            /*this.ax = 0;
            if (enchant.game.input.left) this.v.x = -5;//this.ax -= 0.5;
            if (enchant.game.input.right) this.v.x = 5;//this.ax += 0.5;
            if (this.ax > 0) this.scaleX = 1;
            if (this.ax < 0) this.scaleX = -1;
            if (this.ax != 0) {
                if (enchant.game.frame % 3 == 0) {
                    this.pose++;
                    this.pose %= 2;// 0, 1にする
                    //console.log(this.pose);
                }
                this.frame = this.pose + 1;// 1, 2
                console.log(this.frame);
            } else {
                this.frame = 0;
            }
            this.v.x += this.ax + friction;
            this.v.y += this.ay + 2 ; // 2 is gravity*/
            
            // 最大速度を超えたら制限する
            //if (this.v.y > 20) this.v.y = 20;
            this.v.x = Math.min(Math.max(this.v.x, -10), 10);
            this.v.y = Math.min(Math.max(this.v.y, -10), 10);
            
            var dest = new Rectangle(// undefined is not a function error
                this.x + this.v.x + 5, this.y + this.v.y + 2,
                this.width-10, this.height-2
            );
            this.jumping = true;
            if (dest.x < -enchant.world.x) {// -this.stage.x
                dest.x = -enchant.world.x;
                this.v.x = 0;
            }
            while (true) {
                var boundary, crossing;
                var dx = dest.x - this.x - 5;
                var dy = dest.y - this.y - 2;
                if (dx > 0 && Math.floor(dest.right / 16) != Math.floor((dest.right - dx) / 16)) {
                    boundary = Math.floor(dest.right / 16) * 16;
                    crossing = (dest.right - boundary) / dx * dy + dest.y;
                    if ((this.map.hitTest(boundary, crossing) && !this.map.hitTest(boundary-16, crossing)) ||
                        (this.map.hitTest(boundary, crossing + dest.height) && !this.map.hitTest(boundary-16, crossing + dest.height))) {
                        this.v.x = 0;
                        dest.x = boundary - dest.width - 0.01;
                        continue;
                    }
                } else if (dx < 0 && Math.floor(dest.x / 16) != Math.floor((dest.x - dx) / 16)) {
                    boundary = Math.floor(dest.x / 16) * 16 + 16;
                    crossing = (boundary - dest.x) / dx * dy + dest.y;
                    if ((this.map.hitTest(boundary-16, crossing) && !this.map.hitTest(boundary, crossing)) ||
                        (this.map.hitTest(boundary-16, crossing + dest.height) && !this.map.hitTest(boundary, crossing + dest.height))) {
                        this.v.x = 0;
                        dest.x = boundary + 0.01;
                        continue;
                    }
                }
                if (dy > 0 && Math.floor(dest.bottom / 16) != Math.floor((dest.bottom - dy) / 16)) {
                    boundary = Math.floor(dest.bottom / 16) * 16;
                    crossing = (dest.bottom - boundary) / dy * dx + dest.x;
                    if ((this.map.hitTest(crossing, boundary) && !this.map.hitTest(crossing, boundary-16)) ||
                        (this.map.hitTest(crossing + dest.width, boundary) && !this.map.hitTest(crossing + dest.width, boundary-16))) {
                        this.jumping = false;
                        this.v.y = 0;
                        dest.y = boundary - dest.height - 0.01;
                        continue;
                    }
                } else if (dy < 0 && Math.floor(dest.y / 16) != Math.floor((dest.y - dy) / 16)) {
                    boundary = Math.floor(dest.y / 16) * 16 + 16;
                    crossing = (boundary - dest.y) / dy * dx + dest.x;
                    if ((this.map.hitTest(crossing, boundary-16) && !this.map.hitTest(crossing, boundary)) ||
                        (this.map.hitTest(crossing + dest.width, boundary-16) && !this.map.hitTest(crossing + dest.width, boundary))) {
                        this.v.y = 0;
                        dest.y = boundary + 0.01;
                        continue;
                    }
                }
                break;
            }
            this.x = dest.x-5;
            this.y = dest.y-2;

            if (this.y > 320) {
                var score = Math.round(this.x);//bear.x);
                this.frame = 3;
                this.v.y = -20;
                /*this.addEventListener('enterframe', function() {
                    this.v.y += 2;
                    this.y += Math.min(Math.max(this.v.y, -10), 10);
                    if (this.y > 320) {
                        enchant.game.end(score, score + 'm縺ｧ豁ｻ縺ｫ縺ｾ縺励◆');
                    }
                });*/
                this.removeEventListener('enterframe', arguments.callee);
            }
            /*if(enchant.game.input.a){
                this.shot();
            }*/
            
        }
    });
    /*initialize: function(x, y, image){
      Character.call(this, x, y, image);
      this.speed = 5;
      this.addEventListener('enterframe', function(){
        this.input();
        this.update();
      });
    },
    input:function(){
      this.v.x = 0;
      this.v.y = 0;
      if(enchant.game.input.left){
        this.v.x = -1;
      }
      if(enchant.game.input.right){
        this.v.x = 1;
      }
      if(enchant.game.input.down){
        this.v.y = 1;
      }
      if(enchant.game.input.up){
        this.v.y = -1;
      }
      if(enchant.game.input.a){
        this.shot();
      }
    }
    });*/
    enchant.Bullet = Class.create(enchant.MapSprite, {
        initialize: function(x, y, bulDir, bulSpeed, user) {//, type){ 
            MapSprite.call(this, x, y, enchant.game.assets['bullet.png']);
            this.v = bulDir;//this.v.y = -1;
            /*switch (type) {
                case 0:
                    break;
                case 2:
                    
                    break;
            }*/
            this.speed = bulSpeed;//10;
            this.realPos = new Vector(0, 0);
            this.realPos.x = user.x + 16;
            this.realPos.y = user.y + 16;// + this.offset
            this.x = this.realPos.x + 64 - enchant.world.bear.x;
            this.y = this.realPos.y;
          },
        update: function(x, y) {
            this.v.resize(this.speed);
            //this.moveBy(this.v.x, this.v.y);
            this.realPos.x += this.v.x;
            this.realPos.y += this.v.y;
            //console.log(this.realPos.x);
            this.x = this.realPos.x + 64 - enchant.world.bear.x;
            this.y = this.realPos.y;
            if (this.isOutOfScreen()) {
                enchant.game.currentScene.removeChild(this);
                enchant.world.bullets.splice(this);
            }
        }
    });
    
    enchant.Enemy = Class.create(enchant.Character, {
        initialize:function(x, y) {
            Character.call(this, x, y, enchant.game.assets['enemy.png']);
            this.hp = 3;
            this.v.x = -3;
        },
        update:function() {
            if(this.hp < 0){
              this.x = 10000;
            }
            r = Math.floor(Math.random()*30);
            if(r==0){
              this.shot();
            }
        },
        shot:function() {
            //r = Math.floor(Math.random()*2);
            if (enchant.game.frame % 30 == 0) {
                var b = new Bullet(24, 24//this.x + 16, this.y + this.offset
                        , new Vector(-1, 0), 10, this);
                enchant.world.bullets.push(b);
                enchant.game.currentScene.addChild(b);
            }
        }
    });
    
    enchant.Boss = Class.create(enchant.MapSprite, {
        initialize: function(x, y){
            MapSprite.call(this, x, y, enchant.game.assets['boss.png'])
            this.hp = 100;
            this.v.x = 3;
            this.offset = 50;
        },
        update:function(){
            if(this.hp < 0){
              this.x = 10000
            }
            if(this.x > 640 - 240) {
              this.v.x = -5;
            }
            if(this.x < 0){
              this.v.x = 5;
            }
            this.moveBy(this.v.x, this.v.y);
            r = Math.floor(Math.random()*30);
            if(r==0){
              this.shot();
            }
        },
        shot:function() {
            r = Math.floor(Math.random()*2);
            if (true) {
                for(i=0;i<24;++i){
                    var vec = new Vector(0, 100);
                    vec.rotate(i*15);;
                    var b = new Bullet(this.x + this.image.width/2 + vec.x, this.y + vec.y);
                    b.v.x = vec.x
                    b.v.y = vec.y;
                    b.rotate(i*15);
                    enchant.world.bullets.push(b);
                    enchant.game.currentScene.addChild(b);
                }
            } else {
                var my = enchant.world.player;
                var a = Vector(this.x + this.image.width/2, this.y + this.image.height/2);
                var c = Vector(my.x + my.image.width/2, my.y + my.image.height/2);
                c.sub(a);
                var b = new Bullet(this.x + this.image.width/2, this.y + 100);
                console.log(a.x);
                b.v.x = c.x;
                b.v.y = c.y;
                enchant.world.bullets.push(b);
                enchant.game.currentScene.addChild(b);
            }
        }
    });

})();