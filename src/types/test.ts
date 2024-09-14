class person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  test() {
    console.log(`我是${this.name},今年${this.age}`)
  }
}
const noob = new person('张三', 18)
noob.test()

class site {
  price: number
  color: string
  constructor(price: number, color: string) {
    this.price = price
    this.color = color
  }
  show() {
    console.log(`${this.price},${this.color}`)
  }
}

class roob extends site {
  name: string
  constructor(name: string, price: number, color: string) {
    super(price, color)
    this.name = name
  }
  display() {
    this.show()
  }
}

const v1 = new roob('张三', 22, '黄色')
v1.display()

// function test(start:number,end:number){
//   let sum = 0
//   for(let i = start;i<=end;i++){
//     sum += i
//   }
// }
// test(1,100)
