
(function() {
    'use strict'
    // var Animal = function (name, age) {
    //     this.name = name;
    //     this.age = age;
    // }
    // Animal.prototype.say = function() {
    //     console.log(this.name + ' ' + this.age);
    // }

    // var cat = new Animal('小猫', 3);
    // cat.say();
    // Animal.prototype.say.apply(cat);
    // var params = {
    //     name: '小猫2',
    //     age: 4
    // };
    // cat.say.call(params);

    // 手动实现一个寄生组合继承
    // var Cat = function(name, age) {
    //     Animal.apply(this, arguments);
    // }
    // Cat.prototype = Object.create(Animal.prototype);
    // // 在继承的同时 根据自己的需求做特别的修改.既有继承又有自己的特色
    // Cat.prototype.say = function() {
    //     Animal.prototype.say.apply({
    //         name: "父类的名字",
    //         age: 10
    //     });
    //     console.log("这是子类的名字 " + this.name  + ' ' + this.age);
    // };
    // var cat1 = new Cat('子猫', 6);
    // cat1.say();
    class Animal {
        constructor(name = '无姓名', age = 0) {
            this.name = name;
            this.age = age;
        }
        say() {
            console.log(this.name + ' ' + this.age);
        }
    }
    class Cat extends Animal {
        constructor(name, age) {
            super(name, age);
        }
        say() {
            super.say();
            console.log("这是子类自定义的say方法");
        }
    }
    var cat = new Cat("小猫哈哈", 100);
    cat.say();
})();