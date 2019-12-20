import { axios } from '@/utils/request';
import axios_ from 'axios';
import superagent from 'superagent';
import _ from 'underscore';
import { setStore, getStore } from '@/utils/storage';
import { formatDate, queryDateDiff, deNull, queryUrlString } from '@/utils/util';
import $ from 'jquery';

axios_.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

const api = {
    domain: window._CONFIG['domian'],
    user: '/api/user',
    role: '/api/role',
    service: '/api/service',
    permission: '/api/permission',
    permissionNoPager: '/api/permission/no-pager',
    PROCESS_NODE_DICT_ID: '095a5c3fed5b29706cdfc6d9cb32cd4c', //流程节点，对应的字典的ID,根据这个查询流程节点的名称
};

export default api;

//post
export async function postAction(url, parameter) {
    return axios({
        url: url,
        method: 'post',
        data: parameter,
    });
}

//post method= {post | put}
export async function httpAction(url, parameter, method) {
    return axios({
        url: url,
        method: method,
        data: parameter,
    });
}

//put
export async function putAction(url, parameter) {
    return axios({
        url: url,
        method: 'put',
        data: parameter,
    });
}

//get
export async function getAction(url, parameter) {
    return axios({
        url: url,
        method: 'get',
        params: parameter,
    });
}

//deleteAction
export async function deleteAction(url, parameter) {
    return axios({
        url: url,
        method: 'delete',
        params: parameter,
    });
}

export async function getUserList(parameter) {
    return axios({
        url: api.user,
        method: 'get',
        params: parameter,
    });
}

export async function getRoleList(parameter) {
    return axios({
        url: api.role,
        method: 'get',
        params: parameter,
    });
}

export async function getServiceList(parameter) {
    return axios({
        url: api.service,
        method: 'get',
        params: parameter,
    });
}

export async function getPermissions(parameter) {
    return axios({
        url: api.permissionNoPager,
        method: 'get',
        params: parameter,
    });
}

// id == 0 add     post
// id != 0 update  put
export async function saveService(parameter) {
    return axios({
        url: api.service,
        method: parameter.id == 0 ? 'post' : 'put',
        data: parameter,
    });
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export async function downFile(url, parameter) {
    //检查此处的URL,改成Nginx服务器对应的下载地址
    console.log(' download url :' + url);
    return axios({
        url: url,
        params: parameter,
        method: 'get',
        responseType: 'blob',
    });
}

/**
 * 查询URL地址TableID变量
 */
export function queryURLTableParam() {
    let url = document.location.toString();
    url = url.substring(url.lastIndexOf('/') + 1, url.length);
    console.log('tableID : ' + url);
    return url;
}

/**
 * 查询当前业务对应表单名称
 * @param {*} url
 */
export async function queryTableName(callback) {
    //获取主键ID
    let tableID = queryURLTableParam();

    //查询URL
    let queryURL = `${api.domain}/api/onl_cgform_head/${tableID}`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res.body);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body[0]);
        }

        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * 检测审批是否存在 存在 false  不存在 true
 * @param {*} tableName
 * @param {*} businessID
 */
export async function queryApprovalExist(tableName, businessID) {
    //查询URL GET	/api/tableName/:id/exists	True or false whether a row exists or not  /api/tableName/findOne
    let queryURL = `${api.domain}/api/PR_LOG?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${businessID})`;

    //查询标识
    let vflag = false;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');

        vflag = res.body.length > 0 ? true : false;

        return vflag;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 添加数据
 * @param {*} tableName
 * @param {*} id
 */
export async function insertTableData(tableName, node) {
    //Post数据的URL地址
    let insertURL = `${api.domain}/api/${tableName}`;

    //如果传入数据为数组，则URL添加bulk路径
    if (typeof node != 'undefined' && node != null && node instanceof Array) {
        insertURL = insertURL + '/bulk';
    }

    try {
        const res = await superagent
            .post(insertURL)
            .send(node)
            .set('accept', 'json');
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

export async function postTableData(tableName, node) {
    //Post数据的URL地址
    let insertURL = `${api.domain}/api/${tableName}`;

    //如果传入数据为数组，则URL添加bulk路径
    if (typeof node != 'undefined' && node != null && node instanceof Array) {
        insertURL = insertURL + '/bulk';
    }

    try {
        const res = await superagent
            .post(insertURL)
            .send(node)
            .set('accept', 'json');
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * 添加数据
 * @param {*} tableName
 * @param {*} id
 */
export async function deleteTableData(tableName, id) {
    //Post数据的URL地址
    let deleteURL = `${api.domain}/api/${tableName}/${id}`;

    try {
        const res = await superagent.delete(deleteURL).set('accept', 'json');
        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 更新数据
 * @param {*} tableName
 * @param {*} id
 * @param {*} node
 */
export async function patchTableData(tableName, id, node) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    let patchURL = `${api.domain}/api/${tableName}/${id}`;

    //如果传入数据为空，则直接返回错误
    if (typeof node == 'undefined' || node == null || node == '') {
        return false;
    }

    try {
        const res = await superagent
            .patch(patchURL)
            .send(node)
            .set('accept', 'json');

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryTableData(tableName, id) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    let queryURL = `${api.domain}/api/${tableName}/${id}`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} foreignKey
 * @param {*} id
 */
export async function queryTableDataByField(tableName, field, value) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    let queryURL = `${api.domain}/api/${tableName}?_where=(${field},eq,${value})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询表单字段数据
 * @param {*} tableName
 * @param {*} foreignKey
 * @param {*} id
 */
export async function queryTableFieldInfo(tableName, field, value) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    let queryURL = `${api.domain}/api/${tableName}?_where=(name,eq,${field})~and(field,eq,${value})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询流程权责业务信息
 */
export async function queryBusinessInfo(tableName, callback) {
    //查询URL
    let queryURL = `${api.domain}/api/PR_RIGHTS?_where=(business,like,~${tableName}~)`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res.body);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body);
        }

        return JSON.parse(JSON.stringify(res.body));
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的员工信息
 */
export async function queryProcessNodeEmployee(node, callback) {
    //查询URL
    let queryURL = `${api.domain}/api/BS_APPROVE_NODE?_where=(name,eq,${node})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res.body);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body[0]['item_text']);
        }

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessNodeProcName(node, callback) {
    //查询URL
    let queryURL = `${api.domain}/api/sys_dict_item?_where=(dict_id,eq,${api.PROCESS_NODE_DICT_ID})~and(item_value,eq,${node})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);

        if (
            typeof res != 'undefined' &&
            res.body instanceof Array &&
            res.body.length > 0 &&
            typeof callback != 'undefined'
        ) {
            callback(res.body[0]['item_text']);
        }

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询审批处理页面的记录
 */
export async function queryUserList(params) {
    //用户名称
    let whereFlag = deNull(params.name) == '' ?
        '' :
        `_where=(username,like,~${params.name}~)~or(realname,like,~${params.name}~)&`;
    //获取排序标识，升序 ‘’ ， 降序 ‘-’
    let ascFlag = params.order == 'asc' ? '' : '-';

    //查询URL
    let queryURL = `${api.domain}/api/v_user?${whereFlag}_p=${params.pageNo}&_size=${params.pageSize}&_sort=${ascFlag}${params.column}`;
    let queryCountURL = `${api.domain}/api/v_user/count?${whereFlag}`;
    let result = {};
    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        const count = await superagent.get(queryCountURL).set('accept', 'json');
        console.log(res);
        result.records = res.body;
        result.total = count.body[0].no_of_rows <= params.pageSize ?
            res.body.length :
            count.body[0].no_of_rows;

        return result;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询审批处理页面的记录
 */
export async function queryProcessLogToApproved(username, realname, params) {
    //用户对于的中文代码
    //let realname = username;

    //查询URL
    let queryURL = `${api.domain}/api/PR_LOG?_where=(employee,like,~${username}~)~or(employee,like,~${realname}~)&_p=${params.pageNo}&_size=${params.pageSize}`;
    let queryCountURL = `${api.domain}/api/PR_LOG/count?_where=(employee,like,~${username}~)~or(employee,like,~${realname}~)`;
    let result = {};
    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        const count = await superagent.get(queryCountURL).set('accept', 'json');
        console.log(res);
        result.records = res.body;
        result.total = count.body[0].no_of_rows <= 30 ?
            res.body.length :
            count.body[0].no_of_rows;

        return result;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询审批历史记录页面的记录
 */
export async function queryProcessLogHisApproved(username, realname, params) {
    //用户对于的中文代码
    //let username_zh = username;

    //查询URL
    let queryURL = `${api.domain}/api/PR_LOG_HISTORY?_where=(approve_user,like,~${username}~)~or(approve_user,like,~${realname}~)~or(proponents,like,~${username}~)~or(proponents,like,~${realname}~)&_p=${params.pageNo}&_size=${params.pageSize}&_sort=-operate_time`;
    let queryCountURL = `${api.domain}/api/PR_LOG_HISTORY/count?_where=(approve_user,like,~${username}~)~or(approve_user,like,~${realname}~)~or(proponents,like,~${username}~)~or(proponents,like,~${realname}~)`;
    let result = {};
    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        const count = await superagent.get(queryCountURL).set('accept', 'json');
        console.log(res);
        result.records = res.body;

        //遍历并格式化日期
        _.each(result.records, function(item) {
            let optime = formatDate(item['operate_time'], 'yyyy-MM-dd HH:mm:ss');
            optime = optime.replace('T', ' ');
            item['operate_time'] = optime;
        });

        result.total = count.body[0].no_of_rows <= 30 ?
            res.body.length :
            count.body[0].no_of_rows;
        return result;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询我的待办数据
 */
export async function queryProcessLogWait(username, realname) {
    //查询URL
    let queryURL = `${api.domain}/api/v_handling_events?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=1&_size=30&_sort=-create_time`;
    let result = {};
    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        result = res.body;

        //遍历并格式化日期
        _.each(result, function(item) {
            let optime = formatDate(item['operate_time'], 'yyyy-MM-dd');
            let ctime = formatDate(item['create_time'], 'yyyy-MM-dd');
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['username'] = deNull(item['username']).split(',');
        });

        return result;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询我的已办数据
 */
export async function queryProcessLogDone(username, realname) {
    //查询URL
    let queryURL = `${api.domain}/api/v_handled_events?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=1&_size=30&_sort=-create_time`;
    let result = {};
    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        result = res.body;

        //遍历并格式化日期
        _.each(result, function(item) {
            let optime = formatDate(item['operate_time'], 'yyyy-MM-dd');
            let ctime = formatDate(item['create_time'], 'yyyy-MM-dd');
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['username'] = deNull(item['username']).split(',');
        });

        return result;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 查询审批知会记录页面的记录
 */
export async function queryProcessLogInfApproved(username, realname, params) {
    //用户对于的中文代码
    //let username_zh = username;
    //查询URL
    //let queryURL = `${api.domain}/api/PR_LOG_INFORMED?_where=((employee,like,~${username}~)~or(employee,like,~${realname}~))~and((approve_user,nlike,~${username}~)~and(approve_user,nlike,~${realname}~))&_p=${params.pageNo}&_size=${params.pageSize}&_sort=operate_time`;
    //let queryCountURL = `${api.domain}/api/PR_LOG_INFORMED/count?_where=((employee,like,~${username}~)~or(employee,like,~${realname}~))~and((approve_user,nlike,~${username}~)~and(approve_user,nlike,~${realname}~))`;
    let queryURL = `${api.domain}/api/PR_LOG_INFORMED?_where=((employee,like,~${username}~)~or(employee,like,~${realname}~))&_p=${params.pageNo}&_size=${params.pageSize}&_sort=-operate_time`;
    let queryCountURL = `${api.domain}/api/PR_LOG_INFORMED/count?_where=((employee,like,~${username}~)~or(employee,like,~${realname}~))`;
    let result = {};
    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        const count = await superagent.get(queryCountURL).set('accept', 'json');

        console.log('query url : ' + queryURL);

        console.log(res);
        result.records = res.body;
        result.total = count.body[0].no_of_rows <= 30 ?
            res.body.length :
            count.body[0].no_of_rows;
        return result;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLogInfByID(tableName, id) {
    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG_INFORMED?_where=(table_name,eq,${tableName})~and(id,eq,${id})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLog(tableName, businessID) {
    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG?_where=(table_name,eq,${tableName})~and(business_data_id,eq,${businessID})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function queryProcessLogByID(tableName, id) {
    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG?_where=(table_name,eq,${tableName})~and(id,eq,${id})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function deleteProcessLog(tableName, node) {
    //遍历node,取出里面的ids
    var ids = '';

    _.each(node, function(item) {
        ids = ids + ',' + item['id'];
    });

    ids = ids.substring(1);

    //提交URL
    let deleteURL = `${api.domain}/api/PR_LOG/bulk?_ids=${ids}`;

    try {
        const res = await superagent.delete(deleteURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，删除到这个节点对应的流程信息
 */
export async function deleteProcessLogInf(tableName, node) {
    //遍历node,取出里面的ids
    var ids = '';

    _.each(node, function(item) {
        ids = ids + ',' + item['id'];
    });

    ids = ids.substring(1);

    //提交URL
    let deleteURL = `${api.domain}/api/PR_LOG_INFORMED/bulk?_ids=${ids}`;

    try {
        const res = await superagent.delete(deleteURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function postProcessLog(node, callback) {
    //提交URL
    let postURL = `${api.domain}/api/PR_LOG`;

    try {
        const res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function postProcessFreeNode(node) {
    //提交URL
    let postURL = `${api.domain}/api/BS_FREE_PROCESS`;

    try {
        const res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 根据数据字典中的节点编号，查询到这个节点对应的流程岗位名称
 */
export async function postProcessLogHistory(node) {
    //是否批处理
    let bflag = node instanceof Array && node.length > 1 ? '/bulk' : '';

    //如果只有一条数据
    if (node instanceof Array && node.length == 1) {
        bflag = '';
        node = node[0];
    }

    //提交URL
    let postURL = `${api.domain}/api/PR_LOG_HISTORY${bflag}`;

    try {
        const res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 想知会记录列表提交数据
 */
export async function postProcessLogInformed(node) {
    //是否批处理
    let bflag = node instanceof Array && node.length > 1 ? '/bulk' : '';

    //如果只有一条数据
    if (node instanceof Array && node.length == 1) {
        bflag = '';
        node = node[0];
    }

    //提交URL
    let postURL = `${api.domain}/api/PR_LOG_INFORMED${bflag}`;

    try {
        const res = await superagent
            .post(postURL)
            .send(node)
            .set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

export async function queryProcessLogHtml(business_data_id, record) {
    //获取html信息
    let htmlInfo = getStore(`processlog_by_bs_data_id@${business_data_id}`);

    if (htmlInfo == null || htmlInfo == '') {
        //清空htmlInfo数据
        htmlInfo = '';
        //获取审批日志信息
        let processLogs = await queryPRLogHistoryByDataID(business_data_id);

        //遍历审批日志
        processLogs.forEach(item => {
            //获取操作时间
            let optime = formatDate(item.operate_time, 'yyyy-MM-dd hh:mm');
            optime = optime.replace('T', ' ');
            //获取html文本
            htmlInfo =
                htmlInfo +
                `流程：${item.process_name} , 节点：${item.process_station} , 处理人： ${item.approve_user} , 审批：${item.action} , 时间：${optime}<br/>`;
        });

        setStore(`processlog_by_bs_data_id@${business_data_id}`, htmlInfo, 10);
    }

    return htmlInfo;
}

/**
 * 获取某业务记录对应的审批日志信息
 */
export async function queryPRLogHistoryByDataID(business_data_id) {
    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG_HISTORY?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息
 */
export async function queryPRLogByDataID(business_data_id) {
    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息
 */
export async function queryPRLogInfByDataID(business_data_id) {
    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG_INFORMED?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息
 */
export async function queryPRLogInfTotal(business_data_id) {
    //获取今天日期
    let ctime = formatDate(new Date(), 'yyyy-MM-dd');

    //提交URL
    let queryURL = `${api.domain}/api/PR_LOG_INFORMED/count?_where=(business_data_id,eq,${business_data_id})`;
    let queryTodayURL = `${api.domain}/api/PR_LOG_INFORMED/count?_where=(business_data_id,eq,${business_data_id})~and(operate_time,like,~${ctime}~)`;
    let result = {};
    var count = 0;
    var today = 0;

    try {
        //统计知会总数
        try {
            count = await superagent.get(queryURL).set('accept', 'json');
        } catch (error) {
            console.log('query total loginfo error :' + error);
        }
        //统计当天知会次数
        try {
            today = await superagent.get(queryTodayURL).set('accept', 'json');
        } catch (error) {
            console.log('query today loginfo error :' + error);
        }
        result.total = count.body[0].no_of_rows;
        result.today = today.body[0].no_of_rows;
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export async function queryLoginUser() {
    let queryURL = `${api.domain}/jeecg-boot/api/login/user`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);

        return res.body;
    } catch (err) {
        console.error(err);
    }
}

/**
 * 获取n位随机数,随机来源chars
 */
export function randomChars(n) {
    var chars = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'.split(
        ','
    );

    var res = '';
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

/**
 * 通过函数暴露API
 */
export function commonArgs() {
    return api;
}

/**
 * @function 查询请假类型
 */
export function queryLeaveType(leave) {
    var config = {
        affairs_leave: '事假',
        sick_leave: '病假',
        marital_leave: '婚假',
        funeral_leave: '丧假',
        maternity_leave: '产假',
        paternity_leave: '陪产假',
        annual_leave: '年假',
        wr_injury_leave: '工伤假',
        other_leave: '其他',
    };
    return config[leave];
}

/**
 * @function 查询流程状态
 */
export function queryBpmStatus(status) {
    var config = {
        '1': '待提交',
        '2': '处理中',
        '3': '已完成',
        '4': '已作废',
    };

    return config[status];
}

/**
 * @function 根据表名查询表单名称
 */
export function queryFormName(tableName) {
    var config = {
        BS_LEAVE: '请假流程申请单',
        BS_EGRESS: '外出流程申请单',
        BS_OVERTIME: '加班流程申请单',
        BS_ATTENDANCE: '考勤异常流程申请单',
        BS_RECORD_BORROW: '档案及证照借阅申请单',
        BS_SEAL_NORMAL: '用印申请(非合同)流程申请单',
        BS_SEAL_CONTRACT: '用印申请(合同)流程申请单',
    };

    return config[tableName];
}

/**
 * @function 根据表名查询表单名称
 */
export function queryFormTypeName(tableName) {
    var config = {
        BS_LEAVE: '请假',
        BS_EGRESS: '外出',
        BS_OVERTIME: '加班',
        BS_ATTENDANCE: '考勤',
        BS_RECORD_BORROW: '借阅',
        BS_SEAL_NORMAL: '申请',
        BS_SEAL_CONTRACT: '申请',
    };

    return config[tableName];
}

/**
 * @function 根据表名查询表单名称
 */
export function queryFormTypeValue(tableName) {
    var config = {
        BS_LEAVE: '--',
        BS_EGRESS: '普通',
        BS_OVERTIME: '普通',
        BS_ATTENDANCE: '普通',
        BS_RECORD_BORROW: '普通',
        BS_SEAL_NORMAL: '非合同',
        BS_SEAL_CONTRACT: '合同',
    };

    return config[tableName];
}

/**
 * @function 根据表名查询表单名称
 */
export function queryFormMainTable(tableName) {
    var config = {
        BS_LEAVE: false,
        BS_EGRESS: false,
        BS_OVERTIME: false,
        BS_ATTENDANCE: true,
        BS_RECORD_BORROW: false,
        BS_SEAL_NORMAL: false,
        BS_SEAL_CONTRACT: false,
    };

    return config[tableName];
}

/**
 * @function 开始日期表单显示名称
 */
export function queryFormMTStarttimeName(tableName) {
    var config = {
        BS_LEAVE: '开始',
        BS_EGRESS: '开始',
        BS_OVERTIME: '开始',
        BS_ATTENDANCE: '开始',
        BS_RECORD_BORROW: '借阅',
        BS_SEAL_NORMAL: '开始',
        BS_SEAL_CONTRACT: '开始',
    };

    return config[tableName];
}

/**
 * @function 结束日期表单显示名称
 */
export function queryFormMTEndtimeName(tableName) {
    var config = {
        BS_LEAVE: '结束',
        BS_EGRESS: '结束',
        BS_OVERTIME: '结束',
        BS_ATTENDANCE: '结束',
        BS_RECORD_BORROW: '归还',
        BS_SEAL_NORMAL: '结束',
        BS_SEAL_CONTRACT: '结束',
    };

    return config[tableName];
}

/**
 * @function 结束日期表单显示名称
 */
export function queryFormMTFileName(tableName) {
    var config = {
        BS_LEAVE: '文件名称',
        BS_EGRESS: '文件名称',
        BS_OVERTIME: '文件名称',
        BS_ATTENDANCE: '文件名称',
        BS_RECORD_BORROW: '档案资料',
        BS_SEAL_NORMAL: '文件名称',
        BS_SEAL_CONTRACT: '文件名称',
    };

    return config[tableName];
}

/**
 * @function 查询附表字段
 */
export function queryFormMTSubColumns(tableName) {
    var config = {
        BS_LEAVE: [],
        BS_EGRESS: [],
        BS_OVERTIME: [],
        BS_ATTENDANCE: [{
                title: '序号',
                dataIndex: 'no',
                width: '10%',
                align: 'center',
            },
            {
                title: '异常时间',
                dataIndex: 'adate',
                width: '35%',
                align: 'center',
            },
            {
                title: '异常类型',
                dataIndex: 'type',
                width: '20%',
                align: 'center',
            },
            {
                title: '异常说明',
                dataIndex: 'content',
                width: '35%',
                align: 'left',
            },
        ],
        BS_RECORD_BORROW: [],
        BS_SEAL_NORMAL: [],
        BS_SEAL_CONTRACT: [],
    };

    return config[tableName];
}

/**
 * @function 查询附表数据
 */
export async function queryFormMTSubData(tableName, foreignKey, id) {
    var config = {
        BS_LEAVE: [],
        BS_EGRESS: [],
        BS_OVERTIME: [],
        BS_ATTENDANCE: [],
        BS_RECORD_BORROW: [],
        BS_SEAL_NORMAL: [],
        BS_SEAL_CONTRACT: [],
    };
    if (tableName == 'BS_ATTENDANCE') {
        let data = await queryTableDataByField(
            tableName + '_DETAILS',
            foreignKey,
            id
        );
        config['BS_ATTENDANCE'] = data;
    }
    return config[tableName];
}

/**
 * @function 查询审批流程信息
 */
export async function queryWorkflows(business_data_id, record) {
    //待返回审批流程数据
    let workflows = getStore(`workflows_by_data_id@${business_data_id}`);

    if (
        workflows == null ||
        workflows == '' ||
        typeof workflows == 'undefined' ||
        workflows.length == 0
    ) {
        //流程数据设置为数组
        workflows = [];

        //获取审批日志信息
        let processLogs = await queryPRLogHistoryByDataID(business_data_id);

        //遍历审批日志
        _.each(processLogs, (item, index) => {
            //获取下一节点
            let next = index < processLogs.length - 1 ?
                processLogs[index + 1] :
                { action: '' };
            //获取标识
            let flag = index == processLogs.length - 1;
            //获取操作时间
            let optime = formatDate(item.operate_time, 'yyyy-MM-dd hh:mm:ss');

            let content = `节点：${item.process_station} , 处理人： ${item.approve_user} , 审批：${item.action} , 审批意见：${item.action_opinion} , 时间：${optime} `;

            let color = item.action == '同意' ?
                'green' :
                item.action == '驳回' ? 'red' : item.action == '知会' ? 'yellow' : 'blue';

            //默认认为最靠近知会的节点为审批节点，颜色标识为蓝色
            color = item.action == '同意' && next.action == '知会' ? 'blue' : color;
            color = flag && item.action == '同意' ? 'blue' : color;
            color = flag && item.action == '知会' ? 'orange' : color;

            let node = {
                id: item.id,
                color: color,
                content: content,
                status: 'over',
            };

            workflows.push(node);
        });

        //获取正在审批的审批日志信息
        processLogs = await queryPRLogByDataID(business_data_id);

        _.each(processLogs, (item, index) => {
            let node = {
                id: item.id,
                color: 'pink',
                content: `节点：${item.process_station} , 待处理人： ${item.employee} , 审批：待处理 , 时间：-- `,
                status: 'wait',
            };
            workflows.push(node);
        });

        //获取正在审批的审批日志信息
        processLogs = await queryPRLogInfByDataID(business_data_id);

        _.each(processLogs, (item, index) => {
            //获取操作时间
            let optime = formatDate(item.operate_time, 'yyyy-MM-dd hh:mm:ss');
            let appruser = deNull(item.approve_user);
            let node = {
                id: item.id,
                color: 'orange',
                content: `节点：${item.process_station} , 待处理人： ${item.employee} ,  已处理人： ${appruser} , 审批：知会 , 时间：${optime} `,
                status: 'wait',
            };
            workflows.push(node);
        });

        setStore(
            `workflows_by_data_id@${business_data_id}`,
            JSON.stringify(workflows),
            10
        );
    }

    return workflows;
}

/**
 * 获取某业务记录对应的审批日志信息
 */
export async function queryDepartNameByCode(code) {
    //提交URL
    let queryURL = `${api.domain}/api/sys_depart?_where=(org_code,eq,${code})`;

    try {
        const res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        return res.body[0];
    } catch (err) {
        console.error(err);
    }
}

/**
 * @function 查询表单详情页面
 */
export async function watchFormLeave(that) {
    //获取对应表单信息
    let tableName = queryUrlString('table_name');
    //查询主键ID
    let id = queryUrlString('id');
    //获取用户名称
    let username = queryUrlString('user');

    that.formName = queryFormName(tableName);
    that.username = username;

    that.curRow = await queryTableData(tableName, id);

    //获取部门信息
    var department = '';

    try {
        department = await queryTableData(
            'sys_depart',
            that.curRow.department || that.curRow.sys_org_code
        );
    } catch (error) {
        console.log('query department error :' + error);
    }

    //如果没查询到部门信息，则通过org_code字段查询部门信息
    department =
        department || (await queryDepartNameByCode(that.curRow.sys_org_code));

    //查询审批流程信息
    that.workflows = await queryWorkflows(that.curRow.id);

    that.curRow.leave_type_name =
        queryLeaveType(that.curRow.leave_off_type) ||
        queryFormTypeValue(tableName);

    //查询当前流程状态
    that.curRow.bpm_status_name = queryBpmStatus(that.curRow.bpm_status);

    //查询申请开始日期
    that.curRow.starttime = formatDate(
        that.curRow.starttime,
        'yyyy-MM-dd HH:mm:ss'
    );

    //如果未查询到开始日期，则使用申请日期
    if (that.curRow.starttime == '--') {
        that.curRow.starttime = formatDate(
            that.curRow.create_time,
            'yyyy-MM-dd HH:mm:ss'
        );
    }

    //查询申请结束日期
    that.curRow.endtime = formatDate(that.curRow.endtime, 'yyyy-MM-dd HH:mm:ss');

    //查询申请创建日期
    that.curRow.create_time = formatDate(
        that.curRow.create_time,
        'yyyy-MM-dd HH:mm:ss'
    );

    //查询表单类型名称
    that.curRow.formTypeName = queryFormTypeName(tableName);
    //查询日期之间的天数
    that.curRow.total_days = queryDateDiff(
        that.curRow.starttime,
        that.curRow.endtime
    );

    //查询此表单是否为主表单
    that.curRow.main_table_status = queryFormMainTable(tableName);
    //查询此表单的附表字段
    that.curRow.sub_columns = queryFormMTSubColumns(tableName);
    //查询此表单的附表数据
    that.curRow.sub_data = await queryFormMTSubData(
        tableName,
        'foreign_key_id',
        id
    );

    //查询结束时间表单显示名称
    that.curRow.startTimeName = queryFormMTStarttimeName(tableName) || '开始';
    //查询结束时间表单显示名称
    that.curRow.endTimeName = queryFormMTEndtimeName(tableName) || '结束';

    //查询文件名称显示标题
    that.curRow.fileNameTitle = queryFormMTFileName(tableName) || '文件名称';

    //查询字段中文名称
    that.curRow.fieldName = {};

    try {
        //设置字段名称
        let filedValue = await queryTableFieldInfo(
            'v_table_field',
            tableName,
            'file_name'
        );

        //设置字段名称
        if (typeof filedValue != 'undefined') {
            that.curRow.fieldName['file_name'] = filedValue['txt'];
        }
    } catch (error) {
        console.log('setup fieldName info error :' + error);
    }

    try {
        that.depart = department;
    } catch (error) {
        console.log('setup department error : ' + error);
    }
    console.log(that.curRow.department_name);

    return that;
}

/**
 * @function 查询文档对应预览地址
 * @param {*} text 
 */
export function queryFileViewURL(text) {
    //获取小写文档下载地址
    let textURL = text.toLowerCase();
    //如果不含有office文档
    if (!(textURL.includes('doc') ||
            textURL.includes('ppt') ||
            textURL.includes('xls') ||
            textURL.includes('pdf'))) {
        return false;
    }

    //文档数组
    let fileList = [];

    //文档URL
    let url = '';
    if (text.indexOf(',') > 0) {
        fileList = text.split(',');
    } else {
        fileList.push(text);
    }

    //获取第一个office文档
    url = _.find(fileList, function(text) {
        //获取小写字符串
        text = text.toLowerCase();
        return (
            text.includes('doc') ||
            text.includes('ppt') ||
            text.includes('xls') ||
            text.includes('pdf')
        );
    });

    //微软文档预览API
    let officeURL = window._CONFIG['previewURL'];
    //文档下载地址
    url = window._CONFIG['downloadURL'] + '/' + url;
    //URL加密，保证中文路径可以被正常解析
    let xurl = encodeURIComponent(url);

    //获取文件后缀
    let suffix = text
        .substring(text.lastIndexOf('.'), text.length)
        .toLowerCase();

    //如果word文档，则使用微软API打开
    url = suffix.includes('doc') ||
        suffix.includes('ppt') ||
        suffix.includes('xls') ?
        officeURL + xurl :
        url;

    //如果pdf文档，则浏览器上直接打开
    url = suffix.includes('pdf') ? url : url;

    //返回URL
    return url;
}

/**
 * @function 查询文件类型
 * @param {*} text 
 */
export function queryFileType(text) {
    //获取文件后缀
    let suffix = text.toLowerCase();

    //如果office文档，则使用微软API打开
    let type = suffix.includes('jpg') ||
        suffix.includes('jpeg') ||
        suffix.includes('bmp') ||
        suffix.includes('gif') ||
        suffix.includes('webp') ||
        suffix.includes('png') ?
        '@image@' :
        '';

    type = suffix.includes('doc') ||
        suffix.includes('xls') ||
        suffix.includes('ppt') ?
        `${type}@office@` :
        type;

    //返回URL
    return type;
}

/**
 * @function 查询附件中的图片地址
 */
export function queryImageURL(text) {
    //文档数组
    let fileList = [];
    let images = [];

    //如果含有多个地址，则split后获取数组
    if (text.indexOf(',') > 0) {
        fileList = text.split(',');
    } else {
        fileList.push(text);
    }

    //遍历并筛选出里面的图片信息
    fileList = _.filter(fileList, function(text) {
        //获取小写后的路径
        let ptext = text.toLowerCase();

        //获取图片标识
        let flag =
            ptext.includes('jpg') ||
            ptext.includes('jpeg') ||
            ptext.includes('bmp') ||
            ptext.includes('gif') ||
            ptext.includes('webp') ||
            ptext.includes('png');

        //获取图片真实下载地址
        text = window._CONFIG['downloadURL'] + '/' + text;

        //如果文件路径为图片地址，则存入images中
        if (flag) {
            //将数据存入images中
            images.push({
                src: text,
                msrc: window._CONFIG['thumborURL'] + encodeURIComponent(text),
                title: '图片预览',
                w: 900,
                h: 600,
            });
        }
        return flag;
    });

    //返回图片数组信息
    return images;
}

/**
 * @function 设置详情页面图片展示样式
 */
export function changeImageCSS() {
    setTimeout(() => {
        //图片预览，Css设置Float:left
        $('figure[itemscope="itemscope"]').css('float', 'left');
        $('figure[itemscope="itemscope"]').css('margin-right', '10px');
        $('figure[itemscope="itemscope"]').css('margin-bottom', '10px');
        //图片预览，文件名称展示位置Center
        $('.pswp__caption__center').css('text-align', 'center');
    }, 10);
}

/**
 * @function 获取当前节点是否有知会或者审批节点信息
 */
export async function queryCurNodePageType(pageType) {
    //获取页面类型
    let type = queryUrlString('type');

    //如果审批详情或者知会详情页面，则设置pageType
    if (type == 'workflow' || type == 'notify') {
        //获取当前节点审批流程数据）
        let flag = await queryProcessLogByID(
            queryUrlString('table_name'),
            queryUrlString('processLogID')
        );

        //获取当前节点知会流程数据
        if (deNull(flag) == '') {
            flag = await queryProcessLogInfByID(
                queryUrlString('table_name'),
                queryUrlString('processLogID')
            );
        }

        //获取页面类型
        pageType = deNull(flag) == '' ? 'view' : pageType;
    }

    //返回pageType
    return pageType;
}

/**
 * @function 渲染审批流程详情
 */
export async function colorProcessDetail(that, main) {
    main.curRow = that.curRow;
    main.depart = that.depart;
    main.workflows = that.workflows;
    main.columns = that.curRow.sub_columns;
    main.data = that.curRow.sub_data;
    main.pageType = queryUrlString('type');
    main.curRow.fileStatus = deNull(main.curRow.files) == '' ? 1 : 0;
    main.curRow.fileType = queryFileType(main.curRow.files);
    main.curRow.fileURL = queryFileViewURL(main.curRow.files);
    main.slides = queryImageURL(main.curRow.files);
    //检查是否可以进行审批/同意等操作
    main.pageType = await queryCurNodePageType(main.pageType);
    //修改图片样式
    changeImageCSS();
    //返回设置结果
    return main;
}