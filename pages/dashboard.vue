<template>
  <v-row>
    <v-col cols="12" lg="4">
      <v-card>
        <v-card-title>语言使用比例</v-card-title>
        <chart-card-content :options="langRadioOptions"></chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12" lg="8">
      <v-card>
        <v-card-title>编程时间统计 - 按日</v-card-title>
        <chart-card-content :options="codeTimeDayOption"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>编程时间统计 - 按小时</v-card-title>
        <chart-card-content :options="codeTimeHourOption"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title>语言用时统计</v-card-title>
        <chart-card-content :options="languageOptions"> </chart-card-content>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card>
        <v-card-title>编辑器/IDE用时统计</v-card-title>
        <chart-card-content :options="editorOptions"> </chart-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ChartCardContent from "../components/ChartCardContent.vue";
import { getLangRadioOptions } from "../middleware/charts/getLangRadioOptions";
import { getCodeTimeOptions } from "../middleware/charts/getCodeTimeOptions";
import { getGMTTimeZone } from "../middleware/utils/getGMTTimeZone";
import { getStackOptions } from "../middleware/charts/getStackOptions";
export default Vue.extend({
  components: { ChartCardContent },
  data() {
    return {
      langRadioOptions: {},
      codeTimeDayOption: {},
      codeTimeHourOption: {},
      editorOptions: {},
      languageOptions: {},
    };
  },
  mounted() {
    this.$axios.$get(`/stats/language`).then((d) => {
      this.langRadioOptions = getLangRadioOptions(d.data);
    });
    this.$axios
      .$post(`/stats/byTime`, {
        timeFormat: "%Y-%m-%d %H",
        tz: getGMTTimeZone(),
      })
      .then((d) => {
        this.codeTimeHourOption = getCodeTimeOptions(d.data);
      });
    this.$axios
      .$post(`/stats/byTime`, {
        timeFormat: "%Y-%m-%d",
        tz: getGMTTimeZone(),
      })
      .then((d) => {
        this.codeTimeDayOption = getCodeTimeOptions(d.data, "line");
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
