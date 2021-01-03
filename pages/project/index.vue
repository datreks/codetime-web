<template>
  <v-row dense>
    <!-- <v-col cols="12">
      <v-autocomplete
        v-model="project"
        :items="projectList"
        outlined
        dense
        :label="$t('project')"
      ></v-autocomplete>
    </v-col> -->
    <v-col cols="12">
      <v-row dense>
        <v-col v-for="p in projects" :key="p.project" cols="12" md="4">
          <v-card :to="`/project/${p.project}`" outlined>
            <v-card-text>
              <div>{{ $t("project name") }}: {{ p.project }}</div>
              <div>{{ $t("total time") }}: {{ getDuration(p.duration) }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { getDuration } from "@/middleware/utils/getDuration";
export default {
  data() {
    return {
      projectList: [],
      projects: [],
      project: undefined,
      by: "relativeFile",
      tz: "%2B08%3A00",
      timeFormat: "%25Y-%25m-%25d+%25H",
      relativeFile: [],
    };
  },
  mounted() {
    this.$axios.$get(`/stats?by=project`).then((data) => {
      this.projectList = data.data
        .sort((a, b) => b.duration - a.duration)
        .map((d) => d.project);
      this.projects = data.data;
    });
  },
  methods: {
    getDuration,
  },
};
</script>
