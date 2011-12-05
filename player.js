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
            this.timer = new Timer(30);// �_���[�W��̖��G���ԂɃZ�b�g
            /*this.addEventListener(enchant.Event.A_BUTTON_UP, function() {// konai
                console.log("abuttondown2");
                this.shot(1);
            });*/
            this.addEventListener('abuttonup', function() {// konai
                //console.log("abuttondown");
                this.shot(1);
            });/**/
            /*enchant.game.addEventListener('abuttondown', function() {// game�ɃC�x���g��ǉ����Ȃ��ƃ_���炵�� abuttonup�͂���
                enchant.world.bear.shot(1);
            });*/
            
            enchant.game.addEventListener('abuttonhasbeendown', function() {// game�ɃC�x���g��ǉ����Ȃ��ƃ_���炵�� abuttonup�͂���
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
            enchant.game.addEventListener(enchant.Event.A_BUTTON_DOWN, function(e) {// game�ɃC�x���g��ǉ����Ȃ��ƃ_���炵��
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
                    var speed = 5;	                                                                                        // �X��bullet�̃X�s�[�h
                    var width = 30;                                                                                         // �ˌ�����bullets�̕�(degree)
                    //rad = Math.Atan2(targetObject.position.Y - position.Y, targetObject.position.X - position.X);     // �S�̂Ƃ��Ă̊�ƂȂ����.
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
                    
                    var rotation = 0.0;                                                                                     // �ŏI�I�ȌX��bullet�ɗ^����p�x(radian)

                    // �p�x�̊���U��
                    for (i = 0; i < 5; i++) {
                        var tmp = (4 - i) / 4.0;              // 0.0�`1.0�Ɋۂ߂�
                        tmp -= .5;	                // -0.5�`0.5�ɂ���
                        //console.log(tmp);
                        var rot = tmp * width;	        // �p�x�����߂�
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
                        enchant.world.addChild(b);// currentScene���ƍ��W�X�V������Ȃ�
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
                this.v = new Vector(-10, -10);// �_���[�W���̔���
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
                        enchant.game.end(score, score + 'mで死にました');
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
            // �ړ��ƃA�j���[�V����
            this.frame = 0;
            this.d++;
            //console.log(enchant.game.frame);
            //console.log(this.d);// �������̃J�E���^�̂ق�������
            if (enchant.game.input.left) this.v.x = -4;
            if (enchant.game.input.right) {
                this.v.x = 4;
                //console.log(enchant.game.frame);
                //console.log(enchant.game);
                if (this.d % 4 == 0) {//enchant.game.frame���Ɠ����Ȃ��b...�I�I
                    this.pose++;
                    this.pose %= 2;
                }
                this.frame = this.pose + 1;
            }
            
            /*if (this.v.x != 0) {
                if (enchant.game.frame % 4 == 0) {
                    this.pose++;
                    this.pose %= 2;// 0, 1�ɂ���
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