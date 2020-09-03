import React, { Component } from "react";
import { Card, Table, Button, Icon, message } from "antd";
import Api from "../../api/api";
export default class Banner extends Component {
    state={
        bannerArr:[] ,
        loading:false
    }
//  初始化table所有列的数组
initColumns=()=>{
    this.columns = [
        {
            title: "Drag",
            width:100,
            key: "drag",
            render: () =>(<Icon type="drag" style={{fontSize:'20px'}}/>)
          },
      {
        title: "图片",
        dataIndex: "previewUrl",
        width:120,
        key: "previewUrl",
        render: (record) =>(<img src={record} alt="" style={{width:'90%'}}/>)
      },
      {
        title: "排序编号",
        dataIndex: "orderCode",
        key: "orderCode",
      },
      {
        title: "平台",
        dataIndex: "platformTxt",
        key: "platformTxt",
      },
      {
        title: "店铺",
        dataIndex: "shopTxt",
        key: "shopTxt",
      },
      {
        title: "创建时间",
        dataIndex: "createDt",
        key: "createDt",
      },
      {
        title: "操作",
        key: "cao",
        width:300,
        render: () =>(<span><Button type="primary">编辑</Button> <Button type="danger" style={{marginLeft:'10px'}}>删除</Button></span>)
      }
    ];
}
getBanner= async()=>{
    this.setState({
        loading:true
    })
    let res =await Api.getBannerList({})
    if(res.code===200){
     const bannerArr=res.data.list
    //  console.log(bannerArr[0].id)
     this.setState({
         bannerArr:bannerArr,
         loading:false
     })
    }else{
    message.error('获取banner列表失败')
    }
}
    componentWillMount(){
    this.initColumns()
    }
    // 发异步请求
    componentDidMount(){
    this.getBanner()
    }
  render() {
    const title = "一级分类列表";
    // 读取状态数据
    const {bannerArr,loading} =this.state
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table dataSource={bannerArr} columns={this.columns} bordered  rowKey="id" pagination={{defaultPageSize:5,showQuickJumper: true}} loading={loading}/>
      </Card>
    );
  }
}
