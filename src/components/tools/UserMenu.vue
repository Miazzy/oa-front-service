<template>
  <div class="user-wrapper" :class="theme">
    <span class="action" @click="showClick">
      <a-icon type="search" style="color:gray;"></a-icon>
    </span>

    <component
      :is="searchMenuComp"
      v-show="searchMenuVisible || isMobile()"
      class="borders"
      :visible="searchMenuVisible"
      title="搜索菜单"
      :footer="null"
      @cancel="searchMenuVisible=false"
    >
      <a-select
        class="search-input"
        showSearch
        :showArrow="false"
        placeholder="搜索菜单"
        optionFilterProp="children"
        :filterOption="filterOption"
        :open="isMobile()?true:null"
        :getPopupContainer="(node) => node.parentNode"
        :style="isMobile()?{width: '100%',marginBottom:'50px'}:{}"
        @change="searchMethods"
        @blur="hiddenClick"
      >
        <a-select-option
          v-for="(site,index) in searchMenuOptions"
          :key="index"
          :value="site.id"
        >{{site.meta.title}}</a-select-option>
      </a-select>
    </component>

    <header-notice class="action" style="color:gray;" />
    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="getAvatar()" />
        <span v-if="isDesktop()">用户管理</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'account-center' }">
            <a-icon type="user" />
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'account-settings-base' }">
            <a-icon type="setting" />
            <span>账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3" @click="systemSetting">
          <a-icon type="tool" />
          <span>系统设置</span>
        </a-menu-item>
        <a-menu-item key="4" @click="updatePassword">
          <a-icon type="setting" />
          <span>密码修改</span>
        </a-menu-item>
        <a-menu-item key="5" @click="updateCurrentDepart">
          <a-icon type="cluster" />
          <span>切换部门</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <span class="action">
      <a class="logout_title" href="javascript:;" @click="handleLogout">
        <a-icon type="logout" style="color:gray;" />
        <span v-if="isDesktop()">&nbsp;退出</span>
      </a>
    </span>
    <user-password ref="userPassword"></user-password>
    <depart-select ref="departSelect" :closable="true" title="部门切换"></depart-select>
    <setting-drawer ref="settingDrawer" :closable="true" title="系统设置"></setting-drawer>
  </div>
</template>

<script>
import HeaderNotice from "./HeaderNotice";
import UserPassword from "./UserPassword";
import SettingDrawer from "@/components/setting/SettingDrawer";
import DepartSelect from "./DepartSelect";
import { mapActions, mapGetters, mapState } from "vuex";
import { mixinDevice } from "@/utils/mixin.js";

export default {
  name: "UserMenu",
  mixins: [mixinDevice],
  data() {
    return {
      // update-begin author:sunjianlei date:20200219 for: 头部菜单搜索规范命名 --------------
      searchMenuOptions: [],
      searchMenuComp: "span",
      searchMenuVisible: false
      // update-begin author:sunjianlei date:20200219 for: 头部菜单搜索规范命名 --------------
    };
  },
  components: {
    HeaderNotice,
    UserPassword,
    DepartSelect,
    SettingDrawer
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: "dark"
    }
  },
  /* update_begin author:zhaoxin date:20191129 for: 做头部菜单栏导航*/
  created() {
    let lists = [];
    this.searchMenus(lists, this.permissionMenuList);
    this.searchMenuOptions = [...lists];
  },
  computed: {
    ...mapState({
      // 后台菜单
      permissionMenuList: state => state.user.permissionList
    })
  },
  /* update_end author:zhaoxin date:20191129 for: 做头部菜单栏导航*/
  watch: {
    // update-begin author:sunjianlei date:20200219 for: 菜单搜索改为动态组件，在手机端呈现出弹出框
    device: {
      immediate: true,
      handler() {
        this.searchMenuVisible = false;
        this.searchMenuComp = this.isMobile() ? "a-modal" : "span";
      }
    }
    // update-end author:sunjianlei date:20200219 for: 菜单搜索改为动态组件，在手机端呈现出弹出框
  },
  methods: {
    /* update_begin author:zhaoxin date:20191129 for: 做头部菜单栏导航*/
    showClick() {
      this.searchMenuVisible = true;
    },
    hiddenClick() {
      this.shows = false;
    },
    /* update_end author:zhaoxin date:20191129 for: 做头部菜单栏导航*/
    ...mapActions(["Logout"]),
    ...mapGetters(["nickname", "avatar", "userInfo"]),
    getAvatar() {
      console.log(
        "url = " + window._CONFIG["imgDomainURL"] + "/" + this.avatar()
      );
      return window._CONFIG["imgDomainURL"] + "/" + this.avatar();
    },
    handleLogout() {
      //确认注销登录
      this.$confirm_({
        title: "确认操作",
        content: "真的要注销登录吗 ?",
        onOk: async () => {
          this.Logout({})
            .then(() => {
              this.$message.info("注销登陆成功！");
              setTimeout(() => {
                window.location.href = "/";
              }, 300);
            })
            .catch(err => {
              this.$message.error("注销登陆异常！");
              console.log(err);
            });
        }
      });
    },
    updatePassword() {
      let username = this.userInfo().username;
      this.$refs.userPassword.show(username);
    },
    updateCurrentDepart() {
      this.$refs.departSelect.show();
    },
    systemSetting() {
      this.$refs.settingDrawer.showDrawer();
    },
    /* update_begin author:zhaoxin date:20191129 for: 做头部菜单栏导航*/
    searchMenus(arr, menus) {
      for (let i of menus) {
        if (!i.hidden && "layouts/RouteView" !== i.component) {
          arr.push(i);
        }
        if (i.children && i.children.length > 0) {
          this.searchMenus(arr, i.children);
        }
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // update_begin author:sunjianlei date:20191230 for: 解决外部链接打开失败的问题
    searchMethods(value) {
      let route = this.searchMenuOptions.filter(item => item.id === value)[0];
      if (
        route.meta.internalOrExternal === true ||
        route.component.includes("layouts/IframePageView")
      ) {
        window.open(route.meta.url, "_blank");
      } else {
        this.$router.push({ path: route.path });
      }
      this.searchMenuVisible = false;
    }
    // update_end author:sunjianlei date:20191230 for: 解决外部链接打开失败的问题
    /*update_end author:zhaoxin date:20191129 for: 做头部菜单栏导航*/
  }
};
</script>

<style lang="less" scoped>
/* update_begin author:zhaoxin date:20191129 for: 让搜索框颜色能随主题颜色变换*/
/* update-begin author:sunjianlei date:20191220 for: 解决全局样式冲突问题 */
.user-wrapper .search-input {
  width: 180px;
  color: inherit;

  /deep/ .ant-select-selection {
    background-color: inherit;
    border: 0;
    border-bottom: 1px solid white;
    &__placeholder,
    &__field__placeholder {
      color: inherit;
    }
  }
}
/* update-end author:sunjianlei date:20191220 for: 解决全局样式冲突问题 */
/* update_end author:zhaoxin date:20191129 for: 让搜索框颜色能随主题颜色变换*/
</style>

<style scoped>
.logout_title {
  color: inherit;
  text-decoration: none;
}
</style>