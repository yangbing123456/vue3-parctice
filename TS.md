# JS中的困扰

1. 不清不楚的数据类型
<script>
  let welcome = 'hello'
  welcome() // 这个时候会报错 typeError welcome is not a function
</script>
2. 有漏洞的逻辑
<script>
  const str = Date.now() % 2 ? '奇数' : '偶数'
  if(str !== '奇数'){
    alert('hello')
  }else if(str === '偶数'){
    alert('1')
  }
</script>
3. 访问不存在的属性
<script>
  const obj = {name:'yang',age:16}
  const arr = obj.nmae
</script>
4. 拼写错误
<script>
  const message = 'hello,world'
  message.toUperCase()
</script>

# TS 静态类型检查

就是在代码运行之前检查，发现代码的错误，使用TS就是为了规避js的各种不合理的错误，让开发者提前知道错误

# 编译 TS

1. 命令行编译
   创建一个ts文件 比如 index.ts
   安装 TS npm i typescript -g
   使用命令编译ts tsc index.ts

2. 自动化编译
   创建一个 ts文件 比如 index.ts
   命令行 输入 tsc --init 会生成一个 tsconfig.json 这个配置文件 在这个文件里面进行配置
   然后 在命令行 输入 tsc --watch 监视项目所有的ts 文件，自动转成js

3. tips：用webpack 或者 vite 创建的项目 脚手架 会帮我自动处理这些事情，所以 我们不需要再做这些事情了

# 类型声明

可以声明为小写，也可以声明为大写，他们的区别就是 小写 只能定义 该类型，大写可以 用 new String/Number/Boolean() 方式，小写是官方推荐

<script>
  let a:string // a 只能定义字符串的数据类型
  let b:number // b 只能定义数字类型
  let c:boolean // c 只能定义布尔类型

  a = 18 // 报错
  a = 'str' // 可以

  // type fnc = function(a:number):number{} 
  // function count():fnc{

  // }

  function count(x:number,y:number):number{
    return x + y
  }
  count(1,2) // 这里只能传两个参数 两个参数都只能传数字类型，并且 函数返回的值也只能是数字类型
</script>

# 类型总览

tips: js 的类型都包含之外还包含一下类型

1. any
2. unknow
3. never
4. void
5. tuple
6. enum

自定义类型
type
interface

<script>
一 // any类型的变量可以赋值给任意类型的变量，这是一个坑比如：
let a:any
a = false
let b: string
b = a // 这是可以赋值成功的 但是这个是有问题的 因为b明确是一个string 类型

二 // unknow  数据类型就是安全的any 类型 没有上面的坑 但是会有一个问题
// 为了避免 所有的都不能赋值成功  我们给它加一个判断
if(typeof a === 'string' ){
  b = a
}
b = a as string

三 // never 不能有返回值  通常用于函数   就是不能写return   不能正常结束

四 // void 通常也用于函数   返回undefined   void 可以接受，其他不行
// void 和 undefined 的区别 就是  void 返回的undefined   不能拿着返回的结果去做后续的操作，而undefined数据类型  返回的结果  可以去做后续的操作


五 // object 和Object  小写的
let person:object // 可以存 非基本类型
person={} [] function(){} // 等等

let person:Object // 可以调用到Object方法的类型，基本上都可以存

5.1 // 定义对象
let person:{name:string,age?:number}
person = {name:'1',age:13} // 这里必须写name 和 age  因为 上面限制了,? 代表可写可不写

5.2 // 定义函数 下面代码表示 给count函数做ts限制
//必须是一个函数 而且 它的入参 也必须只有一个值  并且这个值的数据类型 是数字
// 并且这个函数返回的值 必须是数字类型
let count:(a:number) => number
count = function(a:number):number{
  return a
}
count(1) // 只能传数字类型

5.3 // 定义数组
let arr: string[] // 这个表示 数组  里面只能接受字符串
let arrTwo: Array<number> // 这个表示数组里面只能接受数字
arr = ['a','b',100] // 这里写100  报错 因为上面定义 接受字符串

六 // tuple 元祖  就是规定了固定的数据类型的数组
let arr1:[string,number] // 这里就是元祖  规定只能定义 两个数据   第一个数据类型是字符串  第二个 数据类型 是数字
let arr2:[string,...number[]] // 这个是可以接受无数多个 数字数据类型

七 // 枚举 enum  将 相关的 做成枚举  一般用于做判断， 数字枚举  一般从1开始递增
// 数字枚举
enum A {
  up,
  down,
  left,
  right
}
// 字符串枚举
enum A {
  up='up', 
  down='down',
  left='left',
  right='right'
}

八 // type 类型
type status = number | string // 这里是自定义一个类型  下面data接受的值 必须是满足status的条件
function person(data:status){
  console.log(data)
}

type area = {
  height:number,
  width:number
}
let A:area

// 特殊情况
type logFnc = () => void // 自定义一个类型   它的限制是一个函数 并且函数的返回值是void

const A:logFnc = function(){
  return 66 // 正常这里的返回值应该是 return undefined 或者不写  但是这里就可以返回所有
}
// 下面这个会报错，不能拿这个返回值做操作，因为限制了是void   如果是undefined 就可以
if(A){

}
</script>

# 类的属性修饰符

<!-- 这个修饰符它是类内部 和 外部 都可以访问的 不管是属性还是方法 -->

1. public
<!-- 受保护的修饰符 类内部可以访问，外部不能访问，但是可以通过调用方法的形式访问 -->
2. protected
<!-- 私有的修饰符  类内部能访问，外部不能访问 -->
3. privite
<!-- 只读的，只能看，不能修改 -->
4. readonly

# 抽象类

抽象类不能new，可以被继承

<script>
  abstract class package {
    // 构造方法
    // weight:number
    // constructor(weight:number){
    //   this.weight = weight
    // }
    constructor(public weight:number){} // 这个是构造器的简写形式

    // 抽象方法
    abstract calculate():number
    // 具体方法
    printPackage(){
      console.log(`${this.weight},${this.calculate}`)
    }

  }
  // const v1 = new package() // 这里是不能new 的  因为是一个 抽象类

  // 继承抽象类

  class standarPackage extends package {
    constructor(weight:number,public unitPrice:number){
      super(weight)
    }
    calculate():number{
      return this.weight * this.unitPrice
    }
  }

  const v1 = new standarPackage(10,5)
  v1.printPackage()
</script>

# interface 接口

1. 定义类的接口
<script>
  // 这里定义了一个person 的规范
  // 要求必须有 name,age属性 和 speak 方法
  interface person {
    name:string,
    age:number,
    speak(n:number):void
  }
  // 这里我们用 person 去 限制 student 类
  class student implements person {
    constructor(public name:string,public age:number){}
    speak(n:number):void{
      console.log(`${n},${this.name},${this.age}`)
    }
  }
  // 这里我们实例化的时候  必须传递 姓名 年龄属性 数据类型也必须一致
  const v1 = new student('张三',18)
  // 这里调用方法的时候 必须只能传一个参数  数据类型是数字类型
  v1.speak(2)
</script>

2. 定义对象接口

<script>
  // 这里定义了一个对象接口，要求name,sex,age 三个属性 和 一个 run 方法
  // 其中 sex属性 是只读的，不能用实例化对象修改
  // age 属性 是可选的，可传可不传
  // run 方法 必须接口一个参数 而且数据类型 是数字
  interface user {
    name:string,
    readonly sex:string // 只读属性
    age?:number // 可选
    run:(n:number) => void
  }
  // 这里用 user 接口 去规范 worker 对象
  const worker:user = {
    name:'张三',
    sex:'男',
    age:18,
    run(n){
      console.log(n)
    }
  }
  // 这里调用 run 方法的时候 必须传一个数字类型参数
  user.run(200)
</script>

3. 定义函数接口

<script>
  interface count {
    (a:number,b:number):number
  }

  const counter:count = (x,y) => {
    return x * y
  }
</script>

4. 接口之间可以继承

<script>
  // 接口继承以后 使用 继承以后得规范 必须满足所有的条件
  interface user {
    name:string,
    age?:number // 可选
  }

  interface test extends user {
    weight:number
  }
  const stu:test = {
    name:'张三',
    age:17,
    weight:110
  }
</script>

5. 接口可合并，重复定义同一个接口，里面的不同 合并，需要满足所有条件

# interface 和 type 的区别

1. interface 专注于 规范 对象和类，它也可以实现继承 和 合并
2. type 可以定义一个别名，但是 它也可以 实现 interface 的继承 和 合并，用 & 交叉

# interface 和 抽象类的区别

1. 接口 只能描述接口，不能有任何实现代码，一个类 可以实现多个接口
2. 抽象类，可以包含抽象方法，也可以包含具体实现方法，一个类只能继承一个抽象类

# 泛型

泛型 就是不确定 以后传递的参数的数据类型，就可以用泛型类替代

<script>
  function loadData<T>(data:T){
    console.log(data)
  }
  loadData<number>(100)
  loadData<string>('张三')
</script>
<!-- 泛型可以有多个 -->
<script>
  function loadData<T,U>(data:T,data1:U){
    console.log(data,data1)
  }
  loadData<number,boolean>(100,true)
</script>

<!-- 泛型接口 -->

<script>
  interface person<T> {
    name:string,
    info:T
  }

  type v1 = {
    title:string
  }
// 这个info  有可能是 数字类型 字符串类型等等
  const user:person<v1> = {
    name:'张三',
    info:{
      title:'ceshi'
    }
  }
</script>

# 类型声明文件

declare 声明

比如 demo.d.ts 这里就可以 用declare声明 写js 就可以了

然后再ts 文件里 引入 这个文件js 就可以了

# ts 注解

这个东西 就和java里的注解非常类似 但是实际前端开发中，我还没遇到，暂时先不学这个
先把前面的知识点消化
