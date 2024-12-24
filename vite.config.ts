//现有配置项
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//element-plus按需引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


// 修改为箭头函数方便后续添加变量
export default defineConfig(()=>{
    return {
        server: {
            // 将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
            host: true,
            port: 8888,
            // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
            strictPort: false,
            //表示服务器将在启动时自动打开浏览器并访问指定 URL
            open: true,
            //设置代理设置
            proxy: {
                '/api': {  //   若请求的前缀不是这个'/api'，那请求就不会走代理服务器
                    target: 'http://localhost:8083',  //这里写路径
                    pathRewrite: { '^/api': '' }, //将所有含/api路径的，去掉/api转发给服务器
                    ws: true,  //用于支持websocket
                    changeOrigin: true   //用于控制请求头中的host值
                },},
    // 指定服务器响应的 header
    headers: {},
},
    plugins: [vue(),
        Components({
            resolvers: [
                // 自动注册 Element Plus 组件
                ElementPlusResolver(),
            ],

        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router'],
            dts: './auto-imports.d.ts',
            eslintrc: {
                // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
                enabled: false,
                // 生成文件地址和名称
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true
            }
        }),


    ],
}
})
