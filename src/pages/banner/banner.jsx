import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Pagination,
  Modal,
  Cascader,
  Select,
} from "antd";
import Api from "../../api/api";
import "./banner.less";
export default class Banner extends Component {
  state = {
    bannerArr: [],
    loading: false,
    total: 0,
    pageSize: 4,
    pageNumber: 1,
    options: [],
    platform: "",
    platformShop: "",
    orderCode:'',
    visible:false
  };
  //  初始化table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: "Drag",
        width: 100,
        key: "drag",
        render: () => <Icon type="drag" style={{ fontSize: "20px" }} />,
      },
      {
        title: "图片",
        dataIndex: "previewUrl",
        width: 120,
        key: "previewUrl",
        render: (record) => (
          <img src={record} alt="" style={{ width: "90%" }} />
        ),
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
        key: "action",
        width: 300,
        render: (text, record) => (
          <span>
            <Button type="primary">编辑</Button>
            <Button
              type="danger"
              style={{ marginLeft: "10px" }}
              onClick={() => this.deletA(record.id)}
            >
              删除
            </Button>
          </span>
        ),
      },
    ];
  };
  deletA = (a) => {
    Modal.confirm({
      content: "确定要删除吗",
      onOk: async () => {
        let res = await Api.deleteB(a);
        if (res.code === 200) {
          message.success(res.msg);
          const { total, pageSize, pageNumber } = this.state;
          let totalPage = Math.ceil((total - 1) / pageSize);

          let currentPage = pageNumber > totalPage ? totalPage : pageNumber;

          this.setState(
            {
              pageNumber: currentPage < 1 ? 1 : currentPage,
            },
            () => {
              this.getBanner();
            }
          );
        } else {
          message.error(res.msg);
        }
      },
    });
  };
  getBanner = async () => {
    this.setState({
      loading: true,
    });
    const { platform, platformShop, pageSize, pageNumber, orderCode} = this.state;
    const obj = {
      platform: platform,
      platformShop: platformShop,
      orderCode: orderCode,
      pageNum: pageNumber,
      pageSize: pageSize
    };
    let res = await Api.getBannerList(obj);
    if (res.code === 200) {
      const bannerArr = res.data.list;
      const total = res.data.total;
      //  console.log(bannerArr[0].id)
      this.setState({
        bannerArr: bannerArr,
        loading: false,
        total: total,
      });
    } else {
      message.error("获取banner列表失败");
    }
  };
  getPlat = async () => {
    let res = await Api.getPlatformList1();
    let res1 = res.map((item) => {
      let obj = { label: item.value, value: item.key + "&" + item.value };

      if (item.shopList.length > 0) {
        obj.children = item.shopList.map((val) => {
          let obj2 = { label: val.value, value: val.key + "&" + val.value };

          return obj2;
        });
      }
      return obj;
    });
    this.setState({
      options: res1,
    });
  };
  onChange = (v) => {
    this.setState({
      platform: v[0],
      platformShop: v[1],
    });
  };
  handleChange = (v) => {
    this.setState({
      orderCode:v
    })
  };
  searchBtn=(num)=>{
   this.setState({
   pageNumber:num
   },()=>{
     this.getBanner()
   })
  }
  // 弹框
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  componentWillMount() {
    this.initColumns();
  }
  // 添加
  addBanner=()=>{
   this.setState({
     visible:true
   })
  }
  // 发异步请求
  componentDidMount() {
    this.getPlat();
    this.getBanner();
  }
  onPageChange(page, pageSize) {
    this.setState(
      {
        pageNumber: page,
      },
      () => {
        this.getBanner();
      }
    );
  }
  render() {
    const { Option } = Select;
    const extra = (
      <div>
        <Button type="dashed" style={{ marginRight: "10px" }} onClick={ this.searchBtn.bind(this,1) }>
          查询
        </Button>
        <Button type="primary" onClick={ this.addBanner.bind(this) }>
          <Icon type="plus"></Icon>
          添加
        </Button>
      </div>
    );
    // 读取状态数据
    const {
      bannerArr,
      loading,
      total,
      pageNumber,
      pageSize,
      options,
      visible
    } = this.state;
    const title = (
      <div className="box">
        <div className="item">
          <span className="itemT">平台店铺</span>
          <Cascader
            changeOnSelect={true}
            options={options}
            onChange={this.onChange.bind(this)}
            placeholder="请选择平台店铺"
          />
        </div>
        <div className="item">
          <span className="itemT">编号排序</span>
          <Select
            style={{ width: 120 }}
            onChange={this.handleChange.bind(this)}
            placeholder='请选择排序'
          >
            <Option value="0">编号升序</Option>
            <Option value="1">编降排序</Option>
          </Select>
        </div>
      </div>
    );
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            style={{ height: "600px" }}
            dataSource={bannerArr}
            columns={this.columns}
            bordered
            rowKey="id"
            pagination={false}
            loading={loading}
          />
        </Card>
        <Modal
          title="新建轮播"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Pagination
          style={{ marginTop: "20px", textAlign: "center" }}
          showQuickJumper
          hideOnSinglePage={false}
          defaultCurrent={pageNumber}
          current={pageNumber}
          total={total}
          pageSize={pageSize}
          onChange={this.onPageChange.bind(this)}
          showTotal={(e) => {
            return "共 " + e + " 条";
          }}
        />
      </div>
    );
  }
}
