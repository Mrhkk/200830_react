import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import "./index.less";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
/*
左侧导航的组件
*/

class LeftNav extends Component {
  // 根据menu的数据数组生成对应的标签数组 使用map（）+递归调用
  // getMenuNodes=(menuList)=>{
  //  return menuList.map(item=>{
  //    if(!item.subs){
  //      return (
  //       <Menu.Item key={item.id}>
  //       <Link to={'/'+item.index}>
  //         <Icon type={item.icon} />
  //      <span>{item.title}</span>
  //         </Link>
  //       </Menu.Item>
  //      )
  //    }else{
  //     return (
  //       <SubMenu
  //       key={item.id}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //          {
  //           this.getMenuNodes(item.subs)
  //         }
  //         </SubMenu>
  //     )
  //    }
  //  })
  // }
  // reduce
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      // 向pre中添加项
      if (!item.subs) {
        pre.push(
          <Menu.Item key={item.index}>
            <Link to={item.index}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查找一个与当前请求路径匹配的子item
        const cItem = item.subs.find(cItem =>cItem.index === path)
        if (cItem) {
          // 如果存在
          this.openKey = item.key;
        }
        pre.push(
          <SubMenu
            key={item.index}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.subs)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };
  componentWillMount() {
    this.MenuNodes = this.getMenuNodes(menuList);
  }
  render() {
    // 得到请求的当前路由路径
    const path = this.props.location.pathname;
    // 得到需要打开菜单项的key
    const openKey = this.openKey;

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <h1>贝豪活动管理</h1>
        </Link>
        <Menu mode="inline" theme="dark" selectedKeys={[path]} openKeys={[openKey]}>
          {this.MenuNodes}
        </Menu>
      </div>
    );
  }
}
// withRouter 高阶组件包裹非路由组件返回一个新的组件向非路由组件传递history location match三个属性
export default withRouter(LeftNav);
