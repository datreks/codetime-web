<template>
  <v-scroll-y-transition>
    <v-card v-if="user.name" outlined class="text-center" :href="user.html_url">
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="12">
            <v-avatar><v-img :src="user.avatar_url"></v-img></v-avatar>
          </v-col>
          <v-col cols="12" class="title">{{ user.name }} </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12"> {{ user.location }}</v-col>
          <v-col cols="12"> {{ user.company }}</v-col>
          <v-col cols="12">{{ user.blog }}</v-col>
          <v-col cols="12" class="font-italic"> {{ user.bio }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-scroll-y-transition>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
});
</script>
