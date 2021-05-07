/* import text from'测试模块暴露/动态import.js'   //静态引入 */
const getBut = document.getElementById('bun1')
getBut.onclick = function(){
	import('./动态import.js').then((obj)=>{//动态引入，当需要时才引入
		obj.funa()
	})
}