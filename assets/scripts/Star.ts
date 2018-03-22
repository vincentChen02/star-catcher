
// import { Game } from "./Game";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property(cc.Integer)
    private pickRadius: number = 0;
    private game;

    public init(game) {
        this.game = game;
    }
    //计算星星与主角的距离
    getPlayerDistance() {
        let playerPosition = this.game.playerNode.getPosition();
        //返回两点间距离
        let dist = cc.pDistance(playerPosition, this.node.position);
        return dist;
    }
    //完成当前收集
    onPicked() {
        //得分 销毁 生成
        this.game.spawnNewStar();
        this.game.getScore();
        this.node.destroy();
    }
    update(dt: number) {
        // 每帧判断和主角之间的距离是否小于收集距离
        let dis = this.getPlayerDistance();
        if (dis < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        // 根据 Game 脚本中的计时器更新星星的透明度
        let opacityRatio = 1 - this.game.timer / this.game.starDuration;
        let minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}
