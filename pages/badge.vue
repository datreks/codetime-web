<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="6" md="8">
      <v-card outlined>
        <v-card-title>徽章</v-card-title>
        <v-card-text>
          <v-img :src="url">
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card-text>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <clip-text-field :value="html" label="HTML"></clip-text-field>
            </v-col>
            <v-col cols="12">
              <clip-text-field
                :value="markdown"
                label="Markdown"
              ></clip-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                v-model="style"
                dense
                hide-details
                outlined
                :items="[
                  'flat',
                  'social',
                  'flat-square',
                  'for-the-badge',
                  'plastic',
                ]"
                label="样式"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="project"
                hide-details
                dense
                outlined
                placeholder="所有"
                label="项目"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="recentMS"
                hide-details
                placeholder="所有"
                dense
                outlined
                suffix="天"
                label="时间范围"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      style: "flat",
      project: "",
      recentMS: "",
      loading: true,
    };
  },
  computed: {
    ...mapState(["user"]),
    color() {
      if (this.style !== "social") {
        return "white";
      } else {
        return "dark";
      }
    },
    url() {
      return `https://img.shields.io/endpoint?style=${
        this.style
      }&url=https://codetime-api.datreks.com/badge/${this.user.id}?logoColor=${
        this.color
      }%26project=${this.project}%26recentMS=${
        Number(this.recentMS) * 86400000
      }`;
    },
    html() {
      return `<img alt="Code Time" src="${this.url}" />`;
    },
    markdown() {
      return `![Code Time](${this.url})`;
    },
  },
};
</script>
