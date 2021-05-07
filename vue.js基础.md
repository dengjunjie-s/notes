# 指令

## v-text和v-html

使用这两个指令会替换标签内原有的内容

```html
<div v-text='intext' >
    didfjeiefh这个内容会被替代
</div>
```

v-html会解析html代码而v-text不会

## v-if和v-else和v-else-if

v-if如果取值是true就渲染元素，如果条件不满足就不会创建这个元素节点

v-if可以直接赋值表达式

```html
<div v-if = '1 == 1 '>
	可以直接使用表达式
</div>
```

v-else必须和v-if一起出现，并且中间除v-else-if外不可以有其他内容

```html
<div v-if='felse'> 可以直接使用表达式 </div>
<div v-else-if='felse'> 可以直接使用表达式 </div>
<div v-else> 将渲染这个 </div>
```

## v-show

v-show和v-if一样也是条件渲染，用法也一样

v-show如果取值是true就显示元素

和v-if的区别是只要取值为false也会创建元素，只是不显示displayL：none

## v-for

v-for可以根据数据渲染元素

可以遍历 数组 对象 字符串 数字

<div v-for='(value index) in lest'> 
{{value}}{{index}}
</div>
注意点：使用v-for的时候应该给数据绑定一个**独一无二的key值**，不然当data发生改变时，由于v-for的缓存复用策略，会导致重新渲染出错。

## v-bind

v-bind用于给元素的标签绑定数据

```html
<input v-bind:value='age'> 
```

v-bind 也可以缩写格式为一个冒号

```html
<input :value='age'> 
```

赋值的格式也可以是一个合法的js表达式

```html
<input :value='age + 10'> 
```

### 使用v-bind绑定class

正常情况下v-bind会在model中查找数据，如果model中没有对应的class，则应该传入一个数组，数组中再传入对应类名'字符串'

```html
<input :class='['lie','duiyingde' ]'> 
```

也可以在类中绑定一个三目运算符按需绑定 如fas ?  'lei1' : 'eier2'

```html
<input :class='['lie','duiyingde', fas ? 'lei1':'eier2' ]'> 
```

也可以传入一个对象来决定是否绑定如 {'lei1': true }前面类名后面布尔值

```html
<input :class='['lie','duiyingde',{'lei1': true } ]'> 
```

也可以传入一个对象如{'lei1': true }

```html
<input :class='{ 'lei1': true , 'lei2': true }'> 
```

### 使用v-bind绑定style

需要在传入一个对象如

需要注意

style的属性值需要用引号括起来

属性如果出现" - "符号也需要括起来

```html
<input :style='{ color : 'red' , 'font-size' : '30px' }'> 
```

可以引入model中data的对象,需要传入一个数组，数组中放入data中的对象

```html
<input :style='[data1,data2]'> 
```

## v-on

v-on专门用于给元素绑定监听事件
格式：v-on：事件名称=‘ 回调函数名 ’   ，也可以使用缩写 @：事件名称=‘ 回调函数名 ’如

```html
 < div v-on:click=" add " > 
```

可以使用括号传入数据，或者当前事件对象

```html
 < div v-on:click=" add($event) " > 
```

### 



### v-on修饰符

.once   只触发一次函数

```html
<div v-on:click.once="add(123)" > 
```

.prevent可以阻止元素的默认行为

```html
<a v-on:click.prevent="add(123)" href='www.baidu.com' > 
```

.stop可以阻止事件冒泡

在嵌套的元素中，如果监听了相同的事件，就会触发事件冒泡

```html
<div v-on:click="add1(123)" >
	<div v-on:click.stop="add2(123)" >
        函数只会触发到第二层停下
		<div v-on:click="add3(123)" >
			123
		</div> 
	</div> 
</div> 
```

.self

只有当前元素触发时才执行

```html
<div v-on:click="add1(123)" >
	<div v-on:click.self="add2(123)" >
        只有点击add2才会执行，add3不会
		<div v-on:click="add3(123)" >
			123
		</div> 
	</div> 
</div> 
```

.capture

默认情况下是事件冒泡，如果想变成事件捕获，就使用.capture

```html
<div v-on:click.capture="add1(123)" >
	<div v-on:click..capture="add2(123)" >
		<div v-on:click.capture="add3(123)" >
			默认是从里向外运行，现在是外向里运行
		</div> 
	</div> 
</div> 
```

### 按键修饰符

- .enter 
- `.tab `
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

使用方法 ：监听键盘事件

```html
< input v-on:keyup.enter ="add3(123)" >
也可以使用keyCode
< input v-on:keyup.120 ="add3(123)" >
```

## 自定义指令

### 全局自定义

在全局vue中使用directive (  )定义，他接受两个参数，一个指令名称，一个对象

定义指令名称不需要加v-，对象中放入该指令的生命周期函数

```javascript
Vue.directive('focus', {
    //这里el表示该指令被绑定的元素
    //binding表示给该指令传递的参数
    //如在 <p v-focus='"blue"'>123</p> 那么 binding.value 就等于 blue
  bind: function ( el , binding) {
      //bind:指令绑定到元素上时调用
      el.style.color = 'red'
  }
  inserted: function (el) {
      //inserted:被绑定指令的元素被渲染到view的时候调用
  }
})
```

### 局部自定义

在vue实例中使用directives定义局部指令

directives中放入一个对象，对象中key为指令名，值为对象，对象中放该指令的生命周期

```javascript
new vue({
    el:'#all',
    directives:{
        'color':{
             bind: function ( el , binding) {
     		 el.style.color = 'red'
 			 }
        }
    }
})
```

# 计算属性

使用computed定义计算属性

特点：只要计算属性返回的结果没有变化，那么计算属性就会之执行一次

会比使用函数性能高

```javascript
new vue({
    el:'#a11',
    computed: {
		showAdd:function(){
				return true
		}
	},
})
```

# 自定义过滤器

过滤器可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式**  

也可以在使用过滤器的时候传递参数

<div>  {{ data  | fafa(data1) | fafa2 }}   </div>

<div v-bind:id=" data | fafa" > </div>

左边是要处理的数据，右边是过滤器， 再使用 | 可以使用多个过滤器

## 全局过滤器

使用vue.filter()定义

他接受两个参数，第一个时过滤器名称，第二个是处理数据的函数，该函数会默认接受一个参数，是需要处理的数据

```javascript
vue.filter('fafa',function(value,forstr){
    value = value.replace(/学院/g,'大学')
    return value
})
```

## 局部过滤器

在实例中使用filters添加

```javascript
new vue({
    el:'#a11',
   	filters:{
       'fafa2': function(value){
    		 value = value.replace(/学院/g,'大学')
   			 return value
		}
    }
})
```

# 过渡动画

## 给vue控制的元素添加过渡动画

需要将要执行动画的元素放到transition组件当中

当transition组件中的元素显示时会自动查找v-enter，v-enter-active,v-entier-to几个class

当transition组件中的元素消失时会自动查找v-leave，v-leave-active,v-leave-to几个class

需要注意一个transition组件中只能添加一个元素

```html
<transition name="fade">
    <p v-if="show">hello</p>
</transition>
```

指定动画名需要在transition的name属性指定动画名，并把class前面的v换成该动画名

```css
.fade-enter,.fade-leave-to{
	opacity:0;
}
.fade-enter-to,.fade-leave{
	opacity:1;
}
.fade-enter-active,.fade-leave-active{
	transition: 2s;
}
```

如果时添加css动画则是

```css
.fade-enter-active {
  animation: bounce-in .5s;
}
.fade-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```



## 页面加载成功后播放动画

也可以使用 appear在页面加载完成后自动播放出现动画

```html
<transition name="fade" appear>

    <p v-if="show">hello</p>

</transition>
```

appear同样也可以自定义 CSS 类名

```html
<transition name="fade" 
appear
appear-class="custom-appear-class"
appear-to-class="custom-appear-to-class"
appear-active-class="custom-appear-active-class">

    <p v-if="show">hello</p>
    
</transition>
```

## JavaScript 钩子

钩子函数可以配合css使用也可以单独定义动画使用

```html
<transition
	v-on:before-enter="beforeEnter"<!-- 动画开始之前 -->
	v-on:enter="enter"<!-- 动画执行过程中 -->
	v-on:after-enter="afterEnter"<!-- 动画执行完毕后 -->
	v-on:enter-cancelled="enterCancelled"
		
	v-on:before-leave="beforeLeave"<!-- 动画开始之前 -->
	v-on:leave="leave"<!-- 动画执行过程中 -->
	v-on:after-leave="afterLeave"<!-- 动画执行完毕后 -->
	v-on:leave-cancelled="leaveCancelled"

	`v-bind:css="false"<!-- 需要定义动画时添加 -->
>
</transition>
```

函数中默认接受的参数时动画元素本身

如果使用Javascript函数定义过度动画需要**在 `enter` 和 `leave` 中使用 `done` 进行回调**

并且在过渡的元素上添加 `v-bind:css="false"`，让vue不在css上查找动画

还要在动画执行过程中添加el.offsetHeight或者el.offsetWidth

```javascript
methods: {
	beforeEnter: function (el) {
    	el.style.opacity = '0'
	},
	enter: function (el, done) {
    	el.style.transition = 'all 2S' 
		el.offsetHeight
		done()
	},
	afterEnter: function (el) {
		el.style.opacity = '1'
	},
  enterCancelled: function (el) {
  },

  beforeLeave: function (el) {
  },
  leave: function (el, done) {
    done()
  },
  afterLeave: function (el) {
  },
  leaveCancelled: function (el) {
  }
}
```

如果需要在进入页面时就播放过度动画，需要在transition标签中添加appear

并且在还要在动画执行过程中延迟done()回调函数的调用

```javascript
enter: function (el, done) {
	el.style.transition = 'all 2S' 
	el.offsetWidth
	setTimeout(function(){
		done() 
	},0)
 },
```

## 使用第三方 JavaScript 动画库

如 Velocity.js

首先需要用script标签引入 Velocity.js

然后在动画执行过程中使用,其他钩子函数不用定义

```javascript
enter: function (el, done) {
	Velocity(el,{opacity:1,marginLeft:'500px'},3000);
	done() 
 },
```

## 自定义类名定义动画

可以在transition添加以下属性来自定义过渡动画类名

- enter-class`动画出现
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`动画消失
- `leave-active-class`
- `leave-to-class` (2.1.8+)

```html
<transition
	enter-class='engdiejg'
></transition>
```

## 使用第三方 CSS 动画库

如 Animate.css

首先需要用link标签引入 Animate.css

然后在动画执行过程类中使用如

```html
<transition
	enter-active-class='动画名称'
></transition>
```

## 两个元素的过度模式

当使用过度动画一个元素消失，一个出现时可以在mode属性选择过度模式

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

```javascript
<transition name="fade" mode="out-in">
  <!-- ... the buttons ... -->
</transition>
```



## 列表的过度动画

需要使用transition-group组件将列表包裹住，使用方法和transition一样

需要注意：

transition-group组件渲染时会给内部元素默认用spam标签包裹，可以用给transition-group 绑定一个tag属性指定包裹标签

如果列表动画渲染出错一般是因为v-for的key没有绑定**独一无二的值**

```html
<transition-group 
 name='fade'
 tag="ul">
	<li v-for='item in obj' :key='id'></li>
</transition-group>
```

# 组件

## 注册组件

1创建组件构造器

2注册已经创建好的组件

### 全局注册

#### 方法1

首先使用Vue.extend创建组件构造器

```javascript
var Profile = Vue.extend({
  template: '<p>等均恶疾</p>',
})
```

然后用Vue.component注册已经创建好的组件

```javascript
Vue.component('my-component-name',Profile )
```

#### 简化方法2

Vue.component的第二个参数可以接收一个对象，会使用该对象自动调用Vue.extend

```javascript
Vue.component('my-component-name',{
    template: '<p>等均恶疾</p>',
} )
```

### html代码提示

这几种方式创造的组键在编写html时没有提示，可以使用template标签将html代码从外部引入解决问题

```html
<template id='info'>
    <p>等均恶疾</p>
</template>
```

```javascript
Vue.component('my-component-name',{
    template: '#info',
} )
```

## 局部注册

在vue实例中使用components注册

```javascript
new vue({
    el:'#all',
    components:{
        'my-component-name':{
            template: '#info',
        }
    }
})
```

## 组件中的data

在组件中的data必须是一个函数，在retun中放入数据，

```javascript
Vue.component('my-component-name',{
	template: '#info',
	data:function(){
		return {
		abc:'这是数据'
		}
	},
	methods:{
		 fun1(){
		 console.log('denguunj')
		 }      
	}
} )
```

## 组件切换

可以使用component标签进行组件切换

这种方法切换的时候不会保存之前组件的状态，切换回去之后会重新渲染

```html
<component :is='"my-component-name"'></component>
```

如果切换时要保存之前组件的状态可以用keep-alive标签将component包裹起来

这将会在切换时保存之前组件的状态

```html
<keep-alive>
    <component :is='"my-component-name"'></component>
</keep-alive>
```

## 组件动画

可以在组件切换时加入过度动画，并调整过度模式

```html
<transition name="fade" mode="out-in">
	<component :is='"my-component-name"'></component>
</transition>
```

## 父子组件

子组件只能在定义他的父组件中使用

```javascript
Vue.component('father',{
	template: '#info',
	data:function(){
		return {
		abc:'这是数据',
        ddd:'这是数据2'
		}
	},
	components{
    	'son':{
    		template: '#info2',
		}
	}
} )
```

### 父对子组件数据传递

vue子组件不能直接访问父组件数据

首先在子组件中定义props用于接收数据

```javascript
Vue.component('father',{
	template: '#info',
	data:function(){
		return {
		abc:'这是数据',
        ddd:'这是数据2'
		}
	},
	components:{
    	'son':{
    		template: '#info2',
			props:['youabc','youddd']
		}
	},
})
```

然后需要使用v-bind在父组件中给子组件定义的props传递数据

```html
<template id='info'>
	<div>
        <!-- 这是父组件 -->
		<p>{{abc}}</p>
		<p>{{ddd}}</p>
		<son v-bind:youabc='abc' v-bind:youddd='ddd'></son>
	</div>
</template>
```

再然后就可以在子组件中使用了

```html
<template id='info2'>
	<div>
    	<p>子组件</p>
		{{youabc}}
		{{youddd}}
	</div>
</template>
```

### 父对子组件方法传递

符组件向子组件传递方法，子组件不需要接收

首先用v-on自定一个事件用于接收函数，这里用于接收的事件是youfun，名字随便取

```html
<template id='info'>
	<div>
        <!-- 这是父组件 -->
		<button type="button" @click="fad">父组件</button>
		<son v-on:youfun='fad'></son>
	</div>
</template>
```

然后在父组件传递子组件方法，在子组件中不需要接收

需要在子组件中定义一个方法，在方法内使用$emit获取父组件用v-on传递的数据

```javascript
Vue.component('father',{
	template: '#info',
	methods:{
		fad(){
			alert('点击')
		}
	},
	components:{
    	'son':{
			template:'#info2',
			methods:{
				sonfun(){
					this.$emit('youfun')
				}
			}
		}
	},
})
```

然后在子组件中调用该方法就相当于直接调用父组件的方法

```html
<template id='info2'>
    <div>
    	<p>子组件</p>
		<button type="button" @click="sonfun">子组件</button>
    </div>
</template>
```

### 子对父组件数据传递

上一章子组件可以调用父组件的方法，相对的子组件也可以用这个方法对父组件传参

子组件中使用$emit的第二个参数可以传递数据，在父组件方法在形参内接收数据

$emit可以获取事件的函数，并运行，也可以传递参数

```javascript
Vue.component('father',{
	template: '#info',
	data:function(){
		return {
			faddata:null
		}
	},
	methods:{
		fad(data){
			this.faddata = data
			alert(this.faddata)
		}
	},
	components:{
    	'son':{
			template:'#info2',
			data:function(){
				return {
					sondata:'子组件数据',
				}
			},
			methods:{
				sonfun(){
					this.$emit('youfun',this.sondata)
				}
			}
		}
	},
})
```

## 组件命名注意点

1注册组件时使用驼峰命名，在使用时就要转换成短横线分割命名

2，传递参数时使用驼峰命名，那么标签内就要使用短横线命名 如<idsajfi :class-name='abc'>注册时props:[className]

3,传递方法时只能使用短横线命名

## 组件数据多级传递

组件中**数据传递**和**方法传递**都需要一层一层传组件插槽

## 插槽

### 匿名插槽

默认情况下是无法在使用子组件情况下，给子组件动态动态添加内容的

如有需要就要用到插槽

插槽就是在组件定义的template内的slot标签

```html
<template id='info'>
    <div>
		<son @youfun='fad'></son>
		<slot></slot>
    </div>
</template>
```

当使用组件时，组件标签内的内容将会插入到组件模板的slot标签当中去

```html
<zujian>
    <p>插入的内容 </p>
</zujian>
```

插槽可以添加默认值，在slot添加，在没有插入内容时就会显示

没有命名的插槽叫做匿名插槽

### 具名插槽

在定义插槽的时候给插槽添加name属性，用来定义插槽的名称

```html
<template id='info'>
    <div>
		<slot name='one'></slot>
        <slot name='tow'></slot>
    </div>
</template>
```

使用组件时在插入的标签内添加slot属性，指定插入的插槽

```html
<zujian>
    <p slot= 'one'>插入的内容 </p>
    <p slot= 'one'>插入的内容 </p>
    <p slot= 'tow'>插入的内容 </p>
    <p slot= 'tow'>插入的内容 </p>
</zujian>
```

没有指定插槽的插入内容，只会插入到匿名插槽，

### 使用v-slot定义具名插槽

v-slot必须添加到template标签当中用于代替使用slot属性

```html
<zujian>
    <template v-slot:one>
        <p>插入的内容 </p>
    	<p>插入的内容 </p>
    </template>
    <template v-slot:tow>
        <p>插入的内容 </p>
    	<p>插入的内容 </p>
    </template>
</zujian>
```

v-slot也有简写方式 #

```html
<zujian>
    <template #tow>
        <p>插入的内容 </p>
    	<p>插入的内容 </p>
    </template>
</zujian>
```

### 作用域插槽

可以在使用组件时获取组件数据

应用场景：由子组件提供数据，由父组件决定渲染

首先需要在子组件中使用v-bind定义一个属性用于暴露数据，**注意定义的属性必须和暴露的数据同名**

```html
<template id='info2'>
    <div>
		<slot :sondata='sondata'></slot>
    </div>
</template>
```

```javascript
components:{
 	'son':{
		template:'#info2',
		data:function(){
			return {
				sondata:'子组件数据',
			}
		},			
	}
},
```

然后在使用组件时在template标签上使用slot-scope就可以直接接收数据

```html
<son>
	 <template  slot-scope='abc'>
	       <p>{{abc.sondata}}</p>
	 </template> 
</son>
```

#### 使用v-slot指令接收数据

根据上面的方法暴露数据之后，使用v-slot指令代替slot-scope接收数据

匿名插槽的默认名字是default，在 v-solt后面指定插槽名字然后用里面的值接收数据

```html
<son>
	 <template  v-solt:default='abc'>
	       <p>{{abc.sondata}}</p>
	 </template> 
</son>
```
