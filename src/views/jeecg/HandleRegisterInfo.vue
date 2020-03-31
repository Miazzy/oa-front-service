<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <!--我的花名册信息-->
    <a-col :md="24" :sm="24"></a-col>
  </a-card>
</template>
<script>
import * as manageAPI from "@/api/manage";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";

export default {
  name: "RegisterInfo",
  components: {},
  props: {},
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      registerInfo: {},
      spinning: false
    };
  },
  /**
   * @function 创建后初始化数据函数
   */
  async created() {
    //动态加载初始化数据
    this.loadData();
  },
  methods: {
    /**
     * @function 加载数据函数
     */
    async loadData() {
      //获取用户信息
      var userInfo = storage.getStore("cur_user");

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
      var userInfo = storage.getStore("cur_user");
      var username = userInfo["realname"];

      try {
        //获取我的花名册数据
        this.registerInfo = await manageAPI.queryRegisterByUserName(username);
      } catch (error) {
        console.error(error);
      }

      //缓存本次查询条件，下次打开此页面，可以还原查询条件
      storage.setStore(
        `system_register_info_user@${userInfo.username}`,
        JSON.stringify(this.registerInfo),
        3600
      );

      //返回花名册信息
      return this.registerInfo;
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