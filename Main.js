// 初始化整个游戏的精灵,作为游戏的开始入口
import ResourceLoader from './js/base/ResourceLoader.js'
import DataStore from './js/base/DataStore.js'
import Director from './js/Director.js'
import BackGround from './js/runtime/BackGround.js'
import Land from './js/runtime/Land.js'
import Birds from './js/player/Birds.js';
import StartButton from './js/player/StartButton.js';
import Score from './js/player/Score.js';
import ApiExamples from './js/ApiExamples.js';
 class Main {
	constructor() {
		this.canvas = wx.createCanvas();
		this.ctx = this.canvas.getContext("2d");
		this.dataStore = DataStore.getInstance();  // 获取这个构造函数的单例
		this.dataStore.canvas = this.canvas;
		this.director = Director.getInstance();
		const loader =  ResourceLoader.create();
		loader.onloaded((map => this.onResourceFirstLoaded(map)));
	}
	// 床架背景音乐
	createBackgroundMusic() {
		const innerAudioContext = wx.createInnerAudioContext()
		innerAudioContext.autoplay = false;
		innerAudioContext.src = './audios/bgm.mp3'
		innerAudioContext.onPlay(() => {
			console.log('开始播放')
		})
		innerAudioContext.onError((res) => {
			console.log(res.errMsg)
			console.log(res.errCode)
		})
	}
	onResourceFirstLoaded(map) {
		// 资源第一次加载完毕后的初始化, 可以长期保存到数据,
		// 不需要随着游戏的状态而变化的数据就放在实例的属性里,随时需要变动的数据放在实例的map结构里
		this.dataStore.ctx = this.ctx;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
		this.dataStore.res = map;
		this.createBackgroundMusic();
		const examples = new ApiExamples();
		examples.getUserInfo();
		this.init();
	 }
	 init() {
		this.director.isGameOver = false; 
		this.dataStore.put("pencils", [])
					  .put("birds", Birds)
					  .put("background", BackGround)
					  .put("land", Land)
					  .put("score", Score)
					  .put("startButton", StartButton);
		this.registerEvent()
		this.director.createPencil();
		this.director.run();
		
	 }
	 registerEvent() {
		wx.onTouchStart(() => {
			if(this.director.isGameOver) {
				this.init();
			} else {
				this.director.birdsEvent();
			}
		})
	 }
}
export default Main;
