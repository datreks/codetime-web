<template>
  <v-card-text ref="wapper">
    <div ref="chart" style="height: 300px"></div>
  </v-card-text>
</template>
<script lang="ts">
import * as echarts from "echarts";
import Vue from "vue";
export default Vue.extend({
  props: {
    options: {
      type: Object,
      default: {} as echarts.EChartsOption,
    },
  },
  data() {
    return {
      chart: {} as any,
      resizing: false,
      observer: {} as MutationObserver,
    };
  },
  watch: {
    options() {
      this.updateChart();
    },
  },
  mounted() {
    this.updateChart();
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    updateChart() {
      const dom = this.$refs.chart as HTMLElement;
      const chart = echarts.init(dom);
      chart.setOption(this.options);
      this.chart = chart;
      // 创建一个观察器实例并传入回调函数
      this.observer = new MutationObserver(() => {
        if (!this.resizing) {
          this.resizing = true;
          setTimeout(() => {
            this.chart.resize();
            chart.resize();
            this.resizing = false;
          }, 200);
        }
      });
      // 以上述配置开始观察目标节点
      this.observer.observe(document.querySelector("nav") as HTMLElement, {
        attributes: true,
      });
    },
  },
});
</script>
