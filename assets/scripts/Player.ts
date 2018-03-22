
const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // 主角跳跃高度
    @property(cc.Integer)
    private jumpHeight: number = 0;
    // 主角跳跃持续时间
    @property(cc.Integer)
    private jumpDuration: number = 0;
    // 最大移动速度
    @property(cc.Integer)
    private maxMoveSpeed: number = 0;
    // 加速度
    @property(cc.Integer)
    private accel: number = 0;
    // 跳跃音效资源
    @property(cc.AudioClip)
    private jumpAudio: cc.AudioClip = null;

    @property(cc.Action)
    private jumpAction: cc.Action = null;

    private accLeft: boolean = false;
    private accRight: boolean = false;
    private xSpeed: number = 0;

    onLoad() {
        //初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        // 初始化事件监听
        this.initEvent();
    }

    private setJumpAction() {
        // 跳跃上升
        let jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        let jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        // // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        let callback = cc.callFunc(this.playJumpSound, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    }

    /** 调用声音引擎播放声音*/
    private playJumpSound() {
        cc.audioEngine.play(this.jumpAudio as any, false, 1);
    }
    /**设置键盘输入控制 */
    private initEvent() {
        let self = this;
        // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.KEY.left:
                    self.accLeft = true;
                    break;
                case cc.KEY.d:
                    self.accRight = true;
                    break;
                case cc.KEY.right:
                    self.accRight = true;
                    break;
            }
        })

        //有按键松开时，停止加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            switch (event.keyCode) {
                case cc.KEY.a:
                    self.accLeft = false;
                    break;
                case cc.KEY.left:
                    self.accLeft = false;
                    break;
                case cc.KEY.d:
                    self.accRight = false;
                    break;
                case cc.KEY.right:
                    self.accRight = false;
                    break;
            }
        })

        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd, this);
    }

    private moveLeft() {
        this.accLeft = true;
        this.accRight = false;
    }

    private moveRight() {
        this.accLeft = false;
        this.accRight = true;
    }

    private stopMove() {
        this.accLeft = false;
        this.accRight = false;
    }

    private onScreenTouchStart(event: cc.Event.EventTouch) {
        if (event.getLocationX() > cc.winSize.width / 2) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    private onScreenTouchEnd() {
        this.stopMove();
    }
    protected update(dt: number) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        if (this.node.x <= -this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
        }
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
        }
    }

}
