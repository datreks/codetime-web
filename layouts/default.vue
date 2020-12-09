<template>
  <v-app dark>
    <v-overlay color="#111" opacity="0.8" :value="user.logined === undefined">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar height="64px" clipped-left fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!user.logined" text to="login">
        <v-icon left> mdi-login-variant</v-icon> login
      </v-btn>
      <v-avatar v-else>
        <v-img :src="user.avatar"></v-img>
      </v-avatar>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-scroll-y-transition>
          <nuxt />
        </v-scroll-y-transition>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Data Trekkers</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "mdi-view-dashboard-variant",
          title: "仪表盘",
          to: "/dashboard",
        },
        {
          icon: "mdi-account-group",
          title: "贡献者",
          to: "/contributor",
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: "Code Time",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.$store.dispatch("user/login");
  },
};
</script>
