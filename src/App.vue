<template>
  <h1 class="A">{{ A }}</h1>
  <button @click="changeA">按钮</button>

  <h3>姓名:{{ person.name }},年龄:{{ person.age }}</h3>
  <button @click="changeName">改变姓名年龄按钮</button>

  <ul>
    <li v-for="item in game" :key="item.id">{{ item.name }}</li>
  </ul>
  <button @click="changeGameName">修改名称</button>

  <p>这个车的品牌是{{ cars.brand }},它的价格是{{ cars.price }}万</p>
  <button @click="changeCar">修改汽车</button>

  <p>书的数量是否大于0</p>
  <p>普通写法{{ books.length > 0 ? true : false }}</p>
  <p>computed写法{{ ans }}</p>
  <p>函数写法 {{ booksans() }}</p>
  <p>
    computed写法 和 函数写法 得到的结果完全一样， 他们的区别就是computed
    是依赖被缓存，只有当依赖更新以后才回去重新计算，而函数就是每次都回去计算
  </p>
  <br /><br /><br />

  <input v-model="firstName" /> <br />
  <input v-model="lastName" /> <br />
  <p>{{ fulllName }}</p>
  <br />
  <button @click="changeFullName">修改名称</button> <br />

  <p>{{ sum }}</p>
  <br />
  <button @click="changeSum">监视数据</button>

  <!-- 这个是子组件  用来写watch 的后面四种情况 -->
  <test ref="ren"></test>
  <button @click="ceshi">ceshi</button>
  <!-- <br><br><br><br><br><br><br><br>
  <RouterLink to="/pageOne"
              active-class="">页面1</RouterLink> <br>
  <RouterLink to="/pageTwo"
              active-class="">页面2</RouterLink> <br>

  这是 to 的 几种写法
  <RouterLink :to="{path:'/pageTwo'}"
              active-class="">页面2</RouterLink> <br>
  <RouterLink :to="{name:'second'}"
              active-class="">页面2</RouterLink> <br>
  <div>
    <RouterView></RouterView>
  </div> -->
  <br />
  <br />
  <todoList></todoList>
  <br />
  <br />

  <!-- 简单手动封装一个 input 输入框 -->
  <emitInput v-model="abc" placeholder="ceshi">
    <template #prepend>
      <el-select style="width: 115px" v-model="qwe">
        <el-option value="1" label="hao"></el-option>
        <el-option value="2" label="en"></el-option>
      </el-select>
    </template>
  </emitInput>
</template>

<script lang="ts" setup>
// 在script上面写setup语法糖，就不用写 export default setup（）{return}
import { ref, reactive, toRefs, computed, watch } from 'vue'
import test from './components/test.vue'
import todoList from './components/todoList.vue'
import emitInput from './components/emitInput.vue'
// import { RouterView, RouterLink } from 'vue-router'
// 这个是ref定义基本数据类型响应性
let abc = ref('')
let qwe = ref('')

let A = ref(0)
function changeA() {
  A.value += 1
  console.log(A)
}

// 这是用reactive定义对象类型响应性
let person = reactive({
  name: '杨兵',
  age: 18
})
function changeName() {
  person.name = '张三'
  person.age = 22
  console.log(person)
}

// 这是用ref定义对象类型响应性，用reactive和ref 定义对象类型的时候  他们的区别就是ref需要用.value   而且ref里面的值 还是会用到reactive
// 而且reactive 他不能改变对象，他可以改变对象里面的属性  但是不能将一个对象改编成另一个对象  不然就会失去响应性
let game = ref([
  { id: 1, name: '王者荣耀' },
  { id: 2, name: '原神' },
  { id: 3, name: '刺激战场' }
])
function changeGameName() {
  game.value[0].name = '你猜成功没有'
}

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
  ;(brand.value = '奥迪A6L'), (price.value = 40)
}

// 这是计算属性
// 也用到了普通函数   他们的区别就是 computed 是依赖被缓存，只有当依赖更新以后才回去重新计算，而函数就是每次都回去计算
let books = reactive([
  { id: 1, name: 1 },
  { id: 2, name: 2 }
])
let ans = computed(() => {
  return books.length > 0 ? true : false
})
function booksans() {
  return books.length > 0 ? true : false
}

// 这是computed 的不同场景
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

// watch的第一种情况，监视ref定义的数据
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

let ren = ref()
function ceshi() {
  console.log(ren.value)
}
</script>

<style>
.A {
  border: 1px;
  width: 100%;
  height: 60px;
  background-color: aquamarine;
}
</style>
