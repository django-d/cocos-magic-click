"use strict";
cc._RF.push(module, '42471QDevlP/Zz1JgJEoNEn', 'Item');
// Script/Item.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ItemE_1 = require("./ItemE");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedCardNodes = [];
        _this.selectedCards = [];
        _this.removeCardNodes = [];
        _this.removeCards = [];
        return _this;
    }
    Item.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveTouch.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndTouch.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onEndTouch.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMoveTouch.bind(this));
        this.node.children.forEach(function (n, i) {
            n.getComponent(ItemE_1.default).card = i;
            // n.zIndex = i;
        });
    };
    Item.prototype.onMoveTouch = function (event) {
        var target = event.target;
        var loca = event.touch.getLocation();
        var start = event.touch.getStartLocation();
        var point = target.convertToNodeSpaceAR(loca);
        var s = target.convertToNodeSpaceAR(start);
        this.check(s, point);
        // console.log(event.touch);
    };
    Item.prototype.check = function (start, point) {
        this.node.children.forEach(function (n) {
            var comp = n.getComponent(ItemE_1.default);
            if (comp) {
                comp.onMove(start, point);
            }
        });
    };
    Item.prototype.onCancelTouch = function () {
        // 把自身加入
        console.log('cancel...');
    };
    Item.prototype.addselectCard = function (node, card) {
        if (!cc.js.array.contains(this.selectedCardNodes, node)) {
            this.selectedCardNodes.push(node);
            this.selectedCards.push(card);
        }
    };
    Item.prototype.removeSelectCard = function (node, card) {
        if (!cc.js.array.contains(this.removeCardNodes, node)) {
            this.removeCardNodes.push(node);
            this.removeCards.push(card);
        }
    };
    Item.prototype.cancelSelectCard = function (node, card) {
        if (node.y === 0) {
            if (cc.js.array.contains(this.selectedCardNodes, node)) {
                cc.js.array.remove(this.selectedCardNodes, node);
                cc.js.array.remove(this.selectedCards, card);
            }
        }
        else {
            if (cc.js.array.contains(this.removeCardNodes, node)) {
                cc.js.array.remove(this.removeCardNodes, node);
            }
        }
    };
    Item.prototype.onStartTouch = function () {
    };
    Item.prototype.onEndTouch = function () {
        cc.js.array.removeArray(this.selectedCardNodes, this.removeCardNodes);
        cc.js.array.removeArray(this.selectedCards, this.removeCards);
        for (var _i = 0, _a = this.selectedCardNodes; _i < _a.length; _i++) {
            var element = _a[_i];
            this.upTo20(element);
        }
        for (var _b = 0, _c = this.removeCardNodes; _b < _c.length; _b++) {
            var element = _c[_b];
            this.down0(element);
        }
        this.removeCardNodes = [];
        this.removeCards = [];
        console.log(this.selectedCardNodes);
        console.log(this.selectedCards);
        if (this.selectedCardNodes.length === 1) {
        }
    };
    Item.prototype.upTo20 = function (node) {
        var comp = node.getComponent(ItemE_1.default);
        comp.selected = false;
        node.color = node.getComponent(ItemE_1.default).ocolor;
        node.y = 20;
        // node.runAction(cc.moveTo(0.1, cc.p(node.x, 20)));
    };
    Item.prototype.down0 = function (node) {
        var comp = node.getComponent(ItemE_1.default);
        comp.selected = false;
        node.color = node.getComponent(ItemE_1.default).ocolor;
        node.y = 0;
        // node.runAction(cc.moveTo(0.1, cc.p(node.x, 0)));
    };
    Item = __decorate([
        ccclass
    ], Item);
    return Item;
}(cc.Component));
exports.default = Item;

cc._RF.pop();