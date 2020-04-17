<template>
  <a-card :bordered="false" style="height: 100%">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24" v-if="queryInfo && queryInfo.length > 0">
          <template v-for="(item, index) in queryInfo">
            <template v-if="item.hidden === '1'">
              <a-col
                v-if="item.view == 'datetime'"
                :md="12"
                :sm="16"
                :key="'query' + index"
                v-show="toggleSearchStatus"
              >
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
              <a-col v-else :md="6" :sm="8" :key="'query' + index" v-show="toggleSearchStatus">
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
            </template>
            <template v-else>
              <a-col v-if="item.view == 'datetime'" :md="12" :sm="16" :key="'query' + index">
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
              <a-col v-else :md="6" :sm="8" :key="'query' + index">
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
            </template>
          </template>

          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button
                type="primary"
                @click="searchByquery"
                icon="search"
                style="margin-left:0px;font-size: 12px;height: 28px;padding: 0 10px;"
              >查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left:8px;font-size: 12px;height: 28px;padding: 0 10px;"
              >重置</a-button>
              <a
                @click="handleToggleSearch"
                style="margin-left:8px;font-size: 12px;height: 28px;padding: 0 10px;"
              >
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button
        v-if="buttonSwitch.add"
        @click="handleAdd"
        type="primary"
        icon="plus"
        style="margin-left:0px;font-size: 12px;height: 28px;padding: 0 10px;"
      >新增</a-button>
      <a-button
        @click="handleDetailWF"
        type="primary"
        icon="book"
        style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
      >详情</a-button>
      <a-button
        v-if="buttonSwitch.import"
        @click="handleImportXls"
        type="primary"
        icon="upload"
        style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
      >导入</a-button>
      <a-button
        v-if="buttonSwitch.export"
        @click="handleExportXls"
        type="primary"
        icon="download"
        style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
      >导出</a-button>
      <template
        v-if="cgButtonList && cgButtonList.length > 0"
        v-for="(item, index) in cgButtonList"
      >
        <a-button
          v-if="item.optType == 'js'"
          :key="'cgbtn' + index"
          @click="cgButtonJsHandler(item.buttonCode)"
          type="primary"
          :icon="item.buttonIcon"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >{{ item.buttonName }}</a-button>
        <a-button
          v-else-if="item.optType == 'action'"
          :key="'cgbtn' + index"
          @click="cgButtonActionHandler(item.buttonCode)"
          type="primary"
          :icon="item.buttonIcon"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >{{ item.buttonName }}</a-button>
      </template>

      <a-button
        v-if="buttonSwitch.batch_delete"
        @click="handleDelBatch"
        style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        v-show="table.selectionRows.length > 0"
        ghost
        type="primary"
        icon="delete"
      >删除</a-button>
    </div>

    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>
        已选择&nbsp;
        <a style="font-weight: 600">{{ table.selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="cgformAutoList"
        bordered
        size="middle"
        rowKey="id"
        :columns="tableColumns"
        :dataSource="table.dataSource"
        :pagination="pagination"
        :loading="table.loading"
        :rowSelection="{
          selectedRowKeys: table.selectedRowKeys,
          onChange: handleChangeInTableSelect,
        }"
        @change="handleTableChange"
        style="min-height: 300px"
      >
        <template slot="dateSlot" slot-scope="text">
          <span>{{ getFormatDate(text) }}</span>
        </template>

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>

        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt="图片不存在"
            style="max-width:80px;font-size: 12px;font-style: italic;"
          />
        </template>

        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <span v-else>
            <a-button
              type="primary"
              size="small"
              @click="uploadFile(text)"
              style="transform: scale(0.65,0.65);margin-left: -5px;margin-right: -5px;"
            >下载</a-button>
            <a-button
              type="primary"
              size="small"
              @click="viewFile(text)"
              style="transform: scale(0.65,0.65);margin-left: -5px;margin-right: -5px;"
            >预览</a-button>
          </span>
        </template>

        <div slot="filterDropdown">
          <a-card>
            <a-checkbox-group
              @change="onColSettingsChange"
              v-model="columns"
              :defaultValue="columns"
            >
              <a-row>
                <template v-for="(item, index) in columns">
                  <template v-if="item.key != 'rowIndex' && item.dataIndex != 'action'">
                    <a-col :span="12">
                      <a-checkbox :value="item.dataIndex">
                        {{
                        item.title
                        }}
                      </a-checkbox>
                    </a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>
        <a-icon slot="filterIcon" type="setting" :style="{fontSize: '16px', color: '#108ee9'}" />

        <span slot="action" slot-scope="text, record">
          <template
            v-if="
              code != 'dae6cc0e7a7f4b7e9dc0fc36757fdc96' &&
                code != '0b511f234f3847baa50106a14fff6215' &&
                code != 'd11901bc44f24a66b25b37a7a04c611e'
            "
          >
            <a-dropdown>
              <a class="ant-dropdown-link">
                操作
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <template v-if="hasBpmStatus">
                  <template
                    v-if="
                      record.bpm_status == '1' ||
                        record.bpm_status == '' ||
                        record.bpm_status == null
                    "
                  >
                    <template v-if="buttonSwitch.update">
                      <a-menu-item>
                        <a href="javascript:;" @click="handleEdit(record)">编辑</a>
                      </a-menu-item>
                    </template>
                  </template>
                </template>
                <template v-else>
                  <template v-if="buttonSwitch.update">
                    <a-menu-item>
                      <a href="javascript:;" @click="handleEdit(record)">编辑</a>
                    </a-menu-item>
                  </template>
                </template>
                <template v-if="hasBpmStatus"></template>
                <template v-else>
                  <a-menu-item v-if="buttonSwitch.delete">
                    <a-popconfirm title="确定删除吗?" @confirm="() => handleDeleteOne(record)">
                      <a>删除</a>
                    </a-popconfirm>
                  </a-menu-item>
                </template>
                <template
                  v-if="cgButtonLinkList && cgButtonLinkList.length > 0"
                  v-for="(btnItem, btnIndex) in cgButtonLinkList"
                >
                  <a-menu-item :key="'cgbtnLink' + btnIndex">
                    <a
                      href="javascript:void(0);"
                      @click="
                        cgButtonLinkHandler(
                          record,
                          btnItem.buttonCode,
                          btnItem.optType
                        )
                      "
                    >
                      <a-icon v-if="btnItem.buttonIcon" :type="btnItem.buttonIcon" />
                      {{ btnItem.buttonName }}
                    </a>
                  </a-menu-item>
                </template>
              </a-menu>
            </a-dropdown>
          </template>
          <template v-else>--</template>
        </span>
      </a-table>

      <a-modal
        title="温馨提示"
        :visible="tipVisible"
        @ok="tipHandleOk"
        :confirmLoading="tipConfirmLoading"
        @cancel="tipHandleCancel"
      >
        <p>{{ tipContent }}</p>
      </a-modal>

      <OnlCgformAutoModal @success="handleFormSuccess" ref="modal" :code="code"></OnlCgformAutoModal>

      <j-import-modal ref="importModal" :url="getImportUrl()" @ok="importOk"></j-import-modal>
    </div>
  </a-card>
</template>

<script>
//import Vue from 'vue';
import { filterMultiDictText } from "@/components/dict/JDictSelectUtil";
import JImportModal from "@/components/jeecg/JImportModal";

import * as manageAPI from "@/api/manage";
//import * as systemAPI from "@/api/api";
//import * as workflowAPI from "@/api/workflow";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";
//import * as _ from "underscore";
//import * as $ from "jquery";

const tableColumns = [
  {
    title: "账户",
    align: "center",
    dataIndex: "username"
  },
  {
    title: "员工姓名",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "发放日期",
    align: "center",
    dataIndex: "wages_date"
  },
  {
    title: "工资标准",
    align: "center",
    dataIndex: "wage_standard"
  },
  {
    title: "基本工资",
    align: "center",
    dataIndex: "basic_salary"
  },
  {
    title: "绩效工资",
    align: "center",
    dataIndex: "perform_salary"
  },
  {
    title: "应发工资",
    align: "center",
    dataIndex: "payable_salary"
  },
  {
    title: "社保合计",
    align: "center",
    dataIndex: "total_social_security"
  },
  {
    title: "住房公积金",
    align: "center",
    dataIndex: "provident_fund"
  },
  {
    title: "计税工资",
    align: "center",
    dataIndex: "taxable_wages"
  },
  {
    title: "个人所得税",
    align: "center",
    dataIndex: "tax"
  },
  {
    title: "月实付工资",
    align: "center",
    dataIndex: "paid_wages"
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    fixed: "right",
    align: "center",
    width: 80
  }
];

import {
  ACCESS_TOKEN,
  USER_NAME,
  USER_INFO,
  USER_AUTH,
  SYS_BUTTON_AUTH
} from "@/store/mutation-types";

export default {
  name: "OnlCgFormAutoList",
  components: {
    JImportModal
  },
  data() {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30", "50", "100"],
        showQuickJumper: true,
        showSizeChanger: false,
        total: 0
      },
      code: "",
      fixedWFlow: "",
      modelModal: false,
      modelWFlowSelection: "",
      rights: [],
      description: "在线报表",
      currentTableName: "",
      tipContent: "",
      tipVisible: false,
      tipConfirmLoading: false,
      url: {
        getQueryInfo: `${window._CONFIG["domainURL"]}/online/cgform/api/getQueryInfo/`,
        getColumns: `${window._CONFIG["domainURL"]}/online/cgform/api/getColumns/`,
        getData: `${window._CONFIG["domainURL"]}/online/cgform/api/getData/`,
        optPre: `${window._CONFIG["domainURL"]}/online/cgform/api/form/`,
        exportXls: `${window._CONFIG["domainURL"]}/online/cgform/api/exportXls/`,
        buttonAction: `${window._CONFIG["domainURL"]}/online/cgform/api/doButton`
      },
      flowCodePre: "onl_",
      isorter: {
        column: "createTime",
        order: "desc"
      },
      dictOptions: {},
      cgButtonLinkList: [],
      cgButtonList: [],
      queryInfo: [],
      queryParam: {},
      cityList: [
        {
          value: "beijing",
          label: "北京"
        }
      ],
      toggleSearchStatus: false,
      table: {
        loading: true,
        // 表头
        columns: [],
        //列设置
        settingColumns: [],
        //defColumns: columns,
        //数据集
        dataSource: [],
        // 选择器
        selectedRowKeys: [],
        selectionRows: [],
        // 分页参数
        pagination: {
          current: 1,
          pageSize: 10000,
          pageSizeOptions: ["10000"],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条";
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0
        }
      },
      tableColumns: tableColumns,
      actionColumn: {
        title: "操作",
        dataIndex: "action",
        scopedSlots: {
          customRender: "action"
        },
        fixed: "right",
        align: "center",
        width: 80
      },
      formTemplate: "99",
      EnhanceJS: "",
      hideColumns: ["content"],
      buttonSwitch: {
        add: true,
        update: true,
        delete: true,
        batch_delete: true,
        import: true,
        export: true
      },
      hasBpmStatus: false,
      times: [100, 500, 1000, 2000, 3000, 5000]
    };
  },
  async created() {
    try {
      //获取页面代码
      this.code = window.location.pathname.split("/")[3];
    } catch (e) {
      console.error(e);
    }

    try {
      //创建页面后，设置选中数据为空
      this.initAutoList();
    } catch (e) {
      console.error(e);
    }

    try {
      this.table.selectionRows = [];
      this.table.selectedRowKeys = [];
    } catch (e) {
      console.error(e);
    }

    try {
      //查询用户数据，将数据缓存到浏览器缓存
      await manageAPI.queryUserName();
    } catch (e) {
      console.error(e);
    }

    //获取字段
    this.handleColumns();
  },
  async mounted() {
    //创建页面后，设置选中数据为空
    this.initAutoList();

    this.table.selectionRows = [];
    this.table.selectedRowKeys = [];

    //获取字段
    this.handleColumns();

    //查询用户数据，将数据缓存到浏览器缓存
    await manageAPI.queryUserName();
  },
  watch: {
    async $route() {
      // 刷新参数放到这里去触发，就可以刷新相同界面了
      this.initAutoList();

      this.table.selectionRows = [];
      this.table.selectedRowKeys = [];

      //获取字段
      this.handleColumns();

      //查询用户数据，将数据缓存到浏览器缓存
      await manageAPI.queryUserName();
    }
  },
  methods: {
    tipHandleOk(e) {
      this.tipConfirmLoading = true;
      setTimeout(() => {
        this.loadData(1);
        this.tipVisible = false;
        this.tipConfirmLoading = false;
      }, 300);
    },
    handleColumns() {
      //this设置别名
      var that = this;

      //定时执行函数
      manageAPI.setTimeouts(() => {
        let code = window.location.pathname.split("/")[3];
        if (code == "02c2e82c486542df992c3860ad6cd25a") {
          that.tableColumns = JSON.parse(
            `[{"title":"账户","align":"center","dataIndex":"username"},{"title":"姓名","align":"center","dataIndex":"name"},{"title":"性别","align":"center","dataIndex":"sex"},{"title":"人员性质","align":"center","dataIndex":"employee_feature"},{"title":"单位名称","align":"center","dataIndex":"company_name"},{"title":"职级","align":"center","dataIndex":"job_level"},{"title":"入职时间","align":"center","scopedSlots":{"customRender":"dateSlot"},"dataIndex":"join_time"},{"title":"公司司龄","align":"center","dataIndex":"work_year"},{"title":"在职状态","align":"center","dataIndex":"work_status"},{"title":"通讯号码","align":"center","dataIndex":"phone"},{"title":"编制状态","align":"center","dataIndex":"compilation_status"},{"title":"操作","dataIndex":"action","scopedSlots":{"customRender":"action"},"fixed":"right","align":"center","width":80}]`
          );
        } else if (code == "237fa97d3c974bdbb36090d0dd2f3a39") {
          that.tableColumns = JSON.parse(
            `[{"title":"账户","align":"center","dataIndex":"username"},{"title":"员工姓名","align":"center","dataIndex":"name"},{"title":"发放日期","align":"center","dataIndex":"wages_date"},{"title":"工资标准","align":"center","dataIndex":"wage_standard"},{"title":"基本工资","align":"center","dataIndex":"basic_salary"},{"title":"绩效工资","align":"center","dataIndex":"perform_salary"},{"title":"应发工资","align":"center","dataIndex":"payable_salary"},{"title":"社保合计","align":"center","dataIndex":"total_social_security"},{"title":"住房公积金","align":"center","dataIndex":"provident_fund"},{"title":"计税工资","align":"center","dataIndex":"taxable_wages"},{"title":"个人所得税","align":"center","dataIndex":"tax"},{"title":"月实付工资","align":"center","dataIndex":"paid_wages"},{"title":"操作","dataIndex":"action","scopedSlots":{"customRender":"action"},"fixed":"right","align":"center","width":80}]`
          );
        }
      }, ...this.times);
    },
    tipHandleCancel() {
      this.loadData(1);
      this.tipVisible = false;
    },
    hasBpmStatusFilter() {
      var columnObjs = this.table.columns;
      let columns = [];
      for (var item of columnObjs) {
        columns.push(item.dataIndex);
      }
      if (columns.includes("bpm_status") || columns.includes("BPM_STATUS")) {
        this.hasBpmStatus = true;
      } else {
        this.hasBpmStatus = false;
      }
    },
    modalOk() {
      //获取下拉框选择的值
      let value = this.modelWFlowSelection;

      this.fixedWFlow = window.__.find(this.rights, function(item) {
        return (item["id"] = value);
      });

      //获取流程信息
      let wflow = JSON.stringify(this.fixedWFlow);

      console.log(` 获取流程权责配置 ${value} , fixedWFlow : ${wflow}`);
    },
    deStringNull(data) {
      if (typeof data == "undefined" || data == null || data == "") {
        return "";
      } else {
        return data;
      }
    },
    initQueryInfo() {
      manageAPI.getAction(`${this.url.getQueryInfo}${this.code}`).then(res => {
        console.log("--onlineList-获取查询条件配置", res);
        if (res.success) {
          this.queryInfo = res.result;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    initAutoList() {
      this.table.loading = true;
      //this.code = this.$route.params.code;
      manageAPI.getAction(`${this.url.getColumns}${this.code}`).then(res => {
        console.log("--onlineList-加载动态列>>", res);
        if (res.success) {
          this.dictOptions = res.result.dictOptions;
          this.formTemplate = res.result.formTemplate;
          this.description = res.result.description;
          this.currentTableName = res.result.currentTableName;
          this.initCgButtonList(res.result.cgButtonList);
          this.initCgEnhanceJs(res.result.enhanceJs);
          this.initButtonSwitch(res.result.hideColumns);
          let currColumns = res.result.columns;
          for (let a = 0; a < currColumns.length; a++) {
            if (currColumns[a].customRender) {
              let dictCode = currColumns[a].customRender;
              currColumns[a].customRender = text => {
                return filterMultiDictText(this.dictOptions[dictCode], text);
              };
            }
          }
          currColumns.push(this.actionColumn);
          this.table.columns = [...currColumns];
          //去掉展示content内容列，通过点击+按钮展示
          this.table.columns = window.__.filter(this.table.columns, function(
            item
          ) {
            return item.dataIndex != "content";
          });
          this.hasBpmStatusFilter();
          this.loadData();
          this.initQueryInfo();
        } else {
          this.$message.warning(res.message);
        }
      });
    },

    async processLog(business_data_id, record) {
      //this对象设置别名
      let that = this;

      //获取html信息
      let htmlInfo = storage.getStore(
        `processlog_by_bs_data_id@${business_data_id}`
      );

      if (htmlInfo == null || htmlInfo == "") {
        //获取审批日志信息
        let processLogs = await manageAPI.queryPRLogHistoryByDataID(
          business_data_id
        );

        //遍历审批日志
        processLogs.forEach(item => {
          htmlInfo =
            htmlInfo +
            `流程名称：${item.process_name} , 流程节点：${item.process_station} , 处理人： ${item.approve_user} , 审批操作：${item.action} <br/>`;
        });

        record.processlog_html_info = htmlInfo;

        storage.setStore(
          `processlog_by_bs_data_id@${business_data_id}`,
          record,
          10
        );
      }

      //遍历并设置相应html
      that.table.dataSource.forEach(item => {
        //找到当前选中数据，然后设置相应的html
        if (item.id == business_data_id) {
          item.processlog_html_info = htmlInfo;
        }
      });

      return htmlInfo;
    },

    async loadData(arg) {
      if (arg == 1) {
        this.table.pagination.current = 1;
      }

      //查询条件
      let params = this.getQueryParams();
      console.log("--onlineList-查询条件-->", params);

      //如果是审批处理页面，则此处请求数据单独处理
      manageAPI
        .getAction(`${this.url.getData}${this.code}`, params)
        .then(async res => {
          console.log("--onlineList-列表数据", res);
          if (res.success) {
            var result = res.result;

            if (Number(result.total) > 0) {
              this.table.pagination.total = Number(res.result.total);

              res.result.records = window.__.filter(res.result.records, function(
                item
              ) {
                //遍历对象属性
                for (let key of Object.keys(item)) {
                  //获取属性的值
                  var value = item[key];
                  //如果是数字类型，则保留两位小数
                  try {
                    if (typeof value == "number") {
                      item[key] = value.toFixed(2);
                    } else if (key == "wages_date") {
                      //格式化日期
                      value = tools.formatDate(value, "yyyy-MM-dd");
                      item[key] = value;
                    } else if (typeof value == "string") {
                      var nvalue = Number.parseFloat(value).toFixed(2);
                      item[key] = nvalue == "NaN" ? value : nvalue;
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }

                return true;
              });

              //分页条件
              this.pagination.total = res.result.records.total;

              //对返回数据进行过滤,只展示创建人为自己的数据
              this.table.dataSource = res.result.records;

              //遍历数据，设置参数
              for (let index = 0; index < res.result.records.length; index++) {
                const item = res.result.records[index];
                const info = "";
                item.log_info_html = info;
                console.log(`html info : ${info}`);
              }
            } else {
              this.table.pagination.total = 0;
              this.table.dataSource = [];
              //this.$message.warning("查无数据")
            }
          } else {
            this.$message.warning(res.message);
          }
          this.table.loading = false;
        });
    },

    getQueryParams() {
      let param = Object.assign({}, this.queryParam, this.isorter);
      if (
        this.code == "dae6cc0e7a7f4b7e9dc0fc36757fdc96" ||
        this.code == "0b511f234f3847baa50106a14fff6215"
      ) {
        param.column = "operate_time";
      }
      param.pageNo = this.table.pagination.current;
      param.pageSize = this.table.pagination.pageSize;
      return tools.filterObj(param);
    },

    handleChangeInTableSelect(selectedRowKeys, selectionRows) {
      this.table.selectedRowKeys = selectedRowKeys;
      this.table.selectionRows = selectionRows;
    },

    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
    },

    handleAdd() {
      this.cgButtonJsHandler("beforeAdd");
      this.$refs.modal.add(this.formTemplate);
    },

    handleImportXls() {
      this.$refs.importModal.show();
    },

    /**
     * @function 查看详情页面
     */
    async handleDetailWF() {
      //设置this的别名
      var that = this;

      //检测是否为单选
      if (this.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }
      //获取当前用户
      //var userInfo = storage.getStore('cur_user');

      //获取此表单，关联的流程业务模块
      var value = await manageAPI.queryTableName();

      //获取选中记录的所属表单名称
      var tableName = value["table_name"];

      //当前被选中记录数据
      var curRow = this.table.selectionRows[0];

      //缓存当前选中数据
      storage.setStore(
        `${tableName}@id=${curRow.id}`,
        JSON.stringify(curRow),
        60000
      );

      //设置跳转URL
      var detailURL = `/finance/registerinfo?username=${curRow.username}`;

      //如果是工资管理界面，则跳转到工资详情
      if (this.code == "237fa97d3c974bdbb36090d0dd2f3a39") {
        detailURL = `/finance/wageinfo?username=${curRow.username}`;
      }

      //跳转到相应页面
      this.$router.push(detailURL);
    },

    importOk() {
      this.loadData(1);
    },

    handleExportXls2() {
      let param = this.queryParam;
      if (this.table.selectedRowKeys && this.table.selectedRowKeys.length > 0) {
        param["selections"] = this.table.selectedRowKeys.join(",");
      }
      let paramsStr = encodeURI(JSON.stringify(param));
      console.log("paramsStr: " + paramsStr);
      let url =
        window._CONFIG["domainURL"] +
        this.url.exportXls +
        this.code +
        "?paramsStr=" +
        paramsStr;
      window.location.href = url;
    },
    handleExportXls() {
      //定义查询参数
      let param = this.queryParam;

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //检查导出数据
      if (this.table.selectionRows.length <= 0) {
        this.$message.warning("请选择需要导出的记录！");
        return false;
      }

      if (this.table.selectedRowKeys && this.table.selectedRowKeys.length > 0) {
        param["selections"] = this.table.selectedRowKeys.join(",");
      }
      console.log("导出参数", param);
      let paramsStr = JSON.stringify(tools.filterObj(param));
      manageAPI
        .downFile(this.url.exportXls + this.code, { paramsStr: paramsStr })
        .then(data => {
          if (!data) {
            this.$message.warning("文件下载失败");
            return;
          }
          if (typeof window.navigator.msSaveBlob !== "undefined") {
            window.navigator.msSaveBlob(
              new Blob([data]),
              `${this.description}_${userInfo.realname}.xls`
            );
          } else {
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute(
              "download",
              `${this.description}_${userInfo.realname}.xls`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }
        });
    },
    handleEdit(record) {
      this.cgButtonLinkHandler(record, "beforeEdit", "js");
      this.$refs.modal.edit(this.formTemplate, record.id);
    },
    handleDetail(record) {
      this.$refs.modal.detail(this.formTemplate, record.id);
    },
    handleDeleteOne(record) {
      this.cgButtonLinkHandler(record, "beforeDelete", "js");
      this.handleDelete(record.id);
    },
    handleDelete(id) {
      manageAPI
        .deleteAction(this.url.optPre + this.code + "/" + id)
        .then(res => {
          if (res.success) {
            this.$message.success(res.message);
            this.loadData();
          } else {
            this.$message.warning(res.message);
          }
        });
    },

    handleFormSuccess() {
      this.loadData();
    },

    onClearSelected() {
      this.table.selectedRowKeys = [];
      this.table.selectionRows = [];
    },

    getImgView(text) {
      if (text && text.indexOf(",") > 0) {
        text = text.substring(0, text.indexOf(","));
      }
      return window._CONFIG["downloadURL"] + "/" + text;
    },

    uploadFile(text) {
      if (!text) {
        this.$message.warning("未知的文件");
        return;
      }
      if (text.indexOf(",") > 0) {
        text = text.substring(0, text.indexOf(","));
      }
      console.log(text);
      window.open(window._CONFIG["downloadURL"] + "/" + text); //TODO 下载的方法
    },

    viewFile(text) {
      if (!text) {
        this.$message.warning("未知的文件");
        return;
      }
      if (text.indexOf(",") > 0) {
        text = text.substring(0, text.indexOf(","));
      }
      //微软文档预览API
      let officeURL = "https://view.officeapps.live.com/op/view.aspx?src=";
      //IDOCV文档预览API
      let idocvURL = "https://api.idocv.com/view/url?url=";
      //文档下载地址
      let url = window._CONFIG["downloadURL"] + "/" + text;
      //URL加密，保证中文路径可以被正常解析
      let xurl = encodeURIComponent(url);
      //获取文件后缀
      let suffix = text
        .substring(text.lastIndexOf("."), text.length)
        .toLowerCase();
      //如果word文档，则使用微软API打开
      url =
        suffix.includes("doc") ||
        suffix.includes("ppt") ||
        suffix.includes("xls")
          ? officeURL + xurl
          : url;
      //如果pdf文档，则浏览器上直接打开
      url = suffix.includes("pdf") ? url : url;
      //浏览器打开预览
      window.open(url);
    },

    handleDelBatch() {
      if (this.table.selectedRowKeys.length != 1) {
        this.$message.warning("请选择一条记录！");
        return false;
      } else {
        //待删除ID值数组
        let ids = "";
        let that = this;

        //当前被选中记录数据
        let curRow = that.table.selectionRows[0];

        //获取所有勾选的记录
        that.table.selectedRowKeys.forEach(function(val) {
          ids += val + ",";
        });

        //点击确认删除，执行删除操作
        that.$confirm_({
          title: "确认删除",
          content: "是否删除选中数据?",
          onOk: function() {
            that.handleDelete(ids);
            that.onClearSelected();
          }
        });
      }
    },

    searchByquery() {
      this.loadData(1);
    },

    searchReset() {
      this.queryParam = {};
      this.loadData(1);
    },

    handleToggleSearch() {
      this.toggleSearchStatus = !this.toggleSearchStatus;
    },
    getFormatDate(text) {
      if (!text) {
        return "";
      }
      let a = text;
      if (a.length > 10) {
        a = a.substring(0, 10);
      }
      return a;
    },
    getImportUrl() {
      return "/online/cgform/api/importXls/" + this.code;
    },
    initCgEnhanceJs(enhanceJs) {
      //console.log("--onlineList-js增强",enhanceJs)
      if (enhanceJs) {
        let Obj = eval("(" + enhanceJs + ")");
        this.EnhanceJS = new Obj(
          manageAPI.getAction,
          manageAPI.postAction,
          manageAPI.deleteAction
        );
        this.cgButtonJsHandler("created");
      } else {
        this.EnhanceJS = "";
      }
    },
    initCgButtonList(btnList) {
      let linkArr = [];
      let buttonArr = [];
      if (btnList && btnList.length > 0) {
        for (let i = 0; i < btnList.length; i++) {
          let temp = btnList[i];
          if (temp.buttonStyle == "button") {
            buttonArr.push(temp);
          } else if (temp.buttonStyle == "link") {
            linkArr.push(temp);
          }
        }
      }
      this.cgButtonLinkList = [...linkArr];
      this.cgButtonList = [...buttonArr];
    },
    cgButtonJsHandler(buttonCode) {
      if (this.EnhanceJS[buttonCode]) {
        this.EnhanceJS[buttonCode](this);
      }
    },
    cgButtonActionHandler(buttonCode) {
      //处理自定义button的 需要配置该button自定义sql
      if (
        !this.table.selectedRowKeys ||
        this.table.selectedRowKeys.length == 0
      ) {
        this.$message.warning("请先选中一条记录");
        return false;
      }
      if (this.table.selectedRowKeys.length > 1) {
        this.$message.warning("请只选中一条记录");
        return false;
      }
      let params = {
        formId: this.code,
        buttonCode: buttonCode,
        dataId: this.table.selectedRowKeys[0]
      };
      console.log("自定义按钮请求后台参数：", params);
      manageAPI.postAction(this.url.buttonAction, params).then(res => {
        if (res.success) {
          this.loadData();
          this.$message.success("处理完成!");
        } else {
          this.$message.warning("处理失败!");
        }
      });
    },
    cgButtonLinkHandler(record, buttonCode, optType) {
      if (optType == "js") {
        if (this.EnhanceJS[buttonCode]) {
          this.EnhanceJS[buttonCode](this, record);
        }
      } else if (optType == "action") {
        let params = {
          formId: this.code,
          buttonCode: buttonCode,
          dataId: record.id
        };
        console.log("自定义按钮link请求后台参数：", params);
        manageAPI.postAction(this.url.buttonAction, params).then(res => {
          if (res.success) {
            this.loadData();
            this.$message.success("处理完成!");
          } else {
            this.$message.warning("处理失败!");
          }
        });
      }
    },
    initButtonSwitch(hideColumns) {
      if (hideColumns && hideColumns.length > 0) {
        Object.keys(this.buttonSwitch).forEach(key => {
          if (hideColumns.indexOf(key) >= 0) {
            this.buttonSwitch[key] = false;
          }
        });
      }
    }
  }
};
</script>
<style>
.ant-card-body .table-operator {
  margin-bottom: 18px;
}
.ant-table-tbody .ant-table-row td {
  padding-top: 15px;
  padding-bottom: 15px;
}
.anty-row-operator button {
  margin: 0 5px;
}
.ant-btn-danger {
  background-color: #ffffff;
}

.anty-img-wrap {
  height: 25px;
  position: relative;
}
.anty-img-wrap > img {
  max-height: 100%;
}
.ant-modal-cust-warp {
  height: 100%;
}
.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}
.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}
</style>
