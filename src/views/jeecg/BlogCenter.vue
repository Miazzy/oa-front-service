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

        <a-col :xl="20" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title :bordered="false">
            <a-input
              type="text"
              style="width: '100%';border:1px solid #eeeeee;margin-top:0px;margin-bottom:20px;height:42px;background:#fefefe;"
              v-model="pageTitle"
              placeholder="请输入博文标题"
            ></a-input>

            <div id="editor">
              <mavon-editor style="height: 720px;width: 100%;" ref="md" v-model="article.mdContent"></mavon-editor>
            </div>

            <a-form-item :required="false" style="margin-top:20px;">
              <div style="float:left;margin-right:10px;">文章标签：</div>
              <div>
                <template v-for="(tag, index) in tags">
                  <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                    <a-tag
                      :key="tag"
                      :closable="true"
                      :index="index"
                      @close="() => handleTagClose(tag)"
                    >{{`${tag.slice(0, 20)}...`}}</a-tag>
                  </a-tooltip>
                  <a-tag
                    v-else
                    :key="tag"
                    :closable="true"
                    :index="index"
                    @close="() => handleTagClose(tag)"
                  >{{tag}}</a-tag>
                </template>
                <a-input
                  v-if="tagInputVisible"
                  ref="input"
                  type="text"
                  size="small"
                  :style="{ width: '78px' }"
                  :value="tagInputValue"
                  @change="handleTagInputChange"
                  @blur="handleTagInputConfirm"
                  @keyup.enter="handleTagInputConfirm"
                />
                <a-tag
                  v-else
                  @click="handleShowTagInput"
                  style="background: #fff; borderStyle: dashed;"
                >
                  <a-icon type="plus" />
                </a-tag>
              </div>
            </a-form-item>

            <a-form-item label :required="false">
              <div style="float:left;margin-right:10px;">分类专栏：</div>
              <div style="float:left;margin-right:10px;">
                <a-select defaultValue="社会聚焦" style="width: 180px;" v-model="pageColumn">
                  <a-select-option value="社会聚焦">社会聚焦</a-select-option>
                  <a-select-option value="科学技术">科学技术</a-select-option>
                  <a-select-option value="人工智能">人工智能</a-select-option>
                  <a-select-option value="诸子百家">诸子百家</a-select-option>
                  <a-select-option value="金融管理">金融管理</a-select-option>
                  <a-select-option value="建筑工程">建筑工程</a-select-option>
                  <a-select-option value="艺术设计">艺术设计</a-select-option>
                </a-select>
              </div>
            </a-form-item>

            <a-form-item :required="false">
              <div style="float:left;margin-right:10px;">文章类型：</div>
              <a-radio-group v-model="pageType">
                <a-radio-button value="Y">原创</a-radio-button>
                <a-radio-button value="F">翻译</a-radio-button>
                <a-radio-button value="Z">转载</a-radio-button>
              </a-radio-group>
            </a-form-item>

            <a-form-item :required="false">
              <div style="float:left;margin-right:10px;">发布形式：</div>
              <div>
                <a-radio-group v-model="pageScope">
                  <a-radio :value="1">公开</a-radio>
                  <a-radio :value="2">私密</a-radio>
                  <a-radio :value="3">粉丝可见</a-radio>
                </a-radio-group>
              </div>
            </a-form-item>

            <div style="width:88%;margin-top:10px;">
              <a-button
                type="primary"
                style="margin-right:10px;margin-top:10px;border: 1px solid #fefefe;"
                @click="handleSubmitBlog()"
              >发布博文</a-button>
              <a-button
                type="primary"
                style="margin-right:10px;margin-top:10px;border: 1px solid #fefefe;"
                @click="handleSubmitDraft()"
              >保存草稿</a-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import Vue from "vue";

import { timeFix, welcome } from "@/utils/util";
import { mapGetters } from "vuex";

import PageLayout from "@/components/page/PageLayout";
import HeadInfo from "@/components/tools/HeadInfo";
import Radar from "@/components/chart/Radar";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.use(mavonEditor);

export default {
  name: "BlogCenter",
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

      // data
      axis1Opts: {
        dataKey: "item",
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
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
