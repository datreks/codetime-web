<template>
  <v-row class="text-center" align="center" justify="center">
    <v-col cols="12">
      <div>
        <v-img
          style="display: inline-block"
          height="256px"
          width="256px"
          src="/icon.png"
        ></v-img>
      </div>
    </v-col>
    <v-col cols="12" lg="6" md="8">
      <div class="headline">Code Time</div>
      <div class="caption text--secondary">Made By si9ma & Jannchie</div>
      <div class="text--secondary font-italic mt-2">
        "Code Time" is an application for programmers. We conduct log collection
        and real-time analysis of user data and provide the most detailed report
        and the most beautiful interface to help programmers understand their
        programming history. We hope that users will be more passionate about
        programming with this application and contribute to the community.
      </div>
      <v-row align="center" justify="center">
        <v-col lg="auto" cols="12">
          <v-btn
            large
            primary
            :href="`https://codetime.si9ma.com/login/github`"
          >
            <v-icon left>mdi-github</v-icon>
            Login with Github
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  methods: {},
});
</script>
