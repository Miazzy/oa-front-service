<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'" ghost type="primary" v-if="pageType == 'view'">打印</a-button>
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
        </div>
      </a-col>
    </section>
  </a-card>
</template>
       

       
<script>
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import { watchFormLeave, postTableData, randomChars } from "@/api/manage";
import ATextarea from "ant-design-vue/es/input/TextArea";
import JSelectMultiUser from "@/components/jeecgbiz/JSelectMultiUser";
import { queryUrlString, deNull } from "@/utils/util";
import { setStore, getStore } from "@/utils/storage";

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
    }
  },
  methods: {
    loadData() {},
    getDate() {},
    getFormFieldValue(field) {
      return this.form.getFieldValue(field);
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

      //审批用户不能为空
      if (deNull(approver) == "" && pageType == "workflowing") {
        this.$message.warning("请选择审批用户!");
        return false;
      }
      //如果审批用户含有多个，则不能提交
      if (approver.includes(",") && pageType == "workflowing") {
        this.$message.warning("审批用户只能选择一个");
        return false;
      }

      //获取此表单，关联的流程业务模块
      var tableInfo = await queryTableName();

      //自由流程节点
      var node = {
        id: randomChars(32),
        create_by: userInfo["username"],
        create_time: new Date(),
        table_name: tableInfo["table_name"],
        main_key: queryUrlString("id"),
        audit_node: deNull(wfUsers),
        approve_node: deNull(approver),
        notify_node: deNull(nfUsers)
      };

      //将审批用户记录，知会用户记录，写入相应的自由流程表单中
      var result = postTableData("BS_FREE_PROCESS", node);

      //提交自由流程审批
      if (deNull(approver) != "" && pageType == "workflowing") {
      }

      //提交知会信息确认
      if (deNull(nfUsers) != "" && pageType == "notifying") {
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
          proponents: userInfo["username"],
          content: this.curRow["content"],
          business_data: JSON.stringify(this.curRow)
        };

        //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
        result = await postProcessLogInformed(pnode);
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
</style>