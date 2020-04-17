<template>
  <a-card :bordered="false" :class="{abcdefg: true}">
    <div class="no-print" style="text-align: right">
      <a-button v-print="'#printContent'" ghost type="primary" @click="handlePrint">打印</a-button>
      <a-button ghost type="primary" @click="handleQRcode" style="margin-left:10px;">打码</a-button>
      <a-button ghost type="primary" @click="handleShort" style="margin-left:10px;">短链</a-button>
    </div>
    <section ref="print" id="printContent" class="abcdefg">
      <div style="text-align: center">
        <p
          style="font-size: 24px;font-weight: 800;margin-bottom:10px;margin-top:15px;margin-bottom:35px;"
        >{{ formName }}</p>
      </div>
      <!--签字-->
      <a-col :md="24" :sm="24">
        <div class="sign" style="text-align: left;height: inherit;margin-left:35px;">
          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="typeof curRow.no != 'undefined' && curRow.no != null"
          >
            <span style="float:left;display:block;">{{ tableInfo.no }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.no"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="
              typeof curRow.file_name != 'undefined' && curRow.file_name != null
            "
          >
            <span style="float:left;display:block;">{{ curRow.fileNameTitle }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.file_name"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="
              typeof curRow.task_title != 'undefined' && curRow.task_title != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.task_title }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.task_title"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px;margin-bottom:10px;"
            v-if="
              typeof curRow.plan_title != 'undefined' && curRow.plan_title != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.plan_title }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.plan_title"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.sigillum_name != 'undefined' &&
                curRow.sigillum_name != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.sigillum_name }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.sigillum_name"
            ></div>
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span>{{ tableInfo.create_by }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.create_by" />
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span style="margin-left: 0%">{{ tableInfo.create_time }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.create_time" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.depart_name != 'undefined' &&
                curRow.depart_name != null
            "
          >
            <span>{{ tableInfo.depart_name }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.depart_name" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.pid != 'undefined' &&
                curRow.pid != null
            "
          >
            <span>{{ tableInfo.pid }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.pid" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.task_exector != 'undefined' &&
                curRow.task_exector != null
            "
          >
            <span>{{ tableInfo.task_exector }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.task_exector" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.employee != 'undefined' &&
                curRow.employee != null
            "
          >
            <span>{{ tableInfo.employee }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.employee" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.work_date != 'undefined' &&
                curRow.work_date != null && curRow.work_date != '--'
            "
          >
            <span>{{ tableInfo.work_date }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.work_date" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.report_date != 'undefined' &&
                curRow.report_date != null && curRow.report_date != '--'
            "
          >
            <span>{{ tableInfo.report_date }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.report_date" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.report_leader != 'undefined' &&
                curRow.report_leader != null
            "
          >
            <span>{{ tableInfo.report_leader }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.report_leader" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.leave_type_name != 'undefined' &&
                curRow.leave_type_name != null
            "
          >
            <span style="margin-left: 0%">{{ curRow.formTypeName }}类型:</span>
            <a-input style="width: 70%" readonly v-model="curRow.leave_type_name" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.announce_type != 'undefined' &&
                curRow.announce_type != null
            "
          >
            <span style="margin-left: 0%">{{ tableInfo.announce_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.announce_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.title != 'undefined' &&
                curRow.title != null
            "
          >
            <span style="margin-left: 0%">{{ tableInfo.title }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.title" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.employee_rank != 'undefined' &&
                tableInfo.employee_rank != null
            "
          >
            <a-col :span="12">
              <span>{{ tableInfo.employee_rank }}:</span>
              <a-input style="width: 70%" readonly v-model="curRow.employee_rank" />
            </a-col>
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.starttime != 'undefined' &&
                tableInfo.starttime != null
            "
          >
            <span>{{ tableInfo.starttime }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.starttime" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.endtime != 'undefined' &&
                tableInfo.endtime != null
            "
          >
            <span style="margin-left: 0%">{{ tableInfo.endtime }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.endtime" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.total_days != 'undefined' &&
                tableInfo.total_days != null
            "
          >
            <span>{{ tableInfo.total_days }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.total_days" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.seal_copies != 'undefined' &&
                tableInfo.seal_copies != null
            "
          >
            <span>{{ tableInfo.seal_copies }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.seal_copies" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.declare_type != 'undefined' &&
                tableInfo.declare_type != null
            "
          >
            <span>{{ tableInfo.declare_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.declare_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.status != 'undefined' &&
                tableInfo.status != null
            "
          >
            <span>{{ tableInfo.status }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.status" />
          </a-col>

          <a-col :span="12" style="margin-top: 10px; margin-bottom:10px;">
            <span style="margin-left: 0%">{{ tableInfo.bpm_status }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.bpm_status_name" />
          </a-col>
          <a-col :span="24"></a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.seal_name != 'undefined' && curRow.seal_name != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.seal_name }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.seal_name"
            ></div>
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.employee_post != 'undefined' &&
                tableInfo.employee_post != null &&
                typeof curRow.employee_post != 'undefined' &&
                curRow.employee_post != null
            "
          >
            <span style="margin-left:28px;">{{ tableInfo.employee_post }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.employee_post" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.traffic_models != 'undefined' &&
                tableInfo.traffic_models != null &&
                typeof curRow.traffic_models != 'undefined' &&
                curRow.traffic_models != null
            "
          >
            <span style="margin-left:28px;">{{ tableInfo.traffic_models }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.traffic_models" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.licence_number != 'undefined' &&
                tableInfo.licence_number != null &&
                typeof curRow.licence_number != 'undefined' &&
                curRow.licence_number != null
            "
          >
            <span style="margin-left:14px;">{{ tableInfo.licence_number }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.licence_number" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.traffic_amount != 'undefined' &&
                tableInfo.traffic_amount != null &&
                typeof curRow.traffic_amount != 'undefined' &&
                curRow.traffic_amount != null
            "
          >
            <span style="margin-left:28px;">{{ tableInfo.traffic_amount.padStart(4, ' ') }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.traffic_amount" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.purchase_type != 'undefined' &&
                curRow.purchase_type != null
            "
          >
            <span>{{ tableInfo.purchase_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.purchase_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.purchase_date != 'undefined' &&
                curRow.purchase_date != null && curRow.purchase_date != '--'
            "
          >
            <span>{{ tableInfo.purchase_date }}:</span>
            <a-input style="width: 62%" readonly v-model="curRow.purchase_date" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.apply_date != 'undefined' &&
                curRow.apply_date != null && curRow.apply_date != '--'
            "
          >
            <span>{{ tableInfo.apply_date }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.apply_date" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.seal_type != 'undefined' &&
                curRow.seal_type != null
            "
          >
            <span>{{ tableInfo.seal_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.seal_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.file_name != 'undefined' &&
                curRow.file_name != null
            "
          >
            <span>{{ tableInfo.file_name }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.file_name" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.file_count != 'undefined' &&
                curRow.file_count != null
            "
          >
            <span>{{ tableInfo.file_count }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.file_count" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.start_time != 'undefined' &&
                curRow.start_time != null && curRow.start_time != '--'
            "
          >
            <span>{{ tableInfo.start_time }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.start_time" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.end_time != 'undefined' &&
                curRow.end_time != null && curRow.end_time != '--'
            "
          >
            <span>{{ tableInfo.end_time }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.end_time" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.real_start_time != 'undefined' &&
                curRow.real_start_time != null && curRow.real_start_time != '--'
            "
          >
            <span>{{ tableInfo.real_start_time }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.real_start_time" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.real_end_time != 'undefined' &&
                curRow.real_end_time != null && curRow.real_end_time != '--'
            "
          >
            <span>{{ tableInfo.real_end_time }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.real_end_time" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 20px;margin-bottom: 10px;"
            v-if="
              typeof curRow.content != 'undefined' && curRow.content != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.content }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.content"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.entourage != 'undefined' &&
                tableInfo.entourage != null &&
                typeof curRow.entourage != 'undefined' &&
                curRow.entourage != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.entourage }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.entourage"
            ></div>
          </a-col>

          <a-col
            :span="12"
            style="margin-top:10px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.travel_address != 'undefined' &&
                tableInfo.travel_address != null
            "
          >
            <span>{{ tableInfo.travel_address }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.travel_address" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top:10px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.predict_fee != 'undefined' &&
                tableInfo.predict_fee != null
            "
          >
            <span>{{ tableInfo.predict_fee }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.predict_fee" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.drive_type != 'undefined' &&
                tableInfo.drive_type != null
            "
          >
            <span>{{ tableInfo.drive_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.drive_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.predict_mileage != 'undefined' &&
                tableInfo.predict_mileage != null
            "
          >
            <span>{{ tableInfo.predict_mileage }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.predict_mileage" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof tableInfo.travel_transport != 'undefined' &&
                tableInfo.travel_transport != null
            "
          >
            <span>{{ tableInfo.travel_transport }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.travel_transport" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.reserve_money != 'undefined' &&
                curRow.reserve_money != null
            "
          >
            <span>{{ tableInfo.reserve_money }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.reserve_money" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.reserve_chinese != 'undefined' &&
                curRow.reserve_chinese != null
            "
          >
            <span>{{ tableInfo.pay_back_date }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.reserve_chinese" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.pay_back_date != 'undefined' &&
                curRow.pay_back_date != null && curRow.pay_back_date != '--'
            "
          >
            <span>{{ tableInfo.pay_back_date }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.pay_back_date" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.money != 'undefined' &&
                curRow.money != null
            "
          >
            <span>{{ tableInfo.money }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.money" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.pay_type != 'undefined' &&
                curRow.pay_type != null
            "
          >
            <span>{{ tableInfo.pay_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.pay_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.pay_date != 'undefined' &&
                curRow.pay_date != null && curRow.pay_date != '--'
            "
          >
            <span>{{ tableInfo.pay_date }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.pay_date" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.join_users != 'undefined' &&
                curRow.join_users != null && curRow.join_users != '--'
            "
          >
            <span>{{ tableInfo.join_users }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.join_users" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.mireanna_type != 'undefined' &&
                tableInfo.mireanna_type != null &&
                typeof curRow.mireanna_type != 'undefined' &&
                curRow.mireanna_type != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.mireanna_type }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.mireanna_type"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.receive_name != 'undefined' &&
                curRow.receive_name != null
            "
          >
            <span>{{ tableInfo.receive_name }}:</span>
            <a-input
              style="text-align:left;padding-left:2%;width:82%;"
              readonly
              v-model="curRow.receive_name"
            />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.bank_name != 'undefined' &&
                curRow.bank_name != null
            "
          >
            <span>{{ tableInfo.bank_name }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.bank_name" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.bank_card != 'undefined' &&
                curRow.bank_card != null
            "
          >
            <span>{{ tableInfo.bank_card }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.bank_card" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.traffic_standards != 'undefined' &&
                tableInfo.traffic_standards != null &&
                typeof curRow.traffic_standards != 'undefined' &&
                curRow.traffic_standards != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.traffic_standards }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.traffic_standards"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.traffic_numbers != 'undefined' &&
                tableInfo.traffic_numbers != null &&
                typeof curRow.traffic_numbers != 'undefined' &&
                curRow.traffic_numbers != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.traffic_numbers }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.traffic_numbers"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.travel_remarks != 'undefined' &&
                tableInfo.travel_remarks != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.travel_remarks }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.travel_remarks"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 30px"
            v-if="
              typeof curRow.location != 'undefined' && curRow.location != null
            "
          >
            <span style="float:left;display:block;">{{ curRow.formTypeName }}地址:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.location"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-bottom:10px;margin-top:10px;"
            v-if="
              typeof curRow.announce_content != 'undefined' &&
                curRow.announce_content != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.announce_content }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.announce_content"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-bottom:10px;margin-top:10px;"
            v-if="
              typeof curRow.plan_content != 'undefined' &&
                curRow.plan_content != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.plan_content }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.plan_content"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-bottom:10px;margin-top:20px;"
            v-if="
              typeof curRow.reserve_content != 'undefined' &&
                curRow.reserve_content != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.reserve_content }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.reserve_content"
            ></div>
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.reim_type != 'undefined' &&
                curRow.reim_type != null
            "
          >
            <span>{{ tableInfo.reim_type }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.reim_type" />
          </a-col>

          <a-col
            :span="12"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.reim_total != 'undefined' &&
                curRow.reim_total != null
            "
          >
            <span>{{ tableInfo.reim_total }}:</span>
            <a-input style="width: 70%" readonly v-model="curRow.reim_total" />
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 10px; margin-bottom:10px;"
            v-if="
              typeof curRow.reim_remark != 'undefined' &&
                curRow.reim_remark != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.reim_remark }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.reim_remark"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 20px;margin-bottom:10px;"
            v-if="
              typeof curRow.task_content != 'undefined' && curRow.task_content != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.task_content }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.task_content"
            ></div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top: 20px; margin-bottom:10px;"
            v-if="
              typeof curRow.remark != 'undefined' &&
                curRow.remark != null
            "
          >
            <span style="float:left;display:block;">{{ tableInfo.remark }}:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 1px solid #cecece;padding-left:20px;"
              v-html="curRow.remark"
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
            v-if="
              this.curRow != null &&
                this.curRow.fileStatus != 1 &&
                this.pageType != 'print' &&
                this.curRow.fileType.includes('office')
            "
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
                :class="[this.curRow.fileStatus != 1 ? 'fileshow' : 'filenone']"
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
                  v-for="(item, index) in curRow.officeList"
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
                      >{{ item.name }}</span>
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
            v-if="
              this.curRow.fileStatus != 1 &&
                this.pageType != 'print' &&
                this.curRow.fileType.includes('image')
            "
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
                :class="[this.curRow.fileStatus != 1 ? 'fileshow' : 'filenone']"
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
            v-if="curRow.bpm_status != 1 || workflows.length > 0"
          >
            <div style="width:98%;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:10px;margin-bottom:20px;"
            v-if="
              (curRow.bpm_status != 1 || workflows.length > 0) &&
                pageType != 'print'
            "
          >
            <div style="margin-bottom:20px;">流程进度</div>
            <template>
              <a-steps style="width:80%;margin-bottom:10px;">
                <a-step :status="wflowstatus.start.status" title="发起" :description="startusers">
                  <a-icon type="user" slot="icon" />
                </a-step>
                <a-step :status="wflowstatus.audit.status" title="审核" :description="auditusers">
                  <a-icon type="solution" slot="icon" />
                </a-step>
                <a-step :status="wflowstatus.approve.status" title="审批" :description="approveusers">
                  <a-icon type="audit" slot="icon" />
                </a-step>
                <a-step :status="wflowstatus.message.status" title="知会" :description="messageusers">
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
            v-if="curRow.bpm_status != 1 || workflows.length > 0"
          >
            <div style="margin-bottom:20px;">审批流程</div>
            <template>
              <a-timeline>
                <div v-for="(item, index) in workflows" :key="index">
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
                      twoToneColor="#cecece"
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
                    {{ item.content }}
                  </a-timeline-item>
                </div>
              </a-timeline>
            </template>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:20px;margin-bottom:10px;"
            v-if="
              typeof tableInfo.traffic_numbers != 'undefined' &&
                tableInfo.traffic_numbers != null
            "
          >
            <span style="float:left;display:block;">注:</span>
            <div
              style="float:left; width:88%; display:block; border-bottom: 0px solid #cecece;padding-left:20px;"
            >
              <p>1. 此表批准后原件由综合部存档，复印件交财务部。</p>
              <p>
                2.
                此表批准日期在15号（含15号）以前则从当月开始享有车辆补贴，在15号以后则从下月开始享有。
              </p>
              <p>
                3.
                驾驶证、行驶证和身份证的复印件是该表的必备附件，驾驶证必须是申请人本人证件，行驶证与驾驶证户名不一致，需另附行驶证所有人的身份证复印件及关系证明、书面说明。
              </p>
            </div>
          </a-col>

          <a-col
            :span="24"
            style="margin-top:30px;"
            v-if="pageType == 'workflow' && curRow.bpm_status == 2"
          >
            <template>
              <a-form :form="form">
                <a-form-item label="加签用户" style="width: 500px">
                  <j-select-multi-user v-model="wflowAddUsers"></j-select-multi-user>
                </a-form-item>

                <div style="width:500px;" v-if="wflowAddData != null && wflowAddData.length > 0">
                  <a-table :columns="wflowcolumns" :dataSource="wflowAddData" :pagination="false"></a-table>
                </div>
              </a-form>

              <a-form :form="form">
                <a-form-item label="会签用户" style="width: 500px;margin-top:20px;">
                  <j-select-multi-user v-model="wflowNotifyUsers"></j-select-multi-user>
                </a-form-item>

                <div
                  style="width:500px;"
                  v-if="wflowNotifyData != null && wflowNotifyData.length > 0"
                >
                  <a-table
                    :columns="wflowcolumns"
                    :dataSource="wflowNotifyData"
                    :pagination="false"
                  ></a-table>
                </div>
              </a-form>
            </template>

            <div
              style="float:left; width:88%; display:block; border-bottom: 0px solid #cecece;padding-left:0px;margin-top:30px;margin-bottom:30px;"
            >
              <p>注意：不能同时选择会签用户和加签用户！</p>
              <p style="margin-top:10px;">
                1.
                选择加签用户后，流程会在此审核节点走完后，立即转入加签用户节点进行处理，加签节点处理完毕后，转入原流程。
              </p>
              <p style="margin-top:10px;">
                2.
                选择会签用户后，流程会在此审核节点走完前，立即转入会签用户节点进行处理，加签节点处理完毕后，再次转入当前审核节点，继续原流程。
              </p>
            </div>

            <div style="width:98%;margin-top:50px;margin-bottom:30px;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
          </a-col>

          <!-- 暂时不支持，审批节点的加签、会签功能 -->
          <a-col
            :span="24"
            style="margin-top:30px;"
            v-if="pageType == 'workflow' && curRow.bpm_status == 1000"
          >
            <template>
              <a-form :form="form">
                <a-form-item label="会签用户" style="width: 500px;margin-top:20px;">
                  <j-select-multi-user v-model="wflowNotifyUsers"></j-select-multi-user>
                </a-form-item>

                <div
                  style="width:500px;"
                  v-if="wflowNotifyData != null && wflowNotifyData.length > 0"
                >
                  <a-table
                    :columns="wflowcolumns"
                    :dataSource="wflowNotifyData"
                    :pagination="false"
                  ></a-table>
                </div>
              </a-form>
            </template>

            <div
              style="float:left; width:88%; display:block; border-bottom: 0px solid #cecece;padding-left:0px;margin-top:30px;margin-bottom:30px;"
            >
              <p>注意：选择会签用户后，流程会在此审核节点走完前，立即转入会签用户节点进行处理，加签节点处理完毕后，再次转入当前审核节点，继续原流程。</p>
            </div>

            <div style="width:98%;margin-top:50px;margin-bottom:30px;">
              <a-divider style="width:98%;" dashed>·</a-divider>
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

                <div style="width:500px;" v-if="notifyData != null && notifyData.length > 0">
                  <a-table :columns="wflowcolumns" :dataSource="notifyData" :pagination="false"></a-table>
                </div>
              </a-form>
            </template>
            <template>
              <div style="width:88%;margin-top:15px;">
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

                <div style="width:500px;" v-if="notifyData != null && notifyData.length > 0">
                  <a-table :columns="wflowcolumns" :dataSource="notifyData" :pagination="false"></a-table>
                </div>
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
                  :autosize="{minRows: 2, maxRows: 10}"
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
                  :autosize="{minRows: 2, maxRows: 10}"
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

          <a-col :span="24" style="margin-top:30px;">
            <div style="width:98%;margin-top:50px;margin-bottom:30px;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>
            <template>
              <div v-for="(item, index) in replaylist" :key="index">
                <a-comment>
                  <template slot="actions">
                    <span key="comment-basic-like">
                      <a-tooltip title="Like">
                        <a-icon
                          type="like"
                          :theme="action === 'liked' ? 'filled' : 'outlined'"
                          @click="handleLikeComment(item.id)"
                        />
                      </a-tooltip>
                      <span style="padding-left: '8px';cursor: 'auto'">{{item.likes}}</span>
                    </span>
                    <span key="comment-basic-dislike">
                      <a-tooltip title="Dislike">
                        <a-icon
                          type="dislike"
                          :theme="action === 'disliked' ? 'filled' : 'outlined'"
                          @click="handleDislikeComment(item.id)"
                        />
                      </a-tooltip>
                      <span style="padding-left: '8px';cursor: 'auto'">{{item.dislikes}}</span>
                    </span>
                    <span
                      key="comment-basic-reply-to"
                      @click="handleReplayComments(item.id , item.create_by)"
                    >回复</span>
                    <span
                      key="comment-basic-reply-to"
                      @click="handleDeleteComments(item.id , item.create_by)"
                      v-if="userInfo.username == item.create_by"
                    >删除</span>
                  </template>
                  <a slot="author">{{item.create_by}}</a>
                  <a-avatar :src="item.avatar" :alt="item.create_by" slot="avatar" />
                  <p slot="content">{{item.content}}</p>
                  <div v-for="(subitem, subindex) in item.replay" :key="subindex">
                    <a-comment>
                      <template slot="actions">
                        <span key="comment-basic-like">
                          <a-tooltip title="Like">
                            <a-icon
                              type="like"
                              :theme="action === 'liked' ? 'filled' : 'outlined'"
                              @click="handleLikeSubComment(item.id , subitem.id)"
                            />
                          </a-tooltip>
                          <span style="padding-left: '8px';cursor: 'auto'">{{subitem.likes}}</span>
                        </span>
                        <span key="comment-basic-dislike">
                          <a-tooltip title="Dislike">
                            <a-icon
                              type="dislike"
                              :theme="action === 'disliked' ? 'filled' : 'outlined'"
                              @click="handleDislikeSubComment(item.id , subitem.id )"
                            />
                          </a-tooltip>
                          <span style="padding-left: '8px';cursor: 'auto'">{{subitem.dislikes}}</span>
                        </span>
                        <span
                          key="comment-basic-reply-to"
                          @click="handleDeleteSubComment(item.id , subitem.id , subitem.create_by)"
                          v-if="userInfo.username == subitem.create_by"
                        >删除</span>
                      </template>
                      <a slot="author">{{subitem.create_by}}</a>
                      <a-avatar :src="subitem.avatar" :alt="subitem.create_by" slot="avatar" />
                      <p slot="content">{{subitem.content}}</p>
                      <a-tooltip slot="datetime" :title="subitem.create_time">
                        <span>{{subitem.create_time}}</span>
                      </a-tooltip>
                    </a-comment>
                  </div>
                  <a-tooltip slot="datetime" :title="item.create_time">
                    <span>{{item.create_time}}</span>
                  </a-tooltip>
                </a-comment>
              </div>
            </template>

            <div style="width:98%;margin-top:50px;margin-bottom:30px;">
              <a-divider style="width:98%;" dashed>·</a-divider>
            </div>

            <div>
              <a-col :span="24" v-if="commentFlag == 'yes'">
                <div style="float:left;width:50px;">
                  <a-avatar
                    style="float:left;text-align:left;"
                    :src="avatar"
                    :alt="userInfo.realname"
                    slot="avatar"
                  />
                </div>
                <div style="float:left;width:50%;height:50px;">
                  <a-textarea
                    :span="22"
                    style="float:left;text-align:left;"
                    v-model="replayvalue"
                    placeholder="写下你的评论..."
                    allowClear
                    :autoSize="{ minRows: 4, maxRows: 10 }"
                  />
                </div>
                <div style="width:50%;margin-left:50px;margin-top:10px;">
                  <div style="float:right;margin-top:10px;">
                    <a-button
                      type="primary"
                      @click="handleWriteComment()"
                      style="margin-left:10px;font-size:12px;"
                      size="small"
                    >发布</a-button>
                    <a-button
                      color="gray"
                      type="primary"
                      @click="handleCancelComment()"
                      style="margin-left:10px;background:pink;border: 1px solid pink;font-size:12px;"
                      size="small"
                    >取消</a-button>
                  </div>
                </div>
              </a-col>
            </div>
          </a-col>

          <a-modal
            title="温馨提示"
            :visible="tipVisible"
            @ok="tipHandleOk"
            :confirmLoading="tipConfirmLoading"
            @cancel="tipHandleCancel"
          >
            <p>{{ tipContent }}</p>
          </a-modal>

          <el-dialog title="二维码分享" :visible.sync="qrcodeVisible" width="30%">
            <div style="text-align:center;">
              <qrcode :value="qrcodeUrl" :options="{width: 200}" style="text-align:center;"></qrcode>
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

        <template>
          <div>
            <!-- 向上箭头 -->
            <a-back-top />
          </div>
        </template>
      </a-col>
    </section>
  </a-card>
</template>

<script>
//import Vue from "vue";
import * as manageAPI from "@/api/manage";
import * as workflowAPI from "@/api/workflow";
import * as storage from "@/utils/storage";
import * as tools from "@/utils/util";
//import * as _ from "underscore";
//import * as $ from "jquery";
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import ATextarea from "ant-design-vue/es/input/TextArea";
import JSelectMultiUser from "@/components/jeecgbiz/JSelectMultiUser";
import VueQrcode from "@chenfengyuan/vue-qrcode";

//Vue挂载QRCode组件
try {
  Vue.component(VueQrcode.name, VueQrcode);
} catch (error) {
  console.error(error);
}

//默认预览图片
const images = [];
//审核、审批、知会列表columns
const wfcolumns = `[{"title":"序号","dataIndex":"no","key":"no"},{"title":"中文","dataIndex":"name","key":"name"},{"title":"英文","dataIndex":"nickname","key":"nickname"}]`;

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
      user: "",
      avatar: "",
      columns: [],
      data: [],
      loading: false,
      refreshInterval: [1000, 2000, 3000],
      formName: "流程申请单",
      curRow: {},
      depart: {},
      fileinfo: "",
      workflows: [],
      pageType: "view",
      tableName: "",
      wflowUsers: "",
      wflowAddUsers: "",
      wflowNotifyUsers: "",
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
      wflowcolumns: JSON.parse(wfcolumns),
      auditData: [],
      approveData: [],
      notifyData: [],
      wflowAddData: [],
      wflowNotifyData: [],
      wfreeNode: "",
      startusers: "",
      auditusers: "",
      approveusers: "",
      messageusers: "",
      replayvalue: "",
      replaylist: [],
      replayid: "",
      commentFlag: "yes"
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    //查询用户数据，将数据缓存到浏览器缓存
    await manageAPI.queryUserName();

    //获取用户信息
    this.userInfo = storage.getStore("cur_user");

    //设置员工岗位信息/部门信息
    try {
      this.v_user = await manageAPI.queryUserInfoByView(this.userInfo.username);

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
  },

  async mounted() {
    //业务编码
    var bussinessCodeID = tools.queryUrlString("id");
    //查询当前节点信息
    var that = await manageAPI.watchFormLeave(this);
    //获取返回结果
    var result = await manageAPI.colorProcessDetail(that, this);
    //加载流程节点信息
    var wfnode = await this.loadWorkflowNode();
    //检查是否含有多个自由流程信息，将历史自由流程信息，转入自由流程历史表中
    var wftransfer = await this.transferFreeWorkflow();
    //自由流程节点
    var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);
    //查询评论信息
    this.replaylist = await manageAPI.queryCurReplayList(bussinessCodeID);
    //打印加载的流程节点信息、自由流程处理信息、page类型
    console.log(
      `wfnode : ${wfnode}  wftransfer : ${wftransfer} wfreeNode : ${wfreeNode} pageType : ${this.pageType} curRow.bpm_status : ${this.curRow.bpm_status} `
    );
    //返回结果
    return result;
  },

  //Vue动态监控区域
  watch: {
    async $route() {
      //业务编码
      var bussinessCodeID = tools.queryUrlString("id");
      //查询当前节点信息
      let that = await manageAPI.watchFormLeave(this);
      //获取返回结果
      let result = await manageAPI.colorProcessDetail(that, this);
      //加载流程节点信息
      let wfnode = await this.loadWorkflowNode();
      //检查是否含有多个自由流程信息，将历史自由流程信息，转入自由流程历史表中
      let wftransfer = await this.transferFreeWorkflow();
      //自由流程节点
      var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);
      //查询评论信息
      this.replaylist = await manageAPI.queryCurReplayList(bussinessCodeID);
      //打印加载的流程节点信息、自由流程处理信息、page类型
      console.log(
        `wfnode : ${wfnode}  wftransfer : ${wftransfer} wfreeNode : ${wfreeNode} pageType : ${this.pageType} curRow.bpm_status : ${this.curRow.bpm_status} `
      );
      //返回结果
      return result;
    },
    async wflowAddUsers(users) {
      var userlist = await manageAPI.queryUserName();
      var ulist = users.split(",");
      this.wflowAddData = [];
      window.__.each(ulist, (item, index) => {
        //查询用户信息
        var user = window.__.find(userlist, user => {
          return user.username == item;
        });
        this.wflowAddData.push({
          no: index + 1,
          name: user.realname,
          nickname: user.username
        });
      });
      console.log("加签用户列表：" + users);
    },
    async wflowNotifyUsers(users) {
      var userlist = await manageAPI.queryUserName();
      var ulist = users.split(",");
      this.wflowNotifyData = [];
      window.__.each(ulist, (item, index) => {
        //查询用户信息
        var user = window.__.find(userlist, user => {
          return user.username == item;
        });
        this.wflowNotifyData.push({
          no: index + 1,
          name: user.realname,
          nickname: user.username
        });
      });
      console.log("会签用户列表：" + users);
    },
    async wflowUsers(users) {
      var userlist = await manageAPI.queryUserName();
      var ulist = users.split(",");
      this.auditData = [];
      window.__.each(ulist, (item, index) => {
        //查询用户信息
        var user = window.__.find(userlist, user => {
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
      window.__.each(ulist, (item, index) => {
        //查询用户信息
        var user = window.__.find(userlist, user => {
          return user.username == item;
        });
        this.approveData.push({
          no: index + 1,
          name: user.realname,
          nickname: user.username
        });
      });
      console.log("审批用户列表：" + users);
    },
    async notifyUsers(users) {
      var userlist = await manageAPI.queryUserName();
      var ulist = users.split(",");
      this.notifyData = [];
      window.__.each(ulist, (item, index) => {
        //查询用户信息
        var user = window.__.find(userlist, user => {
          return user.username == item;
        });
        this.notifyData.push({
          no: index + 1,
          name: user.realname,
          nickname: user.username
        });
      });
      console.log("知会用户列表：" + users);
    }
  },
  //Vue方法定义区域
  methods: {
    /**
     * @function 加载数据函数
     */
    async loadData() {
      //业务编码
      var bussinessCodeID = tools.queryUrlString("id");
      //查询当前节点信息
      var that = await manageAPI.watchFormLeave(this);
      //获取返回结果
      var result = await manageAPI.colorProcessDetail(that, this);
      //加载流程节点信息
      var wfnode = await this.loadWorkflowNode();
      //检查是否含有多个自由流程信息，将历史自由流程信息，转入自由流程历史表中
      var wftransfer = await this.transferFreeWorkflow();
      //自由流程节点
      var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);
      //查询评论信息
      this.replaylist = await manageAPI.queryCurReplayList(bussinessCodeID);
      //打印加载的流程节点信息、自由流程处理信息、page类型
      console.log(
        `wfnode : ${wfnode}  wftransfer : ${wftransfer} wfreeNode : ${wfreeNode} pageType : ${this.pageType} curRow.bpm_status : ${this.curRow.bpm_status} `
      );
      //返回结果
      return result;
    },

    /**
     * @function 执行自由流程转入历史操作
     */
    async transferFreeWorkflow() {
      //执行自由流程转历史操作
      let result = await workflowAPI.transFreeWflowHis(this.curRow.id);
      //返回结果
      return result;
    },

    /**
     * @function 加载流程信息
     */
    async loadWorkflowNode() {
      //查询用户信息
      var userlist = await manageAPI.queryUserName();
      //获取当前流程的节点信息
      var node = await manageAPI.queryWorkflowNode(this.curRow.id);

      //如果本表单没有获取当历史自由流程记录，则从本业务类别中获取曾经的历史自由流程
      try {
        if (
          typeof node == "undefined" ||
          node == null ||
          node == "" ||
          Object.keys(node).length == 0
        ) {
          //获取表单名称
          var tableName = tools.queryUrlString("table_name");
          //获取当前用户
          var userInfo = storage.getStore("cur_user");

          //获取历史自由流程节点
          node = await manageAPI.queryWorkflowNodeByUser(
            tableName,
            userInfo["username"]
          );
        }
      } catch (error) {
        console.log(error);
      }

      //如果任然没有流程信息，则直接退出
      if (
        typeof node == "undefined" ||
        node == null ||
        node == "" ||
        Object.keys(node).length == 0
      ) {
        return false;
      }

      var startInfo = window.__.find(userlist, user => {
        return user.username == node.start;
      });

      //设置start节点信息
      try {
        startInfo = JSON.parse(JSON.stringify(startInfo));
      } catch (error) {
        console.log(error);
      }

      var approveInfo = window.__.find(userlist, user => {
        return user.username == node.approve;
      });

      //设置approve节点信息
      try {
        approveInfo = JSON.parse(JSON.stringify(approveInfo));
      } catch (error) {
        console.log(error);
      }

      try {
        //如果当前处理节点为审批节点，则审批节点添加处理中标识
        if (approveInfo.username == node.operate) {
          approveInfo.realname = "🏁" + approveInfo.realname + "(处理中)";
        }
      } catch (error) {
        console.error(error);
      }

      try {
        var ulist = node.audit.split(",");
        var auditInfo = { realname: "" };

        //去除‘undefined’数组对象
        ulist = ulist.filter(item => {
          return item != "undefined";
        });

        //去除‘undefined’字符串
        node.audit = ulist.toString();

        window.__.each(ulist, item => {
          try {
            //查询用户信息
            var user = window.__.find(userlist, user => {
              return user.username == item;
            });
            if (item == node.operate) {
              auditInfo.realname =
                auditInfo.realname + "->🏁" + user.realname + "(处理中)";
            } else {
              auditInfo.realname = auditInfo.realname + "->" + user.realname;
            }
          } catch (error) {
            console.log(error);
          }
        });

        try {
          //如果是逗号开头，则去掉第一个字符
          if (auditInfo.realname.startsWith("->")) {
            auditInfo.realname = auditInfo.realname.substring(2);
          }
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        var nlist = node.notify.split(",");
        var notifyInfo = { realname: "" };

        //去除‘undefined’数组对象
        nlist = nlist.filter(item => {
          return item != "undefined";
        });

        //去除‘undefined’字符串
        node.notify = nlist.toString();

        window.__.each(nlist, item => {
          try {
            //查询用户信息
            var user = window.__.find(userlist, user => {
              return user.username == item;
            });
            notifyInfo.realname = notifyInfo.realname + "," + user.realname;
          } catch (error) {
            console.log(error);
          }
        });

        //如果是逗号开头，则去掉第一个字符
        if (notifyInfo.realname.trim().startsWith(",")) {
          notifyInfo.realname = notifyInfo.realname.trim().substring(1);
        }
      } catch (error) {
        console.log(error);
      }

      //设置流程节点信息
      if (node.start != null && node.start != "") {
        this.startusers = `发起: ${startInfo.realname}`;
      }
      if (node.audit != null && node.audit != "") {
        this.auditusers = `审核: ${auditInfo.realname}`;
        this.wflowUsers = node.audit;
      }
      if (node.approve != null && node.approve != "") {
        this.approveusers = `审批: ${approveInfo.realname}`;
        this.approveUser = node.approve;
      }
      if (node.notify != null && node.notify != "") {
        this.messageusers = `知会：${notifyInfo.realname}`;
        this.notifyUsers = node.notify;
      }
      //设置发起、审核、审批、知会节点的width
      setTimeout(() => {
        var width = $(".ant-steps-item").width() - 10;
        $(".ant-steps-item-description").css("max-width", width + "px");
        $(".ant-steps-item-description").css("margin-left", "-30px");
        $(".ant-steps-item-description").css("font-size", "12px");
      }, 255);
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

      var originNode = storage.getStore(encode);

      //如果获取的短链随机码有误，则清空缓存
      if (!tools.isNull(originNode) && originNode.code.includes("undefined")) {
        originNode = "";
        storage.clearStore(encode);
      }

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
      let random = manageAPI.queryRandom(4);

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
      storage.setStore(encode, JSON.stringify(node));

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
      //查询业务编号
      var bussinessCodeID = tools.queryUrlString("id");

      //设置this的别名
      var that = this;

      //会签、加签用户
      var wflowSpecUser = that.wflowAddUsers + "," + that.wflowNotifyUsers;

      //查询自由流程节点
      var wfreeNode = await manageAPI.queryCurFreeWorkflow(bussinessCodeID);

      //如果加签、会签同时选择，则无法提交
      if (
        tools.deNull(that.wflowAddUsers) != "" &&
        tools.deNull(that.wflowNotifyUsers) != ""
      ) {
        that.$message.warning(
          "无法同时进行加签及会签操作，请单独选择加签用户或会签用户！"
        );
        return false;
      }

      //如果会签、加签用户以逗号开头，则去掉开头的逗号
      wflowSpecUser = wflowSpecUser.startsWith(",")
        ? wflowSpecUser.substring(1)
        : wflowSpecUser;

      //如果会签、加签用户以逗号结尾，则去掉结尾的逗号
      wflowSpecUser = wflowSpecUser.endsWith(",")
        ? wflowSpecUser.substring(0, wflowSpecUser.length - 1)
        : wflowSpecUser;

      console.log("会签/加签用户 : " + wflowSpecUser);

      //加签会签选中的用户，不能是流程中已经存在的用户
      var readyUser = tools.contain(
        wfreeNode.audit_node + "," + wfreeNode.approve_node,
        wflowSpecUser
      );

      //如果用户流程中已经存在，则提示无法选择
      if (!tools.isNull(readyUser)) {
        //将英文名转化为中文名
        readyUser = await manageAPI.patchEnameCname(readyUser);

        //提示错误信息
        that.$message.warning(
          `加签/会签用户，不能选择审批流程中已经存在的用户(${readyUser})!`
        );
        return false;
      }

      //确认提交此自由流程
      this.$confirm_({
        title: "确认操作",
        content: "是否确认提交此自由流程?",
        onOk: async () => {
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
          //自由流程节点
          var freeNode = null;

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
          window.__.each(node, function(item) {
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
                //获取自由流程配置，当前审核节点
                curAuditor = curRow["employee"];

                try {
                  //自由流程配置消息
                  freeNode = JSON.parse(curRow.business_data);
                } catch (error) {
                  console.log(error);
                }

                //检查是否存在自由流程节点audit_node & approve_node & notify_node , 如果不存在，在下级节点中寻找
                if (
                  !("audit_node" in freeNode) &&
                  !("approve_node" in freeNode) &&
                  !("notify_node" in freeNode)
                ) {
                  try {
                    freeNode = JSON.parse(freeNode.business_data);
                  } catch (error) {
                    console.log(error);
                  }
                }

                //如果仍然未获取到自由流程节点，则从自由流程表中找
                var freeNodeBack = await manageAPI.queryCurFreeWorkflow(
                  bussinessCodeID
                );

                //如果从数据库中查询出，自由流程数据，则替换数据
                if (tools.deNull(freeNodeBack) != "") {
                  freeNode = freeNodeBack;
                }

                console.log("free node back data : " + freeNodeBack);

                //将加签、会签数据、添加到自由流程数据中
                freeNode.audit_node = `,${freeNode.audit_node},`;
                if (
                  freeNode.audit_node.indexOf("," + curAuditor + ",") !=
                  freeNode.audit_node.lastIndexOf("," + curAuditor + ",")
                ) {
                  //判断是否存在重复人员，如果存在重复人员，则去掉一个重复人员
                  freeNode.audit_node = freeNode.audit_node.replace(
                    "," + curAuditor + ",",
                    ","
                  );
                }

                //添加加签用户数据
                if (tools.deNull(that.wflowAddUsers) != "") {
                  freeNode.audit_node = freeNode.audit_node.replace(
                    `,${curAuditor},`,
                    `,${curAuditor},${that.wflowAddUsers},`
                  );
                }

                //添加会签用户数据
                if (tools.deNull(that.wflowNotifyUsers) != "") {
                  freeNode.audit_node = freeNode.audit_node.replace(
                    `,${curAuditor},`,
                    `,${curAuditor},${that.wflowNotifyUsers},${curAuditor},`
                  );
                }

                //去掉开头、结尾的逗号
                if (freeNode.audit_node.startsWith(",")) {
                  freeNode.audit_node = freeNode.audit_node.substring(1);
                }

                //去掉开头、结尾的逗号
                if (freeNode.audit_node.endsWith(",")) {
                  freeNode.audit_node = freeNode.audit_node.substring(
                    0,
                    freeNode.audit_node.length - 1
                  );
                }

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
              } catch (error) {
                that.tipVisible = true;
                that.tipContent = "自由流程设置节点失败，无法进行审批操作！";
                console.log("自由流程设置节点失败 :" + error);
                return false;
              }
            }

            //当不存在加签、会签操作时，则进行重复用户消除操作
            if (
              !(
                tools.deNull(that.wflowAddUsers) != "" ||
                tools.deNull(that.wflowNotifyUsers) != ""
              )
            ) {
              //判断是否存在重复人员，如果存在重复人员，则去掉一个重复人员
              if (
                allAudit.indexOf("," + curAuditor + ",") !=
                allAudit.lastIndexOf("," + curAuditor + ",")
              ) {
                allAudit = allAudit.replace("," + curAuditor + ",", ",");
              }
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
                bpmStatus,
                freeNode,
                that.wflowAddUsers,
                that.wflowNotifyUsers,
                curAuditor
              );

              //如果是计划任务，则需要生成分配任务数据，并写入数据库中
              await this.handleTaskItem();

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
              var vflag = await manageAPI.queryApprovalLength(
                tableName,
                curRow["business_data_id"]
              );

              if (vflag == 0) {
                //数据库中已经存在此记录，提示用户无法提交审批
                that.tipContent = `处理异常，请稍后重试；如果多次处理异常，可能需要撤销当前审批，重新发起审批流程！异常流程数据[status:${vflag}]`;
              } else {
                //执行事务处理
                let operationData = {
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
                  other_data: ""
                };

                //执行审批业务
                await workflowAPI.postWorkflowApprove(
                  tableName,
                  curRow,
                  operationData,
                  pnode,
                  prLogHisNode,
                  bpmStatus,
                  freeNode,
                  that.wflowAddUsers,
                  that.wflowNotifyUsers,
                  curAuditor
                );

                //提示信息 //console.log(" 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result) );
                that.tipContent = "同意审批成功，审批流程已推向后续处理人！";

                console.log("operationData : " + operationData);
              }
            }
          }
          //提示用户撤销审批操作成功
          that.tipVisible = true;

          //刷新页面数据
          manageAPI.setTimeouts(() => {
            this.loadData();
          }, ...this.refreshInterval);

          //设置为view预览模式
          this.pageType = "view";

          //同意审批成功
          return result;
        }
      });
    },
    /**
     * @function 生成任务记录数据
     */
    async handleTaskItem(result = "") {
      //打印表单名称
      var tableName = tools.queryUrlString("table_name");

      //获取当前时间戳
      var timestamp = new Date().getTime();

      //如果是计划任务表，则生成任务数据
      if (tableName == "bs_plan_task") {
        //遍历数据，执行持久化操作
        for (var item of this.data) {
          //删除字段
          delete item.no;
          delete item.real_start_time;
          delete item.real_end_time;
          delete item.date;
          delete item.work_date;
          //设置创建日期
          item.create_time = tools.formatDate(timestamp, "yyyy-MM-dd");
          //设置所属部门
          item.depart_name = this.curRow.depart_name;
          //设置任务状态
          item.status = "待提交";
          //生成数据，并持久化
          result = await manageAPI.postTableData("bs_plan_task_mission", item);
        }
      }

      //返回执行结果
      return result;
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
          window.__.each(node, function(item) {
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
          manageAPI.setTimeouts(() => {
            this.loadData();
          }, ...this.refreshInterval);

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
          }

          that.tipVisible = true;
          that.tipContent = "知会确认成功！";

          //设置为view预览模式
          this.pageType = "view";

          //刷新页面数据
          manageAPI.setTimeouts(() => {
            this.loadData();
          }, ...this.refreshInterval);

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

      //获取当前表单表名
      var curTableName = tools.queryUrlString("table_name");

      //获取当前表单编号
      var curItemID = tools.queryUrlString("id");

      //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
      let vflag = await manageAPI.queryApprovalExist(curTableName, curItemID);

      if (vflag) {
        //数据库中已经存在此记录，提示用户无法提交审批
        this.$confirm_({
          title: "温馨提示",
          content: "待审记录中，已经存在此记录，无法再次提交审批！"
        });

        //刷新页面数据
        manageAPI.setTimeouts(() => {
          this.loadData();
        }, ...this.refreshInterval);

        //操作完毕，返回结果
        return true;
      }

      vflag = storage.getStore(
        `start_free_process_@table_name#${curTableName}@id#${curItemID}`
      );

      if (vflag == "true") {
        //数据库中已经存在此记录，提示用户无法提交审批
        this.$confirm_({
          title: "温馨提示",
          content: "此表单才提交过申请，请稍后再提交申请！"
        });

        //刷新页面数据
        manageAPI.setTimeouts(() => {
          this.loadData();
        }, ...this.refreshInterval);

        //操作完毕，返回结果
        return true;
      }

      //如果是计划任务表，则检查任务分配人员是否存在，如果不存在，则提示错误
      if (curTableName == "bs_plan_task") {
        var realname = "";

        //遍历任务数组，找出分配对象是否存在
        for (let item of this.data) {
          let username = await manageAPI.patchCnameEname(item.create_by);

          if (tools.isNull(username)) {
            realname = item.create_by;
            break;
          }
        }

        if (!tools.isNull(realname)) {
          //数据库中已经存在此记录，提示用户无法提交审批
          this.$confirm_({
            title: "温馨提示",
            content: `计划任务中，分配责任人: ${realname} 不存在系统中，请修改后在提交审批！`
          });
          return false;
        }

        realname = "";

        //遍历任务数组，找出执行人员是否存在
        for (let item of this.data) {
          if (tools.isNull(item.task_exector)) {
            continue;
          }

          let username = await manageAPI.patchCnameEname(item.task_exector);

          if (tools.isNull(username)) {
            realname = item.task_exector;
            break;
          }
        }

        if (!tools.isNull(realname)) {
          //数据库中已经存在此记录，提示用户无法提交审批
          this.$confirm_({
            title: "温馨提示",
            content: `计划任务中，执行人员: ${realname} 不存在系统中，请修改后在提交审批！`
          });
          return false;
        }
      }

      //如果是计划任务完成表，则必须坚持完成状态的填写，完成情况的填写，完成日期的填写
      if (curTableName == "bs_plan_task_mission") {
        //未填写完成状态，提示用户无法提交审批
        if (this.curRow.status != "已完成") {
          this.$confirm_({
            title: "温馨提示",
            content: `计划任务完成情况表，必须在完成状态为’已完成‘时，才可以提交审批！`
          });
          return false;
        }

        //未填写完成情况说明，提示用户无法提交审批
        if (tools.isNull(this.curRow.remark)) {
          this.$confirm_({
            title: "温馨提示",
            content: `计划任务完成情况表，未填写’完成情况‘说明，无法提交审批！`
          });
          return false;
        }
      }

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
              content:
                this.curRow["content"] ||
                this.curRow["title"] ||
                this.curRow["plan_title"] ||
                this.curRow["task_title"],
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
              content:
                this.curRow["content"] ||
                this.curRow["title"] ||
                this.curRow["plan_title"] ||
                this.curRow["task_title"],
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
              manageAPI.setTimeouts(() => {
                this.loadData();
              }, ...this.refreshInterval);

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

              //记录当前流程已经提交，短时间内无法再次提交
              storage.setStore(
                `start_free_process_@table_name#${curTableName}@id#${curItemID}`,
                "true",
                60
              );

              //设置为view预览模式
              this.pageType = "view";

              //刷新页面数据
              manageAPI.setTimeouts(() => {
                this.loadData();
              }, ...this.refreshInterval);

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

            let countinfo = await manageAPI.queryTableDataByField(
              "v_handling_events",
              "id",
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

            //同一业务数据，同时只能知会一次，本次知会确认完毕后，可以再次知会
            if (tools.deNull(countinfo) != "" && countinfo.length >= 1) {
              this.$confirm_({
                title: "温馨提示",
                content: "此表单业务已进行了知会操作，请不要重复提交!"
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
              content:
                this.curRow["content"] ||
                this.curRow["title"] ||
                this.curRow["plan_title"] ||
                this.curRow["task_title"],
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
            manageAPI.setTimeouts(() => {
              this.loadData();
            }, ...this.refreshInterval);

            //返回操作结果
            return true;
          }

          console.log("确认提交此自由流程！");
        }
      });
    },

    /**
     * @function 发布评论
     */
    async handleWriteComment() {
      //获取数据编号
      var id = tools.isNull(this.curRow.id)
        ? tools.queryUrlString("id")
        : this.curRow.id;

      if (tools.isNull(this.replayid)) {
        //定义评论对象
        let node = {
          id: tools.queryUniqueID(),
          create_by: this.userInfo.username,
          create_time: tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
          content: `${this.replayvalue} `,
          table_name: this.tableName,
          main_key: id,
          avatar: this.avatar
        };

        //清除评论内容
        this.replayvalue = "";

        //提示评论成功
        this.$message.warning("评论成功！");

        //提交评论信息
        await manageAPI.postTableData(
          "bs_comments",
          JSON.parse(JSON.stringify(node))
        );

        //刷新页面数据
        this.loadData();
      } else {
        //先查询出相应评论数据
        let node = await manageAPI.queryTableData("bs_comments", this.replayid);

        //定义回复评论
        var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

        //将回复评论加入数组
        replay.push({
          id: tools.queryUniqueID(),
          create_by: this.userInfo.username,
          create_time: tools.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
          content: `${this.replayvalue} `,
          table_name: this.tableName,
          avatar: this.avatar
        });

        //新增回复评论
        var replaynode = {
          id: this.replayid,
          replay: JSON.stringify(replay)
        };

        //清除评论内容
        this.replayvalue = "";

        //提交评论信息
        await manageAPI.patchTableData(
          "bs_comments",
          this.replayid,
          JSON.parse(JSON.stringify(replaynode))
        );

        //刷新页面数据
        manageAPI.setTimeouts(() => {
          this.loadData();
        }, ...this.refreshInterval);

        //提示点赞成功
        this.$message.warning("回复成功！");

        //回复评论后，删除回复ID
        this.replayid = "";
      }
    },

    async handleReplayComments(id, username) {
      //清除评论内容
      this.replayvalue = `@${username} `;
      //设置回复id
      this.replayid = id;
      //设置文本框获取焦点
      this.$nextTick(function() {
        try {
          this.$refs.input.focus();
          this.$refs.textarea.focus();
        } catch (error) {
          console.log(error);
        }
      });
    },

    /**
     * @function 给评论点赞
     */
    async handleLikeComment(id) {
      //先查询出相应评论数据
      var node = await manageAPI.queryTableData("bs_comments", id);

      //点赞数加1
      var likesNode = {
        id: id,
        likes: node.likes + 1
      };

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(likesNode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("点赞成功！");
    },

    /**
     * @function 给评论取消点赞
     */
    async handleDislikeComment(id) {
      //先查询出相应评论数据
      var node = await manageAPI.queryTableData("bs_comments", id);

      //点赞数加1
      var dislikesNode = {
        id: id,
        dislikes: node.dislikes + 1
      };

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(dislikesNode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("鄙视成功！");
    },

    /**
     * @function 删除上级评论
     */
    async handleDeleteComments(id, username) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      if (
        this.userInfo.username != username ||
        this.userInfo.username != node.create_by
      ) {
        //提示点赞成功
        this.$message.warning("无法删除他人评论！");
      } else {
        //清除评论内容
        this.replayvalue = "";

        //提交评论信息
        await manageAPI.deleteTableData("bs_comments", id);

        //刷新页面数据
        this.loadData();

        //提示点赞成功
        this.$message.warning("删除回复成功！");
      }
    },

    /**
     * @function 删除二级评论
     */
    async handleDeleteSubComment(id, subId) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      //定义回复评论
      var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

      //将回复评论加入数组
      replay = window.__.reject(replay, item => {
        return item.id == subId;
      });

      //新增回复评论
      var replaynode = {
        id: id,
        replay: JSON.stringify(replay)
      };

      //清除评论内容
      this.replayvalue = "";

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(replaynode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("删除评论成功！");

      //回复评论后，删除回复ID
      this.replayid = "";
    },

    /**
     * @function 二级评论点赞
     */
    async handleLikeSubComment(id, subId) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      //定义回复评论
      var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

      //将回复评论加入数组
      window.__.each(replay, item => {
        //设置点赞数
        if (item.id == subId) {
          //定义回复评论
          item.likes = tools.isNull(item.likes) ? 1 : item.likes + 1;
        }
      });

      //重新设置回复谢谢
      var likenode = {
        id: id,
        replay: JSON.stringify(replay)
      };

      //清除评论内容
      this.replayvalue = "";

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(likenode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("点赞成功！");
    },

    /**
     * @function 二级评论点鄙视
     */
    async handleDislikeSubComment(id, subId) {
      //先查询出相应评论数据
      let node = await manageAPI.queryTableData("bs_comments", id);

      //定义回复评论
      var replay = tools.isNull(node.replay) ? [] : JSON.parse(node.replay);

      //将回复评论加入数组
      window.__.each(replay, item => {
        //设置点赞数
        if (item.id == subId) {
          //定义回复评论
          item.dislikes = tools.isNull(item.dislikes) ? 1 : item.dislikes + 1;
        }
      });

      //重新设置回复信息
      var dislikenode = {
        id: id,
        replay: JSON.stringify(replay)
      };

      //清除评论内容
      this.replayvalue = "";

      //提交评论信息
      await manageAPI.patchTableData(
        "bs_comments",
        id,
        JSON.parse(JSON.stringify(dislikenode))
      );

      //刷新页面数据
      this.loadData();

      //提示点赞成功
      this.$message.warning("鄙视成功！");
    },

    /**
     * @function 取消发布评论信息
     */
    async handleCancelComment() {
      //清除评论内容
      this.replayvalue = "";

      //隐藏评论输入框
      this.commentFlag = "no";

      //提示评论成功
      this.$message.warning("取消评论！");
    }
  }
};
</script>
<style>
.ant-steps-item-description {
  max-width: 220px;
  white-space: normal;
}
</style>
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
.ant-steps-horizontal:not(.ant-steps-label-vertical)
  .ant-steps-item-description {
  max-width: 220px;
  white-space: normal;
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
