<template>
  <div class="antd-pro-components-article-list-content-index-listContent">
    <div class="description">
      <slot>{{ description.slice(0,120) + '...' }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleListContent",
  props: {
    prefixCls: {
      type: String,
      default: "antd-pro-components-article-list-content-index-listContent"
    },
    description: {
      type: String,
      default: ""
    },
    owner: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    },
    updateAt: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.antd-pro-components-article-list-content-index-listContent {
  .description {
    max-width: 1024px;
    line-height: 22px;
  }
  .extra {
    margin-top: 16px;
    line-height: 22px;

    & /deep/ .ant-avatar {
      position: relative;
      top: 1px;
      width: 20px;
      height: 20px;
      margin-right: 8px;
      vertical-align: top;
    }

    & > em {
      margin-left: 16px;
      font-style: normal;
    }
  }
}

.ant-list-vertical {
  .ant-list-item-action  {
    margin-left: auto;
    position: absolute;
    display: block;
    left: 135px;
    top: 150px;
  }
}

.ant-list-item-action  {
    margin-left: auto;
    position: absolute;
    display: block;
    left: 135px;
    top: 150px;
  }
</style>
