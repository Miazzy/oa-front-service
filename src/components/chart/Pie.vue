<template>
  <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
    <v-tooltip :showTitle="false" data-key="item*percent" />
    <v-axis />
    <v-legend data-key="item" />
    <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
    <v-coord type="theta" />
  </v-chart>
</template>

<script>
const DataSet = require("@antv/data-set");

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 254
    },
    dataSource: {
      type: Array,
      default: () => [
        { item: "影响力", count: 40 },
        { item: "执行力", count: 21 },
        { item: "专业力", count: 17 },
        { item: "管理力", count: 13 },
        { item: "高效力", count: 9 },
        { item: "协作力", count: 30 }
      ]
    }
  },
  data() {
    return {
      scale: [
        {
          dataKey: "percent",
          min: 0,
          formatter: ".0%"
        }
      ],
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        "percent",
        {
          formatter: (val, item) => {
            return item.point.item + ": " + val;
          }
        }
      ]
    };
  },
  computed: {
    data() {
      let dv = new DataSet.View().source(this.dataSource);
      // 计算数据百分比
      dv.transform({
        type: "percent",
        field: "count",
        dimension: "item",
        as: "percent"
      });
      return dv.rows;
    }
  }
};
</script>