<template>
  <br>
  <div>汽车品牌：{{ cars.brand }}</div>
  <div>汽车价格：{{ cars.price }}</div>
  <button @click="changeBrand">修改品牌</button><br>
  <button @click="changePrice">修改价格</button><br>
  <button @click="changeCars">全部修改</button>

  <br>

  <div>姓名：{{ person.name }}</div><br>
  <div>年龄：{{ person.age }}</div><br>
  <div>第一辆车{{ person.cars.c1 }}、第二辆车{{ person.cars.c2 }}</div> <br>
  <button @click="changeName">修改姓名</button><br>
  <button @click="changeAge">修改年龄</button><br>
  <button @click="changeC1">修改第一辆车</button><br>
  <button @click="changeC2">修改第二辆车</button><br>
  <button @click="changeCars1">修改全部汽车</button><br>

  <br>
  <div ref="waterTemp">水温：{{ temp }}</div><br>
  <div>水位：{{ height }}</div><br>
  <button @click="changeTemp">修改水温</button><br>
  <button @click="changeHeight">修改水位</button>
  <button @click="changeref">标签上的ref测试</button><br><br><br>

  <h1>求和为{{ sum }}</h1><br>
  <button @click="sumAdd">点击求和</button>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, watchEffect, defineExpose } from 'vue'
import { type personInter, type persons } from '@/types'
import useSum from '../hooks/sum'

const { sum, sumAdd } = useSum()
// 这是watch的第二种用法  ref监听对象     第三种用法 reactive 监听对象 和这个很类似 区别就是 reactive 默认深度监视
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

// 这是watch 的第四种用法  监听对象类型里面的具体属性
// 如果属性类型是基本类型 被监视的对象 直接写成 函数式就可以了
// 如果属性类型 是对象类型  被监视的对象  没有写成函数式  那么可以监视到对象里面具体的属性值 不能监视到该对象本身的地址
// 如果写成了函数式  那么就可以监听到该对象本身的地址 但是监视不到里面的属性值
// 如果想要都监视到   首先被监视的对象 要写成函数式 其次 要在第三个参数  配置对象  里面 加上深度监视 deep:true
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
// watch(
//   () => person.cars,
//   (newValue, oldValue) => {
//     console.log(newValue, oldValue)
//   },
//   { deep: true }
// )

watch(
  [() => person.name, () => person.cars],
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
  },
  { deep: true }
)

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

let waterTemp = ref()
function changeref() {
  console.log(waterTemp.value)
}
let A = ref(0)

defineExpose({ A: A.value })

let people: personInter = {
  name: '张三',
  age: 22,
  id: 112233
}

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

// let sum = ref(0)
// function sumAdd() {
//   sum.value += 1
// }
</script>

<style>
</style>