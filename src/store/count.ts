import { defineStore } from 'pinia'
import { json } from 'stream/consumers'
export const useCountStore = defineStore('count', {
  // 数据初始值
  state() {
    return {
      sum: 4
    }
  },
  // state(){
  //   return {
  //     sum:json.parse(localStorage.getItem('a') as string) || []
  //   }
  // },
  // 修改方法,用于响应组件中的动作
  actions: {
    test(value) {
      this.sum += value
    }
  },
  // 可以将 state里的数据进行修改,类似于 computed，也可以用this修改
  getters: {
    bigsum(state) {
      return state.sum + 10
    }
    // bigsum:(state) => state.sum + 10
    // bigsum(): number {
    //   return this.sum + 10
    // }
  }
})
