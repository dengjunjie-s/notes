# Vue Router 基础

Vue Router和v-if和v-show一样，是用来切换组件的显示的

不一样的是Vue Router可以在切换组件时传递参数

## Vue Router使用

1.引入Vue Router

2.定义路由规则

​	其中component是可以通过Vue.extend()创建组件的构造器

```html
<template id="com1">
	<p>组件一</p>
</template>
<template id="com2">
	<p>组件二</p>
</template>
```

```javascript
const compp1 = { template:'#com1' }
const compp2 = { template:'#com2' }
	
const routers = [
	{ path: '/com1' , component: compp1 },
	{ path: '/com2' , component: compp2	}
]
```

也可以使用已经创建好的组件，在这里我们使用创建好的

```javascript
const routers = [
	{ path: '/com1' , component: 'comp1' },
	{ path: '/com2' , component: 'comp2' }
]
```

3，通过路由规则创建路由对象

```javascript
const router = new VueRouter({
	routes:routers
})
```

4，将对象挂载到vue对象中

```javascript
const app = new Vue({
	el:'#app',
	router,
	components:{
		'comp1':{
			template:'#com1',
		},
		'comp2':{
			template:'#com2',
		}
	}
})
```

5，使用路由

使用使用 router-link 组件来导航,通过传入 `to` 属性指定链接,该组件会被默认渲染成一个a标签

然后路由匹配到的结果将会渲染到router-view标签内

<div id="app">
	<router-link to="/com1">组件1</router-link>
	<router-link to="/com2">组件2</router-link>
	 <router-view></router-view>
</div>

## 动态路由匹配

### 动态路径参数

有时需要将多个路由匹配到一个组件当中，就可以使用动态路径参数

动态路径参数以冒号开头

```javascript
const routers = [
	{ path: '/com/:id' , component: compp1 },
]
```

像 `/com/com1 和 `/com/com2 都将映射到相同的路由

当匹配到一个路由时，参数值会被设置到 `this.$route.params`当中，可以使用这个输出id的值

```html
<template id="com1">
	<div>{{ $route.params.id }}</div>
</template>
```

在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中如

| 模式                          | 匹配路径            |             $route.params              |
| ----------------------------- | ------------------- | :------------------------------------: |
| /user/:username               | /user/evan          |         `{ username: 'evan' }`         |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

### 导航守卫

当使用路由参数时，例如从 `/com/com1` 导航到 `/com/com2`，**原来的组件实例会被复用**。

**这也意味着组件的生命周期钩子不会再被调用**

这就可以使用 导航守卫

全局前置守卫

可以使用 `router.beforeEach` 注册一个全局前置守卫

```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
    
})
```

里面收一个函数，函数内有三个参数

- **`to: Route`**: 即将进入的路由对象
- **`from: Route`**: 当前导航即将离开的路由对象
- **`next: Function`**: 必须要调用这个函数，beforeEach
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。

### 匹配任意路径和404路由

如果想匹配**任意路径**，我们可以使用通配符 *

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

含有*通配符*的路由应该放在最后，路由 `{ path: '*' }` 通常用于客户端 404 错误。

当使用通配符时`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 通过*通配符*被匹配的部分

### 匹配优先级

有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。

## 路由嵌套

这里的<router-view>是最顶层嵌套，

```html
<div id="app">
	<router-link to="/com1">进入组件1</router-link>
	<router-link to="/com2">进入组件2</router-link>
	<router-view></router-view>	 
</div>
```

然而最顶层的<router-view>渲染的组件同样可以嵌套自己的<router-view>

先定义好嵌套的模板

```html
<template id="com1">
	<div id="">
		<p>组件一</p>
		<router-link :to="'/com1/' + $route.params.id + '/com1.1'">组件1.1</router-link>
		<router-view></router-view>
	</div>
</template>
<template id="com2">
	<p>组件二</p>
</template>
<template id="com11">
	<p>组件1.1</p>
</template>
```

```js
const compp1 = { template:'#com1' }
const compp2 = { template:'#com2' }
const compp11 = { template:'#com11'}
```

然后在定义路由规则时，在父路由中通过children定义子路由，每一个路由都可以通过children嵌套自己的路由

```js
const routers = [
	{ 
		path: '/com1/:id',
		component: compp1,
		children:[
			{ path:'com1.1', component: compp11,}
		]
	 },
	{ path: '/com2' , component: compp2 },
]

const router = new VueRouter({
	routes:routers
})
```

就可以使用了

## 编程导航 history 栈

history 栈就是路由的访问历史

### router.push

除了使用 `<router-link>` 来定义导航链接，还可以用 router 的实例方法，通过编写代码来实现

使用`router.push` 方法。来切换路由，这个方法会向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。

当点击 `<router-link>` 时，这个方法会在内部调用，所以点击 `<router-link :to="...">` 等同于调用 `router.push(...)`

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意：如果提供了 `path`，`params` 会被忽略**

```js
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

### router.replace

和`router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是会替换掉当前的 history 记录。

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

### router.go

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

### 钩子

在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。

## 切换路由传递参数

```js
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

## 命名路由

有时候，通过一个名称来标识一个路由会更方便一些，可以在创建 Router 实例的时候，在路由规则中使用name给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 } })
```

## 命名视图

有时候想同时 同级)展示多个视图，而不是嵌套展示，就需要使用命名视图

在router-view中使用name设置名称，没有设置名字，那么默认为 `default`

```html
<router-view></router-view>	 
<router-view name='a'></router-view>	 
<router-view name='b'></router-view>
```

在一个路由中使用components在不同视图窗口中定义组件，**要注意定义多个视图时，component要加上s**

```js
const routers = [
	{ 
		path: '/com1/:id',
		components:{
			 default: compp1,
			 a: compp2,
			 b: compp3
		},
	},
]
```

命名视图也可以嵌套

## 重定向和别名

### 重定向

重定向的意思是，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

重定向需要通过路由规则来完成

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```

重定向也可以是一个命名的路由

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```

也可以是一个函数，动态返回值

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数 在这里是‘/a’
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

注意[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)并没有应用在跳转路由上，而仅仅应用在其目标上。在这个例子中，为 `/a` 路由添加一个 `beforeEnter` 守卫并不会有任何效果。

### 别名

**意思是当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。**

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

## 路由组件传参

在组件中使用$route会让组件跟路由高度绑定，脱离就使用不了了

```html
<template id="com1">
	<div>
		<p>组件一</p>
        在模板中使用$route会让组件和路由高度绑定
		<p>{{$route.params.id}}</p>
	</div>
</template>
```

```js
const compp1 = { template:'#com1' }
const routers = [
	{ 
		path: '/com1/:id',
		component: compp1
	}
]
```

使用 `props` 将组件和路由解绑

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性

首先在组件中添加一个id属性

然后再路由规则中设置`props` 被设置为 `true`

```js
const compp1 = {  props: ['id'],template:'#com1'}
const routers = [
	{ 	
		path: '/com1/:id',
		component: compp1,
		props: true ,
	}
]
```

然后就可以在路由中使用这个属性

```html
<template id="com1">
	<div>
		<p>组件一</p>
		<p >{{id}}</p>
	</div>
</template>
```

### 布尔模式

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。

### 对象模式

如果 `props` 是一个对象，它会被按原样设置为组件属性，

会直接将props内这个对象传入组件属性

```js
const compp1 = {  props: ['id','abb'], template:'#com1'}
const routers = [
	{ 	
		path: '/com1',
		component: compp1 ,
		props: { id:'asohaoghogh',abb:'456' }
	}
]
```

```html
<template id="com1">
	<div>
		<p>组件一</p>
		<p >{{id}}</p>
		{{abb}}
	</div>
</template>
```

### 函数模式

你可以在poros创建一个函数返回要传递的参数

```js
const compp1 = {  props: ['id','abb'], template:'#com1'}
const routers = [
	{ 	
		path: '/com1',
		component: compp1 ,
		props: route => {
			return { 
				id: route.query.q,
				abb: route.query.a
			 }
		}
	}
]
```

URL `/com1?q=obj&a=onder` 会将 `{ q: 'obj'}` 作为属性传递给 `SearchUser` 组件。

```html
<router-link :to="{ path: '/com1', query: { q:'obj',a:'onder'}}">组件1</router-link>
```

然后再组件中直接使用

```html
<template id="com1">
	<div>
		<p>组件一</p>
		<p >{{id}}</p>
		{{abb}}
	</div>
</template>
```

# Vue Router 进阶

## 导航守卫

### 全局前置守卫

`router.beforeEach` 注册一个全局前置守卫

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。



```js
const router = new VueRouter({  })

router.beforeEach((to, from, next) => {
  
})
```

每个守卫方法接收三个参数

- **`to: Route`**: 即将要进入的目标 路由对象
- **`from: Route`**: 当前导航正要离开的路由
- **`next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
  - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
  - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调

**注意确保 `next` 函数在任何给定的导航守卫中都被严格调用一次**

### 全局解析守卫

用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认跳转之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用。

### 全局后置钩子

注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享的守卫

可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内的守卫

可以在路由组件内直接定义以下路由导航守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```