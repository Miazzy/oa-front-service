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
          <a-card :loading="loading" title="博客管理" :bordered="false" style="margin-top:0px;">
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
            <div class="result">
              <div>
                <a-icon :class="['success','icon']" type="check-circle" style="margin-left:45%" />
              </div>
              <div class="title" style="margin-left:42%">博文提交成功！</div>
              <div class="description">{{content}}</div>
            </div>
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
import { ArticlePage } from "./page";

import PageLayout from "@/components/page/PageLayout";
import HeadInfo from "@/components/tools/HeadInfo";
import Radar from "@/components/chart/Radar";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
//import "mavon-editor/dist/css/index.css";
//import mavonEditor from "mavon-editor";

//Vue.use(mavonEditor);

export default {
  name: "BlogResult",
  components: {
    PageLayout,
    ArticlePage,
    HeadInfo,
    Radar
  },
  props: {
    isSuccess: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
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
          name: "发布博客",
          avatar: "/images/icon-publish-01.svg",
          click: async () => {
            //跳转到博客中心
            this.$router.push(`/blog/center`);
          }
        },
        {
          name: "文章管理",
          avatar: "/images/icon-manage-02.svg",
          click: async () => {
            //跳转到博客中心 -> 文章列表
            this.$router.push(`/blog/centerlist`);
          }
        },
        {
          name: "评论管理",
          avatar: "/images/icon-comment-03.svg",
          click: async () => {}
        },
        {
          name: "专栏管理",
          avatar: "/images/icon-column-01.svg",
          click: async () => {}
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
      console.log("this.avatar :" + this.avatar);
    } catch (error) {
      console.log("工作台设置员工岗位信息/部门信息异常：" + error);
    }

    //获取动态数据，并设置到动态列表中
    try {
      this.nodelist = await manageAPI.queryDynamic();
    } catch (error) {
      console.log(error);
    }

    console.log("动态信息：" + JSON.stringify(this.nodelist));
  },
  mounted() {
    this.handleBlog();
    this.handlePostStyle();
    this.loading = false;
  },
  methods: {
    ...mapGetters(["nickname", "welcome"]),

    /**
     * @function 处理博文详情信息
     */
    async handleBlog() {
      try {
        //获取本篇博文编号信息
        var id = tools.queryUrlString("id");

        //如果编号不为空，则获取博文详情
        if (!tools.isNull(id)) {
          //获取本篇文章作者信息
          this.author = tools.queryUrlString("author");

          //获取本篇文章标签信息
          this.tags = tools.queryUrlString("tags");

          //获取博文内容信息
          this.blogInfo = await manageAPI.queryTableData("bs_blog", id);

          //设置博文内容信息
          this.content = tools.abbreviation(this.blogInfo["content"], 300);
        }
      } catch (error) {
        console.log(error);
      }
      //返回博文内容
      return this.content;
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

.result {
  text-align: center;
  width: 72%;
  margin: 0 auto;
  padding: 24px 0 8px;

  .icon {
    font-size: 72px;
    line-height: 72px;
    margin-bottom: 24px;
  }
  .success {
    color: #52c41a;
  }
  .error {
    color: red;
  }
  .title {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .description {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 24px;
  }
  .content {
    background: #fafafa;
    padding: 24px 40px;
    border-radius: 2px;
    text-align: left;
  }
  .action {
    margin-top: 32px;
  }
}

.mobile {
  .result {
    width: 100%;
    margin: 0 auto;
    padding: unset;
  }
}
</style>
