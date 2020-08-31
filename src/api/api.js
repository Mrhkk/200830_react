import apiAxios from "./axios";
import { message } from 'antd';
import storageUt from "../utils/storageUt"

class ApiList {
    // -----------------------处理请求结果 start--------------------
    async handlePromise(promise) {
        try {
            let result = await promise;

            if (result.code !== 200) {
                throw result;
            } else if (result.code === 400) {
                // vue.$message.error(result.msg);
                message.error(result.msg);
                return;
            }
            if (result.code === 200 && result.data) {
                return result.data;
            } else {
                return result.msg;
            }
        } catch (err) {
            console.log("错误信息", err);
            this.commonFail(err);
        }
    }

    commonFail(err) {
            if (
                err.message ||
                err.msg === "not login!" ||
                err.msg === "用户名和密码不能为空" ||
                err.msg === "用户名或密码错误"
            ) {
                // console.log("错误信息.message", err.message, err);
                if (err.msg === "not login!" || err.message === "Network Error") {
                    // router.push("/Login");
                    storageUt.removeUser();
                    this.props.history.replace("/login");
                }
                message.error(err.message || err.msg);;
                return;
            }
            if (err.error) {
                console.error("err.error", err);
            }
        }
        // -----------------------处理请求结果 end ------接口部分 start--------------------

    /**  登录管理接口 start*/
    /**
     * 登录接口-login
     *@param {String}  name 名称
     *@param {String}  pwd 密码
     * */
    LoginIn(name, pwd) {
        const params = {
            name: name,
            pwd: pwd
        };
        const promise = apiAxios.api("POST", "/login/login", params);

        // console.log("登录接口");
        return this.handlePromise(promise);
    }

    /**
     * 登出接口-loginOut
     * */
    LoginOut() {
        const params = {};
        const promise = apiAxios.api("POST", "/login/loginOut", params);

        // console.log("登出接口");
        return this.handlePromise(promise);
    }

    /**  奖项管理接口 start*/
    /**
     * 添加奖项-addAward
     *@param {String}  ... 名称
     *@param {String}  ... 名称
     * */
    AddAward({
            prizeInfo,
            prizeName,
            actId,
            receiveWay,
            prizeNum,
            relateOrder,
            prizeNumLimit,
            status,
            remark
        }) {
            const params = {
                prizeInfo: prizeInfo,
                prizeName: prizeName,
                prizeNum: prizeNum,
                status: status,
                actId: actId,
                relateOrder: relateOrder,
                prizeNumLimit: prizeNumLimit,
                receiveWay: receiveWay,
                remark: remark
            };
            const promise = apiAxios.api("POST", "/award/addAward", params);

            // console.log("添加奖项");
            return this.handlePromise(promise);
        }
        /**
         * 删除奖项-
         *@param {String}  ... 名称
         *@param {String}  ... 名称
         * */
    deleteAward() {
            const params = {};
            const promise = apiAxios.api("POST", "/award/deleteAward", params);

            // console.log("删除奖项");
            return this.handlePromise(promise);
        }
        /**
         * 查询奖项详情-
         *@param {String}  ... 名称
         *@param {String}  ... 名称
         * */
    getAwardInfo() {
            const params = {};
            const promise = apiAxios.api("POST", "/award/getAwardInfo", params);

            // console.log("查询奖项详情");
            return this.handlePromise(promise);
        }
        // 获取奖项类列表
        /**
         * 获取奖项类列表-
         *@param {String}  ... 名称
         *@param {String}  ... 名称
         * */
    getAwardList({
            createDt,
            actId,
            pageNum,
            pageSize,
            prizeInfo,
            status,
            receiveWay,
            prizeName,
            prizeNum,
            remark
        }) {
            const params = {
                createDt: createDt,
                actId: actId,
                pageNum: pageNum,
                pageSize: pageSize,
                status: status,
                receiveWay: receiveWay,
                prizeInfo: prizeInfo,
                prizeName: prizeName,
                prizeNum: prizeNum,
                remark: remark
            };
            const promise = apiAxios.api("POST", "/award/getAwardList", params);

            // console.log("获取奖项类列表");
            return this.handlePromise(promise);
        }
        // 改更新奖项内容
        /**
         * 更新奖项内容-
         *@param {String}  ... 名称
         *@param {String}  ... 名称
         * */
    updateAwardInfo({
            actId,
            id,
            prizeInfo,
            prizeName,
            prizeNum,
            relateOrder,
            receiveWay,
            remark,
            prizeNumLimit
        }) {
            const params = {
                actId: actId,
                id: id,
                prizeInfo: prizeInfo,
                prizeName: prizeName,
                prizeNum: prizeNum,
                relateOrder: relateOrder,
                prizeNumLimit: prizeNumLimit,
                receiveWay: receiveWay,
                remark: remark
            };
            const promise = apiAxios.api("POST", "/award/updateAwardInfo", params);

            // console.log("更新奖项内容");
            return this.handlePromise(promise);
        }
        /**
         * 文件上传-
         *@param {String}  ... 名称
         *@param {String}  ... 名称
         * */
    UploadFile(formdata) {
            // const params = {};
            const promise = apiAxios.api("FILE", "/file/uploadFile", formdata);

            // console.log("文件上传");
            return this.handlePromise(promise);
        }
        /**  活动管理接口 start*/

    /*** 创建活动-
     *@param {String}  ... 名称
     *@param {String}  ... 名称
     *@param      actInfo,
     *@param     actName,
     *@param      platformShop ,
     *@param      createDt,
     *@param      endDate,
     *@param       modifyUser,
     *@param       pageNum,
     *@param      pageSize,
     *@param       platform,
     *@param      prizeNum,
     *@param       remark,
     *@param      sessionId,
     *@param       startDate,
     *@param      status
     * */
    addAct({
        accessWay,
        actInfo,
        actName,
        platformShop,
        createDt,
        endDate,
        brand,
        modifyUser,
        pageNum,
        pageSize,
        platform,
        prizeNum,
        remark,
        sessionId,
        startDate,
        prizeNumLimit,
        status
    }) {
        /* eslint-disable */
        let platform1

        if (platform === undefined || platform === '' || platform === null) {
            platform1 = []
        } else {
            platform1 = platform.split('&')
        }
        let platformShop1

        if (platformShop === undefined || platformShop === '' || platformShop === null) {
            platformShop1 = []
        } else {
            platformShop1 = platformShop.split('&')
        }
        /* eslint-disable */
        const params = {
            accessWay,
            actInfo,
            actName,
            platformShop: platformShop1,
            createDt,
            endDate,
            brand: brand,
            modifyUser,
            pageNum,
            pageSize,
            platform: platform1,
            prizeNum,
            remark,
            prizeNumLimit: prizeNumLimit,
            sessionId,
            startDate,
            status
        };
        const promise = apiAxios.api("POST", "/act/addAct", params);

        // console.log("创建act");
        return this.handlePromise(promise);
    }

    /**act/updateStatusByPrimaryKey
     * 删除活动-
     * */
    deleteAct(id) {
            const params = { id: id };
            const promise = apiAxios.api("POST", "/act/deleteAct", params);

            // console.log("删除活动");
            return this.handlePromise(promise);
        }
        /**
         * 获取活动详情-
         * */
    getActInfo(id) {
            const params = { id: id };
            const promise = apiAxios.api("POST", "/act/selectDetail", params, "表单");

            // console.log("获取活动详情");
            return this.handlePromise(promise);
        }
        /**
         * 获取活动列表-
         * */
    getActList({
            actInfo,
            actName,
            actId,
            platformShop,
            pageNum,
            pageSize,
            platform,
            prizeNum,
            remark,
            startDate,
            endDate,
            status
        }) {
            let platform1

            if (platform === undefined || platform === '' || platform === null) {
                platform1 = []
            } else {
                platform1 = platform.split('&')
            }
            let platformShop1

            if (platformShop === undefined || platformShop === '' || platformShop === null) {
                platformShop1 = []
            } else {
                platformShop1 = platformShop.split('&')
            }
            const params = {
                actInfo: actInfo,
                actName: actName,
                platformShop: platformShop1,
                pageNum: pageNum,
                pageSize: pageSize,
                platform: platform1,
                prizeNum: prizeNum,
                remark: remark,
                actId: actId,
                startDate: startDate,
                endDate: endDate,
                status: status
            };
            const promise = apiAxios.api("POST", "/act/getActList", params);

            // console.log("获取活动列表");
            return this.handlePromise(promise);
        }
        /**
         * 更新活动信息-
         * */
    updateActInfo({
        actInfo,
        actName,
        platformShop,
        id,
        pageNum,
        brand,
        pageSize,
        platform,
        prizeNum,
        prizeNumLimit,
        remark,
        startDate,
        endDate,
        status
    }) {
        let platform1

        if (platform === undefined || platform === '' || platform === null) {
            platform1 = []
        } else {
            platform1 = platform.split('&')
        }
        let platformShop1

        if (platformShop === undefined || platformShop === '' || platformShop === null) {
            platformShop1 = []
        } else {
            platformShop1 = platformShop.split('&')
        }
        const params = {
            actInfo: actInfo,
            actName: actName,
            platformShop: platformShop1,
            id: id,
            pageNum: pageNum,
            brand: brand,
            pageSize: pageSize,
            platform: platform1,
            prizeNum: prizeNum,
            remark: remark,
            prizeNumLimit: prizeNumLimit,
            startDate: startDate,
            endDate: endDate,
            status: status
        };
        const promise = apiAxios.api("POST", "/act/updateActInfo", params);

        // console.log("缓存获取");
        return this.handlePromise(promise);
    }

    /**
     * 缓存获取-
     * */
    getPlatformList() {
        const params = {};
        const promise = apiAxios.api("POST", "/cache/getPlatformList", params);

        // console.log("缓存获取");
        return this.handlePromise(promise);
    }

    // getPlatformList1() {
    //         const params = {};
    //         const promise = apiAxios.api("POST", "/cache/getPlatformShop", params);

    //         // console.log("缓存获取");
    //         return this.handlePromise(promise);
    //     }
    getPlatformList1() {
            const params = {};
            const promise = apiAxios.api("POST", "/cache/selectGroupShop", params);

            // console.log("缓存获取");
            return this.handlePromise(promise);
        }
        // 获取admin
    selectUserAdmin() {
            const params = {};
            const promise = apiAxios.api("POST", "/cache/selectUserAdmin", params);

            // console.log("缓存获取");
            return this.handlePromise(promise);
        }
        /**
         * 活动奖品列表-
         * */
    getAwardOptionList(id) {
        const params = { actId: id };
        const promise = apiAxios.api("POST", "/award/getAwardList", params);

        // console.log("缓存活动奖品列表");
        return this.handlePromise(promise);
    }

    /**
     * 名单列表-
     * */
    getWinnerList({
            title,
            platform,
            platformShop,
            actId,
            awardId,
            billNum,
            createDt,
            goodsName,
            id,
            actName,
            prizeName,
            actStatus,
            nick,
            phone,
            receiveWay,
            orderDt,
            sortType,
            pageNum,
            pageSize,
            prizeStatus,
            prizeType,
            status,
            receiveStartDt,
            receiveEndDt,
            receiveDt
        }) {
            let platform1

            if (platform === undefined || platform === '' || platform === null) {
                platform1 = []
            } else {
                platform1 = platform.split('&')
            }
            let platformShop1

            if (platformShop === undefined || platformShop === '' || platformShop === null) {
                platformShop1 = []
            } else {
                platformShop1 = platformShop.split('&')
            }
            const params = {
                title: title,
                platform: platform1,
                platformShop: platformShop1,
                actId: actId,
                awardId: awardId,
                prizeName: prizeName,
                actName: actName,
                billNum: billNum,
                createDt: createDt,
                goodsName: goodsName,
                id: id,
                sortType: sortType,
                actStatus: actStatus,
                nick: nick,
                phone: phone,
                receiveWay: receiveWay,
                orderDt: orderDt,
                pageNum: pageNum,
                pageSize: pageSize,
                status: status,
                receiveStartDt: receiveStartDt,
                receiveEndDt: receiveEndDt,
                prizeStatus: prizeStatus,
                prizeType: prizeType,
                receiveDt: receiveDt
            };
            const promise = apiAxios.api("POST", "/winner/getWinnerList", params);

            // console.log("名单列表");
            return this.handlePromise(promise);
        }
        // 创建名单
    addWinner({ actId, awardId, billNum, nick, phone, goodsName, orderDt, platform, platformShop }) {
            const params = {
                actId: actId,
                awardId: awardId,
                billNum: billNum,
                nick: nick,
                phone: phone,
                orderDt: orderDt, //下单时间
                goodsName: goodsName, //下单商品id,
                platform: platform.split('&'),
                platformShop: platformShop.split('&')
            };
            const promise = apiAxios.api("POST", "/winner/addWinner", params);

            // console.log("创建addWinner");
            return this.handlePromise(promise);
        }
        // /winner/updateByPrimaryKey
        // 创建名单
    updateWinner({
            platform,
            platformShop,
            actId,
            awardId,
            billNum,
            id,
            nick,
            phone,
            goodsName,
            orderDt
        }) {
            const params = {
                actId: actId,
                awardId: awardId,
                billNum: billNum,
                id: id,
                nick: nick,
                phone: phone,
                orderDt: orderDt, //下单时间
                goodsName: goodsName, //下单商品id
                platform: platform.split('&'),
                platformShop: platformShop.split('&')
            };
            const promise = apiAxios.api("POST", "/winner/updateByPrimaryKey", params);

            // console.log("更新Winner");
            return this.handlePromise(promise);
        }
        /**
         * 获取名单发布-
         * */
    updateStatus({ id, status }) {
            const params = { idList: [id], status: status };
            const promise = apiAxios.api(
                "POST",
                "/winner/updateStatusByPrimaryKey",
                params
            );

            // console.log("名单发布");
            return this.handlePromise(promise);
        }
        // 获取一键发布名单
    getwinnerAllOnlineList({
            actName,
            prizeName,
            platform,
            platformShop,
            idList,
            awardId,
            actStatus,
            billNum,
            receiveWay,
            sortType,
            createDt,
            goodsName,
            id,
            nick,
            phone,
            status,
            pageNum,
            pageSize,
            prizeStatus,
            prizeType
        }) {
            // const params = { idList: idList, status: status };
            let platform1

            if (platform === undefined || platform === '' || platform === null) {
                platform1 = []
            } else {
                platform1 = platform.split('&')
            }
            let platformShop1

            if (platformShop === undefined || platformShop === '' || platformShop === null) {
                platformShop1 = []
            } else {
                platformShop1 = platformShop.split('&')
            }
            const params = {
                actName,
                prizeName,
                platform: platform1,
                platformShop: platformShop1,
                idList,
                awardId,
                actStatus,
                billNum,
                receiveWay,
                sortType,
                createDt,
                goodsName,
                id,
                nick,
                phone,
                status,
                pageNum,
                pageSize,
                prizeStatus,
                prizeType
            };
            const promise = apiAxios.api("POST", "/winner/getSavedCount", params);

            // console.log("名单发布");
            return this.handlePromise(promise);
        }
        // 名单一键发布
    winnerAllOnline({ idList, status }) {
            const params = { idList: idList, status: status };
            const promise = apiAxios.api(
                "POST",
                "/winner/updateStatusByPrimaryKey",
                params
            );

            // console.log("名单发布");
            return this.handlePromise(promise);
        }
        // 修改名单请求三级
    getChannelActAwardAll() {
            const params = {};
            const promise = apiAxios.api("POST", "/act/getChannelActAwardAll", params);

            // console.log("修改名单请求三级");
            return this.handlePromise(promise);
        }
        /**
         * 活动上线下线-上线传1、下线传2
         * @param status和id
         * */
    updateStatusByPrimaryKey({ id, status }) {
            const params = { id: id, status: status };
            const promise = apiAxios.api(
                "POST",
                "/act/updateStatusByPrimaryKey",
                params
            );

            // console.log("下线");
            return this.handlePromise(promise);
        }
        /**
         * 奖项上线、下线
         * @param status和id
         * */
    awardIsOnline({ id, status }) {
            const params = { id: id, status: status };
            const promise = apiAxios.api(
                "POST",
                "/award/updateStatusByPrimaryKey",
                params
            );

            // console.log("下线");
            return this.handlePromise(promise);
        }
        /**
         * 渠道上线、下线
         * @param status和id
         * */
    channelIsOnline({ id, status }) {
            const params = { id: id, status: status };
            const promise = apiAxios.api(
                "POST",
                "/channel/updateStatusByPrimaryKey",
                params
            );

            // console.log("下线");
            return this.handlePromise(promise);
        }
        /**
         * 新建渠道-
         * */
    addChannel({
            channelName,
            channelType,
            channelInfo,
            lotteryAddress,
            membershipAddress,
            remark,
            attachmentIdList
        }) {
            const params = {
                channelName: channelName,
                channelType: channelType,
                channelInfo: channelInfo,
                lotteryAddress: lotteryAddress,
                membershipAddress: membershipAddress,
                remark: remark,
                attachmentIdList: attachmentIdList
            };
            const promise = apiAxios.api("POST", "/channel/addChannel", params);

            // console.log("新建渠道");
            return this.handlePromise(promise);
        }
        /**
         * 修改渠道-
         * */
    updateChannel({
            id,
            channelName,
            channelType,
            channelInfo,
            lotteryAddress,
            membershipAddress,
            remark,
            attachmentIdList
        }) {
            const params = {
                id: id,
                channelName: channelName,
                channelType: channelType,
                channelInfo: channelInfo,
                lotteryAddress: lotteryAddress,
                membershipAddress: membershipAddress,
                remark: remark,
                attachmentIdList: attachmentIdList
            };
            const promise = apiAxios.api("POST", "/channel/updateChannelInfo", params);

            // console.log("修改渠道");
            return this.handlePromise(promise);
        }
        /**
         * 渠道列表-
         * */
    getChannelList({ pageNum, pageSize, channelName, channelType, status }) {
            const params = {
                pageNum: pageNum,
                pageSize: pageSize,
                channelName: channelName,
                channelType: channelType,
                status: status
            };
            const promise = apiAxios.api("POST", "/channel/getChannelList", params);

            // console.log("渠道列表");
            return this.handlePromise(promise);
        }
        /**
         * 渠道详情-
         * */
    getChannelInfo(id) {
            const params = {
                id: id
            };
            const promise = apiAxios.api("POST", "/channel/getChannelInfo", params);

            // console.log("渠道详情");
            return this.handlePromise(promise);
        }
        /**
         * 获取活动下拉列表-
         * */
    getActListNoPage() {
            const promise = apiAxios.api("POST", "/act/getActListNoPage", {});

            // console.log("获取活动下拉列表");
            return this.handlePromise(promise);
        }
        // channel/getChannelNoPage
        /**
         * 获取渠道下拉列表-
         * */
    getChannelNoPage() {
            const promise = apiAxios.api("POST", "/channel/getChannelNoPage", {});

            // console.log("获取渠道下拉列表");
            return this.handlePromise(promise);
        }
        /**
         * 名单导出名称-
         * */
    getExcelName(params) {
            const promise = apiAxios.api("POST", "/fileAll/getModelFile", params, '特');

            // console.log("名单导出获取名称");
            return this.handlePromise(promise);
        }
        /**
         * 名单导入-file/importExcel
         *  { actId: actId, awardId: awardId };
         * formdata
         * */
    importExcel(formdata) {
        const promise = apiAxios.api("POST", "/fileAll/importExcel", formdata);

        // console.log("名单导入");
        return this.handlePromise(promise);
    }
    getChannelActAwardList({
            platform,
            platformShop,
        }) {
            let platform1

            if (platform === undefined || platform === '' || platform === null) {
                platform1 = []
            } else {
                platform1 = platform.split('&')
            }
            let platformShop1

            if (platformShop === undefined || platformShop === '' || platformShop === null) {
                platformShop1 = []
            } else {
                platformShop1 = platformShop.split('&')
            }
            const params = {
                platform: platform1,
                platformShop: platformShop1,
            }

            const promise = apiAxios.api("POST", "/act/getChannelActAwardList", params);

            // console.log("getChannelActAwardList");
            return this.handlePromise(promise);
        }
        /**
         * 中奖查询界面 接口  ----start
         * */
    getWinChannelInfo(channelId) {
        const promise = apiAxios.api("POST", "/receive/getChannelInfo", {
            channelId: channelId
        });

        // console.log("中奖查询活动信息",result)
        return promise;
    }
    queryByObject(target) {
        const promise = apiAxios.api("POST", "/receive/queryByObject", {
            target: target,
            platformType: ''
        }, '参数');

        // console.log("中奖查询结果",result)
        return promise;
    }
    receivePrize(idArr) {
            const promise = apiAxios.api("POST", "/receive/receivePrize", {
                idList: idArr
            });

            // console.log("中奖查询领取",result)
            return promise;
        }
        // 推荐商品管理
        // 获取商品列表
        /* eslint-disable */
    getGoodsList({
            title,
            orderCode,
            platform,
            platformShop,
            pageNum,
            pageSize
        }) {
            let platform1

            if (platform === undefined || platform === '' || platform === null) {
                platform1 = []
            } else {
                platform1 = platform.split('&')
            }
            let platformShop1

            if (platformShop === undefined || platformShop === '' || platformShop === null) {
                platformShop1 = []
            } else {
                platformShop1 = platformShop.split('&')
            }
            const params = {
                title: title,
                orderCode: orderCode,
                platform: platform1,
                platformShop: platformShop1,
                pageNum: pageNum,
                pageSize: pageSize
            }

            const promise = apiAxios.api("POST", "/recommendGoods/getPageList", params);

            // console.log("中奖查询领取",result)
            return promise;


        }
        /* eslint-disable */
        // 添加按钮
    add({
            attachmentId,
            title,
            productId,
            price,
            number,
            platform,
            platformShop,
            orderCode
        }) {
            const params = {
                attachmentId: attachmentId,
                title: title,
                productId: productId,
                price: price,
                number: number,
                platform: platform.split('&'),
                platformShop: platformShop.split('&'),
                orderCode: orderCode
            }
            const promise = apiAxios.api("POST", "/recommendGoods/addObject", params);

            return promise;
        }
        // 编辑按钮
    editA({
            id,
            attachmentId,
            productId,
            title,
            price,
            number,
            platform,
            platformShop,
            orderCode
        }) {
            const params = {
                id: id,
                attachmentId: attachmentId,
                productId: productId,
                title: title,
                price: price,
                number: number,
                platform: platform.split('&'),
                platformShop: platformShop.split('&'),
                orderCode: orderCode
            }
            const promise = apiAxios.api("POST", "/recommendGoods/updateObject", params);

            return promise;
        }
        // 删除按钮
    deleteA(id) {
            const promise = apiAxios.api("POST", "/recommendGoods/deleteByPrimaryKey", {
                id: id
            }, 'str');

            return promise;
        }
        // banner管理
        // 获取列表
        /* eslint-disable */
    getBannerList({
            title,
            platform,
            platformShop,
            orderCode,
            pageNum,
            pageSize
        }) {
            let platform1

            if (platform === undefined || platform === '' || platform === null) {
                platform1 = []
            } else {
                platform1 = platform.split('&')
            }
            let platformShop1

            if (platformShop === undefined || platformShop === '' || platformShop === null) {
                platformShop1 = []
            } else {
                platformShop1 = platformShop.split('&')
            }
            const params = {
                title: title,
                platform: platform1,
                platformShop: platformShop1,
                orderCode: orderCode,
                pageNum: pageNum,
                pageSize: pageSize
            }


            const promise = apiAxios.api("POST", "/banner/getPageList", params);

            // console.log("中奖查询领取",result)
            return promise;

        }
        /* eslint-disable */
        // 添加按钮
    addBanner({
            attachmentId,
            platform,
            platformShop,
            orderCode
        }) {
            const params = {
                platform: platform.split('&'),
                platformShop: platformShop.split('&'),
                orderCode: orderCode,
                attachmentId: attachmentId
            }
            const promise = apiAxios.api("POST", "/banner/addObject", params);

            return promise;
        }
        // 修改按钮
    editBanner({
            id,
            attachmentId,
            platform,
            platformShop,
            orderCode
        }) {
            const params = {
                id: id,
                platform: platform.split('&'),
                platformShop: platformShop.split('&'),
                orderCode: orderCode,
                attachmentId: attachmentId
            }
            const promise = apiAxios.api("POST", "/banner/updateObject", params);

            return promise;
        }
        // 删除按钮
    deleteB(id) {
        const promise = apiAxios.api("POST", "/banner/deleteByPrimaryKey", {
            id: id
        }, 'str');

        return promise;
    }
    uploadFile(formdata) {
            const promise = apiAxios.api("POST", "/fileAll/uploadFile", formdata);

            // console.log("名单导入");
            return this.handlePromise(promise);
        }
        //  用户管理 获取人员列表
        /* eslint-disable */
    autoCompleteNames({ name }) {
            const params = {
                name: name
            }

            const promise = apiAxios.api("POST", "/system/autoCompleteNames", params, 'form');

            // console.log("中奖查询领取",result)
            return promise;

        }
        //  用户管理 获取人员列表
    getUserList({
            pageNum,
            pageSize,
            name
        }) {
            const params = {
                pageNum: pageNum,
                pageSize: pageSize,
                name: name
            }


            const promise = apiAxios.api("POST", "/system/getUserList", params, 'form');

            // console.log("中奖查询领取",result)
            return promise;

        }
        // 获取所有小组
    getAllGroup() {
            const promise = apiAxios.api("POST", "/system/getAllGroup", {}, 'form');

            // console.log("中奖查询领取",result)
            return promise;

        }
        // 编辑
    editUser({
            id,
            roleIds,
            pStr,
            admin
        }) {
            const params = {
                id,
                roleIds,
                pStr,
                admin
            }


            const promise = apiAxios.api("POST", "/system/editUser", params, 'form');

            // console.log("中奖查询领取",result)
            return promise;

        }
        // 删除按钮
    deleteUser(id) {
            const promise = apiAxios.api("POST", "/system/deleteUser", {
                id: id
            }, 'str');

            return promise;
        }
        /* eslint-disable */
        //  小组管理 获取角色列表
        /* eslint-disable */
    getGroupList({
            pageNum,
            pageSize,
            groupName
        }) {
            const params = {
                pageNum: pageNum,
                pageSize: pageSize,
                groupName: groupName
            }


            const promise = apiAxios.api("POST", "/system/getGroupList", params, 'form');

            // console.log("中奖查询领取",result)
            return promise;

        }
        /* eslint-disable */
        // 添加按钮
    addGroup({
            groupName,
            groupLable,
            description
        }) {
            const params = {
                groupName: groupName,
                groupLable: groupLable,
                description: description
            }
            const promise = apiAxios.api("POST", "/system/addGroup", params, 'form');

            return promise;
        }
        // 修改按钮
    updateGroup({
            id,
            groupName,
            groupLable,
            description,
            array
        }) {
            const params = {
                id: id,
                groupName: groupName,
                groupLable: groupLable,
                description: description,
                array: array
            }
            const promise = apiAxios.api("POST", "/system/updateGroup", params);

            return promise;
        }
        // 删除按钮
    deleteGroupByPrimaryKey(id) {
            const promise = apiAxios.api("POST", "/system/deleteGroupByPrimaryKey", {
                id: id
            }, 'str');

            return promise;
        }
        // 编辑详情页
    getGroupInfo(id) {
            const promise = apiAxios.api("POST", "/system/getGroupInfo", {
                id: id
            }, 'str');

            return promise;
        }
        // 编辑权限详情页
    getTreeByGroupId(id) {
        const promise = apiAxios.api("POST", "/system/getTreeByGroupId", {
            id: id
        }, 'str');

        return promise;
    }
}
const apiList = new ApiList();

export default apiList;