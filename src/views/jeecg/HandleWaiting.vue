<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
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
import { queryProcessLogWait, queryProcessLogDone } from "@/api/manage";
import { getStore } from "@/utils/storage";

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
    width: 200,
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
    width: 300,
    align: "left",
    dataIndex: "username",
    scopedSlots: { customRender: "username" }
  },
  {
    title: "创建时间",
    width: 150,
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
      spinning: false
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    async loadData() {},
    async getDate() {
      //查询我的已办，我的待办
      if (this.activeKey == 1 || this.activeKey == 2) {
        //获取用户信息
        let userInfo = getStore("cur_user");
        let username = userInfo["username"];
        let realname = userInfo["realname"];
        if (this.activeKey == 1) {
          //获取我的待办数据
          this.dataWaitList = await queryProcessLogWait(username, realname);
        } else if (this.activeKey == 2) {
          //获取我的已办数据
          this.dataDoneList = await queryProcessLogDone(username, realname);
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
      var userInfo = getStore("cur_user");

      //获取选中记录的所属表单名称
      var tableName = curRow["tname"];

      //获取操作类型
      var type = curRow["type"] == "知会" ? "notify" : "workflow";

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&processLogID=${curRow.pid}&user=${userInfo.username}&type=${type}`;

      //跳转到相应页面
      this.$router.push(detailURL);
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
</style>