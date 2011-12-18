/*enchant();

(function() {*/
    enchant.World = Class.create(Group, {
        initialize:function(){
            Group.call(this);
            this.addEventListener('enterframe', function() {
                this.update();
            });
            this.playerPos = 90;//64
            this.clearPos = 3100;
            this.levelNum = 0;
            this.levels = new Array();
            this.levels.push(new Level1());
            enchant.game.gameScene.addChild(this.levels[this.levelNum]);
        },
        update:function() {
            var n = enchant.world.levelNum;
            this.collide();
            enchant.level.x = enchant.world.playerPos - enchant.level.bear.x;
            var fallNum = 0;
            enchant.level.enemies.forEach(function(e, j) {
                if (e.y > enchant.game.height && e.isAlive) {
                    e.pop(j);
                    fallNum++;
                }
            });
            //if (fallNum > 0) console.log(fallNum);
            //if (enchant.world.bullets.length > 0) console.log(enchant.world.bullets[0].v.x);
            if (enchant.level.bear.x > enchant.world.clearPos) {
                enchant.game.isCleared = true;
            }
        },
        collide:function() {
            var n = enchant.world.levelNum;
                // characterÇ∆bullet
                enchant.level.bullets.forEach(function(b, i) {
                    var ishit = false;
                    if (b.isHostile) {// ìGëÆê´Ç»ÇÁ
                        ishit = enchant.level.bear.intersect(b);
                        if (ishit) {
                            enchant.level.bear.HP--;
                            b.pop(i);
                        }
                    } else {
                        enchant.level.enemies.forEach(function(e, j) {
                            //if (e.isAlive) {
                                ishit = e.intersect(b);
                                if (ishit) {
                                    console.log("hit");
                                    enchant.game.score += 100;
                                    e.HP--;
                                    b.pop();
                                    if (e.HP <= 0) {
                                        enchant.game.score += 500;
                                        var ef = new Effect(16, 16, enchant.game.assets['effect0.gif'], 5, new Vector(e.x, e.y));
                                        enchant.level.addChild(ef);
                                        e.pop(j);
                                    }
                                }
                        })
                    }
                })
                // playerÇ∆enemy
                var bear = enchant.level.bear;
                enchant.level.enemies.some(function(e, i) {
                    if (!bear.isDamaged && bear.intersect(e)) {
                        bear.HP--;
                        bear.isDamaged = true;
                        console.log("damaged!");
                        return false;
                    }
                })
            }
    });
//})();