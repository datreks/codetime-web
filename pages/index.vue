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
        <v-card-title>编程时间统计</v-card-title>
        <chart-card-content :options="codeTimeOption"> </chart-card-content>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ChartCardContent from "../components/ChartCardContent.vue";
import { getLangRadioOptions } from "../middleware/charts/getLangRadioOptions";
import { getCodeTimeOptions } from "../middleware/charts/getCodeTimeOptions";
export default Vue.extend({
  components: { ChartCardContent },
  data() {
    return {
      langRadioOptions: {},
      codeTimeOption: {},
    };
  },
  mounted() {
    this.langRadioOptions = getLangRadioOptions([
      { name: "TypeScript", value: 1212 },
      { name: "Golang", value: 2323 },
      { name: "C++", value: 1919 },
    ]);
    this.codeTimeOption = getCodeTimeOptions([
      { date: "2020-12-01", value: 45 },
      { date: "2020-12-02", value: 43 },
      { date: "2020-12-03", value: 155 },
      { date: "2020-12-04", value: 64 },
      { date: "2020-12-05", value: 77 },
      { date: "2020-12-06", value: 12 },
      { date: "2020-12-07", value: 64 },
      { date: "2020-12-08", value: 77 },
      { date: "2020-12-09", value: 12 },
      { date: "2020-12-10", value: 64 },
      { date: "2020-12-11", value: 77 },
      { date: "2020-12-12", value: 12 },
    ]);
  },
});
</script>
