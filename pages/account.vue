<template>
  <v-row align="center" justify="center">
    <v-scroll-x-transition>
      <v-alert
        v-if="clipped"
        style="
          position: fixed;
          z-index: 2;
          margin-left: 24px;
          top: 64px;
          right: 24px;
        "
        prominent
        dense
        outlined
        text
        type="success"
      >
        <v-row align="center">
          <v-col class="grow"> Token复制成功 </v-col>
        </v-row>
      </v-alert>
    </v-scroll-x-transition>
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
                <v-text-field
                  v-model="token"
                  readonly
                  label="Token"
                  outlined
                  append-icon="mdi-content-cut"
                  @click:append="clip"
                ></v-text-field>
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
import { getToken } from "~/middleware/utils/getToken";
export default Vue.extend({
  data() {
    return { token: "", dialog: false, clipped: false };
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
    clip() {
      this.execCopy(this.token);
    },
    execCopy(text: string) {
      const input = document.createElement("input") as HTMLInputElement;
      input.style.opacity = "0";
      input.style.position = "absolute";
      input.style.left = "-100000px";
      document.body.appendChild(input);
      input.value = text;
      input.select();
      input.setSelectionRange(0, text.length);
      document.execCommand("copy");
      document.body.removeChild(input);
      this.clipped = true;
      setTimeout(() => (this.clipped = false), 1000);
      return true;
    },
  },
});
</script>
