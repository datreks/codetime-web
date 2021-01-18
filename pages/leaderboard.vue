<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>{{ $t("leaderboard") }}</v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>{{ $t("top 10") }}</v-card-title>
        <v-card-subtitle>{{ $t("only show not privacy") }}</v-card-subtitle>
        <v-data-table
          :loading="loading"
          :headers="[
            { text: $t('rank'), value: 'rank' },
            { text: $t('name'), value: 'name' },
            {
              text: $t('code time'),
              value: 'duration',
            },
          ]"
          :items="rankList"
        >
          <template #[`item.duration`]="{ item }">
            {{ getDuration(item["duration"]) }}
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getDuration } from "../middleware/utils/getDuration";
export default {
  data() {
    return { rankList: [], loading: true };
  },
  mounted() {
    this.$axios.$get(`/rank?ps=10&p=1`).then((d) => {
      this.rankList = d.data;
      this.rankList.forEach((v, i) => {
        v.rank = i + 1;
      });
      this.loading = false;
    });
  },
  methods: {
    getDuration,
  },
};
</script>
