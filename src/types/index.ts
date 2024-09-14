// 定义一个接口  用于限制personInter的具体属性格式
export interface personInter {
  id: number
  name: string
  age: number
}

// 一个自定义类型

export type persons = Array<personInter>
