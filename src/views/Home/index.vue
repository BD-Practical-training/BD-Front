<template>
  <div>
    <el-button @click="login">FeignRibbonTest</el-button>
    <el-button @click="openPirTask">PirTask</el-button>
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

const openPirTask = () =>{
  ElMessageBox.prompt('请输入您要查询的参数', 'PirTask', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        /**
         * action 的值为'confirm', 'cancel'或'close'；
         * instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；
         * done 用于关闭 MessageBox 实例
         */
        // console.log(instance.inputValue)
        instance.confirmButtonLoading = true;
        let params=instance.inputValue.split(',').map(temp => temp.trim());
        api.post('/feignPirTask', params, {
          headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
              if(response.data.success){
                ElMessage.success("任务id："+response.data.taskId+"运行成功");
                ElMessage.success("已保存文件至"+response.data.taskContentParam.outputFullFilename);

              }else{
                ElMessage.error(response.data.error)
              }
            })
            .catch(error => {
              ElMessage.error(error)
            })
            .finally(()=>{
              instance.confirmButtonLoading = false;
              done();
            })
        ;
      } else {
        done()
      }
    },
  })
      .then(() => {
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Input canceled',
        })
      })
}
</script>


<style scoped>

</style>
