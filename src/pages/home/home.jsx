import React, { Component } from "react";
import bg from "./imgs/bg.png";
import "./home.less";
/*
左侧导航的组件
*/

export default class Home extends Component {
  render() {
    return (<div className="home">
        <img src={bg} alt=""/>
        <div className="main">
            <h1>欢迎使用贝豪活动管理系统 !</h1>
        </div>
    </div>)
  }
}