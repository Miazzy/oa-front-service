<template>
  <a-card :bordered="false" :class="{'abcdefg':true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'" ghost type="primary" @click="handlePrint">打印</a-button>
      <a-button ghost type="primary" @click="handleQRcode" style="margin-left:10px;">打码</a-button>
      <a-button ghost type="primary" @click="handleShort" style="margin-left:10px;">短链</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p
          style="font-size: 24px;font-weight: 800;margin-bottom:10px;margin-top:15px;margin-bottom:35px;"
        >{{formName}}</p>
      </div>
      <!--签字-->
      <a-col :md="24" :sm="24">
        <div class="sign" style="text-align: left;height: inherit;margin-left:35px;">
          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="typeof curRow.no != 'undefined' && curRow.no != null"
          >
            <span style="float:left;display:block;">{{tableInfo.no}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.no"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="typeof curRow.file_name != 'undefined' && curRow.file_name != null"
          >
            <span style="float:left;display:block;">{{curRow.fileNameTitle}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.file_name"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="typeof curRow.sigillum_name != 'undefined' && curRow.sigillum_name != null"
          >
            <span style="float:left;display:block;">{{tableInfo.sigillum_name}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.sigillum_name"
            ></div>
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span>{{tableInfo.create_by}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.create_by" />
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span style="margin-left: 0%">{{tableInfo.create_time}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.create_time" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof curRow.depart_name != 'undefined' && curRow.depart_name != null"
          >
            <span>{{tableInfo.depart_name}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.depart_name" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof curRow.leave_type_name != 'undefined' && curRow.leave_type_name != null"
          >
            <span style="margin-left: 0%">{{curRow.formTypeName}}类型:</span>
            <a-input style="width: 70%" readonly v-model="curRow.leave_type_name" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof curRow.announce_type != 'undefined' && curRow.announce_type != null"
          >
            <span style="margin-left: 0%">{{tableInfo.announce_type}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.announce_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof curRow.announce_title != 'undefined' && curRow.announce_title != null"
          >
            <span style="margin-left: 0%">{{tableInfo.announce_title}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.announce_title" />
          </a-col>

          <a-col
            :span="24"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.employee_rank != 'undefined' && tableInfo.employee_rank != null"
          >
            <a-col :span="12">
              <span>{{tableInfo.employee_rank}}:</span>
              <a-input style="width: 70%" readonly v-model="curRow.employee_rank" />
            </a-col>
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.starttime != 'undefined' && tableInfo.starttime != null"
          >
            <span>{{tableInfo.starttime}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.starttime" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.endtime != 'undefined' && tableInfo.endtime != null"
          >
            <span style="margin-left: 0%">{{tableInfo.endtime}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.endtime" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.total_days != 'undefined' && tableInfo.total_days != null"
          >
            <span>{{tableInfo.total_days}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.total_days" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.seal_copies != 'undefined' && tableInfo.seal_copies != null"
          >
            <span>{{tableInfo.seal_copies}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.seal_copies" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.declare_type != 'undefined' && tableInfo.declare_type != null"
          >
            <span>{{tableInfo.declare_type}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.declare_type" />
          </a-col>

          <a-col :span="12" style="margin-bottom:10px;">
            <span style="margin-left: 0%">{{tableInfo.bpm_status}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.bpm_status_name" />
          </a-col>
          <a-col :span="24"></a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="typeof curRow.seal_name != 'undefined' && curRow.seal_name != null"
          >
            <span style="float:left;display:block;">{{tableInfo.seal_name}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.seal_name"
            ></div>
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.employee_post != 'undefined' && tableInfo.employee_post != null && typeof curRow.employee_post != 'undefined' && curRow.employee_post != null"
          >
            <span style="margin-left:28px;">{{tableInfo.employee_post}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.employee_post" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.traffic_models != 'undefined' && tableInfo.traffic_models != null && typeof curRow.traffic_models != 'undefined' && curRow.traffic_models != null"
          >
            <span style="margin-left:28px;">{{tableInfo.traffic_models}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.traffic_models" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.licence_number != 'undefined' && tableInfo.licence_number != null && typeof curRow.licence_number != 'undefined' && curRow.licence_number != null"
          >
            <span style="margin-left:14px;">{{tableInfo.licence_number}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.licence_number" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.traffic_amount != 'undefined' && tableInfo.traffic_amount != null && typeof curRow.traffic_amount != 'undefined' && curRow.traffic_amount != null"
          >
            <span style="margin-left:28px;">{{tableInfo.traffic_amount.padStart(4,' ')}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.traffic_amount" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 20px;margin-bottom: 10px;"
            v-if="typeof curRow.content != 'undefined' && curRow.content != null"
          >
            <span style="float:left;display:block;">{{tableInfo.content}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.content"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.entourage != 'undefined' && tableInfo.entourage != null && typeof curRow.entourage != 'undefined' && curRow.entourage != null"
          >
            <span style="float:left;display:block;">{{tableInfo.entourage}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.entourage"
            ></div>
          </a-col>

          <a-col
            :span="12"
            style="margin-top:10px;margin-bottom:10px;"
            v-if="typeof tableInfo.travel_address != 'undefined' && tableInfo.travel_address != null"
          >
            <span>{{tableInfo.travel_address}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.travel_address" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top:10px;margin-bottom:10px;"
            v-if="typeof tableInfo.predict_fee != 'undefined' && tableInfo.predict_fee != null"
          >
            <span>{{tableInfo.predict_fee}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.predict_fee" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.drive_type != 'undefined' && tableInfo.drive_type != null"
          >
            <span>{{tableInfo.drive_type}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.drive_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.predict_mileage != 'undefined' && tableInfo.predict_mileage != null"
          >
            <span>{{tableInfo.predict_mileage}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.predict_mileage" />
          </a-col>

          <a-col
            :span="12"
            style="margin-bottom:10px;"
            v-if="typeof tableInfo.travel_transport != 'undefined' && tableInfo.travel_transport != null"
          >
            <span>{{tableInfo.travel_transport}}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.travel_transport" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.traffic_standards != 'undefined' && tableInfo.traffic_standards != null && typeof curRow.traffic_standards != 'undefined' && curRow.traffic_standards != null"
          >
            <span style="float:left;display:block;">{{tableInfo.traffic_standards}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.traffic_standards"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.traffic_numbers != 'undefined' && tableInfo.traffic_numbers != null && typeof curRow.traffic_numbers != 'undefined' && curRow.traffic_numbers != null"
          >
            <span style="float:left;display:block;">{{tableInfo.traffic_numbers}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.traffic_numbers"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.travel_remarks != 'undefined' && tableInfo.travel_remarks != null"
          >
            <span style="float:left;display:block;">{{tableInfo.travel_remarks}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.travel_remarks"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 30px"
            v-if="typeof curRow.location != 'undefined' && curRow.location != null"
          >
            <span style="float:left;display:block;">{{curRow.formTypeName}}地址:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.location"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-bottom:10px;margin-top:10px;"
            v-if="typeof curRow.announce_content != 'undefined' && curRow.announce_content != null"
          >
            <span style="float:left;display:block;">{{tableInfo.announce_content}}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.announce_content"
            ></div>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="curRow.main_table_status == true">
            <template>
              <a-table :columns="columns" :dataSource="data" :loading="loading" :pagination="false"></a-table>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="this.curRow != null && this.curRow.fileStatus != 1 && this.pageType != 'print' && this.curRow.fileType.includes('office')"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed></a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:2px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print'"
          >
            <template>
              <div
                :class="[this.curRow.fileStatus != 1 ? 'fileshow':'filenone']"
                v-if="this.curRow.fileType.includes('office')"
                style="width:100%;display:block;"
              >
                <div class="no-print" style="text-align: right">
                  <iframe
                    v-print="'#printContent'"
                    class="no-print fileview-iframe"
                    name="fileviewFrame"
                    id="fileviewFrame"
                    style="display:block;width:95%;align:left;height:720px;overflow-y:auto;overflow-x:hidden;border:1px solid #cecece;border-bottom:1px solid #cecece;"
                    :src="this.curRow.fileURL"
                  />
                </div>
              </div>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:15px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print'"
          >
            <template>
              <div class="office-container" style="margin-top:0px;">
                <div
                  class="ant-upload-list-item-info"
                  v-for="(item,index) in curRow.officeList"
                  :key="index"
                >
                  <span style="hover{background: #efeffe;}">
                    <a
                      rel="noopener noreferrer"
                      class="ant-upload-list-item-name"
                      style="float:left;margin-left:-20px;margin-top:5px;border-bottom:1px solid #f0f0f0; hover{background: #efeffe;}"
                    >
                      <a-icon type="file" style="float:left;margin-top:4px;margin-right:5px;" />
                      <span
                        type="file"
                        target="_blank"
                        :title="item.title"
                        @click="handlePreview(item)"
                        style="float:left;width:80%;margin-top:4px;margin-right:5px;hover{background: #efeffe; cursor:point;}"
                      >{{item.name}}</span>
                      <a-icon
                        type="download"
                        @click="handleDownLoad(item)"
                        style="float:right;margin-top:4px;width:10%;margin-right:5px;hover{background: #efeffe; cursor:point;}"
                      />
                    </a>
                  </span>
                </div>
              </div>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print' && this.curRow.fileType.includes('image')"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:2px;"
            v-if="this.curRow.fileStatus != 1 && this.pageType != 'print'"
          >
            <template>
              <div
                :class="[this.curRow.fileStatus != 1 ? 'fileshow':'filenone']"
                v-if="this.curRow.fileType.includes('image')"
                style="margin-botton:0px;"
              >
                <div style="margin-bottom:10px;">图片附件</div>
                <vue-preview :slides="slides" @close="handleClose" @click="handleImgClick"></vue-preview>
              </div>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="(curRow.bpm_status != 1 || workflows.length > 0 )"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;margin-bottom:20px;"
            v-if="(curRow.bpm_status != 1 || workflows.length > 0 ) && (pageType != 'print')"
          >
            <div style="margin-bottom:20px;">流程进度</div>
            <template>
              <a-steps style="width:80%;margin-bottom:10px;">
                <a-step :status="wflowstatus.start.status" title="发起">
                  <a-icon type="user" slot="icon" />
                </a-step>
                <a-step :status="wflowstatus.audit.status" title="审核">
                  <a-icon type="solution" slot="icon" />
                </a-step>
                <a-step :status="wflowstatus.approve.status" title="审批">
                  <a-icon type="audit" slot="icon" />
                </a-step>
                <a-step :status="wflowstatus.message.status" title="知会">
                  <a-icon type="mail" slot="icon" />
                </a-step>
              </a-steps>
              <br />
            </template>
            <div style="width:98%;margin-top:10px;margin-bottom:10px;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;"
            v-if="(curRow.bpm_status != 1 || workflows.length > 0 )"
          >
            <div style="margin-bottom:20px;">审批流程</div>
            <template>
              <a-timeline>
                <div v-for="(item,index) in workflows" :key="index">
                  <a-timeline-item v-bind:color="item.color">
                    <a-icon
                      v-if="item.status == 'wait'"
                      slot="dot"
                      type="clock-circle-o"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#eb2f2f"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'start'"
                      slot="dot"
                      type="tag"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#5599FF"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'cancel'"
                      slot="dot"
                      type="close-circle"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#ff0000"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'agree'"
                      slot="dot"
                      type="check-circle"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="#52ce1a"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'message'"
                      slot="dot"
                      type="mail"
                      style="font-size: 16px;"
                      theme="twoTone"
                      :twoToneColor="item.color"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'over'"
                      slot="dot"
                      type="flag"
                      style="font-size: 16px;"
                      theme="twoTone"
                      :twoToneColor="item.color"
                      v-bind:color="item.color"
                    />
                    <a-icon
                      v-if="item.status == 'sound'"
                      slot="dot"
                      type="sound"
                      style="font-size: 16px;"
                      theme="twoTone"
                      twoToneColor="orange"
                      v-bind:color="item.color"
                    />
                    {{item.content}}
                  </a-timeline-item>
                </div>
              </a-timeline>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="typeof tableInfo.traffic_numbers != 'undefined' && tableInfo.traffic_numbers != null"
          >
            <span style="float:left;display:block;">注:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 0px solid #cecece;padding-left:20px;"
            >
              <p>1. 此表批准后原价由综合部存档，复印件交财务部。</p>
              <p>2. 此表批准日期在15号（含15号）以前则从当月开始享有车辆补贴，在15号以后则从下月开始享有。</p>
              <p>3. 驾驶证、行驶证和身份证的复印件是该表的必备附件，驾驶证必须是申请人本人证件，行驶证与驾驶证户名不一致，需另附行驶证所有人的身份证复印件及关系证明、书面说明。</p>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:30px;"
            v-if="pageType == 'workflowing' && curRow.bpm_status == 1"
          >
            <template>
              <a-form :form="form">
                <a-form-item label="审核用户" style="width: 500px">
                  <j-select-multi-user v-model="wflowUsers"></j-select-multi-user>
                </a-form-item>

                <div style="width:500px;" v-if="auditData != null && auditData.length > 0">
                  <a-table :columns="wflowcolumns" :dataSource="auditData" :pagination="false"></a-table>
                </div>

                <a-form-item label="审批用户" style="width: 500px; margin-top:10px;">
                  <j-select-multi-user v-model="approveUser"></j-select-multi-user>
                </a-form-item>

                <div style="width:500px;" v-if="approveData != null && approveData.length > 0">
                  <a-table :columns="wflowcolumns" :dataSource="approveData" :pagination="false"></a-table>
                </div>

                <a-form-item label="知会用户" style="width: 500px; margin-top:10px;">
                  <j-select-multi-user v-model="notifyUsers"></j-select-multi-user>
                </a-form-item>
              </a-form>
            </template>
            <template>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  ghost
                  type="primary"
                  @click="handleSubmitWF"
                  v-if="pageType == 'workflowing' || pageType == 'notifying'"
                >提交</a-button>
              </div>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'notifying'">
            <template>
              <a-form :form="form">
                <a-form-item label="知会用户" style="width: 500px">
                  <j-select-multi-user v-model="notifyUsers"></j-select-multi-user>
                </a-form-item>
              </a-form>
            </template>
            <template>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  ghost
                  type="primary"
                  @click="handleSubmitWF"
                  v-if="pageType == 'workflowing' || pageType == 'notifying'"
                >提交</a-button>
              </div>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'workflow'">
            <template>
              <div style="width:88%;">
                <a-textarea
                  style="align:left;text-align:left;"
                  placeholder="请输入审批意见"
                  v-model="curRow.idea_content"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                />
              </div>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  type="primary"
                  style="margin-right:10px;margin-top:10px;background-color:#2090fe;border: 1px solid #fefefe;"
                  @click="handleApproveWF"
                >同意</a-button>
                <a-button
                  type="primary"
                  style="margin-right:10px;margin-top:10px;background-color:#fe5050;border: 1px solid #fefefe;"
                  @click="handleRejectWF"
                >驳回</a-button>
              </div>
            </template>
          </a-col>

          <a-col :span="24" style="margin-top:30px;" v-if="pageType == 'notify'">
            <template>
              <div style="width:88%;">
                <a-textarea
                  style="align:left;text-align:left;"
                  placeholder="请输入知会意见"
                  v-model="curRow.idea_content"
                  :autosize="{ minRows: 2, maxRows: 10 }"
                />
              </div>
              <div style="width:88%;margin-top:10px;">
                <a-button
                  type="primary"
                  style="margin-right:10px;margin-top:10px;background-color:#2090fe;border: 1px solid #fefefe;"
                  @click="handleConfirmWF"
                >确认</a-button>
              </div>
            </template>
          </a-col>

          <a-modal
            title="温馨提示"
            :visible="tipVisible"
            @ok="tipHandleOk"
            :confirmLoading="tipConfirmLoading"
            @cancel="tipHandleCancel"
          >
            <p>{{tipContent}}</p>
          </a-modal>

          <el-dialog title="二维码分享" :visible.sync="qrcodeVisible" width="30%">
            <div style="text-align:center;">
              <qrcode :value="qrcodeUrl" :options="{ width: 200 }" style="text-align:center;"></qrcode>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="qrcodeVisible = false">取 消</el-button>
              <el-button type="primary" @click="qrcodeVisible = false">确 定</el-button>
            </span>
          </el-dialog>

          <el-dialog title="短链接分享" :visible.sync="shortUrlVisible" width="30%">
            <div style="text-align:center;">
              <span>{{ shortUrl }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="shortUrlVisible = false">取 消</el-button>
              <el-button type="primary" @click="shortUrlVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </a-col>
    </section>
  </a-card>
</template>
       
<script>
import * as manageAPI from "@/api/manage";
import * as workflowAPI from "@/api/workflow";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";
import * as _ from "underscore";
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import ATextarea from "ant-design-vue/es/input/TextArea";
import JSelectMultiUser from "@/components/jeecgbiz/JSelectMultiUser";
import Vue from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";

//Vue挂载QRCode组件
Vue.component(VueQrcode.name, VueQrcode);

//默认预览图片
const images = [];

export default {
  components: {
    ATextarea,
    ARow,
    ACol,
    JSelectMultiUser
  },
  name: "Printgzsld",
  props: {
    reBizCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      columns: [],
      data: [],
      loading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      formName: "流程申请单",
      curRow: {},
      depart: {},
      fileinfo: "",
      workflows: [],
      pageType: "view",
      tableName: "",
      wflowUsers: "",
      notifyUsers: "",
      approveUser: "",
      tableInfo: "",
      tipVisible: false,
      tipContent: "",
      slides: images,
      wflowstatus: {},
      shortUrl: "",
      qrcodeUrl: "",
      qrcodeVisible: false,
      shortUrlVisible: false,
      form: this.$form.createForm(this),
      wflowcolumns: [
        {
          title: "序号",
          dataIndex: "no",
          key: "no"
        },
        {
          title: "中文",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "英文",
          dataIndex: "nickname",
          key: "nickname"
        }
      ],
      auditData: [],
      approveData: []
    };
  },

  async created() {},

  async mounted() {
    //查询当前节点信息
    let that = await manageAPI.watchFormLeave(this);
    //获取返回结果
    let result = await manageAPI.colorProcessDetail(that, this);
    //返回结果
    return result;
  },

  watch: {
    async $route() {
      //查询当前节点信息
      let that = await manageAPI.watchFormLeave(this);
      //获取返回结果
      let result = await manageAPI.colorProcessDetail(that, this);
      //返回结果
      return result;
    },
    async wflowUsers(users) {
      var userlist = await manageAPI.queryUserName();
      var ulist = users.split(",");
      this.auditData = [];
      _.each(ulist, (item, index) => {
        //查询用户信息
        var user = _.find(userlist, user => {
          return user.username == item;
        });
        this.auditData.push({
          no: index + 1,
          name: user.realname,
          nickname: user.username
        });
      });
      console.log("审核用户列表：" + users);
    },
    async approveUser(users) {
      var userlist = await manageAPI.queryUserName();
      var ulist = users.split(",");
      this.approveData = [];
      _.each(ulist, (item, index) => {
        //查询用户信息
        var user = _.find(userlist, user => {
          return user.username == item;
        });
        this.approveData.push({
          no: index + 1,
          name: user.realname,
          nickname: user.username
        });
      });
      console.log("审批用户列表：" + users);
    }
  },
  methods: {
    /**
     * @function 加载数据函数
     */
    async loadData() {
      //查询当前节点信息
      let that = await manageAPI.watchFormLeave(this);
      //获取返回结果
      let result = await manageAPI.colorProcessDetail(that, this);
      //返回结果
      return result;
    },

    /**
     * @function 获取数据函数
     */
    async getDate() {},

    /**
     * @function 弹出框确认函数
     */
    async tipHandleOk() {
      this.tipConfirmLoading = true;
      setTimeout(() => {
        this.loadData();
        this.tipVisible = false;
        this.tipConfirmLoading = false;
      }, 300);
    },

    /**
     * @function 弹出框取消操作
     */
    async tipHandleCancel() {
      this.loadData();
      this.tipVisible = false;
    },

    /**
     * @function 获取字段值
     */
    async getFormFieldValue(field) {
      return this.form.getFieldValue(field);
    },

    /**
     * @function 处理打印操作
     */
    async handlePrint() {
      this.curRow.fileStatus = 1;
      setTimeout(() => {
        this.curRow.fileStatus = 0;
      }, 10000);
    },
    /**
     * @function 生成二维码操作
     */
    async handleQRcode() {
      //生成分享链接
      var url = window.location.href.replace("workflow", "basewflow");

      //根据分享链接生成二维码显示URL
      this.qrcodeUrl = url;

      //弹出弹框显示二维码
      this.qrcodeVisible = true;
    },
    /**
     * @function 生成短链接操作
     */
    async handleShort() {
      //生成分享链接
      var url = window.location.href.replace("workflow", "basewflow");
      //加密后的URL
      var encode = window.btoa(url);

      var originNode = tools.getStore(encode);

      if (tools.deNull(originNode) != "") {
        //获取短随机码
        let random = originNode.code;
        //获取失效时间
        let expire_ = originNode.expire_;

        //获取当前时间
        var expire = new Date();
        expire = tools.formatDate(date, "yyyyMMdd");

        //缓存未失效，则直接展示二维码
        if (expire <= expire_) {
          //弹出弹框显示端链接
          this.shortUrl =
            "本文分享地址：" + window._CONFIG["domain"] + "/s/" + random;

          //弹出弹框显示二维码
          this.shortUrlVisible = true;

          //设置返回值
          return true;
        }
      }

      //计算一个短随机码值
      let random = manageAPI.queryRandomStr(4);

      //获取时间戳
      var timestamp = new Date().getTime();

      //统计次数
      var count = 0;

      //失效时间
      var date = new Date();
      date.setMonth(date.getMonth() + 1);
      var datetime = tools.formatDate(date, "yyyy-MM-dd hh:mm:ss");
      var datestr = tools.formatDate(date, "yyyyMMdd");

      //设置应该保存数据
      var node = {
        id: random,
        code: random,
        url: url,
        count: count,
        expire: datetime,
        expire_: datestr,
        time: timestamp
      };

      //保存到缓存中
      tools.setStore(encode, JSON.stringify(node));

      //将短随机码和真实链接对应关系写入数据库中，有效时间30+-2天
      manageAPI.postTableData("bs_short_link", node);

      //弹出弹框显示端链接
      this.shortUrl =
        "本文分享地址：" + window._CONFIG["domain"] + "/s/" + random;

      //弹出弹框显示二维码
      this.shortUrlVisible = true;
    },
    async handlePreview(item) {
      //检测转化后的FileURL是否可用，如果可用则使用本地地址预览，否则使用kkfileview预览
      var existFlag = await manageAPI.queryUrlValid(item.fileURL);
      //如果文件地址不存在，则使用kkfileview预览模式，否则使用自带预览服务
      if (!existFlag) {
        window.open(window._CONFIG["previewURL"] + item.msrc);
      } else {
        //window打开链接
        window.open(item.src);
      }
    },
    /**
     * @function 处理下载功能
     */
    async handleDownLoad(item) {
      //打印日志
      console.log(JSON.stringify(item));
      //window打开链接
      window.open(item.msrc);
    },

    /**
     * @function 处理用户信息
     */
    async handleUserInfo(userInfo) {
      //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
      if (typeof userInfo == "undefined" && userInfo == null) {
        //确认用户信息
        this.$confirm_({
          title: "提示信息",
          content: "用户登录信息过期，请重新登录！",
          onOk: async () => {
            //清空缓存信息
            storage.clearAll();
            //跳转到登录页面
            this.$router.push(`/user/login`);
          }
        });
        return false;
      } else {
        return true;
      }
    },

    /**
     * @function 同意审批
     */
    async handleApproveWF() {
      //确认提交此自由流程
      this.$confirm_({
        title: "确认操作",
        content: "是否确认提交此自由流程?",
        onOk: async () => {
          //设置this的别名
          var that = this;
          //返回结果
          var result;

          //获取当前用户
          var userInfo = storage.getStore("cur_user");

          //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
          await this.handleUserInfo(userInfo);

          //获取当前时间
          var date = tools.formatDate(
            new Date().getTime(),
            "yyyy-MM-dd hh:mm:ss"
          );
          //审批动作
          var operation = operation || "同意";
          //审批意见
          var message = message || this.curRow.idea_content || "同意";
          //当前被选中记录数据
          var curRow = that.curRow;
          //流程日志编号
          var processLogID = tools.queryUrlString("processLogID");
          //打印表单名称
          var tableName = tools.queryUrlString("table_name");
          //审批节点信息
          var approveNode = null;
          //定义当前审批日志信息
          var node = [];
          //业务代码ID
          var bussinessCodeID = null;
          //获取流程审批信息
          var processAudit = null;
          //转历史日志节点
          var prLogHisNode = null;
          //流程权责
          var rights = null;

          try {
            //获取当前审批节点的所有数据
            curRow = await manageAPI.queryProcessLogByID(
              tableName,
              processLogID
            );
          } catch (error) {
            console.log(error);
          }

          //未获取当前审批流程
          if (tools.deNull(curRow) == "") {
            that.$message.warning(
              "未找到下一节点的流程信息，请刷新页面，查看是否已经审批完成！"
            );
            return false;
          }

          //业务代码ID
          bussinessCodeID = curRow["business_data_id"];
          //获取流程审批信息
          processAudit = curRow["process_audit"];

          //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
          if (
            !(
              tools.deNull(curRow["employee"]).includes(userInfo["username"]) ||
              tools.deNull(curRow["employee"]).includes(userInfo["realname"])
            )
          ) {
            that.$message.warning(
              "您不在此审批流程记录的操作职员列中，无法进行审批操作！"
            );
            return false;
          }

          try {
            //获取关于此表单的所有当前审批日志信息
            node = await manageAPI.queryProcessLog(tableName, bussinessCodeID);
          } catch (error) {
            console.log(error);
          }

          //遍历node,设置approve_user，action
          _.each(node, function(item) {
            //记录创建时间
            let ctime = item["create_time"];
            //设置审批人员
            item["approve_user"] = userInfo["username"];
            //设置操作类型
            item["action"] = operation;
            //设置操作时间
            item["operate_time"] = date;
            //设置操作意见
            item["action_opinion"] = message;
            //设置创建时间
            item["create_time"] = tools.formatDate(
              ctime,
              "yyyy-MM-dd hh:mm:ss"
            );
          });

          //转历史日志节点
          prLogHisNode = JSON.parse(JSON.stringify(node));
          //第一步，获取此表单，关联的流程业务模块；查询SQL , 获取流程权责中关联业务含有tableName的流程权责
          rights = await manageAPI.queryBusinessInfo(tableName);
          //选定流程权责
          that.fixedWFlow = rights[0];
          //设置当前流程审批权责
          that.rights = rights;

          //如果流程权责有多个，那么弹出选择框，让用户自己选择一个流程
          if (rights.length > 1 && curRow.business_code != "000000000") {
            //that.modelModal = true;
            that.tipVisible = true;
            that.tipContent =
              "获取到此业务含有多个流程权责，请联系管理员进行配置！";
            return false;
          } else if (
            rights.length <= 0 &&
            curRow.business_code != "000000000"
          ) {
            that.tipVisible = true;
            that.tipContent = "未获取到此业务的流程权责，无法同意审批！";
            return false;
          } else {
            //所有待审核节点
            var allAudit = "";
            //所有待知会节点
            var allNotify = "";
            //当前审核节点
            var curAuditor = processAudit;
            //知会节点数组
            var notifyArray =
              tools.deNull(allNotify) == "" ? "" : allNotify.split(",");

            //如果不是自由流程，则从权责配置中获取待审核人列表，否则，使用自由流程配置的审核人员列表
            if (curRow.business_code != "000000000") {
              try {
                //根据权责配置，获取所有待审核人员列表
                allAudit =
                  "," +
                  that.fixedWFlow["audit"] +
                  "," +
                  that.fixedWFlow["approve"] +
                  ",";
                //根据权责配置，获取所有待知会人员列表
                allNotify = that.fixedWFlow["notify"];
                //设置审批节点
                approveNode = that.fixedWFlow["approve"];
              } catch (error) {
                that.tipVisible = true;
                that.tipContent = "固化流程设置节点失败，无法进行审批操作！";
                console.log("固化流程设置节点失败 :" + error);
                return false;
              }
            } else {
              try {
                //自由流程配置消息
                var freeNode = JSON.parse(curRow.business_data);
                //检查是否存在自由流程节点audit_node & approve_node & notify_node , 如果不存在，在下级节点中寻找
                if (
                  !("audit_node" in freeNode) &&
                  !("approve_node" in freeNode) &&
                  !("notify_node" in freeNode)
                ) {
                  freeNode = JSON.parse(freeNode.business_data);
                }

                //如果仍然为获取到自由流程节点，则从自由流程表中找

                //根据自由流程配置，获取所有待审核人员列表
                allAudit =
                  "," +
                  tools.deNull(freeNode.audit_node) +
                  "," +
                  tools.deNull(freeNode.approve_node) +
                  ",";

                //根据自由流程配置，获取所有待知会人员列表
                notifyArray =
                  tools.deNull(freeNode.notify_node) == ""
                    ? []
                    : [freeNode.notify_node];

                //设置审批节点
                approveNode = freeNode.approve_node;

                //获取自由流程配置，当前审核节点
                curAuditor = curRow["employee"];
              } catch (error) {
                that.tipVisible = true;
                that.tipContent = "自由流程设置节点失败，无法进行审批操作！";
                console.log("自由流程设置节点失败 :" + error);
                return false;
              }
            }

            //判断是否存在重复人员，如果存在重复人员，则去掉一个重复人员
            if (
              allAudit.indexOf("," + curAuditor + ",") !=
              allAudit.lastIndexOf("," + curAuditor + ",")
            ) {
              allAudit = allAudit.replace("," + curAuditor + ",", ",");
            }

            //当前审核分割组，第一组是已经审核通过的，第二组是待审核的
            var auditArray = allAudit.split("," + curAuditor + ",");
            //如果存在审核人
            var firstAuditor = auditArray[1];
            //流程状态
            var bpmStatus = {};

            //如果待审核节点为空，则表示已经审批通过 //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
            if (firstAuditor == "") {
              //设置流程状态 审批节点已经走完，流程状态为4：已完成
              bpmStatus = { bpm_status: "4" };

              //执行知会流程，添加多条知会记录。将知会节点的所有待知会节点，拆分成为数组，遍历数组，数组中每个元素，推送一条知会记录，注意forEach不能使用await
              for (let item of notifyArray) {
                //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
                var employee = await manageAPI.queryProcessNodeEmployee(item);
                //流程岗位
                var process_station = await manageAPI.queryProcessNodeProcName(
                  item
                );
                //审批相关流程节点
                var pnode = {};

                if (curRow.business_code != "000000000") {
                  //提交审批相关处理信息
                  pnode = {
                    id: manageAPI.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: curRow["main_value"], //表主键值
                    business_data_id: curRow["business_data_id"], //业务具体数据主键值
                    business_code: that.fixedWFlow["id"], //业务编号
                    process_name: that.fixedWFlow["items"], //流程名称
                    employee: employee[0]["employee"],
                    process_station: process_station[0]["item_text"],
                    process_audit: item,
                    operate_time: date,
                    create_time: date,
                    proponents: curRow["proponents"],
                    content: curRow["content"],
                    business_data: JSON.stringify(curRow)
                  };
                } else {
                  //提交审批相关处理信息
                  pnode = {
                    id: manageAPI.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: curRow["business_data_id"], //表主键值
                    business_data_id: curRow["business_data_id"], //业务具体数据主键值
                    business_code: "000000001", //业务编号
                    process_name: "自由流程知会", //流程名称
                    employee: item,
                    process_station: "自由流程知会",
                    process_audit: "000000001",
                    proponents: curRow["proponents"],
                    content: curRow["content"],
                    operate_time: date,
                    create_time: date,
                    business_data: curRow.business_data
                  };
                }

                //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
                result = await manageAPI.postProcessLogInformed(pnode);
              }

              //执行事务处理
              var operationData = {
                id: manageAPI.queryRandomStr(32),
                type: "approve",
                create_by: userInfo["username"],
                create_time: date,
                table_name: tableName,
                table_id: curRow["business_data_id"],
                table_data: JSON.stringify(that.curRow),
                status: "wait",
                current_data: JSON.stringify({
                  opeartion: "add",
                  tableName: "PR_LOG",
                  data: ""
                }),
                history_data: JSON.stringify({
                  operation: "add",
                  tableName: "PR_LOG_HISTORY",
                  data: prLogHisNode
                }),
                inform_data: JSON.stringify({
                  operation: "add",
                  tableName: "PR_LOG_INFORMED",
                  data: pnode
                }),
                delete_data: JSON.stringify({
                  operation: "delete",
                  tableName: "PR_LOG",
                  data: prLogHisNode
                }),
                origin_data: JSON.stringify({
                  operation: "patch",
                  tableName: tableName,
                  id: curRow["business_data_id"],
                  data: bpmStatus
                }),
                trends_data: JSON.stringify({
                  opeartion: "add",
                  tableName: "",
                  data: ""
                }),
                task_data: JSON.stringify({
                  opeartion: "add",
                  tableName: "",
                  data: ""
                }),
                other_data: JSON.stringify({})
              };

              //执行审批业务
              await workflowAPI.postWorkflowApprove(
                tableName,
                curRow,
                operationData,
                null,
                prLogHisNode,
                bpmStatus
              );

              //当前已经是最后一个审批节点，流程已经处理完毕
              that.tipContent = "同意审批成功，审批流程处理完毕！";

              //TODO 以前此表单的自由流程进入历史 //TODO 删除以前此表单对应的自由流程
            } else {
              //如果firstAuditor是逗号开头，则去掉开头的逗号
              firstAuditor =
                firstAuditor.indexOf(",") == 0
                  ? firstAuditor.substring(1)
                  : firstAuditor;

              //获取下一审核节点
              firstAuditor = firstAuditor.split(",")[0];

              //设置流程 检查当前审核节点是否为审批节点，如果是，则bpm_status_code设置为3：审批中，否则，状态为 状态为2：审核中
              approveNode == firstAuditor
                ? (bpmStatus = { bpm_status: "3" })
                : (bpmStatus = { bpm_status: "2" });

              //审批相关处理信息
              pnode = {};

              if (curRow.business_code != "000000000") {
                //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
                employee = await manageAPI.queryProcessNodeEmployee(
                  firstAuditor
                );
                //流程岗位
                process_station = await manageAPI.queryProcessNodeProcName(
                  firstAuditor
                );
                //提交审批相关处理信息
                pnode = {
                  id: manageAPI.queryRandomStr(32), //获取随机数
                  table_name: tableName, //业务表名
                  main_value: curRow["main_value"], //表主键值
                  business_data_id: curRow["business_data_id"], //业务具体数据主键值
                  business_code: that.fixedWFlow["id"], //业务编号
                  process_name: that.fixedWFlow["items"], //流程名称
                  employee: employee[0]["employee"],
                  process_station: process_station[0]["item_text"],
                  process_audit: firstAuditor,
                  proponents: curRow["proponents"],
                  content: curRow["content"],
                  create_time: date,
                  business_data: curRow.business_data
                };
              } else {
                //提交审批相关处理信息
                pnode = {
                  id: manageAPI.queryRandomStr(32), //获取随机数
                  table_name: tableName, //业务表名
                  main_value: curRow["business_data_id"], //表主键值
                  business_data_id: curRow["business_data_id"], //业务具体数据主键值
                  business_code: "000000000", //业务编号
                  process_name: "自由流程审批", //流程名称
                  employee: firstAuditor,
                  process_station: "自由流程审批",
                  process_audit: "000000000",
                  proponents: curRow["proponents"],
                  content: curRow["content"],
                  operate_time: date,
                  create_time: date,
                  business_data: curRow.business_data
                };
              }

              //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
              var vflag = await manageAPI.queryApprovalExist(
                tableName,
                curRow["business_data_id"]
              );

              if (vflag) {
                //数据库中已经存在此记录，提示用户无法提交审批
                that.tipContent =
                  "处理异常，请稍后重试；如果多次处理异常，可能需要撤销当前审批，重新发起审批流程！";
              } else {
                //执行事务处理
                var operationData = {
                  id: manageAPI.queryRandomStr(32),
                  type: "next",
                  create_by: userInfo["username"],
                  create_time: date,
                  table_name: tableName,
                  table_id: curRow["business_data_id"],
                  table_data: JSON.stringify(that.curRow),
                  status: "wait",
                  current_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "PR_LOG",
                    data: pnode
                  }),
                  history_data: JSON.stringify({
                    operation: "add",
                    tableName: "PR_LOG_HISTORY",
                    data: prLogHisNode
                  }),
                  inform_data: JSON.stringify({
                    operation: "add",
                    tableName: "PR_LOG_INFORMED",
                    data: ""
                  }),
                  delete_data: JSON.stringify({
                    operation: "delete",
                    tableName: "PR_LOG",
                    data: prLogHisNode
                  }),
                  origin_data: JSON.stringify({
                    operation: "patch",
                    tableName: tableName,
                    id: curRow["business_data_id"],
                    data: bpmStatus
                  }),
                  trends_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "",
                    data: ""
                  }),
                  task_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "",
                    data: ""
                  }),
                  other_data: JSON.stringify({})
                };

                //执行审批业务
                await workflowAPI.postWorkflowApprove(
                  tableName,
                  curRow,
                  operationData,
                  pnode,
                  prLogHisNode,
                  bpmStatus
                );

                //提示信息 //console.log(" 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result) );
                that.tipContent = "同意审批成功，审批流程已推向后续处理人！";
              }
            }
          }
          //提示用户撤销审批操作成功
          that.tipVisible = true;

          //刷新页面数据
          this.loadData();

          //设置为view预览模式
          this.pageType = "view";

          //同意审批成功
          return result;
        }
      });
    },

    /**
     * @function 驳回审批
     */
    async handleRejectWF() {
      //是否进行驳回审批操作?
      this.$confirm_({
        title: "确认操作",
        content: "是否进行驳回审批操作?",
        onOk: async () => {
          //设置this的别名
          var that = this;

          //返回结果
          var result;

          //获取当前用户
          var userInfo = storage.getStore("cur_user");

          //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
          await this.handleUserInfo(userInfo);

          //获取当前时间
          var date = tools.formatDate(
            new Date().getTime(),
            "yyyy-MM-dd hh:mm:ss"
          );

          //审批动作
          var operation = operation || "驳回";

          //审批意见
          var message = message || that.curRow.idea_content || "驳回";

          //当前被选中记录数据
          var curRow = that.curRow;

          //流程日志编号
          var processLogID = tools.queryUrlString("processLogID");

          //打印表单名称
          var tableName =
            curRow["table_name"] || tools.queryUrlString("table_name");

          //流程状态
          var bpmStatus = { bpm_status: "1" };

          //获取当前审批节点的所有数据
          curRow = await manageAPI.queryProcessLogByID(tableName, processLogID);

          //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
          if (
            !(
              tools.deNull(curRow["employee"]).includes(userInfo["username"]) ||
              tools.deNull(curRow["employee"]).includes(userInfo["realname"])
            )
          ) {
            that.$message.warning(
              "您不在此审批流程记录的操作职员列中，无法进行驳回操作！"
            );
            return false;
          }

          //获取当前审批节点的所有数据
          curRow = await manageAPI.queryProcessLogByID(tableName, curRow["id"]);

          //获取关于此表单的所有当前审批日志信息
          let node = await manageAPI.queryProcessLog(
            tableName,
            curRow["business_data_id"]
          );

          //遍历node,设置approve_user，action
          _.each(node, function(item) {
            //获取创建时间
            let ctime = item["create_time"];
            //设置审批人员
            item["approve_user"] = userInfo["username"];
            //设置操作动作
            item["action"] = operation;
            //设置操作时间
            item["operate_time"] = date;
            //设置操作意见
            item["action_opinion"] = message;
            //设置创建时间
            item["create_time"] = tools.formatDate(
              ctime,
              "yyyy-MM-dd hh:mm:ss"
            );
          });

          //执行审批驳回业务
          await workflowAPI.postWorkflowApprove(
            tableName,
            curRow,
            null,
            null,
            node,
            bpmStatus
          );

          //提示用户撤销审批操作成功
          that.tipVisible = true;
          that.tipContent = "驳回审批成功！";

          //设置为view预览模式
          this.pageType = "view";

          //刷新页面数据
          this.loadData();

          //返回操作结果
          return result;
        }
      });
    },

    /**
     * @function 知会确认
     */
    async handleConfirmWF() {
      //是否进行确认知会操作?
      this.$confirm_({
        title: "确认操作",
        content: "是否进行确认知会操作?",
        onOk: async () => {
          //设置this的别名
          var that = this;

          //返回结果
          var result;

          //获取当前用户
          var userInfo = storage.getStore("cur_user");

          //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
          await this.handleUserInfo(userInfo);

          //获取当前时间
          var date = tools.formatDate(
            new Date().getTime(),
            "yyyy-MM-dd hh:mm:ss"
          );

          //审批动作
          var operation = operation || "知会";

          //审批意见
          var message = message || that.curRow.idea_content || "知会确认";

          //当前被选中记录数据
          var curRow = that.curRow;

          //流程日志编号
          var processLogID = tools.queryUrlString("processLogID");

          //打印表单名称
          var tableName = tools.queryUrlString("table_name");

          //定义流程状态
          var bpmStatus = { bpm_status: "5" };

          //获取当前审批节点的所有数据
          curRow = await manageAPI.queryProcessLogInfByID(
            tableName,
            processLogID
          );

          //设置本次知会确认创建时间
          curRow["create_time"] = date;

          //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
          if (
            tools.deNull(curRow["approve_user"]).length >=
            tools.deNull(curRow["employee"]).length
          ) {
            //（1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
            try {
              //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
              result = await manageAPI.postProcessLogHistory(curRow);
              //删除当前审批节点中的所有记录
              result = await manageAPI.deleteProcessLogInf(tableName, [curRow]);
              //如果当前已经进入流程，则需要将流程状态设置为5：已完成
              result = await manageAPI.patchTableData(
                tableName,
                curRow["business_data_id"],
                bpmStatus
              );
            } catch (error) {
              console.log(error);
            }

            //显示弹框，提示知会成功
            that.tipVisible = true;
            that.tipContent = "知会确认成功！";
            return true;
          }

          var employeeList = "," + tools.deNull(curRow["employee"]) + ",";
          var appoveUserList = "," + tools.deNull(curRow["approve_user"]) + ",";

          //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
          if (
            !(
              tools
                .deNull(employeeList)
                .includes("," + userInfo["username"] + ",") ||
              tools
                .deNull(employeeList)
                .includes("," + userInfo["realname"] + ",")
            )
          ) {
            that.$message.warning(
              "您不在此知会记录的操作职员列中，无法进行确认操作！"
            );
            return false;
          }

          //已经知会确认过的用户，无法再次知会
          if (
            tools
              .deNull(appoveUserList)
              .includes("," + userInfo["username"] + ",") ||
            tools
              .deNull(appoveUserList)
              .includes("," + userInfo["realname"] + ",")
          ) {
            that.$message.warning("您已经在此知会记录中，执行过确认操作了！");
            return false;
          }

          //设置知会确认人员
          curRow["approve_user"] =
            tools.deNull(curRow["approve_user"]) +
            (tools.deNull(curRow["approve_user"]) == "" ? "" : ",") +
            userInfo["username"];

          //设置操作内容
          curRow["action"] = operation;

          //设置操作时间
          curRow["operate_time"] = date;

          //设置操作意见
          curRow["action_opinion"] =
            tools.deNull(curRow["action_opinion"]) +
            (tools.deNull(curRow["action_opinion"]) == "" ? "" : "\n\r") +
            `${userInfo["username"]}:${message}`;

          //保存当前数据到数据库中
          await manageAPI.patchTableData(
            "PR_LOG_INFORMED",
            curRow["id"],
            curRow
          );

          //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
          if (curRow["approve_user"].length >= curRow["employee"].length) {
            try {
              //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
              result = await manageAPI.postProcessLogHistory(curRow);
              //删除当前审批节点中的所有记录
              result = await manageAPI.deleteProcessLogInf(tableName, [curRow]);
              //如果当前已经进入流程，则需要将流程状态设置为5：已完成  （1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
              result = await manageAPI.patchTableData(
                tableName,
                curRow["business_data_id"],
                bpmStatus
              );
            } catch (error) {
              console.log(error);
            }

            //TODO 以前此表单的自由流程进入历史

            //TODO 删除以前此表单对应的自由流程
          }

          that.tipVisible = true;
          that.tipContent = "知会确认成功！";

          //设置为view预览模式
          this.pageType = "view";

          //刷新页面数据
          this.loadData();

          //返回结果
          return result;
        }
      });
    },

    /**
     * @function 提交自由流程
     */
    async handleSubmitWF() {
      //获取审核用户记录
      var wfUsers = this.wflowUsers;

      //获取知会用户记录
      var nfUsers = this.notifyUsers;

      //获取审批用户，审批用户为终审节点
      var approver = this.approveUser;

      //校验提交信息是否准确
      var checkFlag = workflowAPI.checkSubmitInfo(
        wfUsers,
        nfUsers,
        approver,
        this.pageType,
        this.$confirm_
      );

      //如果校验标识有误，则直接返回
      if (!checkFlag) {
        return checkFlag;
      }

      //是否确认提交此自由流程?
      this.$confirm_({
        title: "确认操作",
        content: "是否确认提交此自由流程?",
        onOk: async () => {
          //获取当前用户
          var userInfo = storage.getStore("cur_user");

          //如果没有获取到用户信息，提示用户登录信息过期，请重新登录
          await this.handleUserInfo(userInfo);

          //获取审核用户记录
          var wfUsers = this.wflowUsers;

          //获取知会用户记录
          var nfUsers = this.notifyUsers;

          //获取审批用户，审批用户为终审节点
          var approver = this.approveUser;

          //当前时间
          var ctime = tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

          //获取此表单，关联的流程业务模块
          var tableName = tools.queryUrlString("table_name");

          //自由流程节点
          var node = {
            id: manageAPI.queryRandomStr(32),
            create_by: userInfo["username"],
            create_time: ctime,
            table_name: tableName,
            main_key: tools.queryUrlString("id"),
            audit_node: tools.deNull(wfUsers),
            approve_node: tools.deNull(approver),
            notify_node: tools.deNull(nfUsers)
          };

          //提交自由流程审批
          if (tools.deNull(approver) != "" && this.pageType == "workflowing") {
            //将审批用户记录，知会用户记录，写入相应的自由流程表单中
            var result = null; //await manageAPI.postProcessFreeNode(node);

            const freeWFNode = JSON.parse(JSON.stringify(node));

            //提交发起人审批相关处理信息
            node = {
              id: manageAPI.queryRandomStr(32), //获取随机数
              table_name: tableName, //业务表名
              main_value: tools.queryUrlString("id"), //表主键值
              business_data_id: tools.queryUrlString("id"), //业务具体数据主键值
              business_code: "000000000", //业务编号
              process_name: "自由流程审批", //流程名称
              employee: userInfo["username"],
              process_station: "自由流程审批",
              process_audit: "000000000",
              proponents: userInfo["username"],
              approve_user: userInfo["username"],
              action: "发起",
              action_opinion: "发起自由流程",
              content: this.curRow["content"],
              operate_time: ctime,
              create_time: ctime,
              business_data: JSON.stringify(freeWFNode)
            };

            //发起节点，审批信息，写入审批历史表中
            const startFreeNode = JSON.parse(JSON.stringify(node));

            //获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
            var firstWflowUser =
              tools.deNull(wfUsers) == ""
                ? tools.deNull(approver)
                : tools.deNull(wfUsers).split(",")[0];

            //提交审批相关处理信息
            node = {
              id: manageAPI.queryRandomStr(32), //获取随机数
              table_name: tableName, //业务表名
              main_value: tools.queryUrlString("id"), //表主键值
              business_data_id: tools.queryUrlString("id"), //业务具体数据主键值
              business_code: "000000000", //业务编号
              process_name: "自由流程审批", //流程名称
              employee: firstWflowUser,
              process_station: "自由流程审批",
              process_audit: "000000000",
              proponents: userInfo["username"],
              content: this.curRow["content"],
              operate_time: ctime,
              create_time: ctime,
              business_data: JSON.stringify(node)
            };

            //保存审批相关处理信息
            const nextWflowNode = JSON.parse(JSON.stringify(node));

            //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
            let vflag = await manageAPI.queryApprovalExist(
              tableName,
              this.curRow["id"]
            );

            if (vflag) {
              //数据库中已经存在此记录，提示用户无法提交审批
              this.$confirm_({
                title: "温馨提示",
                content: "待审记录中，已经存在此记录，无法再次提交审批！"
              });

              //刷新页面数据
              this.loadData();

              //操作完毕，返回结果
              return true;
            } else {
              //处理自由流程发起提交审批操作
              await workflowAPI.postWorkflowFree(
                tableName,
                this.curRow,
                freeWFNode,
                startFreeNode,
                nextWflowNode,
                "2"
              );

              console.log(" 提交审批返回结果: " + JSON.stringify(result));

              //弹出审批完成提示框 //this.$confirm("提交自由流程审批成功！", "操作成功", {type: "success"});
              this.$confirm_({
                title: "操作成功",
                content: "提交自由流程审批成功！",
                onOk: () => {
                  console.log("提交自由流程审批成功！");
                }
              });

              //设置为view预览模式
              this.pageType = "view";

              //刷新页面数据
              this.loadData();

              //操作完毕，返回结果
              return true;
            }
          }

          //提交知会信息确认
          if (tools.deNull(nfUsers) != "" && this.pageType == "notifying") {
            //获取当前表单信息
            let curRow = await manageAPI.queryTableData(
              tableName,
              tools.queryUrlString("id")
            );

            //检查此业务ID对应最近一个小时的知会信息，一个业务ID最多知会3次
            let loginfo = await manageAPI.queryPRLogInfTotal(
              tools.queryUrlString("id")
            );

            //如果当前流程状态没有审批通过，则无法发送知会信息
            if (curRow["bpm_status"] != 4 && curRow["bpm_status"] != 5) {
              this.$confirm_({
                title: "温馨提示",
                content: "此表单业务尚未审批通过，无法进行知会操作！"
              });
              return true;
            }

            //同一业务数据，每天最多知会3次
            if (tools.deNull(loginfo) != "" && loginfo.today >= 3) {
              this.$confirm_({
                title: "温馨提示",
                content: "同一业务数据，每天最多知会3次！"
              });
              return true;
            }

            //同一业务数据，总计最多知会10次
            if (tools.deNull(loginfo) != "" && loginfo.total >= 10) {
              this.$confirm_({
                title: "温馨提示",
                content: "同一业务数据，总计最多知会10次！"
              });
              return true;
            }

            //提交审批相关处理信息
            var pnode = {
              id: manageAPI.queryRandomStr(32), //获取随机数
              table_name: tableName, //业务表名
              main_value: tools.queryUrlString("id"), //表主键值
              business_data_id: tools.queryUrlString("id"), //业务具体数据主键值
              business_code: "000000001", //业务编号
              process_name: "自由流程知会", //流程名称
              employee: tools.deNull(nfUsers),
              process_station: "自由流程知会",
              process_audit: "000000001",
              operate_time: ctime,
              create_time: ctime,
              proponents: userInfo["username"],
              content: this.curRow["content"],
              business_data: JSON.stringify(this.curRow)
            };

            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await manageAPI.postProcessLogInformed(pnode);

            //显示提示信息 //this.$confirm("知会操作成功！", "操作成功", { type: "success" });
            this.$confirm_({
              title: "操作成功",
              content: "知会操作成功！",
              onOk: () => {
                console.log("知会操作成功！");
              }
            });

            //设置为view预览模式
            this.pageType = "view";

            //刷新页面数据
            this.loadData();

            //返回操作结果
            return true;
          }

          console.log("确认提交此自由流程！");
        }
      });
    }
  }
};
</script>
<style scoped>
.abcdefg .ant-card-body {
  margin-left: 0%;
  margin-right: 0%;
  margin-bottom: 1%;
  border: 0px solid black;
  min-width: 800px;
}
.explain {
  text-align: left;
  margin-left: 50px;
}
.explain .ant-input,
.sign .ant-input {
  font-weight: bolder;
  text-align: center;
  border-left-width: 0px !important;
  border-top-width: 0px !important;
  border-right-width: 0px !important;
}
.explain div {
  margin-bottom: 10px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.fileshow {
  display: block;
}
.filenone {
  display: none;
}
figure {
  float: left;
  margin-right: 10px;
}
.pswp__caption__center {
  text-align: center;
  max-width: 420px;
  margin: 0 auto;
  font-size: 13px;
  padding: 10px;
  line-height: 20px;
  color: #ccc;
}
</style>