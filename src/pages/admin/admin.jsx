import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';

import memoryUt from "../../utils/memoryUt"
import LeftNav from "../../components/Left-nav"
import Header from "../../components/Header"
import Home from "../home/home";
const { Sider ,Content } = Layout;
export default class Admin extends Component {
    render(){
        const user = memoryUt.user
        if(!user||!user.token){
       return <Redirect to='/login'></Redirect>
        }
        return(
            <Layout style={{height:'100%'}}>
            <Sider ><LeftNav></LeftNav></Sider >
            <Layout>
              <Header>Header</Header>
              <Content style={{backgroundColor:'#fff'}}>
                <Switch>
                  <Route path='/home' component={Home}/>
                  <Redirect to='/home'></Redirect>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )
    }
}