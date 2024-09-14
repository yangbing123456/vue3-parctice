# 如何用webpack 创建一个vue2 的项目

1. 首先电脑上应该具备nodejs环境
2. 其次用npm install vue/cli -g 下载vue2脚手架
3. 然后用指令 vue create projectName 去创建项目
4. 然后根据提示完成创建
5. 最后npm install 下载依赖 npm run dev 启动项目(根据package.json)

# 如何用vite 创建一个vue3 的项目

1. 根据官方文档提示来做，nodejs版本需要高于18
2. 在命令提示符里面执行 npm create vue@latest
3. 然后根据提示完成创建
4. 最后npm install 下载依赖 npm run dev 启动项目

# vue3 和 vue2 组合式api，选项式api 的区别

vue2 采用的是 选项式api 这种主要是 拆分成具体的data，methods，name，components以及 computed，watch，生命周期
vue3 就是利用setup 这个钩子函数 将这些东西进行组合 setup 这个钩子函数 是运行在最前面的 比beforcreate 更早

<script lang="ts">
  export default{
    setup(){
      // 这里就是定义的数据  比如
      let A = 0
      // 这里就是定义的方法  比如
      function changeA(){

      }
      // 这里必须返回 不然模板用不了
      return {A,changeA}
    }
  }
</script>

# vue3 setup 语法糖

在script 上面写了一个setup 那么就不需要export default{ setup(){ return{} }}

<script lang="ts" setup>
  // setup 语法糖的作用 就是不需要返回  模板直接可以使用
  // 这里定义数据
  let A = 0
  // 这里定义方法
  function changeA(){

  }
</script>

# vue3 用ref定义基本数据类型

上面的例子 数据是不具备响应性的 如果要求数据具备响应性 在vue3 中可以使用ref 和 reactive 两种方法
ref 既可以定义基本数据类型 也可以定义对象类型，但是用ref定义的数据 只有在模板中不需要.value 在js里面 任何地方都需要用到.value 去修改值

<script lang="ts" setup>
  // setup 语法糖的作用 就是不需要返回  模板直接可以使用
  import {ref} from 'vue'
  // 这里定义数据 这个时候A 变量就具有了响应性
  let A = ref(0)
  // 这里定义方法
  function changeA(){
      A += 1
  }
</script>

# vue3 用reactive 定义对象类型

用reactive和ref 定义对象类型的时候 他们的区别就是ref需要用.value 而且ref里面的值 最后还是会用到reactive去完成响应性
而且reactive 他不能改变对象，他可以改变对象里面的属性 但是不能将一个对象改编成另一个对象 不然就会失去响应性

<script lang="ts" setup>
  import {reactive} from 'vue'
  let person = reactive({
    name: '杨兵',
    age: 18
  })
  function changeName() {
    person.name = '张三'
    person.age = 22
    console.log(person)
    // person = {name:'1',age:22} 这样是行不通的  
    // 如果是reactive 定义的对象类型 想要整体修改被定义的对象 可以使用下列方法
    Object.Assign(person,{name:'1',age:22})
  }
</script>

# vue3 用ref去定义对象类型

<script lang="ts" setup>
  import {ref} from 'vue'
    let game = ref([
    { id: 1, name: '王者荣耀' },
    { id: 2, name: '原神' },
    { id: 3, name: '刺激战场' }
  ])
  function changeGameName() {
    game.value[0].name = '你猜成功没有'
  }
</script>

# vue3 torefs 和 toref 的作用

torefs 就是将用reactive 定义的对象类型 里面的所有属性 都用ref来响应 toref 就是单个
场景：当我们用reactive定义对象类型的时候 我们有时候想要将对象里面的某些值解构出来使用 就可以用到torefs 和 toref

<script lang="ts" setup>
  import {reactive,toRefs} from 'vue'
  // 这是用reactive定义对象类型的时候，如果想要解构赋值出来对象里面的属性，那么属性就会失去响应性
  // 这个时候就需要用 torefs  来将 对象里面的每一项都变成用ref定义的响应性。
  let cars = reactive({
    brand: '星越L',
    price: 10
  })
  // function changeCar(){
  //   cars.brand = '本田Crv',
  //   cars.price = 20
  // }

  let { brand, price } = toRefs(cars)
  function changeCar() {
    brand.value = '奥迪A6L',
    price.value = 40
  }
</script>

# vue3 computed 的用法

<script lang="ts" setup>
  import {reactive,computed} from 'vue'
  // 这是计算属性
  // 也用到了普通函数   他们的区别就是 computed 是依赖被缓存，只有当依赖更新以后才回去重新计算，而函数就是每次都回去计算
  let books = reactive([
    { id: 1, name: 1 },
    { id: 2, name: 2 }
  ])
  //  这种情况 ans 是只读的
  let ans = computed(() => {
    return books.length > 0 ? true : false
  })
  //  这是普通函数
  function booksans() {
    return books.length > 0 ? true : false
  }

  // 这是computed 的不同场景
  // 想要改变 fullName  那么 就需要用到下面这种写法 就是 get 和 set
  let firstName = ref('张')
  let lastName = ref('三')
  let fulllName = computed({
    get() {
      return firstName.value + lastName.value
    },
    set(val) {
      firstName.value = val.slice(0, 1)
      lastName.value = val.slice(1)
    }
  })
  function changeFullName() {
    fulllName.value = '李四'
  }
</script>

# vue3 watch 的第一种用法 ref监视基本类型

在vue3中 watch 是一个方法 watch() 它接收很多个参数 但是用一般情况两个就够了
第一个是监视的对象，第二个是回调函数  
watch 返回的是一个函数 可以用它来停止监视

<script lang="ts" setup>
  import {ref,watch} from 'vue'
  // watch的第一种情况，监视ref定义的基本数据
  let sum = ref(0)
  function changeSum() {
    sum.value += 1
  }
  // 这里的stopwatch  是 watch 返回的值  返回的是一个函数  用来停止监视
  // watch 在vue3 里面  是一个函数  里面会有很多歌入参  监视ref定义的数据  一般两个参数就可以了
  // 第一个是你要监视的对象，第二个是一个回调函数  这个回调函数里面会有两个入参
  let stopWatch = watch(sum, (newValue, oldValue) => {
    console.log(newValue, oldValue)
    if (newValue >= 10) {
      stopWatch()
    }
  })
</script>

# vue3 watch 的第二种用法 ref监视对象类型

当我们用ref监视对象类型的时候，watch 会接受三个参数
第一个参数是 被监视的对象 第二个参数是回调函数 第三个参数是配置对象{deep:true,immediate:true}
第三个参数里面还可以配置很多 一般用到深度监视 和立即监视
如果不用 deep:true 那么当我们改变被监视对象里面的某个属性的时候 不会触发监视

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  let cars = ref({
    brand: '奥迪',
    price: 100
  })
  function changeBrand() {
    cars.value.brand = '奔驰'
  }
  function changePrice() {
    cars.value.price = 55
  }
  function changeCars() {
    cars.value = { brand: '宝马', price: 22 }
  }

  watch(
    cars,
    (newValue, oldValue) => {
      console.log(newValue, oldValue)
    },
    { deep: true }
  )
</script>

# vue3 watch 的第三种用法 reactive 监视对象类型

当我们用reactive监视对象类型的时候 默认自带深度监视

<script lang="ts" setup>
  import { reactive, watch } from 'vue'
  let cars = reactive({
    brand: '奥迪',
    price: 100
  })
  function changeBrand() {
    cars.brand = '奔驰'
  }
  function changePrice() {
    cars.price = 55
  }
  function changeCars() {
    // cars = { brand: '宝马', price: 22 }
    Object.Assign(cars,{brand:'宝马',price:22})
  }

  watch(
    cars,
    (newValue, oldValue) => {
      console.log(newValue, oldValue)
    }
  )
</script>

# vue3 watch 的第四种用法 reactive 监视对象类的属性

这是watch 的第四种用法 监听对象类型里面的具体属性
如果属性类型是基本类型 被监视的对象 直接写成 函数式就可以了
如果属性类型 是对象类型 被监视的对象 没有写成函数式 那么可以监视到对象里面具体的属性值 不能监视到该对象本身的地址
如果写成了函数式 那么就可以监听到该对象本身的地址 但是监视不到里面的属性值
如果想要都监视到 首先被监视的对象 要写成函数式 其次 要在第三个参数 配置对象 里面 加上深度监视 deep:true

<script lang="ts" setup>
  import {reactive,watch} from 'vue'
  
  let person = reactive({
    name: '张三',
    age: 18,
    cars: {
      c1: '奥迪',
      c2: '奔驰'
    }
  })

  function changeName() {
    person.name += '1'
  }
  function changeAge() {
    person.age += 1
  }
  function changeC1() {
    person.cars.c1 = '雅迪'
  }
  function changeC2() {
    person.cars.c2 = '爱玛'
  }
  // 这里只是修改的对象里面的属性 并么有修改这个对象本身 所以不用 object。assign 来做
  function changeCars1() {
    person.cars = { c1: '1', c2: '2' }
  }

  // 当监视 对象里面的属性是 基本类型的时候 可以直接使用函数式，官方说 一个函数返回一个值  如果直接写成 person.name  会报错 提示监视源错误
  watch(
    () => person.name,
    (newValue, oldValue) => {
      console.log(newValue, oldValue)
    }
  )

  // 当监视 对象里面的属性 也是一个对象类型的时候  那么直接写成 下面这样 只能监视到对象里面的具体属性  不能监视到该对象本身的地址
  // watch(person.cars, (newValue, oldValue) => {
  //   console.log(newValue, oldValue)
  // })

  // 如果写成函数式  那么就只能监视到 该对象本身的地址  监视不到对象里面的具体属性值
  // 如果想要监视到对象里面的具体属性值  要在后面加上 深度监视
  watch(
    () => person.cars,
    (newValue, oldValue) => {
      console.log(newValue, oldValue)
    },
    { deep: true }
  )
</script>

# vue3 watch 的第五种用法 监视一个数组

当我们想要监视多个数据的时候，可以用数组来监视
注意点 和 watch 的第四种情况一样 只不过这里监视的是数组

<script lang="ts" setup>
  import {reactive,watch} from 'vue'
  let person = reactive({
    name: '张三',
    age: 18,
    cars: {
      c1: '奥迪',
      c2: '奔驰'
    }
  })

  function changeName() {
    person.name += '1'
  }
  function changeAge() {
    person.age += 1
  }
  function changeC1() {
    person.cars.c1 = '雅迪'
  }
  function changeC2() {
    person.cars.c2 = '爱玛'
  }
  // 这里只是修改的对象里面的属性 并么有修改这个对象本身 所以不用 object。assign 来做
  function changeCars1() {
    person.cars = { c1: '1', c2: '2' }
  }
  watch(
    [() => person.name, () => person.cars],
    (newValue, oldValue) => {
      console.log(newValue, oldValue)
    },
    { deep: true }
  )
</script>

# vue3 watchEffect 的用法

注意：当我们用watch监视数据的时候，我们需要给它指明需要监视的数据，watchEffect 就不需要关注监视的对象 用到谁就监视谁

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue'
  let temp = ref(10)
  let height = ref(0)

  function changeTemp() {
    temp.value += 10
  }
  function changeHeight() {
    height.value += 10
  }
  // 如果用watch 监视  那么就需要指出  需要监视的对象
  // watch([temp, height], (newValue, oldValue) => {
  //   let [t, h] = newValue
  //   if (t >= 60 || h >= 80) {
  //     console.log('发送请求')
  //   }
  // })

  // 但是如果用watchEffect监视 那么就不需要关注监视的对象，你用到什么 就监视什么
  watchEffect(() => {
    if (temp.value >= 60 || height.value >= 80) {
      console.log('发送请求')
    }
  })
</script>

# vue3 标签上 ref 的用法

1. 当在html标签上用ref 的时候 ref = "name" 给这个name 用 ref 响应性包裹起来 不传值 这个时候 这个 name 就是你的html内容
2. 当在 组件标签上 用 ref 的时候 那么这个时候 就是该组件的实例， 如果该组件 用 defineExpose 这个暴露出来什么 你才能看到什么
<template>
  <div ref="waterTemp">水温：{{ temp }}</div><br>
  <button @click="changeref">标签上的ref测试</button>

  <!-- 这是子组件标签 -->

<test ref="ren"></test>
<button @click="ceshi">ceshi</button>
</template>

<script lang="ts" setup>
  import { ref, defineExpose } from 'vue'

  let waterTemp = ref()
  function changeref() {
    // 这个时候 打印出来的就是 这个div标签以及里面的内容
    console.log(waterTemp.value)
  }
  let A = ref(0)
  defineExpose({ A: A.value })

  // 这个时候 打印出来的就是 子组件想要暴露给你看的 A   需要用到 defineExpose 
  let ren = ref()
  function ceshi() {
    console.log(ren.value)
  }
</script>

# TS 定义接口、泛型、自定义诶行

<script>
// 定义一个接口  用于限制personInter的具体属性格式
export interface personInter {
  id:number,
  name:string,
  age:number
}

// 一个自定义类型
export type persons = Array<personInter>
</script>

<script setup lang="ts">
// 这里引入的时候需要注意 必须协商type 因为是一个规范引入的是  不然会报错
import { type personInter, type persons } from '@/types'
let people: personInter = {
  name: '张三',
  age: 22,
  id: 112233
}
// let peopleList:Array<personInter>   这里也可以这样写  但是 下面这种看起来更简单一点
let peopleList: persons = [
  {
    name: '张三',
    age: 22,
    id: 112233
  },
  {
    name: '李四',
    age: 11,
    id: 234
  }
]
</script>

# vue3 prop 的使用

1. 直接接收数据
   父组件：
   <chilrden :test="dataList">

<script setup>
import {reactive} from 'vue'
let dataList = reactive([
  {id:1,name:1},
  {id:2,name:2}
])
</script>

子组件：

<script setup>
  import {defineProps} from 'vue'
  // 这个时候就可以直接使用了
  defineProps(['dataList'])
</script>

2. 接收数据，并且做限制类型
   父组件 和 第一种情况一样

子组件：

<script setup>
  import {defineProps} from 'vue'
  import { type persons } from '@/types
  // 做限制类型  dataList 我们传过来的数据   然后把我们自定义的 persons ts 规范引入
  //  这个代码的意思就是  我们只接受父组件传递过来的 dataList 数据  并且 我们给这个数据加上TS 校验
  defineProps<{dataList:persons}>()
</script>

3. 接收数据，并且做限制类型，限制必要性，指定默认值

父组件： 和 上面的情况一直 但是你可以选择不传值 也不会报错

子组件：

<script setup>
  import {defineProps,withDefault} from 'vue'
  import { type persons } from '@/types
  //  下面代码的意思就是 问号 代表  父组件可传可不传。withDefault 代表指定默认值，这个默认值是一个对象
  // 这个对象还需要用一个函数返回  不然会报错
  withDefault(defineProps<{dataList?:persons}>(),{
    dataList:()=>{[{id:1,name:1}]}
  })
</script>

# vue3 的生命周期

与vue2 生命周期不同的是 创建前和创建后 用 setup 代替了 只有创建
挂载前 是 onbeforemount 挂载后 是 onmounted
更新前 是 onbeforeupdate 挂载后是 onupdated
卸载前 是 onbeforeunmount 卸载后 是 onunmounted

v-if 和 v-show 的区别 虽然都是隐藏元素 但是 v-if 是将元素彻底销毁 元素的结构也没有了 v-show 虽然也是隐藏 但是 是利用 display：none

# vue3 自定义hooks

自定义hooks 的目的 就是为了让主页面更加简洁，将js 逻辑 抽离到 单独的js文件去

这里是抽离出去的js 逻辑，这里面可以写 生命周期 watch computed 等等方法

<script>
  import { ref } from 'vue'
  export default function(){
    
    let sum = ref(0)
    function sumAdd() {
      sum.value += 1
    }

    return { sum, sumAdd}
  }

</script>

主页面这里引入 可以直接使用 该文件就不需要定义数据了

<script>
  import useSum from '../hooks/sum'

  const { sum, sumAdd } = useSum()
</script>

# vue3 路由

1. 路由的工作模式
   history，hash
   vue2 写法 mode:'history'
   vue3 写法 history:createWebHistory()

history 路径更加美观，路径里面不带#，缺点就是项目上线，需要服务器配合处理路径问题，
否则刷新会有404

hash 兼容性更好，因为不需要服务器处理路径，缺点就是 url路径中带有#号，且在SEO优化较差

2. to的写法
   直接写 to="home"，
   写对象 :to="{path:'home'}" :to="{name:home}"

3. 命名路由，给路由配置里面 加一个name属性

和 vue2 路由不同的是，vue3 创建路由 使用 createRouter 这个钩子函数,路由模式 用的是 createWebHistory 钩子函数

<script>
  import {createRouter,createWebHistory} from '.vue'
  import routes from './router.js'
  let router = createRouter({
    history:createWebHistory(),
    routes:routes,
  })
</script>

4. 嵌套路由
   <!-- {
   name: 'second',
   path: '/pageTwo',
   component: PageTwo,
   children: [
   {
   path: '/detail',
   name: 'detail',
   component: detail
   }
   ]
   } -->

5. 路由传参
这种方式的传参比较low
<script>
  <router-link :to="`/news/detail?id=${a}&title=${b}`"></router-link>
</script>

用query传参，这种传参和params的区别就是 这种是在url地址栏上看得到

<script>
  <router-link :to="{path:'detail',query:obj}"></router-link>
</script>

用 params 传参 这种好像不允许传对象数组类型  
在 vue3 中 这种传参方式 好像还需要占位 就是在 path 里面写变量占位

vue2 取值 this.route.query / params

vue3 取值
import { useRoute } from 'vue-router'
let routeData = useRoute()
routeData.query / params
这样就可以取到值了

注意点：从一个响应式对象去解构，会丢失响应性，那么就需要用 torefs

<script>
  <router-link :to="{path:'detail',params:obj}"></router-link>
</script>

# 路由props 配置

1. 这种 设置 props 为 true 的情况 只适用于 params 情况，params 只能用 name跳转
用 defineProps(['id','title']) 来接受
<script>
// {
//   name: 'second',
//   path: '/pageTwo',
//   component: PageTwo,
//   children: [
//     {
//       path: '/detail',
//       name: 'detail/:id/:title',
//       component: detail,
//       props:true
//     }
//   ]
// }
</script>

2. 函数式
还是用 defineProps(['id','title']) 来接受
<script>
  props(route){
    return route.query
  }
</script>

# 路由replace 模式

只需要在 routerlink 上面加一个 replace
默认是 push，push是往里加，replace 是替换

<!-- <router-link replace :to="{path:'/pageTwo/detail'}">test</router-link> -->

# 编程式路由导航

只需要拿到 useRouter 钩子函数 就可以跳转

<script>
  import {useRouter} from 'vue-router'
  let router = useRouter()
  settimeout(()=>{
    router.push('home')
    // router.push({path:'home'},query:obj) 这种写法也可以
  },3000)
</script>

# 路由重定向

价了redirect 这个属性以后 可以直接进入到 你重定向的页面
{
path:'/',
redirect:'/home'
}

# pinia

1. 搭建pinia 环境
   npm i pinia
2. 在main.ts 引入pinia
   import {createPinia} from 'pinia'
   创建pinia
   const pinia = createPinia()
   安装pinia
   app.use(pinia)

3. 将数据存储到store，在项目里面 新建一个store文件夹
   在 stroe 文件夹里面新建我们用到的 .ts 文件

import {defineStore} from 'pinia'
export const useCountStore = defineStore('count',{

<!-- 存储数据的地方 -->

state(){
return {
sum:6
}
}
})

<!-- export const useTalkStore = defineStore('talk',{
state(){
return {
talkList:[
{},
{},
{}
]
}
}
}) -->

tips: 如果是在reactive 里面 包裹的ref数据，我们想要使用
直接使用，不用.value 但是如果是自己定义的ref数据，就要用.value

引入了之后，在 使用到 pinia的vue文件里面 引入
import {useCountStore} from '@/store/name'

4. 获取 state 中的数据
   const countStore = useCountStore()
   countStore.sum

5. 修改数据
   第一种方式 拿到数据 我就可以修改数据
   countStore.sum += 1 这样就修改了

   第二种，数据比较多的时候 可以批量修改
   countStore.$patch({
   sum:1,
   xxx:?
   })

   第三种，用action 这种方式
   这个n 是上面响应式变量
   countStore.test(n.value)

6. tips：
   模版上用 {{countStore.sum}} 不优雅
   这样可以解构出来 但是失去响应性
   const {sum} = countStore

   这样有了响应性，但是这个torefs 它是store里的所有东西都加上了响应性，消耗性能
   const {sum} = torefs(countStore)

   可以用 pinia 自带的 storeTorefs
   import {storeTorefs} form 'pinia'
   const {sum} = storeTorefs(countStore)

7. $subscribe 作用相当于 watch   我们一般用到state
去监听数据的变化
  countStore.$subscribe((mutate,state) => {
   console.log('数据发生变化，触发该方法')
   localstroage.setitem('a',json.stringify( state.sum))
   })

8. store 的组合式写法 其实就是 hooks 将定义的数据和方法要返回
   import {reactive} from 'vue'
   export const useTalkStore = defineStore('talk',() => {
     <!-- 相当于state -->
   const talkList =reactive(
   json.parse(localStorage.getItem('a') as string) || []
   )
     <!-- 相当于actions -->
   async function getTalk(){
   let {data:{content:title}} = await axios.get('url')
   let obj = {id:nanoid(), title}
   talkList.unshift(obj)
   }
   return{talkList,getTalk}
   })

# 组件通信

1. props 父子组件通信
   父传子：
   <child :car="car">
   <script setup name='father'>
   import {ref} from 'vue'
   let car = ref('奔驰')
   </script>

   子接收：
   <script>
   <!-- 就可以使用这个car了 -->
   defineProps(['car'])
   </script>

   子传父：
   <button @click="sendToy(toy)">把玩具给父组件</button>
   <script>
   import {ref} from 'vue'
   let toy = ref('奥特曼')
   defineProps(['sendToy'])
   </script>

   父接收：
   <child :sendToy='getToy'>
   <script setup name='father'>
   function getToy(value:string){
   console.log(value)
   }
   </script>

2. 自定义事件通信

子组件：

<script setup>
  // defineEmits 这个也可以不用引入
  import {defineEmits} form 'vue' 
  const emit = defineEmits(['test'])
  // <!-- 这里就是第一个参数 方法名，第二个参数传递的值 -->
  emit('test',value)
</script>

父组件：

<!-- 这里就可以接受，test方法，然后写一个新的方法去接收子组件传递的值，并且去执行这个新的方法 -->

<child @test="getData">

  <script setup>
    import child from './child.vue'
    function getData(value:number){
      console.log(value)
    }
  </script>

3. mitt 通信方式，感觉和vue2 的 $bus 很类似
都需要先npm 安装 mitt/bus
组件1： 是发送数据
<button @click="fasong()"></button>
<script setup>
  import emmitter from './emmitter.ts'
  function fasong(){
    // 这里是触发了组件2 中的 receive 方法，并且给他传值
    emmitter.emit('receive',value)
  }
</script>

组件2：接受数据

<script setup>
  import emmitter from './emmitter.ts'
  // 这里是绑定了一个receive 方法，并且接受数据
  emmitter.on('receive',(value)=>{
    console.log(value)
  })
</script>

4. v-model 通信

<input type='text' v-model="username" />
<!-- <input type="text" :value='username' @input="username = #event.target.value" /> -->

<script setup>
  import {ref} from 'vue'
  const username = ref('张三')
</script>

<!-- 封装一个组件  用于接收父组件传递的值 -->

父：
<test v-model='username' />

<!-- vue2里面  还是:value 和 @Input  下面的注释 是vue3的写法 -->
<!-- <test :modelValue='username' @update:modelValue='username = $event'></test> -->

子：
<input type='text' :value='modelValue'
@input="emit('update:modelValue',$event.target.value)" />

<script setup>
  defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
</script>

5. 利用 provide 和 inject 来实现爷孙组件传值
<!-- 爷传孙 -->

爷：

<script setup>
  import {provide} from 'vue'
  provide('name',value)
</script>

孙：

<script setup>
  import {inject} from 'vue'
  let value = inject('name')
</script>

<!-- 利用provide  和  inject  实现孙传爷 -->

爷：

<script setup>
  import {provide,ref} from 'vue'
  let value = ref('0')
  function updateValue(data:number){
    value.value += data
  }
  provide('name',{value,updateValue})
</script>

孙：
<button @click='updateValue(6)'>test</button>

<script setup>
  import {inject} from 'vue'
  let {value,updateValue} = inject('name','默认值')
</script>

6. $attrs 通信 通常用于 爷孙通信（感觉这种方式比较麻烦，还要去动父组件）

爷组件传了值 比如 :a = 1 :b = 2 :update='update'
也可以传方法

父组件 如果都不用 defineProps 接收 那么需要再 标签名上
写上v-bind='$attrs'

那么 子组件接收的时候 你可以用 defineProps 来接受 传递过来的参数，他也会放在 $attrs 上面

# 插槽 slot

1. 默认插槽

父组件：
<template>

<!-- 这里引用了两次child 组件
那么子组件就会显示两个内容 -->

<child title='test'>
<ul>
  <li v-for='item in list' :key='item.id'>
</ul>
</child>

<child title='test1'>
  <img :src='imgUrl' />
</child>
</template>

<script setup>
  import child from './child.vue'
  const list = reactive([{
    id:1,
    name:'1'
  },
  {
    id:2,
    name:'2'
  }])
  const imgUrl = 'xxx'
</script>

子组件：
<template>

  <div>
    <h2>{{ title }}</h2>
    <!-- 这里加上 slot 插槽  就可以将父组件中的 内容 放到这个位置来 -->
    <slot></slot>
  </div>
</template>
<script setup>
  defineProps(['title'])
</script>

2. 具名插槽

父组件：
<template>

<!-- 这里引用了两次child 组件
那么子组件就会显示两个内容 -->

<child title='test'>
<ul>
  <li v-for='item in list' :key='item.id'>
</ul>
<!-- v-slot:name 这是插槽指令，绑定具名插槽 -->
<span v-slot:hello>hello</span>
<!-- 如果v-slot 放在template 上使用，就可以简写为#name -->
<template #temp>1</template>
</child>

<child title='test1'>
  <img :src='imgUrl' />
</child>
</template>

<script setup>
  import child from './child.vue'
  const list = reactive([{
    id:1,
    name:'1'
  },
  {
    id:2,
    name:'2'
  }])
  const imgUrl = 'xxx'
</script>

子组件：
<template>

  <div>
    <h2>{{ title }}</h2>
    <!-- 这里加上 slot 插槽  就可以将父组件中的 内容 放到这个位置来 -->
    <slot></slot>
    <slot name='hello'></slot>
    <slot name='temp'></slot>
  </div>
</template>
<script setup>
  defineProps(['title'])
</script>
</template>

3. 作用域插槽
   可以在 slot 标签上 传递参数 ：data='data'

那么使用的时候 就可以用 template 上面 用 v-slot='data'
来接受数据

# 其他vue3 的api
