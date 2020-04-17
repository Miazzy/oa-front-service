<template>
  <a-card :bordered="false"></a-card>
</template>
       
<script>
import * as manageAPI from "@/api/manage";
//import * as workflowAPI from "@/api/workflow";
//import * as storage from "@/utils/storage";
//import * as tools from "@/utils/util";
//import * as _ from "underscore";
//import * as $ from "jquery";

export default {
  components: {},
  name: "blog_hot",
  props: {},
  data() {
    return {
      columns: [],
      data: [],
      loading: false,
      formName: "热门博客"
    };
  },

  async created() {
    //查询用户数据，将数据缓存到浏览器缓存
    await manageAPI.queryUserName();
  },

  async mounted() {
    //返回结果
    return null;
  },

  //Vue动态监控区域
  watch: {
    async $route() {
      //返回结果
      return null;
    }
  },
  //Vue方法定义区域
  methods: {}
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
</style>