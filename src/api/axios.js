import axios from "axios";
import qs from "qs";
import { apiHost } from "./config";
import storageUt from "../utils/storageUt"
import { message } from "antd";
const user = storageUt.getUser()
    // import router from '../../router'

// axios.defaults.headers.post["Content-Type"] = "application/json";
/** --------------------------------添加请求拦截器，在发送请求之前做些什么--------------------------------- */
axios.interceptors.request.use(
    function(config) {
        // 显示loading
        // //无使用者信息,则进入登录页
        // if (!sessionStorage.userInfo) {
        //   return router.push("/Login");
        // }
        return config;
    },
    function(error) {
        // 请求错误时弹框提示，或做些其他事
        return Promise.reject(error);
    }
);

/** --------------------------------添加响应拦截器--------------------------------- */
axios.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
        return response.data;
    },
    function(error) {
        // 对响应错误做点什么
        // console.log("添加响应拦截器错误", error);

        return Promise.reject(error);
    }
);
axios.defaults.withCredentials = true;

class ApiClient {
    /** --------------------------------封装axios--------------------------------- */
    api(method, endpoint, params, type) {
            let header = {};
            // console.log(params);

            let token1 = user.token

            if (!type) {
                header = {
                    "Content-Type": "application/json;charset=UTF-8",
                    "token": token1
                };
            } else {
                header = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "token": token1
                };
                params = qs.stringify(params);
            }
            if (method === "FILE") {
                header = {
                    "Content-Type": "multipart/form-data",
                    "token": token1
                };
                method = "POST";
            }

            let options = {
                url: apiHost + endpoint,
                method: method,
                headers: header,
                params: method === "GET" || method === "DELETE" ? params : null,
                data: method === "POST" ? params : method === "PUT" ? params : null,
                // data: method === "POST" || method === "PUT" ? params : null,
                timeout: 8000
            };

            // if (method === 'GET') {
            //     let query = null;
            //     for (let key in params) {
            //         if (!query) {
            //             query = `${key}=${params[key]}`;
            //         } else {
            //             query += `&${key}=${params[key]}`;
            //         }
            //     }
            //     if (query) {
            //         options.url = apiHost + endpoint + '?' + query;
            //     }
            // } else if (method === 'POST') {
            // options.form = params;
            // }
            // 注意**Promise**使用(Promise首字母大写)

            return new Promise((resolve, reject) => {
                axios(options)
                    // 此处的.then属于axios
                    .then(res => {
                        // 处理成功返回
                        this.successState(res);
                        resolve(res);
                    })
                    .catch(response => {
                        // 处理失败返回
                        // console.log("失败结果", response);
                        this.errorState(response);
                        reject(response);
                    });
            });
        }
        // ---------------------------封装数据返回成功提示函数------------------------------------------------
    successState(response) {
            // 隐藏loading
            // 如果http状态码正常，则直接返回数据
            // console.log("successState", "成功提示函数", response);
            if (
                response &&
                (response.state === 200 ||
                    response.state === 304 ||
                    response.state === 400)
            ) {
                // 如果不需要除了data之外的数据，可以直接 return response.data
                // console.log("successState", "成功提示函数");
                return response;
            }
        }
        // --------------------------------封装数据返回失败提示函数-------------------------------------------
    errorState(res) {
        // 隐藏loading
        // 统一判断后端返回的错误码(错误码与后台协商而定)Error: Network Error
        if (res) {
            // console.log("errorState", "数据错误", res);
            message.error('network Error')
            return res;
        }
    }
}

const apiAxios = new ApiClient();

export default apiAxios;