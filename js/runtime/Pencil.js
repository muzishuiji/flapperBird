// 铅笔类
import Sprite from '../base/Sprite.js'
import DataStore from '../base/DataStore.js'
class Pencil extends Sprite {
	constructor(image, top) {
		super(image,
                0,0,
                image.width, image.height,
				DataStore.getInstance().canvas.width, 0, // 初始位置处于屏幕以外的右侧和上方
				image.width, image.height
            );
        this.top =top;
        this.moveSpeed = 2
    }
    draw() {
        this.x -= this.moveSpeed;  // 控制铅笔的移动
        super.draw(this.img,
            0,0,
            this.srcW,this.srcH,
            this.x, this.y,
            this.width, this.height)
    }
}

export default  Pencil;