<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="getAvatar()" />
            </div>
            <div class="username">{{ nickname() }}</div>
            <div class="bio">{{bio}}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title"></i>
              {{postName}}
            </p>
            <p>
              <i class="group"></i>
              {{departName}}
            </p>
            <p>
              <i class="address"></i>
              <span>{{address}}</span>
            </p>
          </div>
          <a-divider />

          <div class="account-center-tags">
            <div class="tagsTitle">标签</div>
            <div>
              <template v-for="(tag, index) in tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag
                    :key="tag"
                    :index="index"
                    :closable="true"
                    :afterClose="() => handleTagClose(tag)"
                    @close="() => handleClose(tag)"
                  >{{ `${tag.slice(0, 20)}...` }}</a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  :key="tag"
                  :index="index"
                  :closable="true"
                  :afterClose="() => handleTagClose(tag)"
                  @close="() => handleClose(tag)"
                >{{ tag }}</a-tag>
              </template>
              <a-input
                v-if="tagInputVisible"
                ref="tagInput"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                :value="tagInputValue"
                @change="handleInputChange"
                @blur="handleTagInputConfirm"
                @keyup.enter="handleTagInputConfirm"
              />
              <a-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
                <a-icon type="plus" />New Tag
              </a-tag>
            </div>
          </div>
          <a-divider :dashed="true" />

          <div class="account-center-team">
            <div class="teamTitle">团队</div>
            <a-spin :spinning="teamSpinning">
              <div class="members">
                <a-row>
                  <a-col :span="12" v-for="(item, index) in teams" :key="index">
                    <a>
                      <a-avatar size="small" :src="item.avatar" />
                      <span class="member">{{ item.name }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <article-page v-if="noTitleKey === 'article'"></article-page>
          <!-- 
          <app-page v-else-if="noTitleKey === 'app'"></app-page>
          <project-page v-else-if="noTitleKey === 'project'"></project-page>
          -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PageLayout from "@/components/page/PageLayout";
import RouteView from "@/components/layouts/RouteView";
import { AppPage, ArticlePage, ProjectPage } from "./page";
import { mapGetters } from "vuex";
import * as manageAPI from "@/api/manage";
import * as storage from "@/utils/storage";

export default {
  components: {
    RouteView,
    PageLayout,
    AppPage,
    ArticlePage,
    ProjectPage
  },
  data() {
    return {
      tags: [],
      postName: "",
      departName: "",
      address: "",
      bio: "",
      tagInputVisible: false,
      tagInputValue: "",

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: "article",
          tab: "文章"
        }
      ],
      fdata: null,
      userinfo: null,
      v_user: null,
      noTitleKey: "article"
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
    //设置员工岗位信息/部门信息
    try {
      this.v_user = await manageAPI.queryUserInfoByView(this.user.username);

      this.postName = this.v_user[0]["post"];
      this.departName = this.v_user[0]["name"];
      this.address = this.v_user[0]["address"];
      this.bio = this.v_user[0]["bio"];
      this.avatar = this.v_user[0]["avatar"];

      this.v_user[0]["tags"] = this.v_user[0]["tags"].replace(/，/g, ",");
      this.tags = this.v_user[0]["tags"].split(",");
    } catch (error) {
      console.log("工作台设置员工岗位信息/部门信息异常：" + error);
    }
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    ...mapGetters(["nickname", "avatar"]),
    getAvatar() {
      return window._CONFIG["imgDomainURL"] + "/" + this.avatar;
    },
    getTeams() {
      this.$http.get("/api/workplace/teams").then(res => {
        this.teams = res.result;
        this.teamSpinning = false;
      });
    },

    async handleTabChange(key, type) {
      this[type] = key;
    },

    async handleTagClose(removeTag) {
      const tags = this.tags.filter(tag => tag != removeTag);
      this.tags = tags;

      try {
        //待保存数据
        this.fdata = { tags: tags.toString() };

        //获取用户信息
        this.v_user = await manageAPI.queryUserInfoByView(
          this.userInfo.username
        );

        //此次设置用户岗位
        await manageAPI.patchTableData(
          "sys_user",
          this.v_user[0].id,
          this.fdata
        );

        //属性合并
        this.v_user[0] = Object.assign({}, this.v_user[0], this.fdata);

        //用户信息修改，修改缓存信息
        storage.setStore(
          `system_v_user_info@username$${this.userInfo.username}`,
          this.v_user,
          3600 * 24
        );
      } catch (error) {
        console.log(error);
      }
    },

    async showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        this.$refs.tagInput.focus();
      });
    },

    async handleInputChange(e) {
      this.tagInputValue = e.target.value;
    },

    async handleTagInputConfirm() {
      //获取输入数据
      const inputValue = this.tagInputValue;

      //定义tags内容
      var tags = this.tags;

      try {
        //将新输入的tag加入tags
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
      } catch (error) {
        console.log(error);
      }

      try {
        //待保存数据
        this.fdata = { tags: tags.toString() };

        //获取用户信息
        this.v_user = await manageAPI.queryUserInfoByView(
          this.userInfo.username
        );

        //此次设置用户岗位
        await manageAPI.patchTableData(
          "sys_user",
          this.v_user[0].id,
          this.fdata
        );

        //属性合并
        this.v_user[0] = Object.assign({}, this.v_user[0], this.fdata);

        //用户信息修改，修改缓存信息
        storage.setStore(
          `system_v_user_info@username$${this.userInfo.username}`,
          this.v_user,
          3600 * 24
        );
      } catch (error) {
        console.log(error);
      }

      try {
        Object.assign(this, {
          tags,
          tagInputVisible: false,
          tagInputValue: ""
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
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
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
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
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>