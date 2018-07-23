"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Helloworld');
// Script/Helloworld.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ItemE_1 = require("./ItemE");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Helloworld = /** @class */ (function (_super) {
    __extends(Helloworld, _super);
    function Helloworld() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.item = null;
        _this.cards = null;
        _this.text = 'hello';
        _this.i = 0;
        _this.spacingX = 0;
        _this.restrictWidth = 300;
        _this.selectedCardNodes = [];
        _this.selectedCards = [];
        _this.removeCardNodes = [];
        _this.removeCards = [];
        return _this;
    }
    Helloworld.prototype.onLoad = function () {
        this.cards.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveTouch.bind(this));
        this.cards.on(cc.Node.EventType.TOUCH_END, this.onEndTouch.bind(this));
        this.cards.on(cc.Node.EventType.TOUCH_CANCEL, this.onEndTouch.bind(this));
        this.cards.on(cc.Node.EventType.TOUCH_START, this.onMoveTouch.bind(this));
        this.cards.children.forEach(function (n, i) {
            n.getComponent(ItemE_1.default).card = i;
            // n.zIndex = i;
        });
    };
    Helloworld.prototype.start = function () {
        var _this = this;
        // init logic
        this.label.string = this.text;
        var id = setInterval(function () {
            var flag = _this.test();
            if (flag)
                clearInterval(id);
        }, 300);
    };
    Helloworld.prototype.test = function () {
        var node = cc.instantiate(this.item);
        node.parent = this.cards;
        node.zIndex = this.i;
        if (this.i > 2 && this.i < 5) {
            node.getComponent(ItemE_1.default).group = 1;
        }
        this.i++;
        return this.reset();
    };
    Helloworld.prototype.reset = function () {
        var _this = this;
        this.spacingX = this.item.data.width / 2;
        var targetCards = this.cards.children;
        var width = 0;
        var x = 0;
        var cu = (targetCards.length - 1) * this.spacingX + this.item.data.width - this.restrictWidth;
        if (cu > 0) {
            var d = cu / targetCards.length;
            this.spacingX -= d;
        }
        else {
            this.spacingX = this.item.data.width / 2;
        }
        targetCards.forEach(function (n, i) {
            n.stopAllActions();
            if (i === 0) {
                x = -n.width / 2;
                width = n.width;
            }
            else {
                x -= _this.spacingX / 2;
                n.x = i * _this.spacingX;
                // n.runAction(cc.moveTo(0.2, cc.p(i * this.spacingX), n.y));
                width += _this.spacingX;
            }
        });
        this.cards.width = width;
        this.cards.x = x;
        return this.i > 15;
    };
    ///////////////////-------------
    Helloworld.prototype.onMoveTouch = function (event) {
        var target = event.target;
        var loca = event.touch.getLocation();
        var start = event.touch.getStartLocation();
        var point = target.convertToNodeSpaceAR(loca);
        var s = target.convertToNodeSpaceAR(start);
        this.check(s, point);
        // console.log(event.touch);
    };
    Helloworld.prototype.check = function (start, point) {
        this.cards.children.forEach(function (n) {
            var comp = n.getComponent(ItemE_1.default);
            if (comp) {
                comp.onMove(start, point);
            }
        });
    };
    Helloworld.prototype.onCancelTouch = function () {
        // 把自身加入
        console.log('cancel...');
    };
    Helloworld.prototype.addselectCard = function (node, card) {
        if (!cc.js.array.contains(this.selectedCardNodes, node)) {
            this.selectedCardNodes.push(node);
            this.selectedCards.push(card);
        }
    };
    Helloworld.prototype.removeSelectCard = function (node, card) {
        if (!cc.js.array.contains(this.removeCardNodes, node)) {
            this.removeCardNodes.push(node);
            this.removeCards.push(card);
        }
    };
    Helloworld.prototype.cancelSelectCard = function (node, card) {
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
    Helloworld.prototype.onEndTouch = function () {
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
            var num_1 = 0;
            var node = this.selectedCardNodes[0];
            var comp1_1 = node.getComponent(ItemE_1.default);
            this.cards.children.forEach(function (n) {
                var comp2 = n.getComponent(ItemE_1.default);
                if (comp1_1.group === comp2.group) {
                    num_1++;
                }
            });
            this.onClick(this.selectedCardNodes[0], num_1);
            console.log(num_1);
        }
    };
    // 点一下扩散
    Helloworld.prototype.onClick = function (node, num) {
        if (!num)
            return;
        var diff = node.width / 2 - this.spacingX;
        // 不是自己
        var comp1 = node.getComponent(ItemE_1.default);
        this.songsan(node, num, diff);
    };
    Helloworld.prototype.songsan = function (node, num, diff) {
        if (this.spacingX === node.width / 2)
            return;
        this.reset();
        var targetCards = this.cards.children;
        var width = 0;
        var x = 0;
        var a = 0;
        var b = 0;
        var comp = node.getComponent(ItemE_1.default);
        // 根据数量变化
        var index = this.cards.children.indexOf(node);
        var songsanNodes = [this.cards.children[index - 1], node, this.cards.children[index + 1]];
        /**
         * 需要松散的数量
         */
        var n = songsanNodes.length;
        var songsanLen = n * node.width / 2;
        // node.width是保证最后一张牌也在范围内 不然最后一张牌就出去了
        var jinLen = (this.cards.width - songsanLen - node.width) / (this.cards.children.length - 1 - n);
        var xRecord = 0;
        console.log('节点宽度', this.cards.width);
        targetCards.forEach(function (n, i) {
            if (i === 0) {
                n.x = xRecord;
            }
            else {
                if (songsanNodes.indexOf(targetCards[i - 1]) >= 0) {
                    xRecord += node.width / 2;
                }
                else {
                    xRecord += jinLen;
                }
                n.x = xRecord;
            }
        });
        console.log('节点宽度', this.cards.width);
        // targetCards.forEach((n, i) => {
        //     n.stopAllActions();
        //     const comp1 = n.getComponent(ItemE);
        //     if (i === 0) {
        //         x = - n.width / 2;
        //         width = n.width;
        //     }
        //     else {
        //         if (comp.group === comp1.group) {
        //             n.x = i * (this.spacingX + diff);
        //             a++;
        //         } else {
        //             console.log(a);
        //             const xx = i * (this.spacingX) + (a + 1) * diff;
        //             n.x = xx - (b * ((a + 1) * diff / (targetCards.length - 1 - num)));
        //             b++;
        //         }
        //         x -= this.spacingX / 2;
        //         width += this.spacingX;
        //     }
        // });
        // this.cards.width = width;
        // this.cards.x = x;
    };
    Helloworld.prototype.upTo20 = function (node) {
        var comp = node.getComponent(ItemE_1.default);
        comp.selected = false;
        node.color = node.getComponent(ItemE_1.default).ocolor;
        node.y = 20;
        // node.runAction(cc.moveTo(0.1, cc.p(node.x, 20)));
    };
    Helloworld.prototype.down0 = function (node) {
        var comp = node.getComponent(ItemE_1.default);
        comp.selected = false;
        node.color = node.getComponent(ItemE_1.default).ocolor;
        node.y = 0;
        // node.runAction(cc.moveTo(0.1, cc.p(node.x, 0)));
    };
    __decorate([
        property(cc.Label)
    ], Helloworld.prototype, "label", void 0);
    __decorate([
        property(cc.Prefab)
    ], Helloworld.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], Helloworld.prototype, "cards", void 0);
    __decorate([
        property
    ], Helloworld.prototype, "text", void 0);
    Helloworld = __decorate([
        ccclass
    ], Helloworld);
    return Helloworld;
}(cc.Component));
exports.default = Helloworld;

cc._RF.pop();