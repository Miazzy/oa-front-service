<template>
  <div>
    <div id="header">
      <v-header></v-header>
    </div>
    <div class="fill-container">
      <div class="fill" v-if="!isError">
        <router-link to="/qslist" tag="span" class="back">&lt; 返回</router-link>
        <h2>{{ qsItem.title }}</h2>
        <div class="content">
          <div class="content-item" v-for="item in qsItem.question">
            <p class="qs-title">{{ item.num }}&nbsp;{{ item.title }}&nbsp;{{ getMsg(item) }}</p>
            <p v-for="option in item.options" class="option">
              <label>
                <input
                  type="radio"
                  :name="`${item.num}-${item.title}`"
                  v-model="requiredItem[item.num]"
                  v-if="item.type === 'radio'"
                  :value="option"
                />
                <input
                  type="checkbox"
                  :name="`${item.num}-${item.title}`"
                  v-model="requiredItem[item.num]"
                  v-if="item.type === 'checkbox'"
                  :value="option"
                />
                {{ option }}
              </label>
            </p>
            <textarea v-if="item.type === 'textarea'" v-model="requiredItem[item.num]"></textarea>
          </div>
        </div>
        <transition name="fade">
          <div class="dialog" v-if="showDialog">
            <div class="submit-dialog" v-if="submitError">
              <header>
                <span>提示</span>
                <span class="close-btn" @click="showDialog = false">X</span>
              </header>
              <p>{{ info }}</p>
              <div class="btn-box">
                <button class="yes" @click="showDialog = false">确定</button>
                <button @click="showDialog = false">取消</button>
              </div>
            </div>
            <div class="submit-dialog" v-else>
              <header>
                <span>提示</span>
                <span class="close-btn" @click="showDialog = false">X</span>
              </header>
              <p>{{ info }}</p>
            </div>
          </div>
        </transition>
        <footer>
          <button @click="submit" class="submit">提交</button>
        </footer>
      </div>
      <div class="error" v-else>404 Not Found</div>
    </div>
  </div>
</template>

<script>
import vHeader from "@/components/questionnaire/public/header";
import * as storage from "@/utils/storage";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";
//import * as _ from 'underscore';

const STORAGE_KEY = "questionnaire";

/**
 * A module that define qs-fill router view
 * @exports qs-fill
 * @author oyh(Reusjs)
 */
export default {
  name: "QsFill",
  components: { vHeader },
  data() {
    return {
      qsItem: [],
      qsList: "",
      isError: false,
      showDialog: false,
      info: "",
      submitError: false,
      requiredItem: {}
    };
  },
  async created() {
    //获取用户信息
    var userInfo = storage.getStore("cur_user");
    //从数据库中获取
    this.qsList =
      storage.get(storage.STORAGE_KEY + userInfo.username) ||
      (await manageAPI.queryQuestionList(userInfo.username));
    //获取数据
    await this.fetchData();
  },
  mounted() {
    this.getRequiredItem();
  },
  methods: {
    async fetchData() {
      let i = 0;
      for (let length = this.qsList.length; i < length; i++) {
        if (this.qsList[i].id == this.$route.params.num) {
          try {
            this.qsItem = this.qsList[i];
            this.qsItem.question = JSON.parse(this.qsItem.question);
          } catch (error) {
            console.error(error);
          }
          break;
        }
      }

      if (tools.isNull(this.qsItem)) {
        try {
          this.qsItem = await manageAPI.queryQuestionById(
            this.$route.params.num
          );
          this.qsItem.question = JSON.parse(this.qsItem.question);
        } catch (error) {
          console.error(error);
        }
      }

      if (tools.isNull(this.qsItem) && i === this.qsList.length) {
        this.isError = true;
      }
    },
    getMsg(item) {
      let msg = "";
      if (item.type === "radio") {
        msg = "(单选题)";
      } else if (item.type === "checkbox") {
        msg = "(多选题)";
      } else {
        msg = "(文本题)";
      }

      return item.isNeed ? `${msg} *` : msg;
    },
    /**
     * @function 提交函数
     */
    async submit() {
      //获取当前用户信息
      var userInfo = storage.getStore("cur_user");

      //获取当前日期
      var ctime = tools.formatDate(new Date().getTime(), "yyyy-MM-dd");

      //获取原数据库调查数据
      var item = await manageAPI.queryQuestionById(this.qsItem.id);

      //解析填写的调查问卷名单
      var qalist = [];

      //设置
      try {
        qalist =
          !tools.isNull(item.answers) && Array.isArray(JSON.parse(item.answers))
            ? JSON.parse(item.answers)
            : [];
      } catch (error) {
        console.error(error);
      }

      //查询用户的填写记录
      var flag = window.__.find(qalist, obj => {
        return obj.username == userInfo.username;
      });

      //用户已经提交过调查问卷
      if (!tools.isNull(flag)) {
        this.showDialog = true;
        this.submitError = true;
        this.info = "提交失败，您已经提交过调查问卷了！";
        return "false";
      }

      //发布中的调研问卷才可以进行提交
      if (this.qsItem.state === "inissue") {
        //校验表单是否正常
        let result = this.validate();

        //表单验证成功，则保存调研结果
        if (result) {
          //定义用户信息
          var node = {
            username: userInfo.username,
            replay: this.requiredItem,
            create_time: ctime
          };

          //将新调查数据保存至数据列表中
          qalist.push(node);

          //设置答案
          item.answers = JSON.stringify(qalist);

          //提交参数
          var params = [
            "bs_questions",
            item.id,
            {
              id: item.id,
              answers: item.answers
            }
          ];

          //将用户调查数据保存至数据库中
          await manageAPI.patchTableData(...params);

          //显示弹出框
          this.showDialog = true;
          this.submitError = false;
          this.info = "提交成功！";

          //关闭对话框
          setTimeout(() => {
            this.showDialog = false;
          }, 500);

          //跳转到
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 1500);
        } else {
          this.showDialog = true;
          this.submitError = true;
          this.info = "提交失败！ 存在必填项未填";
        }
      } else {
        this.showDialog = true;
        this.submitError = true;
        this.info = "提交失败！ 只有发布中的问卷才能提交";
      }
    },
    /**
     * @function 获取必选项信息
     */
    getRequiredItem() {
      this.qsItem.question.forEach(item => {
        if (item.isNeed) {
          if (item.isNeed) {
            if (item.type === "checkbox") {
              this.requiredItem[item.num] = [];
            } else {
              this.requiredItem[item.num] = "";
            }
          }
        }
      });
    },
    /**
     * @function 校验必须项是否填写
     */
    validate() {
      for (let i in this.requiredItem) {
        if (this.requiredItem[i].length === 0) return false;
      }
      return true;
    }
  },
  watch: {
    $route: "fetchData"
  }
};
</script>

<style lang="scss" scoped>
$orange: #ee7419;
$lightorange: #fcf0e5;

* {
  padding: 0;
  margin: 0;
}
html {
  height: 100%;
  font-size: 62.5%;
}
body {
  height: 100%;
  font-size: 1.4rem;
}
#app {
  height: 100%;
  overflow: auto;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #efefef;
}

.fill-container {
  width: 85%;
  margin: 5rem auto;
  padding: 5rem;
  color: #666;
  background-color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 1rem #aaa;
  h2 {
    margin-bottom: 3rem;
    text-align: center;
    font-size: 2rem;
    color: #555;
  }
  .back {
    font-size: 1.6rem;
    cursor: pointer;
    &:hover {
      color: $orange;
    }
  }
  .content {
    padding: 3rem;
    border: {
      top: 0.2rem solid #ccc;
      bottom: 0.2rem solid #ccc;
    }
  }
  .content-item {
    padding: 1.5rem 2rem;
    &:hover {
      background-color: $lightorange;
    }
    > {
      p {
        margin: {
          top: 1.5rem;
          bottom: 1.5rem;
        }
      }
      textarea {
        width: 35rem;
        height: 15rem;
        margin-left: 2.5rem;
      }
    }
    .qs-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #333;
    }
    .option {
      margin-left: 2.5rem;
    }
  }
  footer {
    height: 6rem;
    margin-top: 3rem;
    text-align: center;
    line-height: 6rem;
    .submit {
      width: 10rem;
      height: 3rem;
      padding: {
        top: 0.3rem;
        bottom: 0.3rem;
      }
      line-height: 100%;
      color: #fff;
      border: 0.1rem solid $orange;
      border-radius: 0.2rem;
      background-color: $orange;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 5px $orange;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(85, 85, 85, 0.7);
    .submit-dialog {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40rem;
      height: 20rem;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 0.5rem;
      box-shadow: 0 0 5px #555;
      background-color: #fff;
    }
    header {
      height: 5rem;
      padding: {
        left: 3rem;
        right: 3rem;
      }
      line-height: 5rem;
      border-radius: 0.5rem;
      background-color: #f7f7f7;
      span:nth-of-type(1) {
        font-weight: 700;
      }
      .close-btn {
        position: absolute;
        right: 3rem;
        color: #bbb;
        cursor: pointer;
        &:hover {
          color: $orange;
        }
      }
    }
    .submit-dialog p {
      margin-top: 3rem;
      margin-left: 3rem;
    }
    .btn-box {
      button {
        width: 7rem;
        height: 2.5rem;
        padding: {
          top: 0.3rem;
          bottom: 0.3rem;
        }
        line-height: 100%;
        color: #777;
        border: 1px solid #555;
        border-radius: 0.2rem;
        background-color: #fff;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 5px #bbb;
        }
      }
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 6rem;
      text-align: center;
      line-height: 6rem;
      .yes {
        margin-right: 1rem;
        color: #fff;
        background-color: $orange;
        border: 1px solid $orange;
        &:hover {
          box-shadow: 0 0 5px $orange;
        }
      }
    }
  }
}
</style>
