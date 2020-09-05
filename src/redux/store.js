// redux最核心的管理对象
import { createStore } from 'redux'
import reducer from './reducer'
export default createStore(reducer) //创建store对象内部会第一次调用reducer（）为了得到初始状态值