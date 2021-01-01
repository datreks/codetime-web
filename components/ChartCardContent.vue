<template>
  <v-card-text>
    <v-fade-transition ref="wapper" group>
      <div key="chart" ref="chart" :style="`height: ${height}px`"></div>
      <v-overlay
        v-if="!loaded && user.logined"
        key="overlay"
        :opacity="0"
        absolute
      >
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-fade-transition>
  </v-card-text>
</template>
<script lang="ts">
import * as echarts from "echarts";
import { mapState } from "vuex";
import Vue from "vue";
export default Vue.extend({
  props: {
    options: {
      type: Object,
      default: {} as echarts.EChartsOption,
    },
    height: {
      type: Number,
      default: 250,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loaded: false,
      chart: {} as any,
      resizing: false,
      observer: {} as MutationObserver,
    };
  },
  computed: {
    ...mapState(["user"]),
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
      this.loaded = true;
      this.observer = new MutationObserver(() => {
        if (!this.resizing) {
          this.resizing = true;
          setTimeout(() => {
            this.chart.resize();
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
