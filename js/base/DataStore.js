// 这是一个变量缓存器,方便我们在不同的类中访问和修改变量
class DataStore {
    static getInstance() {
        if(!DataStore.instance) {
            DataStore.instance = new DataStore();
        } 
        return DataStore.instance;
    }
    constructor() {
        // 定义一个map结构来存储公共的数据
        this.map = new Map();
    }
    // 定义一些操作map的方法
    put(key, value) {
        if(typeof value == 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }
    get(key) {
        return this.map.get(key);
    }
    destory() {
        for(let value of this.map.values()) {
            value = null; 
        }
    }
}
export default  DataStore;