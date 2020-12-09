<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="3" class="text-center">
      <v-card>
        <v-card-title class="text-center"> 获取Token </v-card-title>
        <v-card-text>
          <v-form>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="token"
                  label="Token"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" width="500">
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                <v-icon left>mdi-refresh</v-icon> 刷新Token
              </v-btn>
            </template>

            <v-card>
              <v-card-title> 更新Token </v-card-title>

              <v-card-text>
                如果你发现Token被泄露，则可以在此更新自己的Token。
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="updateToken">
                  <v-icon left>mdi-refresh</v-icon> I Know
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
import { getToken } from "~/middleware/utils/getToken";
export default Vue.extend({
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
