<template>
  <div class="container">
    <span class="span">二次封装的输入框：</span>
    <!-- <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" /> -->
    <el-input v-bind:="$attrs">
      <template v-for="(value, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>

      <!-- <template #prepend>
        <slot name="prepend"></slot>
      </template> -->
    </el-input>
  </div>
</template>
<script setup lang="ts" name="">
// import { defineEmits } from 'vue'
// defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])
</script>
<style scoped>
.container {
  display: flex;
}
.span {
  display: block;
  width: 20%;
}
</style>
