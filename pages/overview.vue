<template>
  <v-row>
    <v-col class="title" cols="12">
      {{ $store.state.user.name }}
      <br />
      <div v-if="dates" class="text--secondary">
        {{ dates[0] }} ~ {{ dates[dates.length - 1] }}
      </div>
    </v-col>
    <v-col v-if="dates" cols="12" class="title">
      <v-card>
        <v-card-text>
          <v-row no-gutters class="align-center">
            <v-col cols="auto">
              <v-icon class="mr-5" large>mdi-clock-outline</v-icon>
            </v-col>
            <v-col>
              {{ $t("total code time") }}:
              {{ getDuration(totalCodeTime) }}
              <br />
              {{ $t("daily average") }}:
              {{ getDuration(totalCodeTime / dates.length) }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="languageInfo" cols="12" md="4">
      <v-card>
        <v-card-text>
          <v-row no-gutters class="align-center">
            <v-col cols="auto">
              <v-icon class="mr-5" large>mdi-code-braces</v-icon>
            </v-col>
            <v-col>
              {{ $t("most language") }}: {{ languageInfo[0][0] }}
              <br />
              {{ $t("total time") }}: {{ getDuration(languageInfo[0][1]) }}
              <br />
              {{ $t("usage rate") }}:
              {{
                (
                  (languageInfo[0][1] /
                    languageInfo.reduce((p, c) => (p += c[1]), 0)) *
                  100
                ).toFixed(2)
              }}%
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="editorInfo" cols="12" md="4">
      <v-card>
        <v-card-text>
          <v-row no-gutters class="align-center">
            <v-col cols="auto">
              <v-icon class="mr-5" large>mdi-pencil-outline</v-icon>
            </v-col>
            <v-col>
              {{ $t("most editor") }}: {{ editorInfo[0][0] }}
              <br />
              {{ $t("total time") }}: {{ getDuration(editorInfo[0][1]) }}
              <br />
              {{ $t("usage rate") }}:
              {{
                (
                  (editorInfo[0][1] /
                    editorInfo.reduce((p, c) => (p += c[1]), 0)) *
                  100
                ).toFixed(2)
              }}%
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-if="platformInfo" cols="12" md="4">
      <v-card>
        <v-card-text>
          <v-row no-gutters class="align-center">
            <v-col cols="auto">
              <v-icon class="mr-5" large>mdi-linux</v-icon>
            </v-col>
            <v-col>
              {{ $t("most os") }}: {{ platformInfo[0][0] }}
              <br />
              {{ $t("total time") }}: {{ getDuration(platformInfo[0][1]) }}
              <br />
              {{ $t("usage rate") }}:
              {{
                (
                  (platformInfo[0][1] /
                    platformInfo.reduce((p, c) => (p += c[1]), 0)) *
                  100
                ).toFixed(2)
              }}%
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { getGMTTimeZone } from "@/middleware/utils/getGMTTimeZone";
import { getDuration } from "@/middleware/utils/getDuration";
export default {
  data() {
    return {
      editorInfo: undefined,
      platformInfo: undefined,
      languageInfo: undefined,
      totalCodeTime: undefined,
      dates: undefined,
    };
  },
  mounted() {
    this.$axios
      .$get(`/stats/language?tz=${encodeURIComponent(getGMTTimeZone())}`)
      .then((d) => {
        this.totalCodeTime = d.data.reduce((p, c) => {
          p += c.duration;
          return p;
        }, 0);
      });
    this.$axios
      .$get(`/stats/editor?byDay=1&tz=${encodeURIComponent(getGMTTimeZone())}`)
      .then((d) => {
        const sum = new Map();
        this.dates = [...Object.keys(d.data)];
        for (const day of Object.values(d.data)) {
          for (const item of day) {
            let base = sum.get(item.editor);
            if (!base) {
              base = 0;
            }
            sum.set(item.editor, base + item.duration);
          }
        }
        this.editorInfo = [...sum.entries()].sort((a, b) => b[1] - a[1]);
      });
    this.$axios
      .$get(
        `/stats/platform?byDay=1&tz=${encodeURIComponent(getGMTTimeZone())}`
      )
      .then((d) => {
        const sum = new Map();
        for (const day of Object.values(d.data)) {
          for (const item of day) {
            let base = sum.get(item.platform);
            if (!base) {
              base = 0;
            }
            sum.set(item.platform, base + item.duration);
          }
        }
        this.platformInfo = [...sum.entries()].sort((a, b) => b[1] - a[1]);
      });
    this.$axios
      .$get(
        `/stats/language?byDay=1&tz=${encodeURIComponent(getGMTTimeZone())}`
      )
      .then((d) => {
        const sum = new Map();
        for (const day of Object.values(d.data)) {
          for (const item of day) {
            let base = sum.get(item.language);
            if (!base) {
              base = 0;
            }
            sum.set(item.language, base + item.duration);
          }
        }
        this.languageInfo = [...sum.entries()].sort((a, b) => b[1] - a[1]);
      });
  },
  methods: { getDuration },
};
</script>
