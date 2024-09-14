import mitt from 'mitt'
// 调用miit   得到emmitter   可以绑定事件 触发事件
const emitter = mitt()
export default emitter

// 这个文件 需要在 mian.ts 里面引入使用
// 或者  你那些组件之间需要通信，就在那些组件 里面引入该文件

// 绑定事件

emitter.on('test', () => {
  console.log(1)
})

// 触发事件
emitter.emit('test')

// 解绑事件

emitter.off('test')

// 将所有事件都解绑
emitter.all.clear()
