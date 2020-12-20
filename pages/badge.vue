<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="6" md="8">
      <v-card outlined>
        <v-card-title>{{ $t("badge") }}</v-card-title>
        <v-card-text> {{ $t("badge desc") }}</v-card-text>
        <v-card-text>
          <v-img contain :src="url"> </v-img>
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
                :label="$t('style')"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="project"
                hide-details
                dense
                outlined
                :placeholder="$t('all')"
                :append-icon="showProject ? 'mdi-eye' : 'mdi-eye-off'"
                :label="$t('project')"
                @click:append="showProject = !showProject"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="recentMS"
                hide-details
                :placeholder="$t('all')"
                dense
                outlined
                :suffix="$t('day')"
                :label="$t('time range')"
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
      showProject: false,
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
      }%26showProject=${this.showProject}`;
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
