(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '03aed5p83tO2KSe3HfVILCv', 'Star', __filename);
// scripts/Star.ts

Object.defineProperty(exports, "__esModule", { value: true });
// import { Game } from "./Game";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickRadius = 0;
        return _this;
    }
    Star.prototype.init = function (game) {
        this.game = game;
    };
    //计算星星与主角的距离
    Star.prototype.getPlayerDistance = function () {
        var playerPosition = this.game.playerNode.getPosition();
        //返回两点间距离
        var dist = cc.pDistance(playerPosition, this.node.position);
        return dist;
    };
    //完成当前收集
    Star.prototype.onPicked = function () {
        //得分 销毁 生成
        this.game.spawnNewStar();
        this.game.getScore();
        this.node.destroy();
    };
    Star.prototype.update = function (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        var dis = this.getPlayerDistance();
        if (dis < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    };
    __decorate([
        property(cc.Integer)
    ], Star.prototype, "pickRadius", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.default = Star;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Star.js.map
        