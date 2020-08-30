import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';

import memoryUt from "../../utils/memoryUt"
const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render(){
        const user = memoryUt.user
        if(!user||!user.token){
       return <Redirect to='/login'></Redirect>
        }
        return(
            <Layout style={{height:'100%'}}>
            <Sider>Sider</Sider>
            <Layout>
              <Header>Header</Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        )
    }
}