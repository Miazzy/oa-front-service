<template>
  <a-card :bordered="false" :class="{abcdefg: true}">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="6">
            <a-form-item label="员工姓名">
              <a-input
                placeholder="请输入姓名信息"
                v-model="queryParam.name"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="员工性别">
              <a-select style="width: 100%;" v-model="queryParam.sex">
                <a-select-option value>全部</a-select-option>
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="开户银行">
              <a-input
                placeholder="请输入开户行信息"
                v-model="queryParam.bankName"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="银行卡号">
              <a-input
                placeholder="请输入银行卡信息"
                v-model="queryParam.bankName"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="入职时间">
              <a-range-picker v-model="queryParam.time" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="证件号码">
              <a-input
                placeholder="请输入证件号码"
                v-model="queryParam.idcard"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="手机号码">
              <a-input
                placeholder="请输入手机号码"
                v-model="queryParam.phone"
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="6">
            <span
              style="float: left;overflow: hidden;"
              class="table-page-search-submitButtons"
            >
              <a-button
                type="primary"
                @click="searchQuery"
                icon="search"
                style="margin-left: 0px;float:left;"
                >查询</a-button
              >
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px;float:left;"
                >重置</a-button
              >
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
          :dataSource="userList"
          :pagination="true"
          :scroll="{x: 6000, y: 800}"
          style="padding-top:-10px;margin-top:-10px"
        >
          <a slot="username" slot-scope="text, record">
            <a-menu-item>
              <a
                :data-info="JSON.stringify(record)"
                @click="handleDetailWF(record)"
              >
                <span v-html="record.username"></span>
              </a>
            </a-menu-item>
          </a>
        </a-table>
      </template>
    </a-col>
  </a-card>
  <!--</page-layout>-->
</template>
<script>
import ACol from 'ant-design-vue/es/grid/Col';
import ARow from 'ant-design-vue/es/grid/Row';
import ATextarea from 'ant-design-vue/es/input/TextArea';
import * as manageAPI from '@/api/manage';
import * as storage from '@/utils/storage';
import * as tools from '@/utils/util';
import * as moment from 'moment';

const columns = [
  {
    title: '账户',
    width: 100,
    align: 'center',
    key: 'username',
    dataIndex: 'username',
    slots: {title: 'username'},
    scopedSlots: {customRender: 'username'},
  },
  {
    title: '姓名',
    width: 200,
    align: 'center',
    key: 'name',
    dataIndex: 'name',
    slots: {title: 'name'},
    scopedSlots: {customRender: 'name'},
  },
  {
    title: '性别',
    width: 100,
    align: 'center',
    key: 'sex',
    dataIndex: 'sex',
    slots: {title: 'sex'},
    scopedSlots: {customRender: 'sex'},
  },
  {
    title: '人员性质',
    width: 200,
    align: 'center',
    key: 'employee_feature',
    dataIndex: 'employee_feature',
    slots: {title: 'employee_feature'},
    scopedSlots: {customRender: 'employee_feature'},
  },
  {
    title: '单位名称',
    width: 200,
    align: 'center',
    key: 'company_name',
    dataIndex: 'company_name',
    slots: {title: 'company_name'},
    scopedSlots: {customRender: 'company_name'},
  },
  {
    title: '所属中心',
    width: 200,
    align: 'center',
    key: 'center_name',
    dataIndex: 'center_name',
    slots: {title: 'center_name'},
    scopedSlots: {customRender: 'center_name'},
  },
  {
    title: '岗位名称',
    width: 200,
    align: 'center',
    key: 'job_name',
    dataIndex: 'job_name',
    slots: {title: 'job_name'},
    scopedSlots: {customRender: 'job_name'},
  },
  {
    title: '职级',
    width: 300,
    align: 'center',
    key: 'job_level',
    dataIndex: 'job_level',
    slots: {title: 'job_level'},
    scopedSlots: {customRender: 'job_level'},
  },
  {
    title: '入职时间',
    width: 200,
    align: 'center',
    key: 'join_time',
    dataIndex: 'join_time',
    slots: {title: 'join_time'},
    scopedSlots: {customRender: 'join_time'},
  },
  {
    title: '劳动合同期限',
    width: 300,
    align: 'center',
    key: 'contract_time',
    dataIndex: 'contract_time',
    slots: {title: 'contract_time'},
    scopedSlots: {customRender: 'contract_time'},
  },
  {
    title: '公司司龄',
    width: 100,
    align: 'center',
    key: 'work_year',
    dataIndex: 'work_year',
    slots: {title: 'work_year'},
    scopedSlots: {customRender: 'work_year'},
  },
  {
    title: '银行账号',
    width: 300,
    align: 'center',
    key: 'bank_no',
    dataIndex: 'bank_no',
    slots: {title: 'bank_no'},
    scopedSlots: {customRender: 'bank_no'},
  },
  {
    title: '开户行',
    width: 500,
    align: 'center',
    key: 'bank_name',
    dataIndex: 'bank_name',
    slots: {title: 'bank_name'},
    scopedSlots: {customRender: 'bank_name'},
  },
  {
    title: '试用期',
    width: 200,
    align: 'center',
    key: 'probation_status',
    dataIndex: 'probation_status',
    slots: {title: 'probation_status'},
    scopedSlots: {customRender: 'probation_status'},
  },
  {
    title: '转正日期',
    width: 200,
    align: 'center',
    key: 'confirm_date',
    dataIndex: 'confirm_date',
    slots: {title: 'confirm_date'},
    scopedSlots: {customRender: 'confirm_date'},
  },
  {
    title: '在职状态',
    width: 100,
    align: 'center',
    key: 'work_status',
    dataIndex: 'work_status',
    slots: {title: 'work_status'},
    scopedSlots: {customRender: 'work_status'},
  },
  {
    title: '离职时间',
    width: 200,
    align: 'center',
    key: 'off_time',
    dataIndex: 'off_time',
    slots: {title: 'off_time'},
    scopedSlots: {customRender: 'off_time'},
  },
  {
    title: '病产孕',
    width: 100,
    align: 'center',
    key: 'pregnancy',
    dataIndex: 'pregnancy',
    slots: {title: 'pregnancy'},
    scopedSlots: {customRender: 'pregnancy'},
  },
  {
    title: '病产孕时间',
    width: 300,
    align: 'center',
    key: 'pregnancy_time',
    dataIndex: 'pregnancy_time',
    slots: {title: 'pregnancy_time'},
    scopedSlots: {customRender: 'pregnancy_time'},
  },
  {
    title: '证件号',
    width: 300,
    align: 'center',
    key: 'id_card',
    dataIndex: 'id_card',
    slots: {title: 'id_card'},
    scopedSlots: {customRender: 'id_card'},
  },
  {
    title: '通讯号码',
    width: 200,
    align: 'center',
    key: 'phone',
    dataIndex: 'phone',
    slots: {title: 'phone'},
    scopedSlots: {customRender: 'phone'},
  },
  {
    title: '工资卡开户行',
    width: 500,
    align: 'center',
    key: 'salary_bank_name',
    dataIndex: 'salary_bank_name',
    slots: {title: 'salary_bank_name'},
    scopedSlots: {customRender: 'salary_bank_name'},
  },
  {
    title: '工资卡卡号',
    width: 300,
    align: 'center',
    key: 'salary_bank_no',
    dataIndex: 'salary_bank_no',
    slots: {title: 'salary_bank_no'},
    scopedSlots: {customRender: 'salary_bank_no'},
  },
  {
    title: '离职办理状态',
    width: 300,
    align: 'center',
    key: 'off_work_status',
    dataIndex: 'off_work_status',
    slots: {title: 'off_work_status'},
    scopedSlots: {customRender: 'off_work_status'},
  },
  {
    title: '工资归属单位',
    width: 500,
    align: 'center',
    key: 'wages_team',
    dataIndex: 'wages_team',
    slots: {title: 'wages_team'},
    scopedSlots: {customRender: 'wages_team'},
  },
  {
    title: '工资主体单位',
    width: 200,
    align: 'center',
    key: 'wages_main_unit',
    dataIndex: 'wages_main_unit',
    slots: {title: 'wages_main_unit'},
    scopedSlots: {customRender: 'wages_main_unit'},
  },
  {
    title: '编制状态',
    width: 100,
    align: 'center',
    key: 'compilation_status',
    dataIndex: 'compilation_status',
    slots: {title: 'compilation_status'},
    scopedSlots: {customRender: 'compilation_status'},
  },
];

export default {
  name: 'RegisterQuery',
  components: {
    ATextarea,
    ARow,
    ACol,
  },
  props: {
    reBizCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      columns: columns,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      userList: [],
      queryParam: {},
      spinning: false,
    };
  },
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      //获取用户信息
      var userInfo = storage.getStore('cur_user');

      //设置高级查询条件
      this.queryParam = storage.getStore(
        `system_register_list_user@${userInfo.username}`
      );

      //如果没有获取到查询条件，则查询所有数据，如果获取到查询条件，则查询筛选数据
      if (
        this.queryParam == '' ||
        this.queryParam == null ||
        JSON.stringify(this.queryParam) == '{}'
      ) {
        this.queryParam = {};
        await this.getDate();
      } else {
        //设置时间
        if (
          !tools.isNull(this.queryParam.time) &&
          this.queryParam.time.length > 0
        ) {
          this.queryParam.time[0] = tools.formatDate(
            this.queryParam.time[0],
            'yyyy-MM-dd'
          );
          this.queryParam.time[1] = tools.formatDate(
            this.queryParam.time[1],
            'yyyy-MM-dd'
          );

          this.queryParam.time = [
            moment(this.queryParam.time[0], 'YYYY-MM-DD'),
            moment(this.queryParam.time[1], 'YYYY-MM-DD'),
          ];
        }

        await this.searchQuery();
      }
    },
    async getDate() {
      //查询花名册记录
      await this.searchQuery();
    },

    /**
     * @function 查看详情页面
     */
    async handleDetailWF(record) {
      //设置跳转URL
      var detailURL = `/finance/registerinfo?username=${record.username}`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },
    /**
     * @function 查询函数
     */
    async searchQuery() {
      //获取用户信息
      var userInfo = storage.getStore('cur_user');
      let username = userInfo['username'];

      //获取我的待办数据
      this.userList = await manageAPI.queryRegisterByParam(
        username,
        this.queryParam
      );

      //缓存本次查询条件，下次打开此页面，可以还原查询条件
      storage.setStore(
        `system_register_list_user@${userInfo.username}`,
        JSON.stringify(this.queryParam),
        3600
      );
    },
    /**
     * @function 重置函数
     */
    async searchReset() {
      this.queryParam = {};
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
