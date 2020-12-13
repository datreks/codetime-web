<template>
  <v-app dark>
    <v-overlay
      color="#111"
      :z-index="100"
      :opacity="1"
      :value="user.logined === undefined"
      class="text-center"
    >
      <v-img
        class="rotate"
        eager
        max-height="64px"
        max-width="64px"
        src="/favicon.ico"
      ></v-img>
      <div class="text--secondary caption">正在载入资源和数据</div>
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
    <v-app-bar height="48px" clipped-left fixed app>
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
      <div v-if="!user.logined"></div>
      <v-avatar v-else to="/account" size="32px">
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
        {
          icon: "mdi-account",
          title: "个人",
          to: "/account",
        },
        {
          icon: "mdi-shield-star",
          title: "徽章",
          to: "/badge",
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
<style scoped>
.rotate {
  -webkit-animation: my-rotate 1s linear infinite;
  animation: my-rotate 1s linear infinite;
  display: inline-block;
}
@-webkit-keyframes my-rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes my-rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
