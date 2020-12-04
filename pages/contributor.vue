<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title> 贡献者 </v-card-title>
      </v-card>
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
import Vue from 'vue'
import GithubCard from '../components/GithubCard.vue'
export default Vue.extend({
  components: { GithubCard },
  data() {
    return {
      jannchie: {} as any,
      si9ma: {} as any,
    }
  },
  async mounted() {
    this.jannchie = await this.$axios.$get(
      'https://api.github.com/users/jannchie'
    )
    this.jannchie.bio =
      'Contributed to the writing of the VSCode extension program and front-end data visualization display.'
    this.si9ma = await this.$axios.$get('https://api.github.com/users/si9ma')
    this.si9ma.bio =
      'Contributing to the writing of the Jetbrains IDE extension and server design and data mining.'
  },
})
</script>
