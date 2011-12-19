enchant();

(function() {
    enchant.Player = Class.create(enchant.Character, {
        initialize:function(x, y, image, map) {
            Character.call(this, x, y, image, map);
            this.ax = 0;
            this.ay = 0;
            this.pose = 0;
            this.HP = 30;
            this.isDamaged = false;
            this.iniTimer = false;
            this.frameCount = 0;
            this.jumping = true;
            this.jumpBoost = 0;
            this.map = map;
            this.bullet_se = enchant.Sound.load('bullet.wav', 'audio/wav');
            this.bullet_se.volume = 0.3;
            this.timer = new Timer(15);// �_���[�W��̖��G���ԂɃZ�b�g 30
            //this.bulTimer = new Timer(10);// SE���d�߂���̂ŘA�Ő����p
            //this.bulTimer.play();
            this.addEventListener('abuttonup', function() {
                this.shot(1);
            });/**/
            // game�ɖ���ǉ����Ă���������...
            if (enchant.game.levelNum == 0 && !enchant.game.iniedPlayer) {
                enchant.game.addEventListener('abuttonhasbeendown', function() {
                    //if (enchant.level.bear.bulTimer.isOver()) {
                        if (enchant.game.input.up) {
                            enchant.level.bear.shot(1, 1);
                        } else if (enchant.game.input.down) {
                            enchant.level.bear.shot(1, 2);
                        } else {
                            enchant.level.bear.shot(1, 0);
                        }
                });
                enchant.game.addEventListener('startbuttonhasbeendown', function() {
                    if (!enchant.game.isPaused) {
                        enchant.game.isPaused = true;
                        enchant.game.p.text = "PAUSED";
                        enchant.game.pause();
                       
                    } else {
                        enchant.Game.start();
                        enchant.game.p.text = "";
                        enchant.game.isPaused = false;
                    }
                });
                enchant.game.iniedPlayer = true;// gameOver���ɂ��ǉ�����Ă��܂��̂Ŏd���Ȃ�
            }
            /*this.addEventListener('abuttonhasbeendown', function() {
                this.shot(1);
            });*/
            this.ses = new Array();
        },
        shot: function(type, dir) {
            console.log("shot");// 3��Ă΂�Ă���I�H
            var se = enchant.Sound.load('bullet2.mp3', 'audio/mp3');
            se.volume = 0.1;
            se.play();
            //this.bulTimer.set(10);
            //this.bulTimer.play();
            
            switch (type) {
                case 0:
                    var b = new Bullet(24, 24, new Vector(1, 0), 20, this, 'Player');
                    enchant.level.bullets.push(b);
                    enchant.level.addChild(b);
                    break;
                case 1:
                    var speed = 5;	                        // �X��bullet�̃X�s�[�h
                    var width = 30;                             // �ˌ�����bullets�̕�(degree)
                    var rad = 0;
                    switch (dir) {
                        case 0:
                            if (this.scaleX > 0) rad = Math.atan2(this.y - this.y, this.x + 160 - this.x);
                            else rad = Math.atan2(this.y - this.y, this.x - 160 - this.x);
                            break;
                        case 1:
                            if (this.scaleX > 0) rad = Math.atan2((this.y - 160) - this.y, this.x + 160 - this.x);
                            else rad = Math.atan2((this.y - 160) - this.y, this.x - 160 - this.x);
                            break;
                        case 2:
                            if (this.scaleX > 0) rad = Math.atan2((this.y + 160) - this.y, this.x + 160 - this.x);
                            else rad = Math.atan2((this.y + 160) - this.y, this.x - 160 - this.x);
                            break;
                    }
                    var rotation = 0.0;                         // �ŏI�I�ȌX��bullet�ɗ^����p�x(radian)

                    // �p�x�̊���U��
                    for (i = 0; i < 5; i++) {
                        var tmp = (4 - i) / 4.0;                // 0.0�`1.0�Ɋۂ߂�
                        tmp -= .5;	                        // -0.5�`0.5�ɂ���
                        //console.log(tmp);
                        var rot = tmp * width;	                // �p�x�����߂�
                        rotation = rad + rot * Math.PI / 180.0;
                        var vx = Math.cos(rotation) * speed;
                        var vy = Math.sin(rotation) * speed;
                        var b = new Bullet(24, 24, new Vector(vx, vy), 20, this, 'Player');
                        enchant.level.bullets.push(b);
                        enchant.level.addChild(b);
                    }
                    break;
            }
        },
        update:function() {
            this.update_motion_ex();
            this.damage_detection();

            this.timer.count();
            //this.bulTimer.count();
        },
        damage_detection:function() {// �_���[�W����A���S����
            if (this.isDamaged && !this.iniTimer) {
                this.timer.set(15);
                this.timer.play();
                this.iniTimer = true;
                this.v = this.scaleX > 0 ? new Vector(-7, -7) : new Vector(7, -7);// �_���[�W���̔���
            }
            if (this.isDamaged) {
                 this.frame = 3;
                 this.scaleX = this.v.x > 0 ? -1 : 1;
            }
            if (this.isDamaged && this.iniTimer && this.timer.isOver()) {
                this.iniTimer = false;
                this.isDamaged = false;
            }
            
            if (this.y > enchant.game.height) {
                var score = Math.round(this.x);//bear.x);
                this.frame = 3;
                this.v.y = -0;
                /*this.addEventListener('enterframe', function() {
                    this.v.y += 2;
                    this.y += Math.min(Math.max(this.v.y, -10), 10);
                    if (this.y > 320) {
                        enchant.game.end(score, score + 'mで死にました');
                    }
                });*/
                enchant.game.isOvered = true;
                this.removeEventListener('enterframe', arguments.callee);
            }
        },
        update_motion_ex:function() {
            // �ړ��ƃA�j���[�V����
            this.frame = 0;
            this.frameCount++;
            if (!this.isDamaged) {
                if (enchant.game.input.left) this.v.x = -7;//-6;
                if (enchant.game.input.right) this.v.x = 7;
                if (this.jumping) {
                if (!enchant.game.input.b) {
                }
                } else {
                    if (enchant.game.input.b) {
                        this.v.y = -20;//-40;//-20;
                    }
                }
            }
            
            // �A�j���[�V�����Fenchant.game.frame���Ɖ��̂������Ȃ�
            if (!this.isDamaged) {
                if (this.v.x != 0) {
                    if (this.frameCount % 3 == 0) {
                        this.pose++;
                        this.pose %= 2;// 0, 1�ɂ���
                    }
                    this.frame = this.pose + 1;// frame == 1, 2
                } else {
                    this.frame = 0;
                }
            }
            this.update_motion();
        }
    });
})();