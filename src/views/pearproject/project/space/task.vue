<template>
  <div class="project-space-task" :class="project.task_board_theme">
    <div class="project-navigation">
      <div class="project-nav-header">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <a @click="toHome">
              <a-icon type="home" />首页
            </a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <project-select class="nav-title" style="display: inline-block;" :code="code"></project-select>
            <span class="actions">
              <a-tooltip
                :mouseEnterDelay="0.3"
                :title="project.collected ? '取消收藏' : '加入收藏'"
                @click="collectProject"
              >
                <a-icon
                  type="star"
                  theme="filled"
                  style="color: grey;"
                  v-show="!project.collected"
                />
                <a-icon
                  type="star"
                  theme="filled"
                  style="color: #ffaf38;"
                  v-show="project.collected"
                />
              </a-tooltip>
            </span>
            <span class="label label-normal" v-if="project.private === 0">
              <a-icon type="global" />公开
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <section class="nav-body">
        <ul class="nav-wrapper nav nav-underscore pull-left">
          <li class="actives">
            <a class="app" data-app="tasks">任务</a>
          </li>
          <li class>
            <a class="app" data-app="works" @click="$router.push('/project/space/files/' + code)">文件</a>
          </li>
          <li class>
            <a
              class="app"
              data-app="build"
              @click="$router.push('/project/space/overview/' + code)"
            >概览</a>
          </li>
          <li class>
            <a
              class="app"
              data-app="build"
              @click="$router.push('/project/space/features/' + code)"
            >版本</a>
          </li>
        </ul>
      </section>
      <div class="project-nav-footer">
        <a class="footer-item" @click="visibleDraw('taskSearch')">
          <a-icon type="search"></a-icon>
          <span>筛选</span>
        </a>
        <a
          class="footer-item"
          :class="{active: slideMenuKey == 'member'}"
          @click="visibleDraw('member')"
        >
          <a-icon type="user"></a-icon>
          <span>{{ projectMembers.length }}</span>
        </a>
        <a
          class="footer-item"
          :class="{active: slideMenuKey == 'config'}"
          @click="visibleDraw('config')"
        >
          <a-icon type="menu"></a-icon>
          <span>菜单</span>
        </a>
      </div>
    </div>
    <wrapper-content :showHeader="false">
      <draggable
        v-model="taskStages"
        :options="{
          group: 'stages',
          filter: '.undraggables',
          handle: '.ui-sortable-handle',
          ghostClass: 'stage-ghost',
          animation: 200,
          forceFallback: false,
        }"
        id="board-scrum-stages"
        class="board-scrum-stages"
        :move="stageMove"
        @update="stageSort"
      >
        <div
          class="scrum-stage"
          v-for="(stage, index) in taskStages"
          :key="index"
          :id="stage.code"
          :class="{'fixed-creator': stage.fixedCreator == true}"
        >
          <!--<a-spin wrapperClassName="tasks-loading" :spinning="stage.tasksLoading">-->
          <!--<a-tooltip placement="top" >
                     <template slot="title">
                         {{ stage.name }}
                         <span class="task-count" v-if="stage.list.length > 0"> · {{ stage.list.length }}</span>
          </template>-->
          <header class="scrum-stage-header ui-sortable-handle" v-show="!stage.tasksLoading">
            <div class="stage-name hinted">
              {{ stage.name }}
              <span
                class="task-count"
                v-if="stage.tasks.length > 0"
              >· {{ stage.tasks.length }}</span>
            </div>
            <div class="stage-menu-toggler popover">
              <a-dropdown :trigger="['click']" placement="bottomCenter">
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>编辑任务列表</span>
                  </template>
                  <a href="javascript:void(0)" class="menu-toggler-title">
                    <a-icon type="ellipsis" style="font-size: 18px;" />
                  </a>
                </a-tooltip>
                <!--<div slot="overlay" class="task-popover-content">-->
                <!--<header class="popover-header" name="333">
                                    <span class="popover-title">列表菜单</span>
                </header>-->
                <a-menu slot="overlay" @click="doStage" :selectable="false">
                  <a-menu-item :key="'editStage_' + stage.code + '_' + index">
                    <a-icon type="edit"></a-icon>编辑列表
                  </a-menu-item>
                  <a-menu-item :key="'setExecutor_' + stage.code + '_' + index">
                    <a-icon size="14" type="user"></a-icon>设置本列所有任务执行者
                  </a-menu-item>
                  <!--<a-menu-item :key="'setEndTime_' + stage.code + '_' + index">
                                        <a-icon size="14" type="clock-circle"></a-icon>
                                        设置本列所有任务截止时间 *
                  </a-menu-item>-->
                  <a-menu-item :key="'recycleBatch_' + stage.code + '_' + index">
                    <a-icon size="14" type="delete"></a-icon>本列所有任务移到回收站
                  </a-menu-item>
                  <a-menu-item :key="'delStage_' + stage.code + '_' + index">
                    <a-icon size="14" type="delete"></a-icon>删除列表
                  </a-menu-item>
                </a-menu>
                <!--</div>-->
              </a-dropdown>
            </div>
          </header>
          <!--</a-tooltip>-->
          <div
            class="scrum-stage-wrap ui-sortable"
            :class="{'hidden-creator-bottom': stage.showTaskCard}"
          >
            <vue-scroll
              :ref="index + '-stage'"
              @handle-resize="handleResize($event, index)"
              :ops="scrollOps"
            >
              <section
                :id="stage.code"
                :task-type-index="index"
                class="scrum-stage-content thin-scroll"
              >
                <a-spin wrapperClassName="tasks-loading" :spinning="stage.tasksLoading">
                  <!--未完成列表-->
                  <draggable
                    v-model="stage.unDoneTasks"
                    :options="{
                      group: 'task',
                      ghostClass: 'task-ghost',
                      dragClass: 'task-drag',
                      fallbackClass: 'task-drag',
                      forceFallback: false,
                    }"
                    @end="taskSort"
                    class="scrum-stage-tasks"
                  >
                    <template v-for="(task, taskIndex) in stage.unDoneTasks">
                      <div
                        class="task task-card ui-sortable-handle"
                        :index="taskIndex"
                        :id="task.code"
                        :key="task.code"
                        :class="showTaskPri(task.pri)"
                        v-if="!task.done && task.canRead"
                        @click.stop="taskDetail(task.code, index)"
                      >
                        <div class="task-priority bg-priority-0"></div>
                        <a-tooltip :placement="index > 0 ? 'top' : 'right'">
                          <template slot="title">
                            <span v-if="task.hasUnDone" style="font-size: 12px;">子任务尚未全部完成，无法完成父任务</span>
                          </template>
                          <div
                            class="check-box-wrapper"
                            @click.stop="
                              taskDone(task.code, index, taskIndex, 1)
                            "
                          >
                            <a-icon
                              class="check-box"
                              :class="{disabled: task.hasUnDone}"
                              type="border"
                              :style="{fontSize: '16px'}"
                            />
                          </div>
                          <!--<a class="check-box"
                                                       :class="{'disabled': task.hasUnDone}"
                          @click.stop="taskDone(task.code,index,taskIndex,1)"></a>-->
                        </a-tooltip>
                        <div class="task-content-set open-detail">
                          <div class="task-content-wrapper">
                            <div class="task-content">{{ task.name }}</div>
                            <a-tooltip placement="top" v-if="task.executor && task.executor.avatar">
                              <template slot="title">
                                <span>{{ task.executor.name }}</span>
                              </template>
                              <img
                                :src="task.executor.avatar"
                                :title="task.executor.name"
                                class="avatar img-circle img-24 hinted"
                              />
                            </a-tooltip>
                          </div>
                          <div class="task-info-wrapper clearfix">
                            <div class="task-infos">
                              <span
                                class="label"
                                :class="showTimeLabel(task.end_time)"
                                v-if="task.end_time"
                              >
                                <span :title="task.end_time">
                                  {{
                                  showTaskTime(task.begin_time, task.end_time)
                                  }}
                                </span>
                              </span>
                              <span class="icon-wrapper muted" v-if="task.description">
                                <a-icon type="file-text"></a-icon>
                              </span>
                              <span class="icon-wrapper muted" v-if="task.hasSource">
                                <a-icon type="link"></a-icon>
                              </span>
                              <span class="icon-wrapper muted" v-if="task.hasComment">
                                <a-icon type="message" />
                              </span>
                              <span class="icon-wrapper muted" v-if="task.childCount[0] > 0">
                                <a-icon type="bars"></a-icon>
                                <span>
                                  {{ task.childCount[1] }}/{{
                                  task.childCount[0]
                                  }}
                                </span>
                              </span>
                              <span class="tag muted" v-for="tag in task.tags" :key="tag.code">
                                <a-badge status="success" :class="`badge-${tag.tag.color}`" />
                                {{ tag.tag.name }}
                              </span>
                              <span
                                :class="
                                  'icon-wrapper text text-' +
                                  task.task_execute.color
                                "
                                v-if="task.execute_state > 0"
                              >{{ task.task_execute_name }}</span>
                              <span class="icon-wrapper muted" v-if="task.like">
                                <a-icon type="like" />
                                <span>{{ task.like }}</span>
                              </span>
                            </div>
                          </div>
                          <footer
                            class="task-info-footer"
                            v-if="project.prefix && project.open_prefix"
                          >
                            <span class="task-id-number">{{ project.prefix }}-{{ task.id_num }}</span>
                          </footer>
                        </div>
                      </div>
                    </template>
                  </draggable>
                  <!--创建任务卡片-->
                  <div
                    class="task-creator-wrap card"
                    :id="'card' + index"
                    v-show="stage.showTaskCard"
                  >
                    <form class="task-creator">
                      <a-input
                        :ref="`inputTaskName${index}`"
                        v-model="task.name"
                        class="task-content-input"
                        type="textarea"
                        :rows="3"
                        placeholder="任务内容"
                        @keyup.enter="createTask(stage.code, index)"
                      />
                      <div class="handler-wrap">
                        <a-dropdown :trigger="['click']">
                          <a class="executor-handler">
                            <img
                              :src="defaultExecutor.avatar"
                              class="avatar img-circle img-24 hinted"
                            />
                            <span class="creator-handler-text name">
                              {{
                              defaultExecutor.name
                              }}
                            </span>
                          </a>
                          <a-menu
                            class="executor-handler-menu"
                            @click="selectExecutor"
                            slot="overlay"
                          >
                            <a-menu-item v-for="(member, index) in projectMembers" :key="index">
                              <img
                                class="avatar img-circle img-32 pull-left m-r-sm"
                                :src="member.avatar"
                              />
                              <span class="muted" style="line-height: 25px;">
                                {{
                                member.name
                                }}
                              </span>
                              <a-icon
                                type="check"
                                class="muted"
                                v-if="member.code == defaultExecutor.code"
                              ></a-icon>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                      <div class="submit-set">
                        <a-button
                          type="default"
                          size="large"
                          class="middle-btn"
                          @click.stop="showTaskCard(index, false)"
                        >取消</a-button>
                        <a-button
                          :loading="createTaskLoading"
                          :disabled="!task.name"
                          type="primary"
                          size="large"
                          class="middle-btn"
                          :class="{'disabled-btn': !task.name}"
                          @click.stop="createTask(stage.code, index)"
                        >创建</a-button>
                      </div>
                    </form>
                  </div>
                  <!--已完成列表-->
                  <draggable
                    v-model="stage.doneTasks"
                    :options="{
                      group: 'task-done',
                      ghostClass: 'task-ghost',
                      dragClass: 'task-drag',
                      fallbackClass: 'task-drag',
                      forceFallback: false,
                    }"
                    @end="taskSort"
                    class="scrum-stage-tasks-done"
                  >
                    <!--<ul v-if="stage.tasks.length" class="scrum-stage-tasks-done">-->
                    <template v-for="(task, taskIndex) in stage.doneTasks">
                      <div
                        class="task done task-card ui-sortable-handle"
                        :index="taskIndex"
                        :id="task.code"
                        :key="task.code"
                        v-if="task.canRead"
                        @click.stop="taskDetail(task.code, index)"
                      >
                        <div class="task-priority bg-priority-0"></div>
                        <span
                          class="check-box-wrapper"
                          @click.stop="taskDone(task.code, index, taskIndex, 0)"
                        >
                          <a-icon
                            class="check-box"
                            type="check-square"
                            :style="{fontSize: '16px'}"
                            :class="{disabled: task.hasUnDone}"
                          />
                        </span>
                        <!--<a class="check-box"
                                                   @click.stop="taskDone(task.code,index,taskIndex,0)">
                                                    <a-icon type="check"/>
                        </a>-->
                        <div class="task-content-set open-detail">
                          <div class="task-content-wrapper">
                            <div class="task-content">{{ task.name }}</div>
                            <a-tooltip placement="top" v-if="task.executor && task.executor.avatar">
                              <template slot="title">
                                <span>{{ task.executor.name }}</span>
                              </template>
                              <img
                                v-if="task.executor && task.executor.avatar"
                                :src="task.executor.avatar"
                                :title="task.executor.name"
                                class="avatar img-circle img-24 hinted"
                              />
                            </a-tooltip>
                          </div>
                          <div class="task-info-wrapper clearfix">
                            <div class="task-infos">
                              <span
                                class="tag muted"
                                :class="'tag-color-' + tag.color"
                                v-for="(tag,
                                tag_index) in task.task_tag_item_list"
                                :key="tag.code"
                              >{{ tag.name }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <!--</ul>-->
                  </draggable>
                  <div class="scrum-stage-tasks-done" v-show="stage.canNotReadCount">
                    <li class="task muted" style="margin: 0 10px 8px;">
                      <span>
                        <a-icon type="lock"></a-icon>
                        有
                        {{ stage.canNotReadCount }}
                        个任务被隐藏（因为设置了仅参与者可见）
                      </span>
                    </li>
                  </div>
                  <!--添加任务按钮-->
                  <div
                    class="task-creator-handler-wrap"
                    @click.stop="showTaskCard(index)"
                    v-if="!stage.showTaskCard"
                  >
                    <a class="task-creator-handler link-add-handler">
                      <a-icon type="plus-circle" style="padding-right: 6px;"></a-icon>添加任务
                    </a>
                  </div>
                </a-spin>
              </section>
            </vue-scroll>
          </div>
          <!--</a-spin>-->
        </div>
        <div class="scrum-stage undraggable create-stage">
          <header class="scrum-stage-header">
            <div class="stage-name hinted" style="width: 100%;">
              <a class="muted" v-show="!showCreateStage" @click="showInputStrageName">
                <a-icon type="plus" />
                <span class="m-l-xs">新建任务列表</span>
              </a>
              <div v-show="showCreateStage">
                <div>
                  <a-input
                    ref="inputStageName"
                    v-model="stageName"
                    placeholder="新建任务列表..."
                    @keyup.enter="creteStage"
                    auto-focus
                  ></a-input>
                </div>
                <div class="submit-set create-stage-footer">
                  <a
                    type="text"
                    class="cancel-text muted"
                    @click="showCreateStage = !showCreateStage"
                  >取消</a>
                  <a-button type="primary" class="middle-btn" @click="creteStage">保存</a-button>
                </div>
              </div>
            </div>
          </header>
        </div>
      </draggable>
      <router-view></router-view>
    </wrapper-content>
    <!--编辑任务列表-->
    <a-modal
      :width="360"
      v-model="stageModal.modalStatus"
      :title="stageModal.modalTitle"
      :bodyStyle="{paddingBottom: '1px'}"
      :footer="null"
    >
      <a-form @submit.prevent="editStage" :form="stageModal.form">
        <a-form-item>
          <a-input
            ref="inputStageTitle"
            placeholder="列表标题"
            v-decorator="[
              'name',
              {rules: [{required: true, message: '请输入列表标题'}]},
            ]"
          />
        </a-form-item>
        <a-form-item>
          <div class="action-btn pull-right">
            <a type="text" class="cancel-text muted" @click="stageModal.modalStatus = false">取消</a>
            <a-button type="primary" htmlType="submit" class="middle-btn">保存</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
    <!--项目成员-->
    <a-drawer
      wrapClassName="info-drawer"
      title="项目成员"
      width="350"
      placement="right"
      @close="inviteMemberDraw.visible = false"
      :visible="inviteMemberDraw.visible"
    >
      <div class="search-content">
        <a-input v-model="inviteMemberDraw.keyword" size="large" placeholder="输入昵称或邮箱查找">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div class="member-list">
        <div class="member-list-item ant-list-item header-action">
          <div class="ant-list-item-meta" @click="showInviteMember = true">
            <div class="ant-list-item-meta-avatar">
              <a-avatar icon="plus"></a-avatar>
            </div>
            <div class="ant-list-item-meta-content">
              <h4 class="ant-list-item-meta-title">
                <span>邀请新成员</span>
              </h4>
            </div>
          </div>
        </div>
        <a-list
          itemLayout="horizontal"
          :loading="inviteMemberDraw.searching"
          :dataSource="projectMembers"
          :locale="{
            emptyText:
              inviteMemberDraw.keyword && inviteMemberDraw.keyword.length > 1
                ? '没有搜索到相关成员'
                : '',
          }"
        >
          <a-list-item class="member-list-item" slot="renderItem" slot-scope="item, index">
            <span slot="actions" v-if="!item.is_owner">
              <a class="muted" @click="removeMember(item, index)">
                <a-icon type="user-delete" />移除
              </a>
              <!-- <a-button size="small" type="dashed" icon="user-add"
                                  v-if="!item.is_owner"
              >操作</a-button>-->
            </span>
            <a-list-item-meta :description="item.email">
              <span slot="title">{{ item.name }}</span>
              <a-avatar slot="avatar" icon="user" :src="item.avatar" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-drawer>
    <!--项目设置菜单-->
    <a-drawer
      wrapClassName="info-drawer"
      title="项目设置"
      width="350"
      placement="right"
      @close="configDraw.visible = false"
      :visible="configDraw.visible"
    >
      <div class="config-wrapper">
        <ul class="config-menus">
          <li class="menu-item">
            <a @click="projectModal.modalStatus = true">
              <a-icon type="setting" />项目设置
            </a>
          </li>
          <li class="menu-item">
            <a @click="taskTagModal.modalStatus = true">
              <a-icon type="tags" />标签
            </a>
          </li>
          <li class="menu-item">
            <a @click="recycleModal.modalStatus = true">
              <a-icon type="delete" />查看回收站
            </a>
          </li>
          <li class="menu-item">
            <a :href="downLoadUrl" target="_blank">
              <a-icon type="copy" />下载导入任务模板
            </a>
          </li>
          <li class="menu-item">
            <a-upload
              name="file"
              :showUploadList="false"
              :action="uploadAction"
              :beforeUpload="beforeUpload"
              :data="{projectCode: code}"
              :headers="headers"
              @change="handleChange"
            >
              <a class="text-default" :loading="uploadLoading" :disabled="uploadLoading">
                <a-icon type="upload" v-show="!uploadLoading" />上传文件导入任务
              </a>
            </a-upload>
          </li>
          <li class="menu-item">
            <a>
              <a-icon type="logout" />导出任务 *
            </a>
          </li>
          <li class="menu-item">
            <a>
              <a-icon type="copy" />复制项目 *
            </a>
          </li>
          <li class="menu-item">
            <a>
              <a-icon type="block" />保存为项目模板 *
            </a>
          </li>
        </ul>
      </div>
    </a-drawer>
    <!--项目设置-->
    <a-modal
      destroyOnClose
      class="project-config-modal"
      :width="800"
      v-model="projectModal.modalStatus"
      :title="projectModal.modalTitle"
      :footer="null"
    >
      <project-config :code="code" @update="updateProject"></project-config>
    </a-modal>
    <!--回收站-->
    <a-modal
      class="recycle-bin-modal"
      :width="800"
      v-model="recycleModal.modalStatus"
      :title="recycleModal.modalTitle"
      :footer="null"
    >
      <recycle-bin v-if="recycleModal.modalStatus" :code="code" @update="init"></recycle-bin>
    </a-modal>
    <!--任务标签-->
    <a-modal
      class="task-tag-modal"
      :width="800"
      v-model="taskTagModal.modalStatus"
      :title="taskTagModal.modalTitle"
      :footer="null"
    >
      <task-tag v-if="taskTagModal.modalStatus" :code="code" @update="init"></task-tag>
    </a-modal>
    <!--设置任务执行者-->
    <a-modal
      class="invite-project-member"
      :width="360"
      v-model="projectMemberModal.modalStatus"
      :title="projectMemberModal.modalTitle"
      :footer="null"
    >
      <div class="member-list">
        <a-list
          class="project-list"
          itemLayout="horizontal"
          :loading="loading"
          :dataSource="projectMembers"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <span slot="actions">
              <a-button size="small" type="dashed" icon="user-add" @click="setExecutor(item)">设置</a-button>
            </span>
            <a-list-item-meta :description="item.email">
              <span slot="title">{{ item.name }}</span>
              <a-avatar slot="avatar" icon="user" :src="item.avatar" />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>

    <a-drawer
      wrapClassName="info-drawer task-search"
      title="任务筛选"
      width="350"
      placement="right"
      @close="taskSearch.visible = false"
      :visible="taskSearch.visible"
    >
      <task-search :project-code="code" @search="taskSearchAction"></task-search>
    </a-drawer>
    <invite-project-member v-model="showInviteMember" :project-code="code" v-if="showInviteMember"></invite-project-member>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
//import moment from 'moment';
import draggable from "vuedraggable";
import projectSelect from "@/components/project/projectSelect";
import inviteProjectMember from "@/components/project/inviteProjectMember";
import projectConfig from "@/components/project/projectConfig";
import RecycleBin from "@/components/project/recycleBin";
import TaskTag from "@/components/project/taskTag";
import TaskSearch from "@/components/project/taskSearch";

import {
  list as getTaskStages,
  sort,
  tasks as getTasks
} from "@/pearapi/taskStages";
import { read as getProject } from "@/pearapi/project";
import {
  inviteMember,
  list as getProjectMembers,
  removeMember
} from "@/pearapi/projectMember";
import {
  save as createTask,
  taskDone,
  sort as sortTask,
  recycleBatch,
  batchAssignTask
} from "@/pearapi/task";
import {
  save as createState,
  edit as editStage,
  del as delStage
} from "@/pearapi/taskStages";
import {
  checkResponse,
  getApiUrl,
  getAuthorization,
  getUploadUrl
} from "@/assets/js/utils";
import { formatTaskTime } from "@/assets/js/dateTime";
import { collect } from "@/pearapi/projectCollect";
import { notice } from "@/assets/js/notice";

export default {
  name: "project-space-task",
  components: {
    RecycleBin,
    TaskTag,
    draggable,
    projectSelect,
    TaskSearch,
    inviteProjectMember,
    projectConfig
  },
  data() {
    return {
      code: this.$route.params.code,
      loading: true,
      project: { task_board_theme: "simple" },
      stageName: "",
      task: {}, //当前任务
      taskStages: [], //任务列表
      defaultExecutor: {}, //默认执行人
      projectMembers: [], //项目成员列表
      projectMembersCopy: [], //项目成员列表副本
      createTaskLoading: false, //创建任务loading
      showCreateStage: false,

      preCode: "",
      nextCode: "",

      taskSearchParams: {},

      stageKeys: [],
      stageModal: {
        form: this.$form.createForm(this),
        stageCode: "",
        stageIndex: 0,
        modalStatus: false,
        confirmLoading: false,
        modalTitle: "编辑列表"
      },

      slideMenuKey: "",
      showInviteMember: false,
      inviteMemberDraw: {
        visible: false,
        keyword: "",
        searching: false,
        list: []
      },
      configDraw: {
        visible: false
      },
      taskSearch: {
        visible: false
      },

      downLoadUrl: getUploadUrl("project/task/_downloadTemplate"),
      uploadLoading: false,
      uploadAction: getApiUrl("project/task/uploadFile"),

      /*项目设置*/
      projectModal: {
        modalStatus: false,
        modalTitle: "项目设置"
      },
      /*回收站*/
      recycleModal: {
        modalStatus: false,
        modalTitle: "查看回收站"
      },
      /*任务标签*/
      taskTagModal: {
        modalStatus: false,
        modalTitle: "任务标签"
      },

      /*项目成员*/
      projectMemberModal: {
        loading: false,
        currentStageIndex: 0,
        modalStatus: false,
        modalTitle: "设置任务执行者"
      }
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      viewRefresh: state => state.common.viewRefresh,
      socketAction: state => state.socketAction
    }),
    headers() {
      return getAuthorization();
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
      if (this.code != to.params.code) {
        this.code = to.params.code;
        this.defaultExecutor = this.userInfo;
        this.getProject();
        this.getProjectMembers();
        this.init();
      }
      if (from.name == "taskdetail") {
        const stageIndex = from.query.from;
        // this.getTaskStages(false);
        if (stageIndex != undefined) {
          let searchParams = this.taskSearchParams;
          let params = Object.assign(
            { stageCode: this.taskStages[stageIndex].code },
            searchParams
          );
          getTasks(params).then(res => {
            this.taskStages[stageIndex].tasksLoading = false;
            this.taskStages[stageIndex].tasks = res.data;
            let doneTasks = (this.taskStages[stageIndex].doneTasks = []);
            let unDoneTasks = (this.taskStages[stageIndex].unDoneTasks = []);
            res.data.forEach(task => {
              if (task.done) {
                doneTasks.push(task);
              } else {
                unDoneTasks.push(task);
              }
            });
          });
        }
      }
    },
    socketAction(val) {
      if (val.action === "organization:task") {
        const data = val.data.data;
        if (data.projectCode == this.code) {
          this.getTaskStages(false);
        }
      }
    },
    viewRefresh() {
      console.log("viewRefresh");
      // this.getTaskStages(false);
    },
    inviteMemberDraw: {
      handler(newVal) {
        if (newVal.visible) {
          this.slideMenuKey = "member";
        } else {
          this.slideMenuKey = false;
        }
        if (newVal.keyword) {
          this.searchInviteMember();
        }
      },
      deep: true
    },
    configDraw: {
      handler(newVal) {
        if (newVal.visible) {
          this.slideMenuKey = "config";
        } else {
          this.slideMenuKey = false;
        }
      },
      deep: true
    },
    showInviteMember(val) {
      if (!val) {
        this.getProjectMembers();
      }
    }
  },
  created() {
    this.defaultExecutor = this.userInfo;
    this.getProject();
    this.getProjectMembers();
    this.init();
  },
  methods: {
    init() {
      this.getTaskStages();
    },
    getProject() {
      this.loading = true;
      getProject(this.code).then(res => {
        this.loading = false;
        this.project = res.data;
      });
    },
    getProjectMembers() {
      getProjectMembers({ projectCode: this.code, pageSize: 100 }).then(res => {
        this.projectMembers = res.data.list;
        this.projectMembersCopy = res.data.list;
      });
    },
    getTaskStages(showLoading = true) {
      let app = this;
      getTaskStages({ projectCode: this.code, pageSize: 30 }).then(res => {
        let taskStages = [];
        if (!showLoading) {
          res.data.list.forEach(v => {
            v.tasksLoading = false;
            taskStages.push(v);
          });
          // this.taskStages = taskStages;
        } else {
          //提前赋值，展现loading
          this.taskStages = taskStages = res.data.list;
        }
        if (taskStages) {
          let searchParams = app.taskSearchParams;
          let params = {};
          taskStages.forEach((v, k) => {
            params = { stageCode: v.code };
            params = Object.assign(params, searchParams);
            getTasks(params).then(res => {
              let canNotReadCount = 0;
              res.data.forEach(task => {
                if (!task.canRead) {
                  canNotReadCount++;
                }
                if (task.done) {
                  v.doneTasks.push(task);
                } else {
                  v.unDoneTasks.push(task);
                }
              });
              v.canNotReadCount = canNotReadCount;
              v.tasksLoading = false;
              v.tasks = res.data;
              if (!showLoading) {
                app.$set(app.taskStages, k, v);
              }
            });
          });
        }
      });
    },
    filterTask(tasks, done) {
      return tasks.filter(item => item.done == done);
    },
    taskSearchAction(value) {
      console.log(value);
      this.taskSearchParams = value;
      this.getTaskStages();
    },
    //显示添加任务卡片
    showTaskCard(index = false, show = true) {
      this.taskStages.forEach(v => {
        v.showTaskCard = false;
      });
      if (index === false) {
        return false;
      }
      this.taskStages[index].showTaskCard = show;
      this.$nextTick(() => {
        //滚动创建到创建窗口
        this.$refs[index + "-stage"][0].scrollIntoView("#card" + index);
        this.$refs[`inputTaskName${index}`][0].focus();
      });
    },
    selectExecutor({ key }) {
      this.defaultExecutor = this.projectMembers[key];
    },
    //准备添加任务
    createTask(stageCode, stageIndex) {
      if (!this.task.name) {
        this.$message.warning("任务内容不能为空", 2);
        return false;
      }
      this.task.stage_code = stageCode;
      this.task.project_code = this.code;
      this.task.assign_to = this.defaultExecutor.code;
      //判断换行，添加多条任务
      // let titles = this.task.name.split("\n");
      // if (titles.length > 1) {
      //     this.$confirm({
      //         title: '任务提示',
      //         content: `系统检测到你输入了 ${titles.length} 行内容，你是想创建多条任务吗？`,
      //         okText: '创建1条',
      //         cancelText: `创建${titles.length}条`,
      //         onCancel() {
      //             console.log('Cancel');
      //         },
      //         onOk() {
      //             this.confirmCreateTask(stageIndex);
      //             return Promise.resolve();
      //         }
      //     });
      //     return false;
      // }
      this.confirmCreateTask(stageIndex);
    },
    //添加任务
    confirmCreateTask(stageIndex) {
      let app = this;
      if (app.createTaskLoading) {
        app.$message.warning("正在添加任务，请稍后...", 2);
        return false;
      }
      setTimeout(function() {
        if (app.createTaskLoading === true) {
          app.$message.loading({
            content: "正在添加任务，请稍后...",
            duration: 5
          });
        }
      }, 2000);
      app.createTaskLoading = true;
      createTask(app.task)
        .then(res => {
          app.createTaskLoading = false;
          const result = checkResponse(res);
          if (result) {
            app.$message.destroy();
            let taskStages = app.taskStages[stageIndex];
            taskStages.tasks.push(res.data);
            app.taskStages[stageIndex].unDoneTasks.push(res.data);
            // getTasks({stageCode: app.task.stage_code}).then((res) => {
            //     let taskStages = app.taskStages[stageIndex];
            //     taskStages.tasks = res.data;
            // });
            app.task = {};
            // notice({
            //     title: '添加任务成功',
            //     msg: '你可以点击该任务继续进行详细设置'
            // }, 'notice', 'success', 5);
          }
        })
        .catch(() => {
          app.createTaskLoading = false;
        });
    },
    taskDone(taskCode, stageIndex, taskIndex, done) {
      let task = null;
      let unDoneTasks = this.taskStages[stageIndex].unDoneTasks;
      let doneTasks = this.taskStages[stageIndex].doneTasks;
      if (done) {
        task = unDoneTasks[taskIndex];
      } else {
        task = doneTasks[taskIndex];
      }
      // let task = this.taskStages[stageIndex].tasks[taskIndex];
      if (task.hasUnDone) {
        return false;
      }
      task.done = done;
      if (done) {
        unDoneTasks.splice(taskIndex, 1);
        doneTasks.push(task);
        doneTasks = doneTasks.sort(function(a, b) {
          if (a.sort === b.sort) {
            return a.id_num - b.id_num;
          } else {
            return a.sort - b.sort;
          }
        });
      } else {
        doneTasks.splice(taskIndex, 1);
        unDoneTasks.push(task);
        unDoneTasks = unDoneTasks.sort(function(a, b) {
          if (a.sort === b.sort) {
            return a.id_num - b.id_num;
          } else {
            return a.sort - b.sort;
          }
        });
      }
      taskDone(taskCode, done).then(res => {
        const result = checkResponse(res);
        if (!result) {
          return false;
        }
        //可能会触发工作流，所以全部刷新
        this.getTaskStages(false);
      });
    },
    showInputStrageName() {
      this.showCreateStage = !this.showCreateStage;
      this.$nextTick(() => {
        this.$refs.inputStageName.focus();
      });
    },
    doStage(action) {
      let app = this;
      let actionKeys = action.key.split("_");
      const stageCode = actionKeys[actionKeys.length - 2];
      const stageIndex = actionKeys[actionKeys.length - 1];
      const actionKey = actionKeys[0];
      switch (actionKey) {
        case "editStage":
          this.stageModal.stageCode = stageCode;
          this.stageModal.stageIndex = stageIndex;
          this.$nextTick(() => {
            this.stageModal.form.setFieldsValue({
              name: this.taskStages[stageIndex].name
            });
            this.$refs.inputStageTitle.focus();
          });
          this.stageModal.modalStatus = true;
          break;
        case "recycleBatch":
          //您确定要把列表下的所有任务移到回收站吗？
          this.$confirm({
            title: "移到回收站",
            content: `您确定要把列表下的所有任务移到回收站吗？`,
            okText: "移到回收站",
            okType: "danger",
            cancelText: `再想想`,
            onOk() {
              app.taskStages[stageIndex].tasks = [];
              app.$set(app.taskStages[stageIndex], "doneTasks", []);
              recycleBatch({ stageCode: stageCode }).then(res => {
                const result = checkResponse(res);
                if (!result) {
                  return false;
                }
                app.$set(app.taskStages[stageIndex], "doneTasks", []);
                app.$set(app.taskStages[stageIndex], "unDoneTasks", []);
              });
              return Promise.resolve();
            }
          });
          break;
        case "setEndTime":
          this.set_type_endTime_modal = true;
          break;
        case "setExecutor":
          this.projectMemberModal.currentStageIndex = stageIndex;
          this.projectMemberModal.modalStatus = true;
          break;
        case "delStage":
          if (this.taskStages[stageIndex].tasks.length > 0) {
            this.$warning({
              title: "删除列表",
              content: `请先清空此列表上的任务，然后再删除这个列表`,
              okText: "确定"
            });
            return false;
          }
          this.$confirm({
            title: "删除列表",
            content: `您确定要永远删除这个列表吗？`,
            okText: "删除",
            okType: "danger",
            cancelText: `再想想`,
            onOk() {
              delStage(stageCode);
              app.taskStages.splice(stageIndex, 1);
              return Promise.resolve();
            }
          });
          break;
      }
    },
    creteStage() {
      if (!this.stageName) {
        this.$message.warning("请输入列表名称", 2);
        return false;
      }
      createState({ name: this.stageName, projectCode: this.code }).then(
        res => {
          const result = checkResponse(res);
          if (!result) {
            return false;
          }
          const stage = res.data;
          this.taskStages.push(stage);
          this.stageName = "";
          this.$nextTick(() => {
            document.getElementById("board-scrum-stages").scrollLeft = 10000;
          });
        }
      );
    },
    editStage() {
      let stage = this.stageModal.form.getFieldsValue();
      if (!stage.name) {
        this.$message.warning("请输入列表名称", 2);
        return false;
      }
      editStage({
        name: stage.name,
        stageCode: this.stageModal.stageCode
      }).then(res => {
        const result = checkResponse(res);
        if (!result) {
          return false;
        }
        this.taskStages[this.stageModal.stageIndex].name = stage.name;
        this.stageModal.modalStatus = false;
      });
    },
    setExecutor(member) {
      let stage = this.taskStages[this.projectMemberModal.currentStageIndex];
      let taskCodes = [];
      stage.tasks.forEach(v => {
        if (v.canRead) {
          taskCodes.push(v.code);
        }
      });
      if (taskCodes) {
        batchAssignTask({
          taskCodes: JSON.stringify(taskCodes),
          executorCode: member.code
        }).then(res => {
          this.projectMemberModal.modalStatus = false;
          if (!checkResponse(res)) {
            return false;
          }
          getTasks({ stageCode: stage.code }).then(res => {
            let canNotReadCount = 0;
            res.data.forEach(task => {
              if (!task.canRead) {
                canNotReadCount++;
              }
            });
            stage.canNotReadCount = canNotReadCount;
            stage.tasksLoading = false;
            stage.tasks = res.data;
          });
        });
      } else {
        this.projectMemberModal.modalStatus = false;
      }
    },
    showTaskPri(pri) {
      return {
        warning: pri == 1,
        error: pri == 2
      };
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
    },
    showTaskTime(time, timeEnd) {
      return formatTaskTime(time, timeEnd);
      // return moment(time).format('MM月DD日 HH:mm')
    },
    taskDetail(code, stageIndex) {
      this.$router.push(
        `${this.$route.path}/detail/${code}?from=${stageIndex}`
      );
    },
    stageMove(evt) {
      this.preCode = evt.draggedContext.element.code;
      this.nextCode = evt.relatedContext.element.code;
    },
    stageSort() {
      sort(this.preCode, this.nextCode, this.code);
    },
    taskSort(event) {
      console.log(event);
      const toStageCode = event.to.parentNode.parentNode.parentNode.getAttribute(
        "id"
      );
      let codes = "";
      for (let i = 0, len = event.to.children.length; i < len; i++) {
        codes += "," + event.to.children[i].getAttribute("id");
      }
      sortTask({ stageCode: toStageCode, codes: codes.substr(1) }).then(res => {
        this.getTaskStages(false);
      });
    },
    handleResize(vertical, stageIndex) {
      if (vertical.barSize) {
        this.taskStages[stageIndex].fixedCreator = true;
      }
    },

    visibleDraw(type) {
      if (type == "member") {
        this.configDraw.visible = false;
        this.taskSearch.visible = false;
        this.inviteMemberDraw.visible = !this.inviteMemberDraw.visible;
      } else if (type == "taskSearch") {
        this.taskSearch.visible = !this.taskSearch.visible;
        this.configDraw.visible = false;
        this.inviteMemberDraw.visible = false;
      } else {
        this.inviteMemberDraw.visible = false;
        this.taskSearch.visible = false;
        this.configDraw.visible = !this.configDraw.visible;
      }
    },
    removeMember(member, index) {
      let app = this;
      this.$confirm({
        title: `您确定要将「${member.name}」从项目中移除吗？`,
        content: `移除后该成员将不能查看任何关于该项目的信息`,
        okText: "移除",
        okType: "danger",
        cancelText: "再想想",
        onOk() {
          removeMember(member.code, app.code).then(res => {
            if (!checkResponse(res)) {
              return;
            }
            app.projectMembers.splice(index, 1);
            notice({ title: "移除成功" }, "notice", "success");
          });
          return Promise.resolve();
        }
      });
    },
    inviteMember(item) {
      inviteMember(item.memberCode, this.projectCode).then(res => {
        const success = checkResponse(res);
        if (success) {
          item.joined = true;
        }
      });
    },
    searchInviteMember: _.debounce(function() {
      if (!this.inviteMemberDraw.keyword) {
        this.projectMembers = JSON.parse(
          JSON.stringify(this.projectMembersCopy)
        );
      }
      if (this.inviteMemberDraw.keyword.length <= 1) {
        return false;
      }
      this.searching = true;
      this.projectMembers = this.projectMembers.filter(
        item => item.name.indexOf(this.inviteMemberDraw.keyword) != -1
      );
    }, 500),
    updateProject(data) {
      this.project = data;
    },
    collectProject() {
      const type = this.project.collected ? "cancel" : "collect";
      collect(this.project.code, type).then(res => {
        if (!checkResponse(res)) {
          return;
        }
        this.project.collected = !this.project.collected;
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        notice(`正在导入，请稍后...`, "message", "loading", 0);
        this.uploadLoading = true;
        return;
      }
      if (info.file.status === "done") {
        console.log(info);
        this.uploadLoading = false;
        if (checkResponse(info.file.response, true)) {
          const count = info.file.response.data;
          if (count) {
            notice(`成功导入${count}个任务`, "message", "success");
          } else {
            notice(`没有成功导入任何任务`, "message", "warning");
          }
          this.getTaskStages(false);
        }
      }
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("文件不能超过2MB!");
      }
      return isLt2M;
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

.project-space-task {
  .tasks-loading {
    .ant-spin-blur {
      opacity: 0;
    }
  }
}

.info-drawer {
  top: 116px;
  width: 0 !important;

  .ant-drawer-mask {
    visibility: hidden;
  }

  .ant-drawer-content {
    /*background-color: #f7f7f7;*/
  }

  .ant-drawer-header {
    /*background-color: #f7f7f7;*/
    text-align: center;
  }

  .ant-drawer-body {
    padding: 12px 0;
  }

  .search-content {
    padding: 0 24px;
  }
}

.info-drawer {
  .member-list {
    padding-top: 12px;

    .ant-list-item-meta {
      align-items: center;
    }

    .member-list-item {
      padding: 12px 24px;

      &:hover {
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
}

.info-drawer {
  .config-wrapper {
    position: relative;
    padding-bottom: 1px;

    .config-menus {
      padding: 0;
      list-style: none;

      .menu-item {
        position: relative;
        line-height: 30px;

        &:hover {
          background: #eeeeee;
        }

        &:first-child > a {
          margin-top: -6px;
        }

        a {
          display: block;
          cursor: pointer;
          padding: 5px 15px;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #383838;
          font-weight: 600;

          .anticon {
            width: 24px;
            text-align: center;
            font-size: 15px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>
