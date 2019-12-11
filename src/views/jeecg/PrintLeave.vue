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
                    />
                    {{item.content}}
                  </a-timeline-item>
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
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import { watchFormLeave } from "@/api/manage";
import ATextarea from "ant-design-vue/es/input/TextArea";

export default {
  components: {
    ATextarea,
    ARow,
    ACol
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
      workflows: []
    };
  },
  async created() {
    let that = await watchFormLeave(this);
    this.curRow = that.curRow;
    this.depart = that.depart;
    this.workflows = that.workflows;
    this.columns = that.curRow.sub_columns;
    this.data = that.curRow.sub_data;
    //this.fileinfo = that.curRow.name;
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
      //this.fileinfo = that.curRow.name;
    }
  },
  methods: {
    loadData() {},
    getDate() {}
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