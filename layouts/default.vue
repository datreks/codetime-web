<template>
  <v-app dark>
    <v-overlay
      :color="$vuetify.theme.dark ? `#111` : `#fff`"
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
      v-model="settingsDrawer"
      clipped
      app
      fixed
      temporary
      right
    >
      <settings-drawer-content></settings-drawer-content>
    </v-navigation-drawer>
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
    <v-app-bar class="v-bar--underline" flat dense clipped-left fixed app>
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
      <v-btn
        v-if="user.logined"
        icon
        @click.stop="settingsDrawer = !settingsDrawer"
      >
        <v-avatar to="/account" size="32px">
          <v-img :src="user.avatar"></v-img>
        </v-avatar>
      </v-btn>
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
import SettingsDrawerContent from "~/components/SettingsDrawerContent.vue";
export default {
  components: { SettingsDrawerContent },
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
          icon: "mdi-account",
          title: "个人",
          to: "/account",
        },
        {
          icon: "mdi-shield-star",
          title: "徽章",
          to: "/badge",
        },
        {
          icon: "mdi-github",
          title: "贡献者",
          to: "/contributor",
        },
      ],
      miniVariant: true,
      right: true,
      settingsDrawer: false,
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
<style>
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
.theme--light .v-bar--underline,
.theme--dark .v-bar--underline {
  border-width: 0 0 thin 0;
  border-style: solid;
}

.theme--light .v-bar--underline.theme--light,
.theme--dark .v-bar--underline.theme--light {
  border-bottom-color: #0000001f !important;
}

.theme--light .v-bar--underline.theme--dark,
.theme--dark .v-bar--underline.theme--dark {
  border-bottom-color: #ffffff1f !important;
}
</style>
