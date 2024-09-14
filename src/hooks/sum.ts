import { ref } from 'vue'
export default function () {
  const sum = ref(0)
  function sumAdd() {
    sum.value += 1
  }

  return { sum, sumAdd }
}
