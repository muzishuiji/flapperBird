// 导演类,控制整个游戏的逻辑
// 基于ES6实现单例模式
import DataStore from './base/DataStore.js'
import UpPencil from './runtime/UpPencil.js';
import DownPencil from './runtime/DownPencil.js';
class Director {
	constructor() {
		this.dataStore = DataStore.getInstance();
		this.moveSpeed = 2;
		this.height = this.dataStore.canvas.height / 2;
	}
	static getInstance() {
		if(!Director.instance) {
			Director.instance = new Director();
		}
		return Director.instance;
	}
	createPencil() {
		let minTop = this.dataStore.canvas.height / 8;
		let maxTop = this.dataStore.canvas.height / 2;
		let top = minTop + Math.random() * (maxTop - minTop);
		this.dataStore.get('pencils').push(new UpPencil(top), new DownPencil(top));
	}
	// 判断小鸟是否撞击铅笔
	static isStrike(birds, pencil) {
		let s= false;
		if(birds.right < pencil.left || birds.top >  pencil.bottom
		|| birds.bottom <  pencil.top || birds.left >  pencil.right) {
			s = true; 
		}
		return !s;
	}
	// 判断小鸟是否撞击地板和铅笔
	check() {
		const birds = this.dataStore.get('birds');
		const land = this.dataStore.get('land');
		const pencils = this.dataStore.get('pencils');
		const score = this.dataStore.get("score");
		// 地板的撞击判断
		
		if((birds.birdsY[0] + birds.birdsHeight[0]) >= land.y) {
			this.isGameOver = true;
			return;
		}
		const birdsBorder = {
			top: birds.y[0],
			bottom: birds.birdsY[0] + birds.birdsHeight[0],
			left: birds.birdsX[0],
			right: birds.birdsX[0] + birds.birdsWidth[0]
		}
		const length = pencils.length;
		for(let i = 0; i < length; i++) {
			const pencil = pencils[i];
			const pencilBorder = {
				top: pencil.y,
				bottom: pencil.y + pencil.height,
				left: pencil.x,
				right: pencil.x + pencil.width
			}
			if(Director.isStrike(birdsBorder, pencilBorder)) {
				this.isGameOver = true;
			}
		}
		// 加分逻辑 小鸟在画布上的水平位置大于第一组铅笔在画布上的水平位置加上铅笔的宽度
		// 则为跨过一个障碍物
		if(birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
			wx.vibrateLong({
				success: () => {
					console.log("我震动了~");
				}
			})
			score.isScore = false;
			score.scoreNumber++;
		}

	}
	// 给每一个小鸟绑定相应的事件
	birdsEvent() {
		for(let i = 0; i <=2; i++) {
			this.dataStore.get('birds').y[i] = 
				this.dataStore.get("birds").birdsY[i];
		}
		this.dataStore.get("birds").time = 0;
	}
	run() {
		this.check();
		if(!this.isGameOver) {
			this.dataStore.get('background').draw();
			const pencils = this.dataStore.get('pencils');
			if(pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
				this.dataStore.get("score").isScore = true;
				pencils.shift();
				pencils.shift();
			}
			if(pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
				this.createPencil();
			}
			pencils.forEach(value => {
				value.draw();
			});
			
			this.dataStore.get('birds').draw();
			this.dataStore.get('land').draw();
			this.dataStore.get("score").draw();
			let timer = requestAnimationFrame(() => this.run(), 100);
			this.dataStore.put("timer", timer);
		} else {
			this.dataStore.get("startButton").draw();
			cancelAnimationFrame(this.dataStore.get("timer"));
			this.dataStore.destory();
			// 加快垃圾回收
			wx.triggerGC();
		}
	}
}
export default  Director;


