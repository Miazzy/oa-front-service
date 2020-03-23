<template>
  <a-card :bordered="false" style="height: 100%">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24" v-if="queryInfo && queryInfo.length>0">
          <template v-for="(item,index) in queryInfo">
            <template v-if=" item.hidden==='1' ">
              <a-col
                v-if="item.view=='datetime'"
                :md="12"
                :sm="16"
                :key=" 'query'+index "
                v-show="toggleSearchStatus"
              >
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
              <a-col v-else :md="6" :sm="8" :key=" 'query'+index " v-show="toggleSearchStatus">
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
            </template>
            <template v-else>
              <a-col v-if="item.view=='datetime'" :md="12" :sm="16" :key=" 'query'+index ">
                <online-query-form-item
                  :queryParam="queryParam"
                  :item="item"
                  :dictOptions="dictOptions"
                ></online-query-form-item>
              </a-col>
              <a-col v-else :md="6" :sm="8" :key=" 'query'+index ">
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
      <!-- 查看详情页面功能 -->
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
      <template v-if="hasBpmStatus">
        <!-- 处理自由流程功能 -->
        <a-button
          @click="handleFreeWF"
          type="primary"
          icon="share-alt"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >自由流</a-button>
        <!-- 提交审批操作功能 -->
        <a-button
          @click="handleSubmitWF"
          type="primary"
          icon="cloud-upload"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;display:none;"
        >提交</a-button>
        <!-- 撤销审批操作功能 -->
        <a-button
          @click="handleCancelWF"
          type="primary"
          icon="cloud-download"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >撤销</a-button>
        <a-button
          @click="handleNotifyWF"
          type="primary"
          icon="sound"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >知会</a-button>
        <a-button
          @click="handlePrintWF"
          type="primary"
          icon="printer"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >打印</a-button>
        <a-button
          @click="handleCollection"
          type="primary"
          icon="star"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >收藏</a-button>
        <a-button
          @click="handleShareWF"
          type="primary"
          icon="compass"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >分享</a-button>
      </template>
      <template v-if="code == '0b511f234f3847baa50106a14fff6215' "></template>
      <template v-if="code == 'd11901bc44f24a66b25b37a7a04c611e' "></template>
      <template v-if="cgButtonList && cgButtonList.length>0" v-for="(item,index) in cgButtonList">
        <a-button
          v-if=" item.optType=='js' "
          :key=" 'cgbtn'+index "
          @click="cgButtonJsHandler(item.buttonCode)"
          type="primary"
          :icon="item.buttonIcon"
          style="margin-left:6px;font-size: 12px;height: 28px;padding: 0 10px;"
        >{{ item.buttonName }}</a-button>
        <a-button
          v-else-if=" item.optType=='action' "
          :key=" 'cgbtn'+index "
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
        v-show="table.selectionRows.length > 0 && code != '0b511f234f3847baa50106a14fff6215' && code != 'dae6cc0e7a7f4b7e9dc0fc36757fdc96' && code != 'd11901bc44f24a66b25b37a7a04c611e'"
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
        :columns="table.columns"
        :dataSource="table.dataSource"
        :pagination="pagination"
        :loading="table.loading"
        :rowSelection="{selectedRowKeys:table.selectedRowKeys, onChange: handleChangeInTableSelect}"
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
                <template v-for="(item,index) in columns">
                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                    <a-col :span="12">
                      <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                    </a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>
        <a-icon slot="filterIcon" type="setting" :style="{ fontSize:'16px',color:  '#108ee9' }" />

        <span slot="action" slot-scope="text, record">
          <template
            v-if="code != 'dae6cc0e7a7f4b7e9dc0fc36757fdc96' && code != '0b511f234f3847baa50106a14fff6215' && code != 'd11901bc44f24a66b25b37a7a04c611e' "
          >
            <a-dropdown>
              <a class="ant-dropdown-link">
                操作
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <template v-if="hasBpmStatus">
                  <template
                    v-if="record.bpm_status == '1'||record.bpm_status == ''|| record.bpm_status == null"
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
                  v-if="cgButtonLinkList && cgButtonLinkList.length>0"
                  v-for="(btnItem,btnIndex) in cgButtonLinkList"
                >
                  <a-menu-item :key=" 'cgbtnLink'+btnIndex ">
                    <a
                      href="javascript:void(0);"
                      @click="cgButtonLinkHandler(record,btnItem.buttonCode,btnItem.optType)"
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
        <p>{{tipContent}}</p>
      </a-modal>

      <OnlCgformAutoModal @success="handleFormSuccess" ref="modal" :code="code"></OnlCgformAutoModal>

      <j-import-modal ref="importModal" :url="getImportUrl()" @ok="importOk"></j-import-modal>
    </div>
  </a-card>
</template>

<script>
import Vue from "vue";
import { filterMultiDictText } from "@/components/dict/JDictSelectUtil";
import JImportModal from "@/components/jeecg/JImportModal";

import * as manageAPI from "@/api/manage";
import * as systemAPI from "@/api/api";
import * as workflowAPI from "@/api/workflow";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";
import * as _ from "underscore";
import * as $ from "jquery";

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
        getQueryInfo: "/online/cgform/api/getQueryInfo/",
        getColumns: "/online/cgform/api/getColumns/",
        getData: "/online/cgform/api/getData/",
        optPre: "/online/cgform/api/form/",
        exportXls: "/online/cgform/api/exportXls/",
        buttonAction: "/online/cgform/api/doButton"
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
      hasBpmStatus: false
    };
  },
  async created() {
    //创建页面后，设置选中数据为空
    this.initAutoList();
    this.table.selectionRows = [];
    this.table.selectedRowKeys = [];

    //查询用户数据，将数据缓存到浏览器缓存
    await manageAPI.queryUserName();
  },
  async mounted() {
    //创建页面后，设置选中数据为空
    this.initAutoList();
    this.table.selectionRows = [];
    this.table.selectedRowKeys = [];

    //查询用户数据，将数据缓存到浏览器缓存
    await manageAPI.queryUserName();
  },
  watch: {
    async $route() {
      // 刷新参数放到这里去触发，就可以刷新相同界面了
      this.initAutoList();
      this.table.selectionRows = [];
      this.table.selectedRowKeys = [];

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

      this.fixedWFlow = _.find(this.rights, function(item) {
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
      if (!this.$route.params.code) {
        return false;
      }
      this.table.loading = true;
      this.code = this.$route.params.code;
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
          this.table.columns = _.filter(this.table.columns, function(item) {
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
      var that = this;
      if (arg == 1) {
        this.table.pagination.current = 1;
      }
      let params = this.getQueryParams(); //查询条件
      console.log("--onlineList-查询条件-->", params);
      //如果是审批处理页面，则此处请求数据单独处理
      if (
        this.code == "0b511f234f3847baa50106a14fff6215" &&
        this.description == "流程审批日志表"
      ) {
        var userInfo = storage.getStore("cur_user");

        let result = await manageAPI.queryProcessLogToApproved(
          userInfo["username"],
          userInfo["realname"],
          params
        );
        if (Number(result.total) > 0) {
          this.table.pagination.total = Number(result.total);
          this.table.dataSource = result.records;
        } else {
          this.table.pagination.total = 0;
          this.table.dataSource = [];
        }
        this.table.loading = false;
      } else if (
        this.code == "dae6cc0e7a7f4b7e9dc0fc36757fdc96" &&
        this.description == "流程审批日志历史表"
      ) {
        let userInfo = storage.getStore("cur_user");
        let result = await manageAPI.queryProcessLogHisApproved(
          userInfo["username"],
          userInfo["realname"],
          params
        );
        if (Number(result.total) > 0) {
          this.table.pagination.total = Number(result.total);
          this.table.dataSource = result.records;
        } else {
          this.table.pagination.total = 0;
          this.table.dataSource = [];
        }
        this.table.loading = false;
      } else if (
        this.code == "d11901bc44f24a66b25b37a7a04c611e" &&
        this.description == "流程审批知会表"
      ) {
        let userInfo = storage.getStore("cur_user");
        //获取待知会列表数据
        let result = await manageAPI.queryProcessLogInfApproved(
          userInfo["username"],
          userInfo["realname"],
          params
        );
        if (Number(result.total) > 0) {
          this.table.pagination.total = Number(result.total);
          this.table.dataSource = result.records;
        } else {
          this.table.pagination.total = 0;
          this.table.dataSource = [];
        }
        this.table.loading = false;
      } else {
        manageAPI
          .getAction(`${this.url.getData}${this.code}`, params)
          .then(async res => {
            console.log("--onlineList-列表数据", res);
            if (res.success) {
              var result = res.result;
              var userInfo = storage.getStore("cur_user");
              if (Number(result.total) > 0) {
                this.table.pagination.total = Number(res.result.total);

                res.result.records = _.filter(res.result.records, function(
                  item
                ) {
                  let userInfo = storage.getStore("cur_user");
                  if (
                    "create_by" in item &&
                    that.code != "bd3d13e4fa5c4b0d91d589cd554397bd"
                  ) {
                    return (
                      item["create_by"] == userInfo["username"] ||
                      item["create_by"] == userInfo["realname"]
                    );
                  } else if (
                    "employee" in item &&
                    that.code != "bd3d13e4fa5c4b0d91d589cd554397bd"
                  ) {
                    return (
                      item["employee"] == userInfo["username"] ||
                      item["employee"] == userInfo["realname"]
                    );
                  } else if (
                    "proposer" in item &&
                    that.code == "933e21cf445440abb8cfdae366082a62"
                  ) {
                    //外出页面使用
                    return (
                      item["proposer"] == userInfo["username"] ||
                      item["proposer"] == userInfo["realname"]
                    );
                  } else {
                    return true;
                  }
                });

                //分页条件
                this.pagination.total = res.result.records.total;

                //对返回数据进行过滤,只展示创建人为自己的数据
                this.table.dataSource = res.result.records;

                //遍历数据，设置参数
                for (
                  let index = 0;
                  index < res.result.records.length;
                  index++
                ) {
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
      }
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
      // //TODO 筛选
      // if (Object.keys(sorter).length > 0) {
      //   this.isorter.column = sorter.field;
      //   this.isorter.order = "ascend" == sorter.order ? "asc" : "desc";
      // }
      this.pagination = pagination;
      //this.loadData();
    },

    handleAdd() {
      this.cgButtonJsHandler("beforeAdd");
      this.$refs.modal.add(this.formTemplate);
    },

    handleImportXls() {
      this.$refs.importModal.show();
    },

    /**
     * @function 打印表单功能
     */
    async handlePrintWF() {
      //设置this的别名
      var that = this;

      //检测是否为单选
      if (this.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

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
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=print`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },

    /**
     * @function 自由流知会功能
     */
    async handleNotifyWF() {
      //设置this的别名
      var that = this;

      //检测是否为单选
      if (this.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //获取此表单，关联的流程业务模块
      var value = await manageAPI.queryTableName();

      //获取选中记录的所属表单名称
      var tableName = value["table_name"];

      //当前被选中记录数据
      var curRow = this.table.selectionRows[0];

      //获取知会统计信息
      var countinfo = await manageAPI.queryTableDataByField(
        "v_handling_events",
        "id",
        curRow.id
      );

      //如果流程状态不是待提交，则无法进行自由流程选择
      if (curRow.bpm_status != 4 && curRow.bpm_status != 5) {
        this.$message.warning("此记录尚未审批通过，无法进行知会操作！");
        return false;
      }

      //同一业务数据，同时只能知会一次，本次知会确认完毕后，可以再次知会
      if (tools.deNull(countinfo) != "" && countinfo.length >= 1) {
        this.$confirm_({
          title: "温馨提示",
          content: "此表单业务已进行了知会操作，请不要重复提交!"
        });
        return true;
      }

      //缓存当前选中数据
      storage.setStore(
        `${tableName}@id=${curRow.id}`,
        JSON.stringify(curRow),
        60000
      );

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notifying`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },

    /**
     * @function 处理自由流程
     */
    async handleFreeWF() {
      //设置this的别名
      var that = this;

      //检测是否为单选
      if (this.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //获取此表单，关联的流程业务模块
      var value = await manageAPI.queryTableName();

      //获取选中记录的所属表单名称
      var tableName = value["table_name"];

      //当前被选中记录数据
      var curRow = this.table.selectionRows[0];

      //如果流程状态不是待提交，则无法进行自由流程选择
      if (curRow.bpm_status != 1) {
        this.$message.warning("此记录已进入流程，无法进行自由流程操作！");
        return false;
      }

      //缓存当前选中数据
      storage.setStore(
        `${tableName}@id=${curRow.id}`,
        JSON.stringify(curRow),
        60000
      );

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=workflowing`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },

    /**
     * @function 分享详情页面
     */
    async handleShareWF() {
      //设置this的别名
      var that = this;

      //检测是否为单选
      if (that.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }
      //获取当前用户
      var userInfo = storage.getStore("cur_user");

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
      var detailURL = `/basewflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=view`;

      //跳转到相应页面
      setTimeout(function() {
        window.open(detailURL + "&flag=timeout", "_blank");
      }, 500);
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
      var userInfo = storage.getStore("cur_user");

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
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}`;

      //如果在审批管理菜单下，跳转到详情页面，则应该设置同意驳回确认等按钮
      if (this.code == "0b511f234f3847baa50106a14fff6215") {
        detailURL = `/workflow/view?table_name=${curRow.table_name}&id=${curRow.business_data_id}&processLogID=${curRow.id}&user=${userInfo.username}&type=workflow`;
      } else if (this.code == "d11901bc44f24a66b25b37a7a04c611e") {
        detailURL = `/workflow/view?table_name=${curRow.table_name}&id=${curRow.business_data_id}&processLogID=${curRow.id}&user=${userInfo.username}&type=notify`;
      } else if (this.code == "dae6cc0e7a7f4b7e9dc0fc36757fdc96") {
        detailURL = `/workflow/view?table_name=${curRow.table_name}&id=${curRow.business_data_id}&processLogID=${curRow.id}&user=${userInfo.username}&type=history`;
      } else {
        detailURL = `${detailURL}&type=view`;
      }

      //跳转到相应页面
      this.$router.push(detailURL);
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
      var userInfo = storage.getStore("cur_user");
      //获取当前时间
      var date = tools.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      var operation = operation || "知会";
      //审批意见
      var message = message || "已查看此业务流程，知会确认成功！";

      //当前被选中记录数据
      var curRow = that.table.selectionRows[0];

      //流程日志编号
      var processLogID = curRow["id"];
      //业务代码ID
      //var bussinessCodeID = curRow["business_data_id"];
      //打印表单名称
      var tableName = curRow["table_name"];

      //检测是否为单选
      if (that.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //获取当前审批节点的所有数据
      curRow = await manageAPI.queryProcessLogInfByID(tableName, processLogID);
      //设置本次知会确认创建时间
      curRow["create_time"] = date;

      //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
      if (
        tools.deNull(curRow["approve_user"]).length >=
        tools.deNull(curRow["employee"]).length
      ) {
        //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
        result = await manageAPI.postProcessLogHistory(curRow);
        //删除当前审批节点中的所有记录
        result = await manageAPI.deleteProcessLogInf(tableName, [curRow]);
        that.tipVisible = true;
        that.tipContent = "知会确认成功！";
        return true;
      }

      var employeeList = "," + tools.deNull(curRow["employee"]) + ",";
      var appoveUserList = "," + tools.deNull(curRow["approve_user"]) + ",";

      //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
      if (
        !(
          employeeList.includes("," + userInfo["username"] + ",") ||
          employeeList.includes("," + userInfo["realname"] + ",")
        )
      ) {
        that.$message.warning(
          "您不在此知会记录的操作职员列中，无法进行确认操作！"
        );
        return false;
      }

      //已经知会确认过的用户，无法再次知会
      if (
        appoveUserList.includes("," + userInfo["username"] + ",") ||
        appoveUserList.includes("," + userInfo["realname"] + ",")
      ) {
        that.$message.warning("您已经在此知会记录中，执行过确认操作了！");
        return false;
      }

      //设置知会确认人员
      curRow["approve_user"] =
        tools.deNull(curRow["approve_user"]) +
        (tools.deNull(curRow["approve_user"]) == "" ? "" : ",") +
        userInfo["username"];
      //设置操作内容
      curRow["action"] = operation;
      //设置操作时间
      curRow["operate_time"] = date;
      //设置操作意见
      curRow["action_opinion"] =
        tools.deNull(curRow["action_opinion"]) +
        (tools.deNull(curRow["action_opinion"]) == "" ? "" : "\n\r") +
        `${userInfo["username"]}:${message}`;

      //保存当前数据到数据库中
      await manageAPI.patchTableData("PR_LOG_INFORMED", curRow["id"], curRow);

      //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
      if (curRow["approve_user"].length >= curRow["employee"].length) {
        //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
        result = await manageAPI.postProcessLogHistory(curRow);
        //删除当前审批节点中的所有记录
        result = await manageAPI.deleteProcessLogInf(tableName, [curRow]);
      }

      that.tipVisible = true;
      that.tipContent = "知会确认成功！";
      that.loadData();

      return result;
    },

    /**
     * @function 同意审批
     */
    async handleApproveWF() {
      //设置this的别名
      let that = this;
      //返回结果
      var result;
      //获取当前用户
      var userInfo = storage.getStore("cur_user");
      //获取当前时间
      var date = tools.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      var operation = operation || "同意";
      //审批意见
      var message = message || "";

      //当前被选中记录数据
      var curRow = that.table.selectionRows[0];

      //流程日志编号
      var processLogID = curRow["id"];
      //业务代码ID
      var bussinessCodeID = curRow["business_data_id"];
      //打印表单名称
      var tableName = curRow["table_name"];

      var processAudit = curRow["process_audit"];

      //定义审批节点信息
      var approveNode = null;

      //检测是否为单选
      if (that.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //获取当前审批节点的所有数据
      curRow = await manageAPI.queryProcessLogByID(tableName, processLogID);

      //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
      if (
        !(
          curRow["employee"].includes(userInfo["username"]) ||
          curRow["employee"].includes(userInfo["realname"])
        )
      ) {
        that.$message.warning(
          "您不在此审批流程记录的操作职员列中，无法进行审批操作！"
        );
        return false;
      }

      //获取关于此表单的所有当前审批日志信息
      let node = await manageAPI.queryProcessLog(tableName, bussinessCodeID);

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
        item["create_time"] = tools.formatDate(ctime, "yyyy-MM-dd hh:mm:ss");
      });

      //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
      result = await manageAPI.postProcessLogHistory(node);

      //删除当前审批节点中的所有记录
      result = await manageAPI.deleteProcessLog(tableName, node);

      //第一步，获取此表单，关联的流程业务模块；查询SQL , 获取流程权责中关联业务含有tableName的流程权责
      let rights = await manageAPI.queryBusinessInfo(tableName);

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
        var notifyArray =
          tools.deNull(allNotify) == "" ? "" : allNotify.split(",");

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
            //设置审批节点信息
            approveNode = that.fixedWFlow["approve"];
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
            //根据自由流程配置，获取所有待审核人员列表
            allAudit =
              "," + freeNode.audit_node + "," + freeNode.approve_node + ",";
            //根据自由流程配置，获取所有待知会人员列表
            notifyArray =
              tools.deNull(freeNode.notify_node) == ""
                ? []
                : [freeNode.notify_node];
            //获取自由流程配置，当前审核节点
            curAuditor = curRow["employee"];
            //设置审批节点信息
            approveNode = freeNode.approve_node;
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
          //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废

          //检测当前审批节点是否为最后一个节点，如果是最后一个节点，则将审批状态修改为4：已完成，修改当前审批状态为待处理
          result = await manageAPI.patchTableData(
            tableName,
            curRow["business_data_id"],
            {
              bpm_status: "4"
            }
          );

          //执行知会流程，添加多条知会记录。将知会节点的所有待知会节点，拆分成为数组，遍历数组，数组中每个元素，推送一条知会记录，注意forEach不能使用await
          for (let item of notifyArray) {
            //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
            var employee = await manageAPI.queryProcessNodeEmployee(item);
            //流程岗位
            var process_station = await manageAPI.queryProcessNodeProcName(
              item
            );
            //审批相关流程节点
            var pnode = {};

            if (curRow.business_code != "000000000") {
              //提交审批相关处理信息
              pnode = {
                id: manageAPI.queryRandomStr(32), //获取随机数
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
                id: manageAPI.queryRandomStr(32), //获取随机数
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
            result = await manageAPI.postProcessLogInformed(pnode);
          }

          //当前已经是最后一个审批节点，流程已经处理完毕
          that.tipContent = "同意审批成功，审批流程处理完毕！";
        } else {
          //如果firstAuditor是逗号开头，则去掉开头的逗号
          firstAuditor =
            firstAuditor.indexOf(",") == 0
              ? firstAuditor.substring(1)
              : firstAuditor;
          //获取下一审核节点
          firstAuditor = firstAuditor.split(",")[0];

          //设置流程状态为2：审核中
          let bpm_status_code = "2";

          //检查当前审核节点是否为审批节点，如果是，则bpm_status_code设置为3：审批中
          if (approveNode == firstAuditor) {
            bpm_status_code = "3";
          }

          //修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 （待提交	1	处理中	2	已完成	3	已作废	4）
          result = await manageAPI.patchTableData(
            tableName,
            curRow["business_data_id"],
            {
              bpm_status: bpm_status_code
            }
          );

          //审批相关处理信息
          var pnode = {};

          if (curRow.business_code != "000000000") {
            //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
            var employee = await manageAPI.queryProcessNodeEmployee(
              firstAuditor
            );
            //流程岗位
            var process_station = await manageAPI.queryProcessNodeProcName(
              firstAuditor
            );
            //提交审批相关处理信息
            pnode = {
              id: manageAPI.queryRandomStr(32), //获取随机数
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
              id: manageAPI.queryRandomStr(32), //获取随机数
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
          let vflag = await manageAPI.queryApprovalExist(
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
            result = await manageAPI.postProcessLog(pnode);

            //第三步，根据流程审批节点，向第一个节点推送一条审批信息；根据流程审批节点，找到当前审批节点，修改节点审批状态为审批通过，增加审批意见
            console.log(
              " 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result)
            );

            //将当前待审核节点，添加至datasource中
            that.table.dataSource.push(pnode);

            //提示信息
            that.tipContent = "同意审批成功，审批流程已推向后续处理人！";
          }
        }

        //提示用户撤销审批操作成功
        that.tipVisible = true;
      }

      that.loadData();

      console.log("同意审批成功！");
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
      let userInfo = storage.getStore("cur_user");
      //获取当前时间
      let date = tools.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      let operation = operation || "驳回";
      //审批意见
      let message = message || "";

      //当前被选中记录数据
      let curRow = that.table.selectionRows[0];

      //检测是否为单选
      if (that.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //打印表单名称
      let tableName = curRow["table_name"];

      //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
      if (
        !(
          curRow["employee"].includes(userInfo["username"]) ||
          curRow["employee"].includes(userInfo["realname"])
        )
      ) {
        that.$message.warning(
          "您不在此审批流程记录的操作职员列中，无法进行驳回操作！"
        );
        return false;
      }

      //获取当前审批节点的所有数据
      curRow = await manageAPI.queryProcessLogByID(tableName, curRow["id"]);

      //获取关于此表单的所有当前审批日志信息
      let node = await manageAPI.queryProcessLog(
        tableName,
        curRow["business_data_id"]
      );

      //遍历node,设置approve_user，action
      _.each(node, function(item) {
        item["approve_user"] = userInfo["username"];
        item["action"] = operation;
        item["operate_time"] = date;
        item["action_opinion"] = message;
      });

      //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
      result = await manageAPI.postProcessLogHistory(node);

      //删除当前审批节点中的所有记录
      result = await manageAPI.deleteProcessLog(tableName, node);

      //修改当前审批状态为待处理
      result = await manageAPI.patchTableData(
        tableName,
        curRow["business_data_id"],
        {
          bpm_status: "1"
        }
      );
      //再次执行修改流程状态的操作，防止网络异常
      result = await manageAPI.patchTableData(
        tableName,
        curRow["business_data_id"],
        {
          bpm_status: "1"
        }
      );

      //提示用户撤销审批操作成功
      that.tipVisible = true;
      that.tipContent = "驳回审批成功！";

      that.loadData();
      //打印驳回审批处理日志
      console.log("驳回审批成功");

      //返回结果
      return result;
    },

    /**
     * @function 提交审批
     */
    async handleSubmitWF() {
      //获取当前变量
      let that = this;
      let result = {};
      //获取当前时间
      var date = tools.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      if (that.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //当前被选中记录Index
      let index = that.table.selectedRowKeys[0];
      //当前被选中记录数据
      let curRow = that.table.selectionRows[0];
      //查询是否存在流程，如果存在流程，则不能提交审批
      let exnode = await manageAPI.queryExistWorkflow(curRow.id);

      //已经提交审批，无法再次提交
      if (
        curRow["bpm_status"] == "2" ||
        curRow["bpm_status"] == "3" ||
        (typeof exnode != "undefined" && exnode != null)
      ) {
        that.tipVisible = true;
        that.tipContent = "待审记录中，已经存在此记录，无法再次提交审批！";
        return false;
      } else if (curRow["bpm_status"] == "4" || curRow["bpm_status"] == "5") {
        that.tipVisible = true;
        that.tipContent = "此记录的审批流程，已经完成审批，无法再次提交审批！";
        return false;
      } else if (curRow["bpm_status"] == "10") {
        that.tipVisible = true;
        that.tipContent = "此记录的审批流程，已经作废，无法再次提交审批！";
        return false;
      }

      //获取当前用户信息
      let userInfo = storage.getStore("cur_user");

      //TODO 检查审批权限，当前用户必须申请人员，才可以进行提交审批操作

      //第一步，获取此表单，关联的流程业务模块
      let value = await manageAPI.queryTableName();

      //打印表单名称
      let tableName = value["table_name"];
      //console.log(' tableName : ' + value['table_name'] + ' 执行提交审批操作')

      //TODO 获取是否存在待审批处理的日志记录

      //TODO 如果审批状态是待提交，但是存在待处理的审批日志的，则修改状态为审批中，且提示，已经提交审批，无法再次提交审批

      //查询SQL , 获取流程权责中关联业务含有tableName的流程权责
      let rights = await manageAPI.queryBusinessInfo(tableName);

      //选定流程权责
      that.fixedWFlow = rights[0];
      that.rights = rights;

      //如果流程权责有多个，那么弹出选择框，让用户自己选择一个流程
      if (rights.length > 1) {
        that.modelModal = true;
      } else if (rights.length <= 0) {
        that.tipVisible = true;
        that.tipContent = "尚未配置此业务的流程权责，无法提交审批！";
        return false;
      } else {
        //如果存在审核人
        var firstAuditor = that.fixedWFlow["audit"].split(",")[0];
        //操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
        var employee = await manageAPI.queryProcessNodeEmployee(firstAuditor);
        //流程岗位
        var process_station = await manageAPI.queryProcessNodeProcName(
          firstAuditor
        );

        //没有获取到审核节点的用户信息，请在流程设计->节点配置中设置审核节点的审核用户
        if (Array.isArray(employee) && employee.length == 0) {
          this.$notification["error"]({
            message: "温馨提示",
            description:
              "没有获取到审核节点的用户信息，请在流程设计->节点配置中设置审核节点的审核用户！",
            duration: 4
          });
          return false;
        }

        //提交审批相关处理信息
        var node = {
          id: manageAPI.queryRandomStr(32), //获取随机数
          table_name: tableName, //业务表名
          main_value: value["id"], //表主键值
          business_data_id: curRow["id"], //业务具体数据主键值
          business_code: that.fixedWFlow["id"], //业务编号
          process_name: that.fixedWFlow["items"], //流程名称
          employee: employee[0]["employee"],
          process_station: process_station[0]["item_text"],
          process_audit: firstAuditor,
          proponents: userInfo["realname"],
          content: curRow["content"],
          create_time: date,
          business_data: JSON.stringify(curRow)
        };

        //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
        let vflag = await manageAPI.queryApprovalExist(tableName, curRow["id"]);

        if (vflag) {
          //数据库中已经存在此记录，提示用户无法提交审批

          that.tipContent = "待审记录中，已经存在此记录，无法再次提交审批！";
        } else {
          //第二步，根据流程业务模块，获取流程审批节点，如果含有加签，弹出弹框，选择一个加选审批人，如果没有，则直接下一步

          var firstNode = {
            id: manageAPI.queryRandomStr(32), //获取随机数
            table_name: tableName, //业务表名
            main_value: value["id"], //表主键值
            business_data_id: curRow["id"], //业务具体数据主键值
            business_code: that.fixedWFlow["id"], //业务编号
            process_name: that.fixedWFlow["items"], //流程名称
            employee: userInfo["username"],
            process_station: process_station[0]["item_text"],
            process_audit: "000000003",
            proponents: userInfo["username"],
            approve_user: userInfo["username"],
            action: "发起",
            action_opinion: "发起固化流程",
            content: curRow["content"],
            operate_time: date,
            create_time: date,
            business_data: JSON.stringify(curRow)
          };

          //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
          result = await manageAPI.postProcessLogHistory(firstNode);

          //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
          result = await manageAPI.postProcessLog(node);

          //打印提交审批返回结果
          console.log(" 提交审批返回结果: " + JSON.stringify(result));

          //第三步，根据流程审批节点，向第一个节点推送一条审批信息

          //第四步，修改审批状态为审批中，并记录审批日志；将当前审批状态修改为处理中 （待提交	1	处理中	2	已完成	3	已作废	4）
          result = await manageAPI.patchTableData(tableName, curRow["id"], {
            bpm_status: "2"
          });
          //再次执行一次修改流程状态的操作，防止网络异常
          result = await manageAPI.patchTableData(tableName, curRow["id"], {
            bpm_status: "2"
          });

          //设置流程状态为审核中
          curRow["bpm_status"] = "2";

          //打印审批日志信息
          let logging =
            " 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result);
          console.log(logging);

          //提示审批提交成功
          that.tipContent = "提交审批成功！";
        }

        //弹出审批完成提示框
        that.tipVisible = true;

        //刷新页面
        that.loadData();

        //打印获取到的流程权责信息
        console.log(
          " tableName : " + tableName + " \n rights : " + JSON.stringify(rights)
        );

        //返回处理结果
        return true;
      }
    },

    //取消审批
    async handleCancelWF() {
      //设置this的别名
      let that = this;
      //返回结果
      let result;
      //获取当前用户
      let userInfo = storage.getStore("cur_user");
      //获取当前时间
      let date = tools.formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss");

      //审批动作
      let operation = "撤销";
      //审批意见
      let message = "撤销审批";

      //当前被选中记录数据
      let curRow = that.table.selectionRows[0];

      if (that.table.selectionRows.length != 1) {
        that.$message.warning("请选择一条记录！");
        return false;
      }

      //第一步，获取此表单，关联的流程业务模块
      let value = await manageAPI.queryTableName();

      //打印表单名称
      let tableName = value["table_name"];

      //已经提交审批，无法再次提交；或者：如果流程状态是未提交，则可以撤销审批，因为有时，进入流程状态，且有审批日志，但是出现Bug导致状态为未提交，则也应该可以撤销审批
      if (curRow["bpm_status"] == "1") {
        // that.tipVisible = true;
        // that.tipContent = "该记录尚未提交审批，无法撤销审批！";
        // return false;
      } else if (curRow["bpm_status"] == "4" || curRow["bpm_status"] == "5") {
        that.tipVisible = true;
        that.tipContent = "该记录已完成审批，无法撤销审批！";
        return false;
      } else if (curRow["bpm_status"] == "10") {
        that.tipVisible = true;
        that.tipContent = "该记录审批流程已作废，无法撤销审批！";
        return false;
      }

      //获取关于此表单的所有当前审批日志信息
      let node = await manageAPI.queryProcessLog(tableName, curRow["id"]);

      //检查审批权限，当前用户必须申请人员，才可以进行撤销审批操作

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
        item["create_time"] = tools.formatDate(ctime, "yyyy-MM-dd hh:mm:ss");
      });

      //执行撤销流程
      workflowAPI.postWorkflowCancel(tableName, curRow, node);

      //设置当前表单中的审批状态为待处理
      curRow["bpm_status"] = "1";

      //提示用户撤销审批操作成功
      that.tipVisible = true;
      that.tipContent = "撤销审批成功！";

      that.loadData();

      return result;
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
      let param = this.queryParam;
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
              this.description + ".xls"
            );
          } else {
            let url = window.URL.createObjectURL(new Blob([data]));
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", this.description + ".xls");
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

        //已经提交审批，无法再次提交
        if (curRow["bpm_status"] != "1") {
          this.$message.warning("当前记录已经进入流程，无法删除！");
          return false;
        }

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