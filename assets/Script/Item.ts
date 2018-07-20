import ItemE from "./ItemE";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMoveTouch.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.onEndTouch.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onEndTouch.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_START, this.onMoveTouch.bind(this));
        this.node.children.forEach((n, i) => {
            n.getComponent(ItemE).card = i;
            // n.zIndex = i;
        });
    }

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
        this.node.children.forEach((n) => {
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

    onStartTouch() {

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
        }
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