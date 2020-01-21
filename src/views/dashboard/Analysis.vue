<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{marginBottom: '24px'}">
        <chart-card :loading="loading" title="总流程数" total="126,560">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">周同比</span>
              12%
            </trend>
            <trend flag="down">
              <span slot="term">日同比</span>
              11%
            </trend>
          </div>
          <template slot="footer">
            日流程数
            <span>24</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{marginBottom: '24px'}">
        <chart-card :loading="loading" title="总用户数" :total="6560 | NumberFormat">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar :height="40" />
          </div>
          <template slot="footer">
            入职率
            <span>60%</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{marginBottom: '24px'}">
        <chart-card :loading="loading" title="总访问量" :total="vtotal | NumberFormat">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <template slot="footer">
            日访问量
            <span>{{ ctotal | NumberFormat }}</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{marginBottom: '24px'}">
        <chart-card :loading="loading" title="总业务数" :total="6560 | NumberFormat">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar :height="40" />
          </div>
          <template slot="footer">
            业务分布
            <span></span>
          </template>
        </chart-card>
      </a-col>
    </a-row>
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          size="large"
          defaultActiveKey="1"
          v-model="activeKey"
          @change="getData"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a-tag color="cyan" @click="reloadData()">刷新❄️</a-tag>
            </div>
          </div>
          <a-tab-pane loading="true" tab="我的待办" key="1" style>
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="columns"
                :dataSource="dataWaitList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <a slot="type" slot-scope="text, record">
                  <a-menu-item>
                    <a :data-info="JSON.stringify(record)" @click="handleDetailWF(record)">
                      <span v-html="record.type"></span>
                    </a>
                  </a-menu-item>
                </a>
                <a slot="topic" slot-scope="text, record">
                  <a-menu-item>
                    <a
                      :data-info="JSON.stringify(record)"
                      @click="handleDetailWF(record)"
                      style="color:#303030;"
                    >
                      <span style="color:#303030;" v-html="record.topic"></span>
                    </a>
                  </a-menu-item>
                </a>

                <span slot="name" slot-scope="text, record">
                  <a-tag
                    :color="record.name.length > 5 ? 'geekblue' : 'green'"
                    :key="record.name"
                    @click="handleDetailWF(record)"
                  >{{ record.name.toUpperCase() }}</a-tag>
                </span>

                <span slot="username" slot-scope="username">
                  <a-tag
                    v-for="tag in username"
                    :color="
                      tag === 'admin'
                        ? 'volcano'
                        : tag.length > 5
                        ? 'geekblue'
                        : 'green'
                    "
                    :key="tag"
                  >{{ tag }}</a-tag>
                </span>

                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="red" :key="record.create_time">
                    {{
                    record.create_time
                    }}
                  </a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="我的已办" key="2">
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="columns"
                :dataSource="dataDoneList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <a slot="type" slot-scope="text, record">
                  <a-menu-item>
                    <a :data-info="JSON.stringify(record)" @click="handleDetailWF(record)">
                      <span v-html="record.type"></span>
                    </a>
                  </a-menu-item>
                </a>

                <a slot="topic" slot-scope="text, record">
                  <a-menu-item>
                    <a
                      :data-info="JSON.stringify(record)"
                      @click="handleDetailWF(record)"
                      style="color:#303030;"
                    >
                      <span style="color:#303030;" v-html="record.topic"></span>
                    </a>
                  </a-menu-item>
                </a>

                <span slot="name" slot-scope="text, record">
                  <a-tag
                    :color="record.name.length > 5 ? 'geekblue' : 'green'"
                    :key="record.name"
                    @click="handleDetailWF(record)"
                  >{{ record.name }}</a-tag>
                </span>

                <span slot="username" slot-scope="text, record">
                  <a-tag
                    v-for="tag in record.username"
                    :color="
                      tag === 'admin'
                        ? 'volcano'
                        : tag.length > 5
                        ? 'geekblue'
                        : 'green'
                    "
                    :key="tag"
                  >{{ tag }}</a-tag>
                </span>

                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="blue" :key="record.create_time">
                    {{
                    record.create_time
                    }}
                  </a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="行政公告" key="5">
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="announce_columns"
                :dataSource="dataAnnounceList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <span slot="announce_type" slot-scope="text, record">
                  <a-tag
                    color="cyan"
                    :key="record.announce_type"
                    @click="handleAnnounceInfo(record,'BS_ANNOUNCE')"
                  >{{ record.announce_type }}</a-tag>
                </span>
                <span slot="announce_title" slot-scope="text, record">
                  <a-tag
                    color="blue"
                    :key="record.announce_title"
                    @click="handleAnnounceInfo(record,'BS_ANNOUNCE')"
                  >{{ record.announce_title}}</a-tag>
                </span>
                <span slot="create_by" slot-scope="text, record">
                  <a-tag color="geekblue" :key="record.create_by">{{ record.create_by }}</a-tag>
                </span>
                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="pink" :key="record.create_time">{{ record.create_time }}</a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="红头文件" key="6">
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="announce_columns"
                :dataSource="dataHeadList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <span slot="announce_type" slot-scope="text, record">
                  <a-tag
                    color="cyan"
                    :key="record.announce_type"
                    @click="handleAnnounceInfo(record,'BS_REDHEAD')"
                  >{{ record.announce_type }}</a-tag>
                </span>
                <span slot="announce_title" slot-scope="text, record">
                  <a-tag
                    color="blue"
                    :key="record.announce_title"
                    @click="handleAnnounceInfo(record,'BS_REDHEAD')"
                  >{{ record.announce_title}}</a-tag>
                </span>
                <span slot="create_by" slot-scope="text, record">
                  <a-tag color="geekblue" :key="record.create_by">{{ record.create_by }}</a-tag>
                </span>
                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="pink" :key="record.create_time">{{ record.create_time }}</a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="新闻资讯" key="7">
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="announce_columns"
                :dataSource="dataNewsList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <span slot="announce_type" slot-scope="text, record">
                  <a-tag
                    color="cyan"
                    :key="record.announce_type"
                    @click="handleAnnounceInfo(record,'BS_NEWS')"
                  >{{ record.announce_type }}</a-tag>
                </span>
                <span slot="announce_title" slot-scope="text, record">
                  <a-tag
                    color="blue"
                    :key="record.announce_title"
                    @click="handleAnnounceInfo(record,'BS_NEWS')"
                  >{{ record.announce_title}}</a-tag>
                </span>
                <span slot="create_by" slot-scope="text, record">
                  <a-tag color="geekblue" :key="record.create_by">{{ record.create_by}}</a-tag>
                </span>
                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="pink" :key="record.create_time">{{ record.create_time}}</a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="奖罚通报" key="8">
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="announce_columns"
                :dataSource="dataNoticeList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <span slot="announce_type" slot-scope="text, record">
                  <a-tag
                    color="cyan"
                    :key="record.announce_type"
                    @click="handleAnnounceInfo(record,'BS_NOTICE')"
                  >{{ record.announce_type}}</a-tag>
                </span>
                <span slot="announce_title" slot-scope="text, record">
                  <a-tag
                    color="blue"
                    :key="record.announce_title"
                    @click="handleAnnounceInfo(record,'BS_NOTICE')"
                  >{{ record.announce_title}}</a-tag>
                </span>
                <span slot="create_by" slot-scope="text, record">
                  <a-tag color="geekblue" :key="record.create_by">{{ record.create_by}}</a-tag>
                </span>
                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="pink" :key="record.create_time">{{ record.create_time}}</a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="市场观察" key="9">
            <template>
              <div style="top:50px;">
                <a-spin :spinning="spinning" style="top:50px;">
                  <div class="spin-content"></div>
                </a-spin>
              </div>
              <a-table
                :columns="announce_columns"
                :dataSource="dataViewsList"
                :pagination="false"
                style="padding-top:-10px;margin-top:-10px"
              >
                <span slot="announce_type" slot-scope="text, record">
                  <a-tag
                    color="cyan"
                    :key="record.announce_type"
                    @click="handleAnnounceInfo(record,'BS_MARKET_INFO')"
                  >{{ record.announce_type }}</a-tag>
                </span>
                <span slot="announce_title" slot-scope="text, record">
                  <a-tag
                    color="blue"
                    :key="record.announce_title"
                    @click="handleAnnounceInfo(record,'BS_MARKET_INFO')"
                  >{{ record.announce_title}}</a-tag>
                </span>
                <span slot="create_by" slot-scope="text, record">
                  <a-tag color="geekblue" :key="record.create_by">{{ record.create_by }}</a-tag>
                </span>
                <span slot="create_time" slot-scope="text, record">
                  <a-tag color="blue" :key="record.create_time">{{ record.create_time }}</a-tag>
                </span>
              </a-table>
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-row>
      <a-col :span="24">
        <a-card :loading="loading" :bordered="false" title="近期访问统计" :style="{marginTop: '24px'}">
          <div
            class="extra-wrapper"
            style="position: relative;float:right;top: -63px;margin-left:5px;left:6px;"
          >
            <div class="extra-item">
              <a-tag color="blue" @click="reloadVisitData()">刷新❄️</a-tag>
            </div>
          </div>
          <a-row>
            <a-col :span="6">
              <head-info title="今日访问IP数" :content="loginfo.todayIp"></head-info>
            </a-col>
            <a-col :span="2">
              <a-spin class="circle-cust">
                <a-icon slot="indicator" type="environment" style="font-size: 24px" />
              </a-spin>
            </a-col>
            <a-col :span="6">
              <head-info title="今日访问次数" :content="loginfo.todayVisitCount"></head-info>
            </a-col>
            <a-col :span="2">
              <a-spin class="circle-cust">
                <a-icon slot="indicator" type="team" style="font-size: 24px" />
              </a-spin>
            </a-col>
            <a-col :span="6">
              <head-info title="访问总次数" :content="loginfo.totalVisitCount"></head-info>
            </a-col>
            <a-col :span="2">
              <a-spin class="circle-cust">
                <a-icon slot="indicator" type="rise" style="font-size: 24px" />
              </a-spin>
            </a-col>
          </a-row>
          <line-chart-multid :fields="visitFields" :dataSource="visitInfo"></line-chart-multid>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ChartCard from "@/components/ChartCard";
import ACol from "ant-design-vue/es/grid/Col";
import ATooltip from "ant-design-vue/es/tooltip/Tooltip";
import MiniArea from "@/components/chart/MiniArea";
import MiniBar from "@/components/chart/MiniBar";
import MiniProgress from "@/components/chart/MiniProgress";
import RankList from "@/components/chart/RankList";
import Bar from "@/components/chart/Bar";
import LineChartMultid from "@/components/chart/LineChartMultid";
import HeadInfo from "@/components/tools/HeadInfo.vue";
import Trend from "@/components/Trend";
import { getLoginfo, getVisitInfo } from "@/api/api";
import * as manageAPI from "@/api/manage";
import * as storage from "@/utils/storage";

const rankList = [];
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: "白鹭岛 " + (i + 1) + " 号店",
    total: 1234.56 - i * 100
  });
}
const barData = [];
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  });
}

const columns = [
  {
    title: "办理事项",
    dataIndex: "type",
    key: "type",
    slots: { title: "type" },
    width: 100,
    align: "center",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "业务",
    width: 200,
    align: "center",
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "主题",
    width: 400,
    align: "left",
    key: "topic",
    dataIndex: "topic",
    scopedSlots: { customRender: "topic" }
  },
  {
    title: "操作人员",
    key: "username",
    width: 300,
    align: "left",
    dataIndex: "username",
    scopedSlots: { customRender: "username" }
  },
  {
    title: "创建时间",
    width: 150,
    align: "center",
    key: "create_time",
    dataIndex: "create_time",
    scopedSlots: { customRender: "create_time" }
  }
];

const announce_columns = [
  {
    title: "类型",
    dataIndex: "announce_type",
    key: "announce_type",
    slots: { title: "announce_type" },
    width: 100,
    align: "center",
    scopedSlots: { customRender: "announce_type" }
  },
  {
    title: "标题",
    width: 500,
    align: "left",
    key: "announce_title",
    dataIndex: "announce_title",
    scopedSlots: { customRender: "announce_title" }
  },
  {
    title: "创建人",
    width: 100,
    align: "center",
    key: "create_by",
    dataIndex: "create_by",
    scopedSlots: { customRender: "create_by" }
  },
  {
    title: "时间",
    width: 100,
    align: "center",
    key: "create_time",
    dataIndex: "create_time",
    scopedSlots: { customRender: "create_time" }
  }
];

export default {
  name: "Analysis",
  components: {
    ATooltip,
    ACol,
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    LineChartMultid,
    HeadInfo
  },
  data() {
    return {
      loading: true,
      vtotal: 0,
      ctotal: 0,
      center: null,
      rankList,
      barData,
      loginfo: {},
      visitFields: ["ip", "visit"],
      visitInfo: [],
      indicator: <a-icon type="loading" style="font-size: 24px" spin />,
      dataWaitList: [],
      dataDoneList: [],
      dataAnnounceList: [],
      dataNoticeList: [],
      dataHeadList: [],
      dataNewsList: [],
      dataViewsList: [],
      dataNotice: [],
      columns,
      announce_columns,
      activeKey: "1",
      loadingMore: false,
      showLoadingMore: true,
      spinning: false
    };
  },
  async created() {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 1000);
    this.initLogInfo();
    await this.getData(1);

    //设置每十分钟请求用户信息
    setInterval(() => {
      manageAPI.queryToken();
    }, 10 * 60 * 1000);
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData(key) {
      //查询我的已办，我的待办，行政公告，红头文件，新闻资讯，奖罚通报，市场观察等内容
      //获取用户信息
      var userInfo = storage.getStore("cur_user");
      let username = userInfo["username"];
      let realname = userInfo["realname"];
      if (this.activeKey == 1 || key == 1) {
        //获取我的待办数据
        this.dataWaitList = await manageAPI.queryProcessLogWait(
          username,
          realname
        );
      } else if (this.activeKey == 2 || key == 2) {
        //获取我的已办数据
        this.dataDoneList = await manageAPI.queryProcessLogDone(
          username,
          realname
        );
      } else if (this.activeKey == 3 || key == 3) {
        //获取我的消息数据
        this.dataDoneList = await manageAPI.queryProcessLogDone(
          username,
          realname
        );
      } else if (this.activeKey == 4 || key == 4) {
        //获取我的收藏数据
        this.dataDoneList = await manageAPI.queryProcessLogDone(
          username,
          realname
        );
      } else if (this.activeKey == 5 || key == 5) {
        //获取行政公告数据
        this.dataAnnounceList = await manageAPI.queryAnnounceList(
          username,
          realname
        );
      } else if (this.activeKey == 6 || key == 6) {
        //获取红头文件数据
        this.dataHeadList = await manageAPI.queryHeadList(username, realname);
      } else if (this.activeKey == 7 || key == 7) {
        //获取新闻资讯数据
        this.dataNewsList = await manageAPI.queryNewsList(username, realname);
      } else if (this.activeKey == 8 || key == 8) {
        //获取奖罚通报数据
        this.dataNoticeList = await manageAPI.queryNoticeList(
          username,
          realname
        );
      } else if (this.activeKey == 9 || key == 9) {
        //获取市场观察数据
        this.dataViewsList = await manageAPI.queryViewsList(username, realname);
      }

      //获取日访问量/总访问量
      try {
        var total = await manageAPI.queryTableDataAll("v_visit_total");
        total = total[0];
        this.ctotal = total["ctotal"];
        this.vtotal = total["vtotal"];
      } catch (error) {
        console.log("error :" + error);
      }
    },
    /**
     * @function 刷新页面
     */
    async reloadData() {
      this.spinning = true;
      var userInfo = storage.getStore("cur_user");
      let username = userInfo["username"];
      let realname = userInfo["realname"];
      if (this.activeKey == 1) {
        //获取我的待办数据
        this.dataWaitList = await manageAPI.queryProcessLogWait(
          username,
          realname
        );
      } else if (this.activeKey == 2) {
        //获取我的已办数据
        this.dataDoneList = await manageAPI.queryProcessLogDone(
          username,
          realname
        );
      } else if (this.activeKey == 3) {
        //获取我的消息数据
        this.dataDoneList = await manageAPI.queryProcessLogDone(
          username,
          realname
        );
      } else if (this.activeKey == 4) {
        //获取我的收藏数据
        this.dataDoneList = await manageAPI.queryProcessLogDone(
          username,
          realname
        );
      } else if (this.activeKey == 5) {
        //获取行政公告数据
        this.dataAnnounceList = await manageAPI.queryAnnounceList(
          username,
          realname
        );
      } else if (this.activeKey == 6) {
        //获取红头文件数据
        this.dataHeadList = await manageAPI.queryHeadList(username, realname);
      } else if (this.activeKey == 7) {
        //获取新闻资讯数据
        this.dataNewsList = await manageAPI.queryNewsList(username, realname);
      } else if (this.activeKey == 8) {
        //获取奖罚通报数据
        this.dataNoticeList = await manageAPI.queryNoticeList(
          username,
          realname
        );
      } else if (this.activeKey == 9) {
        //获取市场观察数据
        this.dataViewsList = await manageAPI.queryViewsList(username, realname);
      }
      this.spinning = false;
    },
    /**
     * @function 刷新近期访问统计
     */
    async reloadVisitData() {
      this.initLogInfo();
    },
    /**
     * @function 查看详情页面
     */
    async handleDetailWF(record) {
      //获取当前操作对象
      var curRow = JSON.parse(JSON.stringify(record));

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //获取选中记录的所属表单名称
      var tableName = curRow["tname"];

      //获取操作类型
      var type = curRow["type"] == "知会" ? "notify" : "workflow";

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&processLogID=${curRow.pid}&user=${userInfo.username}&type=${type}`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },
    /**
     * @function 查看详情页面
     */
    async handleAnnounceInfo(record, tableName) {
      //获取当前操作对象
      var curRow = JSON.parse(JSON.stringify(record));

      //获取当前用户
      var userInfo = storage.getStore("cur_user");

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=notify`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },
    /**
     * @function 获取近期用户访问统计，
     */
    async initLogInfo() {
      //查询登录统计数据
      getLoginfo(null).then(res => {
        if (res.success) {
          Object.keys(res.result).forEach(key => {
            res.result[key] = res.result[key] + "";
          });
          this.loginfo = res.result;
        }
      });
      //查询访问统计数据
      getVisitInfo().then(res => {
        if (res.success) {
          this.visitInfo = res.result;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
thead.ant-table-thead {
  display: none;
}
.circle-cust {
  position: relative;
  top: 28px;
  left: -100%;
}
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

/* 首页访问量统计 */
.head-info {
  position: relative;
  text-align: left;
  padding: 0 32px 0 0;
  min-width: 125px;

  &.center {
    text-align: center;
    padding: 0 32px;
  }

  span {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    font-size: 0.95rem;
    line-height: 42px;
    margin-bottom: 4px;
  }
  p {
    line-height: 42px;
    margin: 0;
    a {
      font-weight: 600;
      font-size: 1rem;
    }
  }
}
</style>


