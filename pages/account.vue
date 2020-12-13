<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="4" md="6" class="text-center">
      <v-card>
        <v-card-title class="text-center"> Token </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          你可以在这里获取token，token可以用于编辑器插件的配置，从而识别用户并记录用户的编码操作。
        </v-card-text>
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
                <v-icon left>mdi-refresh</v-icon> 刷新Token
              </v-btn>
            </template>
            <v-card>
              <v-card-title> 更新Token </v-card-title>
              <v-card-text>
                如果你发现Token被泄露，则可以在此更新自己的Token。
              </v-card-text>
              <v-card-text>
                刷新后，编辑器插件中的Token需要重新设置。
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="updateToken">
                  <v-icon left>mdi-refresh</v-icon> 刷新Token
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
