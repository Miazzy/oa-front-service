<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
            <span v-if="item.value">:</span>
            <span class="security-list-value">{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>

    <a-row :gutter="16" style="margin-top:25px;">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item label="手机" :required="true">
            <a-input :placeholder="userinfo.phone" v-model="fdata.phone" />
          </a-form-item>

          <a-form-item label="邮件 (格式example@xxx.xxx)" :required="true">
            <a-input :placeholder="userinfo.email" v-model="fdata.email" />
          </a-form-item>

          <a-form-item label="身份证号" :required="true" style="margin-bottom:20px;">
            <a-input :placeholder="userinfo.idcard" v-model="fdata.idcard" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="postUserInfo();">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>


<script>
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
import * as storage from "@/utils/storage";

export default {
  data() {
    return {
      data: [],
      fdata: {},
      userinfo: {}
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    await this.loadData();
  },
  methods: {
    /**
     * @function 获取用户基本信息
     */
    async loadData() {
      //清空缓存数据
      storage.clearStore(
        `system_v_user_info@username$${this.userInfo.username}`
      );

      //查询数据库，获取用户信息
      this.v_user = await manageAPI.queryUserInfoByView(this.userInfo.username);

      //设置用户基本信息
      this.userinfo.phone = this.v_user[0]["phone"];
      this.userinfo.email = this.v_user[0]["email"];
      this.userinfo.idcard = this.v_user[0]["idcard"];

      //克隆数据
      this.fdata = Object.assign({}, this.userinfo);

      //获取fdata的值，以便基本设置页面可以展示用户信息，如果fdata的值为空，则使用userinfo的值
      this.data = [
        {
          title: "账户密码",
          description: "当前密码强度",
          value: "强"
        },
        {
          title: "密保手机",
          description: "已绑定手机",
          value: this.userinfo.phone
        },
        {
          title: "密保邮箱",
          description: "已绑定邮箱",
          value: this.userinfo.email
        },
        {
          title: "身份证号",
          description: "已绑定身份证号码",
          value: this.userinfo.idcard
        },
        {
          title: "密保问题",
          description: "未设置密保问题，密保问题可有效保护账户安全",
          value: ""
        }
      ];
    },
    /**
     * @function 提交修改后的用户数据
     */
    async postUserInfo() {
      try {
        //此次设置用户岗位
        await manageAPI.patchTableData(
          "sys_user",
          this.userinfo.id,
          this.fdata
        );

        //获取用户信息
        this.v_user = await manageAPI.queryUserInfoByView(
          this.userInfo.username
        );

        //属性合并
        this.v_user[0] = Object.assign({}, this.v_user[0], this.fdata);

        //用户信息修改，修改缓存信息
        storage.setStore(
          `system_v_user_info@username$${this.userInfo.username}`,
          this.v_user,
          3600 * 24
        );

        //打印保存后的数据
        console.log("user info :" + JSON.stringify(this.v_user[0]));

        this.$message.success("保存信息成功！");
        this.$emit("ok");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
</style>