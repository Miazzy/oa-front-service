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
        style="display:none;"
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
            <span style="float:left;display:block;">{{tableInfo.no}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
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
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.file_name"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="typeof curRow.sigillum_name != 'undefined' && curRow.sigillum_name != null"
          >
            <span style="float:left;display:block;">{{tableInfo.sigillum_name}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.sigillum_name"
            ></div>
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span>{{tableInfo.create_by}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.create_by" />
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span style="margin-left: 0%">{{tableInfo.create_time}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.create_time" />
          </a-col>

          <a-col :span="12" style="margin-bottom:10px;">
            <span>{{tableInfo.depart_name}}:</span>
            <a-input style="width: 70%" readonly v-model="depart.depart_name" />
          </a-col>

          <a-col :span="12" style="margin-bottom:10px;">
            <span style="margin-left: 0%">{{curRow.formTypeName}}类型:</span>
            <a-input style="width: 70%" readonly v-model="curRow.leave_type_name" />
          </a-col>

          <a-col
            :span="24"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.employee_rank != 'undefined' && tableInfo.employee_rank != null"
          >
            <a-col :span="12">
              <span>{{tableInfo.employee_rank}}:</span>
              <a-input style="width: 70%" readonly v-model="curRow.employee_rank" />
            </a-col>
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.starttime != 'undefined' && tableInfo.starttime != null"
          >
            <span>{{tableInfo.starttime}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.starttime" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.endtime != 'undefined' && tableInfo.endtime != null"
          >
            <span style="margin-left: 0%">{{tableInfo.endtime}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.endtime" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.total_days != 'undefined' && tableInfo.total_days != null"
          >
            <span>{{tableInfo.total_days}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.total_days" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.seal_copies != 'undefined' && tableInfo.seal_copies != null"
          >
            <span>{{tableInfo.seal_copies}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.seal_copies" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.declare_type != 'undefined' && tableInfo.declare_type != null"
          >
            <span>{{tableInfo.declare_type}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.declare_type" />
          </a-col>

          <a-col :span="12" style="margin-bottom:10px;">
            <span style="margin-left: 0%">{{tableInfo.bpm_status}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.bpm_status_name" />
          </a-col>
          <a-col :span="24"></a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="typeof curRow.seal_name != 'undefined' && curRow.seal_name != null"
          >
            <span style="float:left;display:block;">{{tableInfo.seal_name}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.seal_name"
            ></div>
          </a-col>

          <a-col :span="24" style="margin-top: 20px;margin-bottom: 10px;">
            <span style="float:left;display:block;">{{tableInfo.content}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.content"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.entourage != 'undefined' && tableInfo.entourage != null"
          >
            <span style="float:left;display:block;">{{tableInfo.entourage}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.entourage"
            ></div>
          </a-col>

          <a-col
            :span="12"
            style="margin-top:10px;margin-bottom:10px;"
            v-if="typeof tableInfo.travel_address != 'undefined' && tableInfo.travel_address != null"
          >
            <span>{{tableInfo.travel_address}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.travel_address" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top:10px;margin-bottom:10px;"
            v-if="typeof tableInfo.predict_fee != 'undefined' && tableInfo.predict_fee != null"
          >
            <span>{{tableInfo.predict_fee}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.predict_fee" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.drive_type != 'undefined' && tableInfo.drive_type != null"
          >
            <span>{{tableInfo.drive_type}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.drive_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.predict_mileage != 'undefined' && tableInfo.predict_mileage != null"
          >
            <span>{{tableInfo.predict_mileage}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.predict_mileage" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.travel_transport != 'undefined' && tableInfo.travel_transport != null"
          >
            <span>{{tableInfo.travel_transport}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.travel_transport" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.travel_remarks != 'undefined' && tableInfo.travel_remarks != null"
          >
            <span style="float:left;display:block;">{{tableInfo.travel_remarks}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.travel_remarks"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 30px"
            v-if="typeof curRow.location != 'undefined' && curRow.location != null"
          >
            <span style="float:left;display:block;">{{curRow.formTypeName}}地址:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.location"
            ></div>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="curRow.main_table_status == true">
            <template>
              <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="false"></a-table>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="this.curRow != null && this.curRow.fileStatus != 1 && this.pageType != 'print' && this.curRow.fileType.includes('office')"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed></a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:2px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print'"
          >
            <template>
              <div
                :class="[this.curRow.fileStatus != 1 ? 'fileshow':'filenone']"
                v-if="this.curRow.fileType.includes('office')"
                style="width:100%;display:block;"
              >
                <iframe
                  v-print="'#printContent'"
                  class="no-print"
                  style="display:block;width:88%;align:left;height:720px;overflow-y:auto;overflow-x:hidden;border:1px solid #cecece;border-bottom:1px solid #cecece;"
                  :src="this.curRow.fileURL"
                />
              </div>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print' && this.curRow.fileType.includes('image')"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:2px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print'"
          >
            <template>
              <div
                :class="[this.curRow.fileStatus != 1 ? 'fileshow':'filenone']"
                v-if="this.curRow.fileType.includes('image')"
                style="margin-botton:0px;"
              >
                <div style="margin-bottom:10px;">图片附件</div>
                <vue-preview :slides="slides" @close="handleClose"></vue-preview>
              </div>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="(curRow.bpm_status != 1 || workflows.length > 0 )"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;margin-bottom:20px;"
            v-if="(curRow.bpm_status != 1 || workflows.length > 0 )"
          >
            <div style="margin-bottom:20px;">流程进度</div>
            <template>
              <a-steps style="width:80%;margin-bottom:10px;">
                <a-step status="finish" title="发起">
                  <a-icon type="user" slot="icon" style="color:skyblue;" />
                </a-step>
                <a-step status="finish" title="审核">
                  <a-icon type="solution" slot="icon" style="color:orange;" />
                </a-step>
                <a-step status="process" title="审批">
                  <a-icon type="audit" slot="icon" />
                </a-step>
                <a-step status="wait" title="知会">
                  <a-icon type="mail" slot="icon" style="color:pink;" />
                </a-step>
              </a-steps>
              <br />
            </template>
            <div style="width:98%;margin-top:10px;margin-bottom:10px;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="(curRow.bpm_status != 1 || workflows.length > 0 )"
          >
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
                      theme="twoTone"
                      twoToneColor="#eb2f2f"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'start'"
                      slot="dot"
                      type="tag"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#5599FF"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'cancel'"
                      slot="dot"
                      type="close-circle"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#ff0000"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'agree'"
                      slot="dot"
                      type="check-circle"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#52ce1a"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'message'"
                      slot="dot"
                      type="mail"
                      style="font-size: 16px;"
                      theme="twoTone"
                      :twoToneColor="item.color"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'over'"
                      slot="dot"
                      type="flag"
                      style="font-size: 16px;"
                      theme="twoTone"
                      :twoToneColor="item.color"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'sound'"
                      slot="dot"
                      type="sound"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="orange"
                      v-bind:color="item.color"
                    />
                    {{item.content}}
                  </a-timeline-item>
                </div>
              </a-timeline>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:30px;"
            v-if="pageType == 'workflowing' && curRow.bpm_status == 1"
          >
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
            <template>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  ghost
                  type="primary"
                  @click="handleSubmitWF"
                  v-if="pageType == 'workflowing' || pageType == 'notifying'"
                >提交</a-button>
              </div>
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
            <template>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  ghost
                  type="primary"
                  @click="handleSubmitWF"
                  v-if="pageType == 'workflowing' || pageType == 'notifying'"
                >提交</a-button>
              </div>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'workflow'">
            <template>
              <div style="width:88%;">
                <a-textarea
                  style="align:left;text-align:left;"
                  placeholder="请输入审批意见"
                  v-model="curRow.idea_content"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                />
              </div>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  type="primary"
                  style="margin-right:10px;margin-top:10px;background-color:#2090fe;border: 1px solid #fefefe;"
                  @click="handleApproveWF"
                >同意</a-button>
                <a-button
                  type="primary"
                  style="margin-right:10px;margin-top:10px;background-color:#fe5050;border: 1px solid #fefefe;"
                  @click="handleRejectWF"
                >驳回</a-button>
              </div>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'notify'">
            <template>
              <div style="width:88%;">
                <a-textarea
                  style="align:left;text-align:left;"
                  placeholder="请输入知会意见"
                  v-model="curRow.idea_content"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                />
              </div>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  type="primary"
                  style="margin-right:10px;margin-top:10px;background-color:#2090fe;border: 1px solid #fefefe;"
                  @click="handleConfirmWF"
                >确认</a-button>
              </div>
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
  queryRandomStr,
  colorProcessDetail,
  watchFormLeave,
  postProcessFreeNode,
  postProcessLogInformed,
  postProcessLog,
  postProcessLogHistory,
  patchTableData,
  deleteProcessLog,
  deleteProcessLogInf,
  queryPRLogInfTotal,
  queryApprovalExist,
  queryProcessLogByID,
  queryProcessLog,
  queryBusinessInfo,
  queryProcessNodeProcName,
  queryProcessNodeEmployee,
  queryProcessLogInfByID,
  queryWorkflowStatus
} from "@/api/manage";
import _ from "underscore";
import ATextarea from "ant-design-vue/es/input/TextArea";
import JSelectMultiUser from "@/components/jeecgbiz/JSelectMultiUser";
import { queryUrlString, deNull, formatDate } from "@/utils/util";
import { getStore } from "@/utils/storage";

//默认预览图片
const images = [];

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
      pageType: "view",
      tableName: "",
      wflowUsers: "",
      notifyUsers: "",
      approveUser: "",
      tableInfo: {},
      tipVisible: false,
      tipContent: "",
      slides: images,
      wflowstatus: {},
      form: this.$form.createForm(this)
    };
  },

  async created() {

  },

  async mounted() {
    //查询当前节点信息
    let that = await watchFormLeave(this);
    //获取返回结果
    let result = await colorProcessDetail(that, this);
    //返回结果
    return result;
  },

  watch: {
    async $route() {
      //查询当前节点信息
      let that = await watchFormLeave(this);
      //获取返回结果
      let result = await colorProcessDetail(that, this);
      //返回结果
      return result;
    }
  },
  methods: {
    async loadData() {
      //查询当前节点信息
      let that = await watchFormLeave(this);
      //获取返回结果
      let result = await colorProcessDetail(that, this);
      //返回结果
      return result;
    },
    getDate() {},
    tipHandleOk(e) {
      this.tipConfirmLoading = true;
      setTimeout(() => {
        this.loadData();
        this.tipVisible = false;
        this.tipConfirmLoading = false;
      }, 300);
    },
    tipHandleCancel() {
      this.loadData();
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

    /**
     * @function 同意审批
     */
    async handleApproveWF() {
      //设置this的别名
      var that = this;
      //返回结果
      var result;
      //获取当前用户
      var userInfo = getStore("cur_user");
      //获取当前时间
      var date = formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      var operation = operation || "同意";
      //审批意见
      var message = message || this.curRow.idea_content || "同意";

      //当前被选中记录数据
      var curRow = that.curRow;

      //流程日志编号
      var processLogID = queryUrlString("processLogID");

      //打印表单名称
      var tableName = curRow["table_name"] || queryUrlString("table_name");

      //获取当前审批节点的所有数据
      curRow = await queryProcessLogByID(tableName, processLogID);

      //未获取当前审批流程
      if (deNull(curRow) == "") {
        that.$message.warning(
          "未找到下一节点的流程信息，请刷新页面，查看是否已经审批完成！"
        );
        return false;
      }

      //业务代码ID
      var bussinessCodeID = curRow["business_data_id"];

      var processAudit = curRow["process_audit"];

      //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
      if (
        !(
          deNull(curRow["employee"]).includes(userInfo["username"]) ||
          deNull(curRow["employee"]).includes(userInfo["realname"])
        )
      ) {
        that.$message.warning(
          "您不在此审批流程记录的操作职员列中，无法进行审批操作！"
        );
        return false;
      }

      //获取关于此表单的所有当前审批日志信息
      let node = await queryProcessLog(tableName, bussinessCodeID);

      //遍历node,设置approve_user，action
      _.each(node, function(item) {
        //记录创建时间
        let ctime = item["create_time"];
        //设置审批人员
        item["approve_user"] = userInfo["username"];
        //设置操作类型
        item["action"] = operation;
        //设置操作时间
        item["operate_time"] = date;
        //设置操作意见
        item["action_opinion"] = message;
        //设置创建时间
        item["create_time"] = formatDate(ctime, "yyyy-MM-dd hh:mm:ss");
      });

      //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
      result = await postProcessLogHistory(node);

      //删除当前审批节点中的所有记录
      result = await deleteProcessLog(tableName, node);

      //第一步，获取此表单，关联的流程业务模块；查询SQL , 获取流程权责中关联业务含有tableName的流程权责
      let rights = await queryBusinessInfo(tableName);

      //选定流程权责
      that.fixedWFlow = rights[0];
      //设置当前流程审批权责
      that.rights = rights;

      //如果流程权责有多个，那么弹出选择框，让用户自己选择一个流程
      if (rights.length > 1 && curRow.business_code != "000000000") {
        that.modelModal = true;
      } else if (rights.length <= 0 && curRow.business_code != "000000000") {
        that.tipVisible = true;
        that.tipContent = "未获取到此业务的流程权责，无法同意审批！";
        return false;
      } else {
        //所有待审核节点
        var allAudit = "";
        //所有待知会节点
        var allNotify = "";
        //当前审核节点
        var curAuditor = processAudit;
        //知会节点数组
        var notifyArray = deNull(allNotify) == "" ? "" : allNotify.split(",");

        //如果不是自由流程，则从权责配置中获取待审核人列表，否则，使用自由流程配置的审核人员列表
        if (curRow.business_code != "000000000") {
          try {
            //根据权责配置，获取所有待审核人员列表
            allAudit =
              "," +
              that.fixedWFlow["audit"] +
              "," +
              that.fixedWFlow["approve"] +
              ",";
            //根据权责配置，获取所有待知会人员列表
            allNotify = that.fixedWFlow["notify"];
          } catch (error) {
            that.tipVisible = true;
            that.tipContent = "固化流程设置节点失败，无法进行审批操作！";
            console.log("固化流程设置节点失败 :" + error);
            return false;
          }
        } else {
          try {
            //自由流程配置消息
            let freeNode = JSON.parse(curRow.business_data);

            //检查是否存在自由流程节点audit_node & approve_node & notify_node , 如果不存在，在下级节点中寻找
            if (
              !("audit_node" in freeNode) &&
              !("approve_node" in freeNode) &&
              !("notify_node" in freeNode)
            ) {
              freeNode = JSON.parse(freeNode.business_data);
            }

            //如果仍然为获取到自由流程节点，则从自由流程表中找

            //根据自由流程配置，获取所有待审核人员列表
            allAudit =
              "," +
              deNull(freeNode.audit_node) +
              "," +
              deNull(freeNode.approve_node) +
              ",";

            //根据自由流程配置，获取所有待知会人员列表
            notifyArray =
              deNull(freeNode.notify_node) == "" ? [] : [freeNode.notify_node];

            //获取自由流程配置，当前审核节点
            curAuditor = curRow["employee"];
          } catch (error) {
            that.tipVisible = true;
            that.tipContent = "自由流程设置节点失败，无法进行审批操作！";
            console.log("自由流程设置节点失败 :" + error);
            return false;
          }
        }

        //当前审核分割组，第一组是已经审核通过的，第二组是待审核的
        var auditArray = allAudit.split("," + curAuditor + ",");
        //如果存在审核人
        var firstAuditor = auditArray[1];

        //如果待审核节点为空，则表示已经审批通过
        if (firstAuditor == "") {
          //检测当前审批节点是否为最后一个节点，如果是最后一个节点，则将审批状态修改为已通过:3，修改当前审批状态为待处理
          result = await patchTableData(tableName, curRow["business_data_id"], {
            bpm_status: "3"
          });

          //执行知会流程，添加多条知会记录。将知会节点的所有待知会节点，拆分成为数组，遍历数组，数组中每个元素，推送一条知会记录，注意forEach不能使用await
          for (let item of notifyArray) {
            //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
            var employee = await queryProcessNodeEmployee(item);
            //流程岗位
            var process_station = await queryProcessNodeProcName(item);
            //审批相关流程节点
            var pnode = {};

            if (curRow.business_code != "000000000") {
              //提交审批相关处理信息
              pnode = {
                id: queryRandomStr(32), //获取随机数
                table_name: tableName, //业务表名
                main_value: curRow["main_value"], //表主键值
                business_data_id: curRow["business_data_id"], //业务具体数据主键值
                business_code: that.fixedWFlow["id"], //业务编号
                process_name: that.fixedWFlow["items"], //流程名称
                employee: employee[0]["employee"],
                process_station: process_station[0]["item_text"],
                process_audit: item,
                operate_time: date,
                create_time: date,
                proponents: curRow["proponents"],
                content: curRow["content"],
                business_data: JSON.stringify(curRow)
              };
            } else {
              //提交审批相关处理信息
              pnode = {
                id: queryRandomStr(32), //获取随机数
                table_name: tableName, //业务表名
                main_value: curRow["business_data_id"], //表主键值
                business_data_id: curRow["business_data_id"], //业务具体数据主键值
                business_code: "000000001", //业务编号
                process_name: "自由流程知会", //流程名称
                employee: item,
                process_station: "自由流程知会",
                process_audit: "000000001",
                proponents: curRow["proponents"],
                content: curRow["content"],
                operate_time: date,
                create_time: date,
                business_data: curRow.business_data
              };
            }

            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await postProcessLogInformed(pnode);
          }

          //当前已经是最后一个审批节点，流程已经处理完毕
          that.tipContent = "同意审批成功，审批流程处理完毕！";

          //TODO 以前此表单的自由流程进入历史

          //TODO 删除以前此表单对应的自由流程
        } else {
          //修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 （待提交	1	处理中	2	已完成	3	已作废	4）
          result = await patchTableData(tableName, curRow["business_data_id"], {
            bpm_status: "2"
          });
          //如果firstAuditor是逗号开头，则去掉开头的逗号
          firstAuditor =
            firstAuditor.indexOf(",") == 0
              ? firstAuditor.substring(1)
              : firstAuditor;
          //获取下一审核节点
          firstAuditor = firstAuditor.split(",")[0];
          //审批相关处理信息
          pnode = {};

          if (curRow.business_code != "000000000") {
            //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
            employee = await queryProcessNodeEmployee(firstAuditor);
            //流程岗位
            process_station = await queryProcessNodeProcName(firstAuditor);
            //提交审批相关处理信息
            pnode = {
              id: queryRandomStr(32), //获取随机数
              table_name: tableName, //业务表名
              main_value: curRow["main_value"], //表主键值
              business_data_id: curRow["business_data_id"], //业务具体数据主键值
              business_code: that.fixedWFlow["id"], //业务编号
              process_name: that.fixedWFlow["items"], //流程名称
              employee: employee[0]["employee"],
              process_station: process_station[0]["item_text"],
              process_audit: firstAuditor,
              proponents: curRow["proponents"],
              content: curRow["content"],
              create_time: date,
              business_data: curRow.business_data
            };
          } else {
            //提交审批相关处理信息
            pnode = {
              id: queryRandomStr(32), //获取随机数
              table_name: tableName, //业务表名
              main_value: curRow["business_data_id"], //表主键值
              business_data_id: curRow["business_data_id"], //业务具体数据主键值
              business_code: "000000000", //业务编号
              process_name: "自由流程审批", //流程名称
              employee: firstAuditor,
              process_station: "自由流程审批",
              process_audit: "000000000",
              proponents: curRow["proponents"],
              content: curRow["content"],
              operate_time: date,
              create_time: date,
              business_data: curRow.business_data
            };
          }

          //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
          let vflag = await queryApprovalExist(
            tableName,
            curRow["business_data_id"]
          );

          if (vflag) {
            //数据库中已经存在此记录，提示用户无法提交审批
            that.tipContent =
              "处理异常，请稍后重试；如果多次处理异常，可能需要撤销当前审批，重新发起审批流程！";
          } else {
            //根据流程业务模块，获取流程审批节点，如果含有加签，弹出弹框，选择一个加选审批人，如果没有，则直接下一步

            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await postProcessLog(pnode);

            //第三步，根据流程审批节点，向第一个节点推送一条审批信息；根据流程审批节点，找到当前审批节点，修改节点审批状态为审批通过，增加审批意见
            console.log(
              " 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result)
            );

            //提示信息
            that.tipContent = "同意审批成功，审批流程已推向后续处理人！";
          }
        }

        //提示用户撤销审批操作成功
        that.tipVisible = true;
      }

      console.log("同意审批成功！");

      //刷新页面数据
      this.loadData();

      //设置为view预览模式
      this.pageType = "view";

      //同意审批成功
      return true;
    },

    /**
     * @function 驳回审批
     */
    async handleRejectWF() {
      //设置this的别名
      let that = this;
      //返回结果
      let result;
      //获取当前用户
      let userInfo = getStore("cur_user");
      //获取当前时间
      let date = formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      let operation = operation || "驳回";
      //审批意见
      let message = message || that.curRow.idea_content || "驳回";

      //当前被选中记录数据
      let curRow = that.curRow;

      //流程日志编号
      var processLogID = queryUrlString("processLogID");

      //打印表单名称
      let tableName = curRow["table_name"] || queryUrlString("table_name");

      //获取当前审批节点的所有数据
      curRow = await queryProcessLogByID(tableName, processLogID);

      //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
      if (
        !(
          deNull(curRow["employee"]).includes(userInfo["username"]) ||
          deNull(curRow["employee"]).includes(userInfo["realname"])
        )
      ) {
        that.$message.warning(
          "您不在此审批流程记录的操作职员列中，无法进行驳回操作！"
        );
        return false;
      }

      //获取当前审批节点的所有数据
      curRow = await queryProcessLogByID(tableName, curRow["id"]);

      //获取关于此表单的所有当前审批日志信息
      let node = await queryProcessLog(tableName, curRow["business_data_id"]);

      //遍历node,设置approve_user，action
      _.each(node, function(item) {
        //获取创建时间
        let ctime = item["create_time"];
        //设置审批人员
        item["approve_user"] = userInfo["username"];
        //设置操作动作
        item["action"] = operation;
        //设置操作时间
        item["operate_time"] = date;
        //设置操作意见
        item["action_opinion"] = message;
        //设置创建时间
        item["create_time"] = formatDate(ctime, "yyyy-MM-dd hh:mm:ss");
      });

      //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
      result = await postProcessLogHistory(node);

      //删除当前审批节点中的所有记录
      result = await deleteProcessLog(tableName, node);

      //修改当前审批状态为待处理
      result = await patchTableData(tableName, curRow["business_data_id"], {
        bpm_status: "1"
      });
      //再次执行修改流程状态的操作，防止网络异常
      result = await patchTableData(tableName, curRow["business_data_id"], {
        bpm_status: "1"
      });

      //TODO 以前此表单的自由流程进入历史

      //TODO 删除以前此表单对应的自由流程

      //提示用户撤销审批操作成功
      that.tipVisible = true;
      that.tipContent = "驳回审批成功！";

      //打印驳回审批处理日志
      console.log("驳回审批成功");

      //设置为view预览模式
      this.pageType = "view";

      //刷新页面数据
      this.loadData();

      //返回操作结果
      return result;
    },

    /**
     * @function 知会确认
     */
    async handleConfirmWF() {
      //设置this的别名
      var that = this;
      //返回结果
      var result;
      //获取当前用户
      var userInfo = getStore("cur_user");
      //获取当前时间
      var date = formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      var operation = operation || "知会";
      //审批意见
      var message = message || that.curRow.idea_content || "知会确认";

      //当前被选中记录数据
      var curRow = that.curRow;

      //流程日志编号
      var processLogID = queryUrlString("processLogID");

      //打印表单名称
      var tableName = curRow["table_name"] || queryUrlString("table_name");

      //获取当前审批节点的所有数据
      curRow = await queryProcessLogInfByID(tableName, processLogID);

      //设置本次知会确认创建时间
      curRow["create_time"] = date;

      //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
      if (
        deNull(curRow["approve_user"]).length >=
        deNull(curRow["employee"]).length
      ) {
        //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
        result = await postProcessLogHistory(curRow);
        //删除当前审批节点中的所有记录
        result = await deleteProcessLogInf(tableName, [curRow]);
        that.tipVisible = true;
        that.tipContent = "知会确认成功！";
        return true;
      }

      var employeeList = "," + deNull(curRow["employee"]) + ",";
      var appoveUserList = "," + deNull(curRow["approve_user"]) + ",";

      //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
      if (
        !(
          deNull(employeeList).includes("," + userInfo["username"] + ",") ||
          deNull(employeeList).includes("," + userInfo["realname"] + ",")
        )
      ) {
        that.$message.warning(
          "您不在此知会记录的操作职员列中，无法进行确认操作！"
        );
        return false;
      }

      //已经知会确认过的用户，无法再次知会
      if (
        deNull(appoveUserList).includes("," + userInfo["username"] + ",") ||
        deNull(appoveUserList).includes("," + userInfo["realname"] + ",")
      ) {
        that.$message.warning("您已经在此知会记录中，执行过确认操作了！");
        return false;
      }

      //设置知会确认人员
      curRow["approve_user"] =
        deNull(curRow["approve_user"]) +
        (deNull(curRow["approve_user"]) == "" ? "" : ",") +
        userInfo["username"];
      //设置操作内容
      curRow["action"] = operation;
      //设置操作时间
      curRow["operate_time"] = date;
      //设置操作意见
      curRow["action_opinion"] =
        deNull(curRow["action_opinion"]) +
        (deNull(curRow["action_opinion"]) == "" ? "" : "\n\r") +
        `${userInfo["username"]}:${message}`;

      //保存当前数据到数据库中
      await patchTableData("PR_LOG_INFORMED", curRow["id"], curRow);

      //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
      if (curRow["approve_user"].length >= curRow["employee"].length) {
        //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
        result = await postProcessLogHistory(curRow);
        //删除当前审批节点中的所有记录
        result = await deleteProcessLogInf(tableName, [curRow]);

        //TODO 以前此表单的自由流程进入历史

        //TODO 删除以前此表单对应的自由流程
      }

      that.tipVisible = true;
      that.tipContent = "知会确认成功！";

      //设置为view预览模式
      this.pageType = "view";

      //刷新页面数据
      this.loadData();

      //返回结果
      return result;
    },

    /**
     * @function 提交自由流程
     */
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
        this.$confirm_({
          title: "温馨提示",
          content: "请选择审批用户!"
        });
        return false;
      }
      //如果审批用户含有多个，则不能提交
      if (deNull(approver).includes(",") && this.pageType == "workflowing") {
        this.$confirm_({
          title: "温馨提示",
          content: "审批用户只能选择一个!"
        });
        return false;
      }
      //知会用户不能为空
      if (deNull(nfUsers) == "" && this.pageType == "notifying") {
        //显示提示信息
        this.$confirm_({
          title: "温馨提示",
          content: "请选择知会用户!"
        });
        return false;
      }

      //获取此表单，关联的流程业务模块
      var tableName = queryUrlString("table_name");

      //自由流程节点
      var node = {
        id: queryRandomStr(32),
        create_by: userInfo["username"],
        create_time: ctime,
        table_name: tableName,
        main_key: queryUrlString("id"),
        audit_node: deNull(wfUsers),
        approve_node: deNull(approver),
        notify_node: deNull(nfUsers)
      };

      //TODO 以前此表单的自由流程进入历史

      //TODO 删除以前此表单对应的自由流程

      //提交自由流程审批
      if (deNull(approver) != "" && this.pageType == "workflowing") {
        //将审批用户记录，知会用户记录，写入相应的自由流程表单中
        var result = await postProcessFreeNode(node);

        const freeWFNode = JSON.parse(JSON.stringify(node));

        //提交发起人审批相关处理信息
        node = {
          id: queryRandomStr(32), //获取随机数
          table_name: tableName, //业务表名
          main_value: queryUrlString("id"), //表主键值
          business_data_id: queryUrlString("id"), //业务具体数据主键值
          business_code: "000000000", //业务编号
          process_name: "自由流程审批", //流程名称
          employee: userInfo["username"],
          process_station: "自由流程审批",
          process_audit: "000000000",
          proponents: userInfo["username"],
          approve_user: userInfo["username"],
          action: "发起",
          action_opinion: "发起自由流程",
          content: this.curRow["content"],
          operate_time: ctime,
          create_time: ctime,
          business_data: JSON.stringify(freeWFNode)
        };

        //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
        result = await postProcessLogHistory(node);

        //获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
        var firstWflowUser =
          deNull(wfUsers) == ""
            ? deNull(approver)
            : deNull(wfUsers).split(",")[0];

        //提交审批相关处理信息
        node = {
          id: queryRandomStr(32), //获取随机数
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
          this.$confirm_({
            title: "温馨提示",
            content: "待审记录中，已经存在此记录，无法再次提交审批！"
          });

          //刷新页面数据
          this.loadData();

          //操作完毕，返回结果
          return true;
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

          //弹出审批完成提示框s
          this.$confirm("提交自由流程审批成功！", "操作成功", {
            type: "success"
          });

          //设置为view预览模式
          this.pageType = "view";

          //刷新页面数据
          this.loadData();

          //操作完毕，返回结果
          return true;
        }
      }

      //提交知会信息确认
      if (deNull(nfUsers) != "" && this.pageType == "notifying") {
        //检查此业务ID对应最近一个小时的知会信息，一个业务ID最多知会3次
        let loginfo = await queryPRLogInfTotal(queryUrlString("id"));

        //同一业务数据，每天最多知会3次
        if (deNull(loginfo) != "" && loginfo.today >= 3) {
          this.$confirm_({
            title: "温馨提示",
            content: "同一业务数据，每天最多知会3次！"
          });
          return true;
        }

        if (deNull(loginfo) != "" && loginfo.total >= 10) {
          this.$confirm_({
            title: "温馨提示",
            content: "同一业务数据，总计最多知会10次！"
          });
          return true;
        }

        //提交审批相关处理信息
        var pnode = {
          id: queryRandomStr(32), //获取随机数
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
        this.$confirm("知会操作成功！", "操作成功", { type: "success" });

        //设置为view预览模式
        this.pageType = "view";

        //刷新页面数据
        this.loadData();

        //返回操作结果
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
figure {
  float: left;
  margin-right: 10px;
}
.pswp__caption__center {
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  font-size: 13px;
  padding: 10px;
  line-height: 20px;
  color: #ccc;
}
</style>