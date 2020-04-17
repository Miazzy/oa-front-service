<template>
  <div class="home-index">
    <div class="page-header" style="margin-top: -10px; position: relative;">
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div class="header-content">
            <div class="ant-breadcrumb-title">
              <span>首页</span>
              <span class="ant-breadcrumb-separator">/</span>
              <span class="ant-breadcrumb-link">任务管理</span>
              <span class="ant-breadcrumb-separator">/</span>
              <span class="ant-breadcrumb-link">任务中心</span>
            </div>

            <div class="page-wrapper" style="position: absolute; top: 40px; left: 35px;">
              <div class="left-content">
                <div class="avatar">
                  <a-avatar :size="64" :src="avatar">
                    {{
                    userInfo.realname
                    }}
                  </a-avatar>
                </div>
              </div>

              <div class="right-content">
                <div class="content-item">
                  <div class="item-title muted">团队数目</div>
                  <div class="item-text">
                    <span>{{ accountsTotal }}</span>
                  </div>
                </div>
                <div class="content-item">
                  <div class="item-title muted">项目数目</div>
                  <div class="item-text">
                    <span>{{ projectTotal }}</span>
                  </div>
                </div>
                <div class="content-item">
                  <div class="item-title muted">任务数目</div>
                  <div class="item-text">
                    <span>{{ tasksTotal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!--<wrapper-content :showHeader="false">-->
    <div class="page-wrapper">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的项目"
            :body-style="{padding: 0}"
          >
            <router-link to="/project/list/my" slot="extra">全部项目</router-link>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projectList">
                <a-card
                  :bordered="false"
                  :body-style="{padding: 0}"
                  @click="routerLink('/project/space/task/' + item.code)"
                >
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover" />
                      <router-link :to="'/project/space/task/' + item.code">
                        <a-icon
                          type="star"
                          theme="filled"
                          style="color: #ffaf38; margin-right: 6px;"
                          v-show="item.collected"
                        />
                        {{ item.name }}
                      </router-link>
                    </div>
                    <div slot="description" class="card-description">
                      <a-tooltip :mouseEnterDelay="0.3" :title="item.description">
                        <span class="description-text">
                          <span v-if="item.description">
                            {{
                            item.description
                            }}
                          </span>
                          <span v-else>暂无介绍</span>
                        </span>
                      </a-tooltip>
                      <a-tooltip
                        placement="right"
                        :mouseEnterDelay="0.3"
                        :title="`当前进度：${item.schedule}%`"
                      >
                        <a-progress :strokeWidth="2" :showInfo="false" :percent="item.schedule" />
                      </a-tooltip>
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">{{ item.owner_name }}</a>
                    <span class="datetime">
                      {{
                      formatTime(item.create_time)
                      }}
                    </span>
                  </div>
                </a-card>
              </a-card-grid>
              <p class="muted text-center m-t-md m-b-md" v-if="!projectList.length">暂无项目</p>
            </div>
          </a-card>
          <a-card class="activities-list" :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.member_avatar" />
                  <div slot="title">
                    <span>{{ item.member_name }}</span>
                    <span v-if="item.is_comment == 0">
                      <span v-html="item.remark"></span>
                    </span>&nbsp;
                    <template v-if="item.is_comment == 1">
                      发表了评论
                      <p class="comment-text">{{ item.content }}</p>
                    </template>
                    <router-link
                      target="_blank"
                      :to="`/project/space/task/${item.project_code}/detail/${item.source_code}`"
                      class="right-item"
                    >「 {{ item.task_name }} 」</router-link>
                  </div>
                  <div slot="description">
                    <!--<a-tooltip :mouseEnterDelay="0.3" :title="item.create_time">-->
                    {{ formatTime(item.create_time) }} -
                    <router-link
                      target="_blank"
                      :to="`/project/space/task/${item.project_code}`"
                      class="muted"
                    >{{ item.project_name }}</router-link>
                    <!--</a-tooltip>-->
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px;" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="tasks-list"
            :title="`我的任务 · ${tasks.length}`"
            style="margin-bottom: 24px;"
            :bordered="false"
            :loading="loading"
          >
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in tasks">
                <a-list-item-meta>
                  <div slot="title" style="float: left;">
                    <a-tag :color="tags[item.pri].color">
                      {{
                      tags[item.pri].name
                      }}
                    </a-tag>
                    <router-link
                      target="_blank"
                      :to="`/project/space/task/${item.projectInfo.code}/detail/${item.code}`"
                    >{{ item.name }}</router-link>
                  </div>
                  <div slot="description" style="float: right;">
                    <span
                      class="label m-r-xs"
                      :class="showTimeLabel(item.end_time)"
                      v-if="item.end_time"
                    >{{ showTaskTime(item.begin_time, item.end_time) }}</span>
                    <router-link
                      target="_blank"
                      class="muted"
                      :to="'/project/space/task/' + item.projectInfo.code"
                    >{{ item.projectInfo.name }}</router-link>
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
          <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in accounts" :key="index">
                  <a
                    @click="
                      routerLink(
                        '/members/profile/' +
                          item.membar_account_code +
                          '?key=3'
                      )
                    "
                    style="display: flex; align-items: center;"
                  >
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!--</wrapper-content>-->
  </div>
</template>
<script>
import { mapState } from "vuex";
//import moment from 'moment';
import { getYiYan } from "@/pearapi/other";
import {
  formatTaskTime,
  relativelyTime,
  showHelloTime
} from "@/assets/js/dateTime";
import { selfList as getProjectList } from "@/pearapi/project";
import { list as accountList } from "@/pearapi/user";
import pagination from "@/mixins/pagination";
import { getLogBySelfProject, selfList } from "@/pearapi/task";
import * as storage from "@/utils/storage";
import * as manageAPI from "@/api/manage";

export default {
  components: {},
  mixins: [pagination],
  data() {
    return {
      loading: false,
      yiyan: {},
      projectList: [],
      projectTotal: 0,
      activities: [],
      tasks: [],
      tasksTotal: 0,
      accounts: [],
      userInfo: {},
      avatar: "",
      tags: {
        0: {
          name: "普通",
          color: "green"
        },
        1: {
          name: "紧急",
          color: "orange"
        },
        2: {
          name: "非常紧急",
          color: "red"
        }
      }
    };
  },
  computed: {
    ...mapState({
      socketAction: state => state.socketAction
    }),
    helloTime() {
      return showHelloTime();
    }
  },
  async created() {
    //获取员工基本信息
    this.userInfo = storage.getStore("cur_user");

    //设置员工岗位信息/部门信息
    try {
      this.v_user = await manageAPI.queryUserInfoByView(this.userInfo.username);

      this.postName = this.v_user[0]["post"];
      this.departName = this.v_user[0]["name"];

      this.address = this.v_user[0]["address"];
      this.bio = this.v_user[0]["bio"];

      //设置头像信息
      this.avatar = this.userInfo.avatar =
        window._CONFIG["imgDomainURL"] + "/" + this.v_user[0]["avatar"];
    } catch (error) {
      console.log("工作台设置员工岗位信息/部门信息异常：" + error);
    }

    //初始化任务中心页面
    try {
      this.init();
    } catch (error) {
      console.error(error);
    }
  },
  watch: {
    $route: function(to, from) {
      this.init();
    },
    socketAction(val) {
      console.log(val);
      if (val.action === "organization:task") {
        this.init(false, false);
      }
    }
  },
  methods: {
    init(reset = true, loading = true) {
      if (reset) {
        this.projectList = [];
        this.pagination.page = 1;
        this.pagination.pageSize = 9;
      }

      try {
        this.getProjectList(loading);
      } catch (error) {
        console.error(error);
      }

      try {
        this.getTasks();
      } catch (error) {
        console.error(error);
      }

      try {
        this.getTaskLog();
      } catch (error) {
        console.error(error);
      }

      try {
        this.getAccountList();
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * @function 获取项目信息
     */
    getProjectList(loading) {
      //加载数据
      if (loading) {
        this.loading = true;
      }

      //项目数据
      var res = JSON.parse(
        `{"code":200,"msg":"","data":{"list":[{"id":15566,"cover":"https:\/\/beta.vilson.xyz\/static\/image\/default\/project-cover.png","name":"yunwisdom","code":"vu7x3wgk1jq9slhf8odpzbnm","description":"","access_control_type":"open","white_list":null,"order":0,"deleted":0,"template_code":"","schedule":90,"create_time":"2020-02-29 14:53:50","organization_code":"3c6wv21apdm0ro84jbxqeylk","deleted_time":null,"private":0,"prefix":"TESTProjec","open_prefix":1,"archive":0,"archive_time":null,"open_begin_time":1,"open_task_private":0,"task_board_theme":"simple","begin_time":null,"end_time":null,"auto_update_schedule":0,"collected":1,"owner_name":"yunwisdom"}],"total":1}}`
      );

      this.projectList = res.data.list;
      this.projectTotal = res.data.total;

      //停止加载数据
      this.loading = false;
    },
    getTasks() {
      var res = JSON.parse(
        `{"code":200,"msg":"","data":{"list":[{"id":18301,"code":"il8vco3qyd2fkgnersp4w79a","project_code":"vu7x3wgk1jq9slhf8odpzbnm","name":"少时诵诗书","pri":2,"execute_status":"wait","description":"","create_by":"9opr8l5caxq4sd6m37hbiz1t","done_by":null,"done_time":null,"create_time":"2020-02-29 14:54:12","assign_to":"9opr8l5caxq4sd6m37hbiz1t","deleted":0,"stage_code":"uv1qs06lirwt752b8gxh9ozk","task_tag":null,"done":0,"begin_time":"","end_time":"","remind_time":null,"pcode":"","sort":2,"like":0,"star":0,"deleted_time":null,"private":0,"id_num":3,"path":"","schedule":90,"version_code":"0","features_code":"0","work_time":0,"status":0,"cover":"https:\/\/beta.vilson.xyz\/static\/image\/default\/project-cover.png","access_control_type":"open","white_list":null,"order":0,"template_code":"","organization_code":"3c6wv21apdm0ro84jbxqeylk","prefix":"TESTProjec","open_prefix":1,"archive":0,"archive_time":null,"open_begin_time":1,"open_task_private":0,"task_board_theme":"simple","auto_update_schedule":0,"priText":"普通","executor":{"name":"yunwisdom","avatar":"https:\/\/static.vilson.online\/cover.png"},"projectInfo":{"name":"yunwisdom","code":"vu7x3wgk1jq9slhf8odpzbnm"}},{"id":18300,"code":"nb3y2xd7sfgmz9ch6al5w14q","project_code":"vu7x3wgk1jq9slhf8odpzbnm","name":"asdfasdf","pri":0,"execute_status":"wait","description":"","create_by":"9opr8l5caxq4sd6m37hbiz1t","done_by":null,"done_time":null,"create_time":"2020-02-29 14:54:05","assign_to":"9opr8l5caxq4sd6m37hbiz1t","deleted":0,"stage_code":"uv1qs06lirwt752b8gxh9ozk","task_tag":null,"done":0,"begin_time":"","end_time":"","remind_time":null,"pcode":"","sort":0,"like":0,"star":0,"deleted_time":null,"private":0,"id_num":2,"path":"","schedule":90,"version_code":"0","features_code":"0","work_time":0,"status":0,"cover":"https:\/\/beta.vilson.xyz\/static\/image\/default\/project-cover.png","access_control_type":"open","white_list":null,"order":0,"template_code":"","organization_code":"3c6wv21apdm0ro84jbxqeylk","prefix":"TESTProjec","open_prefix":1,"archive":0,"archive_time":null,"open_begin_time":1,"open_task_private":0,"task_board_theme":"simple","auto_update_schedule":0,"priText":"普通","executor":{"name":"yunwisdom","avatar":"https:\/\/static.vilson.online\/cover.png"},"projectInfo":{"name":"yunwisdom","code":"vu7x3wgk1jq9slhf8odpzbnm"}},{"id":18299,"code":"xt9630ybg412jovrscp8iknz","project_code":"vu7x3wgk1jq9slhf8odpzbnm","name":"asdfasdf","pri":1,"execute_status":"wait","description":"","create_by":"9opr8l5caxq4sd6m37hbiz1t","done_by":null,"done_time":null,"create_time":"2020-02-29 14:54:02","assign_to":"9opr8l5caxq4sd6m37hbiz1t","deleted":0,"stage_code":"uv1qs06lirwt752b8gxh9ozk","task_tag":null,"done":0,"begin_time":"","end_time":"","remind_time":null,"pcode":"","sort":1,"like":0,"star":0,"deleted_time":null,"private":0,"id_num":1,"path":"","schedule":90,"version_code":"0","features_code":"0","work_time":0,"status":0,"cover":"https:\/\/beta.vilson.xyz\/static\/image\/default\/project-cover.png","access_control_type":"open","white_list":null,"order":0,"template_code":"","organization_code":"3c6wv21apdm0ro84jbxqeylk","prefix":"TESTProjec","open_prefix":1,"archive":0,"archive_time":null,"open_begin_time":1,"open_task_private":0,"task_board_theme":"simple","auto_update_schedule":0,"priText":"普通","executor":{"name":"yunwisdom","avatar":"https:\/\/static.vilson.online\/cover.png"},"projectInfo":{"name":"yunwisdom","code":"vu7x3wgk1jq9slhf8odpzbnm"}}],"total":3}}`
      );
      this.tasks = res.data.list;
      this.tasksTotal = res.data.total;
    },
    getTaskLog() {
      var res = JSON.parse(
        `{"code":200,"msg":"","data":[{"remark":"将任务移动到 已完成","content":"asdfasdf","is_comment":0,"create_time":"2020-04-03 10:12:42","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"xt9630ybg412jovrscp8iknz","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"将任务移动到 已完成","content":"asdfasdf","is_comment":0,"create_time":"2020-04-03 10:12:39","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"nb3y2xd7sfgmz9ch6al5w14q","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"将任务移动到 进行中","content":"asdfasdf","is_comment":0,"create_time":"2020-02-29 14:54:14","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"xt9630ybg412jovrscp8iknz","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"认领了任务 ","content":"","is_comment":0,"create_time":"2020-02-29 14:54:12","project_name":"yunwisdom","task_name":"少时诵诗书","source_code":"il8vco3qyd2fkgnersp4w79a","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"创建了任务 ","content":"少时诵诗书","is_comment":0,"create_time":"2020-02-29 14:54:12","project_name":"yunwisdom","task_name":"少时诵诗书","source_code":"il8vco3qyd2fkgnersp4w79a","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"认领了任务 ","content":"","is_comment":0,"create_time":"2020-02-29 14:54:05","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"nb3y2xd7sfgmz9ch6al5w14q","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"创建了任务 ","content":"asdfasdf","is_comment":0,"create_time":"2020-02-29 14:54:05","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"nb3y2xd7sfgmz9ch6al5w14q","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"认领了任务 ","content":"","is_comment":0,"create_time":"2020-02-29 14:54:02","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"xt9630ybg412jovrscp8iknz","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"},{"remark":"创建了任务 ","content":"asdfasdf","is_comment":0,"create_time":"2020-02-29 14:54:02","project_name":"yunwisdom","task_name":"asdfasdf","source_code":"xt9630ybg412jovrscp8iknz","project_code":"vu7x3wgk1jq9slhf8odpzbnm","member_avatar":"https:\/\/static.vilson.online\/cover.png","member_name":"yunwisdom"}]}`
      );
      this.activities = res.data;
    },
    getAccountList() {
      var res = JSON.parse(
        `{"code":200,"msg":"","data":{"total":1,"page":"1","list":[{"id":2288,"code":"due6mrhp58yqwbktcv3l7x9o","member_code":"9opr8l5caxq4sd6m37hbiz1t","organization_code":"3c6wv21apdm0ro84jbxqeylk","department_code":"","authorize":null,"is_owner":1,"name":"yunwisdom","mobile":null,"email":"qq695926920@163.com","create_time":"2020-02-29 14:53:17","last_login_time":null,"status":1,"description":null,"avatar":"https:\/\/static.vilson.online\/cover.png","position":"资深工程师","department":"某某公司－某某某事业群－某某平台部－某某技术部－BM","membar_account_code":"due6mrhp58yqwbktcv3l7x9o","departments":"","statusText":"使用中","authorizeArr":[]}],"authList":[{"id":"3584","title":"管理员","status":1,"sort":0,"desc":"管理员","create_by":0,"create_at":"2018-08-01 14:20:46","organization_code":"3c6wv21apdm0ro84jbxqeylk","is_default":1,"type":"admin","canDelete":0},{"id":"3585","title":"技术开发","status":1,"sort":0,"desc":"技术开发人员","create_by":0,"create_at":"2018-12-20 13:39:59","organization_code":"3c6wv21apdm0ro84jbxqeylk","is_default":0,"type":"member","canDelete":0}]}}`
      );
      this.accounts = res.data.list;
      this.accountsTotal = res.data.total;
    },
    formatTime(time) {
      return relativelyTime(time);
    },
    showTaskTime(time, timeEnd) {
      return formatTaskTime(time, timeEnd);
    },
    showTimeLabel(time) {
      let str = "label-primary";
      if (time == null) {
        return str;
      }
      let cha = moment(moment(time).format("YYYY-MM-DD")).diff(
        moment().format("YYYY-MM-DD"),
        "days"
      );
      if (cha < 0) {
        str = "label-danger";
      } else if (cha == 0) {
        str = "label-warning";
      } else if (cha > 7) {
        str = "label-normal";
      }
      return str;
    }
  }
};
</script>
<style lang="less">
.home-index {
  .page-header {
    margin-left: 0px;
    margin-right: 0px;
    background-color: #ffffff;

    .header-content {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      height: 120px;

      .ant-breadcrumb-title {
        display: block;
        height: 20px;
        margin-top: 15px;
        margin-left: 35px;
      }

      .left-content {
        display: flex;
        align-items: center;
        float: left;

        .user-info {
          margin-left: 12px;
          line-height: 33px;

          .title {
            font-size: 20px;
          }

          .team {
          }
        }
      }

      .right-content {
        display: flex;
        float: right;

        .content-item {
          padding: 0 32px;
          position: relative;

          .item-text {
            font-size: 30px;

            .small {
              font-size: 20px;
            }
          }

          &:after {
            background-color: #e8e8e8;
            position: absolute;
            top: 8px;
            right: 0;
            width: 1px;
            height: 40px;
            content: "";
          }

          &:last-child {
            &:after {
              width: 0;
            }
          }
        }
      }
    }
  }

  .page-wrapper {
    margin: 12px;

    margin-left: 0px;
    margin-right: 0px;

    .project-list {
      .card-title {
        font-size: 0;

        a {
          color: rgba(0, 0, 0, 0.85);
          margin-left: 12px;
          line-height: 24px;
          height: 24px;
          display: inline-block;
          vertical-align: top;
          font-size: 14px;

          &:hover {
            color: #1890ff;
          }
        }
      }

      .card-description {
        color: rgba(0, 0, 0, 0.45);
        height: 44px;
        line-height: 22px;
        overflow: hidden;
        .description-text {
          height: 22px;
        }
      }

      .project-item {
        display: flex;
        margin-top: 8px;
        overflow: hidden;
        font-size: 12px;
        height: 20px;
        line-height: 20px;

        a {
          color: rgba(0, 0, 0, 0.45);
          display: inline-block;
          flex: 1 1 0;

          &:hover {
            color: #1890ff;
          }
        }

        .datetime {
          color: rgba(0, 0, 0, 0.25);
          flex: 0 0 auto;
          float: right;
        }
      }

      .ant-card-meta-description {
        color: rgba(0, 0, 0, 0.45);
        height: 44px;
        line-height: 22px;
        overflow: hidden;
      }
    }

    .activities-list {
      .ant-list-item-meta-title {
        position: relative;
      }

      .comment-text {
        margin-bottom: 0;
      }

      .right-item {
        float: right;
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .tasks-list {
      .ant-card-body {
        padding: 6px 24px;
      }
    }

    .item-group {
      padding: 20px 0 8px 24px;
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.65);
        display: inline-block;
        font-size: 14px;
        margin-bottom: 13px;
        width: 25%;
      }
    }

    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;

        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 6px;
          transition: all 0.3s;
          display: inline-block;
        }

        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
