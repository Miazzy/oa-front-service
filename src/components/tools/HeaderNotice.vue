<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    overlayClassName="header-notice-wrapper"
    @visibleChange="handleHoverChange"
    :overlayStyle="{ width: '240px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane :tab="msg3Title" key="3">
            <a-list>
              <a-list-item :key="index" v-for="(record, index) in announcement3">
                <div style="margin-left: 5%;width: 80%">
                  <p>
                    <a @click="showAnnouncement(record)">标题：{{ record.titile }}</a>
                  </p>
                  <p style="color: rgba(0,0,0,.45);margin-bottom: 0px">{{ record.createTime }} 发布</p>
                </div>
                <div style="text-align: right">
                  <a-tag
                    @click="showAnnouncement(record)"
                    v-if="record.priority === 'L'"
                    color="blue"
                  >一般消息</a-tag>
                  <a-tag
                    @click="showAnnouncement(record)"
                    v-if="record.priority === 'M'"
                    color="orange"
                  >重要消息</a-tag>
                  <a-tag
                    @click="showAnnouncement(record)"
                    v-if="record.priority === 'H'"
                    color="red"
                  >紧急消息</a-tag>
                </div>
              </a-list-item>
              <div style="margin-top: 5px;text-align: center">
                <a-button @click="toMyApprove()" type="dashed" block>查看更多</a-button>
              </div>
            </a-list>
          </a-tab-pane>
          <a-tab-pane :tab="msg2Title" key="2">
            <a-list>
              <a-list-item :key="index" v-for="(record, index) in announcement2">
                <div style="margin-left: 5%;width: 80%">
                  <p>
                    <a @click="showAnnouncement(record)">标题：{{ record.titile }}</a>
                  </p>
                  <p style="color: rgba(0,0,0,.45);margin-bottom: 0px">{{ record.createTime }} 发布</p>
                </div>
                <div style="text-align: right">
                  <a-tag
                    @click="showAnnouncement(record)"
                    v-if="record.priority === 'L'"
                    color="blue"
                  >一般消息</a-tag>
                  <a-tag
                    @click="showAnnouncement(record)"
                    v-if="record.priority === 'M'"
                    color="orange"
                  >重要消息</a-tag>
                  <a-tag
                    @click="showAnnouncement(record)"
                    v-if="record.priority === 'H'"
                    color="red"
                  >紧急消息</a-tag>
                </div>
              </a-list-item>
              <div style="margin-top: 5px;text-align: center">
                <a-button @click="toMyAnnouncement()" type="dashed" block>查看更多</a-button>
              </div>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <a-badge :count="msgTotal">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
    <show-announcement ref="ShowAnnouncement" @ok="modalFormOk"></show-announcement>
  </a-popover>
</template>

<script>
import { getAction, putAction } from "@/api/manage";
import ShowAnnouncement from "./ShowAnnouncement";
import store from "@/store/";

export default {
  name: "HeaderNotice",
  components: {
    ShowAnnouncement
  },
  data() {
    return {
      loadding: false,
      url: {
        listCementByUser: `${window._CONFIG['domian']}/sys/annountCement/listByUser`,
        editCementSend: `${window._CONFIG['domian']}/sys/sysAnnouncementSend/editByAnntIdAndUserId`,
        queryById: `${window._CONFIG['domian']}/sys/annountCement/queryById`
      },
      hovered: false,
      announcement1: [],
      announcement2: [],
      msg1Count: "0",
      msg2Count: "0",
      msg3Count: "0",
      msg1Title: "通知(0)",
      msg2Title: "",
      msg3Title: "",
      stopTimer: false
    };
  },
  computed: {
    msgTotal() {
      return (
        parseInt(this.msg1Count) +
        parseInt(this.msg2Count) +
        +parseInt(this.msg3Count)
      );
    }
  },
  mounted() {
    this.loadData();
    //this.timerFun();
    this.initWebSocket();
  },
  destroyed: function() {
    // 离开页面生命周期函数
    this.websocketclose();
  },
  methods: {
    timerFun() {
      this.stopTimer = false;
      let myTimer = setInterval(() => {
        // 停止定时器
        if (this.stopTimer == true) {
          clearInterval(myTimer);
          return;
        }
        this.loadData();
      }, 6000);
    },
    loadData() {
      try {
        // 获取系统消息
        getAction(this.url.listCementByUser)
          .then(res => {
            if (res.success) {
              this.announcement1 = res.result.anntMsgList;
              this.msg1Count = res.result.anntMsgTotal;
              this.msg1Title = "通知(" + res.result.anntMsgTotal + ")";
              this.announcement2 = res.result.sysMsgList;
              this.msg2Count = res.result.sysMsgTotal;
              this.msg2Title = "消息(" + res.result.sysMsgTotal + ")";
              this.announcement3 = res.result.sysMsgList;
              this.msg3Count = res.result.sysMsgTotal;
              this.msg3Title = "审批(" + res.result.sysMsgTotal + ")";
            }
          })
          .catch(error => {
            console.log("系统消息通知异常", error); //这行打印permissionName is undefined
            this.stopTimer = true;
            console.log("清理timer");
          });
      } catch (err) {
        this.stopTimer = true;
        console.log("通知异常", err);
      }
    },
    fetchNotice() {
      if (this.loadding) {
        this.loadding = false;
        return;
      }
      this.loadding = true;
      setTimeout(() => {
        this.loadding = false;
      }, 200);
    },
    showAnnouncement(record) {
      putAction(this.url.editCementSend, { anntId: record.id }).then(res => {
        if (res.success) {
          this.loadData();
        }
      });
      this.hovered = false;
      this.$refs.ShowAnnouncement.detail(record);
    },
    toMyAnnouncement() {
      this.$router.push({
        path: "/isps/userAnnouncement",
        name: "isps-userAnnouncement"
      });
    },
    toMyApprove() {
      this.$router.push({
        path: "/online/cgformList/0b511f234f3847baa50106a14fff6215",
        meta: {
          title: "审批处理"
        }
      });
      // window.location.href = '/online/cgformList/0b511f234f3847baa50106a14fff6215'
    },
    modalFormOk() {},
    handleHoverChange(visible) {
      this.hovered = visible;
    },

    initWebSocket: function() {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      var userId = store.getters.userInfo.id;
      var url =
        window._CONFIG["domianURL"]
          .replace("https://", "wss://")
          .replace("http://", "ws://") +
        "/websocket/" +
        userId;
      //console.log(url);
      try {
        this.websock = new WebSocket(url);
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
      } catch (error) {
        console.log('init websock error:' + error);
      }
    },
    websocketonopen: function() {
      console.log("WebSocket连接成功");
    },
    websocketonerror: function(e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage: function(e) {

      console.log("-----接收消息-------", e.data);

      var data = eval("(" + e.data + ")"); //解析对象
      this.loadData();
      this.openNotification(data);

    },
    websocketclose: function(e) {
      console.log("connection closed (" + JSON.stringify(e) + ")");
    },

    openNotification(data) {
      var text = data.msgTxt;
      const key = `open${Date.now()}`;
      this.$notification.open({
        message: "消息提醒",
        placement: "bottomRight",
        description: text,
        key,
        btn: h => {
          return h(
            "a-button",
            {
              props: {
                type: "primary",
                size: "small"
              },
              on: {
                click: () => this.showDetail(key, data)
              }
            },
            "查看详情"
          );
        }
      });
    },

    showDetail(key, data) {
      this.$notification.close(key);
      var id = data.msgId;
      getAction(this.url.queryById, { id: id }).then(res => {
        if (res.success) {
          var record = res.result;
          this.showAnnouncement(record);
        }
      });
    }
  }
};
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="scss" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}
</style>