<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button
        v-print="'#printContent'"
        ghost
        type="primary"
        v-if="pageType == 'print'"
        @click="handlePrint"
      >打印</a-button>
      <a-button
        ghost
        type="primary"
        @click="handleSubmitWF"
        v-if="pageType == 'workflowing' || pageType == 'notifying'"
      >提交</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p
          style="font-size: 24px;font-weight: 800;margin-bottom:10px;margin-top:15px;margin-bottom:35px;"
        >{{formName}}</p>
      </div>
      <!--签字-->
      <a-col :md="24" :sm="24">
        <div class="sign" style="text-align: left;height: inherit;margin-left:35px;">
          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="typeof curRow.no != 'undefined' && curRow.no != null"
          >
            <span style="float:left;display:block;">表单编号:</span>
            <div
              style="float:left; width:78%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.no"
            ></div>
          </a-col>
          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="typeof curRow.file_name != 'undefined' && curRow.file_name != null"
          >
            <span style="float:left;display:block;">{{curRow.fileNameTitle}}:</span>
            <div
              style="float:left; width:78%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.file_name"
            ></div>
          </a-col>
          <a-col :span="24" style="margin-top: 10px; margin-bottom:10px;">
            <span>申请人员:</span>
            <a-input style="width: 30%" readonly v-model="curRow.create_by" />
            <span style="margin-left: 12.5%">申请时间:</span>
            <a-input style="width: 30%" readonly v-model="curRow.create_time" />
          </a-col>
          <a-col :span="24" style="margin-bottom:10px;">
            <span>所属部门:</span>
            <a-input style="width: 30%" readonly v-model="depart.depart_name" />
            <span style="margin-left: 12.5%">{{curRow.formTypeName}}类型:</span>
            <a-input style="width: 30%" readonly v-model="curRow.leave_type_name" />
          </a-col>
          <a-col :span="24" style="margin-bottom:10px;">
            <span>{{curRow.startTimeName}}时间:</span>
            <a-input style="width: 30%" readonly v-model="curRow.starttime" />
            <span style="margin-left: 12.5%">{{curRow.endTimeName}}时间:</span>
            <a-input style="width: 30%" readonly v-model="curRow.endtime" />
          </a-col>
          <a-col :span="24" style="margin-bottom:10px;">
            <span>{{curRow.formTypeName}}天数:</span>
            <a-input style="width: 30%" readonly v-model="curRow.total_days" />
            <span style="margin-left: 12.5%">流程状态:</span>
            <a-input style="width: 30%" readonly v-model="curRow.bpm_status_name" />
          </a-col>
          <a-col :span="24"></a-col>
          <a-col :span="24" style="margin-top: 20px">
            <span style="float:left;display:block;">{{curRow.formTypeName}}内容:</span>
            <div
              style="float:left; width:78%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.content"
            ></div>
          </a-col>
          <a-col
            :span="24"
            style="margin-top: 30px"
            v-if="typeof curRow.location != 'undefined' && curRow.location != null"
          >
            <span style="float:left;display:block;">{{curRow.formTypeName}}地址:</span>
            <div
              style="float:left; width:78%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.location"
            ></div>
          </a-col>
          <a-col :span="20" style="margin-top:30px;" v-if="curRow.main_table_status == true">
            <template>
              <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="false"></a-table>
            </template>
          </a-col>

          <a-col
            :span="22"
            style="margin-top:30px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print'"
          >
            <template>
              <div
                :class="[this.curRow.fileStatus != 1 ? 'fileshow':'filenone']"
                v-if="this.curRow.fileType.includes('office')"
              >
                <iframe
                  v-print="'#printContent'"
                  class="no-print"
                  style="width:100%;height:720px;overflow-y:auto;overflow-x:hidden;border:0px solid #fefefe;"
                  :src="this.curRow.fileURL"
                />
              </div>
            </template>

            <template>
              <div
                :class="[this.curRow.fileStatus != 1 ? 'fileshow':'filenone']"
                v-if="this.curRow.fileType.includes('image')"
              >
                <vue-preview :slides="slides" @close="handleClose"></vue-preview>
              </div>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="curRow.bpm_status != 1">
            <div style="margin-bottom:20px;">审批流程</div>
            <template>
              <a-timeline>
                <div v-for="(item,index) in workflows" :key="index">
                  <a-timeline-item v-bind:color="item.color">
                    <a-icon
                      v-if="item.status == 'wait'"
                      slot="dot"
                      type="clock-circle-o"
                      style="font-size: 16px;"
                      v-bind:color="item.color"
                    />
                    {{item.content}}
                  </a-timeline-item>
                </div>
              </a-timeline>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'workflowing'">
            <template>
              <a-form :form="form">
                <a-form-item label="审核用户" style="width: 500px">
                  <j-select-multi-user v-model="wflowUsers"></j-select-multi-user>
                </a-form-item>

                <a-form-item label="审批用户" style="width: 500px">
                  <j-select-multi-user v-model="approveUser"></j-select-multi-user>
                </a-form-item>

                <a-form-item label="知会用户" style="width: 500px">
                  <j-select-multi-user v-model="notifyUsers"></j-select-multi-user>
                </a-form-item>
              </a-form>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'notifying'">
            <template>
              <a-form :form="form">
                <a-form-item label="知会用户" style="width: 500px">
                  <j-select-multi-user v-model="notifyUsers"></j-select-multi-user>
                </a-form-item>
              </a-form>
            </template>
          </a-col>

          <a-modal
            title="温馨提示"
            :visible="tipVisible"
            @ok="tipHandleOk"
            :confirmLoading="tipConfirmLoading"
            @cancel="tipHandleCancel"
          >
            <p>{{tipContent}}</p>
          </a-modal>
        </div>
      </a-col>
    </section>
  </a-card>
</template>
       

       
<script>
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import {
  randomChars,
  watchFormLeave,
  postProcessFreeNode,
  postProcessLogInformed,
  postProcessLog,
  queryPRLogInfTotal,
  queryApprovalExist,
  patchTableData,
  queryFileType,
  queryFileViewURL
} from "@/api/manage";
import ATextarea from "ant-design-vue/es/input/TextArea";
import JSelectMultiUser from "@/components/jeecgbiz/JSelectMultiUser";
import { queryUrlString, deNull, formatDate } from "@/utils/util";
import { setStore, getStore } from "@/utils/storage";

//默认预览图片
const images = [
  {
    src: "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
    msrc: "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
    title: "Image Caption",
    w: 900,
    h: 600
  }
];

export default {
  components: {
    ATextarea,
    ARow,
    ACol,
    JSelectMultiUser
  },
  name: "Printgzsld",
  props: {
    reBizCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      columns: [],
      data: [],
      loading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      formName: "流程申请单",
      curRow: {},
      depart: {},
      fileinfo: "",
      workflows: [],
      pageType: "",
      wflowUsers: "",
      notifyUsers: "",
      approveUser: "",
      tipVisible: false,
      tipContent: "",
      slides: images,
      form: this.$form.createForm(this)
    };
  },

  async created() {
    let that = await watchFormLeave(this);
    this.curRow = that.curRow;
    this.depart = that.depart;
    this.workflows = that.workflows;
    this.columns = that.curRow.sub_columns;
    this.data = that.curRow.sub_data;
    this.pageType = queryUrlString("type");
    this.curRow.fileStatus = deNull(this.curRow.files) == "" ? 1 : 0;
    this.curRow.fileType = queryFileType(this.curRow.files);
    this.curRow.fileURL = queryFileViewURL(this.curRow.files);
  },
  mounted() {},
  watch: {
    async $route() {
      let that = await watchFormLeave(this);
      this.curRow = that.curRow;
      this.depart = that.depart;
      this.workflows = that.workflows;
      this.columns = that.curRow.sub_columns;
      this.data = that.curRow.sub_data;
      this.pageType = queryUrlString("type");
      this.curRow.fileStatus = deNull(this.curRow.files) == "" ? 1 : 0;
      this.curRow.fileType = queryFileType(this.curRow.files);
      this.curRow.fileURL = queryFileViewURL(this.curRow.files);
    }
  },
  methods: {
    loadData() {},
    getDate() {},
    tipHandleOk(e) {
      this.tipConfirmLoading = true;
      setTimeout(() => {
        this.loadData(1);
        this.tipVisible = false;
        this.tipConfirmLoading = false;
      }, 300);
    },
    tipHandleCancel() {
      this.loadData(1);
      this.tipVisible = false;
    },
    getFormFieldValue(field) {
      return this.form.getFieldValue(field);
    },
    async handlePrint() {
      this.curRow.fileStatus = 1;
      setTimeout(() => {
        this.curRow.fileStatus = 0;
      }, 10000);
    },
    async handleSubmitWF() {
      //获取当前用户
      var userInfo = getStore("cur_user");
      //获取审核用户记录
      var wfUsers = this.wflowUsers;
      //获取知会用户记录
      var nfUsers = this.notifyUsers;
      //获取审批用户，审批用户为终审节点
      var approver = this.approveUser;
      //当前时间
      var ctime = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
      //审批用户不能为空
      if (deNull(approver) == "" && this.pageType == "workflowing") {
        this.tipVisible = true;
        this.tipContent = "请选择审批用户!";
        return false;
      }
      //如果审批用户含有多个，则不能提交
      if (approver.includes(",") && this.pageType == "workflowing") {
        this.tipVisible = true;
        this.tipContent = "审批用户只能选择一个!";
        return false;
      }
      //知会用户不能为空
      if (deNull(nfUsers) == "" && this.pageType == "notifying") {
        //显示提示信息
        this.tipVisible = true;
        this.tipContent = "请选择知会用户!";
        return false;
      }

      //获取此表单，关联的流程业务模块
      var tableName = queryUrlString("table_name");

      //自由流程节点
      var node = {
        id: randomChars(32),
        create_by: userInfo["username"],
        create_time: ctime,
        table_name: tableName,
        main_key: queryUrlString("id"),
        audit_node: deNull(wfUsers),
        approve_node: deNull(approver),
        notify_node: deNull(nfUsers)
      };

      //提交自由流程审批
      if (deNull(approver) != "" && this.pageType == "workflowing") {
        //将审批用户记录，知会用户记录，写入相应的自由流程表单中
        var result = await postProcessFreeNode(node);
        //获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
        var firstWflowUser =
          deNull(wfUsers) == ""
            ? deNull(approver)
            : deNull(wfUsers).split(",")[0];

        //提交审批相关处理信息
        var node = {
          id: randomChars(32), //获取随机数
          table_name: tableName, //业务表名
          main_value: queryUrlString("id"), //表主键值
          business_data_id: queryUrlString("id"), //业务具体数据主键值
          business_code: "000000000", //业务编号
          process_name: "自由流程审批", //流程名称
          employee: firstWflowUser,
          process_station: "自由流程审批",
          process_audit: "000000000",
          proponents: userInfo["username"],
          content: this.curRow["content"],
          operate_time: ctime,
          create_time: ctime,
          business_data: JSON.stringify(node)
        };

        //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
        let vflag = await queryApprovalExist(tableName, this.curRow["id"]);

        if (vflag) {
          //数据库中已经存在此记录，提示用户无法提交审批
          this.tipVisible = true;
          this.tipContent = "待审记录中，已经存在此记录，无法再次提交审批！";
          return false;
        } else {
          //第二步，根据流程业务模块，获取流程审批节点，如果含有加签，弹出弹框，选择一个加选审批人，如果没有，则直接下一步

          //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
          result = await postProcessLog(node);
          console.log(" 提交审批返回结果: " + JSON.stringify(result));

          //第三步，根据流程审批节点，向第一个节点推送一条审批信息

          //第四步，修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 （待提交	1	处理中	2	已完成	3	已作废	4）
          result = await patchTableData(tableName, this.curRow["id"], {
            bpm_status: "2"
          });
          //再次执行一次修改流程状态的操作，防止网络异常
          result = await patchTableData(tableName, this.curRow["id"], {
            bpm_status: "2"
          });

          //弹出审批完成提示框
          this.tipVisible = true;
          this.tipContent = "提交自由流程审批成功！";
          return true;
        }
      }

      //提交知会信息确认
      if (deNull(nfUsers) != "" && this.pageType == "notifying") {
        //检查此业务ID对应最近一个小时的知会信息，一个业务ID最多知会3次
        let loginfo = await queryPRLogInfTotal(queryUrlString("id"));

        //同一业务数据，每天最多知会3次
        if (deNull(loginfo) != "" && loginfo.today >= 3) {
          this.tipVisible = true;
          this.tipContent = "同一业务数据，每天最多知会3次！";
          return false;
        }

        if (deNull(loginfo) != "" && loginfo.total >= 10) {
          this.tipVisible = true;
          this.tipContent = "同一业务数据，总计最多知会10次！";
          return false;
        }

        //提交审批相关处理信息
        var pnode = {
          id: randomChars(32), //获取随机数
          table_name: tableName, //业务表名
          main_value: queryUrlString("id"), //表主键值
          business_data_id: queryUrlString("id"), //业务具体数据主键值
          business_code: "000000001", //业务编号
          process_name: "自由流程知会", //流程名称
          employee: deNull(nfUsers),
          process_station: "自由流程知会",
          process_audit: "000000001",
          operate_time: ctime,
          create_time: ctime,
          proponents: userInfo["username"],
          content: this.curRow["content"],
          business_data: JSON.stringify(this.curRow)
        };

        //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
        result = await postProcessLogInformed(pnode);

        //显示提示信息
        this.tipVisible = true;
        this.tipContent = "知会操作成功！";
        return true;
      }
    }
  }
};
</script>
<style scoped>
.abcdefg .ant-card-body {
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 1%;
  border: 0px solid black;
  min-width: 800px;
}
.explain {
  text-align: left;
  margin-left: 50px;
}
.explain .ant-input,
.sign .ant-input {
  font-weight: bolder;
  text-align: center;
  border-left-width: 0px !important;
  border-top-width: 0px !important;
  border-right-width: 0px !important;
}
.explain div {
  margin-bottom: 10px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.fileshow {
  display: block;
}
.filenone {
  display: none;
}
</style>