import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button } from "antd";
import "./login.less";
import logo from "./imgs/diai.png";
import Api from "../../api/api"
import memoryUt from "../../utils/memoryUt"
import storageUt from "../../utils/storageUt"
class Login extends Component {
   handleSubmit = (e) => {
    // 组织事件的默认行为
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {username,password} = values
         let res =await Api.LoginIn(username,password)
         if (!res) {
          return;
        }
      //  保存user信息
      memoryUt.user ={
          name: res.obj.name,
          userId: res.obj.userId,
          menu: res.obj.menu,
          admin:res.obj.admin,
          token:res.token
        };
        storageUt.saveUser(memoryUt.user)
        this.props.history.replace("/");
      }else{ 
        alert("检验失败")
      }
    });
    //    获取表单对象
    // const form = this.props.form;
    // const values = form.getFieldsValue();
    // console.log(values);
  };
  // 对密码自定义验证
  validatePw = (rule, value, callback) => {
    if (!value) {
      callback("密码必须输入");
    } else {
      callback();
    }
  };
  render() {
    const user = memoryUt.user
    if(user && user.token){
      return <Redirect to='/'></Redirect>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login_header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login_container">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your username!",
                  },
                  { min: 4, message: "用户名至少4位!" },
                  { max: 12, message: "用户名至少12位!" },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.validatePw }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WrappeLogin = Form.create()(Login);
export default WrappeLogin;
