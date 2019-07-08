// 资源文件加载器,确保在图片资源完成后才进行渲染
import 	Resources from './Resources.js'
class ResourceLoader {
	constructor(){
		// 将一个数组转换成一个键值对的集合,遍历map结构用for...of
		this.map = new Map(Resources);
		for(let [key,value] of this.map) {
			const image =wx.createImage();
			image.src = value;
			this.map.set(key, image);
		}
	}
	onloaded(callback) {
		let loadedCount = 0;
		for(let value of this.map.values()) {
			value.onload = () => {
				loadedCount++;
				if(loadedCount >= this.map.size) {
					callback(this.map);
				}
			}
		}
	}
	static create() {
		return new ResourceLoader();
	}
}
export default  ResourceLoader;