<template>
  <a-card :bordered="false" :class="{abcdefg: true}">
    <!--我的花名册信息-->
    <a-col :md="24" :sm="24">
      <a-descriptions title="工资信息" bordered>
        <template v-for="(item, index) in registerInfo">
          <a-descriptions-item :label="item.key" :span="2">{{
            item.value
          }}</a-descriptions-item>
        </template>
      </a-descriptions>
    </a-col>
  </a-card>
</template>

<script>
import * as manageAPI from '@/api/manage';
import * as storage from '@/utils/storage';
import * as tools from '@/utils/util';

const propsName = {
  id: '主键',
  create_by: '创建人',
  wages_date: '发放日期',
  username: '账户',
  name: '姓名',
  join_time: '入职时间',
  id_card: '身份证号',
  work_date: '应出勤天数',
  salary_date: '计薪天数',
  job_level: '岗位层级',
  salary_type: '工资类别',
  wage_standard: '工资标准',
  basic_salary: '基本工资',
  secret_salary: '保密费',
  perform_salary: '绩效工资',
  quar_mon_perform_salary: '季度绩效',
  meal_subsidy: '餐费补贴',
  commun_subsidy: '通讯补贴',
  transport_subsidy: '交通补',
  festival_fee: '节日费',
  one_child_allowance: '独生补贴',
  service_year_allowance: '工龄补贴',
  off_site_allowance: '异地津贴',
  overtime_allowance: '加班补贴',
  other_allowance: '其他补贴',
  post_allowance: '岗位津贴',
  reward: '奖励',
  total_subsidy: '补贴合计',
  reissue_wage: '补发工资',
  fines: '罚款',
  attendance_deduction: '考勤扣款',
  other_deductions: '其它扣款',
  total_deductions: '扣款合计',
  payable_salary: '应发工资',
  old_age_insurance: '养老保险',
  unemploy_insurance: '失业保险',
  medicare: '医疗保险',
  total_social_security: '社保合计',
  provident_fund: '住房公积金',
  social_security_provident_fund: '社保公积金合计',
  taxable_income_in_advance: '提前发放应计税收入',
  taxable_wages: '计税工资',
  tax_threshold: '个税起征点',
  tax: '个人所得税',
  after_tax_charge: '税后服务费',
  medicare_fee: '体检费',
  union_funds: '工会经费',
  after_tax_deduction: '税后补扣',
  total_tax_deduction: '扣款合计',
  after_tax_reissue: '税后补发',
  paid_wages: '月实付工资',
  children_education: '子女教育累计(专项扣除)',
  continuing_education: '继续教育累计(专项扣除)',
  house_loans: '住房贷款利息累计(专项扣除)',
  house_rent: '住房租金累计(专项扣除)',
  elderly_support: '赡养老人累计(专项扣除)',
  total_special_deductions: '1月至当月专项扣除累计',
  total_tax_threshold: '1月至当月个税起点累计',
  total_taxable_wages: '1月至当月计税工资累计',
  total_personal_tax: '1月至当月应缴个人所得税累计',
  total_paid_tax: '1月至上月已缴个人所得税累计',
  bank_no: '银行卡号',
  phone: '电话号码',
  comment: '备注',
  social_security_description: '社保说明',
  provident_fund_description: '公积金说明',
  social_security_remarks: '社保备注',
  provident_fund_remark: '公积金备注',
  special_deductions_remarks: '专项扣除备注',
  departure_deduction: '离职还扣',
};

export default {
  name: 'RegisterInfo',
  components: {},
  props: {},
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      registerInfo: {},
      spinning: false,
    };
  },
  /**
   * @function 创建后初始化数据函数
   */
  async created() {
    //动态加载初始化数据
    this.loadData();
  },
  /**
   * @function 方法定义区域
   */
  methods: {
    /**
     * @function 加载数据函数
     */
    async loadData() {
      //获取用户信息
      var userInfo = storage.getStore('cur_user');

      //检索用户花名册信息
      await this.searchQuery();

      //打印用户数据
      console.log(userInfo);
    },

    /**
     * @function 查询函数
     */
    async searchQuery() {

      //获取用户信息
      var username = tools.queryUrlString('username');

      //查询用户真实姓名
      var userinfo = await manageAPI.queryUserInfoByView(username);

      //真实姓名
      var realname = '';

      try {
        //获取用户姓名
        userinfo = userinfo[0];
        //真实姓名
        realname = userinfo.realname;
      } catch (error) {
        console.error(error);
      }

      try {
        //获取我的工资数据
        var item = await manageAPI.queryWageByUserName(realname, username);

        //删除属性
        delete item.id;

        //部门信息
        var departName = await manageAPI.queryDepartName(item.depart_name);

        //设置部门
        item.depart_name = departName['name'];

        //遍历对象，设置属性
        for (let key in item) {
          item[key] = {
            key: propsName[key],
            value: item[key],
          };
        }

        //重新设置花名册对象
        this.registerInfo = item;
      } catch (error) {
        console.error(error);
      }

      //缓存本次查询条件，下次打开此页面，可以还原查询条件
      storage.setStore(
        `system_register_info_user@${username.username}`,
        JSON.stringify(this.registerInfo),
        3600
      );

      //返回花名册信息
      return this.registerInfo;
    },
  },
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
