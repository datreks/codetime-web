<template>
  <v-row dense>
    <v-col col="12">
      <v-card outlined>
        <v-card-title>
          {{ $route.params.name }}
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-row dense>
        <v-col cols="3">
          <v-card outlined>
            <chart-card-content
              :options="languageRadioOptions"
            ></chart-card-content>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card outlined>
            <chart-card-content :options="codeTimeOptions"></chart-card-content>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-data-table
          :headers="[
            { text: $t('file'), value: 'relativeFile' },
            { text: $t('duration'), value: 'duration' },
          ]"
          :items="relativeFile"
          :items-per-page="50"
        >
          <template #[`item.duration`]="{ item }">
            {{ getDuration(item.duration) }}
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getDuration } from "@/middleware/utils/getDuration";
import { getLangRadioOptions } from "@/middleware/charts/getLangRadioOptions";
import { getCodeTimeOptions } from "@/middleware/charts/getCodeTimeOptions";
import ChartCardContent from "~/components/ChartCardContent.vue";
export default {
  components: { ChartCardContent },
  data() {
    return {
      projectList: [],
      by: "relativeFile",
      tz: "%2B08%3A00",
      timeFormat: "%25Y-%25m-%25d",
      relativeFile: [],
      codeTimeOptions: {},
      languageRadioOptions: {},
    };
  },

  mounted() {
    this.$axios
      .$get(
        `/stats?by=relativeFile&tz=${this.tz}&timeFormat=${this.timeFormat}&project=${this.$route.params.name}`
      )
      .then((d) => {
        this.relativeFile = d.data;
      });
    this.$axios
      .$get(
        `/stats?by=language&tz=${this.tz}&timeFormat=${this.timeFormat}&project=${this.$route.params.name}`
      )
      .then((d) => {
        this.languageRadioOptions = getLangRadioOptions(d.data);
      });
    this.$axios
      .$get(
        `/stats?by=time&tz=${this.tz}&timeFormat=${this.timeFormat}&project=${this.$route.params.name}`
      )
      .then((d) => {
        this.codeTimeOptions = getCodeTimeOptions(d.data);
      });
  },
  methods: {
    getDuration,
  },
};
</script>
