// src/services/api.ts
import axios from 'axios';

// 创建 Axios 实例
const api = axios.create({
    baseURL: '/api', // 使用相对路径，代理会处理前缀
    timeout: 10000, // 设置请求超时
});



export default api;
