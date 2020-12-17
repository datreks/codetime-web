<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-toolbar class="v-bar--underline" height="48px" flat>
        {{ $t("settings") }}
      </v-toolbar>
    </v-col>
    <v-col> </v-col>
    <v-col cols="12">
      <v-container>
        <div class="text--secondary">{{ $t("language") }}</div>
        <v-item-group v-model="language">
          <v-row dense>
            <v-col cols="6">
              <v-item v-slot="{ active, toggle }" value="zh">
                <v-btn
                  block
                  large
                  class="elevation-0"
                  :color="active ? 'primary' : ''"
                  @click="toggle"
                >
                  Chinese
                </v-btn>
              </v-item>
            </v-col>
            <v-col cols="6">
              <v-item v-slot="{ active, toggle }" value="en">
                <v-btn
                  block
                  class="elevation-0"
                  large
                  :color="active ? 'primary' : ''"
                  @click="toggle"
                >
                  English
                </v-btn>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
        <div class="text--secondary">{{ $t("theme") }}</div>
        <v-item-group v-model="theme">
          <v-row dense>
            <v-col cols="6">
              <v-item v-slot="{ active, toggle }" value="dark">
                <v-btn
                  block
                  large
                  class="elevation-0"
                  :color="active ? 'primary' : ''"
                  @click="toggle"
                >
                  Dark <v-icon right> mdi-weather-night </v-icon>
                </v-btn>
              </v-item>
            </v-col>
            <v-col cols="6">
              <v-item v-slot="{ active, toggle }" value="light">
                <v-btn
                  block
                  class="elevation-0"
                  large
                  :color="active ? 'primary' : ''"
                  @click="toggle"
                >
                  Light <v-icon right> mdi-lightbulb </v-icon>
                </v-btn>
              </v-item>
            </v-col>
            <v-col cols="6">
              <v-item v-slot="{ active, toggle }" value="auto">
                <v-btn
                  block
                  class="elevation-0"
                  large
                  :color="active ? 'primary' : ''"
                  @click="toggle"
                >
                  Auto <v-icon right> mdi-desktop-classic</v-icon>
                </v-btn>
              </v-item>
            </v-col>
            <v-col cols="6">
              <v-item v-slot="{ active, toggle }" value="mix">
                <v-btn
                  block
                  class="elevation-0"
                  large
                  :color="active ? 'primary' : ''"
                  @click="toggle"
                >
                  Mixed<v-icon right> mdi-theme-light-dark</v-icon>
                </v-btn>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-col>
    <v-divider></v-divider>
    <v-col>
      <v-container>
        <div class="text--secondary">{{ $t("privacy") }}</div>
        <v-row dense>
          <v-col cols="12">
            <v-switch inset :label="$t('open data')"></v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return { theme: "auto", language: "en" };
  },
  watch: {
    theme(val) {
      let isDark;
      if (
        val === "dark" ||
        (val === "auto" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        isDark = true;
      } else {
        isDark = false;
      }
      this.$vuetify.theme.dark = isDark;
      localStorage.setItem("theme", val);
    },
    language(val) {
      localStorage.setItem("language", val);
      this.$store.commit("lang/SET_LANG", val);
      this.$i18n.locale = val;
    },
  },
  mounted() {
    let lang = localStorage.getItem("language");
    if (!lang || lang === "undefined") lang = "en";
    this.language = lang;
    this.$store.commit("lang/SET_LANG", lang);
    this.theme = localStorage.getItem("theme");
    if (this.theme === "undefined") {
      this.theme = "auto";
    }
  },
};
</script>
