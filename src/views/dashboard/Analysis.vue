<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="总销售额" total="￥126,560">
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
            日均销售额
            <span>￥ 234.56</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="访问量" :total="8846 | NumberFormat">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <template slot="footer">
            日访问量
            <span>{{ '1234' | NumberFormat }}</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="支付笔数" :total="6560 | NumberFormat">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar :height="40" />
          </div>
          <template slot="footer">
            转化率
            <span>60%</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="运营活动效果" total="78%">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" :height="8" />
          </div>
          <template slot="footer">
            <trend flag="down" style="margin-right: 16px;">
              <span slot="term">同周比</span>
              12%
            </trend>
            <trend flag="up">
              <span slot="term">日环比</span>
              80%
            </trend>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="我的待办" key="1" style>
            <template>
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
                    <a :data-info="JSON.stringify(record)" @click="handleDetailWF(record)">
                      <span v-html="record.topic"></span>
                    </a>
                  </a-menu-item>
                </a>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="我的已办" key="2">
            <template>
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
                    <a href="javascript:;" @click="handleDetailWF(record)">
                      <span v-html="record.topic"></span>
                    </a>
                  </a-menu-item>
                </a>
              </a-table>
            </template>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="我的消息" key="3">
            <a-row>
              <a-col :xl="24" :lg="12" :md="12" :sm="24" :xs="24">
                <div title="消息列表"></div>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="我的收藏" key="4">
            <a-row>
              <a-col :xl="24" :lg="12" :md="12" :sm="24" :xs="24">
                <div title="收藏列表"></div>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="行政公告" key="5">
            <a-row>
              <a-col :xl="24" :lg="12" :md="12" :sm="24" :xs="24">
                <div title="行政公告"></div>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane loading="true" tab="红头文件" key="6">
            <a-row>
              <a-col :xl="24" :lg="12" :md="12" :sm="24" :xs="24">
                <div title="红头文件"></div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <a-row>
      <a-col :span="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="最近一周访问次数统计"
          :style="{ marginTop: '24px' }"
        >
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
import { queryProcessLogWait, queryProcessLogDone } from "@/api/manage";
import { getStore } from "@/utils/storage";

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
const columns = JSON.parse(
  '[{"title":"状态","dataIndex":"type","key":"type","slots":{"title":"type"},"width":100,"align":"center","scopedSlots":{"customRender":"type"}},{"title":"业务","width":200,"align":"center","key":"name","dataIndex":"name"},{"title":"主题","width":500,"align":"left","key":"topic","dataIndex":"topic","scopedSlots":{"customRender":"topic"}},{"title":"操作人员","key":"username","width":200,"align":"left","dataIndex":"username"},{"title":"创建时间","width":150,"align":"center","key":"create_time","dataIndex":"create_time"}]'
);

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
      center: null,
      rankList,
      barData,
      loginfo: {},
      visitFields: ["ip", "visit"],
      visitInfo: [],
      indicator: <a-icon type="loading" style="font-size: 24px" spin />,
      dataWaitList: [],
      dataDoneList: [],
      columns,
      loadingMore: false,
      showLoadingMore: true
    };
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading;
    }, 1000);
    this.initLogInfo();
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      //获取用户信息
      let userInfo = getStore("cur_user");
      //获取查询参数
      let params = { pageNo: 1, pageSize: 30 };

      //获取我的待办数据
      this.dataWaitList = await queryProcessLogWait(
        userInfo["username"],
        userInfo["realname"],
        params
      );

      //获取我的已办数据
      this.dataDoneList = await queryProcessLogDone(
        userInfo["username"],
        userInfo["realname"],
        params
      );
    },
    /**
     * @function 查看详情页面
     */
    async handleDetailWF(record) {
      //获取当前操作对象
      var curRow = JSON.parse(JSON.stringify(record));

      //获取当前用户
      var userInfo = getStore("cur_user");

      //获取选中记录的所属表单名称
      var tableName = curRow["tname"];

      //获取操作类型
      var type = curRow["type"] == "知会" ? "notify" : "workflow";

      //设置跳转URL
      var detailURL = `/workflow/view?table_name=${tableName}&id=${curRow.id}&user=${userInfo.username}&type=${type}`;

      //跳转到相应页面
      this.$router.push(detailURL);
    },

    initLogInfo() {
      getLoginfo(null).then(res => {
        if (res.success) {
          Object.keys(res.result).forEach(key => {
            res.result[key] = res.result[key] + "";
          });
          this.loginfo = res.result;
        }
      });
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