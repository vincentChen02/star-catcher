
// import { Player } from "./Player";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    // 这个属性引用了星星的预制资源
    @property(cc.Prefab)
    private starPrefab: cc.Prefab = null;

    //星星显示持续时间
    @property(cc.Integer)
    private maxStarDuration: number = 0;
    @property(cc.Integer)
    private minStarDuration: number = 0;

    //地面节点，用于确定星星的高度
    @property(cc.Node)
    public groundNode: cc.Node = null;
    // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    @property(cc.Node)
    public playerNode: cc.Node = null;

    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    // 得分音效资源
    @property(cc.AudioClip)
    private scoreAudio: cc.AudioClip = null;

    //地平面Y坐标
    private groundY: number;
    // 定时器
    public timer: number;
    // 星星存在的持续时间
    public starDuration: number;
    // 当前分数
    private score: number;

    //初始化
    protected onLoad() {
        this.groundY = this.groundNode.y + this.groundNode.height / 2;
        this.timer = 0;
        this.score = 0;
        this.starDuration = 0;
        this.scoreLabel.string = 'Score: ' + this.score.toString();

        this.spawnNewStar();
    }

    // 生成一个新的星星
    private spawnNewStar() {
        let newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.starSpawnPosition());
        newStar.getComponent('Star').init(this);
        // 重置计时器
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }
    //星星生成位置
    private starSpawnPosition() {
        //星星坐标
        let randY = 0, randX = 0;
        randY = this.groundY + cc.random0To1() * this.playerNode.getComponent('Player').jumpHeight + 50;//50是星星与主角最大的收集距离
        let maxX = this.node.width / 2;//根据屏幕宽度生成
        randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
    }
    //在星星最大时限内没有吃到星星，游戏失败
    protected update(dt) {
        if (this.timer > this.starDuration) {
            return this.gameOver();
        }
        this.timer += dt;
    }
    //得分
    public getScore() {
        this.score += 1;
        this.scoreLabel.string = 'Score: ' + this.score.toString();
        // 播放音效 不加as any就会报错
        cc.audioEngine.play(this.scoreAudio as any, false, 1);
    }
    //游戏失败
    private gameOver() {
        this.playerNode.stopAllActions();
        cc.director.loadScene('game');
    }
}
