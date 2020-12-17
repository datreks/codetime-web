<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="4" md="6" class="text-center">
      <v-card outlined>
        <v-card-title class="text-center"> Token </v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{ $t("token desc") }} </v-card-text>
        <v-card-text>
          <v-form>
            <v-row no-gutters>
              <v-col cols="12">
                <clip-text-field label="Token" :value="token"></clip-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" width="500">
            <template #activator="{ on, attrs }">
              <v-btn color="error" outlined v-bind="attrs" v-on="on">
                <v-icon left>mdi-refresh</v-icon> {{ $t("refresh token") }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title> {{ $t("refresh token") }} </v-card-title>
              <v-card-text>
                {{ $t("refresh token desc 1") }}
                <br />
                {{ $t("refresh token desc 2") }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="updateToken">
                  <v-icon left>mdi-refresh</v-icon> {{ $t("refresh token") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import ClipTextField from "~/components/ClipTextField.vue";
import { getToken } from "~/middleware/utils/getToken";
export default Vue.extend({
  components: { ClipTextField },
  data() {
    return { token: "", dialog: false };
  },
  mounted() {
    this.token = getToken();
  },
  methods: {
    updateToken() {
      this.$axios.$get("/updateToken").then((d) => {
        this.token = d.data.token;
        localStorage.setItem("token", this.token);
        this.dialog = false;
      });
    },
  },
});
</script>
