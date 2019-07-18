import axios from "axios"
import { Message, Loading } from "element-ui"
import { getCookie } from './cookies.js'
let instance = axios.create({
    timeout: 5000
})
let loadingInstance = {};
//请求拦截
instance.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        text: '正在玩命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    config.headers.authorization = getCookie('token')
    return config
}, error => {
    loadingInstance.close()
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return error
})


//响应拦截
instance.interceptors.response.use(res => {
    if ((res.status == 200 || res.status == 201) && res.data.code == 1) {
        loadingInstance.close();
        return res
    } else {
        loadingInstance.close();
        Message({
            showClose: true,
            message: res.data.msg,
            type: "error"
        })
        return res
    }
}, error => {
    loadingInstance.close();
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return error
})


export { instance as axios }
export default {
    install(Vue, options) {
        Object.defineProperty(Vue.prototype, '$http', {
            value: instance
        })
    }
}