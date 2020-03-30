<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="7" :sm="7">
            <a-form-item label="事项">
              <a-select style="width: 100%;" v-model="queryParam.type">
                <a-select-option value="审批">审批</a-select-option>
                <a-select-option value="知会">知会</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="7">
            <a-form-item label="业务">
              <a-select style="width: 100%;" v-model="queryParam.name">
                <a-select-option v-for="item in tableNameList" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="7">
            <a-form-item label="主题">
              <a-input placeholder="请输入主题信息" v-model="queryParam.topic"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="7">
            <a-form-item label="时间">
              <a-range-picker v-model="queryParam.time" />
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="7">
            <a-form-item label="流程发起人">
              <a-input placeholder="请输入流程发起人" v-model="queryParam.startman"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="7" :sm="7">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button
                type="primary"
                @click="searchQuery"
                icon="search"
                style="margin-left: 0px;float:left;"
              >查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px;float:left;"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!--我的已办-->
    <a-col :md="24" :sm="24">
      <template>
        <div style="top:50px;">
          <a-spin :spinning="spinning" style="top:50px;">
            <div class="spin-content"></div>
          </a-spin>
        </div>
        <a-table
          :columns="columns"
          :dataSource="dataDoneList"
          :pagination="true"
          :scroll="{ x: 4000, y: 800 }"
          style="padding-top:-10px;margin-top:-10px"
        ></a-table>
      </template>
    </a-col>
  </a-card>
  <!--</page-layout>-->
</template>
<script>
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import ATextarea from "ant-design-vue/es/input/TextArea";
import * as manageAPI from "@/api/manage";
import * as storage from "@/utils/storage";
import * as $ from "jquery";
import * as tools from "@/utils/util";
import * as moment from "moment";

const columns = [
  {
    title: "姓名",
    width: 100,
    align: "center",
    key: "name",
    dataIndex: "name",
    slots: { title: "name" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "性别",
    width: 100,
    align: "center",
    key: "sex",
    dataIndex: "sex",
    slots: { title: "sex" },
    scopedSlots: { customRender: "sex" }
  },
  {
    title: "人员性质",
    width: 100,
    align: "center",
    key: "employee_feature",
    dataIndex: "employee_feature",
    slots: { title: "employee_feature" },
    scopedSlots: { customRender: "employee_feature" }
  },
  {
    title: "单位名称",
    width: 100,
    align: "center",
    key: "company_name",
    dataIndex: "company_name",
    slots: { title: "company_name" },
    scopedSlots: { customRender: "company_name" }
  },
  {
    title: "所属中心",
    width: 100,
    align: "center",
    key: "center_name",
    dataIndex: "center_name",
    slots: { title: "center_name" },
    scopedSlots: { customRender: "center_name" }
  },
  {
    title: "部门名称",
    width: 100,
    align: "center",
    key: "depart_name",
    dataIndex: "depart_name",
    slots: { title: "depart_name" },
    scopedSlots: { customRender: "depart_name" }
  },
  {
    title: "岗位名称",
    width: 100,
    align: "center",
    key: "job_name",
    dataIndex: "job_name",
    slots: { title: "job_name" },
    scopedSlots: { customRender: "job_name" }
  },
  {
    title: "职级",
    width: 100,
    align: "center",
    key: "job_level",
    dataIndex: "job_level",
    slots: { title: "job_level" },
    scopedSlots: { customRender: "job_level" }
  },
  {
    title: "入职时间",
    width: 100,
    align: "center",
    key: "join_time",
    dataIndex: "join_time",
    slots: { title: "join_time" },
    scopedSlots: { customRender: "join_time" }
  },
  {
    title: "劳动合同期限",
    width: 100,
    align: "center",
    key: "contract_time",
    dataIndex: "contract_time",
    slots: { title: "contract_time" },
    scopedSlots: { customRender: "contract_time" }
  },
  {
    title: "公司司龄",
    width: 100,
    align: "center",
    key: "work_year",
    dataIndex: "work_year",
    slots: { title: "work_year" },
    scopedSlots: { customRender: "work_year" }
  },
  {
    title: "银行账号",
    width: 100,
    align: "center",
    key: "bank_no",
    dataIndex: "bank_no",
    slots: { title: "bank_no" },
    scopedSlots: { customRender: "bank_no" }
  },
  {
    title: "开户行",
    width: 100,
    align: "center",
    key: "bank_name",
    dataIndex: "bank_name",
    slots: { title: "bank_name" },
    scopedSlots: { customRender: "bank_name" }
  },
  {
    title: "试用期",
    width: 100,
    align: "center",
    key: "probation_status",
    dataIndex: "probation_status",
    slots: { title: "probation_status" },
    scopedSlots: { customRender: "probation_status" }
  },
  {
    title: "转正日期",
    width: 100,
    align: "center",
    key: "confirm_date",
    dataIndex: "confirm_date",
    slots: { title: "confirm_date" },
    scopedSlots: { customRender: "confirm_date" }
  },
  {
    title: "在职状态",
    width: 100,
    align: "center",
    key: "work_status",
    dataIndex: "work_status",
    slots: { title: "work_status" },
    scopedSlots: { customRender: "work_status" }
  },
  {
    title: "离职时间",
    width: 100,
    align: "center",
    key: "off_time",
    dataIndex: "off_time",
    slots: { title: "off_time" },
    scopedSlots: { customRender: "off_time" }
  },
  {
    title: "病产孕",
    width: 100,
    align: "center",
    key: "pregnancy",
    dataIndex: "pregnancy",
    slots: { title: "pregnancy" },
    scopedSlots: { customRender: "pregnancy" }
  },
  {
    title: "病产孕时间",
    width: 100,
    align: "center",
    key: "pregnancy_time",
    dataIndex: "pregnancy_time",
    slots: { title: "pregnancy_time" },
    scopedSlots: { customRender: "pregnancy_time" }
  },
  {
    title: "证件号",
    width: 100,
    align: "center",
    key: "id_card",
    dataIndex: "id_card",
    slots: { title: "id_card" },
    scopedSlots: { customRender: "id_card" }
  },
  {
    title: "通讯号码",
    width: 100,
    align: "center",
    key: "phone",
    dataIndex: "phone",
    slots: { title: "phone" },
    scopedSlots: { customRender: "phone" }
  },
  {
    title: "工资卡开户行",
    width: 100,
    align: "center",
    key: "salary_bank_name",
    dataIndex: "salary_bank_name",
    slots: { title: "salary_bank_name" },
    scopedSlots: { customRender: "salary_bank_name" }
  },
  {
    title: "工资卡卡号",
    width: 100,
    align: "center",
    key: "salary_bank_no",
    dataIndex: "salary_bank_no",
    slots: { title: "salary_bank_no" },
    scopedSlots: { customRender: "salary_bank_no" }
  },
  {
    title: "离职办理状态",
    width: 100,
    align: "center",
    key: "off_work_status",
    dataIndex: "off_work_status",
    slots: { title: "off_work_status" },
    scopedSlots: { customRender: "off_work_status" }
  },
  {
    title: "工资归属单位",
    width: 100,
    align: "center",
    key: "wages_team",
    dataIndex: "wages_team",
    slots: { title: "wages_team" },
    scopedSlots: { customRender: "wages_team" }
  },
  {
    title: "工资主体单位",
    width: 100,
    align: "center",
    key: "wages_main_unit",
    dataIndex: "wages_main_unit",
    slots: { title: "wages_main_unit" },
    scopedSlots: { customRender: "wages_main_unit" }
  },
  {
    title: "编制状态",
    width: 100,
    align: "center",
    key: "compilation_status",
    dataIndex: "compilation_status",
    slots: { title: "compilation_status" },
    scopedSlots: { customRender: "compilation_status" }
  }
];

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
      columns: columns,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
      url: {
        loadApplicant: "/sps/register/loadApplicants",
        loadRegisterFiles: "/sps/register/getRegisterFilesConfig"
      },
      activeKey: 2,
      dataWaitList: [],
      dataDoneList: [],
      tableNameList: [],
      queryParam: {},
      spinning: false
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      debugger;
      //获取用户信息
      var userInfo = storage.getStore("cur_user");

      //查询表单信息
      var tableNameList = await manageAPI.queryTableAll("v_table_name");

      //设置表单信息
      this.tableNameList = tableNameList;

      setTimeout(() => {
        //$(".ant-tag").css("margin-top", "5px");
      }, 100);

      //设置高级查询条件
      this.queryParam = storage.getStore(
        `system_done_list_user@${userInfo.username}`
      );

      //如果没有获取到查询条件，则查询所有数据，如果获取到查询条件，则查询筛选数据
      if (
        this.queryParam == "" ||
        this.queryParam == null ||
        JSON.stringify(this.queryParam) == "{}" ||
        JSON.stringify(this.queryParam) == `{"startman":""}`
      ) {
        this.queryParam = {};
        await this.getDate();
      } else {
        //设置时间
        if (this.queryParam.time.length > 0) {
          this.queryParam.time[0] = tools.formatDate(
            this.queryParam.time[0],
            "yyyy-MM-dd"
          );
          this.queryParam.time[1] = tools.formatDate(
            this.queryParam.time[1],
            "yyyy-MM-dd"
          );

          this.queryParam.time = [
            moment(this.queryParam.time[0], "YYYY-MM-DD"),
            moment(this.queryParam.time[1], "YYYY-MM-DD")
          ];
        }

        await this.searchQuery();
      }

      console.log("table name list :" + JSON.stringify(tableNameList));
    },
    async getDate() {
      //查询我的已办，我的待办
      if (this.activeKey == 1 || this.activeKey == 2) {
        //获取用户信息
        var userInfo = storage.getStore("cur_user");
        let username = userInfo["username"];
        let realname = userInfo["realname"];
        if (this.activeKey == 1) {
          //获取我的待办数据
          this.dataWaitList = await manageAPI.queryProcessLogWaitAll(
            username,
            realname
          );
        } else if (this.activeKey == 2) {
          //获取我的已办数据
          this.dataDoneList = await manageAPI.queryProcessLogDoneAll(
            username,
            realname
          );
        }
      }
    },
    async handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    async handleChange({ fileList }) {
      this.fileList = fileList;
    },
    /**
     * @function 查看详情页面
     */
    async handleDetailWF(record) {
      //获取当前操作对象
      var curRow = JSON.parse(JSON.stringify(record));

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //获取选中记录的所属表单名称
      var tableName = curRow["tname"];

      //获取操作类型
      var type = curRow["type"] == "知会" ? "notify" : "workflow";

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&processLogID=${curRow.pid}&user=${userInfo.username}&type=${type}`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },
    /**
     * @function 查询函数
     */
    async searchQuery() {
      //获取用户信息
      var userInfo = storage.getStore("cur_user");
      let username = userInfo["username"];

      //获取我的待办数据
      this.dataDoneList = await manageAPI.queryProcessLogDoneByParamAll(
        username,
        this.queryParam
      );

      //缓存本次查询条件，下次打开此页面，可以还原查询条件
      storage.setStore(
        `system_done_list_user@${userInfo.username}`,
        JSON.stringify(this.queryParam),
        3600
      );

      //打印日志信息
      console.log("dataDoneList :" + JSON.stringify(this.dataDoneList));
    },
    /**
     * @function 重置函数
     */
    async searchReset() {
      this.queryParam = {};
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
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.ant-tag {
  margin-bottom: 5px;
}
.ant-tag-geekblue {
  margin-bottom: 5px;
}
</style>