import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
import * as storage from "@/utils/storage";
//import * as _ from 'underscore';

/**
 * @function 审批同意处理
 * @param tableName 审批处理关联的业务表
 * @param curRow    审批处理关联的业务数据
 * @param pnode     审批处理下一节点的审批信息
 * @param prLogHisNode     审批处理当前节点的审批信息
 * @param bpmStatus 审批处理关联的业务数据应变更的状态
 * @param freeNode  审批流程中自由流程节点
 * @param wflowAddUser 审批流程中加签用户
 * @param wflowNotifyUser 审批流程中会签用户
 * @define bpmStatus（1：待提交	2：审核中	3：审批中	4：已完成	5：已完成 10：已作废）
 */
export async function postWorkflowApprove(tableName, curRow, operationData, pnode, prLogHisNode, bpmStatus, freeNode, wflowAddUser, wflowNotifyUser, curAuditor) {

    //执行处理的结果
    var result = null;

    //流程事务处理框架，保证流程处理操作的事务最终一致性
    try {
        //执行事务处理框架
        result = await manageAPI.postTableData(
            "BS_TRANSACTION",
            operationData
        );
    } catch (error) {
        console.log("流程事务处理框架处理异常", error);
    }

    try {
        //如果“审批处理下一节点的审批信息”不为空，则执行当前处理
        if (pnode != null) {
            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await manageAPI.postProcessLog(pnode);
        }
    } catch (error) {
        console.log("审批处理下一节点的审批信息", error);
    }

    try {
        //如果“审批处理当前节点的审批信息”不为空，则执行当前处理
        if (tableName != null && curRow != null && prLogHisNode != null && bpmStatus != null) {

            //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
            result = await manageAPI.postProcessLogHistory(prLogHisNode);

            //删除当前审批节点中的所有记录
            result = await manageAPI.deleteProcessLog(
                tableName,
                prLogHisNode
            );

            //修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 
            result = await manageAPI.patchTableData(
                tableName,
                curRow["business_data_id"],
                bpmStatus
            );

            //如果本次流程结束，即状态变为已完成，或者，状态变成，待处理，则将当前的自由流程记录转为历史，以前此表单的自由流程进入历史，并删除以前此表单对应的自由流程
            result = await manageAPI.transFreeWflowHis(curRow["business_data_id"]);

            //二次提交审批状态
            setTimeout(async() => {
                //修改审批状态为审批中
                result = await manageAPI.patchTableData(
                    tableName,
                    curRow["business_data_id"],
                    bpmStatus
                );
            }, 100);

        }
    } catch (error) {
        console.log("审批处理当前节点的审批信息", error);
    }

    //如果加签、会签用户不为空，则需要将加签、会签用户，追加至自由流程审批表中
    try {

        freeNode.audit_node = `,${freeNode.audit_node},`;

        //如果加签用户数据不为空，则向自由流程数据表中，添加加签数据
        if (tools.deNull(wflowAddUser) && !freeNode.audit_node.includes(wflowAddUser)) {

            freeNode.audit_node = freeNode.audit_node.replace(
                `,${curAuditor},`,
                `,${curAuditor},${wflowAddUser},`
            );
        }

        //如果会签用户数据不为空，则向自由流程数据表中，添加会签数据
        if (tools.deNull(wflowNotifyUser) && !freeNode.audit_node.includes(wflowNotifyUser)) {

            freeNode.audit_node = freeNode.audit_node.replace(
                `,${curAuditor},`,
                `,${wflowNotifyUser},${curAuditor},`
            );
        }

        //如果当前用户，进行了会签操作，则不应在audit_node记录多次，删除第一次记录
        if (tools.deNull(wflowNotifyUser) && freeNode.audit_node.indexOf(curAuditor) != freeNode.audit_node.lastIndexOf(curAuditor)) {
            freeNode.audit_node = freeNode.audit_node.replace(
                `,${curAuditor},`,
                `,`
            );
        }

        //去掉开头、结尾的逗号
        if (freeNode.audit_node.startsWith(",")) {
            freeNode.audit_node = freeNode.audit_node.substring(1);
        }

        //去掉开头、结尾的逗号
        if (freeNode.audit_node.endsWith(",")) {
            freeNode.audit_node = freeNode.audit_node.substring(0, freeNode.audit_node.length - 1);
        }

        result = await manageAPI.patchTableData(
            'bs_free_process',
            freeNode["id"], {
                audit_node: freeNode.audit_node
            }
        );

    } catch (error) {
        console.log(error);
    }

    //审批处理过程中，添加相关的动态信息
    try {

        //如果流程状态为1，则提交驳回动态到数据库，如果流程状态为4或者5，则提交审批通过动态到数据库
        if (bpmStatus.bpm_status == "1") {
            await postDynamicReject(tableName, curRow);
        } else if (bpmStatus.bpm_status == "4") {
            await postDynamicAgree(tableName, curRow);
        } else if (bpmStatus.bpm_status == "5") {
            await postDynamicNotify(tableName, curRow);
        }

    } catch (error) {
        console.log(error);
    }

    //打印会签用户、加签用户数据
    console.log("加签用户：" + wflowAddUser);
    console.log("会签用户：" + wflowNotifyUser);

    //返回执行结果
    return result;

}

/**
 * @function 处理自由流程发起提交审批操作
 * @param tableName     表单名称
 * @param curRow        当前记录数
 * @param freeWFNode    自由流程节点
 * @param startFreeNode 流程发起节点
 * @param nextWflowNode 下一流程处理节点
 * @param bpmStatus   审批处理关联的业务数据应变更的状态
 * @define bpmStatus （1：待提交	2：审核中	3：审批中	4：已完成	5：已完成 10：已作废）
 */
export async function postWorkflowFree(tableName, curRow, freeWFNode, startFreeNode, nextWflowNode, bpmStatus) {

    //执行处理的结果
    var result = null;

    //状态节点
    var statusNode = {
        bpm_status: bpmStatus
    };

    //动态内容
    var dynamicNode = {};

    try {
        //去掉undefined字符串
        freeWFNode.notify_node = freeWFNode.notify_node.replace(/undefined/g, '')

        //如果字符串以逗号开头，则去掉开头的逗号
        if (freeWFNode.notify_node.startsWith(',')) {
            freeWFNode.notify_node = freeWFNode.notify_node.substring(1);
        }

        //如果字符串以逗号结束，则去掉结尾的逗号
        if (freeWFNode.notify_node.endsWith(',')) {
            freeWFNode.notify_node = freeWFNode.notify_node.substring(0, freeWFNode.notify_node.length - 1);
        }
    } catch (error) {
        console.log(error);
    }

    //构造用户动态内容
    try {

        //日期格式化
        var timestamp = new Date().getTime();

        //定义动态编码
        var id = tools.queryUniqueID();

        //获取用户信息
        var userInfo = storage.getStore("cur_user");

        //表单数据库数据
        var mainData = await manageAPI.queryTableData(tableName, curRow.id);

        //获取表单的中文名称
        var tname = await manageAPI.queryTableDataByField('v_table_name', 'id', tableName);
        try {
            tname = tname[0]['name'];
        } catch (error) {
            console.log(error);
        }

        //表单内容
        var title = '<div><span>' + userInfo['realname'] + `</span> 发起了 <a href="/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify">` + tname + `</a> 的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify">流程申请</a> ` + '</div>';

        //待发布动态节点内容
        dynamicNode = {
            id: id,
            create_by: userInfo['username'],
            create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
            update_by: userInfo.username,
            title: title,
            content: title,
            main_key: curRow.id,
            main_table: tableName,
            main_data: JSON.stringify(mainData),
            relate_users: `${freeWFNode.audit_node},${freeWFNode.approve_node},${freeWFNode.notify_node},${userInfo.username},admin,`,
        };

        //设置自由流程的表单业务数据
        freeWFNode['main_data'] = JSON.stringify(mainData);

    } catch (error) {
        console.log(error);
    }

    //执行提交审批流程的业务操作
    try {

        //将审批用户记录，知会用户记录，写入相应的自由流程表单中
        result = await manageAPI.postProcessFreeNode(freeWFNode);

        //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
        result = await manageAPI.postProcessLogHistory(startFreeNode);

        //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
        result = await manageAPI.postProcessLog(nextWflowNode);

        //第四步，修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 （1:待提交 2:处理中 3:审批中 4:已完成 5:已完成） //修改审批状态为处理中，并记录审批日志；将当前审批状态修改为处理中 
        result = await manageAPI.patchTableData(
            tableName,
            curRow["id"],
            statusNode
        );

        //第五步，新增动态数据，内容：XXX 发起了 XX 业务的流程申请。
        result = await manageAPI.postTableData('bs_dynamic', dynamicNode);

        //二次修改状态为审批中
        setTimeout(async() => {
            //修改审批状态为审批中,第二次修改
            result = await manageAPI.patchTableData(
                tableName,
                curRow["id"],
                statusNode
            );
        }, 100)

    } catch (error) {
        console.log("处理自由流程发起提交审批操作异常：" + error)
    }

    //返回执行结果
    return result;

}

/**
 * @function 处理自由流程发起提交审批操作
 * @param tableName     表单名称
 * @param curRow        当前记录数
 * @param node          流程节点信息
 * @define bpmStatus （1：待提交	2：审核中	3：审批中	4：已完成	5：已完成 10：已作废）
 */
export async function postWorkflowCancel(tableName, curRow, node) {

    //执行结果
    var result;

    //动态内容
    var dynamicNode = {};

    //构造用户动态内容
    try {

        //日期格式化
        var timestamp = new Date().getTime();

        //定义动态编码
        var id = tools.queryUniqueID();

        //获取用户信息
        var userInfo = storage.getStore("cur_user");

        //表单数据库数据
        var mainData = await manageAPI.queryTableData(tableName, curRow.id);

        //获取表单的中文名称
        var tname = await manageAPI.queryTableDataByField('v_table_name', 'id', tableName);

        try {
            tname = tname[0]['name'];
        } catch (error) {
            console.log(error);
        }

        //表单内容
        var title = '<div><span>' + userInfo['realname'] + `</span> 撤销了 <a href="/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify">` + tname + `</a> 的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify">流程申请</a> ` + '</div>';

        //待发布动态节点内容
        dynamicNode = {
            id: id,
            create_by: userInfo['username'],
            create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
            update_by: userInfo.username,
            title: title,
            content: title,
            main_key: curRow.id,
            main_table: tableName,
            main_data: JSON.stringify(mainData),
            relate_users: `,${userInfo.username},admin,`,
        };

    } catch (error) {
        console.log(error);
    }

    try {

        //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
        result = await manageAPI.postProcessLogHistory(node);

        //删除当前审批节点中的所有记录
        result = await manageAPI.deleteProcessLog(tableName, node);

        //修改当前审批状态为待处理
        result = await manageAPI.patchTableData(tableName, curRow["id"], {
            bpm_status: "1"
        });

        //新增动态数据，内容：XXX 撤销了 XX 业务的流程申请。
        result = await manageAPI.postTableData('bs_dynamic', dynamicNode);

        //二次修改状态为待提交
        setTimeout(async() => {
            //修改当前审批状态为待提交
            result = await manageAPI.patchTableData(tableName, curRow["id"], {
                bpm_status: "1"
            });
        }, 100)

    } catch (error) {
        console.log(error);
    }

    //返回执行结果
    return result;

}

/**
 * @function 处理驳回的动态消息函数
 */
export async function postDynamicReject(tableName, curRow) {

    //返回对象结果
    var result;

    //动态内容
    var dynamicNode = {};

    //构造用户动态内容
    try {

        //日期格式化
        var timestamp = new Date().getTime();

        //定义动态编码
        var id = tools.queryUniqueID();

        //获取用户信息
        var userInfo = storage.getStore("cur_user");

        //查询用户信息
        var userlist = await manageAPI.queryUserName();

        //表单数据库数据
        var mainData = await manageAPI.queryTableData(tableName, curRow.main_value);

        //获取表单的中文名称
        var tname = await manageAPI.queryTableDataByField('v_table_name', 'id', tableName);

        //获取名称，并捕获异常
        try {
            tname = tname[0]['name'];
        } catch (error) {
            console.log(error);
        }

        //流程发起人
        var proponents = curRow.proponents;

        //获取流程发起人的中文信息
        proponents = window.__.find(userlist, (item) => {
            return curRow.proponents == item.username;
        });

        //表单内容
        var title = "<div><span>" + userInfo['realname'] + '</span> 驳回了 <span>' + proponents.realname + `</span> 发起的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.main_value}&user=${userInfo.username}&type=notify">` + tname + `</a> 的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.main_value}&user=${userInfo.username}&type=notify">流程申请</a> ` + "</div>";

        //待发布动态节点内容
        dynamicNode = {
            id: id,
            create_by: userInfo['username'],
            create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
            update_by: proponents.username,
            title: title,
            content: title,
            main_key: curRow.main_value,
            main_table: tableName,
            main_data: JSON.stringify(mainData),
            relate_users: `,${userInfo.username},${proponents.username},admin,`,
        };

        //新增动态数据，内容：XXX 撤销了 XX 业务的流程申请。
        result = await manageAPI.postTableData('bs_dynamic', dynamicNode);

    } catch (error) {
        console.log(error);
    }

    return result;

}

/**
 * @function 处理驳回的动态消息函数
 */
export async function postDynamicAgree(tableName, curRow) {

    //返回对象结果
    var result;

    //动态内容
    var dynamicNode = {};

    //构造用户动态内容
    try {

        //日期格式化
        var timestamp = new Date().getTime();

        //定义动态编码
        var id = tools.queryUniqueID();

        //获取用户信息
        var userInfo = storage.getStore("cur_user");

        //查询用户信息
        var userlist = await manageAPI.queryUserName();

        //表单数据库数据
        var mainData = await manageAPI.queryTableData(tableName, curRow.main_value);

        //获取表单的中文名称
        var tname = await manageAPI.queryTableDataByField('v_table_name', 'id', tableName);
        try {
            tname = tname[0]['name'];
        } catch (error) {
            console.log(error);
        }

        //流程发起人
        var proponents = curRow.proponents;

        //获取流程发起人的中文信息
        proponents = window.__.find(userlist, (item) => {
            return curRow.proponents == item.username;
        });

        //表单内容
        var title = '<div><span>' + userInfo['realname'] + '</span> 同意了 <span>' + proponents.realname + `</span> 发起的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.main_value}&user=${userInfo.username}&type=notify">` + tname + `</a> 的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.main_value}&user=${userInfo.username}&type=notify">流程申请</a> ` + '</div>';

        //待发布动态节点内容
        dynamicNode = {
            id: id,
            create_by: userInfo['username'],
            create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
            update_by: proponents.username,
            title: title,
            content: title,
            main_key: curRow.main_value,
            main_table: tableName,
            main_data: JSON.stringify(mainData),
            relate_users: `,${userInfo.username},${proponents.username},admin,`,
        };

        //新增动态数据，内容：XXX 撤销了 XX 业务的流程申请。
        result = await manageAPI.postTableData('bs_dynamic', dynamicNode);

    } catch (error) {
        console.log(error);
    }

    return result;

}

/**
 * @function 处理驳回的动态消息函数
 */
export async function postDynamicNotify(tableName, curRow) {

    //返回对象结果
    var result;

    //动态内容
    var dynamicNode = {};

    //构造用户动态内容
    try {

        //日期格式化
        var timestamp = new Date().getTime();

        //定义动态编码
        var id = tools.queryUniqueID();

        //获取用户信息
        var userInfo = storage.getStore("cur_user");

        //查询用户信息
        var userlist = await manageAPI.queryUserName();

        //表单数据库数据
        var mainData = await manageAPI.queryTableData(tableName, curRow.main_value);

        //获取表单的中文名称
        var tname = await manageAPI.queryTableDataByField('v_table_name', 'id', tableName);

        try {
            tname = tname[0]['name'];
        } catch (error) {
            console.log(error);
        }

        //流程发起人
        var proponents = curRow.proponents;

        //获取流程发起人的中文信息
        proponents = window.__.find(userlist, (item) => {
            return curRow.proponents == item.username;
        });

        //表单内容
        var title = "<div><span>" + proponents.realname + `</span> 发起的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.main_value}&user=${userInfo.username}&type=notify">` + tname + `</a> 的 <a href="/workflow/view?table_name=${tableName}&id=${curRow.main_value}&user=${userInfo.username}&type=notify" >流程申请</a> 流程走完且知会通知完毕` + "</div>";

        //待发布动态节点内容
        dynamicNode = {
            id: id,
            create_by: userInfo['username'],
            create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
            update_by: proponents.username,
            title: title,
            content: title,
            main_key: curRow.main_value,
            main_table: tableName,
            main_data: JSON.stringify(mainData),
            relate_users: `,${userInfo.username},${proponents.username},admin,`,
        };

        //新增动态数据，内容：XXX 撤销了 XX 业务的流程申请。
        result = await manageAPI.postTableData('bs_dynamic', dynamicNode);

    } catch (error) {
        console.log(error);
    }

    return result;

}

/**
 * @function 校验自由流程提交信息是否准确
 * @param wfUsers 审核人员
 * @param nfUsers 知会人员
 * @param approver 审批人员
 * @param pageType page类型
 * @param $confirm 提示函数
 */
export function checkSubmitInfo(wfUsers, nfUsers, approver, pageType, $confirm) {

    try {

        //审批用户不能为空
        if (tools.deNull(approver) == "" && pageType == "workflowing") {
            $confirm({
                title: "温馨提示",
                content: "请选择审批用户!"
            });
            return false;
        }

        //如果审批用户含有多个，则不能提交
        if (tools.deNull(approver).includes(",") && pageType == "workflowing") {
            $confirm({
                title: "温馨提示",
                content: "审批用户只能选择一个!"
            });
            return false;
        }

        //知会用户不能为空
        if (tools.deNull(nfUsers) == "" && pageType == "notifying") {
            //显示提示信息
            $confirm({
                title: "温馨提示",
                content: "请选择知会用户!"
            });
            return false;
        }

        //如果审批人员，出现在审核流程中，则提示错误
        if (("," + wfUsers + ",").includes("," + approver + ",") && pageType == "workflowing") {
            //显示提示信息
            $confirm({
                title: "温馨提示",
                content: `审批流程中，审批人员[${approver}]不能出现在审核人员中!`
            });
            return false;
        }

    } catch (error) {
        console.log("check submit info error : " + error);
    }

    return true;
}


/**
 * @function 将当前自由流程的数据转移到历史数据中
 * @param {*} id 
 */
export async function transFreeWflowHis(id) {

    //定义返回结果
    var result;

    try {

        //获取本表单业务的所有的自由流程数据
        let wflist = await manageAPI.queryHisFreeWorkflow(id);

        //将历史数据插入到历史自由流程表中
        let wcode = await manageAPI.insertTableData("bs_free_process_h", wflist);

        //删除当前自由流程表中历史数据
        result = await manageAPI.deleteTableItem("bs_free_process", wflist);

        //打印返回结果
        console.log("result :" + result + " wcode :" + wcode);


    } catch (error) {
        console.log("transfer free workflow node into history " + error);
    }

    return result;

}