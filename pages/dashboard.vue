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
import { getGMTTimeZone } from "../middleware/utils/getGMTTimeZone";
export default Vue.extend({
  components: { ChartCardContent },
  data() {
    return {
      langRadioOptions: {},
      codeTimeOption: {},
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
        this.codeTimeOption = getCodeTimeOptions(d.data);
      });
  },
});
</script>