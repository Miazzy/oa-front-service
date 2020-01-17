<template>
  <div class="main" style="">
    <a-form
      :form="form"
      class="user-layout-login"
      ref="formLogin"
      id="formLogin"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{textAlign: 'center', borderBottom: 'unset'}"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登陆">
          <a-form-item>
            <a-input
              size="large"
              v-decorator="[
                'username',
                validatorRules.username,
                {validator: this.handleUsernameOrEmail},
              ]"
              type="text"
              placeholder="请输入帐户名"
            >
              <a-icon
                slot="prefix"
                type="user"
                :style="{color: 'rgba(0,0,0,.25)'}"
              />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              v-decorator="['password', validatorRules.password]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                :style="{color: 'rgba(0,0,0,.25)'}"
              />
            </a-input>
          </a-form-item>

          <a-row :gutter="0">
            <a-col :span="14">
              <a-form-item>
                <a-input
                  v-decorator="['inputCode', validatorRules.inputCode]"
                  size="large"
                  type="text"
                  @change="inputCodeChange"
                  placeholder="请输入验证码"
                >
                  <a-icon
                    slot="prefix"
                    v-if="inputCodeContent == verifiedCode"
                    type="smile"
                    :style="{color: 'rgba(0,0,0,.25)'}"
                  />
                  <a-icon
                    slot="prefix"
                    v-else
                    type="frown"
                    :style="{color: 'rgba(0,0,0,.25)'}"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <j-graphic-code
                @success="generateCode"
                style="float: right"
              ></j-graphic-code>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登陆">
          <a-form-item>
            <a-input
              v-decorator="['mobile', validatorRules.mobile]"
              size="large"
              type="text"
              placeholder="手机号"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                :style="{color: 'rgba(0,0,0,.25)'}"
              />
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  v-decorator="['captcha', validatorRules.captcha]"
                  size="large"
                  type="text"
                  placeholder="请输入验证码"
                >
                  <a-icon
                    slot="prefix"
                    type="mail"
                    :style="{color: 'rgba(0,0,0,.25)'}"
                  />
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="
                  (!state.smsSendBtn && '获取验证码') || state.time + ' s'
                "
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-model="formLogin.rememberMe" style="color:black;"
          >记住密码</a-checkbox
        >
        <a-checkbox v-model="formLogin.autoLogin" style="color:black;"
          >自动登陆</a-checkbox
        >
        <router-link
          :to="{name: 'alteration'}"
          class="forge-password"
          style="float: right;"
        >
          忘记密码
        </router-link>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn"
          >确定</a-button
        >
      </a-form-item>

      <div class="user-login-other">
        <span>其他登陆方式</span>
        <a><a-icon class="item-icon" type="alipay-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="taobao-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="weibo-circle"></a-icon></a>
        <a><a-icon class="item-icon" type="wechat"></a-icon></a>
        <router-link class="register" :to="{name: 'register'}">
          注册账户
        </router-link>
      </div>
    </a-form>

    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>

    <a-modal
      title="登录部门选择"
      :width="450"
      :visible="departVisible"
      :closable="false"
      :maskClosable="false"
    >
      <template slot="footer">
        <a-button type="primary" @click="departOk">确认</a-button>
      </template>

      <a-form>
        <a-form-item
          :labelCol="{span: 4}"
          :wrapperCol="{span: 20}"
          style="margin-bottom:10px"
          :validate-status="validate_status"
        >
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>您隶属于多部门，请选择登录部门</span>
            </template>
            <a-avatar style="backgroundColor:#87d068" icon="gold" />
          </a-tooltip>
          <a-select
            @change="departChange"
            :class="{'valid-error': validate_status == 'error'}"
            placeholder="请选择登录部门"
            style="margin-left:10px;width: 80%"
          >
            <a-icon slot="suffixIcon" type="gold" />
            <a-select-option
              v-for="d in departList"
              :key="d.id"
              :value="d.orgCode"
              >{{ d.departName }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
//import md5 from "md5"
import api from '@/api';
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha';
import {mapActions} from 'vuex';
import {timeFix, deNull} from '@/utils/util';
import Vue from 'vue';
import {ACCESS_TOKEN, ENCRYPTED_STRING} from '@/store/mutation-types';
import JGraphicCode from '@/components/jeecg/JGraphicCode';
import {putAction} from '@/api/manage';
import {postAction} from '@/api/manage';
import {encryption, getEncryptedString} from '@/utils/encryption/aesEncrypt';
import store from '@/store/';
import {setStore, getStore, clearStore, clearAll} from '@/utils/storage';
import {USER_INFO} from '@/store/mutation-types';
import CryptoJS from 'crypto-js';
import crypto from '@/assets/crypto';

//注册crypto
Vue.use(crypto);

export default {
  components: {
    TwoStepCaptcha,
    JGraphicCode,
  },
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      encryptedString: {
        key: '',
        iv: '',
      },
      state: {
        time: 60,
        smsSendBtn: false,
      },
      formLogin: {
        username: '',
        password: '',
        captcha: '',
        mobile: '',
        rememberMe: false,
        autoLogin: false,
      },
      validatorRules: {
        username: {
          rules: [
            {required: true, message: '请输入用户名!', validator: 'click'},
          ],
        },
        password: {
          rules: [{required: true, message: '请输入密码!', validator: 'click'}],
        },
        mobile: {rules: [{validator: this.validateMobile}]},
        captcha: {rule: [{required: true, message: '请输入验证码!'}]},
        inputCode: {
          rules: [
            {required: true, message: '请输入验证码!'},
            {validator: this.validateInputCode},
          ],
        },
      },
      verifiedCode: '',
      inputCodeContent: '',
      inputCodeNull: true,

      departList: [],
      departVisible: false,
      departSelected: '',
      currentUsername: '',
      validate_status: '',
    };
  },
  created() {
    //删除token信息
    Vue.ls.remove(ACCESS_TOKEN);

    //获取路由信息
    this.getRouterData();

    //等待页面加载后，设置快速登录
    setTimeout(() => {
      try {
        //获取用户信息
        var info = getStore('__LOGIN_ACCOUNT__');

        //如果没有获取到缓存信息，则不自动设置为记住密码、自动登录
        if (typeof info == 'undefined' || info == null || info == '') {
          this.formLogin.autoLogin = false;
          this.formLogin.rememberMe = false;
        } else {
          //先进行AES解密，转为Base64代码
          info = this.decodeAES(this.decodeAES(info));
          //先进行DES解密，转为Base64代码
          info = this.decodeDES(this.decodeDES(info));
          //解密Base64代码，转为字符串
          info = window.atob(window.atob(window.atob(info)));
          //解析字符串，转为json对象
          info = JSON.parse(info);

          this.formLogin.autoLogin = info.auto_login;
          this.formLogin.rememberMe = info.remember_me;

          //如果用户上次登录，勾选了记住账户，则直接回填数据
          if (info.remember_me == true) {
            this.form.setFieldsValue({
              username: info.username,
            });
            this.form.setFieldsValue({
              password: info.password,
            });
            this.form.setFieldsValue({
              inputCode: this.verifiedCode,
            });
          }

          //如果设置了自动登录，则调用登录函数
          if (info.auto_login == true) {
            setTimeout(() => {
              //再次检查自动登录是否勾选，防止出现同时勾选记住密码和自动登录后，一旦弹出到登录页面，还没来得及修改登录账户时，直接又登录上去
              if (this.formLogin.autoLogin == true) {
                this.handleSubmit();
              }
            }, 1500);
          }
        }
      } catch (error) {
        console.log('获取用户信息异常：' + error);
      }
    }, 1000);
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'PhoneLogin']),
    // handler
    handleUsernameOrEmail(rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        this.loginType = 0;
      } else {
        this.loginType = 1;
      }
      callback();
    },
    handleTabClick(key) {
      this.customActiveKey = key;
      // this.form.resetFields()
    },
    handleSubmit() {
      let that = this;
      let loginParams = {
        remember_me: that.formLogin.rememberMe,
        auto_login: that.formLogin.autoLogin,
      };
      that.loginBtn = true;
      // 使用账户密码登陆
      if (that.customActiveKey === 'tab1') {
        that.form.validateFields(
          ['username', 'password', 'inputCode'],
          {force: true},
          (err, values) => {
            if (!err) {
              loginParams.username = values.username;
              loginParams.password = values.password;

              //如果含有记住我的功能，则将账户/密码存入浏览器中
              if (loginParams.remember_me == true) {
                //获取用户登录信息字符串代码
                var secrets = JSON.stringify(loginParams);
                //对用户信息进行Base64加密操作
                secrets = window.btoa(window.btoa(window.btoa(secrets)));
                //对Base64进行DES加密 //将登录信息转为Base64 //console.log('secrets to base64 : ' + secrets);
                secrets = this.encodeDES(this.encodeDES(secrets));
                //对Base64进行AES加密 //将Base64转为des //console.log('secrets to des : ' + secrets);
                secrets = this.encodeAES(this.encodeAES(secrets));
                //保存账户缓存信息 //将des转为aes加密串 //console.log('secrets to aes : ' + secrets);
                setStore('__LOGIN_ACCOUNT__', secrets, 7 * 24 * 60 * 60 * 1000);
              } else {
                //清除账户缓存信息
                clearStore('__LOGIN_ACCOUNT__');
              }

              that
                .Login(loginParams)
                .then(res => {
                  try {
                    setStore('cur_user', res['result']['userInfo'], 36000);
                    this.departConfirm(res);
                  } catch (err) {
                    console.log(err);
                  }
                })
                .catch(err => {
                  that.requestFailed(err);
                });
            } else {
              that.loginBtn = false;
            }
          }
        );
        // 使用手机号登陆
      } else {
        that.form.validateFields(
          ['mobile', 'captcha'],
          {force: true},
          (err, values) => {
            if (!err) {
              loginParams.mobile = values.mobile;
              loginParams.captcha = values.captcha;
              that
                .PhoneLogin(loginParams)
                .then(res => {
                  console.log(res.result);
                  this.departConfirm(res);
                })
                .catch(err => {
                  that.requestFailed(err);
                });
            }
          }
        );
      }
    },
    getCaptcha(e) {
      e.preventDefault();
      let that = this;
      this.form.validateFields(['mobile'], {force: true}, (err, values) => {
        if (!values.mobile) {
          that.cmsFailed('请输入手机号');
        } else if (!err) {
          this.state.smsSendBtn = true;
          let interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 60;
              that.state.smsSendBtn = false;
              window.clearInterval(interval);
            }
          }, 1000);

          const hide = this.$message.loading('验证码发送中..', 0);
          let smsParams = {};
          smsParams.mobile = values.mobile;
          smsParams.smsmode = '0';
          postAction(`${window._CONFIG['domain']}/sys/sms`, smsParams)
            .then(res => {
              if (!res.success) {
                setTimeout(hide, 0);
                this.cmsFailed(res.message);
              }
              console.log(res);
              setTimeout(hide, 500);
            })
            .catch(err => {
              setTimeout(hide, 1);
              clearInterval(interval);
              that.state.time = 60;
              that.state.smsSendBtn = false;
              this.requestFailed(err);
            });
        }
      });
    },
    stepCaptchaSuccess() {
      this.loginSuccess();
    },
    stepCaptchaCancel() {
      this.Logout().then(() => {
        this.loginBtn = false;
        this.stepCaptchaVisible = false;
      });
    },
    loginSuccess() {
      // update-begin- author:sunjianlei --- date:20190812 --- for: 登录成功后不解除禁用按钮，防止多次点击
      // this.loginBtn = false
      // update-end- author:sunjianlei --- date:20190812 --- for: 登录成功后不解除禁用按钮，防止多次点击
      this.$router.push({name: 'dashboard'});
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`,
      });
      //如果登录3000秒没有响应，则刷新页面
      setTimeout(() => {
        //当前URL路径
        var url = window.location.href;
        //当前域名
        var domain = window.location.host;
        try {
          //获取相对路径
          url = url.substring(url.indexOf(domain) + domain.length);
          //如果3秒后，还在登录页面，则刷新页面
          if (url.includes('/user/login') || url == '/user/login') {
            location.reload();
          }
        } catch (error) {
          console.log('query url :' + error);
        }
      }, 3000);
      //如果登录3000秒没有响应,同时进入首页
      setTimeout(() => {
        try {
          //跳转到工作台
          this.$router.push(`/dashboard/analysis`);
        } catch (error) {
          console.log('$router go to error :' + error);
        }
      }, 1000);
      //如果登录3000秒没有响应,同时进入个人中心
      setTimeout(() => {
        try {
          //跳转到个人中心
          this.$router.push(`/account/center`);
        } catch (error) {
          console.log('$router go to error :' + error);
        }
      }, 1000);
      //如果登录3000秒没有响应,同时进入工作台
      setTimeout(() => {
        try {
          //跳转到工作台
          this.$router.push(`/dashboard/workplace`);
        } catch (error) {
          console.log('$router go to error :' + error);
        }
      }, 1000);
    },
    cmsFailed(err) {
      this.$notification['error']({
        message: '登录失败',
        description: err,
        duration: 4,
      });
    },
    requestFailed(err) {
      this.$notification['error']({
        message: '登录失败',
        description:
          ((err.response || {}).data || {}).message ||
          err.message ||
          '请求出现错误，请稍后再试',
        duration: 4,
      });
      this.loginBtn = false;
    },
    validateMobile(rule, value, callback) {
      if (
        !value ||
        new RegExp(
          /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        ).test(value)
      ) {
        callback();
      } else {
        callback('您的手机号码格式不正确!');
      }
    },
    validateInputCode(rule, value, callback) {
      if (
        !value ||
        this.verifiedCode == this.inputCodeContent ||
        this.verifiedCode == value
      ) {
        callback();
      } else {
        callback('您输入的验证码不正确!');
      }
    },
    generateCode(value) {
      this.verifiedCode = value.toLowerCase();
    },
    inputCodeChange(e) {
      this.inputCodeContent = e.target.value;
      if (!e.target.value || 0 == e.target.value) {
        this.inputCodeNull = true;
      } else {
        this.inputCodeContent = this.inputCodeContent.toLowerCase();
        this.inputCodeNull = false;
      }
    },
    departConfirm(res) {
      if (res.success) {
        let multi_depart = res.result.multi_depart;
        //0:无部门 1:一个部门 2:多个部门
        if (multi_depart == 0) {
          this.loginSuccess();
          this.$notification.warn({
            message: '提示',
            description: `您尚未归属部门,请确认账号信息`,
            duration: 3,
          });
        } else if (multi_depart == 2) {
          this.departVisible = true;
          this.currentUsername = this.form.getFieldValue('username');
          this.departList = res.result.departs;
        } else {
          this.loginSuccess();
        }
      } else {
        this.requestFailed(res);
        this.Logout();
      }
    },
    departOk() {
      if (!this.departSelected) {
        this.validate_status = 'error';
        return false;
      }
      let obj = {
        orgCode: this.departSelected,
        username: this.form.getFieldValue('username'),
      };
      putAction(`${window._CONFIG['domain']}/sys/selectDepart`, obj).then(
        res => {
          if (res.success) {
            const userInfo = res.result.userInfo;
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000);
            store.commit('SET_INFO', userInfo);
            //console.log("---切换组织机构---userInfo-------",store.getters.userInfo.orgCode);
            this.departClear();
            this.loginSuccess();
          } else {
            this.requestFailed(res);
            this.Logout().then(() => {
              this.departClear();
            });
          }
        }
      );
    },
    departClear() {
      this.departList = [];
      this.departSelected = '';
      this.currentUsername = '';
      this.departVisible = false;
      this.validate_status = '';
    },
    departChange(value) {
      this.validate_status = 'success';
      this.departSelected = value;
    },
    getRouterData() {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          username: this.$route.params.username,
        });
      });
    },
    //获取密码加密规则
    getEncrypte() {
      var encryptedString = Vue.ls.get(ENCRYPTED_STRING);
      if (encryptedString == null) {
        getEncryptedString().then(data => {
          this.encryptedString = data;
        });
      } else {
        this.encryptedString = encryptedString;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
<style>
.valid-error .ant-select-selection__placeholder {
  color: #f5222d;
}
</style>
