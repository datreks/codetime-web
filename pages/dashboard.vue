<template>
  <v-row>
    <v-scroll-x-transition>
      <v-alert
        v-if="empty"
        style="
          position: fixed;
          z-index: 2;
          margin-left: 24px;
          top: 64px;
          right: 24px;
        "
        prominent
        dense
        type="info"
        transition="scale-transition"
      >
        <v-row align="center">
          <v-col class="grow">
            未曾找到数据记录，请获取token并应用于插件。
          </v-col>
          <v-col class="shrink">
            <v-btn to="/account" text> 获取token </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-scroll-x-transition>
    <v-col cols="12" md="4">
      <v-card outlined>
        <v-card-title>语言使用比例</v-card-title>
        <chart-card-content :options="langRadioOptions"></chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <v-card outlined>
        <v-card-title>编程时间统计 - 按日</v-card-title>
        <chart-card-content :options="codeTimeDayOption"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>编程时间统计 - 按小时</v-card-title>
        <chart-card-content :options="codeTimeHourOption"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card outlined>
        <v-card-title>语言用时统计</v-card-title>
        <chart-card-content :options="languageOptions"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card outlined>
        <v-card-title>编辑器/IDE用时统计</v-card-title>
        <chart-card-content :options="editorOptions"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12" md="12">
      <v-card outlined>
        <v-card-title>编程日历</v-card-title>
        <chart-card-content
          id="calendar"
          :height="calendarHeight"
          :options="codeTimeDayCalendarOption"
        ></chart-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { EChartsOption } from "echarts";
import ChartCardContent from "../components/ChartCardContent.vue";
import { getLangRadioOptions } from "../middleware/charts/getLangRadioOptions";
import { getCodeTimeOptions } from "../middleware/charts/getCodeTimeOptions";
import { getCalendarOptions } from "../middleware/charts/getCalendarOptions";
import { getGMTTimeZone } from "../middleware/utils/getGMTTimeZone";
import { getStackOptions } from "../middleware/charts/getStackOptions";
export default Vue.extend({
  components: { ChartCardContent },
  data() {
    return {
      langRadioOptions: {} as EChartsOption,
      codeTimeDayOption: {} as EChartsOption,
      codeTimeHourOption: {} as EChartsOption,
      codeTimeDayCalendarOption: {} as EChartsOption,
      editorOptions: {} as EChartsOption,
      languageOptions: {} as EChartsOption,
      calendarHeight: 250,
      empty: false,
    };
  },
  mounted() {
    this.$axios.$get(`/stats/language`).then((d) => {
      if (d.data.length === 0) {
        this.empty = true;
      }
      this.langRadioOptions = getLangRadioOptions(d.data);
    });
    this.$axios
      .$post(`/stats/byTime`, {
        timeFormat: "%Y-%m-%d %H",
        tz: getGMTTimeZone(),
      })
      .then((d) => {
        d.data.forEach((d: any) => {
          if (d.duration > 3600 * 1000) {
            d.duration = 3600 * 1000;
          }
        });
        this.codeTimeHourOption = getCodeTimeOptions(d.data);
      });
    this.$axios
      .$post(`/stats/byTime`, {
        timeFormat: "%Y-%m-%d",
        tz: getGMTTimeZone(),
      })
      .then((d) => {
        this.codeTimeDayOption = getCodeTimeOptions(d.data, "line");
        const doc = document.querySelector("#calendar") as HTMLDivElement;
        const width = doc.offsetWidth - 32;
        this.calendarHeight = (width / 53) * 7 + 20;
        console.log(this.calendarHeight);
        this.codeTimeDayCalendarOption = getCalendarOptions(d.data, width);
      });
    this.$axios.$get(`/stats/editor?byDay=1`).then((d) => {
      this.editorOptions = getStackOptions(d, "editor");
    });
    this.$axios.$get(`/stats/language?byDay=1`).then((d) => {
      this.languageOptions = getStackOptions(d, "language");
    });
  },
});
</script>
