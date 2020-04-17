<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item label="真实姓名">
            <a-input :placeholder="userinfo.realname" v-model="fdata.realname" readonly />
          </a-form-item>

          <a-form-item label="昵称" :required="true">
            <a-input :placeholder="userinfo.nickname" v-model="fdata.nickname" />
          </a-form-item>

          <a-form-item label="头像" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-upload
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :action="uploadAction"
              :data="{'isup':1}"
              :headers="headers"
              :beforeUpload="beforeUpload"
              @change="handleChange"
            >
              <img
                v-if="picUrl"
                :src="getAvatarView()"
                alt="头像"
                style="height:104px;max-width:300px"
              />
              <div v-else>
                <a-icon :type="uploadLoading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
          </a-form-item>

          <a-form-item label="签名" :required="true">
            <a-textarea rows="4" :placeholder="userinfo.bio" v-model="fdata.bio" />
          </a-form-item>

          <a-form-item label="手机" :required="true">
            <a-input :placeholder="userinfo.phone" v-model="fdata.phone" />
          </a-form-item>

          <a-form-item label="邮件 (格式example@xxx.xxx)" :required="true">
            <a-input :placeholder="userinfo.email" v-model="fdata.email" />
          </a-form-item>

          <a-form-item label="生日 (格式yyyy-MM-dd)" :required="true">
            <a-input :placeholder="userinfo.birthday" v-model="fdata.birthday" />
          </a-form-item>

          <a-form-item label="地址 (当前所在地址)" :required="true">
            <a-input :placeholder="userinfo.address" v-model="fdata.address" />
          </a-form-item>

          <a-form-item label="身份证号" :required="true" style="margin-bottom:20px;">
            <a-input :placeholder="userinfo.idcard" v-model="fdata.idcard" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="postUserInfo();">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>

      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview">
          <img :src="avatar" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal"></avatar-modal>
  </div>
</template>

<script>
//import Vue from "vue";
import AvatarModal from "./AvatarModal";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import { getAction, patchTableData, queryTableData } from "@/api/manage";
import { addUser, editUser, queryUserRole, queryall } from "@/api/api";
import { disabledAuthFilter } from "@/utils/authFilter";
import { duplicateCheck } from "@/api/api";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
import * as storage from "@/utils/storage";

export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      // cropper
      preview: {},
      option: {
        img: "",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      avatar: "",
      userinfo: {},
      fdata: {},
      model: {},
      uploadLoading: false,
      confirmLoading: false,
      picUrl: "",
      url: {
        fileUpload:
          tools.deNull(window._CONFIG["domainURL"]) + "/sys/common/upload",
        imgerver: window._CONFIG["imgDomainURL"],
        userWithDepart: `${window._CONFIG["domain"]}/sys/user/userDepartList`, // 引入为指定用户查看部门信息需要的url
        userId: `${window._CONFIG["domain"]}/sys/user/generateUserId`, // 引入生成添加用户情况下的url
        syncUserByUserName: `${window._CONFIG["domain"]}/jeecg-boot/process/extActProcess/doSyncUserByUserName` //同步用户到工作流
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
    uploadAction: function() {
      return this.url.fileUpload;
    }
  },
  async created() {
    const token = Vue.ls.get(ACCESS_TOKEN);
    this.headers = { "X-Access-Token": token };
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

      //获取用户数据库数据
      this.v_user = await manageAPI.queryUserInfoByView(this.userInfo.username);

      //获取头像信息
      this.avatar = this.option.img =
        window._CONFIG["imgDomainURL"] + "/" + this.v_user[0]["avatar"];

      //设置用户基本信息
      this.userinfo.id = this.v_user[0]["id"];
      this.userinfo.realname = this.v_user[0]["realname"];
      this.userinfo.nickname = this.v_user[0]["nickname"];
      this.userinfo.bio = this.v_user[0]["bio"];
      this.userinfo.phone = this.v_user[0]["phone"];
      this.userinfo.email = this.v_user[0]["email"];
      this.userinfo.address = this.v_user[0]["address"];
      this.userinfo.idcard = this.v_user[0]["idcard"];
      this.userinfo.avatar = this.model.avatar;

      //格式化生日
      this.userinfo.birthday = tools.formatDate(
        this.v_user[0]["birthday"],
        "yyyy-MM-dd"
      );

      //获取fdata的值，以便基本设置页面可以展示用户信息，如果fdata的值为空，则使用userinfo的值
      this.fdata = await this.cloneData(this.fdata, this.userinfo);
    },
    /**
     * @function 克隆用户信息
     */
    async cloneData(fdata, userinfo) {
      fdata = {
        id: userinfo.id,
        nickname: tools.deNull(fdata.nickname, userinfo.nickname),
        bio: tools.deNull(fdata.bio, userinfo.bio),
        phone: tools.deNull(fdata.phone, userinfo.phone),
        email: tools.deNull(fdata.email, userinfo.email),
        birthday: tools.deNull(fdata.birthday, userinfo.birthday),
        address: tools.deNull(fdata.address, userinfo.address),
        avatar: tools.deNull(fdata.avatar, userinfo.avatar),
        idcard: tools.deNull(fdata.idcard, userinfo.idcard)
      };
      return fdata;
    },
    /**
     * @function 提交修改后的用户数据
     */
    async postUserInfo() {
      try {
        //设置头像信息
        this.userinfo.avatar = this.model.avatar;

        //获取fdata的值，如果fdata的值为空，则使用userinfo的值
        this.fdata = await this.cloneData(this.fdata, this.userinfo);

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
    },
    /**
     * @function 获取用户头像信息
     */
    getAvatarView() {
      return this.url.imgerver + "/" + this.model.avatar;
    },
    /**
     * @function 文件上传前检查函数
     */
    async beforeUpload(file) {
      var fileType = file.type;
      if (fileType.indexOf("image") < 0) {
        this.$message.warning("请上传图片");
        return false;
      }
      //TODO 验证文件大小
    },
    /**
     * @function 上传处理函数
     */
    async handleChange(info) {
      this.picUrl = "";
      if (info.file.status === "uploading") {
        this.uploadLoading = true;
        return;
      }

      //如果上传完毕，则根据返回结果设置头像信息
      if (info.file.status === "done") {
        var response = info.file.response;
        this.uploadLoading = false;

        console.log("上传后头像返回信息：" + response);
        console.log("上传后头像返回信息：" + JSON.stringify(response));

        if (response.success) {
          //获取返回后的头像地址信息
          this.model.avatar = response.message;

          //立即刷新头像信息
          this.avatar = this.option.img =
            window._CONFIG["imgDomainURL"] + "/" + response.message;

          //立即提交头像信息
          await this.postUserInfo();

          //设置pirurl内容
          this.picUrl = "Has no pic url yet";
        } else {
          this.$message.warning(response.message);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>