<template>
  <div>
    <h1>这是页面2</h1>
  </div>
  <div>
    <router-link :to="{path:'/pageTwo/detail'}">test</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import type Detail from './detail.vue'
import { routerview } from 'vue-router'
</script>

<style>
</style>