import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';

import memoryUt from "../../utils/memoryUt"
import LeftNav from "../../components/Left-nav"
// import AnimatedSwitch from '../../components/AnimatedSwitch'
import Header from "../../components/Header"
import Banner from "../banner/banner";
import Good from "../good/good";
import User from "../user/user";
import Group from "../group/group";
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
              <Content style={{backgroundColor:'#f8f8f9',padding:'20px 20px 0'}}>
                <Switch>
                  <Route path='/home' component={Home}/>
                  <Route path='/banner' component={Banner}/>
                  <Route path='/good' component={Good}/>
                  <Route path='/user' component={User}/>
                  <Route path='/group' component={Group}/>
                  <Redirect to='/home'></Redirect>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )
    }
}