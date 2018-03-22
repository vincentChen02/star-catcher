"use strict";
cc._RF.push(module, 'de2d24J3K1M/bLbZTf6n6H+', 'Game');
// scripts/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
// import { Player } from "./Player";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 这个属性引用了星星的预制资源
        _this.starPrefab = null;
        //星星显示持续时间
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        //地面节点，用于确定星星的高度
        _this.groundNode = null;
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        _this.playerNode = null;
        _this.scoreLabel = null;
        // 得分音效资源
        _this.scoreAudio = null;
        return _this;
    }
    //初始化
    Game.prototype.onLoad = function () {
        this.groundY = this.groundNode.y + this.groundNode.height / 2;
        this.timer = 0;
        this.score = 0;
        this.starDuration = 0;
        this.scoreLabel.string = 'Score: ' + this.score.toString();
        this.spawnNewStar();
    };
    // 生成一个新的星星
    Game.prototype.spawnNewStar = function () {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.starSpawnPosition());
        newStar.getComponent('Star').init(this);
        // 重置计时器
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    };
    //星星生成位置
    Game.prototype.starSpawnPosition = function () {
        //星星坐标
        var randY = 0, randX = 0;
        randY = this.groundY + cc.random0To1() * this.playerNode.getComponent('Player').jumpHeight + 50; //50是星星与主角最大的收集距离
        var maxX = this.node.width / 2; //根据屏幕宽度生成
        randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
    };
    //在星星最大时限内没有吃到星星，游戏失败
    Game.prototype.update = function (dt) {
        if (this.timer > this.starDuration) {
            return this.gameOver();
        }
        this.timer += dt;
    };
    //得分
    Game.prototype.getScore = function () {
        this.score += 1;
        this.scoreLabel.string = 'Score: ' + this.score.toString();
        // 播放音效 不加as any就会报错
        cc.audioEngine.play(this.scoreAudio, false, 1);
    };
    //游戏失败
    Game.prototype.gameOver = function () {
        this.playerNode.stopAllActions();
        cc.director.loadScene('game');
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "groundNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNode", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "scoreAudio", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();