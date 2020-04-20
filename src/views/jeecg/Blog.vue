<template>
  <div>
    <a-row :gutter="24">
      <a-col style="padding: 0 12px" :xl="6" :lg="24" :md="24" :sm="24">
        <a-card :bordered="false" style="margin-bottom:10px;">
          <div class="account-center-avatarHolder">
            <div style="position:relative;">
              <div class="avatar" style="position:absolute;top:5px;">
                <a-avatar :size="54" :src="avatar" />
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

          <div class="bio" style="margin-top:80px;">{{ bio }}</div>
          <a-divider style="margin-top:10px;margin-bottom:15px;" />
          <div class="bio" style="margin-top:20px;margin-bottom:10px;">
            <div style="float:left;margin-left:0px;text-align:center;">
              <div>原创</div>
              <div>{{ originsCount }}</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:10%;text-align:center;">
              <div>粉丝</div>
              <div>{{ fansCount }}</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:10%;text-align:center;">
              <div>获赞</div>
              <div>{{ starsCount }}</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:10%;text-align:center;">
              <div>评论</div>
              <div>{{ commentsCount }}</div>
              <div>&nbsp;</div>
            </div>
            <div style="float:left;margin-left:10%;text-align:center;">
              <div>访问</div>
              <div>{{ visitCount }}</div>
              <div>&nbsp;</div>
            </div>
          </div>
          <a-divider style="margin-top:10px;margin-bottom:15px;" />
          <div style="display:block;width:100%;margin-top:5px;height:0px;">
            <div style="float:left;width:135px;min-width:120px;max-width:150px;">
              <span>等级：</span>
              <span>
                <a-tag color="orange">博客{{ blogLevel }}级</a-tag>
              </span>
            </div>
            <div style="float:left;margin-left:15px">
              <span>排名：</span>
              <span>10万+</span>
            </div>
          </div>
          <div style="height:10px;margin-top:0px;padding-top:5px;">&nbsp;</div>
          <div style="display:block;width:100%;margin-top:25px;height:2px">
            <div style="width:135px;margin-top:25px;">
              <span>积分：</span>
              <span>200</span>
            </div>
          </div>

          <a-divider style="margin-top:50px;margin-bottom:15px;" />

          <div style="float:left;margin-top:10px;">
            <a-button
              type="primary"
              style="margin-left:0px;font-size:12px;width:110px;min-width:100px;max-width:150px;margin-right:10px;"
              size="small"
              @click="handleFollow()"
            >关注</a-button>
          </div>
          <div style="float:right;margin-top:10px;">
            <a-button
              color="gray"
              type="primary"
              style="margin-left:0px;background:pink;border: 1px solid pink;font-size:12px;width:110px;min-width:100px;max-width:150px;"
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
                  <span class="member" @click="item.click">
                    {{
                    item.name
                    }}
                  </span>
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
                <a @click="handleBlogView(item)">
                  <a-avatar size="small" :src="item.avatar" style="margin-left:-15px;" />
                  <span
                    class="member"
                    style="font-size:13px;max-width:320px;width:240px;"
                  >{{ item.name.slice(0,16) + '...' }}</span>
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

        <div class="office-container" style="margin-left:5px;margin-top:20px;">
          <div class="ant-upload-list-item-info" v-for="(item, index) in officeList" :key="index">
            <span style="hover{background: #efeffe;}">
              <a
                rel="noopener noreferrer"
                class="ant-upload-list-item-name"
                style="float:left;margin-left:-20px;margin-top:5px;border-bottom:1px solid #f0f0f0; hover{background: #efeffe;}"
              >
                <a-icon type="file" style="float:left;margin-top:4px;margin-right:5px;" />
                <span
                  type="file"
                  target="_blank"
                  :title="item.title"
                  @click="handlePreview(item)"
                  style="float:left;width:80%;margin-top:4px;margin-right:5px;hover{background: #efeffe; cursor:point;}"
                >{{ item.name }}</span>
                <a-icon
                  type="download"
                  @click="handleDownLoad(item)"
                  style="float:right;margin-top:4px;width:10%;margin-right:5px;hover{background: #efeffe; cursor:point;}"
                />
              </a>
            </span>
          </div>
        </div>

        <div style="width:98%;margin-top:50px;margin-bottom:30px;">
          <a-divider style="width:98%;" dashed>·</a-divider>
        </div>
        <template>
          <div v-for="(item, index) in replaylist" :key="index">
            <a-comment>
              <template slot="actions">
                <span key="comment-basic-like">
                  <a-tooltip title="Like">
                    <a-icon
                      type="like"
                      :theme="action === 'liked' ? 'filled' : 'outlined'"
                      @click="handleLikeComment(item.id)"
                    />
                  </a-tooltip>
                  <span style="padding-left: '8px';cursor: 'auto'">
                    {{
                    item.likes
                    }}
                  </span>
                </span>
                <span key="comment-basic-dislike">
                  <a-tooltip title="Dislike">
                    <a-icon
                      type="dislike"
                      :theme="action === 'disliked' ? 'filled' : 'outlined'"
                      @click="handleDislikeComment(item.id)"
                    />
                  </a-tooltip>
                  <span style="padding-left: '8px';cursor: 'auto'">
                    {{
                    item.dislikes
                    }}
                  </span>
                </span>
                <span
                  key="comment-basic-reply-to"
                  @click="handleReplayComments(item.id, item.create_by)"
                >回复</span>
                <span
                  key="comment-basic-reply-to"
                  @click="handleDeleteComments(item.id, item.create_by)"
                  v-if="userInfo.username == item.create_by"
                >删除</span>
              </template>
              <a slot="author">{{ item.create_by }}</a>
              <a-avatar :src="item.avatar" :alt="item.create_by" slot="avatar" />
              <p slot="content">{{ item.content }}</p>
              <div v-for="(subitem, subindex) in item.replay" :key="subindex">
                <a-comment>
                  <template slot="actions">
                    <span key="comment-basic-like">
                      <a-tooltip title="Like">
                        <a-icon
                          type="like"
                          :theme="action === 'liked' ? 'filled' : 'outlined'"
                          @click="handleLikeSubComment(item.id, subitem.id)"
                        />
                      </a-tooltip>
                      <span style="padding-left: '8px';cursor: 'auto'">
                        {{
                        subitem.likes
                        }}
                      </span>
                    </span>
                    <span key="comment-basic-dislike">
                      <a-tooltip title="Dislike">
                        <a-icon
                          type="dislike"
                          :theme="action === 'disliked' ? 'filled' : 'outlined'"
                          @click="handleDislikeSubComment(item.id, subitem.id)"
                        />
                      </a-tooltip>
                      <span style="padding-left: '8px';cursor: 'auto'">
                        {{
                        subitem.dislikes
                        }}
                      </span>
                    </span>
                    <span
                      key="comment-basic-reply-to"
                      @click="
                        handleDeleteSubComment(
                          item.id,
                          subitem.id,
                          subitem.create_by
                        )
                      "
                      v-if="userInfo.username == subitem.create_by"
                    >删除</span>
                  </template>
                  <a slot="author">{{ subitem.create_by }}</a>
                  <a-avatar :src="subitem.avatar" :alt="subitem.create_by" slot="avatar" />
                  <p slot="content">{{ subitem.content }}</p>
                  <a-tooltip slot="datetime" :title="subitem.create_time">
                    <span>{{ subitem.create_time }}</span>
                  </a-tooltip>
                </a-comment>
              </div>
              <a-tooltip slot="datetime" :title="item.create_time">
                <span>{{ item.create_time }}</span>
              </a-tooltip>
            </a-comment>
          </div>
        </template>

        <div style="width:98%;margin-top:50px;margin-bottom:30px;">
          <a-divider style="width:98%;" dashed>·</a-divider>
        </div>

        <div id="replay">
          <a-col :span="24" v-if="commentFlag == 'yes'">
            <div style="float:left;width:50px;">
              <a-avatar
                style="float:left;text-align:left;"
                :src="avatar"
                :alt="userInfo.realname"
                slot="avatar"
              />
            </div>
            <div style="float:left;width:92.5%;height:80px;">
              <a-textarea
                :span="22"
                style="float:left;text-align:left;height:80px;"
                v-model="replayvalue"
                placeholder="写下你的评论..."
                allowClear
                :autoSize="{minRows: 8, maxRows: 12}"
              />
            </div>
            <div style="width:92.5%;margin-left:50px;margin-top:10px;">
              <div style="float:right;margin-top:10px;">
                <a-button
                  type="primary"
                  @click="handleWriteComment()"
                  style="margin-left:10px;font-size:12px;"
                  size="small"
                >发布</a-button>
                <a-button
                  color="gray"
                  type="primary"
                  @click="handleCancelComment()"
                  style="margin-left:10px;background:pink;border: 1px solid pink;font-size:12px;"
                  size="small"
                >取消</a-button>
              </div>
            </div>
          </a-col>
        </div>

        <div>
          <a-affix :offsetTop="40" class="ant-read-top">
            <a id="likeBlog" style="width:60px;height:60px;">
              <a-button style="z-index:100;">
                <a-icon size="large" type="read" theme="filled" class="ant-read-icon" />
                <div>{{ `${blogVisitCount}阅` }}</div>
              </a-button>
            </a>
          </a-affix>
          <a-affix :offsetTop="80" class="ant-favor-top">
            <a id="likeBlog" style="width:60px;height:60px;">
              <a-button style="z-index:100;" @click="handleLikeBlog()">
                <a-icon size="large" type="star" theme="filled" class="ant-favor-icon" />
                <div @click="handleLikeBlog()">{{ `${likes}赞` }}</div>
              </a-button>
              <a-button
                @click="handleLikeBlog()"
                style="width:80px;height:80px;left:-16px;background:#fefefe;border:0px solid #fefefe;"
              ></a-button>
            </a>
          </a-affix>
          <a-affix :offsetTop="120" @click="handleCollectBlog()" class="ant-heart-top">
            <a @click="handleCollectBlog()">
              <a-button style="z-index:100;">
                <a-icon size="large" type="heart" theme="filled" class="ant-heart-icon" />
                <div>{{ `${star}收藏` }}</div>
              </a-button>
              <a-button
                @click="handleCollectBlog()"
                style="width:80px;height:80px;left:-16px;background:#fefefe;border:0px solid #fefefe;"
              ></a-button>
            </a>
          </a-affix>
          <a-affix :offsetTop="150" href="#replay" class="ant-message-top">
            <a href="#replay">
              <a-button>
                <a-icon size="large" type="message" theme="filled" class="ant-message-icon" />
                <div>回复</div>
              </a-button>
            </a>
          </a-affix>
        </div>

        <div>
          <a-back-top />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
//import Vue from "vue";
//import mavonEditor from "mavon-editor";
//import "mavon-editor/dist/css/index.css";

import { timeFix, welcome } from "@/utils/util";
import { mapGetters } from "vuex";

import PageLayout from "@/components/page/PageLayout";
import HeadInfo from "@/components/tools/HeadInfo";
import Radar from "@/components/chart/Radar";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";

//Vue.use(mavonEditor);

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
      news: [],
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
      tagInputValue: "",
      tableName: "bs_blog",
      replayvalue: "",
      replaylist: [],
      replayid: "",
      officeList: [],
      likes: 0,
      star: 0,
      fansCount: 0,
      originsCount: 0,
      starsCount: 0,
      commentsCount: 0,
      visitCount: 0,
      blogVisitCount: 0,
      blogLevel: 1,
      commentFlag: "yes"
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  /**
   * @function 创建页面后加载数据
   */
  async created() {
    await this.handleLoadData();
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
     * @function 加载数据
     */
    async handleLoadData(vid, vauthor) {
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

      //获取最新博文数据
      try {
        this.news = await manageAPI.queryBlogInfoNew(0, 10);
      } catch (error) {
        console.error(error);
      }

      //执行访问博文
      await this.visitBlog("", vid, vauthor);

      //执行加载博文信息
      await this.loadData(vid, vauthor);

      //访问博文信息
      await this.handleBlog(vid, vauthor);

      console.log("动态信息：" + JSON.stringify(this.nodelist));
    },
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
     * @function 加载页面数据函数
     */
    async loadData(vid, vauthor) {
      //获取页面数据ID
      var id = vid || tools.queryUrlString("id");
      //获取博主信息
      var author = vauthor || tools.queryUrlString("author");
      //查询评论信息
      this.replaylist = await manageAPI.queryCurReplayList(id);
      //检查博主表中，博主是否初始化，如果未初始化，则初始化博主信息
      var blogger = await manageAPI.queryTableData("bs_blogger", author);
      //获取原创博文数量
      this.originsCount = await manageAPI.queryBloggerInfo(author);
      //获取博主获赞数量
      this.starsCount = blogger["stars"];
      //获取博主被评论数量
      this.commentsCount = blogger["comments"];
      //获取博主博文访问量
      this.visitCount = blogger["visit_count"];
      //获取博主粉丝数量
      if (!tools.isNull(blogger["fans"])) {
        this.fansCount = blogger["fans"].split(",").length;
      }
    },
    /**
     * @function 访问博文处理函数
     */
    async visitBlog(result = "", vid, vauthor) {
      //获取博文编号
      var id = vid || tools.queryUrlString("id");
      //获取博主信息
      var author = vauthor || tools.queryUrlString("author");
      //获取时间戳
      var timestamp = new Date().getTime();

      //检查博主表中，博主是否初始化，如果未初始化，则初始化博主信息
      var authorBlogger = await manageAPI.queryTableData("bs_blogger", author);

      //未获取到博主信息，则初始化博主信息
      if (tools.isNull(authorBlogger)) {
        //博主初始化信息
        authorBlogger = {
          id: author,
          origins: 0,
          stars: 0,
          comments: 0,
          visit_count: 1,
          blog_level: 1,
          blog_rank: 1000000,
          blog_score: 0,
          create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss")
        };
        //博主表中在博主的记录中，fans字段新增当前用户
        result = await manageAPI.postTableData("bs_blogger", authorBlogger);
      } else {
        //博主初始化信息
        authorBlogger = {
          id: author,
          visit_count: authorBlogger.visit_count + 1
        };
        //博主表中在博主的记录中，fans字段新增当前用户
        result = await manageAPI.patchTableData(
          "bs_blogger",
          author,
          authorBlogger
        );
      }

      //更新本篇博文访问量
      result = await manageAPI.patchTableData("bs_blog", id, {
        id,
        visit_count: this.blogVisitCount + 1
      });

      //更新博文访问数量
      this.visitCount = authorBlogger.visit_count;

      //更新本篇博文访问量
      this.blogVisitCount = this.blogVisitCount + 1;

      //返回函数处理结果
      return result;
    },
    /**
     * @function 处理博文详情信息
     */
    async handleBlog(vid, vauthor) {
      try {
        //获取本篇博文编号信息
        var id = vid || tools.queryUrlString("id");

        //获取本篇文章作者信息
        this.author = vauthor || tools.queryUrlString("author");

        //获取本篇文章标签信息
        this.tags = tools.queryUrlString("tags");

        //获取博文内容信息
        this.blogInfo = await manageAPI.queryTableData("bs_blog", id);

        //查询评论信息
        this.replaylist = await manageAPI.queryCurReplayList(id);

        //设置博文内容信息
        this.content = this.blogInfo["content"];

        //获取本篇博文作者头像信息
        this.avatar = this.blogInfo["avatar"];

        //获取本篇博文作者名称
        this.username = this.blogInfo["create_by"];

        //获取收藏数量
        this.star = this.blogInfo["star"];

        //获取点赞数量
        this.likes = this.blogInfo["likes"];

        //获取本篇博文访问量
        this.blogVisitCount = this.blogInfo["visit_count"];

        //获取文档地址数组
        this.officeList = await manageAPI.queryOfficeURL(
          this.blogInfo["page_file"]
        );
      } catch (error) {
        console.log(error);
      }
      //返回博文内容
      return this.content;
    },

    /**
     * @function 发布评论
     */
    async handleWriteComment() {
      //获取数据编号
      var id = tools.queryUrlString("id");
      //获取博主信息
      var author = tools.queryUrlString("author");
      //获取时间戳
      var timestamp = new Date().getTime();

      if (tools.isNull(this.replayid)) {
        //定义评论对象
        let node = {
          id: tools.queryUniqueID(),
          create_by: this.userInfo.username,
          create_time: tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
          content: `${this.replayvalue} `,
          table_name: this.tableName,
          main_key: id,
          avatar: this.avatar
        };

        //清除评论内容
        this.replayvalue = "";

        //提示评论成功
        this.$message.warning("评论成功！");

        //提交评论信息
        await manageAPI.postTableData(
          "bs_comments",
          JSON.parse(JSON.stringify(node))
        );

        //刷新页面数据
        this.loadData();
      } else {
        //先查询出相应评论数据
        let node = await manageAPI.queryTableData("bs_comments", this.replayid);

        //定义回复评论
        var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

        //将回复评论加入数组
        replay.push({
          id: tools.queryUniqueID(),
          create_by: this.userInfo.username,
          create_time: tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
          content: `${this.replayvalue} `,
          table_name: this.tableName,
          avatar: this.avatar
        });

        //新增回复评论
        var replaynode = {
          id: this.replayid,
          replay: JSON.stringify(replay)
        };

        //清除评论内容
        this.replayvalue = "";

        //提交评论信息
        await manageAPI.patchTableData(
          "bs_comments",
          this.replayid,
          JSON.parse(JSON.stringify(replaynode))
        );

        //刷新页面数据
        this.loadData();

        //提示点赞成功
        this.$message.warning("回复成功！");

        //回复评论后，删除回复ID
        this.replayid = "";
      }

      //评论成功后，本篇博文回复数+1
      var that = this;
      //延时执行函数
      setTimeout(async () => {
        //提交修改信息
        var result = "";

        //获取博文内容信息
        if (tools.isNull(that.blogInfo)) {
          that.blogInfo = await manageAPI.queryTableData("bs_blog", id);
        }

        //修改本篇博文，回复数+1，收藏用户+当前用户
        that.messages = that.blogInfo["messages"] =
          that.blogInfo["messages"] + 1;

        //获取本篇本收藏用户列表
        var messagesUserList = (that.blogInfo[
          "messages_users"
        ] = `${tools.deNull(that.blogInfo["messages_users"])},${
          that.userInfo.username
        }`);

        //博文信息
        var node = {
          id,
          messages: that.messages,
          messages_users: messagesUserList
        };

        //提交修改信息
        result = await manageAPI.patchTableData("bs_blog", id, node);

        //检查博主表中，博主是否初始化，如果未初始化，则初始化博主信息
        var authorBlogger = await manageAPI.queryTableData(
          "bs_blogger",
          author
        );

        //未获取到博主信息，则初始化博主信息
        if (tools.isNull(authorBlogger)) {
          //博主初始化信息
          authorBlogger = {
            id: author,
            origins: 0,
            stars: 0,
            comments: 1,
            visit_count: 0,
            blog_level: 1,
            blog_rank: 1000000,
            blog_score: 0,
            create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss")
          };
          //博主表中在博主的记录中，fans字段新增当前用户
          result = await manageAPI.postTableData("bs_blogger", authorBlogger);
        } else {
          //博主初始化信息
          authorBlogger = {
            id: author,
            comments: authorBlogger.comments + 1
          };
          //博主表中在博主的记录中，fans字段新增当前用户
          result = await manageAPI.patchTableData(
            "bs_blogger",
            author,
            authorBlogger
          );
        }

        //实时跟新回复数量
        this.commentsCount = authorBlogger.comments;

        //返回结果
        return result;
      }, Math.random() * 1000);
    },
    /**
     * @function 处理预览功能函数
     */
    async handlePreview(item) {
      //检测转化后的FileURL是否可用，如果可用则使用本地地址预览，否则使用kkfileview预览
      var existFlag = await manageAPI.queryUrlValid(item.fileURL);
      //如果文件地址不存在，则使用kkfileview预览模式，否则使用自带预览服务
      if (!existFlag) {
        window.open(window._CONFIG["previewURL"] + item.msrc);
      } else {
        //window打开链接
        window.open(item.src);
      }
    },
    /**
     * @function 处理博文预览功能
     */
    async handleBlogView(item) {
      try {
        //标签
        var tags = tools.deNull(item.tags);

        //加载数据
        await this.handleLoadData(item.id, item.create_by);

        //跳转到博文详情页面
        setTimeout(() => {
          this.$router.push(
            `/blog/view?id=${item.id}&author=${item.create_by}&tags=${tags}`
          );
        }, 1000);
      } catch (error) {
        console.log("$router go to error :" + error);
      }
    },
    /**
     * @function 处理下载功能函数
     */
    async handleDownLoad(item) {
      //打印日志
      console.log(JSON.stringify(item));
      //window打开链接
      window.open(item.msrc);
    },

    /**
     * @function 评论上点击回复处理函数
     */
    async handleReplayComments(id, username) {
      //清除评论内容
      this.replayvalue = `@${username} `;
      //设置回复id
      this.replayid = id;
      //设置文本框获取焦点
      this.$nextTick(function() {
        try {
          this.$refs.input.focus();
          this.$refs.textarea.focus();
        } catch (error) {
          console.log(error);
        }
      });
    },

    /**
     * @function 给评论点赞
     */
    async handleLikeComment(id) {
      //先查询出相应评论数据
      var node = await manageAPI.queryTableData("bs_comments", id);

      //点赞数加1
      var likesNode = {
        id: id,
        likes: node.likes + 1
      };

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(likesNode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("点赞成功！");
    },

    /**
     * @function 给评论取消点赞
     */
    async handleDislikeComment(id) {
      //先查询出相应评论数据
      var node = await manageAPI.queryTableData("bs_comments", id);

      //点赞数加1
      var dislikesNode = {
        id: id,
        dislikes: node.dislikes + 1
      };

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(dislikesNode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("鄙视成功！");
    },

    /**
     * @function 删除上级评论
     */
    async handleDeleteComments(id, username) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      if (
        this.userInfo.username != username ||
        this.userInfo.username != node.create_by
      ) {
        //提示点赞成功
        this.$message.warning("无法删除他人评论！");
      } else {
        //清除评论内容
        this.replayvalue = "";

        //提交评论信息
        await manageAPI.deleteTableData("bs_comments", id);

        //刷新页面数据
        this.loadData();

        //提示点赞成功
        this.$message.warning("删除回复成功！");
      }
    },

    /**
     * @function 删除二级评论
     */
    async handleDeleteSubComment(id, subId) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      //定义回复评论
      var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

      //将回复评论加入数组
      replay = window.__.reject(replay, item => {
        return item.id == subId;
      });

      //新增回复评论
      var replaynode = {
        id: id,
        replay: JSON.stringify(replay)
      };

      //清除评论内容
      this.replayvalue = "";

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(replaynode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("删除评论成功！");
    },

    /**
     * @function 二级评论点赞
     */
    async handleLikeSubComment(id, subId) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      //定义回复评论
      var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

      //将回复评论加入数组
      window.__.each(replay, item => {
        //设置点赞数
        if (item.id == subId) {
          //定义回复评论
          item.likes = tools.isNull(item.likes) ? 1 : item.likes + 1;
        }
      });

      //重新设置回复谢谢
      var likenode = {
        id: id,
        replay: JSON.stringify(replay)
      };

      //清除评论内容
      this.replayvalue = "";

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(likenode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("点赞成功！");
    },

    /**
     * @function 二级评论点鄙视
     */
    async handleDislikeSubComment(id, subId) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      //定义回复评论
      var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

      //将回复评论加入数组
      window.__.each(replay, item => {
        //设置点赞数
        if (item.id == subId) {
          //定义回复评论
          item.dislikes = tools.isNull(item.dislikes) ? 1 : item.dislikes + 1;
        }
      });

      //重新设置回复信息
      var dislikenode = {
        id: id,
        replay: JSON.stringify(replay)
      };

      //清除评论内容
      this.replayvalue = "";

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(dislikenode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("鄙视成功！");
    },

    /**
     * @function 取消发布评论信息
     */
    async handleCancelComment() {
      //清除评论内容
      this.replayvalue = "";

      //隐藏评论输入框
      this.commentFlag = "no";

      //提示评论成功
      this.$message.warning("取消评论！");
    },
    /**
     * @function 收藏本篇博文处理函数
     */
    async handleCollectBlog() {
      var that = this;
      //延时执行函数
      setTimeout(async () => {
        //获取本篇博文ID
        var id = tools.queryUrlString("id");

        //用户是否已经收藏本篇博文
        var flag = false;

        //提交修改信息
        var result = "";

        //获取博文内容信息
        if (tools.isNull(that.blogInfo)) {
          that.blogInfo = await manageAPI.queryTableData("bs_blog", id);
        }

        //如果点赞收藏用户不为空，则检查用户是否点赞/收藏过本博文
        if (!tools.isNull(that.blogInfo["star_users"])) {
          //获取已经点赞的用户信息
          var userList = tools.deNull(that.blogInfo["star_users"]).split(",");
          //检查用户是否已经点赞/收藏本篇博文
          flag =
            userList.length > 0 &&
            userList.indexOf(that.userInfo.username) >= 0;
        }

        //用户已经操作过，无法再次操作
        if (flag == true) {
          //提示收藏成功
          that.$message.warning("已经收藏成功，无须再次收藏！");

          //返回结果
          return result;
        } else {
          //修改本篇博文，收藏数+1，收藏用户+当前用户
          that.star = that.blogInfo["star"] = that.blogInfo["star"] + 1;

          //获取本篇本收藏用户列表
          var starUserList = (that.blogInfo["star_users"] = `${tools.deNull(
            that.blogInfo["star_users"]
          )},${that.userInfo.username}`);

          //博文信息
          var node = {
            id,
            star: that.star,
            star_users: starUserList
          };

          //提交修改信息
          result = await manageAPI.patchTableData("bs_blog", id, node);

          //提示收藏成功
          that.$message.warning("收藏成功！");

          //返回结果
          return result;
        }
      }, Math.random() * 1000);
    },
    /**
     * @function 点赞本篇博文处理函数
     */
    async handleLikeBlog() {
      var that = this;
      //延时执行函数
      setTimeout(async () => {
        //获取本篇博文ID
        var id = tools.queryUrlString("id");

        //获取博主信息
        var author = tools.queryUrlString("author");

        //获取时间戳信息
        var timestamp = new Date().getTime();

        //用户是否已经收藏本篇博文
        var flag = false;

        //提交修改信息
        var result = "";

        //获取博文内容信息
        if (tools.isNull(that.blogInfo)) {
          that.blogInfo = await manageAPI.queryTableData("bs_blog", id);
        }

        //如果点赞收藏用户不为空，则检查用户是否点赞/收藏过本博文
        if (!tools.isNull(that.blogInfo["like_users"])) {
          //获取已经点赞的用户信息
          var userList = tools.deNull(that.blogInfo["like_users"]).split(",");
          //检查用户是否已经点赞/收藏本篇博文
          flag =
            userList.length > 0 &&
            userList.indexOf(that.userInfo.username) >= 0;
        }

        //用户已经操作过，无法再次操作
        if (flag == true) {
          //提示点赞成功
          that.$message.warning("已经点赞成功，无须再次操作！");

          //返回结果
          return result;
        } else {
          //修改本篇博文，收藏数+1，收藏用户+当前用户 修改本篇博文，点赞数+1，点赞用户+当前用户
          that.likes = that.blogInfo["likes"] = that.blogInfo["likes"] + 1;

          //获取本篇本收藏用户列表
          var likeUserList = (that.blogInfo["like_users"] =
            tools.deNull(that.blogInfo["like_users"]) +
            "," +
            that.userInfo.username);

          //博文信息
          var node = {
            id,
            likes: that.likes,
            like_users: likeUserList
          };

          //提交修改信息
          result = await manageAPI.patchTableData("bs_blog", id, node);

          //提示点赞成功
          that.$message.warning("点赞成功！");

          //检查博主表中，博主是否初始化，如果未初始化，则初始化博主信息
          var authorBlogger = await manageAPI.queryTableData(
            "bs_blogger",
            author
          );

          //未获取到博主信息，则初始化博主信息
          if (tools.isNull(authorBlogger)) {
            //博主初始化信息
            authorBlogger = {
              id: author,
              origins: 0,
              stars: 1,
              comments: 0,
              visit_count: 0,
              blog_level: 1,
              blog_rank: 1000000,
              blog_score: 0,
              create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss")
            };
            //博主表中在博主的记录中，fans字段新增当前用户
            result = await manageAPI.postTableData("bs_blogger", authorBlogger);
          } else {
            //博主初始化信息
            authorBlogger = {
              id: author,
              stars: authorBlogger.stars + 1
            };
            //博主表中在博主的记录中，fans字段新增当前用户
            result = await manageAPI.patchTableData(
              "bs_blogger",
              author,
              authorBlogger
            );
          }

          //实时更新点赞数量
          this.starsCount = authorBlogger.stars;

          //返回结果
          return result;
        }
      }, Math.random() * 1000);
    },
    /**
     * @function 关注博主处理函数
     */
    async handleFollow(result) {
      //获取当前时间戳
      var timestamp = new Date().getTime();

      //获取当前用户
      var curuser = this.userInfo.username;

      //获取作者信息
      var author = tools.queryUrlString("author");

      //如果未获取到博主信息，则关注失败
      if (tools.isNull(author)) {
        //提示未获取到博主信息，关注失败
        this.$message.warning("未获取到博主信息，关注失败！");
        return false;
      }

      //不能关注自己
      if (author == curuser) {
        //提示未获取到博主信息，关注失败
        this.$message.warning("不能关注博主自己！");
        return false;
      }

      //检查博主表中，博主是否初始化，如果未初始化，则初始化博主信息
      var authorBlogger = await manageAPI.queryTableData("bs_blogger", author);

      //未获取到博主信息，则初始化博主信息
      if (tools.isNull(authorBlogger)) {
        //博主初始化信息
        authorBlogger = {
          id: author,
          origins: 0,
          stars: 0,
          comments: 0,
          visit_count: 0,
          blog_level: 1,
          blog_rank: 1000000,
          blog_score: 0,
          create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
          fans: `${curuser}`
        };
        //博主表中在博主的记录中，fans字段新增当前用户
        result = await manageAPI.postTableData("bs_blogger", authorBlogger);
      } else {
        //如果已经关注，则不需在关注
        if (!tools.deNull(authorBlogger.fans).includes(curuser)) {
          //博主初始化信息
          authorBlogger = {
            id: author,
            fans: `${authorBlogger.fans},${curuser}`
          };
          //博主表中在博主的记录中，fans字段新增当前用户
          result = await manageAPI.patchTableData(
            "bs_blogger",
            author,
            authorBlogger
          );
        }
      }

      //检查博主表中，当前用户是否初始化，如果未初始化，则初始化博主信息
      var curUserBlogger = await manageAPI.queryTableData(
        "bs_blogger",
        curuser
      );

      //未获取到当前用户的博主信息，则初始化博主信息
      if (tools.isNull(curUserBlogger)) {
        //博主初始化信息
        curUserBlogger = {
          id: curuser,
          origins: 0,
          stars: 0,
          comments: 0,
          visit_count: 0,
          blog_level: 1,
          blog_rank: 1000000,
          blog_score: 0,
          create_time: tools.formatDate(timestamp, "yyyy-MM-dd hh:mm:ss"),
          follows: `${author}`
        };
        //博主表中在博主的记录中，follows字段新增当前用户
        result = await manageAPI.postTableData("bs_blogger", curUserBlogger);
      } else {
        //如果已经关注，则不需在关注
        if (!curUserBlogger.follows.includes(author)) {
          //博主初始化信息
          curUserBlogger = {
            id: curuser,
            follows: `${curUserBlogger.follows},${author}`
          };
          //博主表中在当前用户的记录中，follows字段新增博主
          result = await manageAPI.patchTableData(
            "bs_blogger",
            curuser,
            curUserBlogger
          );
        }
      }

      //关注博主成功
      this.$message.warning("关注博主成功！");

      //定义返回信息
      return result;
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
.v-note-wrapper {
  position: relative;
  min-width: 300px;
  min-height: 300px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
  z-index: 0;
  text-align: left;
  border: 1px solid #f2f6fc;
  border-radius: 4px;
}
.ant-back-top {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  position: fixed;
  right: 5px;
  bottom: 50px;
  z-index: 10;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.ant-first-top {
  position: absolute;
  top: 20px;
  right: 0px;
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  button {
    position: absolute;
    top: 20px;
    right: 0px;
    z-index: 10;
    background: #3e3e3e;
    width: 42px;
    height: 42px;
    border-radius: 40px;
    div {
      position: absolute;
      top: 43px;
      left: 10px;
      font-size: 12px;
      color: #3e3e3e;
    }
  }
  .ant-first-icon {
    color: white;
    position: absolute;
    top: 12px;
    left: 11px;
    font-size: 18px;
  }
}
.ant-like-top {
  position: absolute;
  top: 60px;
  right: 0px;
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  button {
    position: absolute;
    top: 60px;
    right: 0px;
    z-index: 10;
    background: #3e3e3e;
    width: 42px;
    height: 42px;
    border-radius: 40px;
    div {
      position: absolute;
      top: 43px;
      left: 10px;
      font-size: 12px;
      color: #3e3e3e;
    }
  }
  .ant-like-icon {
    color: white;
    position: absolute;
    top: 11px;
    left: 11px;
    font-size: 22px;
  }
}
.ant-heart-top {
  position: absolute;
  top: 110px;
  right: 0px;
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  button {
    position: absolute;
    top: 110px;
    right: 0px;
    z-index: 10;
    background: #3e3e3e;
    width: 42px;
    height: 42px;
    border-radius: 40px;
    div {
      position: absolute;
      top: 43px;
      left: 5px;
      font-size: 12px;
      color: #3e3e3e;
    }
  }
  .ant-heart-icon {
    color: white;
    position: absolute;
    top: 13px;
    left: 11px;
    font-size: 18px;
  }
}
.ant-message-top {
  position: absolute;
  top: 150px;
  right: 0px;
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  button {
    position: absolute;
    top: 150px;
    right: 0px;
    z-index: 10;
    background: #3e3e3e;
    width: 42px;
    height: 42px;
    border-radius: 40px;
    div {
      position: absolute;
      top: 43px;
      left: 8px;
      font-size: 12px;
      color: #3e3e3e;
    }
  }
  .ant-message-icon {
    color: white;
    position: absolute;
    top: 13px;
    left: 13px;
    font-size: 16px;
  }
}
.ant-read-top {
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  button {
    position: absolute;
    top: 50px;
    right: 0px;
    z-index: 10;
    background: #3e3e3e;
    width: 42px;
    height: 42px;
    border-radius: 40px;
    div {
      position: absolute;
      top: 43px;
      left: 8px;
      font-size: 12px;
      text-align: center;
      color: #3e3e3e;
    }
  }
  .ant-read-icon {
    color: white;
    position: absolute;
    top: 13px;
    left: 11px;
    font-size: 18px;
  }
}
.ant-favor-top {
  position: absolute;
  top: 80px;
  right: 0px;
  z-index: 10;
  width: 45px;
  height: 45px;
  border-radius: 40px;
  button {
    position: absolute;
    top: 80px;
    right: 0px;
    z-index: 10;
    background: #3e3e3e;
    width: 42px;
    height: 42px;
    border-radius: 40px;
    div {
      position: absolute;
      top: 43px;
      left: 8px;
      font-size: 12px;
      color: #3e3e3e;
    }
  }
  .ant-favor-icon {
    color: white;
    position: absolute;
    top: 11px;
    left: 11px;
    font-size: 20px;
  }
}
</style>
