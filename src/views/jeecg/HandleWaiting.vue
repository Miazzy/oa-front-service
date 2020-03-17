<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="4" :sm="4">
            <a-form-item label="事项">
              <a-select style="width: 120px" v-model="queryParam.type">
                <a-select-option value="审批">审批</a-select-option>
                <a-select-option value="知会">知会</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="5">
            <a-form-item label="业务">
              <a-select style="width: 180px" v-model="queryParam.name">
                <a-select-option v-for="item in tableNameList" :key="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="5">
            <a-form-item label="主题">
              <a-input placeholder="请输入主题信息" v-model="queryParam.topic"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="时间">
              <a-range-picker v-model="queryParam.time" format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="3">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button
                type="primary"
                @click="searchQuery"
                icon="search"
                style="margin-left: 0px"
              >查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 我的待办 -->
    <a-col :md="24" :sm="24">
      <template>
        <div style="top:50px;">
          <a-spin :spinning="spinning" style="top:50px;">
            <div class="spin-content"></div>
          </a-spin>
        </div>
        <a-table
          :columns="columns"
          :dataSource="dataWaitList"
          :pagination="true"
          style="padding-top:-10px;margin-top:-10px"
        >
          <a slot="type" slot-scope="text, record">
            <a-menu-item>
              <a :data-info="JSON.stringify(record)" @click="handleDetailWF(record)">
                <span v-html="record.type"></span>
              </a>
            </a-menu-item>
          </a>
          <a slot="topic" slot-scope="text, record">
            <a-menu-item>
              <a
                :data-info="JSON.stringify(record)"
                @click="handleDetailWF(record)"
                style="color:#303030;"
              >
                <span style="color:#303030;" v-html="record.topic"></span>
              </a>
            </a-menu-item>
          </a>

          <span slot="name" slot-scope="text , record">
            <a-tag
              :color=" (record.name.length > 5 ? 'geekblue' : 'green')"
              :key="record.name"
              @click="handleDetailWF(record)"
            >{{record.name.toUpperCase()}}</a-tag>
          </span>

          <span slot="username" slot-scope="username">
            <a-tag
              v-for="tag in username"
              :color="tag==='admin' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
              :key="tag"
              style="margin-top:5px;"
            >{{tag}}</a-tag>
          </span>

          <span slot="create_time" slot-scope="text , record">
            <a-tag color="red" :key="record.create_time">{{record.create_time}}</a-tag>
          </span>
        </a-table>
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

const columns = [
  {
    title: "办理事项",
    dataIndex: "type",
    key: "type",
    slots: { title: "type" },
    width: 100,
    align: "center",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "业务",
    width: 100,
    align: "center",
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "主题",
    width: 400,
    align: "left",
    key: "topic",
    dataIndex: "topic",
    scopedSlots: { customRender: "topic" }
  },
  {
    title: "操作人员",
    key: "username",
    width: 150,
    align: "left",
    dataIndex: "username",
    scopedSlots: { customRender: "username" }
  },
  {
    title: "流程发起人",
    key: "proponents",
    width: 150,
    align: "left",
    dataIndex: "proponents",
    scopedSlots: { customRender: "proponents" }
  },
  {
    title: "创建时间",
    width: 100,
    align: "center",
    key: "create_time",
    dataIndex: "create_time",
    scopedSlots: { customRender: "create_time" }
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
      activeKey: 1,
      dataWaitList: [],
      dataDoneList: [],
      tableNameList: [],
      queryParam: {},
      spinning: false
    };
  },
  created() {
    this.getDate();
    this.loadData();
  },
  methods: {
    async loadData() {
      //查询表单信息
      var tableNameList = await manageAPI.queryTableAll("v_table_name");

      //设置表单信息
      this.tableNameList = tableNameList;

      setTimeout(() => {
        //$(".ant-tag").css("margin-bottom", "5px");
      }, 100);

      //打印表单信息
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
          this.dataWaitList = await manageAPI.queryProcessLogWait(
            username,
            realname
          );
        } else if (this.activeKey == 2) {
          //获取我的已办数据
          this.dataDoneList = await manageAPI.queryProcessLogDone(
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
      this.dataWaitList = await manageAPI.queryProcessLogWaitByParam(
        username,
        this.queryParam
      );

      //打印日志信息
      console.log("dataWaitList :" + JSON.stringify(this.dataWaitList));
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
.ant-tag {
  margin-bottom: 5px;
}
.ant-tag-geekblue {
  margin-bottom: 5px;
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