import axios from 'axios'
import confing from '../confing'

const baseUrl = process.env.NODE_EMV === 'development' ? confing.baseUrl.dev : confing.baseUrl.pro


class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getInsideConfing() {
        const config = {
            baseUrl: this.baseUrl,
            Header: {}
        }
        return config
    }
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
                // 在发送请求之前做些什么    // 
                return config
            },
            function (error) {
                // 对请求错误做些什么
                return Promise.reject(error);
            });
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response);
            // 对响应数据做点什么
            return response
        }, function (error) {
            // 对响应错误做些什么
            return Promise.reject(error);
        })
    }
    request(options) {
        const instance = axios.create()
        options = {
            ...this.getInsideConfing(),
            ...options
        }
        this.interceptors(instance)
        return instance(options)
    }
}


export default new HttpRequest(baseUrl)