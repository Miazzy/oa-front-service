<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="7" :sm="7">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名信息" v-model="queryParam.name" readonly></a-input>
            </a-form-item>
          </a-col>
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
    <a-col :md="24" :sm="24"></a-col>
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

      //设置高级查询条件
      this.queryParam = storage.getStore(
        `system_wage_manage_user@${userInfo.username}`
      );

      try {
        //加载用户数据
        if (tools.isNull(this.queryParam.name)) {
          this.queryParam.name = userInfo.realname;
        }
      } catch (error) {
        console.error(error);
      }

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
    },
    /**
     * @function 查询工作表信息
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
      let username = userInfo["username"];
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