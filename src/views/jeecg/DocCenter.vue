<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent" style="height:60px;position:relative;">
      <div class="title" style="font-size:14px;">
        <span class="welcome-text" :style="welcomeStyle">{{ welcome }}</span>
      </div>
      <div :style="postStyle">初级博主 | 总博文数 0 | 博文排名 10 | 访问总数 2000</div>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col style="padding: 0 12px" :xl="4" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="文档管理" :bordered="false" style="margin-top:0px;">
            <div class="members">
              <a-row>
                <a-col :span="24" v-for="(item, index) in manage" :key="index">
                  <a :href="item.href">
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member" @click="item.click">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>

        <a-col :xl="20" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title :bordered="false">
            <article-page></article-page>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
//import Vue from "vue";

import { timeFix, welcome } from "@/utils/util";
import { mapGetters } from "vuex";
import { ArticlePage } from "./document";

import PageLayout from "@/components/page/PageLayout";
import HeadInfo from "@/components/tools/HeadInfo";
import Radar from "@/components/chart/Radar";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
//import "mavon-editor/dist/css/index.css";
//import mavonEditor from "mavon-editor";

//Vue.use(mavonEditor);

export default {
  name: "DocManage",
  components: {
    PageLayout,
    ArticlePage,
    HeadInfo,
    Radar
  },
  data() {
    return {
      timeFix: timeFix(),
      welcome: welcome(),
      postName: "",
      departName: "",
      avatar: "",
      user: {},
      welcomeStyle: {},
      postStyle: {
        "margin-top": "-5px",
        "margin-left": "-113px",
        flex: "auto",
        position: "absolute",
        left: "90px",
        transform: "scale(0.8)"
      },
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      nodelist: [],
      teams: [],
      article: {
        id: "-1",
        dynamicTags: [],
        title: "",
        mdContent: "",
        cid: ""
      },
      manage: [
        {
          name: "文档中心",
          avatar: "/images/内容_文档.png",
          click: async () => {
            //跳转到博客中心
            this.$router.push(`/document/center`);
          }
        },
        {
          name: "我的文档",
          avatar: "/images/个人中心.png",
          click: async () => {
            //跳转到博客中心 -> 文章列表
            this.$router.push(`/document/mine`);
          }
        },
        {
          name: "创建文档",
          avatar: "/images/导航.png",
          click: async () => {
            //跳转到博客中心
            this.$router.push(`/document/publish`);
          }
        },
        {
          name: "热门文档",
          avatar: "/images/等级.png",
          href: "/blog/hot"
        },
        {
          name: "文档排行",
          avatar: "/images/icon-rank-01.svg",
          href: "/blog/rank"
        }
      ],

      axis2Opts: {
        dataKey: "score",
        line: null,
        tickLine: null,
        grid: {
          type: "polygon",
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: "score",
          min: 0,
          max: 80
        }
      ],
      axisData: [],
      radarData: [],
      pageTitle: "",
      pageType: "Y",
      pageScope: 1,
      pageColumn: "社会聚焦",
      tags: [],
      tagInputVisible: false,
      tagInputValue: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    this.user = this.userInfo;

    console.log("this.avatar :" + this.avatar);

    try {
      manageAPI.getRoleList().then(res => {
        console.log("workplace -> call manageAPI.getRoleList()", res);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      manageAPI.getServiceList().then(res => {
        console.log("workplace -> call manageAPI.getServiceList()", res);
      });
    } catch (error) {
      console.log(error);
    }

    //设置岗位style
    this.handlePostStyle();

    //设置员工岗位信息/部门信息
    try {
      this.v_user = await manageAPI.queryUserInfoByView(this.user.username);

      this.postName = this.v_user[0]["post"];
      this.departName = this.v_user[0]["name"];

      this.address = this.v_user[0]["address"];
      this.bio = this.v_user[0]["bio"];

      //设置头像信息
      this.avatar =
        window._CONFIG["imgDomainURL"] + "/" + this.v_user[0]["avatar"];
    } catch (error) {
      console.log("工作台设置员工岗位信息/部门信息异常：" + error);
    }

    //获取动态数据，并设置到动态列表中
    try {
      this.nodelist = await manageAPI.queryDynamic();
    } catch (error) {
      console.log(error);
    }

    //获取最新博文数据
    try {
      this.news = await manageAPI.queryBlogInfoNew(0, 5);
    } catch (error) {
      console.error(error);
    }

    console.log("动态信息：" + JSON.stringify(this.nodelist));
  },
  mounted() {
    this.getProjects();
    this.getActivity();
    this.getTeams();
    this.initRadar();
    this.handlePostStyle();
  },
  methods: {
    ...mapGetters(["nickname", "welcome"]),
    getProjects() {
      this.$http.get("/api/list/search/projects").then(res => {
        this.projects = res.result && res.result.data;
        this.loading = false;
      });
    },
    getActivity() {
      this.$http.get("/api/workplace/activity").then(res => {
        this.activities = res.result;
      });
    },
    getTeams() {
      this.$http.get("/api/workplace/teams").then(res => {
        this.teams = res.result;
      });
    },
    /**
     * @function 设置岗位style
     */
    handlePostStyle() {
      if (this.welcome.length > 76) {
        this.postStyle = { display: "none" };
      }
      //如果字数太多，则使用省略符号
      if (this.welcome.length > 200) {
        this.welcomeStyle = { "font-size": "13px" };
      }
      //如果字数太多，则使用省略符号
      if (this.welcome.length > 250) {
        this.welcomeStyle = { "font-size": "12px" };
      }
      //如果字数太多，则使用省略符号
      if (this.welcome.length > 270) {
        this.welcomeStyle = { "font-size": "12px" };
        this.welcome = this.welcome.substring(0, 270) + "...";
      }
    },
    handleTagClose() {
      const tags = this.tags; //this.tags.filter(tag => tag !== "");
      console.log(tags);
      this.tags = tags;
    },

    handleShowTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    handleTagInputChange(e) {
      this.tagInputValue = e.target.value;
    },

    /**
     * @function 提交Tag函数
     */
    handleTagInputConfirm() {
      const inputValue = this.tagInputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ""
      });
    },

    /**
     * @function 提交博文函数
     */
    async handleSubmitBlog() {
      try {
        //获取博文信息
        var article = {};

        //如果博文标题为空，则提示输入博文标题
        if (tools.isNull(this.pageTitle)) {
          //保存草稿草稿
          this.$message.error("请输入博文标题！");
          //设置返回结果
          return "";
        }

        //如果博文内容为空，则提示输入博文内容
        if (tools.isNull(this.article.mdContent)) {
          //保存草稿草稿
          this.$message.error("请输入博文内容！");
          //设置返回结果
          return "";
        }

        //如果博文标签为空，则提示输入博文标签
        if (tools.isNull(this.tags.toString())) {
          //保存草稿草稿
          this.$message.error("请输入文章标签！");
          //设置返回结果
          return "";
        }

        //获取时间戳
        var timestamp = new Date().getTime();

        article.id = tools.queryUniqueID();
        article.blog_title = this.pageTitle;
        article.content = this.article.mdContent;
        article.create_by = this.userInfo.username;
        article.create_time = tools.formatDate(
          timestamp,
          "yyyy-MM-dd hh:mm:ss"
        );
        article.page_tags = this.tags.toString();
        article.page_column = this.pageColumn;
        article.page_type = this.pageType;
        article.page_scope = this.pageScope;
        article.bpm_status = 1;
        article.flag = "N";

        //提交博文
        var result = await manageAPI.postTableData("bs_blog", article);

        //保存草稿草稿
        this.$message.warning("提交博文成功！");

        this.pageTitle = "";
        this.article.mdContent = "";
        this.tags = [];
      } catch (error) {
        //打印异常日志
        console.log(error);

        //保存草稿草稿
        this.$message.warning("提交博文异常，请稍后重试！");
      }

      //返回结果
      return result;
    },

    /**
     * @function 处理博文预览功能
     */
    async handleBlogView(item) {
      try {
        //标签
        var tags = tools.deNull(item.tags);
        //跳转到博文详情页面
        this.$router.push(
          `/blog/view?id=${item.id}&author=${item.create_by}&tags=${tags}`
        );
      } catch (error) {
        console.log("$router go to error :" + error);
      }
    },

    /**
     * @function 提交博文草稿函数
     */
    async handleSubmitDraft() {
      try {
        //获取博文信息
        var article = {};

        //如果博文标题为空，则提示输入博文标题
        if (tools.isNull(this.pageTitle)) {
          //保存草稿草稿
          this.$message.error("请输入博文标题！");
          //设置返回结果
          return "";
        }

        //如果博文内容为空，则提示输入博文内容
        if (tools.isNull(this.article.mdContent)) {
          //保存草稿草稿
          this.$message.error("请输入博文内容！");
          //设置返回结果
          return "";
        }

        //如果博文标签为空，则提示输入博文标签
        if (tools.isNull(this.tags.toString())) {
          //保存草稿草稿
          this.$message.error("请输入文章标签！");
          //设置返回结果
          return "";
        }

        //获取时间戳
        var timestamp = new Date().getTime();

        article.id = tools.queryUniqueID();
        article.blog_title = this.pageTitle;
        article.content = this.article.mdContent;
        article.create_by = this.userInfo.username;
        article.create_time = tools.formatDate(
          timestamp,
          "yyyy-MM-dd hh:mm:ss"
        );
        article.page_tags = this.tags.toString();
        article.page_column = this.pageColumn;
        article.page_type = this.pageType;
        article.page_scope = this.pageScope;
        article.bpm_status = 1;
        article.flag = "Y";

        //提交博文
        var result = await manageAPI.postTableData("bs_blog", article);

        //保存草稿草稿
        this.$message.warning("保存草稿成功！");

        this.pageTitle = "";
        this.article.mdContent = "";
        this.tags = [];
      } catch (error) {
        //打印异常日志
        console.log(error);

        //保存草稿草稿
        this.$message.warning("提交草稿异常，请稍后重试！");
      }

      //返回结果
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
