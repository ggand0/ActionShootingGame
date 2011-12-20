enchant();

(function() {
    enchant.Enemy = Class.create(enchant.Character, {
        initialize:function(x, y, image, map, pos, type) {
            Character.call(this, x, y, image, map);
            this.HP = 3;
            this.v.x = -3;
            this.type = type;
            this.x = pos.x;
            this.y = pos.y;//this.pos = pos;
            this.isActive = false;
            this.visible = false;
        },
        update:function() {
            var d = Math.abs(this.x - enchant.level.bear.x);
            if (!this.isActive && d < 320) {
                this.isActive = true;
                this.visible = true;
            }
            
            if (this.isActive) {
                this.update_motion();
                /*r = Math.floor(Math.random()*30);
                if (r == 0) {
                  this.shot(this.type);
                }*/
                this.shot(this.type);
            }
        },
        shot:function() {
            if (Math.abs(this.x, enchant.level.x) > 320) return;
            
            switch(this.type) {
                case 0:
                    if (enchant.game.frame % 20 == 0) {
                        var b = new Bullet(24, 24//this.x + 16, this.y + this.offset
                                , new Vector(-1, 0), 10, this, 'Enemy');
                        enchant.level.bullets.push(b);
                        enchant.level.addChild(b);
                    }
                    break;
                case 1:
                    if (enchant.game.frame % 20 == 0) {
                        var s = new Vector(0, 0);
                        var rad = Math.atan2(enchant.level.bear.x - this.x, enchant.level.bear.y - this.y);
                        //rad = Math.PI * 2 - 90 * Math.PI / 180.0;
                        //rad += 90 * Math.PI / 180.0;
                        //rad = -rad + Math.PI;
                        //rad += 270 * Math.PI / 180.0;
                        rad += -90 * Math.PI / 180.0;
                        rad = -rad;// + Math.PI;
                        s.x = Math.cos(rad);
                        s.y = Math.sin(rad);
                        //console.log(rad * 180.0 / Math.PI);
                        var b = new Bullet(24, 24, s, 10, this, 'Enemy');
                        enchant.level.bullets.push(b);
                        enchant.level.addChild(b);
                        break;
                    }
            }
        },
        pop:function(i) {
            this.isAlive = false;
            enchant.level.removeChild(this);
            enchant.level.enemies.splice(i, 1);//(this, 1);
            this.removeEventListener('enterframe', arguments.callee);
            delete this;
            //console.log("dead");
        }
    });
    enchant.ChaseEnemy = Class.create(enchant.Enemy, {
        initialize:function(x, y, image, map, pos, type) {
            enchant.Enemy.call(this, x, y, image, map, pos, type);
            this.HP = 2;
            if (type == 0) {
                isActive = true;// t0 : �O����ǐՂ���^�C�v
            } else {
                isActive = false;
                this.visible = false;
            }
        },
        update:function() {
            var distance = this.x - enchant.level.bear.x;// Math.abs()
            // Player�������ʒu�𒴂��Ă���ǐՂ�������
            if (!this.isActive && this.type == 1 && distance < -320) {
                console.log("chaseEnemy's become active");
                this.isActive = true;
                this.visible = true;
            }
            if (this.isActive && this.visible) {
                this.v.x = this.x < enchant.level.bear.x ? 6 : -6;//3
                this.update_motion_ex();
            }
        },
        update_motion_ex:function() {
            if (enchant.game.frame % 60 == 0) this.v.y = -17;
            this.update_motion();
        }
    });
    enchant.ChargeEnemy = Class.create(enchant.Enemy, {
        initialize:function(x, y, image, map, pos, type) {
            enchant.Enemy.call(this, x, y, image, map, pos, type);
            this.HP = 2;
            this.v.x = 7;
            this.isActive = false;
            this.visible = false;
        },
        update:function() {
            var distance = this.x - enchant.level.bear.x;
            
            //if (this.type == 1 && distance < -320 || this.type == 0) {
            if (!this.isActive && distance < -320) {
                console.log("charge enemy's become active");
                this.isActive = true;
                this.visible = true;
            }
            if (this.isActive) {
                this.x += this.v.x;
                this.y += this.v.y;
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
                    enchant.level.bullets.push(b);
                    enchant.game.currentScene.addChild(b);
                }
            } else {
                var my = enchant.level.player;
                var a = Vector(this.x + this.image.width/2, this.y + this.image.height/2);
                var c = Vector(my.x + my.image.width/2, my.y + my.image.height/2);
                c.sub(a);
                var b = new Bullet(this.x + this.image.width/2, this.y + 100);
                //console.log(a.x);
                b.v.x = c.x;
                b.v.y = c.y;
                enchant.level.bullets.push(b);
                enchant.game.currentScene.addChild(b);
            }
        }
    });
})();