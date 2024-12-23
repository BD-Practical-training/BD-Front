<template>
  <div>
    <el-button @click="login">Default</el-button>
  </div>
</template>
<script setup lang="ts">
import api from '../../api/api';
import { ref } from 'vue';
// 定义响应式变量 message
const message = ref<string>('');
const login = async (): Promise<void> =>{
  try {
    // 发送 GET 请求，并获取字符串
    const response = await api.get<string>('/message');
    message.value = response.data;  // 将响应内容赋值给 message
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
</script>


<style scoped>

</style>