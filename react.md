## 使用webpack 创建一个 react 项目

1. 具备node.js环境
2. 在命令提示符里面 执行 npx create-react-app react-project
3. 启动项目 npm start
4. 打包项目 npm run build

## 什么是jsx 表示在 js 代码中编写html 模板解构

const count = 100

function getName() {
return '张三'
}

function App() {
return (

<div>
this is app
<!-- 使用引号传递字符串 -->
{"this is message"}
<!-- 识别js变量 -->
{count}
<!-- 函数调用 -->
{getName()}
<!-- 方法调用 -->
{new Date().getDate()}
<!-- 使用js对象 -->
<div style={{ color:'red' }}>this is app</div>
</div>
)
}

## jsx 中 实现列表渲染

const arr = [
{ id: 1, name: '1' },
{ id: 2, name: '2' },
{ id: 3, name: '3' },
{ id: 4, name: '4' },
]

<ul>
  {arr.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>

## jsx 实现条件渲染

const flag = true

const loading = true

1. 可以通过 逻辑运算符 &&
   {flag && <span>this is span</span>}
2. 还可以通过 三元表达式
   {loading ? <span>1</span> : <span>2</span>}

## 实现复杂的条件渲染

const status = 1

function getstatus() {
if (status === 1) {
return <span>1</span>
} else if (status === 2) {
return <span>2</span>
}
}

{/_ 复杂的条件渲染 _/}
{getstatus()}

## jsx 里面绑定事件

const handEvent = () => {
console.log('button被点击了')
}
{/_ 绑定事件 _/}
<button onClick={handEvent}></button>

<!-- 传参 -->

// 形参
const handEvent1 = (name) => {
console.log('button被点击了',name)
}

{/_ 函数传参 _/}
这里必须写成箭头函数
<button onClick={() => handEvent1('实参')}></button>

<!-- 传递多个参数 -->

// 形参
const handEvent1 = (name,e) => {
console.log('button被点击了',name,e)
}
<button onClick={(e) => handEvent1('实参',e)}></button>

## react 组件

在react 一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图ui，渲染组件只需要把组件当成标签书写就行

1. 定义组件

function Button(){
return <button>test</button>
}

2. 在根组件里面使用

function App(){
return(

<div>
<Button />
</div>
)
}

## useState 的使用

// useState 使用

<!-- 这个导入语句要写在最上面  不能写在组件里面 -->

import { useState } from 'react'

function App(){
// 调用useState 添加一个状态变量
// number 状态变量，setCount 修改状态变量的方法
const [number, setCount] = useState(0)
// 添加修改方法
const updateNumber = () => {
// 这样是可以修改number的值 但是无法引起页面的更新
number++
// 这有调取匹配的方法 这样才能引起页面的更新
setCount(number + 1)
}

// useState也可以传递引用数据类型

const [form, setForm] = useState({
name: 'jack',
})
// 添加修改方法
const updateForm = () => {
// 这样是可以修改number的值 但是无法引起页面的更新
form.name = 'tom'
// 这有调取匹配的方法 这样才能引起页面的更新
setForm({
...form,
name: 'tom',
})
}

return (

<div>
{/_ useState 使用 _/}
<button onClick={updateNumber}>{number}</button>

{/_ useState 对象类型 _/}
<button onClick={updateForm}>{form.name}</button>

</div>
)
  
}

## loadsh

1. 安装 npm i loadsh -g
2. 引入 import \_ from 'loadsh'
3. 使用 它里面很多方法封装的 比如 排序
   \_.orderBy(list,'以什么字段排序',"升序降序 esc desc")

## 表单受控绑定

function App(){
// 受控表单绑定
const [value, setValue] = useState('')

return(
{/_ 受控表单 _/}
{/_ 这里就实现了一个 vue 的 表单输入框双向绑定 _/}
<input
value={value}
type="text"
onChange={(e) => setValue(e.target.value)}
/>
)

}

## react 获取dom

使用 useRef

import { useRef } from 'react'

function App(){
// 使用 useRef
const inputRef = useRef(null)

<!-- 渲染完成以后 dom 才可用 -->
<!-- 有一个固定属性  current -->

const showDom = () => {
console.log(inputRef.current)
}

return(
{/_ 使用useRef _/}
<input type="text" ref={inputRef} />
<button onClick={showDom}>点击</button>
)

}

## 组件通信

1. 父传子
   function App(){
   //
   //
   // 组件通信-父传子
   // 定义一个子组件
   // 子组件接收 父传递过来的值 用 props
   function Child(props) {
   return <div>{props.nameValue}</div>
   }
   // 再定义一个值
   const val = '父传子的值'

return(
{/\* _/}
{/_ _/}
{/_ _/}
{/_ 组件通信 _/}
{/_ 父传子 \*/}
<Child nameValue={val}></Child>
)
}

2. props 说明
   基本上想传什么就传什么 还可以传jsx
   props 只能读取 不能修改
   <Child
   nameValue={val}
   bool={true}
   list={[{id:1},{id:2}]}
   obj={{name:'b'}}
   jsx={<span>111</span>}
   cb={ ()=>{} }
   />

3. children 说明 类似于 vue中的插槽
   会在 props 里面添加一个 children 属性

<Child>
  <span>children</span>
</Child>

4. 子传 父

function ChildOne({reciveMessage}){
const test = '这是传给父组件的值'
return (
<button
onClick={() => {
reciveMessage(test)
}} >
send
</button>
)
}

function App(){
// 子传父 接收的方法
const getmessage = (msg) => {
console.log(msg)
}
return (
{/_ 子传父 _/}
<ChildOne reciveMessage={getmessage}></ChildOne>
)
}

5. {/_ 兄弟组件传值 通过状态提升 也就是利用 共同的父组件 通过 子传父 再 父传子 实现兄弟组件通信 _/}

6. {/_ 使用content 机制 实现跨组件通信 _/}
   {/_ 1. createContext 方法 创建一个上下文对象 _/}

   import {createContext} form 'react'
   const msgContext = createContext()

   {/_ 2. 在顶层组件 使用 provider 提供数据 _/}
   <msgContext.provider value={msg}>button</msgContext.provider>
   {/_ 3. 在底层组件 使用 useContext 组件 获取数据 _/}
   const meage = useContext(msgContext)

## useEffect 使用

// {/_ 使用useEffect _/}
// 类似于mounted 声明周期
// 第一个参数是回调函数，第二个参数是依赖项是数组 不同的依赖项会影响第一个回调函数的执行，

1. 当依赖项为空数组的时候 只会在组件初始渲染执行一次，
   const url = '1111'
   const [list, setListOne] = useState([])
   useEffect(() => {
   async function getData() {
   const res = await fetch(url)
   const list = await res.json()
   setListOne(list.data)
   }
   getData()
   }, [])
2. 没有依赖项 会在组件初始渲染 和 组件更新时执行，
   useEffect(() => {
   console.log('111')
   })
3. 添加特定依赖项 会在 组件初始渲染和依赖项变化执行
   useEffect(() => {
   console.log('111')
   },[count])
4. 消除副作用 可以在useEffect 里面 return 回调
   useEffect(() => {
   const timer = setInterval(() => {
   console.log('定时器执行中')
   }, 1000);
   return () => {
   clearInterval(timer)
   }
   },[])

## 自定义 hook 和 vue3 的基本一模一样

自定义hooks 的目的 就是为了让主页面更加简洁，将js 逻辑 抽离到 单独的js文件去

这里是抽离出去的js 逻辑，这里面可以写 生命周期 watch computed 等等方法
import {useState} from 'react'

function test () {
const [value,setValue] = useState(true)
const toggle = () => {setValue(!value)}

return {
value,
toggle
}
}

function App (){
const {value,toggle} = test()

return(

<div>
{value && <div>this is div</div>}
<button onClick={toggle}>toggle</button>
</div>
)

}

## redux 状态管理

1. 定义reducer 函数
作用：根据不同的action对象，返回不同的新的state
<script>
  // state 管理的数据的初始状态
  // action 对象type标记当前需要做什么样的修改
  function reducer(state={count:0},action){
    if(action.type === '1'){
      return{count:state.count+1}
    }else if(action.type === '2'){
      return{count:state.count-1}
    }
    return state
}
// 2. 使用reducer函数生成store实例
const store = Redux.createStore(reducer)
// 3. 通过store实例的subscribe订阅数据变化
// 回调函数可以再每次state变化时执行
store.subscribe(()=>{
  console.log('1')
  document.getelementById('add').innerText = store.getState().count
})
// 4. 通过store实例的dispatch函数提交aciton 更改状态
const addbtn = document.getelementById('add')
btn.addEventlistener('clink',()=>{
  store.dispatch({
    type:'1'
  })
})

const delbtn = document.getelementById('del')
btn.addEventlistener('clink',()=>{
store.dispatch({
type:'2'
})
})

// 5. 通过store实例的getState方法获取最新状态更新到视图中
document.getelementById('add').innerText = store.getState().count
</script>

## react 使用 redux

1. 需要使用到 redux toolkit 和 react-redux 这两个工具
2. npx create-react-app react-redux
3. 安装配套工具 npm i @reduxjs/toolkit react-redux
4. npm start

5. 在项目中 创建一个 store 文件夹 下面有 modules 文件夹 和 index.js 文件
   在 modules 文件夹下面创建一个js 文件 这个js文件里面的代码如下

import { createSlice } from '@reduxjs/toolkit'

const countStore = createSlice({
name: 'count',
// 初始化 state
initialState: {
countNumber: 0,
},
// 修改状态的方法 同步方法
reducers: {
add(state) {
state.count++
},
del(state) {
state.count--
},
},
})
// 解构出actionCreate 函数
const { add, del } = countStore.actions

// 获取reducer
const reducer = countStore.reducer

// 按需导出

export { add, del }
// 默认导出
export default reducer

6. 在index.js 里面 代码如下
   import { configureStore } from '@reduxjs/toolkit'
   // 导入子模块 reducer
   import countReducer from './modules/demo'

const store = configureStore({
reducer: {
count: countReducer,
},
})

export default store

7. 在 组件中 使用

// 获取 useSelector 从 react-redux

import { useSelector } from 'react-redux'

// 使用 useSelector
const { countNumber } = useSelector((state) => state.countNumber)

{countNumber}

8. 修改store
   // 获取 useSelector 从 react-redux

import { useDispatch, useSelector } from 'react-redux'
import { add, del } from './stroe/modules/demo'
APP (){
// 修改 store
const dispatch = useDispatch()
}

return(
{/_ 使用 redux 并且修改 _/}
<button
onClick={() => {
dispatch(del())
}} > -
</button>
{countNumber}
<button
onClick={() => {
dispatch(add())
}} > +
</button>
)

9. 异步存储
   // 异步存储
   const { setChinel } = countStore.actions
   const fetchList = async (dispatch) => {
   const res = await axios.get('/mock/basicUser.json')
   dispatch(setChinel(res.data.chinel))
   }

## react 路由

1. 安装路由
   npm i react-router-dom
2. 配置路由
   // 组件变量 首字母必须是大写
   import Home from '../page/home'
   import Login from '../page/login'
   import { createBrowserRouter } from 'react-router-dom'
   const router = createBrowserRouter([
   {
   path: '/login',
   element: <Login />,
   },
   {
   path: '/home',
   element: <Home />,
   },
   ])

export default router

3. 在 main.js 里面引入 使用
   import { RouterProvider } from 'react-router-dom'
   // 导入router
   import router from './router'
   // <RouterProvider router={router}></RouterProvider>

4. 路由跳转
   声明式导航
   import { Link } from 'react-router-dom'
   // 必须大写 组件的话
   const Login = () => {
   return (
   <div>
   我是登录页
   {/_ <Link to="/home">跳转</Link> _/}
   </div>
   )
   }
   export default Login

   编程式 导航
   import { useNavigate } from 'react-router-dom'
   // 必须大写 组件的话
   const Login = () => {
   const navigate = useNavigate()
   return (
    <div>
    我是登录页
    {/_ 编程式 _/}
    <button
    onClick={() => {
    navigate('/home')
    }} >
    跳转
    </button>
    </div>
    )
    }
    export default Login

5. 路由 传参
   navigate('/home?name=jack')

   接收参数
   import { useSearchParams } from 'react-router-dom'
   // 必须大写 组件的话
   const Login = () => {
   const [params] =useSearchParams()
   const name = params.get('name')
   return (
   <div>
   我是登录页{name}
   </div>
   )
   }
   export default Login

6. 路由 模式 和 vue 一模一样
   history 需要后端支持 url 地址栏 没有# 通过 pushstate 改变 实现路由跳转

   hash 不需要后端支持 url地址栏 有 # 通过 hashchange 改变实现路由跳转

7. 嵌套路由 和 vue 基本一样

但是 二级路由的 出口 不是 vue 的 router-view 而是 <Outlet />

默认 二级 路由 给配置项 设置一个 index:true 不需要 path

8. 404 页面

path:"\*" 就可以了
