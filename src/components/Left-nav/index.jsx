import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import "./index.less";
const { SubMenu } = Menu;
/*
左侧导航的组件
*/

export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <h1>贝豪活动管理</h1>
        </Link>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="/home">
          <Link to="/home">
            <Icon type="pie-chart" />
            <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Icon type="mail" />
              <span>品类管理</span>
            </Menu.Item>
            <Menu.Item key="6"><Icon type="mail" />
              <span>大树管理</span></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
