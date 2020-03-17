<template>
  <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <icon-text type="star-o" :text="item.star" />
        <icon-text type="like-o" :text="item.like" />
        <icon-text type="message" :text="item.message" />
      </template>
      <a-list-item-meta>
        <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag v-for="(tag, index) in item.tags.split(',')" :key="index">{{tag}}</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content
        :description="item.description"
        :owner="item.owner"
        :avatar="item.avatar"
        :href="item.href"
        :updateAt="item.updatedAt"
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
      data: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .get("/list/article")
        .then(res => {
          console.log("res", res);
          this.data.push({
            id: "28288281",
            star: 100,
            like: 100,
            message: 10,
            title: "测试数据",
            tags: "标签一,标签二",
            description: "描述信息...",
            owner: "zhaoziyu",
            href: "https://www.baidu.com",
            updatedAt: "2017-10-03 19:23:12"
          });
          this.loading = false;
        })
        .catch(err => {
          this.data.push({
            id: "28288281",
            star: 100,
            like: 100,
            message: 10,
            title: "测试数据",
            tags: "标签一,标签二",
            description:
              "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
            owner: "zhaoziyu",
            href: "https://www.baidu.com",
            updatedAt: "2017-10-03  19:23:12"
          });
          this.loading = false;
        });
    },
    loadMore() {
      this.loadingMore = true;
      this.$http
        .get("/list/article")
        .then(res => {
          this.data = this.data.concat(res.result);
        })
        .finally(() => {
          this.loadingMore = false;
        });
    }
  }
};
</script>

<style scoped></style>
