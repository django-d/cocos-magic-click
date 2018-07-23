import ItemE from "./ItemE";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    @property(cc.Node)
    cards: cc.Node = null;

    @property
    text: string = 'hello';

    i: number = 0;

    onLoad() {
        this.cards.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveTouch.bind(this));
        this.cards.on(cc.Node.EventType.TOUCH_END, this.onEndTouch.bind(this));
        this.cards.on(cc.Node.EventType.TOUCH_CANCEL, this.onEndTouch.bind(this));
        this.cards.on(cc.Node.EventType.TOUCH_START, this.onMoveTouch.bind(this));
        this.cards.children.forEach((n, i) => {
            n.getComponent(ItemE).card = i;
            // n.zIndex = i;
        });
    }

    start() {
        // init logic
        this.label.string = this.text;

        const id = setInterval(() => {
            const flag = this.test();
            if (flag) clearInterval(id);
        }, 300);
    }

    test() {
        const node = cc.instantiate(this.item);
        node.parent = this.cards;
        node.zIndex = this.i;
        if (this.i > 2 && this.i < 5) {
            node.getComponent(ItemE).group = 1;
        }
        this.i++;
        return this.reset();
    }

    spacingX = 0;
    restrictWidth = 300;
    reset() {
        this.spacingX = this.item.data.width / 2;
        const targetCards = this.cards.children;
        let width = 0;
        let x = 0;
        const cu = (targetCards.length - 1) * this.spacingX + this.item.data.width - this.restrictWidth;
        if (cu > 0) {
            const d = cu / targetCards.length;
            this.spacingX -= d;
        } else {
            this.spacingX = this.item.data.width / 2;
        }
        targetCards.forEach((n, i) => {
            n.stopAllActions();
            if (i === 0) {
                x = - n.width / 2;
                width = n.width;
            }
            else {
                x -= this.spacingX / 2;
                n.x = i * this.spacingX;
                // n.runAction(cc.moveTo(0.2, cc.p(i * this.spacingX), n.y));
                width += this.spacingX;
            }
        });
        this.cards.width = width;
        this.cards.x = x;
        return this.i > 15;
    }


    ///////////////////-------------

    onMoveTouch(event) {
        const target: cc.Node = event.target;
        const loca = event.touch.getLocation();
        const start = event.touch.getStartLocation();
        const point = target.convertToNodeSpaceAR(loca);
        const s = target.convertToNodeSpaceAR(start);
        this.check(s, point);
        // console.log(event.touch);
    }

    check(start, point: cc.Vec2) {
        this.cards.children.forEach((n) => {
            const comp = n.getComponent(ItemE);
            if (comp) {
                comp.onMove(start, point);
            }
        });
    }

    onCancelTouch() {
        // 把自身加入
        console.log('cancel...');
    }
    selectedCardNodes = [];
    selectedCards = [];
    removeCardNodes = [];
    removeCards = [];
    addselectCard(node: cc.Node, card: number) {
        if (!cc.js.array.contains(this.selectedCardNodes, node)) {
            this.selectedCardNodes.push(node);
            this.selectedCards.push(card);
        }
    }
    removeSelectCard(node: cc.Node, card: number) {
        if (!cc.js.array.contains(this.removeCardNodes, node)) {
            this.removeCardNodes.push(node);
            this.removeCards.push(card);
        }
    }
    cancelSelectCard(node: cc.Node, card: number) {
        if (node.y === 0) {
            if (cc.js.array.contains(this.selectedCardNodes, node)) {
                cc.js.array.remove(this.selectedCardNodes, node);
                cc.js.array.remove(this.selectedCards, card);
            }
        } else {
            if (cc.js.array.contains(this.removeCardNodes, node)) {
                cc.js.array.remove(this.removeCardNodes, node);
            }
        }
    }

    onEndTouch() {
        cc.js.array.removeArray(this.selectedCardNodes, this.removeCardNodes);
        cc.js.array.removeArray(this.selectedCards, this.removeCards);
        for (const element of this.selectedCardNodes) {
            this.upTo20(element);
        }
        for (const element of this.removeCardNodes) {
            this.down0(element);
        }
        this.removeCardNodes = [];
        this.removeCards = [];
        console.log(this.selectedCardNodes);
        console.log(this.selectedCards);

        if (this.selectedCardNodes.length === 1) {
            let num = 0;
            const node = this.selectedCardNodes[0];
            const comp1 = node.getComponent(ItemE);
            this.cards.children.forEach((n) => {
                const comp2 = n.getComponent(ItemE);
                if (comp1.group === comp2.group) {
                    num++;
                }
            });
            this.onClick(this.selectedCardNodes[0], num);
            console.log(num);
        }
    }

    // 点一下扩散
    onClick(node: cc.Node, num: number) {
        if (!num) return;
        const diff = node.width / 2 - this.spacingX;
        // 不是自己
        const comp1 = node.getComponent(ItemE);
        this.songsan(node, num, diff);
    }

    songsan(node: cc.Node, num: number, diff: number) {
        if (this.spacingX === node.width / 2) return;
        this.reset();
        const targetCards = this.cards.children;
        let width = 0;
        let x = 0;
        let a = 0;
        let b = 0;
        const comp = node.getComponent(ItemE);
        // 根据数量变化
        const index = this.cards.children.indexOf(node);
        // TODO: 需要传进来有几个要散开的
        const songsanNodes = [this.cards.children[index - 1], node, this.cards.children[index + 1]];
        /**
         * 需要松散的数量
         */
        const n = songsanNodes.length;
        const songsanLen = n * node.width / 2;
        // node.width是保证最后一张牌也在范围内 不然最后一张牌就出去了
        const jinLen = (this.cards.width - songsanLen - node.width) / (this.cards.children.length - 1 - n)
        let xRecord = 0;
        console.log('节点宽度', this.cards.width)
        targetCards.forEach((n, i) => {
            if (i === 0) {
                n.x = xRecord;
            } else {
                if (songsanNodes.indexOf(targetCards[ i-1 ]) >= 0) {
                    xRecord += node.width / 2;
                } else {
                    xRecord += jinLen;
                }
                n.x = xRecord;
            }
        })
        console.log('节点宽度', this.cards.width)
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
    }

    upTo20(node: cc.Node) {
        const comp = node.getComponent(ItemE);
        comp.selected = false;
        node.color = node.getComponent(ItemE).ocolor;
        node.y = 20;
        // node.runAction(cc.moveTo(0.1, cc.p(node.x, 20)));
    }

    down0(node) {
        const comp = node.getComponent(ItemE);
        comp.selected = false;
        node.color = node.getComponent(ItemE).ocolor;
        node.y = 0;
        // node.runAction(cc.moveTo(0.1, cc.p(node.x, 0)));
    }
}
