<template>
  <div>
    <div id="header">
      <v-header></v-header>
    </div>
    <div class="edit-container">
      <h2 @click="titleClick" v-if="!titleChange">{{ qsItem.title }}</h2>
      <input
        type="text"
        name="qsTitle"
        v-if="titleChange"
        v-model="titleValue"
        @blur="onblur"
        @keyup.enter="onsubmit"
        ref="titleInput"
      />
      <div class="content">
        <div class="questions" v-for="(qs, index) in qsItem.question">
          <div class="qs-left">
            <p class="qs-title">
              {{ qs.num }}&nbsp;{{ qs.title }}&nbsp;{{ getMsg(qs) }}
            </p>
            <p v-for="option in qs.options" class="option">
              <label>
                <input
                  type="radio"
                  :name="`${qs.num}-${qs.title}`"
                  v-if="qs.type === 'radio'"
                />
                <input
                  type="checkbox"
                  :name="`${qs.num}-${qs.title}`"
                  v-if="qs.type === 'checkbox'"
                />
                {{ option }}
              </label>
            </p>
            <textarea v-if="qs.type === 'textarea'"></textarea>
          </div>
          <div class="qs-right">
            <label>
              <input type="checkbox" :value="qs.isNeed" v-model="qs.isNeed" />
              此题是否必填
            </label>
            <p>
              <span
                v-if="index !== 0"
                @click="goUp(index)"
                style="margin-right:5px;"
                >上移</span
              >
              <span
                v-if="index !== qsItem.question.length - 1"
                @click="goDown(index)"
                style="margin-right:5px;"
                >下移</span
              >
              <span @click="copy(index, qs)" style="margin-right:5px;"
                >复用</span
              >
              <span @click="del(index)" style="margin-right:5px;">删除</span>
            </p>
          </div>
        </div>
        <div class="add">
          <transition name="slide">
            <div class="add-option" v-if="showBtn">
              <button @click="addRadio">单选</button>
              <button @click="addCheckbox">多选</button>
              <button @click="addTextarea">文本框</button>
            </div>
          </transition>
          <div class="add-item" @click="addItemClick">
            <span class="add-icon">+</span>
            <span>添加问题</span>
          </div>
        </div>
      </div>
      <div class="shadow" v-if="showAddQsDialog">
        <div class="add-qs-dialog">
          <header>
            <span>提示</span>
            <span class="close-btn" @click="showAddQsDialog = false">X</span>
          </header>
          <p>{{ info }}</p>
          <label>
            输入题目标题
            <input type="text" v-model="qsInputTitle" />
          </label>
          <label v-if="showAddOptionInput">
            输入选项
            <input type="text" v-model="qsInputOptions" />
          </label>
          <div class="btn-box">
            <button class="yes" @click="validateAddQs">确定</button>
            <button @click="showAddQsDialog = false">取消</button>
          </div>
        </div>
      </div>
      <div class="shadow" v-if="showDialog">
        <div class="dialog">
          <header>
            <span>提示</span>
            <span class="close-btn" @click="cancel">X</span>
          </header>
          <p>{{ info }}</p>
          <div class="btn-box">
            <button class="yes" @click="iterator.next()">确定</button>
            <button @click="cancel">取消</button>
          </div>
        </div>
      </div>
      <footer>
        <span>问卷截止日期</span>
        <calendar-input
          :showCalendar="false"
          :limit="limit"
          @getValue="getValue"
        ></calendar-input>
        <div class="btn-box">
          <button
            class="save"
            @click="
              iterator = save();
              iterator.next();
            "
          >
            保存问卷
          </button>
          <button
            class="issue"
            @click="
              iterator = issueQs();
              iterator.next();
            "
          >
            发布问卷
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/questionnaire/public/header';
import * as storage from '@/utils/storage';
import * as tools from '@/utils/util';
import * as manageAPI from '@/api/manage';
import calendarInput from './calendar-input';

const STORAGE_KEY = 'questionnaire';

/**
 * A module that define qs-edit view
 * @exports qs-edit
 * @author oyh(Reusjs)
 */
export default {
  name: 'QsEdit',
  components: {
    calendarInput,
    vHeader,
  },
  data() {
    return {
      qsItem: {},
      qsList: [],
      isError: false,
      showBtn: false,
      titleChange: false,
      titleValue: '',
      showAddQsDialog: false,
      showAddOptionInput: true,
      qsInputTitle: '',
      qsInputOptions: [],
      info: '',
      selectTime: '',
      addOptionType: '',
      limit: {},
      showDialog: false,
      iterator: {},
      userInfo: {},
      isGoIndex: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    //跳转前执行代码
    try {
      var userInfo = storage.getStore('cur_user');
      var num = to.params.num;
      var theItem = {};
      if (num != 0) {
        let length = storage.get(storage.STORAGE_KEY + userInfo.username)
          .length;

        for (let i = 0; i < length; i++) {
          let flag =
            storage.get(storage.STORAGE_KEY + userInfo.username)[i].id == num;
          if (flag) {
            theItem = storage.get(storage.STORAGE_KEY + userInfo.username)[i];
            break;
          }
        }

        this.qsItem = theItem;

        console.log(`item : ${theItem}`);
      }
    } catch (error) {
      console.error(error);
    }
    //执行跳转
    next();
  },
  async created() {
    try {
      //获取用户信息
      var userInfo = (this.userInfo = storage.getStore('cur_user'));

      //从数据库中获取
      var list =
        storage.get(storage.STORAGE_KEY + userInfo.username) ||
        (await manageAPI.queryQuestionList(userInfo.username));

      //设置问卷题目
      this.qsList = list || [];

      //获取数据
      this.fetchData();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async fetchData() {
      try {
        //获取时间戳
        var timestamp = new Date().getTime();

        //设置限制日期
        this.limit = {
          minYear: new Date().getFullYear(),
          minMonth: new Date().getMonth() + 1,
          minDay: new Date().getDate(),
          maxYear: 2099,
          maxMonth: 12,
          maxDay: 31,
        };

        //设置问卷初始化信息
        if (this.$route.params.num == 0) {
          let item = {};
          item.id = tools.queryUniqueID();
          item.create_by = this.userInfo.username;
          item.create_time = tools.formatDate(timestamp, 'yyyy-MM-dd');
          item.num = this.qsList.length + 1;
          item.title = item.name = '这里是标题';
          item.time = tools.formatDate(timestamp, 'yyyy-MM-dd');
          item.state = 'noissue';
          item.question = [];
          item.stateTitle = '未发布';
          item.checked = 'false';
          this.qsItem = item;
          try {
            this.qsList.push(this.qsItem);
          } catch (error) {
            console.log(error);
          }
        } else {
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
          if (i === this.qsList.length) this.isError = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    getMsg(item) {
      try {
        let msg = '';
        if (item.type === 'radio') {
          msg = '(单选题)';
        } else if (item.type === 'checkbox') {
          msg = '(多选题)';
        } else {
          msg = '(文本题)';
        }
        return item.isNeed ? `${msg} *` : msg;
      } catch (error) {
        console.error(error);
      }
    },
    onblur() {
      try {
        this.titleValue = this.titleValue.trim();
        this.qsItem.title =
          this.titleValue === '' ? this.qsItem.title : this.titleValue;
        this.titleChange = false;
      } catch (error) {
        console.error(error);
      }
    },
    onsubmit() {
      try {
        this.titleValue = this.titleValue.trim();
        this.qsItem.title =
          this.titleValue === '' ? this.qsItem.title : this.titleValue;
        this.titleChange = false;
      } catch (error) {
        console.error(error);
      }
    },
    titleClick() {
      try {
        this.titleChange = !this.titleChange;
        setTimeout(() => {
          this.$refs.titleInput.focus();
        }, 150);
      } catch (error) {
        console.error(error);
      }
    },
    swapItems(oldIndex, newIndex) {
      try {
        let [newVal] = this.qsItem.question.splice(
          newIndex,
          1,
          this.qsItem.question[oldIndex]
        );
        this.qsItem.question.splice(oldIndex, 1, newVal);
      } catch (error) {
        console.error(error);
      }
    },
    goUp(index) {
      try {
        this.swapItems(index, index - 1);
      } catch (error) {
        console.error(error);
      }
    },
    goDown(index) {
      try {
        this.swapItems(index, index + 1);
      } catch (error) {
        console.error(error);
      }
    },
    copy(index, qs) {
      try {
        if (this.questionLength === 10) return alert('问卷已满！');
        qs = Object.assign({}, qs);
        this.qsItem.question.splice(index, 0, qs);
      } catch (error) {
        console.error(error);
      }
    },
    del(index) {
      try {
        this.qsItem.question.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },
    addItemClick() {
      try {
        if (this.showBtn === false) {
          this.questionLength === 10
            ? alert('问卷已满！')
            : (this.showBtn = !this.showBtn);
        } else {
          this.showBtn = !this.showBtn;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async showAddDialog(msg, showOption) {
      try {
        this.showAddQsDialog = true;
        this.showAddOptionInput = showOption;
        this.info = msg;
        this.qsInputTitle = '';
        this.qsInputOptions = '';
      } catch (error) {
        console.error(error);
      }
    },
    addRadio() {
      try {
        if (this.questionLength === 10) return alert('问卷已满！');
        this.showAddDialog(
          '分别在下面的输入框中输入问题的名称以及选项, 选项用半角逗号","分隔开',
          true
        );
        this.addOptionType = 'radio';
      } catch (error) {
        console.error(error);
      }
    },
    addCheckbox() {
      try {
        if (this.questionLength === 10) return alert('问卷已满！');
        this.showAddDialog(
          '分别在下面的输入框中输入问题的名称以及选项, 选项用半角逗号","分隔开',
          true
        );
        this.addOptionType = 'checkbox';
      } catch (error) {
        console.error(error);
      }
    },
    addTextarea() {
      try {
        if (this.questionLength === 10) return alert('问卷已满！');
        this.showAddDialog('在输入框中输入问题名称', false);
        this.addOptionType = 'textarea';
      } catch (error) {
        console.error(error);
      }
    },
    validateAddQs() {
      try {
        let qsTitle = this.qsInputTitle.trim();
        if (qsTitle === '') return alert('题目不能为空');
        if (this.showAddOptionInput) {
          let qsOptions = this.qsInputOptions.trim();
          if (qsOptions === '') return alert('选项不能为空！');
          qsOptions = qsOptions.split(',');
          for (let i = 0, length = qsOptions.length; i < length; i++) {
            if (qsOptions[i].trim() === '') {
              return alert('存在某个选项内容为空');
            }
          }
          this.qsItem.question.push({
            num: this.qsItem.question.length - 1,
            title: qsTitle,
            type: this.addOptionType,
            isNeed: true,
            options: qsOptions,
          });
          this.showAddQsDialog = false;
        } else {
          this.qsItem.question.push({
            num: this.qsItem.question.length - 1,
            title: qsTitle,
            type: 'textarea',
            isNeed: true,
          });
          this.showAddQsDialog = false;
        }
      } catch (error) {
        console.error(error);
      }
    },
    getValue(selectTime) {
      try {
        this.selectTime = selectTime;
        this.qsItem.time = this.selectTime;
      } catch (error) {
        console.error(error);
      }
    },

    async *save() {
      try {
        //获取用户信息
        var userInfo = storage.getStore('cur_user');

        this.showDialog = true;
        this.info = '确认保存?';

        yield;

        //检查问题列表长度
        if (this.qsItem.question.length === 0) {
          this.showDialog = false;
          alert('问卷为空无法保存');
        } else {
          //将问卷数据保存到缓存中
          storage.save(this.qsList, storage.STORAGE_KEY + userInfo.username);

          //字符串序列化问题列表
          this.qsItem.content = this.qsItem.question = JSON.stringify(
            this.qsItem.question
          );

          //同时将问卷数据保存到数据库中
          await manageAPI.postTableData('bs_questions', this.qsItem);

          this.info = '是否发布?';
          this.isGoIndex = true;
        }

        yield;

        //修改问卷状态
        var node = {
          id: this.qsItem.id,
          state: 'inissue',
          stateTitle: '发布中',
        };

        //提交参数
        var params = ['bs_questions', this.qsItem.id, node];

        //将问卷数据保存到缓存中
        storage.save(this.qsList, storage.STORAGE_KEY + userInfo.username);

        //同时将问卷数据保存到数据库中
        await manageAPI.patchTableData(...params);

        this.showDialog = false;
        this.$router.push({path: '/qslist'});
      } catch (error) {
        console.error(error);
      }
    },

    async *issueQs() {
      //获取当前用户信息
      var userInfo = storage.getStore('cur_user');

      //显示对话框
      this.showDialog = true;
      this.info = '确认发布?';

      yield;

      if (this.qsItem.question.length === 0) {
        this.showDialog = false;
        alert('问卷为空无法保存');
      } else {
        this.qsItem.state = 'inissue';
        this.qsItem.stateTitle = '发布中';

        storage.save(this.qsList, storage.STORAGE_KEY + userInfo.username);

        //字符串序列化问题列表
        this.qsItem.content = this.qsItem.question = JSON.stringify(
          this.qsItem.question
        );

        //同时将问卷数据保存到数据库中
        await manageAPI.postTableData('bs_questions', this.qsItem);

        this.showDialog = false;
        this.$router.push({path: '/qslist'});
      }
    },
    cancel() {
      this.showDialog = false;
      if (this.isGoIndex === true) {
        this.$router.push({path: '/qslist'});
      }
    },
  },
  computed: {
    questionLength() {
      try {
        return this.qsItem.question.length;
      } catch (error) {
        return 0;
      }
    },
  },
  watch: {
    $route: 'fetchData',
    qsItem: {
      handler(newVal) {
        newVal.question.forEach((item, index) => {
          item.num = `Q${index + 1}`;
        });
      },
      deep: true,
    },
  },
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
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #efefef;
}

.edit-container {
  width: 85%;
  margin: 5rem auto;
  padding: 5rem;
  color: #666;
  background-color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 1rem #aaa;
  h2 {
    height: 6rem;
    margin-bottom: 3rem;
    line-height: 6rem;
    text-align: center;
    font-size: 2rem;
    color: #555;
    cursor: pointer;
    &:hover {
      background-color: $lightorange;
    }
  }
  input[name='qsTitle'] {
    height: 6rem;
    width: 100%;
    margin-bottom: 3rem;
    font-size: 2rem;
    text-align: center;
    border: 1px solid #ccc;
    background-color: #ccc;
  }
  .content {
    padding: 3rem;
    border: {
      top: 0.2rem solid #ccc;
      bottom: 0.2rem solid #ccc;
    }
  }
  .questions {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    &:hover {
      background-color: $lightorange;
    }
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
    .qs-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #333;
    }
    .option {
      margin-left: 2.5rem;
    }
    .qs-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 20rem;
      label {
        margin: {
          top: 2rem;
          bottom: 2rem;
        }
      }
      p {
        bottom: 1rem;
        span {
          cursor: pointer;
          &:hover {
            color: $orange;
          }
        }
      }
    }
  }
  .add {
    border: 0.2rem solid #ccc;
  }
  .add-option {
    height: 8rem;
    line-height: 8rem;
    text-align: center;
    button {
      height: 3rem;
      width: 8rem;
      margin-left: 4rem;
      border: 0.2rem solid #ccc;
      background-color: #eee;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 0.4rem #aaa;
      }
    }
  }
  .add-item {
    height: 8rem;
    line-height: 8rem;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
    > span {
      font-size: 1.6rem;
    }
  }
  footer {
    position: relative;
    height: 6rem;
    margin-top: 3rem;
    line-height: 6rem;
    .btn-box {
      position: absolute;
      right: 2rem;
      display: inline-block;
    }
    .save,
    .issue {
      width: 10rem;
      height: 3rem;
      padding: {
        top: 0.3rem;
        bottom: 0.3rem;
      }
      line-height: 100%;
      color: #777;
      border: 0.1rem solid #aaa;
      border-radius: 0.2rem;
      background-color: #fff;
      cursor: pointer;
    }
    .save:hover {
      box-shadow: 0 0 0.5rem #aaa;
    }
    .issue {
      margin-left: 4rem;
      color: #fff;
      border: 0.1rem solid $orange;
      background-color: $orange;
      &:hover {
        box-shadow: 0 0 0.5rem $orange;
      }
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter-active {
    height: 8rem;
  }
  .slide-enter,
  .slide-leave-active {
    opacity: 0;
    height: 0;
    transform: translateY(-3rem);
  }
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
  .shadow {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(85, 85, 85, 0.7);
    .add-qs-dialog,
    .dialog {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 40rem;
      height: 28rem;
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
    .add-qs-dialog p,
    .dialog p {
      margin: 3rem 0 2rem 3rem;
    }
    label {
      display: block;
      margin-left: 3rem;
      margin-bottom: 2rem;
      &:nth-of-type(2) {
        margin-left: 5.7rem;
      }
      input {
        margin-left: 1rem;
      }
    }
    .btn-box {
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
