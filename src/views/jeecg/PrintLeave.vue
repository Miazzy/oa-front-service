<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'" ghost type="primary">打印</a-button>
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
          <a-col :span="24" style="margin-bottom:10px;">
            <span>申请人员:</span>
            <a-input style="width: 30%" readonly v-model="curRow.create_by" />
            <span style="margin-left: 12.5%">申请时间:</span>
            <a-input style="width: 30%" readonly v-model="curRow.create_time" />
          </a-col>
          <a-col :span="24" style="margin-bottom:10px;">
            <span>所属部门:</span>
            <a-input style="width: 30%" readonly v-model="depart.depart_name" />
            <span style="margin-left: 12.5%">请假类型:</span>
            <a-input style="width: 30%" readonly v-model="curRow.leave_type_name" />
          </a-col>
          <a-col :span="24" style="margin-bottom:10px;">
            <span>开始时间:</span>
            <a-input style="width: 30%" readonly v-model="curRow.starttime" />
            <span style="margin-left: 12.5%">结束时间:</span>
            <a-input style="width: 30%" readonly v-model="curRow.endtime" />
          </a-col>
          <a-col :span="24" style="margin-bottom:10px;">
            <span>请假天数:</span>
            <a-input style="width: 30%" readonly v-model="curRow.total_days" />
            <span style="margin-left: 12.5%">流程状态:</span>
            <a-input style="width: 30%" readonly v-model="curRow.bpm_status_name" />
          </a-col>
          <a-col :span="24"></a-col>
          <a-col :span="24" style="margin-top: 20px">
            <span style="float:left;display:block;">请假内容:</span>
            <div
              style="float:left; width:78%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.content"
            ></div>
          </a-col>
          <a-col :span="24" style="margin-top:30px;" v-if="curRow.bpm_status != 1">
            <div style="margin-bottom:20px;">审批流程</div>
            <template>
              <a-timeline>
                <div v-for="(item,index) in workflows" :key="index">
                  <a-timeline-item v-bind:color="item.color">{{item.content}}</a-timeline-item>
                </div>
              </a-timeline>
            </template>
          </a-col>
        </div>
      </a-col>
    </section>
  </a-card>
</template>
<script>
import ACol from 'ant-design-vue/es/grid/Col'
import ARow from 'ant-design-vue/es/grid/Row'
import {
  queryTableData,
  queryLeaveType,
  queryBpmStatus,
  queryWorkflows,
  queryFormName,
  watchFormLeave
} from '@/api/manage'
import _ from 'underscore'
import { setStore, getStore, clearStore, clearAll } from '@/utils/storage'
import { filterObj, formatDate, existChinese, deNull, queryUrlString } from '@/utils/util'
import ATextarea from 'ant-design-vue/es/input/TextArea'

export default {
  components: {
    ATextarea,
    ARow,
    ACol
  },
  name: 'Printgzsld',
  props: {
    reBizCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columns: [{}],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      formName: '流程申请单',
      curRow: {},
      depart: {},
      workflows: []
    }
  },
  async created() {
    let that = await watchFormLeave(this)
    this.curRow = that.curRow
    this.depart = that.depart
    this.workflows = that.workflows
  },
  mounted() {
    created()
  },
  watch: {
    async $route() {
      debugger
      let that = await watchFormLeave(this)
      this.curRow = that.curRow
      this.depart = that.depart
      this.workflows = that.workflows
    }
  },
  methods: {
    loadData() {},
    getDate() {}
  }
}
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