<template>
  <div class="version-detail">
    <a-spin class="version-detail-spin" :spinning="loading">
      <div class="task-header">
        <span class="head-title">
          <span>{{ version.featureName }}</span>
        </span>
        <span class="header-action text-right">
          <template>
            <a-dropdown :trigger="['click']" placement="bottomCenter" v-model="visibleTaskMenu">
              <a-tooltip :mouseEnterDelay="0.5">
                <template slot="title">
                  <span>打开菜单</span>
                </template>
                <a class="action-item muted">
                  <a-icon type="ellipsis" />
                </a>
              </a-tooltip>
              <a-menu @click="doVersion" class="field-right-menu" slot="overlay">
                <a-menu-item key="delete">
                  <a-icon type="delete"></a-icon>
                  <span>删除版本</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <a-tooltip :mouseEnterDelay="0.5">
            <template slot="title">
              <span>关闭面板</span>
            </template>
            <a class="action-item muted" @click="detailClose">
              <a-icon type="close" />
            </a>
          </a-tooltip>
        </span>
      </div>
      <div class="task-wrap">
        <div class="task-content">
          <div class="content-left">
            <vue-scroll :ops="scrollOps">
              <div class="task-title" :class="{disabled: disableEdit}">
                <a-input
                  ref="inputTitle"
                  auto-focus
                  @blur="doName"
                  v-model="version.name"
                  size="large"
                  v-show="showEditName"
                />
                <a-tooltip :mouseEnterDelay="0.5" v-if="!disableEdit">
                  <template slot="title">
                    <span>点击即可编辑</span>
                  </template>
                  <div
                    class="title-text"
                    @click="editTitle"
                    v-show="!showEditName"
                  >{{ version.name }}</div>
                </a-tooltip>
                <div v-else class="title-text" v-show="!showEditName">{{ version.name }}</div>
              </div>
              <div class="task-basic-attrs-view muted">
                <div class="field-list" :class="{disabled: disableEdit}">
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="check-square" />
                        <span class="field-name">状态</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          placement="bottomCenter"
                          :trigger="['click']"
                          :disabled="!!task.deleted || !!task.hasUnDone"
                          :class="{disabled: task.hasUnDone}"
                        >
                          <a-tooltip placement="top">
                            <template slot="title">
                              <span v-if="disableEdit" style="font-size: 12px;">版本已发布，不能编辑</span>
                            </template>
                            <span>
                              <span class="version-status" :class="`status-${version.status}`">
                                <a-icon type="schedule" />
                                <span class="m-l-xs">
                                  {{
                                  version.statusText
                                  }}
                                </span>
                              </span>
                            </span>
                          </a-tooltip>
                          <a-menu
                            class="field-right-menu"
                            slot="overlay"
                            :selectable="false"
                            v-show="!disableEdit"
                            @click="changeVersionStatus"
                          >
                            <a-menu-item key="0">
                              <div class="menu-item-content">
                                <a-tag>未开始</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="version.status == 0"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item key="1">
                              <div class="menu-item-content">
                                <a-tag color="blue">进行中</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="version.status == 1"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item key="2">
                              <div class="menu-item-content">
                                <a-tag color="red">延期发布</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="version.status == 2"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item key="3">
                              <div class="menu-item-content">
                                <a-tag color="green">已发布</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="version.status == 3"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="calendar" />
                        <span class="field-name">开始时间</span>
                      </div>
                      <div class="field-right field-date">
                        <a-dropdown
                          :trigger="['click']"
                          v-model="showStartTime"
                          :disabled="disableEdit"
                        >
                          <a-tooltip :mouseEnterDelay="0.5" v-if="!disableEdit">
                            <template slot="title">
                              <span>点击设置开始时间</span>
                            </template>
                            <div class="field-flex">
                              <a class="muted name" style="margin: 0;">
                                <template v-if="!version.setStartTime">设置开始时间</template>
                                <template v-else>
                                  {{
                                  version.start_time_format
                                  }}
                                </template>
                              </a>
                            </div>
                          </a-tooltip>
                          <div class="field-flex" v-else>
                            <a class="muted name" style="margin: 0;">
                              <template v-if="!version.setStartTime">设置开始时间</template>
                              <template v-else>
                                {{
                                version.start_time_format
                                }}
                              </template>
                            </a>
                          </div>
                          <div slot="overlay">
                            <a-date-picker
                              v-model="version.start_time"
                              size="small"
                              format="MM月DD日 HH:mm"
                              showTime
                              allowClear
                              :showToday="false"
                              :open="showStartTime"
                              @ok="doStartTime(true)"
                            >
                              <template slot="renderExtraFooter">
                                <a
                                  style="position: absolute;"
                                  size="small"
                                  @click="doStartTime(false)"
                                >清除</a>
                              </template>
                            </a-date-picker>
                          </div>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="calendar" />
                        <span class="field-name">发布时间</span>
                      </div>
                      <div class="field-right field-date">
                        <a-dropdown
                          :trigger="['click']"
                          v-model="showPlanPublishTime"
                          :disabled="disableEdit"
                        >
                          <a-tooltip :mouseEnterDelay="0.5" v-if="!disableEdit">
                            <template slot="title">
                              <span>点击设置发布时间</span>
                            </template>
                            <div class="field-flex">
                              <a class="muted name" style="margin: 0;">
                                <template v-if="!version.setPlanPublishTime">设置发布时间</template>
                                <template v-else>
                                  {{
                                  version.plan_publish_time_format
                                  }}
                                </template>
                              </a>
                            </div>
                          </a-tooltip>
                          <div class="field-flex" v-else>
                            <a class="muted name" style="margin: 0;">
                              <template v-if="!version.setPlanPublishTime">设置发布时间</template>
                              <template v-else>
                                {{
                                version.plan_publish_time_format
                                }}
                              </template>
                            </a>
                          </div>
                          <div slot="overlay">
                            <a-date-picker
                              v-model="version.plan_publish_time"
                              size="small"
                              format="MM月DD日 HH:mm"
                              showTime
                              allowClear
                              :showToday="false"
                              :open="showPlanPublishTime"
                              @ok="doPlanPublishTime(true)"
                            >
                              <template slot="renderExtraFooter">
                                <a
                                  style="position: absolute;"
                                  size="small"
                                  @click="doPlanPublishTime(false)"
                                >清除</a>
                              </template>
                            </a-date-picker>
                          </div>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="fire" />
                        <span class="field-name">完成进度</span>
                      </div>
                      <div class="field-right width-block">
                        <a-tooltip
                          placement="top"
                          :mouseEnterDelay="0.3"
                          :title="`系统自动统计当前版本的完成进度`"
                        >
                          <a-progress :strokeWidth="4" :percent="version.schedule" />
                        </a-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="file-text" />
                        <span class="field-name">备注</span>
                      </div>
                      <div class="field-right width-block">
                        <div
                          class="task-description"
                          :class="{disabled: disableEdit}"
                          v-show="!showVersionDescriptionEdit"
                          @click="showVersionDesc"
                        >
                          <div
                            class="description-txt"
                            v-show="version.description"
                            v-html="version.description"
                          ></div>
                          <span v-show="!version.description">添加备注</span>
                        </div>
                        <div v-show="showVersionDescriptionEdit">
                          <a-input type="textarea" v-model="version.description"></a-input>
                          <div class="action-btn pull-right">
                            <a
                              type="text"
                              class="cancel-text muted"
                              @click="showVersionDescriptionEdit = false"
                            >取消</a>
                            <a-button
                              type="primary"
                              htmlType="submit"
                              class="middle-btn"
                              @click="doContent"
                            >保存</a-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="bars" />
                        <span class="field-name">
                          发布内容
                          <span v-show="versionTaskSchedule !== false">
                            · {{ versionTaskDoneNum }}/{{
                            versionTaskList.length
                            }}
                          </span>
                        </span>
                      </div>
                      <div class="field-right width-block"></div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="block-field width-block">
                        <div class="task-child">
                          <div class="task-list" v-show="versionTaskList.length">
                            <div
                              v-for="(versionTask, index) in versionTaskList"
                              :key="versionTask.code"
                            >
                              <div class="list-item task">
                                <div
                                  class="check-box-wrapper task-item"
                                  @click.stop="showTaskDetail(versionTask)"
                                >
                                  <a-icon
                                    class="check-box disabled"
                                    :type="
                                      versionTask.done
                                        ? 'check-square'
                                        : 'border'
                                    "
                                    :style="{fontSize: '16px'}"
                                  />
                                </div>
                                <a-tooltip :mouseEnterDelay="0.5">
                                  <template slot="title">
                                    <span v-if="versionTask.executor">
                                      {{
                                      versionTask.executor.name
                                      }}
                                    </span>
                                    <span v-else>待认领</span>
                                  </template>
                                  <div @click.stop="showTaskDetail(versionTask)">
                                    <a-avatar
                                      v-if="versionTask.executor"
                                      class="task-item"
                                      size="small"
                                      icon="user"
                                      :src="versionTask.executor.avatar"
                                    ></a-avatar>
                                    <a-avatar v-else class="task-item" size="small" icon="user"></a-avatar>
                                  </div>
                                </a-tooltip>
                                <div
                                  class="task-item task-title"
                                  @click.stop="showTaskDetail(versionTask)"
                                >
                                  <div class="title-text">{{ versionTask.name }}</div>
                                </div>
                                <span class="m-r muted">
                                  <span v-if="versionTask.done" class="text-success">已完成</span>
                                  <span v-else>未完成</span>
                                </span>
                                <a class="muted" @click.stop="removeVersionTask(versionTask)">
                                  <a-icon class="task-item" type="delete" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <a-tooltip placement="top">
                            <a
                              class="add-handler"
                              :class="{disabled: disableEdit}"
                              v-show="!showChildTask"
                              @click="getTaskStages"
                            >
                              <a-icon type="plus" style="margin-right: 6px;" />添加发布内容
                            </a>
                          </a-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vue-scroll>
          </div>
          <div class="content-right">
            <div class="log-wrap">
              <div class="header">
                <span class="text-default">所有动态</span>
              </div>
              <vue-scroll>
                <div class="log-list muted">
                  <a class="show-more muted" v-show="checkShowMoreLog" @click="getMoreVersionLog">
                    <a-icon type="ellipsis" />
                    显示较早的 {{ versionLogTotal - versionLog.length }} 条动态
                  </a>
                  <div class="list-item" v-for="log in versionLog" :key="log.code">
                    <template>
                      <a-icon class="log-item" :type="log.icon" />
                      <div class="log-item log-txt">
                        <div>
                          {{ log.member.name }}
                          <span v-html="log.remark"></span>
                        </div>
                        <div v-if="log.content" class="log-content" v-html="log.content"></div>
                      </div>
                    </template>
                    <a-tooltip :mouseEnterDelay="0.5">
                      <template slot="title">
                        <span>{{ log.create_time }}</span>
                      </template>
                      <span class="log-item">
                        {{
                        log.create_time | formatLogTime
                        }}
                      </span>
                    </a-tooltip>
                  </div>
                </div>
              </vue-scroll>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
    <a-modal
      destroyOnClose
      :width="360"
      v-model="publishVersion.modalStatus"
      title="实际发布时间"
      :bodyStyle="{paddingBottom: '1px'}"
      :footer="null"
    >
      <a-form @submit.prevent="handleSubmitPublishVersion" :form="publishVersionForm">
        <a-form-item>
          <a-date-picker
            showTime
            format="YYYY年MM月DD日 HH:mm"
            style="width: 100%;"
            placeholder="选择实际发布时间"
            v-decorator="['publishTime']"
          ></a-date-picker>
        </a-form-item>
        <a-form-item>
          <div class="action-btn">
            <a-button
              type="primary"
              htmlType="submit"
              block
              size="large"
              :loading="publishVersion.confirmLoading"
              class="middle-btn"
            >确认发布</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      destroyOnClose
      class="publish-task-modal"
      :width="800"
      v-model="publishTask.modalStatus"
      title="规划发布内容"
      :footer="null"
    >
      <div>
        <p v-show="publishTask.selectTaskList.length">
          已选择
          <span class="text-warning">
            {{
            publishTask.selectTaskList.length
            }}
          </span>
          项
        </p>
        <p class="muted" v-show="!publishTask.selectTaskList.length">请勾选需要发布的内容</p>
      </div>
      <vue-scroll>
        <div class="publish-task">
          <a-checkbox-group v-model="publishTask.selectTaskList">
            <div
              v-for="(taskStages, stageIndex) in publishTask.taskStages"
              :key="stageIndex"
              class="m-b"
            >
              <strong>{{ taskStages.name }}</strong>
              <a-list
                class="publish-task-list"
                :loading="taskStages.tasksLoading"
                itemLayout="horizontal"
                :dataSource="taskStages.tasks"
              >
                <a-list-item slot="renderItem" slot-scope="task, index">
                  <a-list-item-meta>
                    <div slot="title" :class="{muted: task.version_code}">{{ task.name }}</div>
                    <div slot="avatar">
                      <a-checkbox :value="task.code"></a-checkbox>
                    </div>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </a-checkbox-group>
        </div>
      </vue-scroll>
      <div class="footer-item text-right m-t">
        <a-button type="primary" size="large" class="middle-btn" @click="addVersionTask">保存</a-button>
      </div>
    </a-modal>
    <a-modal
      destroyOnClose
      class="task-detail-modal"
      width="min-content"
      :closable="false"
      v-model="showTaskDetailModal"
      title
      :footer="null"
      @cancel="taskDetailClose"
    >
      <task-detail :taskCode="taskCode" @close="taskDetailClose"></task-detail>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
//import moment from "moment";
import taskDetail from "@/components/project/taskDetail";
//import * as $ from 'jquery';
import {
  edit,
  del,
  read as getVersionInfo,
  getVersionTask,
  getVersionLog
} from "@/pearapi/projectVersion";
import { relativelyTaskTime, relativelyTime } from "@/assets/js/dateTime";
import { checkResponse } from "@/assets/js/utils";
import {
  addVersionTask,
  changeStatus,
  removeVersionTask
} from "@/pearapi/projectVersion";
import { list as getTaskStages, tasks as getTasks } from "@/pearapi/taskStages";
import { notice } from "@/assets/js/notice";

export default {
  name: "version-detail",
  components: {
    taskDetail
  },
  props: {
    versionCode: {
      type: [String],
      default() {
        return "";
      }
    },
    width: {
      type: [String, Number],
      default() {
        return "1200";
      }
    }
  },
  data() {
    return {
      loading: false,
      code: this.versionCode,
      projectCodeCurrent: "",
      task: {},
      showTaskDetailModal: false,
      taskCode: "",
      version: {},

      /*菜单*/
      visibleTaskMenu: false,

      /*标题*/
      versionName: "",

      /*日期*/
      showEditName: false,
      showStartTime: false,
      showPlanPublishTime: false,

      /*备注*/
      showVersionDescriptionEdit: false,

      versionTaskList: [],
      showChildTask: false,
      versionLogTotal: 0,
      versionLog: [],

      publishVersionForm: this.$form.createForm(this),
      publishVersion: {
        modalStatus: false,
        confirmLoading: false,
        status: -1
      },

      showMoreTaskLog: 0,
      hasMoreVersionLog: false,
      hideShowMore: false,

      publishTask: {
        modalStatus: false,
        confirmLoading: false,
        loading: false,
        selectTaskList: [],
        taskStages: []
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
    disableEdit() {
      return this.version.status == 3;
    },
    versionTaskDoneNum() {
      const list = this.versionTaskList.filter(item => item.done == 1);
      return list.length;
    },
    checkShowMoreLog() {
      if (!this.hideShowMore) {
        if (this.versionLogTotal > 5) {
          return true;
        }
      }
      return false;
    },
    versionTaskSchedule() {
      if (!this.versionTaskList.length) {
        return false;
      }
      return (this.versionTaskDoneNum / this.versionTaskList.length) * 100;
    },
    scrollOps() {
      return {
        rail: {
          background: "#e5e5e5",
          opacity: 1
        },
        bar: {
          keepShow: true
        }
      };
    }
  },
  watch: {
    $route(to, from) {
      // if (from.name == 'taskdetail') {
      //     this.init();
      // }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.changeModalHeight();
    window.onresize = () => {
      return (() => {
        this.changeModalHeight();
      })();
    };
    document.onkeydown = event => {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (13 == e.keyCode && e.ctrlKey) {
        //处理的部分
        this.createComment();
      }
    };
  },
  filters: {
    formatLogTime(value) {
      return relativelyTime(value);
    }
  },
  methods: {
    init() {
      this.loading = true;
      this.getVersion();
      this.getVersionTask();
    },
    detailClose() {
      this.$emit("close", this.version);
    },
    getVersion() {
      getVersionInfo({ versionCode: this.code }).then(res => {
        this.getVersionLog();
        this.version = res.data;
        this.versionName = res.data.name;
        if (!this.version.start_time) {
          this.version.setStartTime = false;
          this.version.start_time = moment(
            moment().format("YYYY-MM-DD") + " 18:00"
          );
        } else {
          this.version.setStartTime = true;
          this.version.start_time = moment(this.version.start_time);
        }
        this.version.start_time_format = relativelyTaskTime(
          this.version.start_time,
          true
        );

        if (!this.version.plan_publish_time) {
          this.version.setPlanPublishTime = false;
          this.version.plan_publish_time = moment(
            moment().format("YYYY-MM-DD") + " 18:00"
          );
        } else {
          this.version.setPlanPublishTime = true;
          this.version.plan_publish_time = moment(
            this.version.plan_publish_time
          );
        }
        this.version.plan_publish_time_format = relativelyTaskTime(
          this.version.plan_publish_time,
          true
        );
        this.loading = false;
      });
    },
    getVersionTask() {
      getVersionTask({ versionCode: this.code }).then(res => {
        this.versionTaskList = res.data;
      });
    },
    getVersionLog() {
      getVersionLog({
        versionCode: this.code,
        all: this.showMoreVersionLog,
        pageSize: 5
      }).then(res => {
        // this.versionLog = res.data;
        this.versionLog = res.data.list;
        this.versionLogTotal = res.data.total;
        if (res.data.total > 5) {
          this.hasMoreVersionLog = true;
          // this.showMoreTaskLog = 1;
        }
      });
    },
    getMoreVersionLog() {
      this.showMoreVersionLog = 1;
      this.hideShowMore = true;
      this.getVersionLog();
    },
    getTaskStages() {
      if (this.disableEdit) {
        return false;
      }
      this.publishTask.modalStatus = true;
      this.publishTask.loading = true;
      getTaskStages({
        projectCode: this.version.projectCode,
        pageSize: 30
      }).then(res => {
        this.publishTask.taskStages = res.data.list;
        if (this.publishTask.taskStages) {
          this.publishTask.taskStages.forEach(v => {
            getTasks({ stageCode: v.code }).then(res => {
              v.tasksLoading = false;
              v.tasks = res.data;
            });
          });
        }
        this.changeModalHeight();
        this.publishTask.loading = false;
      });
    },
    showTaskDetail(task) {
      this.showTaskDetailModal = true;
      this.taskCode = task.code;
    },
    taskDetailClose() {
      this.init();
      this.showTaskDetailModal = false;
      this.taskCode = "";
    },
    doVersion(action) {
      let app = this;
      const actionKey = action.key;
      switch (actionKey) {
        case "delete":
          this.$confirm({
            title: "删除版本",
            content: `删除版本后，发布内容的版本字段将被清空，是否确定删除？`,
            okText: "确定",
            okType: "danger",
            cancelText: `再想想`,
            onOk() {
              del({ versionCode: app.code }).then(res => {
                const result = checkResponse(res);
                if (!result) {
                  return false;
                }
                app.detailClose();
              });
              return Promise.resolve();
            }
          });
          break;
      }
      this.visibleTaskMenu = false;
    },
    editTitle() {
      this.showEditName = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },
    deleteTask() {
      let app = this;
      this.$confirm({
        title: "彻底删除",
        content: `彻底删除任务后，该任务及其子任务将会被永久被删除。`,
        okText: "删除",
        okType: "danger",
        cancelText: `再想想`,
        onOk() {
          del(app.code).then(res => {
            ``;
            app.detailClose();
          });
          return Promise.resolve();
        }
      });
    },
    changeVersionStatus(e) {
      let app = this;
      if (e.key == this.version.code || this.version.status == 3) {
        return false;
      }
      if (e.key == 3) {
        //请确认当前版本发布内容已全部完成后再发布。
        this.$confirm({
          title: "发布提示",
          content: `请确认当前版本发布内容已全部完成后再发布。`,
          okText: "确认发布",
          okType: "primary",
          onOk() {
            app.publishVersion.status = e.key;
            app.publishVersion.modalStatus = true;
            app.$nextTick(function() {
              app.publishVersionForm.setFieldsValue({
                publishTime: moment()
              });
            });
            return Promise.resolve();
          }
        });
      } else {
        changeStatus({ versionCode: this.version.code, status: e.key }).then(
          res => {
            this.getVersion();
          }
        );
      }
    },
    handleSubmitPublishVersion() {
      let app = this;
      app.publishVersionForm.validateFields(err => {
        if (!err) {
          let obj = app.publishVersionForm.getFieldsValue();
          obj.publishTime = moment(obj.publishTime).format("YYYY-MM-DD HH:mm");
          changeStatus({
            versionCode: this.code,
            status: this.publishVersion.status,
            publishTime: obj.publishTime
          }).then(res => {
            app.publishVersion.modalStatus = false;
            app.getVersion();
          });
        }
      });
    },
    doStartTime(setStartTime = false, showStartTime = false) {
      this.version.setStartTime = setStartTime;
      this.showStartTime = showStartTime;
      let beginTime = "";
      if (setStartTime) {
        beginTime = moment(this.version.start_time).format("YYYY-MM-DD HH:mm");
        this.version.start_time_format = moment(this.version.start_time).format(
          "MM月DD日 HH:mm"
        );
      } else {
        beginTime = "";
      }
      this.editVersion({ start_time: beginTime });
    },
    doPlanPublishTime(setPlanPublishTime = false, showPlanPublishTime = false) {
      this.version.setPlanPublishTime = setPlanPublishTime;
      this.showPlanPublishTime = showPlanPublishTime;
      let endTime = "";
      if (setPlanPublishTime) {
        endTime = moment(this.version.plan_publish_time).format(
          "YYYY-MM-DD HH:mm"
        );
        this.version.plan_publish_time_format = moment(
          this.version.plan_publish_time
        ).format("MM月DD日 HH:mm");
      } else {
        endTime = "";
      }
      this.editVersion({ plan_publish_time: endTime });
    },
    doName() {
      this.showEditName = false;
      if (!this.version.name.trim() || this.version.name == this.versionName) {
        this.version.name = this.versionName;
        return false;
      }
      this.editVersion({ name: this.version.name });
    },
    editVersion(data) {
      data.versionCode = this.code;
      edit(data).then(res => {
        const result = checkResponse(res);
        if (!result) {
          return false;
        }
        this.getVersion();
      });
    },
    showVersionDesc() {
      if (this.disableEdit) {
        return false;
      }
      this.showVersionDescriptionEdit = true;
    },
    doContent() {
      let content = this.version.description;
      this.editVersion({ description: content });
      this.showVersionDescriptionEdit = false;
    },
    addVersionTask() {
      addVersionTask({
        taskCodeList: JSON.stringify(this.publishTask.selectTaskList),
        versionCode: this.code
      }).then(res => {
        notice(
          { title: `成功添加 ${res.data.successTotal} 项发布内容到版本` },
          "notice",
          "success"
        );
        this.publishTask.modalStatus = false;
        this.publishTask.selectTaskList = [];
        this.init();
      });
    },
    removeVersionTask(task) {
      let app = this;
      this.$confirm({
        title: "移除发布内容",
        content: `确定移除这个发布内容？`,
        okText: "确定",
        okType: "danger",
        cancelText: `再想想`,
        onOk() {
          removeVersionTask({ taskCode: task.code }).then(res => {
            const result = checkResponse(res);
            if (!result) {
              return false;
            }
            app.init();
          });
          return Promise.resolve();
        }
      });
    },
    changeModalHeight() {
      const defaultWidth = this.width;
      let width = $(window).width() - 100;
      let height = $(window).height() - 150;
      let logHeight = $(window).height() - 200;
      let publishModalHeight = $(window).height() - 255;
      if (
        defaultWidth === "full-screen" ||
        this.$route.query["full-screen"] !== undefined
      ) {
        //全屏显示
        $(".task-detail-modal").css("width", $(window).width());
        $(".version-detail").css("width", $(window).width());
        $(".ant-modal").css("top", 0);
        height += 85;
        logHeight += 85;
        $(".content-left").css("height", height + "px");
        $(".log-wrap").css("height", logHeight + "px");
      } else {
        if (width > defaultWidth) {
          width = defaultWidth;
        }
        $(".version-detail").css("width", width);
        $(".content-left").css("height", height + "px");
        $(".log-wrap").css("height", logHeight + "px");
        $(".publish-task").css("height", publishModalHeight + "px");
      }
    }
  }
};
</script>

<style lang="less">
.project-space-task {
}

.project-space-task .wrapper-main {
  margin: 0;
  padding: 0;
  background: inherit;
}

.project-space-task .wrapper-content {
  background: #f5f5f5;
  position: fixed;
  height: 100%;
  padding: 0 0 63px;
}

.project-space-task .layout-content {
  padding: 60px 10px 0 0;
  height: 100%;
  margin-left: 0;
  margin-right: 0;
  background: #fff;
}

.project-space-task .manage-contents {
  padding-left: 32px;
  padding-right: 32px;
}

.project-space-task .manage-contents h4 {
  display: block;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 12px;
}

.project-space-task .board-scrum-stages {
  position: relative;
  padding: 0 10px 10px 10px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.scrum-stage {
  position: relative;
  height: 100%;
  width: 295px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  margin-right: 10px;
  vertical-align: top;
  background-color: #eeeeee;
  border-radius: 3px;

  .sortable-chosen {
    cursor: pointer;
    //display: none
  }

  &.stage-ghost {
    background: #e5e5e5;

    div {
      display: none;
    }
  }
}

.scrum-stage .scrum-stage-header,
.scrum-stage .sort-header-placeholder {
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 14px 18px;
  font-size: 15px;
  font-weight: bold;
  z-index: 1;
  transition: box-shadow 100ms ease;
}

.scrum-stage-header.ui-sortable-handle {
  cursor: move;
}

.scrum-stage .stage-menu-toggler {
  position: absolute;
  right: 15px;
}

.stage-menu-toggler .menu-toggler-title:hover {
  color: #57a3f3;
}

.scrum-stage .stage-menu-toggler .ivu-select-dropdown {
  border-radius: 3px;
}

.stage-menu-toggler li {
  line-height: 30px;
  padding: 5px 15px;
}

.task-popover-content .ivu-select-dropdown {
  margin-top: 0;
  padding-top: 0;
}

.task-popover-content .popover-header {
  text-align: center;
  padding: 5px 10px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.task-popover-content .popover-title {
  padding: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  background: none;
  border: 0 none;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
}

.scrum-stage .scrum-stage-wrap {
  position: relative;
  height: 100%;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.scrum-stage .scrum-stage-content {
  -webkit-flex: 1 1 0;
  -ms-flex: 1 1 0;
  flex: 1 1 0;
  overflow: auto;
  overflow-x: visible;
  -webkit-overflow-scrolling: touch;
}

.scrum-stage .scrum-stage-content > ul {
  /*margin-bottom: 8px;*/
}

.scrum-stage .scrum-stage-tasks,
.scrum-stage .scrum-stage-tasks-done {
  transition: opacity 0.08s ease-out;
  opacity: 1;
  min-height: 5px;
  padding: 0 5px;
  position: relative;
}

.scrum-stage .task.task-card {
  margin: 0 8px 8px;
}

.task.task-card {
  padding: 0;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 52px;

  &.task-ghost {
    border-left: 3px solid #e5e5e5 !important;
    background: #e5e5e5;

    * {
      visibility: hidden;
      //display: none;
    }
  }
}

.task-drag {
  //transform:rotate(7deg);
  //top: 0px !important;
  cursor: pointer;
  background: red;
}

.sortable-fallback {
  background: red;
  cursor: pointer;
}

.task {
  position: relative;
  white-space: normal;
}

.task {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.task.task-card .task-priority {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}

.task .task-priority.bg-priority-0 {
  opacity: 0;
}

.task .task-priority {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 6px;
  cursor: pointer;
  transition: width 218ms ease-in, opacity 218ms ease-in;
}

.bg-priority-0 {
  background-color: #a6a6a6;
}

.task.task-card .task-content-set {
  padding: 12px 0;
  margin-left: 0;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.task .task-content-set {
  overflow: hidden;
  margin: 0 0 0 12px;
  line-height: 20px;
  cursor: pointer;
}

.task-content-input {
  width: 100%;
}

.task .task-content-set {
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.task.task-card .task-content-wrapper {
  overflow: visible;
}

.task .task-content-set .task-content-wrapper {
  overflow: hidden;
  min-height: 24px;
}

.task .task-content-set .task-content-wrapper {
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.task .task-content-set .task-content-wrapper .task-content {
  margin: 2px 12px 0 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  word-wrap: break-word;
  overflow: hidden;
  transition: color 218ms ease;
}

.task .task-content-set .task-content-wrapper .task-content {
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
}

.scrum-stage .task.task-card .avatar {
  opacity: 1;
  margin: 0 14px 0 0;
  transition: -webkit-transform 218ms ease-in-out, opacity 100ms;
}

.task .avatar {
  margin-right: 12px;
}

.task .avatar {
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.task.task-card .task-info-wrapper {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  /*-webkit-flex-direction: column;*/
  /*-ms-flex-direction: column;*/
  /*flex-direction: column;*/
  padding-right: 14px;
}

.task.task-card .task-info-wrapper .task-infos {
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow: hidden;
}

.task.task-card .task-infos {
  margin-top: 4px;
  line-height: 20px;
  font-size: 0;
}

.task.task-card .task-infos .label,
.task.task-card .task-infos .icon-wrapper,
.task.task-card .task-infos .tag {
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 20px;
  font-size: 12px;
  vertical-align: middle;
  margin: 2px 6px 0 0;
  //padding: 0 4px;
  max-width: 100%;
}

.task.task-card .task-infos .icon-wrapper {
  font-size: 14px;
  //width: 20px;
  margin: 2px 10px 0 0;

  span {
    margin-left: 3px;
  }
}

.task.task-card .task-infos .label {
  padding-left: 6px;
}

.label-important,
.badge-important {
  color: #ffffff;
  background-color: #ff4f3e;
}

.task.task-card .task-infos .label > span,
.task.task-card .task-infos .icon-wrapper,
.task.task-card .task-infos .tag {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task.task-card .task-infos .tag {
  position: relative;
  padding-right: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task.task-card .task-infos .text {
  width: 50px;
  font-size: 12px;
  //color: #19be6b;
}

.tag-color-disc-blue {
  background-color: #2d8cf0;
}

.tag.tag-color-blue:before {
  content: " ";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #2d8cf0;
}

.tag-color-disc-orange {
  background-color: #ff9900;
}

.tag.tag-color-orange:before {
  content: " ";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ff9900;
}

.tag-color-disc-red {
  background-color: #ed3f14;
}

.tag.tag-color-red:before {
  content: " ";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ed3f14;
}

.tag-color-disc-green {
  background-color: #19be6b;
}

.tag.tag-color-green:before {
  content: " ";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #19be6b;
}

.tag-color-disc-brown {
  background-color: #2fbdb3;
}

.tag.tag-color-brown:before {
  content: " ";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #2fbdb3;
}

.tag-color-disc-purple {
  background-color: #797ec9;
}

.tag.tag-color-purple:before {
  content: " ";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #797ec9;
}

.task-info-footer {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: -12px;

  .task-id-number {
    display: inline-block;
    padding: 0 4px;
    color: gray;
    font-size: 12px;
    line-height: 20px;
    background-color: #f5f5f5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
    border-radius: 4px 0 4px 0;
  }
}

.scrum-stage .task-creator-handler-wrap .task-creator-handler {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 14px 15px;
  //border-radius: 3px;
  font-size: 15px;
}

.scrum-stage .task-creator-handler-wrap .task-creator-handler:hover {
  background-color: #e5e5e5;
}

.link-add-handler {
  color: #2d8cf0 !important;
  transition: color 218ms ease;
}

.link-add-handler {
  //margin-right: 10px;
}

.img-24 {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #eee;
  background-size: 24px 24px;
}

.img-32 {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-color: #eee;
  background-size: 32px 32px;
}

.img-circle {
  border-radius: 50%;
}

.disabled {
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.45);
}

.task.task-card.done .check-box,
.task.task-card.done .task-content-set {
  opacity: 0.64;
  filter: alpha(opacity=64);
}

.task.task-card .check-box {
  //margin: 14px 12px 0 8px;
}

.task .check-box-wrapper {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 11px 6px 0 6px;
  justify-content: center;
  transition: background 218ms;
  border-radius: 3px;
  &:hover {
    .check-box {
      color: grey;
    }

    background: #f5f5f5;
  }
}

.task .check-box {
  //width: 20px;
  //height: 20px;
  //margin-top: 2px;
  //border: solid 2px #A6A6A6;
  color: #a6a6a6;
  cursor: pointer;
  border-radius: 3px;
  margin: 5px;
}

.task .check-box.disabled {
  border-color: #ccc !important;
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.children-task-list .task .check-box {
  width: 15px;
  height: 15px;
  margin-top: 6px;
}

.task .check-box {
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.task .check-box:hover {
  border-color: #808080;
}

.task.done {
  background-color: #f7f7f7;
}

.children-task-list .task.done {
  background-color: inherit;
}

.task.done .task-content {
  color: #a6a6a6;
  text-decoration: line-through;
}

.task.done .check-box .anticon-check {
  //font-weight: bold;
  visibility: visible;
}

.task .check-box .anticon-check {
  visibility: hidden;
  color: #a6a6a6;
  font-size: 12px;
  -webkit-transform: translate(2px, 0);
  transform: translate(2px, 0);
  top: 18px;
  left: 10px;
  position: absolute;
}

.ivu-modal .task .check-box .anticon-check {
  top: 10px;
  left: 5.8px;
}

.children-task-list .task .check-box .anticon-check {
  font-size: 12px;
  -webkit-transform: translate(1px, -4px);
  transform: translate(1px, -4px);
  top: 17px;
}

.scrum-stage .task-creator-wrap {
  margin: 0 8px 8px;
  box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.1);
}

.scrum-stage .task-creator-wrap .submit-set .middle-btn {
  width: 50%;
}

.project-space-task .card {
  border: 0 none;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.0470588) 0 2px 3px 0;
}

.project-space-task .card {
  background-color: #fff;
  border: 0 none;
  border-radius: 2px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.0470588) 0 2px 3px 0;
  box-shadow: rgba(0, 0, 0, 0.0470588) 0 2px 3px 0;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
}

.fade.in {
  opacity: 1;
}

.task-creator {
  position: relative;
  padding: 10px;
}

.task-creator-wrap .executor-handler {
  display: flex;
  align-items: center;
}

.task-creator-wrap .executor-handler .avatar {
  margin-right: 8px;
}

.executor-handler-menu {
  .ant-dropdown-menu-item {
    position: relative;
    line-height: 32px;

    .anticon-check {
      position: absolute;
      float: right;
      top: 16px;
      right: 12px;
      font-size: 12px;
    }
  }

  //padding-top: 15px;
}

.task-creator-wrap .ivu-select-dropdown {
  position: absolute !important;
  width: 238px;
  left: 0 !important;
}

.fade {
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}

input.form-control,
textarea.form-control {
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  line-height: 20px;
}

.task-creator .handler-wrap {
  position: relative;
  height: 54px;
  border-bottom: 1px solid #eeeeee;
}

.task-creator .handler-wrap > a {
  width: 100%;
  display: inline-block;
  //padding: 15px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-creator .handler-wrap .creator-handler-text.name {
  font-weight: bold;
  margin-right: 4px;
}

.task-creator .handler-wrap .creator-handler-text {
  line-height: 24px;
}

.task-creator .handler-wrap > a > .icon,
.task-creator .handler-wrap > a > .avatar {
  display: inline-block;
  line-height: 24px;
  float: left;
  margin-right: 8px;
}

.involve-view {
  padding: 12px 0 5px;
  position: relative;
}

.involve-view .involve-header {
  margin-bottom: -3px;
  color: #808080;
  font-size: 13px;
  font-weight: bold;
}

.involve-view .involve-members {
  margin: 10px 0 -5px -10px;
}

.involve-view .involve-members > li {
  position: relative;
  float: left;
  margin: 0 0 10px 10px;
  cursor: pointer;
}

.involve-view .involve-members > li > .avatar {
  display: block;
  width: 24px;
  height: 24px;
  transition: -webkit-transform 2110ms ease-in-out;
}

.avatar {
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}

.involve-view .involve-members > li {
  position: relative;
  float: left;
  margin: 0 0 10px 10px;
  cursor: pointer;
}

.involve-view .add-involvement-handler {
  display: block;
  font-size: 24px;
  color: #a6a6a6;
}

.add-member {
  color: #3da8f5;
  display: block;
  width: 24px;
  height: 24px;
  line-height: 26px;
  text-align: center;
}

.task-creator .handler-wrap > a {
  width: 100%;
  display: inline-block;
  padding: 6px 0;
  margin: 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-creator .handler-wrap .creator-handler-text {
  line-height: 24px;
}

.project-space-task .menu-toggler-title,
.project-space-task .footer-item {
  color: #808080;
  text-decoration: none;
  cursor: pointer;
}

.task-creator .tags-wrap,
.task-creator .involve-wrap {
  border-bottom: 1px solid #eeeeee;
}

.task-creator .submit-set {
  position: relative;
  margin-top: 10px;
}

.scrum-stage.fixed-creator .task-creator-handler-wrap {
  position: fixed;
  bottom: 10px;
  height: 50px;
  width: 295px;
}

.task-creator-handler-wrap {
  /*box-shadow: 0 -3px 2px -2px rgba(0, 0, 0, 0.1);*/
}

.task-creator-handler-wrap {
  width: 100%;
  background-color: #eeeeee;
  transition: box-shadow 218ms ease;
  /*bottom: 0;*/
  /*position: absolute;*/
}

.scrum-stage-wrap.ui-sortable {
  padding-bottom: 50px;
}

.hidden-creator-bottom {
  padding-bottom: 0 !important;
}

.create-stage {
  height: auto;
  cursor: default;

  .create-stage-footer {
    text-align: right;
    padding-top: 10px;

    .cancel-text {
      margin-right: 24px;
      font-size: 14px;
    }
  }

  .ant-input {
    padding-top: 12px;
    padding-bottom: 12px;
    height: 40px;
    line-height: 40px;
  }
}

/*.task-datepicker .ivu-select-dropdown{*/
/*left: 18px !important;*/
/*top: 360px !important;*/
/*}*/
.detail-content .wangEditor-container {
  min-height: 200px;
}

.activities-timeline .activities-list-wrap {
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
}

.activities-timeline > div,
.activities-timeline > ul {
  margin-right: -1px;
  margin-left: -1px;
  overflow: hidden;
  background-color: #ffffff;
}

.activities-list {
  padding-bottom: 0;
}

.activities-timeline .activities-list {
  position: relative;
}

.activity:first-child {
  margin-top: 12px;
}

.activity {
  position: relative;
  overflow: hidden;
  margin: 15px;
  padding-left: 15px;
}

.activity .activity-body-coyness {
  font-size: 12px;
  margin: 0 0 0 25px;
  padding-left: 10px;
}

.activity .activity-body-coyness .activity-content {
  cursor: pointer;
}

.activity .activity-content {
  color: #383838;
}

.readable > *:last-child {
  margin-bottom: 0;
}

.activity
  .activity-body-coyness
  .activity-content.overflow
  .activity-description {
  display: block;
}

.activity .activity-body-coyness .activity-content .activity-description {
  display: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  border-left: 5px solid #eeeeee;
}

.activity .activity-content > blockquote {
  margin: 5px 0 0 0;
  padding: 0 0 0 10px;
}

.readable blockquote {
  font-size: 14px;
  border-left: 6px solid #ddd;
  padding: 5px 0 5px 10px;
}

blockquote {
  font-size: 12px;
}

blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  font-size: 17.5px;
  border-left: 5px solid #eee;
}

.activity
  .activity-body-coyness
  .activity-content.overflow
  .activity-content-detail {
  display: none;
}

li.activity.creator i {
  margin-top: 0;
}

.activities-timeline.early-hidden .activity-early-wrap,
.activities-timeline.early-shown .activity-early-wrap,
.activities-timeline.early-loading .activity-early-wrap {
  display: block;
}

.activities-timeline .activity-early-wrap {
  display: none;
}

.activities-timeline .activity-early-handler {
  display: block;
  padding: 0 35px 0;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.link-add-handler {
  color: #3da8f5 !important;
  transition: color 218ms ease;
}

.task.task-card.ui-sortable-handle.dragging,
.scrum-stage-tasks-done .task.task-card.ui-sortable-handle.dragging {
  cursor: move;
}

/*紧急程度一般*/
.task.task-card.ui-sortable-handle:hover,
.scrum-stage-tasks-done .task.task-card.ui-sortable-handle:hover {
  border-left: 3px solid #a6a6a6;
}

.task.task-card.ui-sortable-handle.warning {
  border-left: 3px solid #ff9900;
}

.task.task-card.ui-sortable-handle.error {
  border-left: 3px solid #ed3f14;
}

.task.task-card.ui-sortable-handle.warning:hover {
  border-left: 3px solid #ff9900;
}

.task.task-card.ui-sortable-handle.error:hover {
  border-left: 3px solid #ed3f14;
}

.task.task-card.ui-sortable-handle {
  border-left: 3px solid #fff;
  -webkit-transition-property: border-left;
  -webkit-transition-duration: 0.5s;
  -webkit-transition-timing-function: ease;
}

.scrum-stage-tasks-done .task.task-card.ui-sortable-handle {
  border-left: 3px solid #f7f7f7;
}

.scrum-stage-tasks-done .task.task-card.ui-sortable-handle.warning {
  border-left: 3px solid #ff9900;
}

.scrum-stage-tasks-done .task.task-card.ui-sortable-handle.error {
  border-left: 3px solid #ed3f14;
}

.scrum-stage-tasks-done .task.task-card.ui-sortable-handle.warning:hover {
  border-left: 3px solid #ff9900;
}

.scrum-stage-tasks-done .task.task-card.ui-sortable-handle.error:hover {
  border-left: 3px solid #ed3f14;
}

.activities-list {
  font-size: 18px;
  padding-left: 3px;
}

.detail-content .ivu-upload-list {
  clear: both;
}

.project-nav-footer {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  height: 50px;
  align-items: center;
  z-index: 998;
}

.project-nav-footer .footer-item {
  font-size: 14px;
  position: relative;
  padding: 15px 10px;
  margin: 0 5px;
  float: right;
  display: inline-block;
  text-align: center;
}

.project-nav-footer .footer-item.active {
  color: #2d8cf0;
}

.project-nav-footer .footer-item:hover {
  color: #2d8cf0;
}

.project-nav-footer :not(:first-child):after {
  position: absolute;
  content: "";
  right: -5px;
  top: 16px;
  bottom: 16px;
  width: 1px;
  background-color: #a6a6a6;
}

.menu-modal .ivu-modal-mask {
  overflow: hidden;
  background-color: inherit;
  width: 0;
}

.menu-modal .ivu-modal-wrap {
  //width:0;
  z-index: 1;
}

.menu-modal .ivu-modal {
  position: fixed;
  top: 111px;
  right: 0;
  height: 100%;
  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.1);
}

.menu-modal .ivu-modal-header {
  text-align: center;
}

.menu-modal .ivu-modal-content {
  height: 100%;
  background-color: #f7f7f7;
}

.menu-modal .ivu-modal-body {
  padding: 0;
}

.menu-modal .ivu-modal-footer {
  display: none;
}

.menu-modal .ivu-modal-content .project-menus {
  position: relative;
  padding-bottom: 1px;
}

.menu-modal .ivu-modal-content .project-menus:after {
  position: absolute;
  left: 14px;
  right: 16px;
  bottom: 0;
  content: " ";
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
}

.project-menus .list > li {
  position: relative;
  line-height: 30px;
}

.project-menus .list > li:first-child > a {
  margin-top: 5px;
}

.project-menus .list > li:first-child > a {
  margin-top: 5px;
}

.project-menus .list > li > a {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 15px;
  text-decoration: none;
  color: #808080;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-menus .list > li > a {
  color: #808080;
  font-size: 16px;
  width: 35px;
  text-align: center;
}

.project-menus .activities-panel-menu-list > li > a {
  color: #383838;
  font-weight: 600;
}

.project-menus .activities-panel-menu-list > li:hover a {
  background-color: #eeeeee;
}

.activity-card-datas.activity-card:first-child {
  margin-top: 5px;
}

.activity-card:first-child {
  margin-top: 0;
}

.activity-card-datas {
  margin-top: 5px;
  margin-bottom: 15px;
  padding: 0 15px;
}

.activity-card {
  position: relative;
  line-height: 20px;
  padding: 10px 15px 0;
  margin: 9px auto 0;
}

.activity-card .activity-card-header {
  position: relative;
  margin-bottom: 10px;
  display: inline-block;
  vertical-align: middle;
  float: left;
  margin-right: 10px;
}

.activity-card-datas .activity-card-header {
  display: block;
  float: none;
  margin-bottom: 0;
  font-weight: 600;
  line-height: 35px;
}

.activity-card .activity-card-header {
  color: #808080;
  font-size: 16px;
  width: 35px;
  text-align: center;
}

.activity-card .activity-card-title {
  margin-right: 6px;
}

.activity-card .activity-card-header .activity-card-title {
  z-index: 1;
  display: inline-block;
  margin-bottom: 8px;
}

.activity-card-datas .activity-card-header .activity-card-title {
  line-height: 24px;
  margin-bottom: 0;
}

.activity-card-datas .data-statistics {
  padding-bottom: 10px;
}

.activity-card-datas .data-statistics > div {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 130px;
  margin-left: 29px;
  padding-left: 5px;
  padding-top: 5px;
  padding-bottom: 13px;
  border-radius: 2px;
  font-size: 14px;
}

.activity-card-datas .data-statistics > div:hover {
  background-color: #eeeeee;
}

.activity-card-datas .data-statistics .activity-link-today {
  margin-left: 0;
}

.activity-card-datas .data-statistics .unassignedtasks-number {
  color: #19be6b;
  font-size: 24px;
  display: inline-block;
  margin-top: 5px;
}

.activity-card-datas .data-statistics .todayDatas-number {
  color: #ff9900;
  font-size: 24px;
  display: inline-block;
  margin-top: 5px;
}

.activity-card-datas .data-statistics::after {
  position: absolute;
  left: 49px;
  right: 15px;
  bottom: 1px;
  content: " ";
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
}

.activity-panel-card-table {
  position: relative;
  display: flex;
}

.activity-card-table.activity-card {
  width: 100%;
  margin: 10px 15px;
  padding: 0 0 15px;
}

.activity-panel-card-table .activity-card-table .activity-card-header {
  width: 100%;
}

.activity-card-table .activity-card-title {
  padding-left: 34px;
}

.activity-card-table .activity-card-body {
  display: block;
  margin-left: 34px;
  margin-right: 0;
  min-height: 100px;
  background-color: #ffffff;
}

.activity-card-table::after {
  position: absolute;
  left: 34px;
  right: 1px;
  bottom: 0;
  content: " ";
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
}

.activity-panel-activities-list .activity-panel-activities-title {
  position: relative;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 5px;
}

.activity-panel-activities-list
  .activity-panel-activities-title
  .project-activies-title {
  color: #383838;
  padding: 5px 15px;
  font-weight: 600;
}

.project-activies-title {
  color: #808080;
  font-size: 16px;
  width: 35px;
  text-align: center;
}

.activity-panel-activities-wrap {
  margin-top: -5px;
}

.activity-card.activity-task {
  padding-top: 25px;
  padding-left: 20px;
}

.work {
  position: relative;
}

.activity-card .activity-content {
  overflow: hidden;
  padding-bottom: 5px;
  color: #383838;
}

.activity-card .activity-content .activity-card-title {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 5px;
}

.activity-card.activity-task .activity-card-title {
  width: 100%;
}

.activity-card .activity-card-title {
  margin-right: 6px;
}

.activity-card .activity-card-body:empty {
  display: none;
}

.activity-card .activity-card-footer {
  margin-bottom: 5px;
  display: inline-block;
  vertical-align: bottom;
}

.react-time-stamp {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.activity-card .activity-card-footer time {
  color: #808080;
  font-size: 12px;
}

.activity-card .activity-card-footer:after {
  clear: both;
}

.activity-panel-activities
  .activity-panel-activities-body
  .activity-content::after {
  position: absolute;
  left: 48px;
  right: 16px;
  bottom: -5px;
  content: " ";
  height: 1px;
  background-color: rgba(0, 0, 0, 0.06);
}

.menu-modal .user-content {
  padding: 15px;
}

.user-menu-modal .menu-user-list img {
  width: 36px;
  height: 36px;
}

.user-menu-modal .project-menus .list > li {
  line-height: 10px;
}

.user-menu-modal .user-info {
  width: 100%;
  padding-left: 10px;
  padding-bottom: 10px;
}

.user-menu-modal .user-item {
  line-height: 30px;
}

.user-menu-modal .ivu-modal-content .project-menus:after {
  background-color: inherit;
}

.task-type-move {
  cursor: move;
  //border: 1px solid rgb(61, 168, 245);
  box-shadow: 0 1px 5px 1px #c0c0c0;
  //background: red;
  //transform: rotate(2deg) !important;
}

.task-move {
  //transform: rotate(2deg);
}

.project-space-task {
  &.simple {
    .project-navigation {
      background: hsla(0, 0%, 100%, 0.95);
    }

    .layout-content {
      background: inherit;

      .scrum-stage .scrum-stage-header,
      .scrum-stage .sort-header-placeholder {
        padding: 14px 14px;
        font-size: 14px;
      }

      .scrum-stage-wrap.ui-sortable {
        padding-bottom: 35px;
      }

      .scrum-stage {
        background: inherit;
        margin-right: 0;

        .scrum-stage-tasks {
          //padding-left: 0
        }
      }

      .task.task-card .check-box {
        //margin: 16px 12px 0 10px;
      }

      .task .check-box {
        //width: 16px;
        //height: 16px;
      }

      .task.done {
        background: #fff;
      }

      .scrum-stage-tasks-done .task.task-card.ui-sortable-handle {
        border-left: 3px solid #fff;
      }

      .task-creator-handler-wrap {
        background: #fff;
        height: auto;
        margin: 0 12px;
        width: 270px;
        border-radius: 3px;

        .task-creator-handler {
          font-size: 14px;
          color: #a6a6a6 !important;
          border-radius: 3px;

          &:hover {
            color: #3da8f5 !important;
            //box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
            background-color: inherit;
          }

          &.link-add-handler {
            padding: 5px 15px;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
}

.field-flex {
  display: flex;
  justify-content: flex-start;
}

.task-tag {
  .ant-tag {
    margin-bottom: 6px;
  }
}

.version-detail {
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-height: 1px;
  min-width: 1px;
  margin: auto;

  .version-detail-spin {
    width: 100%;
  }

  .task-header {
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    vertical-align: middle;

    .head-title {
      padding: 0 20px 0 20px;
      flex: 1 1;

      .breadcrumb {
        display: inline;

        a {
          color: inherit;

          &:hover {
            color: #40a9ff;
          }
        }
      }
    }

    .header-action {
      font-size: 16px;
      padding: 0 20px;
      display: flex;
      max-height: 24px;

      .action-item {
        margin-left: 10px;
        padding: 4px;
        transition: 218ms;
        transition-property: background, color;
        border-radius: 4px;
        align-items: center;
        display: flex;
        text-align: center;
        justify-content: center;
        min-width: 32px;

        span {
          margin-left: 6px;
          font-size: 14px;
        }

        &.active {
          color: #3da8f5;
        }

        &:hover {
          background: #ecf6fe;
          color: #3da8f5;
          border-radius: 4px;
        }
      }
    }

    &.disabled {
      background: #f5f5f5;
    }
  }

  .task-wrap {
    .task-content {
      display: flex;
      justify-content: flex-start;

      .content-left {
        border-right: 1px solid #e5e5e5;
        min-width: 560px;
        width: 63%;
        /*width: 760px;*/

        .task-title {
          margin: 10px 40px 20px 20px;
          cursor: text;

          &.disabled {
            cursor: not-allowed;

            &:hover {
              background: inherit;
            }

            .ant-input,
            .title-text {
              &:hover,
              &:focus {
                background: inherit;
              }
            }
          }

          &:hover {
            background: #f5f5f5;
          }

          .title-text {
            line-height: 24px;
          }

          .ant-input,
          .title-text {
            font-size: 20px;
            padding: 8px;
            border: none !important;
            border-radius: 4px;

            &:hover,
            &:focus {
              background: #f5f5f5;
              box-shadow: none !important;
              border-right-width: 0 !important;
              border: none !important;
              border-radius: 4px;
            }
          }
        }

        .task-basic-attrs-view {
          .field-list {
            padding: 0 40px 0 32px;

            &.disabled {
              .field-right,
              a {
                cursor: not-allowed !important;
              }
            }

            .component-mount {
              .field {
                display: flex;
                justify-content: flex-start;
                margin: 12px 0;
                min-height: 36px;

                .field-left {
                  align-self: flex-start;
                  width: 132px;
                  height: 36px;
                  padding-right: 12px;
                }

                .field-right {
                  cursor: pointer;
                  max-width: calc(100% - 132px);

                  .inline-block {
                    display: inline-block;
                  }

                  &.field-date {
                    display: flex;
                  }

                  &.width-block {
                    width: 100%;

                    .w-e-text {
                      cursor: text;
                    }
                  }

                  .name {
                    margin: 0 8px;
                  }
                }

                .block-field {
                  width: 100%;
                  border: 1px solid #e5e5e5;
                  border-radius: 4px;
                  padding: 2px 0;
                  margin-bottom: 12px;
                  display: flex;
                  justify-content: flex-start;
                  flex-direction: row;
                }

                .task-child {
                  width: 100%;

                  .task-list {
                    padding: 8px 0;

                    .list-item {
                      padding: 4px 12px 4px 5px;
                      display: flex;
                      align-items: center;
                      /*justify-content: space-between;*/

                      .task-title,
                      .task-input {
                        flex: 1 1;
                        margin: 0;
                      }

                      .title-text {
                        color: #333;
                        line-height: 14px;

                        &.done {
                          color: #a6a6a6;
                        }
                      }

                      .ant-input,
                      .title-text {
                        font-size: 14px;

                        &:hover,
                        &:focus {
                        }
                      }

                      .check-box-wrapper {
                        margin-top: 0;
                      }

                      .task-item {
                        cursor: pointer;
                        margin-right: 12px;

                        &.disabled {
                          cursor: not-allowed;
                        }

                        &.check-box {
                          .anticon-check {
                            visibility: visible;
                            top: 14px;
                            left: 18px;
                          }
                        }
                      }
                    }

                    .action-btn {
                      padding: 2px 12px 2px 16px;
                    }
                  }

                  .add-handler {
                    /*margin-bottom: 8px;*/
                    padding-left: 16px;
                    padding-right: 12px;
                    display: flex;
                    align-items: center;
                    height: 36px;
                  }
                }

                .file-list {
                  width: 100%;
                  padding: 8px;

                  .ant-list-item {
                    padding: 10px 12px;
                    border-bottom: none;
                    border-radius: 4px;
                    margin-bottom: 2px;

                    &:hover {
                      background-color: #f5f5f5;
                    }

                    .ant-list-item-meta-title {
                      margin-bottom: 0;
                      line-height: 24px;
                    }
                  }
                }
              }

              .field-name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 8px;
              }

              .task-description {
                &:hover {
                  background: #f5f5f5;
                  border-radius: 4px;
                }

                &.disabled {
                  &:hover {
                    background: inherit;
                  }
                }

                padding: 8px;
                margin: -8px;

                .description-txt {
                  max-height: 300px;
                  overflow: hidden;
                }

                p {
                  margin: 0;
                }
              }
            }
          }
        }
      }

      .content-right {
        width: 37%;
        /*width: 440px;*/

        .header {
          padding: 15px 20px 20px 20px;
        }

        .member-list {
          padding-top: 12px;
          display: flex;
          justify-content: flex-start;

          .member-item {
            margin-right: 10px;

            &.invite {
              cursor: pointer;
            }
          }
        }

        .log-wrap {
          border-top: none;
          border-bottom: none;
          padding-bottom: 12px;

          .header {
            width: 100%;
          }

          .log-list {
            /*font-size: 12px;*/
            padding: 0 20px 0 20px;

            .show-more {
              display: block;
              margin-bottom: 20px;
            }

            .list-item {
              display: flex;
              justify-content: flex-start;
              align-items: baseline;
              vertical-align: middle;
              width: 100%;

              &.log-comment {
                align-items: end;
              }

              .log-item {
                margin-right: 12px;
                margin-bottom: 24px;

                .anticon {
                  font-size: 14px;
                }

                .log-content {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  border-left: 5px solid #ccc;
                  padding-left: 12px;
                  margin-top: 6px;
                }
              }

              .log-txt {
                flex: 1 1;
              }
            }
          }
        }

        .footer {
          padding: 20px 20px 0 20px;
          display: flex;
        }
      }
    }
  }
}

.publish-task-modal {
  .ant-modal-body {
    padding: 12px 12px 12px 24px;
  }

  .publish-task {
    padding-right: 18px;

    .ant-checkbox-group {
      width: 100%;
    }
  }
}
</style>
