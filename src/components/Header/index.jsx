import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
import { Modal, Button,Icon } from 'antd';
import {connect} from 'react-redux'
import { formateDate } from "../../utils/dateUtils";
import memoryUt from "../../utils/memoryUt";
import menuList from '../../config/menuConfig'
import storageUt from '../../utils/storageUt'
import "./index.less";
/*
左侧导航的组件
*/
 class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),
  };
  getTime = () => {
    // 每隔一秒获取当前时间更新currentTime
    this.intervaId=setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({
        currentTime: currentTime,
      });
    }, 1000);
  };
  getTitle=()=>{
    const path=this.props.location.pathname
    let title
    menuList.forEach(element => {
      if(element.index===path){
     title=element.title
      }else if(element.subs){
       const citem=element.subs.find(citem=>citem===path)
       if(citem){
        title=citem.title
       }
      }
    });
    return title
  }
  // 退出登录
  logout=()=>{
  Modal.confirm(
    {
      content: '确定退出吗',
      onOk:()=>{
        storageUt.removeUser()
        memoryUt.user={}
        this.props.history.replace('/login')
      }
    }
  )
  }
  changeC=()=>{
    this.props.callback()
  }
  // 第一次render执行之后执行 一般执行异步操作发请求启动定时器
  componentDidMount() {
    // this.getTime();
  }
  componentWillUnmount(){
   clearInterval(this.intervaId)
  }
  render() {
    const { currentTime } = this.state;
    const name = memoryUt.user.name;
    // const title=this.getTitle()
    console.log(111,this.props)
    const title=this.props.headTitle
    return (
      <div className="header">
        <div className="header-top">
          <Button type="primary" onClick={this.changeC.bind(this)} className="btns"><Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} style={{fontSize:'20px'}}/></Button>
          <span className="sone">欢迎，{name}</span>
          <span className="stwo" onClick={this.logout}>退出</span>
        </div>
        <div className="header-bottom">
    <div className="left">{title}</div>
          <div className="right">
            <span>{currentTime}</span>
            <img
              src="http://api.map.baidu.com/images/weather/day/qing.png"
              alt="weather"
            />
            <span>晴</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state=>({headTitle:state.headTitle}),{}
)(withRouter(Header))
