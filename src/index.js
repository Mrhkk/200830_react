import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import memoryUt from "./utils/memoryUt";
import storageUt from "./utils/storageUt";
import Api from "./api/api";
import store from "./redux/store";
React.$Api = Api;
const user = storageUt.getUser();
memoryUt.user = user;
ReactDOM.render(<App store={store} />, document.getElementById("root"));
// 给store绑定状态更新的监听
store.subscribe(()=>{
    // 监听store状态数据发生改变时触发的回调
    ReactDOM.render(<App store={store} />, document.getElementById("root"));
})