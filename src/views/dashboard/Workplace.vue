<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent" style="height:60px;position:relative;">
      <div class="title" style="font-size:14px;">
        <span class="welcome-text" :style="welcomeStyle">{{ welcome }}</span>
      </div>
      <div :style="postStyle">
        『 {{ userInfo.realname }} | {{ postName }} |
        {{ departName || '上级单位' }} 』
      </div>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            :loading="loading"
            title="任务面板"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleWait()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/time_00.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">我的待办</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">处理待办消息记录</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleDone()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/home_00.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">我的已办</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">查看已办消息记录</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleAnnounce()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/tongzhi_00.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">我的公告</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">重要信息全员播报</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/icon-chat-ok.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">我的云聊</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">员工沟通、高效、安全、快捷</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>
          <a-card
            :loading="loading"
            title="常用应用"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleLeave()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/leave.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">请假申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">请假申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleGoOut()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/position.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">外出申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">外出申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleTravel()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/trip.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">出差申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">出差申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleOvertime()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/overtime.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">加班申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">加班申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleAttendance()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/person.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">考勤异常</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">考勤异常流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleFileBorrow()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/material.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">档案借阅</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">档案借阅流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleUseSealCon()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/seal.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a
                      style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;"
                    >用印申请(合同)</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用印申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleSealDeclare()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/sealing.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">印章借用</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">印章借用流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>

          <a-card
            :loading="loading"
            title="人力资源"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/daka.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">考勤打卡</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">考勤打卡操作</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/qiandao.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">签到</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">签到流程登记</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/wenjuan.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">问卷调查</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">问卷调查流程申请</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleLeave()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/leave.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">请假申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">请假申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleGoOut()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/position.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">外出申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">外出申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleOvertime()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/overtime.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">加班申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">加班申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/hire.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">招聘申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">招聘申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleAttendance()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/person.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">考勤异常</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">考勤异常流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/material.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">物品领用</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">物品领用流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/seal.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">用章申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用章申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/hire_us.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">员工入职</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">员工入职流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/dimission.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">员工离职</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">员工离职流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>

          <a-card
            :loading="loading"
            title="行政管理"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/richang.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">考勤统计</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">高效、快捷导出考勤报表</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/zhushou.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">拜访记录</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">拜访记录详细登记</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/worktile.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">绩效自评</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">评价个人工作绩效</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/icon-manage-04.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">客户管理</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">客户信息详情登记</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/jiejing.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">调岗申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">调岗申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/hire_us.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">转正申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">转正申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/dimission.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">离职申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">离职申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/notify.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">换班申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">换班申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/shenpi.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">用车申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用车申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/icon-manage-19.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">车辆管理</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">车辆登记、维修、报废以及报表功能等</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/robot.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">工联单</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">工联单发起、审批、统计报表</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/buka.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">补卡申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">补卡申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleUseSealCon()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/seal.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a
                      style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;"
                    >用印申请(合同)</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用印申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleUseSealCom()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/seal_blue.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a
                      style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;"
                    >用印申请(非合)</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用印申请(非合同)流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleAddressBook()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/commun.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">通讯录</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">查看员工通讯信息</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleUserManage()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/list_00.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">用户管理</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用户添加、删除、修改等功能</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>

          <a-card
            :loading="loading"
            title="财务管理"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/gongzidan.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">工资单</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">查看个人工资信息</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/pay.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">付款申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">付款申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/wallet.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">备用金申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">备用金申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/bought.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">采购申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">采购申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/seal.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">用章申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">用章申请流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/finance.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">费用报销</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">费用报销流程办理</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleTravelSubsidy()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/icon-manage-21.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">车辆补贴申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">车辆补贴申请流程审批</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>

          <a-card
            :loading="loading"
            title="差旅商旅"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleTravel()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/trip.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">出差申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">国内外出差申请</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleGoOut()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/position.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">外出申请</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">发起外出申请</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>

          <a-card
            :loading="loading"
            title="沟通协作"
            :bordered="false"
            style="margin-bottom: 24px;"
            :body-style="{padding: 0}"
          >
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleDailyFeedback()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/ribao.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">日报</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">填写每日工作汇报</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleWeekFeedback()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/zhoubao.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">周报</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">填写周工作进度</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleMonthFeedback()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/yuebao.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">月报</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">填写月度工作汇报</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div
                  slot="title"
                  class="card-title"
                  style="width:90%;height:90%;"
                  @click="handleYearFeedback()"
                >
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/flag.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">年报</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">填写年度工作汇报</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/huibao.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">汇报</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">填写汇报信息</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/announce.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">公告</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">重要信息全员播报</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
            <a-card-grid style="width:25%;textAlign:'center'">
              <a-card-meta>
                <div slot="title" class="card-title" style="width:90%;height:90%;">
                  <div style="float:left;width:30%">
                    <a-avatar size="large" src="/images/shenpi.png" />
                  </div>
                  <div style="float:left;width:65%;">
                    <a style="margin-left:10px;margin-top:-10px;color:black;font-size:14px;">审批</a>
                    <div style="margin-left:10px;font-size:12px;font-weight:300;">简单、高效的审批工具</div>
                  </div>
                </div>
              </a-card-meta>
            </a-card-grid>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in nodelist">
                <a-list-item-meta>
                  <a-avatar
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                  />
                  <div slot="title" style="font-size:15px;" v-html="item.title"></div>
                  <div slot="description" style="font-size:12px;">{{ item.create_time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            title="便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{padding: 0}"
          >
            <div class="item-group">
              <div style="margin:5px 0px;">
                <a-tag color="purple" @click="handleWait()" style="margin-bottom:10px;">我的待办</a-tag>
                <a-tag color="cyan" @click="handleDone()" style="margin-bottom:10px;">我的已办</a-tag>
                <a-tag color="pink" @click="handleMessage()" style="margin-bottom:10px;">我的消息</a-tag>
                <a-tag color="blue" @click="handleCollect()" style="margin-bottom:10px;">我的收藏</a-tag>
                <a-tag color="red" @click="handleMyCenter()" style="margin-bottom:10px;">个人中心</a-tag>

                <a-tag color="green" @click="handleLeave()" style="margin-bottom:10px;">请假申请</a-tag>
                <a-tag color="blue" @click="handleGoOut()" style="margin-bottom:10px;">外出申请</a-tag>
                <a-tag color="orange" @click="handleOvertime()" style="margin-bottom:10px;">加班申请</a-tag>
                <a-tag color="pink" @click="handleAttendance()" style="margin-bottom:10px;">考勤异常</a-tag>
                <a-tag color="cyan" @click="handleFileBorrow()" style="margin-bottom:10px;">档案借阅</a-tag>

                <a-tag color="blue" @click="handleUseSealCon()" style="margin-bottom:10px;">用印(合同)</a-tag>
                <a-tag color="red" @click="handleUseSealCom()" style="margin-bottom:10px;">用印(非合同)</a-tag>
                <a-tag color="green" @click="handleSealDeclare()" style="margin-bottom:10px;">印章借用</a-tag>
                <a-tag color="orange" @click="handleTravel()" style="margin-bottom:10px;">出差申请</a-tag>
              </div>
            </div>
          </a-card>
          <a-card
            title="综合能力指数"
            style="margin-bottom: 24px"
            :loading="radarLoading"
            :bordered="false"
            :body-style="{padding: 0}"
          >
            <div style="min-height: 280px;position:relative;">
              <a-tag
                color="blue"
                @click="handleAblityTest()"
                style="margin-bottom:10px;position:absolute;top:-48px;right:20px;"
              >能力测评</a-tag>
              <radar :data="radarData" style="margin-top:10px;" />
            </div>
          </a-card>

          <a-card
            :loading="loading"
            title="团队"
            :bordered="false"
            style="display:none;position:relative;"
          >
            <a-tag
              color="blue"
              @click="handleTeamInfo()"
              style="margin-bottom:10px;position:absolute;top:18px;right:20px;"
            >团队设置</a-tag>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>

          <a-card :loading="loading" title="博客" :bordered="false" style="margin-top:20px;">
            <a-tag
              color="blue"
              @click="handleWriteBlog()"
              style="margin-bottom:10px;position:absolute;top:18px;right:20px;"
            >发布博客</a-tag>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in blog" :key="index">
                  <a @click="item.click">
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>

          <a-card :loading="loading" title="文库" :bordered="false" style="margin-top:20px;">
            <a-tag
              color="blue"
              style="margin-bottom:10px;position:absolute;top:18px;right:20px;"
            >检索资料</a-tag>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in dochub" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>

          <a-card :loading="loading" title="课堂" :bordered="false" style="margin-top:20px;">
            <a-tag
              color="blue"
              style="margin-bottom:10px;position:absolute;top:18px;right:20px;"
            >学习课程</a-tag>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in courses" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>

          <a-card :loading="loading" title="视频" :bordered="false" style="margin-top:20px;">
            <a-tag
              color="blue"
              style="margin-bottom:10px;position:absolute;top:18px;right:20px;"
            >分享视频</a-tag>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in video" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>

          <a-card :loading="loading" title="网盘" :bordered="false" style="margin-top:20px;">
            <a-tag
              color="blue"
              style="margin-bottom:10px;position:absolute;top:18px;right:20px;"
            >分享资源</a-tag>
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in yundisk" :key="index">
                  <a :href="item.href">
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>

          <template>
            <div>
              <!-- 向上箭头 -->
              <a-back-top />
            </div>
          </template>
        </a-col>
      </a-row>
    </div>
  </page-layout>
</template>

<script>
import { timeFix, welcome } from "@/utils/util";
import { mapGetters } from "vuex";

import PageLayout from "@/components/page/PageLayout";
import HeadInfo from "@/components/tools/HeadInfo";
import Radar from "@/components/chart/Radar";
import * as manageAPI from "@/api/manage";
import * as tools from "@/utils/util";

const DataSet = require("@antv/data-set");

export default {
  name: "Workplace",
  components: {
    PageLayout,
    HeadInfo,
    Radar
  },
  data() {
    return {
      timeFix: timeFix(),
      welcome: welcome(),
      postName: "",
      departName: "",
      avatar: "",
      user: {},
      welcomeStyle: {},
      postStyle: {
        "margin-top": "-5px",
        "margin-left": "-113px",
        flex: "auto",
        position: "absolute",
        left: "92px",
        transform: "scale(0.8)"
      },
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      nodelist: [],
      teams: [],
      yundisk: [
        { name: "全部", avatar: "/images/icon-all.svg" },
        { name: "文档", avatar: "/images/icon-doc.svg" },
        { name: "图片", avatar: "/images/icon-pic.svg" },
        { name: "视频", avatar: "/images/icon-video.svg" },
        { name: "音乐", avatar: "/images/icon-music.svg" }
      ],
      video: [
        { name: "活动视频", avatar: "/images/icon-activiti.svg" },
        { name: "短视频", avatar: "/images/icon-photo.svg" },
        { name: "纪录片", avatar: "/images/icon-log.svg" },
        { name: "电影", avatar: "/images/icon-movie.svg" }
      ],
      courses: [
        { name: "全部课程", avatar: "/images/icon-course-01.svg" },
        { name: "最新课程", avatar: "/images/icon-course-02.svg" },
        { name: "热门课程", avatar: "/images/icon-course-hot.svg" },
        { name: "我的课程", avatar: "/images/icon-course-03.svg" }
      ],
      dochub: [
        { name: "专业资料", avatar: "/images/icon-file-01.svg" },
        { name: "实用文档", avatar: "/images/icon-file-02.svg" },
        { name: "资格考试", avatar: "/images/icon-file-03.svg" },
        { name: "精品文档", avatar: "/images/icon-file-04.svg" },
        { name: "个人中心", avatar: "/images/icon-file-center.svg" }
      ],
      blog: [
        {
          name: "热门博客",
          avatar: "/images/icon-blog-hot.svg",
          href: "/blog/hot",
          click: () => {}
        },
        {
          name: "知名博主",
          avatar: "/images/icon-blog-01.svg",
          href: "/blog/writer",
          click: () => {}
        },
        {
          name: "博文排行",
          avatar: "/images/icon-rank-01.svg",
          href: "/blog/rank",
          click: () => {}
        },
        {
          name: "博客中心",
          avatar: "/images/icon-center-01.svg",
          href: "/blog/center",
          click: () => {
            //跳转到相应页面
            this.$router.push({
              path: "/blog/center",
              fullPath: "/blog/center",
              meta: { title: "博客中心" }
            });
          }
        }
      ],

      // data
      axis1Opts: {
        dataKey: "item",
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: "score",
        line: null,
        tickLine: null,
        grid: {
          type: "polygon",
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: "score",
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: "引用", a: 70, b: 30, c: 40 },
        { item: "口碑", a: 60, b: 70, c: 40 },
        { item: "产量", a: 50, b: 60, c: 40 },
        { item: "贡献", a: 40, b: 50, c: 40 },
        { item: "热度", a: 60, b: 70, c: 40 },
        { item: "引用", a: 70, b: 50, c: 40 }
      ],
      radarData: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    this.user = this.userInfo;

    console.log("this.avatar :" + this.avatar);

    try {
      manageAPI.getRoleList().then(res => {
        console.log("workplace -> call manageAPI.getRoleList()", res);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      manageAPI.getServiceList().then(res => {
        console.log("workplace -> call manageAPI.getServiceList()", res);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      //设置岗位style
      this.handlePostStyle();
    } catch (error) {
      console.log(error);
    }

    //设置员工岗位信息/部门信息
    try {
      this.v_user = await manageAPI.queryUserInfoByView(this.user.username);

      this.postName = this.v_user[0]["post"];
      this.departName = this.v_user[0]["name"];

      this.address = this.v_user[0]["address"];
      this.bio = this.v_user[0]["bio"];

      //设置头像信息
      this.avatar =
        window._CONFIG["imgDomainURL"] + "/" + this.v_user[0]["avatar"];
    } catch (error) {
      console.log("工作台设置员工岗位信息/部门信息异常：" + error);
    }

    //获取动态数据，并设置到动态列表中
    try {
      this.nodelist = await manageAPI.queryDynamicByUser(this.user.username);
    } catch (error) {
      console.log(error);
    }

    console.log("动态信息：" + JSON.stringify(this.nodelist));
  },
  mounted() {
    try {
      this.getProjects();
      this.getActivity();
      this.getTeams();
      this.initRadar();
      this.handlePostStyle();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    //...mapGetters(["nickname", "welcome"]),
    getProjects() {
      this.$http.get("/api/list/search/projects").then(res => {
        this.projects = res.result && res.result.data;
        this.loading = false;
      });
    },
    getActivity() {
      this.$http.get("/api/workplace/activity").then(res => {
        this.activities = res.result;
      });
    },
    getTeams() {
      this.$http.get("/api/workplace/teams").then(res => {
        this.teams = res.result;
      });
    },
    /**
     * @function 设置岗位style
     */
    handlePostStyle() {
      if (this.welcome.length > 76) {
        this.postStyle = { display: "none" };
      }
      //如果字数太多，则使用省略符号
      if (this.welcome.length > 200) {
        this.welcomeStyle = { "font-size": "13px" };
      }
      //如果字数太多，则使用省略符号
      if (this.welcome.length > 250) {
        this.welcomeStyle = { "font-size": "12px" };
      }
      //如果字数太多，则使用省略符号
      if (this.welcome.length > 270) {
        this.welcomeStyle = { "font-size": "12px" };
        this.welcome = this.welcome.substring(0, 270) + "...";
      }
    },

    /**
     * @function 跳转到个人中心
     */
    handleMyCenter() {
      //跳转到相应页面
      this.$router.push(`/account/center`);
    },
    /**
     * @function 跳转到我的待办
     */
    handleWait() {
      //跳转到我的待办
      this.$router.push(`/workflow/waiting`);
    },
    /**
     * @function 跳转到我的已办
     */
    handleDone() {
      //跳转到我的已办
      this.$router.push(`/workflow/done`);
    },
    /**
     * @function 跳转到我的公告
     */
    handleAnnounce() {
      //跳转到我的公告
      this.$router.push(`/workflow/announce`);
    },
    /**
     * @function 跳转到我的收藏
     */
    handleCollect() {
      //跳转到我的收藏
      this.$router.push(`/workflow/collection`);
    },
    /**
     * @function 跳转到消息通知页面
     */
    handleMessage() {
      //跳转到相应页面
      this.$router.push(`/account/settings/notification`);
    },
    /**
     * @function 跳转到请假申请列表
     */
    handleLeave() {
      var path = `/online/cgformList/b0ceb7cfb2b0487a96e03f50c413d762`;
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "请假申请" }
      });
    },
    /**
     * @function 跳转到外出申请列表
     */
    handleGoOut() {
      let path = `/online/cgformList/933e21cf445440abb8cfdae366082a62`;
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "外出申请" }
      });
    },
    /**
     * @function 跳转到加班申请列表
     */
    handleOvertime() {
      let path = `/online/cgformList/9ed5bc42eb934bbe8dac16ed1a3b103f`;
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "加班申请" }
      });
    },
    /**
     * @function 跳转到考勤异常申请列表
     */
    handleAttendance() {
      var path = "/online/cgformList/b0fee76c2ee84baeb9494b196b779e3e";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "考勤异常" }
      });
    },
    /**
     * @function 跳转到档案及证照借阅申请列表
     */
    handleFileBorrow() {
      var path = "/online/cgformList/3da23c7955d84465a759d0f1830a0d00";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "档案及证照借阅" }
      });
    },

    /**
     * @function 跳转到用印申请(合同)列表
     */
    handleUseSealCon() {
      var path = "/online/cgformList/dd78c4c8a59e4ee3bd93ec011a3f6b4c";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "用印申请(合同)" }
      });
    },
    /**
     * @function 跳转到用印申请(非合同)列表
     */
    handleUseSealCom() {
      var path = "/online/cgformList/cfd4ee2d60fa48f585c157d524b0a108";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "用印申请(非合同)" }
      });
    },
    /**
     * @function 跳转到用印申请(非合同)列表
     */
    handleSealDeclare() {
      var path = "/online/cgformList/e412b58db17b4cbf8cb9833c118c2d3b";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "印章借阅" }
      });
    },
    /**
     * @function 跳转到博客中心页面
     *
     */
    handleWriteBlog() {
      var path = "/blog/center";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "博客中心" }
      });
    },
    /**
     * @function 综合能力测评函数
     */
    handleAblityTest() {},
    /**
     * @function 团队信息设置函数
     */
    handleTeamInfo() {},

    /**
     * @function 跳转到用印申请(非合同)列表
     */
    handleTravel() {
      var path = "/online/cgformList/62f7122c73c244119e5d4ec8aa170a3d";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "出差申请" }
      });
    },
    /**
     * @function 跳转到车辆补贴列表
     */
    handleTravelSubsidy() {
      var path = "/online/cgformList/6bfb3ee6257a4066b1d26f195da83fe0";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "车辆补贴申请" }
      });
    },
    /**
     * @function 跳转到日报填写列表中
     */
    handleDailyFeedback() {
      var path = "/online/cgformList/688a9ea8187d461e9e921fd5a5829201";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "日报管理" }
      });
    },
    /**
     * @function 跳转到周报填写列表中
     */
    handleWeekFeedback() {
      var path = "/online/cgformList/9c4bf0f4951b44648659a34ead5d31cc";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "周报管理" }
      });
    },
    /**
     * @function 跳转到月报填写列表中
     */
    handleMonthFeedback() {
      var path = "/online/cgformList/6bf6537008514d319a95330459464f3e";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "月报管理" }
      });
    },
    /**
     * @function 跳转到通讯录页面
     */
    handleAddressBook() {
      var path = "/address/book";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "通讯录" }
      });
    },
    /**
     * @function 跳转到用户管理页面
     */
    handleUserManage() {
      var path = "/isystem/user";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "用户管理" }
      });
    },
    /**
     * @function 跳转到年报填写列表中
     */
    handleYearFeedback() {
      var path = "/online/cgformList/878dd1f28f0b4dfdaa74534eec902c0c";
      //跳转到相应页面
      this.$router.push({
        path: path,
        fullPath: path,
        meta: { title: "年度汇报" }
      });
    },
    initRadar() {
      this.radarLoading = true;
      this.$http.get("/api/workplace/radar").then(res => {
        const dv = new DataSet.View().source(res.result);
        dv.transform({
          type: "fold",
          fields: ["个人", "团队", "部门"],
          key: "user",
          value: "score"
        });
        this.radarData = dv.rows;
        this.radarLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
      margin-left: 12px;
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

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
