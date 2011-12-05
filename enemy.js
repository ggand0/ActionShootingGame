enchant();

(function() {
    enchant.Enemy = Class.create(enchant.Character, {
        initialize:function(x, y, image, map, pos, type) {
            Character.call(this, x, y, image, map);
            this.HP = 3;
            this.v.x = -3;
            //this.x = 100;
            this.type = type;
            this.x = pos.x;
            this.y = pos.y;//this.pos = pos;
        },
        update:function() {
            this.update_motion();
            r = Math.floor(Math.random()*30);
            if (r == 0) {
              this.shot();
            }
            //if (this.y > enchant.game.height) this.pop();
        },
        shot:function() {
            //r = Math.floor(Math.random()*2);
            switch(this.type) {
                case 0:
                    if (enchant.game.frame % 30 == 0) {
                        var b = new Bullet(24, 24//this.x + 16, this.y + this.offset
                                , new Vector(-1, 0), 10, this, 'Enemy');
                        enchant.world.bullets.push(b);
                        enchant.world.addChild(b);
                        //enchant.game.currentScene.addChild(b);
                    }
                    break;
                case 1:
                    var s = new Vector(0, 0);
                    s.x = Math.atan2(enchant.world.bear.x - this.x, enchant.world.bear.y - this.y);
                    
                    var b = new Bullet(24, 24, s, 10, this, 'Enemy');
                    break;
            }
        },
        pop:function(i) {
            this.isAlive = false;
            enchant.world.removeChild(this);
            enchant.world.enemies.splice(i, 1);//(this, 1);
            this.removeEventListener('enterframe', arguments.callee);
            //console.log(enchant.world.enemies.length);
            delete this;
            console.log("dead");
        }
    });
    enchant.ChaseEnemy = Class.create(enchant.Enemy, {
        initialize:function(x, y, image, map, pos, type) {
            enchant.Enemy.call(this, x, y, image, map, pos, type);
            this.HP = 2;
        },
        update:function() {
            this.v.x = this.x < enchant.world.bear.x ? 3 : -3;
            this.update_motion_ex();
        },
        update_motion_ex:function() {
            if (enchant.game.frame % 60 == 0) this.v.y = -20;
            this.update_motion();
        }
    });
    enchnat.ChargeEnemy = Class.create(enchant.Enemy, {
        initialize:function(x, y, image, map, pos, type) {
            enchant.Enemy.call(this, x, y, image, map, pos, type);
            this.HP = 2;
            this.v.x = 3;
        },
        update:function() {
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