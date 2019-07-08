// 循环渲染3只小鸟
import Sprite from "../base/Sprite.js";
import DataStore from "../base/DataStore.js";

class Birds extends Sprite{
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 
            0,0,
            image.width, image.height,
            0,0,
            image.width, image.height)
        this.clippingX = [9,9+34+18,9+34+18+34+18]; // 裁剪的x轴位置
        this.clippingY = [10,10,10];  // 裁剪的y轴位置
        this.clippingWidth = [34,34,34]; // 裁剪的宽度
        this.clippingHeight = [24,24,24]; // 裁剪的高度
        const birdX = DataStore.getInstance().canvas.width / 4; // 画布上x轴的位置
        const birdY = DataStore.getInstance().canvas.height / 2; // 画布上y轴的位置
        this.birdsX = [birdX, birdX, birdX];
        this.birdsY = [birdY, birdY, birdY];
        this.y = [birdY, birdY, birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }
    draw() {
        this.count = this.count + 0.2;
        if(this.index >= 2) {
            this.count = 0;
        }
        // 减速器的作用
        this.index = Math.floor(this.count);
        // 重力加速度
        const g = 0.98 / 2.5;
        const offsetUp = 30;
        const offsetY = (g * this.time *( this.time - offsetUp)) / 2;
        for(let i = 0 ; i <= 2; i++) {
            this.birdsY[i] = parseInt(this.y[i] + offsetY);
        }
        this.time++;
        super.draw(
            this.img,
            this.clippingX[this.index],this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index],this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        );
    }
}
export default  Birds;