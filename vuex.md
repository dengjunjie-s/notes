

# vuex

使用vuex可以将共享数据保存到vuex中，整个程序的任何组件都可以获取和修改

首先需要引入vuex，注意必须先引入vue，再引入vuex

然后创建vuex对象

```javascript
const store = new Vuex.Store({
    
})
```

再然后在vue对象或者组件中,把vuex对象保存到store的key当中就可以使用了

```javascript
Vue.component('father', {
	template: '#info',
	store: store,
})
```

## state

state相当于vue实例中的data，用于存放共享数据

```javascript
const store = new Vuex.Store({
	state: {
		abc: 'dengjunjie'
	}
})
```

之后保存了vuex对象的**vue实例或组件，和其所有子孙组件**都可以通过**this.$store.state和store.state**获取vuex保存的数据，但是在html中必须使用**this.$store.state**

```html
<template id='info2'>
	<div>
		<p>孙组件</p>
		{{this.$store.state.abc}}
	</div>
</template>
```

```javascript
Vue.component('father', {
	template: '#info2',
	store: store,
})
```

## mutation

在vue中不建议直接修改共享数据，因为会导致排错困难，代码陈长，

一般通过vuex里的mutation修改共享数据

mutation时vuex实例中用于存放方法，相当于vue实例中的methods，

mutations里的方法会默认接收两个个参数，第一个是该vuex里的state，第二个是使用时传递的参数

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
    mutations:{
        add(state){
            state.abc = state.abc + 1
        },
        sub(state,payload){
            state.abc = state.abc + payload
        }
    }
})
```

**vue实例或组件，和其所有子孙组件**都可以通过**store.commit('add')**调用方法修改数据

```javascript
Vue.component('father', {
	template: '#info2',
	store: store,
	methods:{
		onadd(){
			store.commit('add')
		},
        onsub(){
			store.commit('sub',55)
		}
	}
})
```

```html
<template id='info2'>
	<div>
		<p>孙</p>
		<button @click="onadd">add</button>
        <button @click="onsub">sub</button>
		{{this.$store.state.abc}}
	</div>
</template>
```

不过一般第二个参数传递的是个对象

```javascript
Vue.component('father', {
	template: '#info2',
	store: store,
	methods:{
		onadd(){
			this.$store.commit('add')
		},
        onsub(){
			this.$store.commit('sub',{
                num:55
            })
		}
	}
})
```

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
    mutations:{
        add(state){
            state.abc = state.abc + 1
        },
        sub(state,payload){
            state.abc = state.abc + payload.num
        }
    }
})
```

## getters

相当于vuex的计算属性它可以处理公共数据，并把数据缓存起来，只要数据不发生改变，无论调用多少次都只执行一次

getters里的方法会默认接收两个参数，第一个是vuex内的state，第二个是vuex内的getters本身

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
	getters: {
	  add(state){
	      return state.abc + '数据处理'
	  },
	  doneTodosCount(state, getters){
	    return getters.add
	  }
	}
})
```

调用时通过this.$store.getters使用计算属性

```html
<template id='info2'>
	<div>
		<p>孙</p>
		<button @click="add">add</button>
		{{this.$store.getters.add}}
		{{this.$store.getters.doneTodosCount}}
	</div>
</template>
```

### 给getters传递参数

在getters里return一个函数，实现给getters传递参数

```javascript
const store = new Vuex.Store({
	state: {
		abc: '522'
	},
    getters:{
        add(state){
           return function(b1){
				state.abc + b1
			}
        }
    }
})
```

使用时用**{{this.$store.getters.add(123)}}**传参

```html
<template id='info2'>
	<div>
		<p>孙</p>
		{{this.$store.getters.add(123)}}
	</div>
</template>
```

## Action

Action和mutation很像不同是，mutation规定只能同步操作，Action可以异步操作

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象

所以可以通过context来获取 state 和 getters，也可以调用 `context.commit` 提交一个 mutation

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
    mutations:{
       add(state,payload){
            state.abc = state.abc + payload
        }
    },
	actions:{
		outadd(context){
			 setTimeout(()=>{
				 context.commit('add',context.state.abc)
			 },1000)
		}
	}
})
```

既然context内包含 store 具有的相同方法和属性，那么可以使用**参数解构**来简化写法

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
    mutations:{
       add(state,payload){
            state.abc = state.abc + payload
        }
    },
	actions:{
		outadd({commit,state}){
			 setTimeout(()=>{
				 commit('add',state.abc)
			 },1000)
		}
	}
})
```

然后通过**store.dispatch('')**调用Action

```javascript
Vue.component('father', {
	template: '#info2',
	store: store,
	methods:{
		onadd(){
			store.dispatch('outadd')
		}
	}
})
```

同样调用时可携带参数

```javascript
Vue.component('father', {
	template: '#info2',
	store: store,
	methods:{
		onadd(){
			store.dispatch('outadd',{
                name:'dengjunjie'
            })
		}
	}
})
```

在actions函数第二个参数用products接收

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
    mutations:{
       add(state,payload){
            state.abc = state.abc + payload
        }
    },
	actions:{
		outadd({commit,state},products){
			 setTimeout(()=>{
				 commit('add',state.abc)
                 console.log(products.name)
			 },1000)
		}
	}
})
```

### 使用Promise

在用**store.dispatch('')**调用actions时，是可以触发action 内函数返回的 Promise，

并且**store.dispatch('')**返回的结果是一个Promise意味着你可以在后面接上then

```javascript
Vue.component('father', {
	template: '#info2',
	store: store,
	methods:{
		onadd(){
			store.dispatch('outadd',{
			    name:'dengjunjie'
			}).then(()=>{
				console.log('then成功了')
			})
		}
	}
})
```

需要在action的函数返回Promise

```javascript
const store = new Vuex.Store({
	state: {
		abc: 522
	},
    mutations:{
       add(state,payload){
            state.abc = state.abc + payload
        }
    },
	actions:{
		outadd({commit,state},products){
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					 commit('add',state.abc)
				     console.log(products.name)
					 resolve()
				},1000)
			})
		}
	}
})
```

