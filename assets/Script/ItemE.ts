import Item from "./Helloworld";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemE extends cc.Component {

    selected: boolean = false;



    card: number;

    ocolor: cc.Color;

    group: number = 0;

    onLoad() {
        this.ocolor = this.node.color;
    }

    onMove(start: cc.Vec2, point: cc.Vec2) {
        console.log(start, point);
        const left = start.x - point.x > 0;
        const next = this.node.parent.children[this.node.zIndex + 1];
        const spacx = next ? next.x - this.node.x : this.node.width;  // 获得间隔
        const yFlag = (point.y > - this.node.height / 2) && (point.y <= this.node.height / 2);
        const xFlag = (((this.node.x + spacx) > start.x && point.x > this.node.x) && !left)
            || ((point.x < (this.node.x + spacx) && this.node.x < start.x) && left);
        console.log(xFlag);
        const item = this.node.parent.parent.getComponent(Item);
        if (xFlag) {
            // 在范围内
            if (!this.selected && this.node.y === 0) {

                // 发消息我被选中啦
                console.log('选中要要弹起来');
                item.addselectCard(this.node, this.card);
                // emitEvent('addSelectCard', this.node, this.card);
            } else if (!this.selected && this.node.y !== 0) {
                // 我要被点下去了
                console.log('要被点下去');
                item.removeSelectCard(this.node, this.card);
                // emitEvent('removeSelectCard', this.node, this.card);
            }
            this.selected = true;
            this.node.color = cc.color(16, 16, 16);
        } else {
            // 没在范围内
            if (this.selected) {
                this.node.color = this.ocolor;
                this.selected = false;
                item.cancelSelectCard(this.node, this.card);
                console.log('取消选择。。。');
            }
        }
    }

    onClick(node: cc.Node) {
        // 不是自己
        if (node !== this.node) {

        }
    }
}