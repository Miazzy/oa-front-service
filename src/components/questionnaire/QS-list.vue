<template>
  <div>
    <div id="header">
      <v-header></v-header>
    </div>
    <div class="qs-list">
      <ul v-if="qsList.length == 0 ? false : true">
        <li></li>
        <li>标题</li>
        <li>截止时间</li>
        <li>状态</li>
        <li>
          操作
          <span @click="$router.push({name: 'QsEdit', params: {num: 0}})"
            >+新建问卷</span
          >
        </li>
      </ul>
      <template v-for="item in qsList">
        <ul>
          <li>
            <input type="checkbox" v-model="item.checked" />
          </li>
          <li>{{ item.title }}</li>
          <li>{{ item.time }}</li>
          <li :class="item.state === 'inissue' ? 'inissue' : ''">
            {{ item.stateTitle }}
          </li>
          <li>
            <router-link :to="`/qsedit/${item.id}`" tag="button"
              >编辑</router-link
            >
            <router-link :to="`/qsfill/${item.id}`" tag="button"
              >查看问卷</router-link
            >
            <button
              @click="
                iterator = watchData(item);
                iterator.next();
              "
            >
              查看数据
            </button>
            <button
              @click="
                iterator = delItem(item.num);
                iterator.next();
              "
            >
              删除
            </button>
          </li>
        </ul>
      </template>
      <div class="list-bottom" v-if="qsList.length == 0 ? false : true">
        <label>
          <input type="checkbox" id="all-check" v-model="selectAll" />全选
        </label>
        <button
          @click="
            iterator = delItems();
            iterator.next();
          "
        >
          删除
        </button>
      </div>
      <div class="add-qs" v-if="qsList.length === 0">
        <button
          class="add-btn"
          @click="$router.push({name: 'QsEdit', params: {num: 0}})"
        >
          +&nbsp;&nbsp;新建问卷
        </button>
      </div>
      <div class="shadow" v-if="showDialog">
        <div class="del-dialog">
          <header>
            <span>提示</span>
            <span class="close-btn" @click="showDialog = false">X</span>
          </header>
          <p>{{ info }}</p>
          <div class="btn-box">
            <button class="yes" @click="iterator.next()">确定</button>
            <button @click="showDialog = false">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/questionnaire/public/header';
import * as storage from '@/utils/storage';
import * as tools from '@/utils/util';
import * as manageAPI from '@/api/manage';

const STORAGE_KEY = 'questionnaire';

/**
 * A module that define qs-list router view
 * @exports qs-list
 * @author oyh(Reusjs)
 */
export default {
  name: 'QsList',
  components: {
    vHeader,
  },
  data() {
    return {
      qsList: [],
      showDialog: false,
      iterator: {},
      info: '',
    };
  },
  async mounted() {
    //获取用户信息
    var userInfo = storage.getStore('cur_user');
    //从数据库中获取
    this.qsList =
      storage.get(storage.STORAGE_KEY + userInfo.username) ||
      (await manageAPI.queryQuestionList(userInfo.username));

    if (this.qsList !== null) {
      //遍历用户问卷数据
      this.qsList.forEach(item => {
        item.time = tools.formatDate(item.time, 'yyyy-MM-dd');

        let [year, month, day] = item.time.split('-');

        let flag =
          year < new Date().getFullYear() ||
          (year == new Date().getFullYear() &&
            month < new Date().getMonth() + 1) ||
          (year == new Date().getFullYear() &&
            month == new Date().getMonth() + 1 &&
            day < new Date().getDate());

        if (flag) {
          item.state = 'issueed';
          item.stateTitle = '已发布';
        }

        try {
          item.question = JSON.parse(item.question);
        } catch (error) {
          console.error(error);
        }
      });
    }
  },
  methods: {
    showDialogMsg(info) {
      this.showDialog = true;
      this.info = info;
    },
    async *delItem(num) {
      var userInfo = storage.getStore('cur_user');

      yield this.showDialogMsg('确认要删除此问卷');

      yield (async () => {
        let index = 0;

        for (let length = this.qsList.length; index < length; index++) {
          if (this.qsList[index].num === num) break;
        }

        var qsItem = this.qsList[index];
        this.qsList.splice(index, 1);

        //将问卷数据保存到缓存中
        storage.save(this.qsList, storage.STORAGE_KEY + userInfo.username);

        await manageAPI.deleteTableData('bs_questions', qsItem.id);

        this.showDialog = false;
      })();
    },
    *delItems() {
      var userInfo = storage.getStore('cur_user');

      yield this.showDialogMsg('确认要删除选中的问卷？');

      yield (() => {
        this.showDialog = false;
        if (this.selectAll) {
          this.qsList = [];
          return;
        }
        if (this.selectGroup == []) return;

        this.selectGroup.forEach(async item => {
          if (this.qsList.indexOf(item) > -1)
            this.qsList.splice(this.qsList.indexOf(item), 1);

          //将问卷数据保存到缓存中
          storage.save(this.qsList, storage.STORAGE_KEY + userInfo.username);

          await manageAPI.deleteTableData('bs_questions', item.id);
        });
      })();
    },
    *edit(item) {
      yield (() => {
        if (item.state === 'noissue') {
          this.showDialogMsg('确认要编辑？');
        } else {
          item.state = 'noissue';
          this.showDialogMsg('确认要编辑？');
        }
      })();
      yield (() => {
        if (item.state !== 'noissue') {
          this.showDialog = false;
        } else {
          this.showDialog = false;
          this.$router.push(`/qsedit/${item.id}`);
        }
      })();
    },
    *watchData(item) {
      yield (() => {
        if (item.state === 'noissue') {
          this.showDialogMsg('未发布的问卷无数据可查看');
        } else {
          this.$router.push(`/qsdata/${item.id}`);
        }
      })();
      yield (this.showDialog = false);
    },
  },
  computed: {
    selectAll: {
      get() {
        return (
          this.selectCount === this.qsList.length && this.selectCount !== 0
        );
      },
      set(value) {
        this.qsList.forEach(item => {
          item.checked = value;
        });
        return value;
      },
    },
    selectCount() {
      let i = 0;
      this.qsList.forEach(item => {
        if (item.checked) i++;
      });
      return i;
    },
    selectGroup() {
      let group = [];
      this.qsList.forEach(item => {
        if (item.checked) group.push(item);
      });
      return group;
    },
  },
  watch: {
    qsList: {
      handler(val) {
        val.forEach((item, index) => {
          item.num = index + 1;
        });
        storage.save(val);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #ee7419;
$lightorange: #fcf0e5;
$green: #9fef96;

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
.qs-list {
  width: 85%;
  margin: 50px auto;
  color: #666;
  font-size: 1.6rem;
  ul {
    height: 6rem;
    margin: {
      left: 2rem;
      right: 2rem;
    }
    list-style: none;
    line-height: 6rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    &:hover {
      background-color: $lightorange;
    }
    &:nth-of-type(1) {
      background-color: #efefef;
      padding: {
        left: 2rem;
        right: 2rem;
      }
      margin: 0;
    }
    li {
      display: inline-block;
      &:nth-of-type(1) {
        width: 5rem;
        text-align: center;
      }
      &:nth-of-type(2) {
        width: 35rem;
      }
      &:nth-of-type(3) {
        width: 15rem;
      }
      &:nth-of-type(4) {
        width: 10rem;
      }
      &:nth-of-type(5) {
        width: 30rem;
        span {
          display: inline-block;
          height: 2.5rem;
          width: 9.5rem;
          margin-left: 15rem;
          line-height: 2.5rem;
          font-size: 1.4rem;
          text-align: center;
          color: #fff;
          border: 1px solid $orange;
          border-radius: 0.3rem;
          background-color: $orange;
          cursor: pointer;
          &:hover {
            box-shadow: 0 0 5px $orange;
          }
        }
      }
    }
  }
  .inissue {
    color: $green;
  }
  button {
    width: 6rem;
    height: 2.5rem;
    padding: {
      top: 0.3rem;
      bottom: 0.3rem;
    }
    margin-left: 0px;
    margin-right: 5px;
    line-height: 100%;
    color: #777;
    border: 1px solid #555;
    border-radius: 0.2rem;
    background-color: #fff;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 5px #bbb;
    }
  }
  .list-bottom {
    box-sizing: border-box;
    height: 8rem;
    margin: 0 2rem;
    padding: 2rem 0;
    background-color: #fff;
    label {
      margin: {
        left: 1.8rem;
        right: 4rem;
      }
      input {
        margin-right: 2.3rem;
      }
    }
  }
  .shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(85, 85, 85, 0.7);
    .del-dialog {
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
    .del-dialog p {
      margin-top: 3rem;
      margin-left: 3rem;
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
  .add-qs {
    width: 85%;
    height: 30rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 30rem;
    text-align: center;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 4px #aaa;
    background-color: #fff;
    .add-btn {
      width: 20rem;
      height: 5rem;
      color: #fff;
      font-size: 2rem;
      border: 1px solid $orange;
      background-color: $orange;
      &:hover {
        background-color: #ff7f1f;
        box-shadow: 0 0 5px $orange;
      }
    }
  }
}
</style>
