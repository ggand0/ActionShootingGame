enchant();

(function() {
    enchant.Player = Class.create(enchant.Character, {
        initialize:function(x, y, image, map) {
            Character.call(this, x, y, image, map);
            //console.log(x);
            this.ax = 0;
            this.ay = 0;
            this.pose = 0;
            this.HP = 30;
            this.isDamaged = false;
            this.iniTimer = false;
            this.d = 0;
            this.jumping = true;
            this.jumpBoost = 0;
            this.map = map;
            this.bullet_se = enchant.Sound.load('bullet.wav', 'audio/wav');
            this.bullet_se.volume = 0.3;
            this.timer = new Timer(30);// ダメージ後の無敵時間にセット
            /*this.addEventListener(enchant.Event.A_BUTTON_UP, function() {// konai
                console.log("abuttondown2");
                this.shot(1);
            });*/
            this.addEventListener('abuttonup', function() {// konai
                //console.log("abuttondown");
                this.shot(1);
            });/**/
            /*enchant.game.addEventListener('abuttondown', function() {// gameにイベントを追加しないとダメらしい abuttonupはきた
                enchant.world.bear.shot(1);
            });*/
            
            enchant.game.addEventListener('abuttonhasbeendown', function() {// gameにイベントを追加しないとダメらしい abuttonupはきた
                if (enchant.game.input.up) {
                    enchant.world.bear.shot(1, 1);
                } else if (enchant.game.input.down) {
                    enchant.world.bear.shot(1, 2);
                } else {
                    enchant.world.bear.shot(1, 0);
                }
                //console.log('abuttonhasbeendown');
            });
            this.addEventListener('abuttonhasbeendown', function() {
                this.shot(1);
                //console.log('abuttonhasbeendown');
            });
            /*
            enchant.game.addEventListener(enchant.Event.A_BUTTON_DOWN, function(e) {// gameにイベントを追加しないとダメらしい
                enchant.world.bear.shot(1);
            });*/
            //this.type = 2;
            //console.log(this);
        },
        shot: function(type, dir) {
            var se = enchant.Sound.load('bullet.wav', 'audio/wav');
            se.volume = 0.1;//this.bullet_se.clone();
            se.play();
            //console.log(se);
            
            switch (type) {
                case 0:
                    var b = new Bullet(24, 24//this.x + 16, this.y + this.offset
                        , new Vector(1, 0), 20, this, 'Player');//'Player'
                    enchant.world.bullets.push(b);
                    //enchant.game.currentScene.addChild(b);
                    enchant.world.addChild(b);
                    break;
                case 1:
                    var speed = 5;	                                                                                        // 個々のbulletのスピード
                    var width = 30;                                                                                         // 射撃するbulletsの幅(degree)
                    //rad = Math.Atan2(targetObject.position.Y - position.Y, targetObject.position.X - position.X);     // 全体としての基準となる向き.
                    var rad = 0;
                    switch (dir) {
                        case 0:
                            rad = Math.atan2(this.y - this.y, this.x + 160 - this.x);
                            break;
                        case 1:
                            rad = Math.atan2((this.y - 160) - this.y, this.x + 160 - this.x);
                            break;
                        case 2:
                            rad = Math.atan2((this.y + 160) - this.y, this.x + 160 - this.x);
                            break;
                    }
                    
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
                        var b = new Bullet(24, 24, new Vector(vx, vy), 20, this, 'Player');
                        enchant.world.bullets.push(b);
                        //enchant.game.currentScene.addChild(b);
                        enchant.world.addChild(b);// currentSceneだと座標更新がされない
                        //console.log(enchant.world.bullets);
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
            this.update_motion_ex();
            this.damage_detection();

            this.timer.count();
        },
        damage_detection:function() {
            if (this.isDamaged && !this.iniTimer) {
                this.timer.set(30);
                this.timer.play();
                this.iniTimer = true;
                this.v = new Vector(-10, -10);// ダメージ時の反動
            }
            if (this.isDamaged && this.iniTimer && this.timer.isOver()) {
                this.iniTimer = false;
                this.isDamged = false;
                this.v = new Vector(0, 0);
            }
            
            if (this.y > enchant.game.height) {
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
        },
        update_motion_ex:function() {
            if (this.jumping) {
                if (!enchant.game.input.b/* || --this.jumpBoost < 0*/) {
                    //this.ay = 0;
                    //this.v.y = 0;
                }
            } else {
                if (enchant.game.input.b) {
                    //this.jumpBoost = 5;
                    //this.ay = -7;//-5;
                    this.v.y = -20;
                }
            }
            // 移動とアニメーション
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
                this.frame = this.pose + 1;
            }
            
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
            this.update_motion();
        }
    });
})();