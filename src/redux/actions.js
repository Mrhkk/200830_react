// 包含n个用来创建action的工厂函数（action,creator）
// export function increment(number) {
//     return {type:'INCREMENT',data:number}
// }
// 增加action creator
import { INCREMENT, DECREMENT } from './action-types'
export const increment = (number) => ({ type: INCREMENT, data: number })
    // 减少action creator
export const decrement = (number) => ({ type: DECREMENT, data: number })