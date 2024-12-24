<template>
  <div>
    <el-button @click="login">FeignRibbonTest</el-button>
  </div>
</template>
<script setup lang="ts">
import api from '../../api/api';
// 定义响应式变量 message
const message = ref<string>('');
const login = async (): Promise<void> =>{
  try {
    // 发送 GET 请求，并获取字符串
    const response = await api.get<string>('/remoteFeign?name=vue3.0');
    message.value = response.data;  // 将响应内容赋值给 message
    ElMessage.success(response.data)
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
</script>


<style scoped>

</style>
