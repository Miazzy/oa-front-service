<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="7" :sm="7">
            <a-form-item label="发放期间">
              <a-range-picker v-model="queryParam.time" />
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

    <!--我的工资表单-->
    <a-col :md="24" :sm="24">
      <template>
        <div style="top:50px;">
          <a-spin :spinning="spinning" style="top:50px;">
            <div class="spin-content"></div>
          </a-spin>
        </div>
        <div>
          <a-table
            :columns="columns"
            :dataSource="wageList"
            :pagination="true"
            :scroll="{ x: 16000, y: 800 }"
          >
            <a slot="type" slot-scope="text, record">
              <a-menu-item>
                <a :data-info="JSON.stringify(record)" @click="handleDetailWG(record)">
                  <span v-html="record.name"></span>
                </a>
              </a-menu-item>
            </a>
          </a-table>
        </div>
      </template>
    </a-col>
  </a-card>
</template>
<script>
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import ATextarea from "ant-design-vue/es/input/TextArea";
import * as manageAPI from "@/api/manage";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";
import * as moment from "moment";

const columns = [
  {
    title: "姓名",
    width: 150,
    align: "center",
    key: "name",
    dataIndex: "name",
    slots: { title: "name" }
  },
  {
    title: "发放期间",
    width: 200,
    align: "center",
    key: "wages_date",
    dataIndex: "wages_date",
    slots: { title: "wages_date" }
  },
  {
    title: "入职时间",
    width: 200,
    align: "center",
    key: "join_time",
    dataIndex: "join_time",
    slots: { title: "join_time" }
  },
  {
    title: "身份证号",
    width: 300,
    align: "center",
    key: "id_card",
    dataIndex: "id_card",
    slots: { title: "id_card" }
  },
  {
    title: "应出勤天数",
    width: 200,
    align: "center",
    key: "work_date",
    dataIndex: "work_date",
    slots: { title: "work_date" }
  },
  {
    title: "计薪天数",
    width: 200,
    align: "center",
    key: "salary_date",
    dataIndex: "salary_date",
    slots: { title: "salary_date" },
    scopedSlots: { customRender: "salary_date" }
  },
  {
    title: "岗位层级",
    width: 200,
    align: "center",
    key: "job_level",
    dataIndex: "job_level",
    slots: { title: "job_level" },
    scopedSlots: { customRender: "job_level" }
  },
  {
    title: "工资类别",
    width: 200,
    align: "center",
    key: "salary_type",
    dataIndex: "salary_type",
    slots: { title: "salary_type" },
    scopedSlots: { customRender: "salary_type" }
  },
  {
    title: "岗位工资标准",
    width: 200,
    align: "center",
    key: "wage_standard",
    dataIndex: "wage_standard",
    slots: { title: "wage_standard" },
    scopedSlots: { customRender: "wage_standard" }
  },
  {
    title: "基本工资",
    width: 150,
    align: "center",
    key: "basic_salary",
    dataIndex: "basic_salary",
    slots: { title: "basic_salary" },
    scopedSlots: { customRender: "basic_salary" }
  },

  {
    title: "绩效工资",
    width: 150,
    align: "center",
    key: "perform_salary",
    dataIndex: "perform_salary",
    slots: { title: "perform_salary" },
    scopedSlots: { customRender: "perform_salary" }
  },
  {
    title: "季度/月度绩效工资考核兑现金额",
    width: 500,
    align: "center",
    key: "quar_mon_perform_salary",
    dataIndex: "quar_mon_perform_salary",
    slots: { title: "quar_mon_perform_salary" },
    scopedSlots: { customRender: "quar_mon_perform_salary" }
  },
  {
    title: "月实付工资",
    width: 250,
    align: "center",
    key: "paid_wages",
    dataIndex: "paid_wages",
    slots: { title: "paid_wages" },
    scopedSlots: { customRender: "paid_wages" }
  },
  {
    title: "应发工资 (财务)",
    width: 250,
    align: "center",
    key: "payable_salary",
    dataIndex: "payable_salary",
    slots: { title: "payable_salary" },
    scopedSlots: { customRender: "payable_salary" }
  },
  {
    title: "保密费",
    width: 150,
    align: "center",
    key: "secret_salary",
    dataIndex: "secret_salary",
    slots: { title: "secret_salary" },
    scopedSlots: { customRender: "secret_salary" }
  },
  {
    title: "餐费补贴",
    width: 150,
    align: "center",
    key: "meal_subsidy",
    dataIndex: "meal_subsidy",
    slots: { title: "meal_subsidy" },
    scopedSlots: { customRender: "meal_subsidy" }
  },
  {
    title: "通讯补贴",
    width: 150,
    align: "center",
    key: "commun_subsidy",
    dataIndex: "commun_subsidy",
    slots: { title: "commun_subsidy" },
    scopedSlots: { customRender: "commun_subsidy" }
  },
  {
    title: "交通补贴",
    width: 150,
    align: "center",
    key: "transport_subsidy",
    dataIndex: "transport_subsidy",
    slots: { title: "transport_subsidy" },
    scopedSlots: { customRender: "transport_subsidy" }
  },
  {
    title: "节日费",
    width: 150,
    align: "center",
    key: "festival_fee",
    dataIndex: "festival_fee",
    slots: { title: "festival_fee" },
    scopedSlots: { customRender: "festival_fee" }
  },
  {
    title: "独生子女补贴",
    width: 250,
    align: "center",
    key: "one_child_allowance",
    dataIndex: "one_child_allowance",
    slots: { title: "one_child_allowance" },
    scopedSlots: { customRender: "one_child_allowance" }
  },
  {
    title: "工龄补贴",
    width: 150,
    align: "center",
    key: "service_year_allowance",
    dataIndex: "service_year_allowance",
    slots: { title: "service_year_allowance" },
    scopedSlots: { customRender: "service_year_allowance" }
  },
  {
    title: "异地津贴",
    width: 150,
    align: "center",
    key: "off_site_allowance",
    dataIndex: "off_site_allowance",
    slots: { title: "off_site_allowance" },
    scopedSlots: { customRender: "off_site_allowance" }
  },
  {
    title: "加班补贴",
    width: 150,
    align: "center",
    key: "overtime_allowance",
    dataIndex: "overtime_allowance",
    slots: { title: "overtime_allowance" },
    scopedSlots: { customRender: "overtime_allowance" }
  },
  {
    title: "其他补贴",
    width: 150,
    align: "center",
    key: "other_allowance",
    dataIndex: "other_allowance",
    slots: { title: "other_allowance" },
    scopedSlots: { customRender: "other_allowance" }
  },
  {
    title: "岗位津贴",
    width: 150,
    align: "center",
    key: "post_allowance",
    dataIndex: "post_allowance",
    slots: { title: "post_allowance" },
    scopedSlots: { customRender: "post_allowance" }
  },
  {
    title: "奖励",
    width: 150,
    align: "center",
    key: "reward",
    dataIndex: "reward",
    slots: { title: "reward" },
    scopedSlots: { customRender: "reward" }
  },
  {
    title: "补贴合计",
    width: 150,
    align: "center",
    key: "total_subsidy",
    dataIndex: "total_subsidy",
    slots: { title: "total_subsidy" },
    scopedSlots: { customRender: "total_subsidy" }
  },
  {
    title: "补发工资",
    width: 150,
    align: "center",
    key: "reissue_wage",
    dataIndex: "reissue_wage",
    slots: { title: "reissue_wage" },
    scopedSlots: { customRender: "reissue_wage" }
  },
  {
    title: "罚款",
    width: 150,
    align: "center",
    key: "fines",
    dataIndex: "fines",
    slots: { title: "fines" },
    scopedSlots: { customRender: "fines" }
  },
  {
    title: "考勤扣款",
    width: 150,
    align: "center",
    key: "attendance_deduction",
    dataIndex: "attendance_deduction",
    slots: { title: "attendance_deduction" },
    scopedSlots: { customRender: "attendance_deduction" }
  },
  {
    title: "其它扣款",
    width: 150,
    align: "center",
    key: "other_deductions",
    dataIndex: "other_deductions",
    slots: { title: "other_deductions" },
    scopedSlots: { customRender: "other_deductions" }
  },
  {
    title: "扣款合计",
    width: 150,
    align: "center",
    key: "total_deductions",
    dataIndex: "total_deductions",
    slots: { title: "total_deductions" },
    scopedSlots: { customRender: "total_deductions" }
  },

  {
    title: "养老保险",
    width: 150,
    align: "center",
    key: "old_age_insurance",
    dataIndex: "old_age_insurance",
    slots: { title: "old_age_insurance" },
    scopedSlots: { customRender: "old_age_insurance" }
  },
  {
    title: "失业保险",
    width: 150,
    align: "center",
    key: "unemploy_insurance",
    dataIndex: "unemploy_insurance",
    slots: { title: "unemploy_insurance" },
    scopedSlots: { customRender: "unemploy_insurance" }
  },
  {
    title: "医疗保险",
    width: 150,
    align: "center",
    key: "medicare",
    dataIndex: "medicare",
    slots: { title: "medicare" },
    scopedSlots: { customRender: "medicare" }
  },
  {
    title: "社保合计",
    width: 150,
    align: "center",
    key: "total_social_security",
    dataIndex: "total_social_security",
    slots: { title: "total_social_security" },
    scopedSlots: { customRender: "total_social_security" }
  },
  {
    title: "住房公积金",
    width: 200,
    align: "center",
    key: "provident_fund",
    dataIndex: "provident_fund",
    slots: { title: "provident_fund" },
    scopedSlots: { customRender: "provident_fund" }
  },
  {
    title: "社保公积金合计",
    width: 250,
    align: "center",
    key: "social_security_provident_fund",
    dataIndex: "social_security_provident_fund",
    slots: { title: "social_security_provident_fund" },
    scopedSlots: { customRender: "social_security_provident_fund" }
  },
  {
    title: "提前发放应计税收入",
    width: 300,
    align: "center",
    key: "taxable_income_in_advance",
    dataIndex: "taxable_income_in_advance",
    slots: { title: "taxable_income_in_advance" },
    scopedSlots: { customRender: "taxable_income_in_advance" }
  },
  {
    title: "计税工资",
    width: 150,
    align: "center",
    key: "taxable_wages",
    dataIndex: "taxable_wages",
    slots: { title: "taxable_wages" },
    scopedSlots: { customRender: "taxable_wages" }
  },
  {
    title: "个税起征点",
    width: 200,
    align: "center",
    key: "tax_threshold",
    dataIndex: "tax_threshold",
    slots: { title: "tax_threshold" },
    scopedSlots: { customRender: "tax_threshold" }
  },
  {
    title: "本月个人所得税",
    width: 250,
    align: "center",
    key: "tax",
    dataIndex: "tax",
    slots: { title: "tax" },
    scopedSlots: { customRender: "tax" }
  },
  {
    title: "税后服务费",
    width: 200,
    align: "center",
    key: "after_tax_charge",
    dataIndex: "after_tax_charge",
    slots: { title: "after_tax_charge" },
    scopedSlots: { customRender: "after_tax_charge" }
  },
  {
    title: "体检费",
    width: 150,
    align: "center",
    key: "medicare_fee",
    dataIndex: "medicare_fee",
    slots: { title: "medicare_fee" },
    scopedSlots: { customRender: "medicare_fee" }
  },
  {
    title: "工会经费",
    width: 150,
    align: "center",
    key: "union_funds",
    dataIndex: "union_funds",
    slots: { title: "union_funds" },
    scopedSlots: { customRender: "union_funds" }
  },
  {
    title: "税后补扣",
    width: 150,
    align: "center",
    key: "after_tax_deduction",
    dataIndex: "after_tax_deduction",
    slots: { title: "after_tax_deduction" },
    scopedSlots: { customRender: "after_tax_deduction" }
  },
  {
    title: "扣款合计",
    width: 150,
    align: "center",
    key: "total_tax_deduction",
    dataIndex: "total_tax_deduction",
    slots: { title: "total_tax_deduction" },
    scopedSlots: { customRender: "total_tax_deduction" }
  },
  {
    title: "税后补发",
    width: 150,
    align: "center",
    key: "after_tax_reissue",
    dataIndex: "after_tax_reissue",
    slots: { title: "after_tax_reissue" },
    scopedSlots: { customRender: "after_tax_reissue" }
  },

  {
    title: "子女教育累计(专项扣除)",
    width: 350,
    align: "center",
    key: "children_education",
    dataIndex: "children_education",
    slots: { title: "children_education" },
    scopedSlots: { customRender: "children_education" }
  },
  {
    title: "继续教育累计(专项扣除)",
    width: 350,
    align: "center",
    key: "continuing_education",
    dataIndex: "continuing_education",
    slots: { title: "continuing_education" },
    scopedSlots: { customRender: "continuing_education" }
  },
  {
    title: "住房贷款利息累计(专项扣除)",
    width: 400,
    align: "center",
    key: "house_loans",
    dataIndex: "house_loans",
    slots: { title: "house_loans" },
    scopedSlots: { customRender: "house_loans" }
  },
  {
    title: "住房租金累计(专项扣除)",
    width: 350,
    align: "center",
    key: "house_rent",
    dataIndex: "house_rent",
    slots: { title: "house_rent" },
    scopedSlots: { customRender: "house_rent" }
  },
  {
    title: "赡养老人累计(专项扣除)",
    width: 350,
    align: "center",
    key: "elderly_support",
    dataIndex: "elderly_support",
    slots: { title: "elderly_support" },
    scopedSlots: { customRender: "elderly_support" }
  },
  {
    title: "1月至当月专项扣除累计",
    width: 350,
    align: "center",
    key: "total_special_deductions",
    dataIndex: "total_special_deductions",
    slots: { title: "total_special_deductions" },
    scopedSlots: { customRender: "total_special_deductions" }
  },
  {
    title: "1月至当月个税起点累计",
    width: 350,
    align: "center",
    key: "total_tax_threshold",
    dataIndex: "total_tax_threshold",
    slots: { title: "total_tax_threshold" },
    scopedSlots: { customRender: "total_tax_threshold" }
  },
  {
    title: "1月至当月计税工资累计",
    width: 350,
    align: "center",
    key: "total_taxable_wages",
    dataIndex: "total_taxable_wages",
    slots: { title: "total_taxable_wages" },
    scopedSlots: { customRender: "total_taxable_wages" }
  },
  {
    title: "1月至当月应缴个人所得税累计",
    width: 400,
    align: "center",
    key: "total_personal_tax",
    dataIndex: "total_personal_tax",
    slots: { title: "total_personal_tax" },
    scopedSlots: { customRender: "total_personal_tax" }
  },
  {
    title: "1月至上月已缴个人所得税累计",
    width: 400,
    align: "center",
    key: "total_paid_tax",
    dataIndex: "total_paid_tax",
    slots: { title: "total_paid_tax" },
    scopedSlots: { customRender: "total_paid_tax" }
  },
  {
    title: "银行卡号",
    width: 300,
    align: "center",
    key: "bank_no",
    dataIndex: "bank_no",
    slots: { title: "bank_no" },
    scopedSlots: { customRender: "bank_no" }
  },
  {
    title: "手机号",
    width: 200,
    align: "center",
    key: "phone",
    dataIndex: "phone",
    slots: { title: "phone" },
    scopedSlots: { customRender: "phone" }
  },
  {
    title: "备注",
    width: 600,
    align: "center",
    key: "comment",
    dataIndex: "comment",
    slots: { title: "comment" },
    scopedSlots: { customRender: "comment" }
  },
  {
    title: "社保说明",
    width: 600,
    align: "center",
    key: "social_security_description",
    dataIndex: "social_security_description",
    slots: { title: "social_security_description" },
    scopedSlots: { customRender: "social_security_description" }
  },
  {
    title: "公积金说明",
    width: 600,
    align: "center",
    key: "provident_fund_description",
    dataIndex: "provident_fund_description",
    slots: { title: "provident_fund_description" },
    scopedSlots: { customRender: "provident_fund_description" }
  },
  {
    title: "社保备注",
    width: 500,
    align: "center",
    key: "social_security_remarks",
    dataIndex: "social_security_remarks",
    slots: { title: "social_security_remarks" },
    scopedSlots: { customRender: "social_security_remarks" }
  },
  {
    title: "公积金备注",
    width: 500,
    align: "center",
    key: "provident_fund_remark",
    dataIndex: "provident_fund_remark",
    slots: { title: "provident_fund_remark" },
    scopedSlots: { customRender: "provident_fund_remark" }
  },
  {
    title: "专项扣除备注",
    width: 400,
    align: "center",
    key: "special_deductions_remarks",
    dataIndex: "special_deductions_remarks",
    slots: { title: "special_deductions_remarks" },
    scopedSlots: { customRender: "special_deductions_remarks" }
  },
  {
    title: "离职还扣",
    width: 300,
    align: "center",
    key: "departure_deduction",
    dataIndex: "departure_deduction",
    slots: { title: "departure_deduction" },
    scopedSlots: { customRender: "departure_deduction" }
  }
];

export default {
  name: "WageManage",
  components: {
    ATextarea,
    ARow,
    ACol
  },
  props: {
    reBizCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      columns: columns,
      previewVisible: false,
      previewImage: "",
      wageList: [],
      queryParam: { name: "", time: [] },
      spinning: false
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      //获取用户信息
      var userInfo = storage.getStore("cur_user");

      try {
        //设置高级查询条件
        this.queryParam = storage.getStore(
          `system_wage_manage_user@${userInfo.username}`
        );
      } catch (error) {
        console.error(error);
      }

      try {
        //加载用户数据
        if (tools.isNull(this.queryParam.name)) {
          this.queryParam.name = userInfo.realname;
        }
      } catch (error) {
        console.error(error);
      }

      try {
        //如果没有获取到查询条件，则查询所有数据，如果获取到查询条件，则查询筛选数据
        if (
          this.queryParam == "" ||
          this.queryParam == null ||
          JSON.stringify(this.queryParam) == "{}"
        ) {
          //初始化查询条件
          this.queryParam = {};
          //查询薪资信息
          await this.searchQuery();
        } else {
          //设置时间
          if (
            !tools.isNull(this.queryParam.time) &&
            this.queryParam.time.length > 0
          ) {
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

          //查询薪资信息
          await this.searchQuery();
        }
      } catch (error) {
        console.error(error);

        //查询薪资信息
        await this.searchQuery();
      }
    },
    /**
     * @function 查询薪资表信息
     */
    async getDate() {
      //获取工资表信息
      this.wageList = await this.searchQuery();
    },
    /**
     * @function 查看详情页面
     */
    async handleDetailWF(record) {
      //获取当前操作对象
      var curRow = JSON.parse(JSON.stringify(record));

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //获取操作类型
      var type = curRow["type"] == "知会" ? "notify" : "workflow";

      //设置跳转URL
      var detailURL = `/workflow/wageinfo?id=${curRow.id}&time=${curRow.time}&user=${userInfo.username}&type=${type}`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },
    /**
     * @function 查询函数
     */
    async searchQuery() {
      //获取用户信息
      var userInfo = storage.getStore("cur_user");
      var username = userInfo["username"];
      this.queryParam.name = userInfo["realname"];

      try {
        //获取我的待办数据
        this.wageList = await manageAPI.queryWageBillByParam(
          username,
          this.queryParam
        );
      } catch (error) {
        console.error(error);
      }

      //缓存本次查询条件，下次打开此页面，可以还原查询条件
      storage.setStore(
        `system_wage_manage_user@${userInfo.username}`,
        JSON.stringify(this.queryParam),
        3600
      );

      //返回工作表单信息
      return this.wageList;
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