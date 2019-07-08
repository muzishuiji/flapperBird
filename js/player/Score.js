import DataStore from "../base/DataStore.js";

// 积分器类
class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = true;
    }
    draw() {
        this.ctx.font = '28px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width / 2,
            DataStore.getInstance().canvas.height / 18,
            1000
        );
    }
}
export default  Score;