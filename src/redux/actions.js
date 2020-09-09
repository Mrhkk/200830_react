//包含n个action creator函数的模块   同步action：对象{type：‘xxx’，data:"数据值"}  异步action：函数 dispatch=>{}
// 设置同步标题的同步action
import { SET_HEAD_TITLE, INCREMENT, DECREMENT } from './action-types'
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })
export const increment = (num) => ({ type: INCREMENT, data: num })
export const decrement = (num) => ({ type: DECREMENT, data: num })
    // 异步增加的actions
export const incrementAsync = (num) => {
    return dispath => {
        // 执行定时器Ajax请求，promise
        setTimeout(() => {
            // 当前异步任务执行完成时，分发一个同步action
            dispath(increment(num))
        }, 1000)
    }
}