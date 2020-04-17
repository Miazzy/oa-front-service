<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="5" :sm="5">
            <a-form-item label="公告类型">
              <a-select style="width: 180px;" v-model="queryParam.type">
                <a-select-option value="all" selected>所有类型</a-select-option>
                <a-select-option value="行政公告">行政公告</a-select-option>
                <a-select-option value="红头文件">红头文件</a-select-option>
                <a-select-option value="新闻资讯">新闻资讯</a-select-option>
                <a-select-option value="奖罚通报">奖罚通报</a-select-option>
                <a-select-option value="市场观察">市场观察</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="5">
            <a-form-item label="主题">
              <a-input placeholder="请输入搜索信息" v-model="queryParam.topic"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="6">
            <a-form-item label="时间">
              <a-range-picker v-model="queryParam.time" />
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
          :dataSource="dataNotifyList"
          :pagination="true"
          style="padding-top:-10px;margin-top:-10px"
        >
          <span slot="announce_type" slot-scope="text, record">
            <a-tag
              color="cyan"
              :key="record.announce_type"
              @click="handleAnnounceInfo(record , record.table_name)"
            >{{ record.announce_type }}</a-tag>
          </span>
          <span slot="ctitle" slot-scope="text, record">
            <a
              :key="record.title"
              @click="handleAnnounceInfo(record,record.table_name)"
              style="color:#303030;"
            >{{ record.title }}</a>
          </span>
          <span slot="create_by" slot-scope="text, record">
            <a-tag color="geekblue" :key="record.create_by">{{ record.create_by }}</a-tag>
          </span>
          <span slot="create_time" slot-scope="text, record">
            <a-tag color="pink" :key="record.create_time">{{ record.create_time }}</a-tag>
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
//import * as $ from "jquery";
import * as tools from "@/utils/util";
import * as moment from "moment";

const columns = [
  {
    title: "类型",
    dataIndex: "announce_type",
    key: "announce_type",
    slots: { title: "announce_type" },
    width: 100,
    align: "center",
    scopedSlots: { customRender: "announce_type" }
  },
  {
    title: "主题",
    dataIndex: "title",
    key: "title",
    slots: { title: "ctitle" },
    width: 800,
    align: "left",
    scopedSlots: { customRender: "ctitle" }
  },
  {
    title: "时间",
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
  props: {},
  data() {
    return {
      columns: columns,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      activeKey: 2,
      dataNotifyList: [],
      queryParam: {
        type: "all"
      },
      spinning: false
    };
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      //设置高级查询条件
      this.queryParam = storage.getStore(`system_notify_list_all`);

      //如果没有获取到查询条件，则查询所有数据，如果获取到查询条件，则查询筛选数据
      if (
        this.queryParam == "" ||
        this.queryParam == null ||
        JSON.stringify(this.queryParam) == "{}"
      ) {
        this.queryParam = { type: "all" };
        await this.getDate("all", 50, "", "", "");
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
    },
    /**
     * @function 查询我的公告信息
     */
    async getDate(type, size, content, starttime, endtime) {
      //查询我的公告
      this.dataNotifyList = await manageAPI.queryNotifyAll(
        type,
        size,
        content,
        starttime,
        endtime
      );
    },
    /**
     * @function 查看详情页面
     */
    async handleAnnounceInfo(record, tableName = "bs_announce") {
      //获取当前操作对象
      var curRow = JSON.parse(JSON.stringify(record));

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },
    /**
     * @function 查询函数
     */
    async searchQuery(type = "all", content = "", starttime, endtime) {
      //获取type类型
      type = this.queryParam.type || "all";

      //获取主题搜索信息
      content = this.queryParam.topic || "";

      if (
        !tools.isNull(this.queryParam.time) &&
        this.queryParam.time.length > 0
      ) {
        //获取开始时间
        starttime = this.queryParam.time[0] || "";

        //获取结束时间
        endtime = this.queryParam.time[1] || "";
      }

      //调用公告信息查询函数
      await this.getDate(type, 50, content, starttime, endtime);
    },
    /**
     * @function 重置函数
     */
    async searchReset() {
      this.queryParam = { type: "all" };
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