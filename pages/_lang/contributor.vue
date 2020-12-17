<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title> {{ $t("contributor") }} </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <github-card :user="datreks"></github-card>
    </v-col>
    <v-col cols="12" lg="6">
      <github-card :user="jannchie"></github-card>
    </v-col>
    <v-col cols="12" lg="6">
      <github-card :user="si9ma"></github-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import GithubCard from "@/components/GithubCard.vue";
export default Vue.extend({
  components: { GithubCard },
  data() {
    return {
      datreks: {} as any,
      jannchie: {} as any,
      si9ma: {} as any,
    };
  },
  mounted() {
    this.$axios.$get("https://api.github.com/users/jannchie").then((data) => {
      this.jannchie = data;
      this.jannchie.bio =
        "Contributed to the writing of the VSCode extension program and front-end data visualization display.";
    });
    this.$axios.$get("https://api.github.com/users/si9ma").then((data) => {
      this.si9ma = data;
      this.si9ma.bio =
        "Contributing to the writing of the Jetbrains IDE extension and server design and data mining.";
    });
    this.$axios.$get("https://api.github.com/users/datreks").then((data) => {
      this.datreks = data;
      this.datreks.bio =
        "An organization in the field of data analysis and mining.";
    });
  },
});
</script>
