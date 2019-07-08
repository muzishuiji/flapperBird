// 精灵的基类,负责初始化精灵加载的资源和大小以及位置
import DataStore from './DataStore.js'
class Sprite {
	constructor(
		img = null,         // 要剪裁的图片对象
		srcX= 0, srcY = 0,  //  剪裁的x坐标和y坐标
		srcW= 0, srcH = 0,  // 要剪裁图片的高度和宽度
		x=0, y = 0,         // 图形资源在画布上的摆放位置
		width = 0,height = 0 // 剪裁完之后要使用的宽度和高度
						) {
		this.dataStore = DataStore.getInstance();
		this.ctx = this.dataStore.ctx;
		this.img = img;
		this.srcX = srcX;
		this.srcY = srcY;
		this.srcW = srcW;
		this.srcH = srcH;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	static getImage(key) {
		return  DataStore.getInstance().res.get(key);
	}
	draw(	
		img = this.img,
		srcX = this.srcX,
		srcY = this.srcY,
		srcW = this.srcW,
		srcH = this.srcH,
		x = this.x,
		y = this.y,
		width = this.width,
		height = this.height
		) {
		this.ctx.drawImage(
				img,
				srcX,
				srcY,
				srcW,
				srcH,
				x,
				y,
				width,
				height
		)
	}
	
}
export default  Sprite;