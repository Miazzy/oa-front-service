# 基于Ant Design Pro 开发 ，项目名：OA Vue v1.0.0


## Overview

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 实现的 Ant Design Pro Vue 版
Jeecg-boot 的前段 UI 框架，采用前后端分离方案，提供强大代码生成器的快速开发平台。
前端页面代码和后端功能代码一键生成，不需要写任何代码，保持 jeecg 一贯的强大！！

本项目是基于Jeecg-Boot开发，鉴于Jeecg-Boot开源版本，工作流相关模块闭源，且开源版本没有工作流功能，故开发此版本。

此版本的目前工作流比较简陋，后续会补充加签、会签、和更加审批内容，动态选择流程的功能。

#### 前端技术

- 基础框架：[ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- JavaScript 框架：Vue
- Webpack
- node
- yarn
- eslint
- @vue/cli 3.2.1
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation) - antv/g2 封装实现

## 项目下载和运行

- 拉取项目代码

```bash
git clone https://gitee.com/yunwisdoms/oa-front-service.git .
```

- 安装依赖

```
yarn install
```

- 开发模式运行

```
yarn run serve
```

- 编译项目

```
yarn run build
```

- Lints and fixes files

```
yarn run lint
```

## 其他说明

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请更新您的 cli

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码

- 修改 Ant Design 配色，在文件 `vue.config.js` 中，其他 less 变量覆盖参考 [ant design](https://ant.design/docs/react/customize-theme-cn)

官方说明

```ecmascript 6
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  }
```

## 项目截图

首页，含有我的待办，我的已办，行政公告，红头文件，新闻资讯，市场观察等内容，提交审批后，待处理人会收到我的待办消息，点击进入我的审批详情进行审批操作

![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/094940_0ccdd375_499098.png "截屏2020-01-1509.31.38.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095056_22ae1ea5_499098.png "截屏2020-01-1509.34.34.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095105_482885e8_499098.png "截屏2020-01-1509.34.40.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095114_1758bd86_499098.png "截屏2020-01-1509.35.29.png")

审批流程详情页面，点击‘打码’按钮可以生成二维码，手机扫码后，可以直接跳转到此详情页面
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095122_88d97d9f_499098.png "截屏2020-01-1509.35.35.png")

审批流程详情页面，点击‘打码’按钮可以生成短链接，浏览器打开短链接，可以直接跳转到此审批详情页面

![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095221_a185070d_499098.png "截屏2020-01-1509.35.42.png")
审批流程详情页面，上传的附件，可以进行预览，支持Office、PDF、图片预览，后续添加音频、视频等多媒体文件播放功能，Office文档上传后，会触发文档转PDF任务，在文档转换期间，如果预览文档，则调用KKfileView进行预览文档，转换完毕，且文档存在于服务器后端，则直接用已经转换完毕的完毕的PDF文档进行预览，上传的图片会被压缩处理，并生成100x60的缩略图。

![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095308_29e8a2d0_499098.png "截屏2020-01-1509.35.50.png")
![![![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095437_4e526d78_499098.png "截屏2020-01-1509.36.24.png")](https://images.gitee.com/uploads/images/2020/0115/095431_5c57d6fa_499098.png "截屏2020-01-1509.36.17.png")](https://images.gitee.com/uploads/images/2020/0115/095424_bfb9dee9_499098.png "截屏2020-01-1509.36.11.png")![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/154450_3466efff_499098.png "截屏2020-01-1515.43.48.png")

## 附属文档

- [Ant Design Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn)

- [报表 viser-vue](https://viserjs.github.io/demo.html#/viser/bar/basic-bar)

- [Vue](https://cn.vuejs.org/v2/guide)

- [路由/菜单说明](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/router/README.md)

- [ANTD 默认配置项](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/defaultSettings.js)

- 其他待补充...

## 备注

> @vue/cli 升级后，eslint 规则更新了。由于影响到全部 .vue 文件，需要逐个验证。既暂时关闭部分原本不验证的规则，后期维护时，在逐步修正这些 rules
