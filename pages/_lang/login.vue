<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="3" class="text-center">
      <v-card>
        <v-card-title class="text-center"> 登录 </v-card-title>
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
          <v-btn primary @click="login"
            ><v-icon left>mdi-login</v-icon> login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return { token: "" };
  },
  methods: {
    login() {},
  },
});
</script>
