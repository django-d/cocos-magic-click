(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/ItemE.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9cb0288M2VL4qvZHIBjS01P', 'ItemE', __filename);
// Script/ItemE.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Helloworld_1 = require("./Helloworld");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ItemE = /** @class */ (function (_super) {
    __extends(ItemE, _super);
    function ItemE() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selected = false;
        _this.group = 0;
        return _this;
    }
    ItemE.prototype.onLoad = function () {
        this.ocolor = this.node.color;
    };
    ItemE.prototype.onMove = function (start, point) {
        console.log(start, point);
        var left = start.x - point.x > 0;
        var next = this.node.parent.children[this.node.zIndex + 1];
        var spacx = next ? next.x - this.node.x : this.node.width; // 获得间隔
        var yFlag = (point.y > -this.node.height / 2) && (point.y <= this.node.height / 2);
        var xFlag = (((this.node.x + spacx) > start.x && point.x > this.node.x) && !left)
            || ((point.x < (this.node.x + spacx) && this.node.x < start.x) && left);
        console.log(xFlag);
        var item = this.node.parent.parent.getComponent(Helloworld_1.default);
        if (xFlag) {
            // 在范围内
            if (!this.selected && this.node.y === 0) {
                // 发消息我被选中啦
                console.log('选中要要弹起来');
                item.addselectCard(this.node, this.card);
                // emitEvent('addSelectCard', this.node, this.card);
            }
            else if (!this.selected && this.node.y !== 0) {
                // 我要被点下去了
                console.log('要被点下去');
                item.removeSelectCard(this.node, this.card);
                // emitEvent('removeSelectCard', this.node, this.card);
            }
            this.selected = true;
            this.node.color = cc.color(16, 16, 16);
        }
        else {
            // 没在范围内
            if (this.selected) {
                this.node.color = this.ocolor;
                this.selected = false;
                item.cancelSelectCard(this.node, this.card);
                console.log('取消选择。。。');
            }
        }
    };
    ItemE.prototype.onClick = function (node) {
        // 不是自己
        if (node !== this.node) {
        }
    };
    ItemE = __decorate([
        ccclass
    ], ItemE);
    return ItemE;
}(cc.Component));
exports.default = ItemE;

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
        //# sourceMappingURL=ItemE.js.map
        