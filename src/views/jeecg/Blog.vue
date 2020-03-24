<template>
  <div>
    <a-row :gutter="24">
      <a-col style="padding: 0 12px" :xl="6" :lg="24" :md="24" :sm="24">
        <a-card :bordered="false" style="margin-bottom:10px;">
          <div class="account-center-avatarHolder">
            <div style="position:relative;">
              <div class="avatar" style="position:absolute;">
                <img :src="avatar" />
              </div>
              <div class="username" style="position:absolute;left: 68.5px;top: 2px;">{{ username }}</div>
              <div
                class="username"
                style="position:absolute;left: 68.5px;top: 32px;font-size:12px;"
              >
                <a>TA的个人主页 ></a>
              </div>
            </div>
          </div>

          <div class="bio" style="margin-top:80px;">{{bio}}</div>
          <a-divider style="margin-top:10px;margin-bottom:15px;" />
          <div class="bio" style="margin-top:20px;margin-bottom:10px;">
            <div style="float:left;margin-left:0px;text-align:center;">
              <div>原创</div>
              <div>0</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:35px;text-align:center;">
              <div>粉丝</div>
              <div>0</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:35px;text-align:center;">
              <div>获赞</div>
              <div>0</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:35px;text-align:center;">
              <div>评论</div>
              <div>0</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:35px;text-align:center;">
              <div>访问</div>
              <div>0</div>
              <div>&nbsp;</div>
            </div>
          </div>
          <a-divider style="margin-top:10px;margin-bottom:15px;" />
          <div style="display:block;width:100%;margin-top:5px;height:0px;">
            <a-descriptions title="博主信息">
              <div style="float:left;width:135px;">
                <span>等级：</span>
                <span>
                  <a-tag color="orange">博客6级</a-tag>
                </span>
              </div>
              <div style="float:left;margin-left:20px">
                <span>排名：</span>
                <span>10万+</span>
              </div>
            </a-descriptions>
          </div>
          <div style="height:10px;margin-top:0px;padding-top:5px;">&nbsp;</div>
          <div style="display:block;width:100%;margin-top:25px;height:2px">
            <a-descriptions title="博主信息">
              <div style="width:135px;margin-top:25px;">
                <span>积分：</span>
                <span>200</span>
              </div>
            </a-descriptions>
          </div>

          <a-divider style="margin-top:50px;margin-bottom:15px;" />

          <div style="float:right;margin-top:10px;">
            <a-button
              type="primary"
              style="margin-left:-12px;font-size:12px;width:130px;margin-right:15px;"
              size="small"
            >关注</a-button>
            <a-button
              color="gray"
              type="primary"
              style="margin-left:10px;background:pink;border: 1px solid pink;font-size:12px;width:130px;"
              size="small"
            >私信</a-button>
          </div>
        </a-card>

        <a-card :loading="loading" title="博客管理" :bordered="false" style="margin-top:20px;">
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

        <a-card :loading="loading" title="统计管理" :bordered="false" style="margin-top:20px;">
          <div class="members">
            <a-row>
              <a-col :span="24" v-for="(item, index) in count" :key="index">
                <a :href="item.href">
                  <a-avatar size="small" :src="item.avatar" />
                  <span class="member">{{ item.name }}</span>
                </a>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <a-card :loading="loading" title="博客" :bordered="false" style="margin-top:20px;">
          <div class="members">
            <a-row>
              <a-col :span="24" v-for="(item, index) in blog" :key="index">
                <a :href="item.href">
                  <a-avatar size="small" :src="item.avatar" />
                  <span class="member">{{ item.name }}</span>
                </a>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <a-card :loading="loading" title="最新博文" :bordered="false" style="margin-top:20px;">
          <div class="members">
            <a-row>
              <a-col :span="24" v-for="(item, index) in news" :key="index">
                <a :href="item.href">
                  <a-avatar size="small" :src="item.avatar" />
                  <span class="member">{{ item.name }}</span>
                </a>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>

      <a-col :xl="18" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :loading="loading" title :bordered="false">
          <mavon-editor
            class="md"
            :value="content"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
          ></mavon-editor>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from "vue";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import { timeFix, welcome } from "@/utils/util";
import { mapGetters } from "vuex";

import PageLayout from "@/components/page/PageLayout";
import HeadInfo from "@/components/tools/HeadInfo";
import Radar from "@/components/chart/Radar";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";

Vue.use(mavonEditor);

export default {
  name: "BlogInfo",
  components: {
    PageLayout,
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
      bio: "",
      article: {
        id: "-1",
        dynamicTags: [],
        title: "",
        mdContent: "",
        cid: ""
      },
      count: [
        {
          name: "博文统计",
          avatar: "/images/icon-statistics-03.svg"
        },
        {
          name: "热搜词条",
          avatar: "/images/icon-blog-hot.svg"
        }
      ],
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
      blog: [
        {
          name: "热门博客",
          avatar: "/images/icon-blog-hot.svg",
          href: "/blog/hot"
        },
        {
          name: "知名博主",
          avatar: "/images/icon-blog-01.svg",
          href: "/blog/writer"
        },
        {
          name: "博文排行",
          avatar: "/images/icon-rank-01.svg",
          href: "/blog/rank"
        },
        {
          name: "博客中心",
          avatar: "/images/icon-center-01.svg",
          href: "/blog/center"
        }
      ],
      news: [
        {
          name: "钉钉的日本扩...",
          avatar: "/images/icon-blog-hot.svg"
        },
        {
          name: "支付宝的日本...",
          avatar: "/images/icon-blog-hot.svg"
        },
        {
          name: "淘宝的美国征...",
          avatar: "/images/icon-blog-hot.svg"
        },
        {
          name: "微软的中国征...",
          avatar: "/images/icon-blog-hot.svg"
        },
        {
          name: "脸书的欧洲征...",
          avatar: "/images/icon-blog-hot.svg"
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
      author: "",
      blogInfo: {},
      content: "",
      username: "",
      tagInputValue: ""
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    //获取用户信息
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
    //设置个性语录style
    this.handlePostStyle();
    //获取博文内容信息
    this.handleBlog().then(item => {
      console.log(item);
    });
  },
  methods: {
    ...mapGetters(["nickname", "welcome"]),
    /**
     * @function 设置个性语录style
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
      //页面加载完毕
      this.loading = false;
    },
    /**
     * @function 处理博文详情信息
     */
    async handleBlog() {
      try {
        //获取本篇博文编号信息
        var id = tools.queryUrlString("id");

        //获取本篇文章作者信息
        this.author = tools.queryUrlString("author");

        //获取本篇文章标签信息
        this.tags = tools.queryUrlString("tags");

        //获取博文内容信息
        this.blogInfo = await manageAPI.queryTableData("bs_blog", id);

        //设置博文内容信息
        this.content = this.blogInfo["content"];
        //获取本篇博文作者头像信息
        this.avatar = this.blogInfo["avatar"];
        //获取本篇博文作者名称
        this.username = this.blogInfo["create_by"];
      } catch (error) {
        console.log(error);
      }
      //返回博文内容
      return this.content;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.ant-card-body {
  div {
    h3 {
      margin-top: 20px;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
}

.account-center-avatarHolder {
  text-align: center;
  margin-bottom: 24px;

  .avatar {
    margin: 0 auto;
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .username {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 4px;
  }
}
</style>
