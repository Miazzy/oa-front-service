<template>
  <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <a style="color:#303030;">
          <icon-text type="star-o" :text="item.star" />
        </a>
        <a style="color:#303030;">
          <icon-text type="like-o" :text="item.likes" />
        </a>
        <a style="color:#303030;">
          <icon-text type="message" :text="item.messages" />
        </a>
        <a style="color:#303030;" @click="handleBlogEdit(item)">
          <icon-text type="profile" text="编辑"></icon-text>
        </a>
        <a style="color:#303030;" @click="handleBlogDelete(item)">
          <icon-text type="delete" text="删除"></icon-text>
        </a>
      </template>
      <a-list-item-meta>
        <a slot="title" @click="handleBlogView(item)">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag v-for="(tag, index) in item.page_tags.split(',')" :key="index">{{tag}}</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content
        :description="item.description"
        :owner="item.create_by"
        :avatar="item.avatar"
        :updateAt="item.createtime"
        @click="handleBlogView(item)"
      />
    </a-list-item>
    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<script>
import ArticleListContent from "./ArticleListContent";
import IconText from "@/views/list/search/components/IconText";

import * as manageAPI from "@/api/manage";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";
//import * as _ from "underscore";

export default {
  name: "Article",
  components: {
    IconText,
    ArticleListContent
  },
  data() {
    return {
      loading: true,
      loadingMore: false,
      data: [],
      page: 0,
      size: 50
    };
  },
  mounted() {
    //获取博文数据
    this.getList().then(item => {
      console.log(item);
    });
  },
  methods: {
    /**
     * @function 获取博文数据函数
     */
    async getList() {
      //获取当前登录用户
      var userInfo = storage.getStore("cur_user");
      //博文数据
      var blist = await manageAPI.queryBlogInfoByUser(
        userInfo.username,
        this.page,
        this.size
      );
      //显示加载图标
      //this.loading = true;
      //添加最新数据
      this.data = this.data.concat(blist);
      //关闭加载图标
      this.loading = false;
      //新增查询页面
      this.page++;
      //返回结果
      return "";
    },
    /**
     * @function 加载更多数据函数
     */
    async loadMore() {
      //获取当前登录用户
      var userInfo = storage.getStore("cur_user");
      //显示加载图标
      this.loadingMore = true;
      //获取返回数据结果
      var blist = await manageAPI.queryBlogInfoByUser(
        userInfo.username,
        this.page,
        this.size
      );
      //数据合并
      this.data = this.data.concat(blist);
      //新增查询页面
      this.page++;
      //延时加载数据
      setTimeout(async () => {
        //关闭加载图标
        this.loadingMore = false;
      }, 1000);
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
     * @function 处理博文预览功能
     */
    async handleBlogEdit(item) {
      try {
        //标签
        var tags = tools.deNull(item.tags);
        //跳转到博文详情页面
        this.$router.push(
          `/blog/center?id=${item.id}&author=${item.create_by}&tags=${tags}`
        );
      } catch (error) {
        console.log("$router go to error :" + error);
      }
    },
    /**
     * @function 删除本篇博文
     */
    async handleBlogDelete(item) {
      //确认是否删除博文
      this.$confirm_({
        title: "确认操作",
        content: "是否确认删除本篇博文（删除后不可恢复）?",
        onOk: async () => {
          try {
            //关闭加载图标
            this.loading = true;

            //删除本篇博文
            await manageAPI.deleteTableData("bs_blog", item.id);

            //初始化数据
            this.data = window.__.reject(this.data, blog => {
              return blog.id == item.id;
            });

            //关闭加载图标
            this.loading = false;
          } catch (error) {
            console.log("$router go to error :" + error);
          }
        }
      });
    }
  }
};
</script>

<style scoped></style>
