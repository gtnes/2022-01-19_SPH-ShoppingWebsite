// 对于axios进行二次封装

// 进引入进度条
import nprogress from "nprogress";  // start和done方法代表进度条开始与结束
// 引入进度条样式
import 'nprogress/nprogress.css';
// 第1步；引入axios
import axios from "axios";
// 引入store仓库
import store from "@/store";

// 第2步；对axios进行配置
// 2.1 利用axios对象的方法create，去创建一个axios实例
// requests就是axios
const requests = axios.create({
    // 配置对象
    baseURL:'/api',  // 基础路径(发送请求的路径都带上/api)
    timeout:5000, // 请求超时时间
})

// 第3步：请求拦截器（在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情）
requests.interceptors.request.use((config)=>{
    // 给请求头添加userTempId(uuid)字段（需要和后台配合好）
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    
    // 给请求头添加token
    // 如果user仓库中有token就带给请求头
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    // 进度条开始动
    nprogress.start()
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    return config
})

// 第4步：响应拦截器
requests.interceptors.response.use(

    // 响应成功回调：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    (res)=>{
        // 进度条结束
        nprogress.done()
        return res.data
    }, 
    //  响应失败回调：
    (error)=>{
        return Promise.reject(new Error('faile'))
    },
)

// 第5步 对外暴露
export default requests;