<template>
  <div class="user-wrapper" :class="theme">
    <header-notice class="action" />
    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
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
        <a-icon type="logout" />
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
import { mapActions, mapGetters } from "vuex";
import { mixinDevice } from "@/utils/mixin.js";

export default {
  name: "UserMenu",
  mixins: [mixinDevice],
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
  methods: {
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
              this.$message_.info("注销登陆成功！");
              setTimeout(() => {
                window.location.href = "/";
              }, 300);
            })
            .catch(err => {
              this.$message_.err("注销登陆异常！");
              console.log(err);
            });
        }
      });

      // this.$confirm("真的要注销登录吗 ?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {})
      //   .catch(() => {
      //     this.$message({
      //       type: "warning",
      //       message: "取消操作！"
      //     });
      //   });
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
    }
  }
};
</script>

<style scoped>
.logout_title {
  color: inherit;
  text-decoration: none;
}
</style>