# Ecma 6+ 基础

## 声明变量

let
			 1,变量不可以重复声明
			 2，不存在变量提升
			 3，块级作用域：不可以在作用域外向内找，可以在内向外找

const
			1,变量必须附上初始值，声明后不可修改
			2，一般常量用大写命名（潜规则）
			3，块级作用域：不可以在作用域外向内找，可以在内向外找
			4，对数组和对象的元素修改不算作对常量的修改，不报错

## 解构赋值

### 数组结构

```js
const AR = [1,2,3,4]
let [one,tow,three] = AR
console.log(one) //one = 1
console.log(tow) //tow = 2
```

### 对象解构

注意对象属性名需要一致

```js
const obj = {
	name:"赵本山",
	age:"不详",
	xiaopin:function(){
		console.log("杨小青")}
	}
let {name,age,xiaopin} = obj;
console.log(name)
console.log(age)
console.log(xiaopin)
```

单独解构

```js
let {xiaopin} = obj;
console.log(xiaopin)
```

字符串 